<?php
/**
 * UAE Shipping Providers Integration - Nexus TechHub
 * 
 * Real-time tracking integration with Emirates Post and Aramex
 * for mobile repair parts delivery across UAE
 */

// UAE Shipping Integration Manager
class Nexus_UAE_Shipping {
    
    private $emirates_post_api;
    private $aramex_api;
    
    public function __construct() {
        $this->init_apis();
        add_action('init', array($this, 'init'));
        add_action('woocommerce_order_status_processing', array($this, 'create_shipping_label'));
        add_action('woocommerce_order_status_shipped', array($this, 'send_tracking_notification'));
        add_action('wp_ajax_track_shipment', array($this, 'ajax_track_shipment'));
        add_action('wp_ajax_nopriv_track_shipment', array($this, 'ajax_track_shipment'));
        add_filter('woocommerce_shipping_methods', array($this, 'add_uae_shipping_methods'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_tracking_scripts'));
    }
    
    public function init() {
        // Register custom order statuses for UAE shipping
        add_action('init', array($this, 'register_shipping_statuses'));
        
        // Add shipping tracking meta box to orders
        add_action('add_meta_boxes', array($this, 'add_shipping_meta_box'));
        add_action('save_post', array($this, 'save_shipping_meta'));
        
        // Create shipping tracking table
        $this->create_shipping_tracking_table();
    }
    
    // Initialize API configurations
    private function init_apis() {
        $this->emirates_post_api = array(
            'base_url' => 'https://api.emiratespost.ae/v1/',
            'api_key' => get_option('nexus_emirates_post_api_key', ''),
            'username' => get_option('nexus_emirates_post_username', ''),
            'password' => get_option('nexus_emirates_post_password', '')
        );
        
        $this->aramex_api = array(
            'base_url' => 'https://ws.aramex.net/ShippingAPI.V2/',
            'username' => get_option('nexus_aramex_username', ''),
            'password' => get_option('nexus_aramex_password', ''),
            'account_number' => get_option('nexus_aramex_account', ''),
            'account_pin' => get_option('nexus_aramex_pin', ''),
            'account_entity' => get_option('nexus_aramex_entity', 'DXB'),
            'account_country_code' => 'AE'
        );
    }
    
    // Register custom shipping statuses
    public function register_shipping_statuses() {
        register_post_status('wc-shipped', array(
            'label' => __('Shipped', 'nexus-techhub'),
            'public' => true,
            'exclude_from_search' => false,
            'show_in_admin_all_list' => true,
            'show_in_admin_status_list' => true,
            'label_count' => _n_noop('Shipped <span class="count">(%s)</span>', 'Shipped <span class="count">(%s)</span>', 'nexus-techhub')
        ));
        
        register_post_status('wc-out-for-delivery', array(
            'label' => __('Out for Delivery', 'nexus-techhub'),
            'public' => true,
            'exclude_from_search' => false,
            'show_in_admin_all_list' => true,
            'show_in_admin_status_list' => true,
            'label_count' => _n_noop('Out for Delivery <span class="count">(%s)</span>', 'Out for Delivery <span class="count">(%s)</span>', 'nexus-techhub')
        ));
    }
    
    // Create shipping tracking database table
    private function create_shipping_tracking_table() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'nexus_shipping_tracking';
        
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            order_id bigint(20) NOT NULL,
            tracking_number varchar(100) NOT NULL,
            shipping_provider varchar(50) NOT NULL,
            shipping_method varchar(100) NOT NULL,
            origin_emirate varchar(50) NOT NULL,
            destination_emirate varchar(50) NOT NULL,
            estimated_delivery datetime NULL,
            actual_delivery datetime NULL,
            current_status varchar(100) NOT NULL,
            last_update datetime DEFAULT CURRENT_TIMESTAMP,
            tracking_events text,
            delivery_attempts int(2) DEFAULT 0,
            special_instructions text,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY tracking_number (tracking_number),
            KEY order_id (order_id),
            KEY shipping_provider (shipping_provider)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
    
    // Add UAE shipping methods to WooCommerce
    public function add_uae_shipping_methods($methods) {
        $methods['nexus_emirates_post'] = 'Nexus_Emirates_Post_Shipping';
        $methods['nexus_aramex'] = 'Nexus_Aramex_Shipping';
        return $methods;
    }
    
    // Emirates Post API integration
    public function create_emirates_post_shipment($order) {
        $api_url = $this->emirates_post_api['base_url'] . 'shipments';
        
        $shipment_data = array(
            'reference' => $order->get_order_number(),
            'service_type' => 'EXPRESS',
            'sender' => array(
                'name' => 'Nexus TechHub',
                'phone' => '+971585531029',
                'address' => array(
                    'line1' => 'FAMC3062, Compass Building',
                    'line2' => 'Al Shohada Road, AL Hamra Industrial Zone-FZ',
                    'city' => 'Ras Al Khaimah',
                    'emirate' => 'RAK',
                    'country' => 'AE',
                    'postal_code' => ''
                )
            ),
            'recipient' => array(
                'name' => $order->get_billing_first_name() . ' ' . $order->get_billing_last_name(),
                'phone' => $order->get_billing_phone(),
                'address' => array(
                    'line1' => $order->get_billing_address_1(),
                    'line2' => $order->get_billing_address_2(),
                    'city' => $order->get_billing_city(),
                    'emirate' => $order->get_billing_state(),
                    'country' => $order->get_billing_country(),
                    'postal_code' => $order->get_billing_postcode()
                )
            ),
            'items' => $this->get_order_items_for_shipping($order),
            'declared_value' => $order->get_total(),
            'currency' => 'AED',
            'cod_amount' => $order->get_payment_method() === 'cod' ? $order->get_total() : 0
        );
        
        $response = wp_remote_post($api_url, array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $this->emirates_post_api['api_key'],
                'Content-Type' => 'application/json'
            ),
            'body' => json_encode($shipment_data),
            'timeout' => 30
        ));
        
        if (is_wp_error($response)) {
            return false;
        }
        
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        
        if (isset($data['tracking_number'])) {
            $this->save_tracking_info($order->get_id(), $data['tracking_number'], 'Emirates Post', $data);
            return $data['tracking_number'];
        }
        
        return false;
    }
    
