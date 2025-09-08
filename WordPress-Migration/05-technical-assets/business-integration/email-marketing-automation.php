<?php
/**
 * Customer Retention Email Marketing Automation - Nexus TechHub
 * 
 * SendGrid integration for automated email sequences, customer retention,
 * and UAE market-specific email marketing for mobile repair parts business
 */

// Email Marketing Automation Manager
class Nexus_Email_Marketing {
    
    private $sendgrid_api_key;
    private $email_templates;
    private $customer_segments;
    
    public function __construct() {
        $this->sendgrid_api_key = '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';
        $this->init_email_templates();
        $this->init_customer_segments();
        
        add_action('init', array($this, 'init'));
        add_action('woocommerce_order_status_completed', array($this, 'trigger_post_purchase_sequence'));
        add_action('woocommerce_new_customer', array($this, 'trigger_welcome_sequence'));
        add_action('woocommerce_cart_updated', array($this, 'track_cart_abandonment'));
        add_action('nexus_weekly_email_campaign', array($this, 'send_weekly_newsletter'));
        add_action('nexus_monthly_retention_campaign', array($this, 'send_retention_campaign'));
    }
    
    public function init() {
        // Schedule email campaigns
        $this->schedule_email_campaigns();
        
        // Create email tracking table
        $this->create_email_tracking_table();
        
        // Add email preferences to customer accounts
        add_action('woocommerce_edit_account_form', array($this, 'add_email_preferences'));
        add_action('woocommerce_save_account_details', array($this, 'save_email_preferences'));
        
        // Add unsubscribe handling
        add_action('wp_ajax_unsubscribe_email', array($this, 'handle_unsubscribe'));
        add_action('wp_ajax_nopriv_unsubscribe_email', array($this, 'handle_unsubscribe'));
    }
    
    // Initialize email templates
    private function init_email_templates() {
        $this->email_templates = array(
            'welcome_series' => array(
                'day_0' => array(
                    'subject' => 'Welcome to Nexus TechHub - UAE\'s Premier Mobile Repair Parts! 🇦🇪',
                    'template_id' => 'd-welcome-day0',
                    'delay' => 0
                ),
                'day_3' => array(
                    'subject' => 'Discover Our iPhone Parts Collection - Fast UAE Delivery 📱',
                    'template_id' => 'd-welcome-day3',
                    'delay' => 3
                ),
                'day_7' => array(
                    'subject' => 'Samsung & iPad Parts + Exclusive Repair Shop Discounts 🔧',
                    'template_id' => 'd-welcome-day7',
                    'delay' => 7
                )
            ),
            'post_purchase' => array(
                'day_1' => array(
                    'subject' => 'Your Nexus TechHub Order is on its way! 🚚',
                    'template_id' => 'd-post-purchase-day1',
                    'delay' => 1
                ),
                'day_7' => array(
                    'subject' => 'How was your repair? Share your experience 🌟',
                    'template_id' => 'd-post-purchase-day7',
                    'delay' => 7
                ),
                'day_30' => array(
                    'subject' => 'Need more parts? Exclusive returning customer discount 💰',
                    'template_id' => 'd-post-purchase-day30',
                    'delay' => 30
                )
            ),
            'cart_abandonment' => array(
                'hour_1' => array(
                    'subject' => 'Forgot something? Your mobile parts are waiting 📱',
                    'template_id' => 'd-cart-abandonment-1h',
                    'delay' => 1 // hours
                ),
                'day_1' => array(
                    'subject' => 'Still thinking? Free shipping on your cart items 🚚',
                    'template_id' => 'd-cart-abandonment-1d',
                    'delay' => 24 // hours
                ),
                'day_3' => array(
                    'subject' => 'Last chance: 10% off your mobile repair parts 🔧',
                    'template_id' => 'd-cart-abandonment-3d',
                    'delay' => 72 // hours
                )
            ),
            'retention' => array(
                'win_back' => array(
                    'subject' => 'We miss you! Special UAE customer offer inside 🇦🇪',
                    'template_id' => 'd-win-back',
                    'trigger' => 'no_purchase_90_days'
                ),
                'vip_customer' => array(
                    'subject' => 'VIP Access: New arrivals & exclusive pricing 👑',
                    'template_id' => 'd-vip-customer',
                    'trigger' => 'high_value_customer'
                ),
                'repair_shop' => array(
                    'subject' => 'Bulk pricing update for repair professionals 🏪',
                    'template_id' => 'd-repair-shop',
                    'trigger' => 'bulk_customer'
                )
            ),
            'newsletters' => array(
                'weekly_deals' => array(
                    'subject' => 'This Week: New iPhone 15 Parts + UAE Repair Tips 📱',
                    'template_id' => 'd-weekly-newsletter',
                    'schedule' => 'weekly'
                ),
                'monthly_roundup' => array(
                    'subject' => 'Monthly Roundup: Best Sellers & UAE Market Trends 📊',
                    'template_id' => 'd-monthly-roundup',
                    'schedule' => 'monthly'
                )
            )
        );
    }
    
