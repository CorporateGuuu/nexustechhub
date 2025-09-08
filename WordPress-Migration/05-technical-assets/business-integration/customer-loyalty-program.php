<?php
/**
 * Advanced Customer Loyalty Program - Nexus TechHub
 *
 * Points system, tier-based benefits for repair shops, referral rewards,
 * and UAE-specific loyalty features for mobile repair parts business
 */

// Customer Loyalty Program Manager
class Nexus_Loyalty_Program {

    private $loyalty_tiers;
    private $points_system;
    private $uae_benefits;

    public function __construct() {
        $this->init_loyalty_tiers();
        $this->init_points_system();
        $this->init_uae_benefits();

        add_action('init', array($this, 'init'));
        add_action('woocommerce_order_status_completed', array($this, 'award_purchase_points'));
        add_action('woocommerce_new_customer', array($this, 'award_signup_bonus'));
        add_action('wp_ajax_redeem_loyalty_points', array($this, 'redeem_points'));
        add_action('wp_ajax_refer_friend', array($this, 'process_referral'));
        add_action('woocommerce_account_menu_items', array($this, 'add_loyalty_menu_item'));
        add_action('woocommerce_account_loyalty-program_endpoint', array($this, 'loyalty_program_content'));
    }

    public function init() {
        // Add loyalty program endpoint
        add_rewrite_endpoint('loyalty-program', EP_ROOT | EP_PAGES);

        // Create loyalty program tables
        $this->create_loyalty_tables();

        // Add loyalty program fields to customer registration
        add_action('woocommerce_register_form', array($this, 'add_referral_field'));
        add_action('woocommerce_created_customer', array($this, 'process_registration_referral'));

        // Add points display to product pages
        add_action('woocommerce_single_product_summary', array($this, 'display_points_earning'), 25);

        // Schedule monthly tier evaluation
        if (!wp_next_scheduled('nexus_monthly_tier_evaluation')) {
            wp_schedule_event(strtotime('first day of next month'), 'monthly', 'nexus_monthly_tier_evaluation');
        }
        add_action('nexus_monthly_tier_evaluation', array($this, 'evaluate_customer_tiers'));
    }

