<?php
/**
 * Customer Portal System - Nexus TechHub
 *
 * Advanced customer portal with order tracking, repair history,
 * and UAE-specific features for mobile repair parts business
 */

// Customer Portal Manager Class
class Nexus_Customer_Portal {

    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_filter('woocommerce_account_menu_items', array($this, 'add_portal_menu_items'));
        add_action('woocommerce_account_repair-history_endpoint', array($this, 'repair_history_content'));
        add_action('woocommerce_account_order-tracking_endpoint', array($this, 'order_tracking_content'));
        add_action('woocommerce_account_bulk-orders_endpoint', array($this, 'bulk_orders_content'));
        add_action('woocommerce_account_support-tickets_endpoint', array($this, 'support_tickets_content'));
        add_action('wp_ajax_track_order_status', array($this, 'ajax_track_order_status'));
        add_action('wp_ajax_create_support_ticket', array($this, 'ajax_create_support_ticket'));
    }

    public function init() {
        // Add custom endpoints for customer portal
        add_rewrite_endpoint('repair-history', EP_ROOT | EP_PAGES);
        add_rewrite_endpoint('order-tracking', EP_ROOT | EP_PAGES);
        add_rewrite_endpoint('bulk-orders', EP_ROOT | EP_PAGES);
        add_rewrite_endpoint('support-tickets', EP_ROOT | EP_PAGES);

        // Create custom database tables for repair history
        $this->create_repair_history_table();

        // Register customer types for repair shops
        $this->register_customer_types();
    }

    // Create repair history database table
    private function create_repair_history_table() {
        global $wpdb;

        $table_name = $wpdb->prefix . 'nexus_repair_history';

        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            customer_id bigint(20) NOT NULL,
            order_id bigint(20) NOT NULL,
            device_model varchar(100) NOT NULL,
            repair_type varchar(100) NOT NULL,
            parts_used text,
            repair_status varchar(50) NOT NULL,
            repair_date datetime DEFAULT CURRENT_TIMESTAMP,
            completion_date datetime NULL,
            technician_notes text,
            customer_rating int(1) DEFAULT NULL,
            warranty_expiry datetime NULL,
            cost_aed decimal(10,2) NOT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY customer_id (customer_id),
            KEY order_id (order_id),
            KEY repair_date (repair_date)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    // Register customer types for different business segments
    private function register_customer_types() {
        // Add customer type meta field
        add_action('woocommerce_edit_account_form', array($this, 'add_customer_type_field'));
        add_action('woocommerce_save_account_details', array($this, 'save_customer_type_field'));
    }

    // Add customer portal menu items
    public function add_portal_menu_items($items) {
        // Remove logout and re-add at end
        $logout = $items['customer-logout'];
        unset($items['customer-logout']);

        // Add new menu items
        $items['repair-history'] = __('Repair History', 'nexus-techhub');
        $items['order-tracking'] = __('Order Tracking', 'nexus-techhub');
        $items['bulk-orders'] = __('Bulk Orders', 'nexus-techhub');
        $items['support-tickets'] = __('Support Tickets', 'nexus-techhub');

        // Re-add logout
        $items['customer-logout'] = $logout;

        return $items;
    }

    // Repair History Content
    public function repair_history_content() {
        $customer_id = get_current_user_id();
        $repair_history = $this->get_customer_repair_history($customer_id);

        ?>
        <div class="nexus-repair-history">
            <div class="portal-header">
                <h2 class="portal-title">
                    <i class="fas fa-tools text-primary"></i>
                    <?php _e('Repair History', 'nexus-techhub'); ?>
                </h2>
                <p class="portal-description">
                    <?php _e('Track your device repairs and warranty information', 'nexus-techhub'); ?>
                </p>
            </div>

            <?php if (!empty($repair_history)) : ?>
                <div class="repair-history-grid">
                    <?php foreach ($repair_history as $repair) : ?>
                        <div class="repair-card">
                            <div class="repair-header">
                                <div class="device-info">
                                    <h4 class="device-model"><?php echo esc_html($repair->device_model); ?></h4>
                                    <span class="repair-type"><?php echo esc_html($repair->repair_type); ?></span>
                                </div>
                                <div class="repair-status">
                                    <span class="status-badge status-<?php echo esc_attr(strtolower($repair->repair_status)); ?>">
                                        <?php echo esc_html($repair->repair_status); ?>
                                    </span>
                                </div>
                            </div>

                            <div class="repair-details">
                                <div class="detail-row">
                                    <span class="detail-label"><?php _e('Repair Date:', 'nexus-techhub'); ?></span>
                                    <span class="detail-value"><?php echo date('d/m/Y', strtotime($repair->repair_date)); ?></span>
                                </div>

                                <?php if ($repair->completion_date) : ?>
                                    <div class="detail-row">
                                        <span class="detail-label"><?php _e('Completed:', 'nexus-techhub'); ?></span>
                                        <span class="detail-value"><?php echo date('d/m/Y', strtotime($repair->completion_date)); ?></span>
                                    </div>
                                <?php endif; ?>

                                <div class="detail-row">
                                    <span class="detail-label"><?php _e('Cost:', 'nexus-techhub'); ?></span>
                                    <span class="detail-value cost-aed"><?php echo number_format($repair->cost_aed, 2); ?></span>
                                </div>

                                <?php if ($repair->warranty_expiry && strtotime($repair->warranty_expiry) > time()) : ?>
                                    <div class="detail-row warranty-active">
                                        <span class="detail-label"><?php _e('Warranty:', 'nexus-techhub'); ?></span>
                                        <span class="detail-value">
                                            <?php _e('Valid until', 'nexus-techhub'); ?>
                                            <?php echo date('d/m/Y', strtotime($repair->warranty_expiry)); ?>
                                        </span>
                                    </div>
                                <?php endif; ?>
                            </div>

                            <div class="repair-actions">
                                <button class="btn btn-outline-primary btn-sm" onclick="viewRepairDetails(<?php echo $repair->id; ?>)">
                                    <i class="fas fa-eye"></i>
                                    <?php _e('View Details', 'nexus-techhub'); ?>
                                </button>

                                <?php if ($repair->repair_status === 'Completed' && !$repair->customer_rating) : ?>
                                    <button class="btn btn-outline-success btn-sm" onclick="rateRepair(<?php echo $repair->id; ?>)">
                                        <i class="fas fa-star"></i>
                                        <?php _e('Rate Service', 'nexus-techhub'); ?>
                                    </button>
                                <?php endif; ?>

                                <a href="<?php echo nexus_get_whatsapp_link('Hi! I need support for repair #' . $repair->id); ?>"
                                   class="btn btn-whatsapp btn-sm" target="_blank">
                                    <i class="fab fa-whatsapp"></i>
                                    <?php _e('WhatsApp Support', 'nexus-techhub'); ?>
                                </a>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php else : ?>
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-tools fa-3x text-muted"></i>
                    </div>
                    <h4><?php _e('No Repair History', 'nexus-techhub'); ?></h4>
                    <p class="text-muted">
                        <?php _e('You haven\'t had any repairs with us yet. When you do, they\'ll appear here.', 'nexus-techhub'); ?>
                    </p>
                    <a href="<?php echo get_permalink(wc_get_page_id('shop')); ?>" class="btn btn-primary">
                        <i class="fas fa-shopping-bag"></i>
                        <?php _e('Shop Parts', 'nexus-techhub'); ?>
                    </a>
                </div>
            <?php endif; ?>
        </div>

        <style>
        .nexus-repair-history {
            max-width: 1200px;
            margin: 0 auto;
        }

        .portal-header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
            color: white;
            border-radius: 8px;
        }

        .portal-title {
            margin-bottom: 10px;
            font-size: 1.8rem;
        }

        .portal-description {
            margin: 0;
            opacity: 0.9;
        }

        .repair-history-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 20px;
        }

        .repair-card {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .repair-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .repair-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 15px;
        }

        .device-model {
            margin: 0 0 5px 0;
            color: #374151;
            font-size: 1.1rem;
        }

        .repair-type {
            color: #6b7280;
            font-size: 0.9rem;
        }

        .status-badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
            text-transform: uppercase;
        }

        .status-completed {
            background: #d1fae5;
            color: #065f46;
        }

        .status-in-progress {
            background: #fef3c7;
            color: #92400e;
        }

        .status-pending {
            background: #e0e7ff;
            color: #3730a3;
        }

        .repair-details {
            margin-bottom: 20px;
        }

        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            padding-bottom: 8px;
            border-bottom: 1px solid #f3f4f6;
        }

        .detail-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }

        .detail-label {
            color: #6b7280;
            font-weight: 500;
        }

        .detail-value {
            color: #374151;
            font-weight: 600;
        }

        .cost-aed::before {
            content: "د.إ ";
            color: #10b981;
        }

        .warranty-active .detail-value {
            color: #059669;
        }

        .repair-actions {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }

        .repair-actions .btn {
            flex: 1;
            min-width: 100px;
        }

        .empty-state {
            text-align: center;
            padding: 60px 20px;
        }

        .empty-icon {
            margin-bottom: 20px;
        }

        @media (max-width: 768px) {
            .repair-history-grid {
                grid-template-columns: 1fr;
            }

            .repair-header {
                flex-direction: column;
                gap: 10px;
            }

            .repair-actions {
                flex-direction: column;
            }

            .repair-actions .btn {
                width: 100%;
            }
        }
        </style>
        <?php
    }

    // Get customer repair history
    private function get_customer_repair_history($customer_id) {
        global $wpdb;

        $table_name = $wpdb->prefix . 'nexus_repair_history';

        return $wpdb->get_results($wpdb->prepare("
            SELECT * FROM $table_name
            WHERE customer_id = %d
            ORDER BY repair_date DESC
        ", $customer_id));
    }