    // Initialize customer segments
    private function init_customer_segments() {
        $this->customer_segments = array(
            'new_customers' => array(
                'criteria' => 'first_purchase_within_30_days',
                'email_frequency' => 'weekly',
                'content_focus' => 'education_and_trust'
            ),
            'repeat_customers' => array(
                'criteria' => 'multiple_purchases',
                'email_frequency' => 'bi_weekly',
                'content_focus' => 'loyalty_and_upsell'
            ),
            'repair_shops' => array(
                'criteria' => 'bulk_orders_or_business_account',
                'email_frequency' => 'weekly',
                'content_focus' => 'bulk_pricing_and_new_arrivals'
            ),
            'high_value' => array(
                'criteria' => 'lifetime_value_over_1000_aed',
                'email_frequency' => 'weekly',
                'content_focus' => 'vip_treatment_and_exclusives'
            ),
            'inactive' => array(
                'criteria' => 'no_purchase_in_90_days',
                'email_frequency' => 'monthly',
                'content_focus' => 'win_back_offers'
            ),
            'uae_specific' => array(
                'criteria' => 'uae_shipping_address',
                'email_frequency' => 'weekly',
                'content_focus' => 'local_events_and_uae_specific_offers'
            )
        );
    }
    
    // Create email tracking database table
    private function create_email_tracking_table() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'nexus_email_tracking';
        
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            customer_id bigint(20) NOT NULL,
            email_address varchar(100) NOT NULL,
            campaign_type varchar(50) NOT NULL,
            template_id varchar(100) NOT NULL,
            sendgrid_message_id varchar(100),
            sent_at datetime DEFAULT CURRENT_TIMESTAMP,
            opened_at datetime NULL,
            clicked_at datetime NULL,
            unsubscribed_at datetime NULL,
            bounced_at datetime NULL,
            email_status varchar(20) DEFAULT 'sent',
            customer_segment varchar(50),
            order_id bigint(20) NULL,
            PRIMARY KEY (id),
            KEY customer_id (customer_id),
            KEY email_address (email_address),
            KEY campaign_type (campaign_type),
            KEY sent_at (sent_at)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
    
    // Schedule email campaigns
    private function schedule_email_campaigns() {
        // Weekly newsletter
        if (!wp_next_scheduled('nexus_weekly_email_campaign')) {
            wp_schedule_event(strtotime('next Sunday 10:00'), 'weekly', 'nexus_weekly_email_campaign');
        }
        
        // Monthly retention campaign
        if (!wp_next_scheduled('nexus_monthly_retention_campaign')) {
            wp_schedule_event(strtotime('first Monday of next month 09:00'), 'monthly', 'nexus_monthly_retention_campaign');
        }
        
        // Daily cart abandonment check
        if (!wp_next_scheduled('nexus_daily_cart_abandonment')) {
            wp_schedule_event(time(), 'daily', 'nexus_daily_cart_abandonment');
        }
        add_action('nexus_daily_cart_abandonment', array($this, 'process_cart_abandonment'));
    }
    
    // Trigger welcome email sequence for new customers
    public function trigger_welcome_sequence($customer_id) {
        $customer = new WC_Customer($customer_id);
        
        if (!$customer->get_email()) {
            return;
        }
        
        // Schedule welcome email series
        foreach ($this->email_templates['welcome_series'] as $key => $template) {
            $send_time = time() + ($template['delay'] * DAY_IN_SECONDS);
            
            wp_schedule_single_event($send_time, 'nexus_send_scheduled_email', array(
                'customer_id' => $customer_id,
                'template_type' => 'welcome_series',
                'template_key' => $key
            ));
        }
        
        // Add to new customer segment
        $this->add_customer_to_segment($customer_id, 'new_customers');
    }
    
    // Trigger post-purchase email sequence
    public function trigger_post_purchase_sequence($order_id) {
        $order = wc_get_order($order_id);
        $customer_id = $order->get_customer_id();
        
        if (!$customer_id || !$order->get_billing_email()) {
            return;
        }
        
        // Schedule post-purchase email series
        foreach ($this->email_templates['post_purchase'] as $key => $template) {
            $send_time = time() + ($template['delay'] * DAY_IN_SECONDS);
            
            wp_schedule_single_event($send_time, 'nexus_send_scheduled_email', array(
                'customer_id' => $customer_id,
                'template_type' => 'post_purchase',
                'template_key' => $key,
                'order_id' => $order_id
            ));
        }
        
        // Update customer segment based on purchase history
        $this->update_customer_segment($customer_id);
    }
    