    // Aramex API integration
    public function create_aramex_shipment($order) {
        $soap_client = new SoapClient($this->aramex_api['base_url'] . 'shipping.asmx?wsdl');
        
        $shipment_data = array(
            'ClientInfo' => array(
                'UserName' => $this->aramex_api['username'],
                'Password' => $this->aramex_api['password'],
                'Version' => 'v1.0',
                'AccountNumber' => $this->aramex_api['account_number'],
                'AccountPin' => $this->aramex_api['account_pin'],
                'AccountEntity' => $this->aramex_api['account_entity'],
                'AccountCountryCode' => $this->aramex_api['account_country_code']
            ),
            'Transaction' => array(
                'Reference1' => $order->get_order_number(),
                'Reference2' => 'Nexus TechHub Order',
                'Reference3' => ''
            ),
            'Shipments' => array(
                array(
                    'Reference1' => $order->get_order_number(),
                    'Reference2' => 'Mobile Repair Parts',
                    'Shipper' => array(
                        'Reference1' => 'NEXUS001',
                        'Reference2' => '',
                        'AccountNumber' => $this->aramex_api['account_number'],
                        'PartyAddress' => array(
                            'Line1' => 'FAMC3062, Compass Building',
                            'Line2' => 'Al Shohada Road',
                            'Line3' => 'AL Hamra Industrial Zone-FZ',
                            'City' => 'Ras Al Khaimah',
                            'StateOrProvinceCode' => 'RAK',
                            'PostCode' => '',
                            'CountryCode' => 'AE'
                        ),
                        'Contact' => array(
                            'Department' => 'Shipping',
                            'PersonName' => 'Nexus TechHub',
                            'Title' => 'Mr.',
                            'CompanyName' => 'Nexus TechHub',
                            'PhoneNumber1' => '+971585531029',
                            'PhoneNumber1Ext' => '',
                            'PhoneNumber2' => '',
                            'PhoneNumber2Ext' => '',
                            'FaxNumber' => '',
                            'CellPhone' => '+971585531029',
                            'EmailAddress' => 'admin@nexustechhub.ae'
                        )
                    ),
                    'Consignee' => array(
                        'Reference1' => $order->get_customer_id(),
                        'Reference2' => '',
                        'AccountNumber' => '',
                        'PartyAddress' => array(
                            'Line1' => $order->get_billing_address_1(),
                            'Line2' => $order->get_billing_address_2(),
                            'Line3' => '',
                            'City' => $order->get_billing_city(),
                            'StateOrProvinceCode' => $order->get_billing_state(),
                            'PostCode' => $order->get_billing_postcode(),
                            'CountryCode' => $order->get_billing_country()
                        ),
                        'Contact' => array(
                            'Department' => '',
                            'PersonName' => $order->get_billing_first_name() . ' ' . $order->get_billing_last_name(),
                            'Title' => 'Mr.',
                            'CompanyName' => $order->get_billing_company(),
                            'PhoneNumber1' => $order->get_billing_phone(),
                            'PhoneNumber1Ext' => '',
                            'PhoneNumber2' => '',
                            'PhoneNumber2Ext' => '',
                            'FaxNumber' => '',
                            'CellPhone' => $order->get_billing_phone(),
                            'EmailAddress' => $order->get_billing_email()
                        )
                    ),
                    'Details' => array(
                        'Dimensions' => array(
                            'Length' => 20,
                            'Width' => 15,
                            'Height' => 10,
                            'Unit' => 'CM'
                        ),
                        'ActualWeight' => array(
                            'Value' => 1,
                            'Unit' => 'KG'
                        ),
                        'ProductGroup' => 'EXP',
                        'ProductType' => 'PPX',
                        'PaymentType' => 'P',
                        'PaymentOptions' => '',
                        'Services' => '',
                        'NumberOfPieces' => 1,
                        'DescriptionOfGoods' => 'Mobile Repair Parts',
                        'GoodsOriginCountry' => 'AE',
                        'CashOnDeliveryAmount' => array(
                            'Value' => $order->get_payment_method() === 'cod' ? $order->get_total() : 0,
                            'CurrencyCode' => 'AED'
                        ),
                        'InsuranceAmount' => array(
                            'Value' => 0,
                            'CurrencyCode' => 'AED'
                        ),
                        'CollectAmount' => array(
                            'Value' => 0,
                            'CurrencyCode' => 'AED'
                        ),
                        'CustomsValueAmount' => array(
                            'Value' => $order->get_total(),
                            'CurrencyCode' => 'AED'
                        )
                    )
                )
            ),
            'LabelInfo' => array(
                'ReportID' => 9201,
                'ReportType' => 'URL'
            )
        );
        
        try {
            $response = $soap_client->CreateShipments($shipment_data);
            
            if ($response->HasErrors) {
                error_log('Aramex API Error: ' . print_r($response->Notifications, true));
                return false;
            }
            
            $tracking_number = $response->Shipments->ProcessedShipment->ID;
            $this->save_tracking_info($order->get_id(), $tracking_number, 'Aramex', $response);
            
            return $tracking_number;
            
        } catch (Exception $e) {
            error_log('Aramex API Exception: ' . $e->getMessage());
            return false;
        }
    }
    