    // Initialize loyalty tiers
    private function init_loyalty_tiers() {
        $this->loyalty_tiers = array(
            'bronze' => array(
                'name' => __('Bronze Member', 'nexus-techhub'),
                'arabic_name' => 'عضو برونزي',
                'min_points' => 0,
                'min_spending' => 0,
                'benefits' => array(
                    'points_multiplier' => 1.0,
                    'discount_percentage' => 0,
                    'free_shipping_threshold' => 200,
                    'priority_support' => false,
                    'exclusive_offers' => false,
                    'early_access' => false
                ),
                'color' => '#cd7f32',
                'icon' => 'bronze-medal.svg'
            ),
            'silver' => array(
                'name' => __('Silver Member', 'nexus-techhub'),
                'arabic_name' => 'عضو فضي',
                'min_points' => 500,
                'min_spending' => 1000,
                'benefits' => array(
                    'points_multiplier' => 1.25,
                    'discount_percentage' => 5,
                    'free_shipping_threshold' => 150,
                    'priority_support' => true,
                    'exclusive_offers' => true,
                    'early_access' => false
                ),
                'color' => '#c0c0c0',
                'icon' => 'silver-medal.svg'
            ),
            'gold' => array(
                'name' => __('Gold Member', 'nexus-techhub'),
                'arabic_name' => 'عضو ذهبي',
                'min_points' => 1500,
                'min_spending' => 3000,
                'benefits' => array(
                    'points_multiplier' => 1.5,
                    'discount_percentage' => 10,
                    'free_shipping_threshold' => 100,
                    'priority_support' => true,
                    'exclusive_offers' => true,
                    'early_access' => true
                ),
                'color' => '#ffd700',
                'icon' => 'gold-medal.svg'
            ),
            'platinum' => array(
                'name' => __('Platinum Member', 'nexus-techhub'),
                'arabic_name' => 'عضو بلاتيني',
                'min_points' => 3000,
                'min_spending' => 7500,
                'benefits' => array(
                    'points_multiplier' => 2.0,
                    'discount_percentage' => 15,
                    'free_shipping_threshold' => 0,
                    'priority_support' => true,
                    'exclusive_offers' => true,
                    'early_access' => true
                ),
                'color' => '#e5e4e2',
                'icon' => 'platinum-medal.svg'
            ),
            'repair_shop_bronze' => array(
                'name' => __('Repair Shop Bronze', 'nexus-techhub'),
                'arabic_name' => 'ورشة إصلاح برونزية',
                'min_points' => 0,
                'min_spending' => 0,
                'min_bulk_orders' => 1,
                'benefits' => array(
                    'points_multiplier' => 1.5,
                    'discount_percentage' => 10,
                    'bulk_discount' => 5,
                    'free_shipping_threshold' => 100,
                    'priority_support' => true,
                    'technical_support' => true,
                    'installation_guides' => true
                ),
                'color' => '#8b4513',
                'icon' => 'repair-bronze.svg'
            ),
            'repair_shop_silver' => array(
                'name' => __('Repair Shop Silver', 'nexus-techhub'),
                'arabic_name' => 'ورشة إصلاح فضية',
                'min_points' => 1000,
                'min_spending' => 5000,
                'min_bulk_orders' => 5,
                'benefits' => array(
                    'points_multiplier' => 2.0,
                    'discount_percentage' => 15,
                    'bulk_discount' => 10,
                    'free_shipping_threshold' => 0,
                    'priority_support' => true,
                    'technical_support' => true,
                    'installation_guides' => true,
                    'training_access' => true
                ),
                'color' => '#708090',
                'icon' => 'repair-silver.svg'
            ),
            'repair_shop_gold' => array(
                'name' => __('Repair Shop Gold', 'nexus-techhub'),
                'arabic_name' => 'ورشة إصلاح ذهبية',
                'min_points' => 2500,
                'min_spending' => 15000,
                'min_bulk_orders' => 15,
                'benefits' => array(
                    'points_multiplier' => 2.5,
                    'discount_percentage' => 20,
                    'bulk_discount' => 15,
                    'free_shipping_threshold' => 0,
                    'priority_support' => true,
                    'technical_support' => true,
                    'installation_guides' => true,
                    'training_access' => true,
                    'dedicated_account_manager' => true,
                    'custom_pricing' => true
                ),
                'color' => '#daa520',
                'icon' => 'repair-gold.svg'
            )
        );
    }

    // Initialize points system
    private function init_points_system() {
        $this->points_system = array(
            'earning_rules' => array(
                'purchase' => array(
                    'points_per_aed' => 1, // 1 point per AED spent
                    'minimum_order' => 10 // Minimum AED 10 order
                ),
                'signup' => array(
                    'points' => 100,
                    'description' => __('Welcome bonus for new customers', 'nexus-techhub')
                ),
                'referral' => array(
                    'referrer_points' => 200,
                    'referee_points' => 100,
                    'minimum_purchase' => 50 // Referee must make AED 50 purchase
                ),
                'review' => array(
                    'points' => 25,
                    'description' => __('Points for product reviews', 'nexus-techhub')
                ),
                'social_share' => array(
                    'points' => 10,
                    'daily_limit' => 3,
                    'description' => __('Share products on social media', 'nexus-techhub')
                ),
                'birthday' => array(
                    'points' => 150,
                    'description' => __('Birthday bonus points', 'nexus-techhub')
                ),
                'bulk_order' => array(
                    'bonus_multiplier' => 1.5, // 50% bonus for orders 10+ items
                    'minimum_quantity' => 10
                )
            ),
            'redemption_rules' => array(
                'discount_voucher' => array(
                    'aed_5' => array('points' => 100, 'value' => 5),
                    'aed_10' => array('points' => 190, 'value' => 10),
                    'aed_25' => array('points' => 450, 'value' => 25),
                    'aed_50' => array('points' => 850, 'value' => 50),
                    'aed_100' => array('points' => 1600, 'value' => 100)
                ),
                'free_shipping' => array(
                    'points' => 50,
                    'description' => __('Free shipping on next order', 'nexus-techhub')
                ),
                'priority_support' => array(
                    'points' => 75,
                    'duration_days' => 30,
                    'description' => __('Priority WhatsApp support for 30 days', 'nexus-techhub')
                ),
                'exclusive_products' => array(
                    'points' => 300,
                    'description' => __('Access to exclusive repair tools', 'nexus-techhub')
                )
            ),
            'expiry_rules' => array(
                'points_expire_days' => 365, // Points expire after 1 year
                'tier_review_months' => 12, // Tier status reviewed annually
                'inactive_threshold_days' => 180 // Account considered inactive after 6 months
            )
        );
    }