    // Track cart abandonment
    public function track_cart_abandonment() {
        if (!is_user_logged_in()) {
            return;
        }
        
        $customer_id = get_current_user_id();
        $cart_contents = WC()->cart->get_cart_contents();
        
        if (empty($cart_contents)) {
            return;
        }
        
        // Store cart data for abandonment tracking
        update_user_meta($customer_id, '_nexus_cart_abandonment_data', array(
            'cart_contents' => $cart_contents,
            'cart_total' => WC()->cart->get_total(),
            'timestamp' => time()
        ));
    }
    
    // Process cart abandonment emails
    public function process_cart_abandonment() {
        global $wpdb;
        
        // Find users with abandoned carts
        $abandoned_carts = $wpdb->get_results("
            SELECT user_id, meta_value 
            FROM {$wpdb->usermeta} 
            WHERE meta_key = '_nexus_cart_abandonment_data'
            AND meta_value != ''
        ");
        
        foreach ($abandoned_carts as $cart) {
            $cart_data = maybe_unserialize($cart->meta_value);
            $time_since_abandonment = time() - $cart_data['timestamp'];
            
            // Check if we should send abandonment emails
            if ($time_since_abandonment >= HOUR_IN_SECONDS && $time_since_abandonment < (HOUR_IN_SECONDS * 2)) {
                $this->send_cart_abandonment_email($cart->user_id, 'hour_1', $cart_data);
            } elseif ($time_since_abandonment >= DAY_IN_SECONDS && $time_since_abandonment < (DAY_IN_SECONDS * 2)) {
                $this->send_cart_abandonment_email($cart->user_id, 'day_1', $cart_data);
            } elseif ($time_since_abandonment >= (DAY_IN_SECONDS * 3) && $time_since_abandonment < (DAY_IN_SECONDS * 4)) {
                $this->send_cart_abandonment_email($cart->user_id, 'day_3', $cart_data);
            }
        }
    }
    
    // Send cart abandonment email
    private function send_cart_abandonment_email($customer_id, $template_key, $cart_data) {
        $customer = new WC_Customer($customer_id);
        $template = $this->email_templates['cart_abandonment'][$template_key];
        
        $email_data = array(
            'customer_name' => $customer->get_first_name(),
            'cart_total' => $cart_data['cart_total'],
            'cart_items' => $this->format_cart_items($cart_data['cart_contents']),
            'recovery_link' => $this->generate_cart_recovery_link($customer_id),
            'discount_code' => $template_key === 'day_3' ? $this->generate_discount_code($customer_id) : null
        );
        
        $this->send_email_via_sendgrid(
            $customer->get_email(),
            $template['subject'],
            $template['template_id'],
            $email_data,
            'cart_abandonment'
        );
    }
    
    // Send weekly newsletter
    public function send_weekly_newsletter() {
        $subscribers = $this->get_newsletter_subscribers();
        
        foreach ($subscribers as $subscriber) {
            $customer = new WC_Customer($subscriber['customer_id']);
            $segment = $this->get_customer_segment($subscriber['customer_id']);
            
            $email_data = array(
                'customer_name' => $customer->get_first_name(),
                'featured_products' => $this->get_featured_products_for_segment($segment),
                'weekly_deals' => $this->get_weekly_deals(),
                'uae_tips' => $this->get_uae_repair_tips(),
                'unsubscribe_link' => $this->generate_unsubscribe_link($subscriber['customer_id'])
            );
            
            $this->send_email_via_sendgrid(
                $customer->get_email(),
                $this->email_templates['newsletters']['weekly_deals']['subject'],
                $this->email_templates['newsletters']['weekly_deals']['template_id'],
                $email_data,
                'weekly_newsletter'
            );
        }
    }
    
    // Send retention campaign
    public function send_retention_campaign() {
        $inactive_customers = $this->get_inactive_customers();
        
        foreach ($inactive_customers as $customer_id) {
            $customer = new WC_Customer($customer_id);
            $last_order = $this->get_customer_last_order($customer_id);
            
            $email_data = array(
                'customer_name' => $customer->get_first_name(),
                'last_purchase_date' => $last_order ? $last_order->get_date_created()->format('F Y') : 'a while ago',
                'recommended_products' => $this->get_recommended_products($customer_id),
                'special_offer' => $this->generate_win_back_offer($customer_id),
                'whatsapp_link' => 'https://wa.me/971585531029?text=Hi! I received your email and would like to know about current offers.'
            );
            
            $this->send_email_via_sendgrid(
                $customer->get_email(),
                $this->email_templates['retention']['win_back']['subject'],
                $this->email_templates['retention']['win_back']['template_id'],
                $email_data,
                'retention_campaign'
            );
        }
    }
    
    // Send email via SendGrid
    private function send_email_via_sendgrid($to_email, $subject, $template_id, $template_data, $campaign_type) {
        $url = 'https://api.sendgrid.com/v3/mail/send';
        
        $email_payload = array(
            'personalizations' => array(
                array(
                    'to' => array(
                        array('email' => $to_email)
                    ),
                    'dynamic_template_data' => $template_data
                )
            ),
            'from' => array(
                'email' => 'noreply@nexustechhub.ae',
                'name' => 'Nexus TechHub'
            ),
            'template_id' => $template_id,
            'categories' => array($campaign_type, 'nexus_techhub', 'uae_business'),
            'custom_args' => array(
                'campaign_type' => $campaign_type,
                'business_location' => 'UAE',
                'customer_segment' => $this->get_customer_segment_by_email($to_email)
            )
        );
        
        $response = wp_remote_post($url, array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $this->sendgrid_api_key,
                'Content-Type' => 'application/json'
            ),
            'body' => json_encode($email_payload),
            'timeout' => 30
        ));
        