    // Save tracking information to database
    private function save_tracking_info($order_id, $tracking_number, $provider, $api_response) {
        global $wpdb;
        
        $order = wc_get_order($order_id);
        $table_name = $wpdb->prefix . 'nexus_shipping_tracking';
        
        $wpdb->insert(
            $table_name,
            array(
                'order_id' => $order_id,
                'tracking_number' => $tracking_number,
                'shipping_provider' => $provider,
                'shipping_method' => $order->get_shipping_method(),
                'origin_emirate' => 'RAK',
                'destination_emirate' => $order->get_billing_state(),
                'current_status' => 'Shipment Created',
                'tracking_events' => json_encode($api_response)
            ),
            array('%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s')
        );
        
        // Update order meta
        update_post_meta($order_id, '_tracking_number', $tracking_number);
        update_post_meta($order_id, '_shipping_provider', $provider);
        
        // Add order note
        $order->add_order_note(sprintf(
            __('Shipment created with %s. Tracking number: %s', 'nexus-techhub'),
            $provider,
            $tracking_number
        ));
    }
    
    // Get order items formatted for shipping APIs
    private function get_order_items_for_shipping($order) {
        $items = array();
        
        foreach ($order->get_items() as $item) {
            $product = $item->get_product();
            $items[] = array(
                'description' => $product->get_name(),
                'quantity' => $item->get_quantity(),
                'weight' => $product->get_weight() ? $product->get_weight() : 0.1,
                'value' => $item->get_total(),
                'sku' => $product->get_sku()
            );
        }
        
        return $items;
    }
    