    // Initialize UAE-specific benefits
    private function init_uae_benefits() {
        $this->uae_benefits = array(
            'ramadan_bonus' => array(
                'multiplier' => 2.0,
                'description' => __('Double points during Ramadan', 'nexus-techhub')
            ),
            'uae_national_day' => array(
                'bonus_points' => 250,
                'description' => __('UAE National Day celebration bonus', 'nexus-techhub')
            ),
            'emirate_specific' => array(
                'ras_al_khaimah' => array(
                    'local_pickup_bonus' => 50,
                    'description' => __('Bonus for local pickup in RAK', 'nexus-techhub')
                ),
                'dubai' => array(
                    'express_delivery_discount' => 10,
                    'description' => __('Express delivery discount in Dubai', 'nexus-techhub')
                )
            ),
            'arabic_language' => array(
                'bonus_points' => 25,
                'description' => __('Bonus for using Arabic language interface', 'nexus-techhub')
            ),
            'whatsapp_orders' => array(
                'bonus_points' => 15,
                'description' => __('Bonus for orders placed via WhatsApp', 'nexus-techhub')
            )
        );
    }

    // Create loyalty program database tables
    private function create_loyalty_tables() {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();

        // Customer loyalty points table
        $points_table = $wpdb->prefix . 'nexus_loyalty_points';
        $sql_points = "CREATE TABLE $points_table (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            customer_id bigint(20) NOT NULL,
            points_earned int(11) NOT NULL DEFAULT 0,
            points_redeemed int(11) NOT NULL DEFAULT 0,
            points_balance int(11) NOT NULL DEFAULT 0,
            current_tier varchar(50) NOT NULL DEFAULT 'bronze',
            tier_progress decimal(5,2) NOT NULL DEFAULT 0,
            lifetime_spending decimal(10,2) NOT NULL DEFAULT 0,
            total_orders int(11) NOT NULL DEFAULT 0,
            referrals_made int(11) NOT NULL DEFAULT 0,
            last_activity datetime DEFAULT CURRENT_TIMESTAMP,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY customer_id (customer_id)
        ) $charset_collate;";

