<?php
/**
 * Advanced Inventory Management System - Nexus TechHub
 * 
 * Low-stock alerts, repair shop customer management, and inventory tracking
 * specifically designed for mobile repair parts business
 */

// Advanced inventory management class
class Nexus_Inventory_Manager {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('woocommerce_product_set_stock', array($this, 'check_low_stock_alerts'), 10, 1);
        add_action('woocommerce_reduce_order_stock', array($this, 'update_inventory_tracking'));
        add_action('wp_ajax_nexus_inventory_alert', array($this, 'handle_inventory_alert'));
        add_action('admin_menu', array($this, 'add_inventory_menu'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
    }
    
    public function init() {
        // Create custom database table for inventory tracking
        $this->create_inventory_table();
        
        // Schedule daily inventory reports
        if (!wp_next_scheduled('nexus_daily_inventory_report')) {
            wp_schedule_event(time(), 'daily', 'nexus_daily_inventory_report');
        }
        
        add_action('nexus_daily_inventory_report', array($this, 'send_daily_inventory_report'));
    }
    
    // Create inventory tracking table
    private function create_inventory_table() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'nexus_inventory_tracking';
        
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            product_id bigint(20) NOT NULL,
            action_type varchar(50) NOT NULL,
            quantity_change int(11) NOT NULL,
            stock_level_after int(11) NOT NULL,
            order_id bigint(20) DEFAULT NULL,
            user_id bigint(20) DEFAULT NULL,
            notes text,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY product_id (product_id),
            KEY created_at (created_at)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
    
    // Enhanced low stock checking with repair shop priorities
    public function check_low_stock_alerts($product) {
        if (!is_object($product)) {
            $product = wc_get_product($product);
        }
        
        if (!$product) return;
        
        $stock_quantity = $product->get_stock_quantity();
        $low_stock_threshold = get_post_meta($product->get_id(), '_nexus_low_stock_threshold', true);
        
        if (empty($low_stock_threshold)) {
            $low_stock_threshold = 5; // Default threshold
        }
        
        // Check if stock is low
        if ($stock_quantity <= $low_stock_threshold && $stock_quantity > 0) {
            $this->send_low_stock_alert($product, $stock_quantity);
        }
        
        // Check if stock is out
        if ($stock_quantity <= 0) {
            $this->send_out_of_stock_alert($product);
        }
        
        // Log inventory change
        $this->log_inventory_change($product->get_id(), 'stock_check', 0, $stock_quantity);
    }
    
    // Send low stock alerts to admin and repair shop customers
    private function send_low_stock_alert($product, $current_stock) {
        $product_name = $product->get_name();
        $product_sku = $product->get_sku();
        $product_url = get_edit_post_link($product->get_id());
        
        // Admin notification
        $admin_subject = sprintf(__('Low Stock Alert: %s', 'nexus-techhub'), $product_name);
        $admin_message = sprintf(
            __("Low stock alert for product:\n\nProduct: %s\nSKU: %s\nCurrent Stock: %d\nManage Product: %s\n\nThis is an automated alert from Nexus TechHub inventory system.", 'nexus-techhub'),
            $product_name,
            $product_sku,
            $current_stock,
            $product_url
        );
        
        wp_mail('admin@nexustechhub.ae', $admin_subject, $admin_message);
        
        // Notify repair shop customers who frequently order this product
        $this->notify_frequent_customers($product, $current_stock);
        
        // WhatsApp notification to admin
        $this->send_whatsapp_notification($product_name, $current_stock, 'low_stock');
    }
    
    // Send out of stock alerts
    private function send_out_of_stock_alert($product) {
        $product_name = $product->get_name();
        $product_sku = $product->get_sku();
        
        // Admin notification
        $admin_subject = sprintf(__('OUT OF STOCK: %s', 'nexus-techhub'), $product_name);
        $admin_message = sprintf(
            __("URGENT: Product is now out of stock:\n\nProduct: %s\nSKU: %s\nAction Required: Restock immediately\n\nThis product may have pending orders or repair shop customers waiting.", 'nexus-techhub'),
            $product_name,
            $product_sku
        );
        
        wp_mail('admin@nexustechhub.ae', $admin_subject, $admin_message);
        
        // WhatsApp urgent notification
        $this->send_whatsapp_notification($product_name, 0, 'out_of_stock');
    }
    
    // Notify frequent customers (repair shops) about low stock
    private function notify_frequent_customers($product, $current_stock) {
        global $wpdb;
        
        // Find customers who have ordered this product in the last 6 months
        $frequent_customers = $wpdb->get_results($wpdb->prepare("
            SELECT DISTINCT o.customer_id, u.user_email, u.display_name,
                   COUNT(oi.order_id) as order_count
            FROM {$wpdb->prefix}wc_order_product_lookup oi
            JOIN {$wpdb->prefix}wc_order_stats o ON oi.order_id = o.order_id
            JOIN {$wpdb->users} u ON o.customer_id = u.ID
            WHERE oi.product_id = %d 
            AND o.date_created >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
            AND o.status IN ('wc-completed', 'wc-processing')
            GROUP BY o.customer_id
            HAVING order_count >= 2
            ORDER BY order_count DESC
            LIMIT 10
        ", $product->get_id()));
        
        foreach ($frequent_customers as $customer) {
            $this->send_customer_low_stock_notification($customer, $product, $current_stock);
        }
    }
    
    // Send low stock notification to repair shop customers
    private function send_customer_low_stock_notification($customer, $product, $current_stock) {
        $product_name = $product->get_name();
        $product_url = get_permalink($product->get_id());
        
        $subject = sprintf(__('Low Stock Alert: %s - Nexus TechHub', 'nexus-techhub'), $product_name);
        $message = sprintf(
            __("Dear %s,\n\nWe wanted to inform you that one of your frequently ordered products is running low in stock:\n\nProduct: %s\nCurrent Stock: %d units\nOrder Now: %s\n\nAs a valued repair shop customer, we're giving you priority notice to ensure you can secure your inventory before it runs out.\n\nFor immediate orders or bulk pricing, contact us:\nWhatsApp: +971 58 553 1029\nPhone: +971 58 553 1029\n\nBest regards,\nNexus TechHub Team", 'nexus-techhub'),
            $customer->display_name,
            $product_name,
            $current_stock,
            $product_url
        );
        
        wp_mail($customer->user_email, $subject, $message);
    }
    
    // WhatsApp notification integration
    private function send_whatsapp_notification($product_name, $stock_level, $alert_type) {
        $admin_phone = '+971585531029';
        
        if ($alert_type === 'low_stock') {
            $message = sprintf(
                __('🔔 LOW STOCK ALERT\n\nProduct: %s\nStock: %d units\n\nAction needed: Reorder inventory\n\n- Nexus TechHub Inventory System', 'nexus-techhub'),
                $product_name,
                $stock_level
            );
        } else {
            $message = sprintf(
                __('🚨 OUT OF STOCK ALERT\n\nProduct: %s\nStock: 0 units\n\nURGENT: Restock immediately!\n\n- Nexus TechHub Inventory System', 'nexus-techhub'),
                $product_name
            );
        }
        
        // Store notification for admin dashboard
        $this->store_notification($message, $alert_type);
    }
    
    // Store notifications in database for admin dashboard
    private function store_notification($message, $type) {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'nexus_notifications';
        
        // Create notifications table if it doesn't exist
        $wpdb->query("CREATE TABLE IF NOT EXISTS $table_name (
            id int(11) NOT NULL AUTO_INCREMENT,
            message text NOT NULL,
            type varchar(50) NOT NULL,
            is_read tinyint(1) DEFAULT 0,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )");
        
        $wpdb->insert(
            $table_name,
            array(
                'message' => $message,
                'type' => $type,
                'is_read' => 0
            ),
            array('%s', '%s', '%d')
        );
    }
    
    // Log inventory changes
    private function log_inventory_change($product_id, $action_type, $quantity_change, $stock_after, $order_id = null, $notes = '') {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'nexus_inventory_tracking';
        
        $wpdb->insert(
            $table_name,
            array(
                'product_id' => $product_id,
                'action_type' => $action_type,
                'quantity_change' => $quantity_change,
                'stock_level_after' => $stock_after,
                'order_id' => $order_id,
                'user_id' => get_current_user_id(),
                'notes' => $notes
            ),
            array('%d', '%s', '%d', '%d', '%d', '%d', '%s')
        );
    }
    
    // Update inventory tracking when order stock is reduced
    public function update_inventory_tracking($order) {
        if (!is_object($order)) {
            $order = wc_get_order($order);
        }
        
        foreach ($order->get_items() as $item) {
            $product = $item->get_product();
            if ($product) {
                $quantity = $item->get_quantity();
                $stock_after = $product->get_stock_quantity();
                
                $this->log_inventory_change(
                    $product->get_id(),
                    'order_sale',
                    -$quantity,
                    $stock_after,
                    $order->get_id(),
                    sprintf(__('Sold via order #%d', 'nexus-techhub'), $order->get_id())
                );
            }
        }
    }
    
    // Add inventory management menu to admin
    public function add_inventory_menu() {
        add_menu_page(
            __('Inventory Management', 'nexus-techhub'),
            __('Inventory', 'nexus-techhub'),
            'manage_woocommerce',
            'nexus-inventory',
            array($this, 'inventory_dashboard'),
            'dashicons-chart-line',
            56
        );
        
        add_submenu_page(
            'nexus-inventory',
            __('Low Stock Alerts', 'nexus-techhub'),
            __('Low Stock', 'nexus-techhub'),
            'manage_woocommerce',
            'nexus-low-stock',
            array($this, 'low_stock_page')
        );
        
        add_submenu_page(
            'nexus-inventory',
            __('Inventory Reports', 'nexus-techhub'),
            __('Reports', 'nexus-techhub'),
            'manage_woocommerce',
            'nexus-inventory-reports',
            array($this, 'inventory_reports_page')
        );
    }
    
    // Inventory dashboard
    public function inventory_dashboard() {
        ?>
        <div class="wrap">
            <h1><?php _e('Nexus TechHub Inventory Management', 'nexus-techhub'); ?></h1>
            
            <div class="nexus-inventory-dashboard">
                <div class="inventory-stats">
                    <div class="stat-card low-stock">
                        <h3><?php _e('Low Stock Items', 'nexus-techhub'); ?></h3>
                        <div class="stat-number"><?php echo $this->get_low_stock_count(); ?></div>
                    </div>
                    
                    <div class="stat-card out-of-stock">
                        <h3><?php _e('Out of Stock', 'nexus-techhub'); ?></h3>
                        <div class="stat-number"><?php echo $this->get_out_of_stock_count(); ?></div>
                    </div>
                    
                    <div class="stat-card total-products">
                        <h3><?php _e('Total Products', 'nexus-techhub'); ?></h3>
                        <div class="stat-number"><?php echo $this->get_total_products_count(); ?></div>
                    </div>
                    
                    <div class="stat-card inventory-value">
                        <h3><?php _e('Inventory Value (AED)', 'nexus-techhub'); ?></h3>
                        <div class="stat-number"><?php echo $this->get_inventory_value(); ?></div>
                    </div>
                </div>
                
                <div class="recent-activity">
                    <h2><?php _e('Recent Inventory Activity', 'nexus-techhub'); ?></h2>
                    <?php $this->display_recent_activity(); ?>
                </div>
            </div>
        </div>
        
        <style>
        .nexus-inventory-dashboard {
            margin-top: 20px;
        }
        
        .inventory-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            border-left: 4px solid #10b981;
        }
        
        .stat-card.low-stock {
            border-left-color: #f59e0b;
        }
        
        .stat-card.out-of-stock {
            border-left-color: #ef4444;
        }
        
        .stat-card h3 {
            margin: 0 0 10px 0;
            color: #374151;
            font-size: 14px;
            font-weight: 500;
        }
        
        .stat-number {
            font-size: 32px;
            font-weight: bold;
            color: #10b981;
        }
        
        .stat-card.low-stock .stat-number {
            color: #f59e0b;
        }
        
        .stat-card.out-of-stock .stat-number {
            color: #ef4444;
        }
        
        .recent-activity {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        </style>
        <?php
    }
    
    // Get low stock count
    private function get_low_stock_count() {
        global $wpdb;
        
        $count = $wpdb->get_var("
            SELECT COUNT(*)
            FROM {$wpdb->posts} p
            JOIN {$wpdb->postmeta} pm1 ON p.ID = pm1.post_id AND pm1.meta_key = '_stock'
            JOIN {$wpdb->postmeta} pm2 ON p.ID = pm2.post_id AND pm2.meta_key = '_low_stock_amount'
            WHERE p.post_type = 'product'
            AND p.post_status = 'publish'
            AND CAST(pm1.meta_value AS SIGNED) <= CAST(pm2.meta_value AS SIGNED)
            AND CAST(pm1.meta_value AS SIGNED) > 0
        ");
        
        return $count ? $count : 0;
    }
    
    // Get out of stock count
    private function get_out_of_stock_count() {
        global $wpdb;
        
        $count = $wpdb->get_var("
            SELECT COUNT(*)
            FROM {$wpdb->posts} p
            JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id AND pm.meta_key = '_stock'
            WHERE p.post_type = 'product'
            AND p.post_status = 'publish'
            AND CAST(pm.meta_value AS SIGNED) <= 0
        ");
        
        return $count ? $count : 0;
    }
    
    // Get total products count
    private function get_total_products_count() {
        $count = wp_count_posts('product');
        return $count->publish;
    }
    
    // Get inventory value
    private function get_inventory_value() {
        global $wpdb;
        
        $value = $wpdb->get_var("
            SELECT SUM(CAST(pm1.meta_value AS DECIMAL(10,2)) * CAST(pm2.meta_value AS SIGNED))
            FROM {$wpdb->posts} p
            JOIN {$wpdb->postmeta} pm1 ON p.ID = pm1.post_id AND pm1.meta_key = '_price'
            JOIN {$wpdb->postmeta} pm2 ON p.ID = pm2.post_id AND pm2.meta_key = '_stock'
            WHERE p.post_type = 'product'
            AND p.post_status = 'publish'
            AND pm1.meta_value != ''
            AND pm2.meta_value != ''
        ");
        
        return $value ? number_format($value, 2) : '0.00';
    }
    
    // Display recent inventory activity
    private function display_recent_activity() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'nexus_inventory_tracking';
        
        $activities = $wpdb->get_results("
            SELECT it.*, p.post_title
            FROM $table_name it
            JOIN {$wpdb->posts} p ON it.product_id = p.ID
            ORDER BY it.created_at DESC
            LIMIT 10
        ");
        
        if ($activities) {
            echo '<table class="wp-list-table widefat fixed striped">';
            echo '<thead><tr>';
            echo '<th>' . __('Product', 'nexus-techhub') . '</th>';
            echo '<th>' . __('Action', 'nexus-techhub') . '</th>';
            echo '<th>' . __('Change', 'nexus-techhub') . '</th>';
            echo '<th>' . __('Stock After', 'nexus-techhub') . '</th>';
            echo '<th>' . __('Date', 'nexus-techhub') . '</th>';
            echo '</tr></thead><tbody>';
            
            foreach ($activities as $activity) {
                echo '<tr>';
                echo '<td>' . esc_html($activity->post_title) . '</td>';
                echo '<td>' . esc_html($activity->action_type) . '</td>';
                echo '<td>' . ($activity->quantity_change > 0 ? '+' : '') . $activity->quantity_change . '</td>';
                echo '<td>' . $activity->stock_level_after . '</td>';
                echo '<td>' . date('M j, Y H:i', strtotime($activity->created_at)) . '</td>';
                echo '</tr>';
            }
            
            echo '</tbody></table>';
        } else {
            echo '<p>' . __('No recent inventory activity.', 'nexus-techhub') . '</p>';
        }
    }
    
    // Low stock page
    public function low_stock_page() {
        // Implementation for low stock management page
        echo '<div class="wrap"><h1>' . __('Low Stock Management', 'nexus-techhub') . '</h1></div>';
    }
    
    // Inventory reports page
    public function inventory_reports_page() {
        // Implementation for inventory reports page
        echo '<div class="wrap"><h1>' . __('Inventory Reports', 'nexus-techhub') . '</h1></div>';
    }
    
    // Enqueue scripts
    public function enqueue_scripts() {
        if (is_admin()) {
            wp_enqueue_script('nexus-inventory', get_template_directory_uri() . '/assets/js/inventory.js', array('jquery'), '1.0.0', true);
            wp_localize_script('nexus-inventory', 'nexus_inventory', array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('nexus_inventory_nonce')
            ));
        }
    }
    
    // Send daily inventory report
    public function send_daily_inventory_report() {
        $low_stock_products = $this->get_low_stock_products();
        $out_of_stock_products = $this->get_out_of_stock_products();
        
        if (!empty($low_stock_products) || !empty($out_of_stock_products)) {
            $subject = __('Daily Inventory Report - Nexus TechHub', 'nexus-techhub');
            $message = $this->generate_inventory_report_email($low_stock_products, $out_of_stock_products);
            
            wp_mail('admin@nexustechhub.ae', $subject, $message);
        }
    }
    
    // Get low stock products
    private function get_low_stock_products() {
        $args = array(
            'post_type' => 'product',
            'posts_per_page' => -1,
            'meta_query' => array(
                'relation' => 'AND',
                array(
                    'key' => '_manage_stock',
                    'value' => 'yes'
                ),
                array(
                    'key' => '_stock',
                    'value' => 5,
                    'compare' => '<=',
                    'type' => 'NUMERIC'
                ),
                array(
                    'key' => '_stock',
                    'value' => 0,
                    'compare' => '>',
                    'type' => 'NUMERIC'
                )
            )
        );
        
        return get_posts($args);
    }
    
    // Get out of stock products
    private function get_out_of_stock_products() {
        $args = array(
            'post_type' => 'product',
            'posts_per_page' => -1,
            'meta_query' => array(
                array(
                    'key' => '_manage_stock',
                    'value' => 'yes'
                ),
                array(
                    'key' => '_stock',
                    'value' => 0,
                    'compare' => '<=',
                    'type' => 'NUMERIC'
                )
            )
        );
        
        return get_posts($args);
    }
    
    // Generate inventory report email
    private function generate_inventory_report_email($low_stock, $out_of_stock) {
        $message = __("Daily Inventory Report - Nexus TechHub\n\n", 'nexus-techhub');
        
        if (!empty($out_of_stock)) {
            $message .= __("OUT OF STOCK ITEMS (URGENT):\n", 'nexus-techhub');
            foreach ($out_of_stock as $product) {
                $message .= sprintf("- %s (SKU: %s)\n", $product->post_title, get_post_meta($product->ID, '_sku', true));
            }
            $message .= "\n";
        }
        
        if (!empty($low_stock)) {
            $message .= __("LOW STOCK ITEMS:\n", 'nexus-techhub');
            foreach ($low_stock as $product) {
                $stock = get_post_meta($product->ID, '_stock', true);
                $message .= sprintf("- %s (SKU: %s) - %d units remaining\n", $product->post_title, get_post_meta($product->ID, '_sku', true), $stock);
            }
        }
        
        $message .= __("\nPlease review and restock as necessary.\n\nNexus TechHub Inventory System", 'nexus-techhub');
        
        return $message;
    }
}

// Initialize the inventory manager
new Nexus_Inventory_Manager();

?>