    // Track shipment via AJAX
    public function ajax_track_shipment() {
        check_ajax_referer('nexus_tracking_nonce', 'nonce');
        
        $tracking_number = sanitize_text_field($_POST['tracking_number']);
        $provider = sanitize_text_field($_POST['provider']);
        
        if ($provider === 'Emirates Post') {
            $tracking_data = $this->track_emirates_post_shipment($tracking_number);
        } elseif ($provider === 'Aramex') {
            $tracking_data = $this->track_aramex_shipment($tracking_number);
        } else {
            wp_send_json_error('Invalid shipping provider');
        }
        
        if ($tracking_data) {
            wp_send_json_success($tracking_data);
        } else {
            wp_send_json_error('Unable to track shipment');
        }
    }
    
    // Track Emirates Post shipment
    private function track_emirates_post_shipment($tracking_number) {
        $api_url = $this->emirates_post_api['base_url'] . 'tracking/' . $tracking_number;
        
        $response = wp_remote_get($api_url, array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $this->emirates_post_api['api_key']
            ),
            'timeout' => 15
        ));
        
        if (is_wp_error($response)) {
            return false;
        }
        
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        
        if (isset($data['tracking_events'])) {
            return $this->format_tracking_data($data, 'Emirates Post');
        }
        
        return false;
    }
    
    // Track Aramex shipment
    private function track_aramex_shipment($tracking_number) {
        $soap_client = new SoapClient($this->aramex_api['base_url'] . 'tracking.asmx?wsdl');
        
        $tracking_data = array(
            'ClientInfo' => array(
                'UserName' => $this->aramex_api['username'],
                'Password' => $this->aramex_api['password'],
                'Version' => 'v1.0',
                'AccountNumber' => $this->aramex_api['account_number'],
                'AccountPin' => $this->aramex_api['account_pin'],
                'AccountEntity' => $this->aramex_api['account_entity'],
                'AccountCountryCode' => $this->aramex_api['account_country_code']
            ),
            'Transaction' => array(
                'Reference1' => '',
                'Reference2' => '',
                'Reference3' => ''
            ),
            'Shipments' => array($tracking_number)
        );
        
        try {
            $response = $soap_client->TrackShipments($tracking_data);
            
            if (!$response->HasErrors && isset($response->TrackingResults)) {
                return $this->format_tracking_data($response->TrackingResults, 'Aramex');
            }
            
        } catch (Exception $e) {
            error_log('Aramex Tracking Error: ' . $e->getMessage());
        }
        
        return false;
    }
    
    // Format tracking data for consistent display
    private function format_tracking_data($raw_data, $provider) {
        // Format tracking data based on provider
        $formatted = array(
            'provider' => $provider,
            'status' => '',
            'location' => '',
            'estimated_delivery' => '',
            'events' => array()
        );
        
        // Provider-specific formatting logic here
        // This would be customized based on each API's response format
        
        return $formatted;
    }
    
    // Enqueue tracking scripts
    public function enqueue_tracking_scripts() {
        if (is_account_page() || is_wc_endpoint_url('order-tracking')) {
            wp_enqueue_script('nexus-shipping-tracking', get_template_directory_uri() . '/assets/js/shipping-tracking.js', array('jquery'), '1.0.0', true);
            wp_localize_script('nexus-shipping-tracking', 'nexus_tracking', array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('nexus_tracking_nonce')
            ));
        }
    }
}

// Initialize UAE shipping integration
new Nexus_UAE_Shipping();

?>