        // Points transactions table
        $transactions_table = $wpdb->prefix . 'nexus_loyalty_transactions';
        $sql_transactions = "CREATE TABLE $transactions_table (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            customer_id bigint(20) NOT NULL,
            transaction_type varchar(50) NOT NULL,
            points_change int(11) NOT NULL,
            points_balance_after int(11) NOT NULL,
            order_id bigint(20) NULL,
            description text,
            expiry_date datetime NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY customer_id (customer_id),
            KEY transaction_type (transaction_type),
            KEY created_at (created_at)
        ) $charset_collate;";

        // Referrals tracking table
        $referrals_table = $wpdb->prefix . 'nexus_loyalty_referrals';
        $sql_referrals = "CREATE TABLE $referrals_table (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            referrer_id bigint(20) NOT NULL,
            referee_id bigint(20) NOT NULL,
            referral_code varchar(20) NOT NULL,
            status varchar(20) NOT NULL DEFAULT 'pending',
            referrer_points int(11) NOT NULL DEFAULT 0,
            referee_points int(11) NOT NULL DEFAULT 0,
            qualifying_order_id bigint(20) NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            completed_at datetime NULL,
            PRIMARY KEY (id),
            UNIQUE KEY referral_code (referral_code),
            KEY referrer_id (referrer_id),
            KEY referee_id (referee_id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql_points);
        dbDelta($sql_transactions);
        dbDelta($sql_referrals);
    }

    // Award points for completed purchases
    public function award_purchase_points($order_id) {
        $order = wc_get_order($order_id);
        $customer_id = $order->get_customer_id();

        if (!$customer_id) {
            return;
        }

        $order_total = $order->get_total();
        $customer_tier = $this->get_customer_tier($customer_id);
        $tier_data = $this->loyalty_tiers[$customer_tier];

        // Calculate base points
        $base_points = floor($order_total * $this->points_system['earning_rules']['purchase']['points_per_aed']);

        // Apply tier multiplier
        $points_earned = floor($base_points * $tier_data['benefits']['points_multiplier']);

        // Check for bulk order bonus
        $item_count = 0;
        foreach ($order->get_items() as $item) {
            $item_count += $item->get_quantity();
        }

        if ($item_count >= $this->points_system['earning_rules']['bulk_order']['minimum_quantity']) {
            $points_earned = floor($points_earned * $this->points_system['earning_rules']['bulk_order']['bonus_multiplier']);
        }

        // Check for UAE-specific bonuses
        $points_earned += $this->calculate_uae_bonuses($order, $customer_id);

        // Award points
        $this->add_points($customer_id, $points_earned, 'purchase', $order_id,
            sprintf(__('Points earned from order #%s', 'nexus-techhub'), $order->get_order_number()));

        // Update customer statistics
        $this->update_customer_stats($customer_id, $order_total);

        // Check for tier upgrade
        $this->check_tier_upgrade($customer_id);
    }

    // Award signup bonus
    public function award_signup_bonus($customer_id) {
        $signup_points = $this->points_system['earning_rules']['signup']['points'];

        $this->add_points($customer_id, $signup_points, 'signup', null,
            $this->points_system['earning_rules']['signup']['description']);

        // Initialize customer loyalty record
        $this->initialize_customer_loyalty($customer_id);
    }

    // Add points to customer account
    private function add_points($customer_id, $points, $type, $order_id = null, $description = '') {
        global $wpdb;

        // Get current balance
        $current_balance = $this->get_customer_points_balance($customer_id);
        $new_balance = $current_balance + $points;

        // Update customer points
        $points_table = $wpdb->prefix . 'nexus_loyalty_points';
        $wpdb->query($wpdb->prepare("
            INSERT INTO $points_table (customer_id, points_earned, points_balance)
            VALUES (%d, %d, %d)
            ON DUPLICATE KEY UPDATE
            points_earned = points_earned + %d,
            points_balance = %d,
            last_activity = NOW()
        ", $customer_id, $points, $new_balance, $points, $new_balance));

        // Record transaction
        $transactions_table = $wpdb->prefix . 'nexus_loyalty_transactions';
        $expiry_date = date('Y-m-d H:i:s', strtotime('+' . $this->points_system['expiry_rules']['points_expire_days'] . ' days'));

        $wpdb->insert(
            $transactions_table,
            array(
                'customer_id' => $customer_id,
                'transaction_type' => $type,
                'points_change' => $points,
                'points_balance_after' => $new_balance,
                'order_id' => $order_id,
                'description' => $description,
                'expiry_date' => $expiry_date
            ),
            array('%d', '%s', '%d', '%d', '%d', '%s', '%s')
        );

        // Send notification
        $this->send_points_notification($customer_id, $points, $type);
    }