        if (!is_wp_error($response)) {
            $response_code = wp_remote_retrieve_response_code($response);
            if ($response_code === 202) {
                // Log successful email send
                $this->log_email_send($to_email, $campaign_type, $template_id, 'sent');
                return true;
            }
        }
        
        // Log failed email send
        $this->log_email_send($to_email, $campaign_type, $template_id, 'failed');
        return false;
    }
    
    // Log email send to database
    private function log_email_send($email_address, $campaign_type, $template_id, $status) {
        global $wpdb;
        
        $customer = get_user_by('email', $email_address);
        $customer_id = $customer ? $customer->ID : 0;
        
        $table_name = $wpdb->prefix . 'nexus_email_tracking';
        
        $wpdb->insert(
            $table_name,
            array(
                'customer_id' => $customer_id,
                'email_address' => $email_address,
                'campaign_type' => $campaign_type,
                'template_id' => $template_id,
                'email_status' => $status,
                'customer_segment' => $this->get_customer_segment($customer_id)
            ),
            array('%d', '%s', '%s', '%s', '%s', '%s')
        );
    }
    
    // Add customer to segment
    private function add_customer_to_segment($customer_id, $segment) {
        $current_segments = get_user_meta($customer_id, '_nexus_email_segments', true);
        if (!is_array($current_segments)) {
            $current_segments = array();
        }
        
        if (!in_array($segment, $current_segments)) {
            $current_segments[] = $segment;
            update_user_meta($customer_id, '_nexus_email_segments', $current_segments);
        }
    }
    
    // Get customer segment
    private function get_customer_segment($customer_id) {
        $segments = get_user_meta($customer_id, '_nexus_email_segments', true);
        return is_array($segments) ? implode(',', $segments) : 'general';
    }
    
    // Update customer segment based on behavior
    private function update_customer_segment($customer_id) {
        $customer = new WC_Customer($customer_id);
        $order_count = $customer->get_order_count();
        $total_spent = $customer->get_total_spent();
        
        // Determine appropriate segments
        if ($order_count === 1) {
            $this->add_customer_to_segment($customer_id, 'new_customers');
        } elseif ($order_count > 1) {
            $this->add_customer_to_segment($customer_id, 'repeat_customers');
        }
        
        if ($total_spent > 1000) {
            $this->add_customer_to_segment($customer_id, 'high_value');
        }
        
        // Check for bulk orders (repair shop indicator)
        $recent_orders = wc_get_orders(array(
            'customer_id' => $customer_id,
            'limit' => 5,
            'status' => 'completed'
        ));
        
        $bulk_order_detected = false;
        foreach ($recent_orders as $order) {
            foreach ($order->get_items() as $item) {
                if ($item->get_quantity() >= 5) {
                    $bulk_order_detected = true;
                    break 2;
                }
            }
        }
        
        if ($bulk_order_detected) {
            $this->add_customer_to_segment($customer_id, 'repair_shops');
        }
    }
    
    // Get newsletter subscribers
    private function get_newsletter_subscribers() {
        global $wpdb;
        
        return $wpdb->get_results("
            SELECT DISTINCT u.ID as customer_id, u.user_email 
            FROM {$wpdb->users} u
            JOIN {$wpdb->usermeta} um ON u.ID = um.user_id
            WHERE um.meta_key = '_nexus_email_preferences'
            AND um.meta_value LIKE '%newsletter%'
            AND u.user_email != ''
        ", ARRAY_A);
    }
    
    // Get inactive customers (no purchase in 90 days)
    private function get_inactive_customers() {
        global $wpdb;
        
        $ninety_days_ago = date('Y-m-d H:i:s', strtotime('-90 days'));
        
        return $wpdb->get_col($wpdb->prepare("
            SELECT DISTINCT customer_id 
            FROM {$wpdb->prefix}wc_order_stats 
            WHERE customer_id > 0 
            AND date_created < %s
            AND customer_id NOT IN (
                SELECT DISTINCT customer_id 
                FROM {$wpdb->prefix}wc_order_stats 
                WHERE customer_id > 0 
                AND date_created >= %s
            )
        ", $ninety_days_ago, $ninety_days_ago));
    }
    
    // Add email preferences to customer account
    public function add_email_preferences() {
        $user_id = get_current_user_id();
        $preferences = get_user_meta($user_id, '_nexus_email_preferences', true);
        if (!is_array($preferences)) {
            $preferences = array();
        }
        
        ?>
        <fieldset>
            <legend><?php _e('Email Preferences', 'nexus-techhub'); ?></legend>
            
            <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                <label>
                    <input type="checkbox" name="email_newsletter" value="1" <?php checked(in_array('newsletter', $preferences)); ?>>
                    <?php _e('Weekly newsletter with new products and UAE repair tips', 'nexus-techhub'); ?>
                </label>
            </p>
            
            <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                <label>
                    <input type="checkbox" name="email_promotions" value="1" <?php checked(in_array('promotions', $preferences)); ?>>
                    <?php _e('Special offers and promotions', 'nexus-techhub'); ?>
                </label>
            </p>
            
            <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                <label>
                    <input type="checkbox" name="email_new_products" value="1" <?php checked(in_array('new_products', $preferences)); ?>>
                    <?php _e('New product announcements', 'nexus-techhub'); ?>
                </label>
            </p>
            
            <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                <label>
                    <input type="checkbox" name="email_repair_tips" value="1" <?php checked(in_array('repair_tips', $preferences)); ?>>
                    <?php _e('Mobile repair tips and tutorials', 'nexus-techhub'); ?>
                </label>
            </p>
        </fieldset>
        <?php
    }
    
    // Save email preferences
    public function save_email_preferences($user_id) {
        $preferences = array();
        
        if (isset($_POST['email_newsletter'])) {
            $preferences[] = 'newsletter';
        }
        if (isset($_POST['email_promotions'])) {
            $preferences[] = 'promotions';
        }
        if (isset($_POST['email_new_products'])) {
            $preferences[] = 'new_products';
        }
        if (isset($_POST['email_repair_tips'])) {
            $preferences[] = 'repair_tips';
        }
        
        update_user_meta($user_id, '_nexus_email_preferences', $preferences);
    }
    
    // Handle unsubscribe requests
    public function handle_unsubscribe() {
        $email = sanitize_email($_GET['email']);
        $token = sanitize_text_field($_GET['token']);
        
        // Verify unsubscribe token
        if ($this->verify_unsubscribe_token($email, $token)) {
            $user = get_user_by('email', $email);
            if ($user) {
                update_user_meta($user->ID, '_nexus_email_preferences', array());
                update_user_meta($user->ID, '_nexus_unsubscribed', true);
            }
            
            wp_send_json_success('Successfully unsubscribed');
        } else {
            wp_send_json_error('Invalid unsubscribe link');
        }
    }
    
    // Generate unsubscribe link
    private function generate_unsubscribe_link($customer_id) {
        $customer = new WC_Customer($customer_id);
        $email = $customer->get_email();
        $token = wp_hash($email . $customer_id . 'unsubscribe');
        
        return add_query_arg(array(
            'action' => 'unsubscribe_email',
            'email' => urlencode($email),
            'token' => $token
        ), admin_url('admin-ajax.php'));
    }
    
    // Verify unsubscribe token
    private function verify_unsubscribe_token($email, $token) {
        $user = get_user_by('email', $email);
        if (!$user) {
            return false;
        }
        
        $expected_token = wp_hash($email . $user->ID . 'unsubscribe');
        return hash_equals($expected_token, $token);
    }
}

// Initialize email marketing automation
new Nexus_Email_Marketing();

?>
