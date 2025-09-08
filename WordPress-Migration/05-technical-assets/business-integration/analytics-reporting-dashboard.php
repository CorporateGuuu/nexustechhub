<?php
/**
 * Analytics and Reporting Dashboard - Nexus TechHub
 *
 * Comprehensive analytics for UAE business metrics, customer behavior,
 * sales performance, email marketing, WhatsApp engagement, and mobile repair parts trends
 */

// Analytics Dashboard Manager
class Nexus_Analytics_Dashboard {

    private $dashboard_widgets;
    private $uae_metrics;
    private $reporting_periods;

    public function __construct() {
        $this->init_dashboard_widgets();
        $this->init_uae_metrics();
        $this->init_reporting_periods();

        add_action('init', array($this, 'init'));
        add_action('admin_menu', array($this, 'add_analytics_menu'));
        add_action('wp_ajax_nexus_analytics_data', array($this, 'get_analytics_data'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_analytics_scripts'));
        add_action('wp_dashboard_setup', array($this, 'add_dashboard_widgets'));
    }

    public function init() {
        // Create analytics tracking tables
        $this->create_analytics_tables();

        // Schedule daily analytics processing
        if (!wp_next_scheduled('nexus_daily_analytics_processing')) {
            wp_schedule_event(time(), 'daily', 'nexus_daily_analytics_processing');
        }
        add_action('nexus_daily_analytics_processing', array($this, 'process_daily_analytics'));

        // Track page views and user interactions
        add_action('wp_footer', array($this, 'track_user_interactions'));
    }

    // Initialize dashboard widgets configuration
    private function init_dashboard_widgets() {
        $this->dashboard_widgets = array(
            'sales_overview' => array(
                'title' => __('UAE Sales Overview', 'nexus-techhub'),
                'callback' => 'render_sales_overview_widget',
                'priority' => 'high'
            ),
            'emirate_performance' => array(
                'title' => __('Sales by Emirates', 'nexus-techhub'),
                'callback' => 'render_emirate_performance_widget',
                'priority' => 'high'
            ),
            'product_trends' => array(
                'title' => __('Mobile Parts Trends', 'nexus-techhub'),
                'callback' => 'render_product_trends_widget',
                'priority' => 'normal'
            ),
            'customer_behavior' => array(
                'title' => __('Customer Behavior Analysis', 'nexus-techhub'),
                'callback' => 'render_customer_behavior_widget',
                'priority' => 'normal'
            ),
            'email_performance' => array(
                'title' => __('Email Marketing Performance', 'nexus-techhub'),
                'callback' => 'render_email_performance_widget',
                'priority' => 'normal'
            ),
            'whatsapp_engagement' => array(
                'title' => __('WhatsApp Engagement', 'nexus-techhub'),
                'callback' => 'render_whatsapp_engagement_widget',
                'priority' => 'normal'
            )
        );
    }

    // Initialize UAE-specific metrics
    private function init_uae_metrics() {
        $this->uae_metrics = array(
            'emirates' => array(
                'Dubai' => array('population' => 3400000, 'target_share' => 35),
                'Abu Dhabi' => array('population' => 1500000, 'target_share' => 20),
                'Sharjah' => array('population' => 1600000, 'target_share' => 18),
                'Ajman' => array('population' => 540000, 'target_share' => 8),
                'Ras Al Khaimah' => array('population' => 400000, 'target_share' => 10),
                'Fujairah' => array('population' => 250000, 'target_share' => 5),
                'Umm Al Quwain' => array('population' => 80000, 'target_share' => 4)
            ),
            'business_hours' => array(
                'sunday' => array('start' => '09:00', 'end' => '18:00'),
                'monday' => array('start' => '09:00', 'end' => '18:00'),
                'tuesday' => array('start' => '09:00', 'end' => '18:00'),
                'wednesday' => array('start' => '09:00', 'end' => '18:00'),
                'thursday' => array('start' => '09:00', 'end' => '18:00'),
                'friday' => array('start' => '14:00', 'end' => '18:00'),
                'saturday' => array('start' => '09:00', 'end' => '18:00')
            ),
            'currency' => 'AED',
            'vat_rate' => 0.05,
            'target_metrics' => array(
                'monthly_revenue' => 50000,
                'customer_acquisition' => 100,
                'average_order_value' => 150,
                'customer_retention' => 0.75
            )
        );
    }

    // Initialize reporting periods
    private function init_reporting_periods() {
        $this->reporting_periods = array(
            'today' => array(
                'label' => __('Today', 'nexus-techhub'),
                'start' => date('Y-m-d 00:00:00'),
                'end' => date('Y-m-d 23:59:59')
            ),
            'yesterday' => array(
                'label' => __('Yesterday', 'nexus-techhub'),
                'start' => date('Y-m-d 00:00:00', strtotime('-1 day')),
                'end' => date('Y-m-d 23:59:59', strtotime('-1 day'))
            ),
            'this_week' => array(
                'label' => __('This Week', 'nexus-techhub'),
                'start' => date('Y-m-d 00:00:00', strtotime('monday this week')),
                'end' => date('Y-m-d 23:59:59')
            ),
            'last_week' => array(
                'label' => __('Last Week', 'nexus-techhub'),
                'start' => date('Y-m-d 00:00:00', strtotime('monday last week')),
                'end' => date('Y-m-d 23:59:59', strtotime('sunday last week'))
            ),
            'this_month' => array(
                'label' => __('This Month', 'nexus-techhub'),
                'start' => date('Y-m-01 00:00:00'),
                'end' => date('Y-m-t 23:59:59')
            ),
            'last_month' => array(
                'label' => __('Last Month', 'nexus-techhub'),
                'start' => date('Y-m-01 00:00:00', strtotime('first day of last month')),
                'end' => date('Y-m-t 23:59:59', strtotime('last day of last month'))
            ),
            'this_quarter' => array(
                'label' => __('This Quarter', 'nexus-techhub'),
                'start' => date('Y-m-01 00:00:00', strtotime('first day of this quarter')),
                'end' => date('Y-m-t 23:59:59', strtotime('last day of this quarter'))
            ),
            'this_year' => array(
                'label' => __('This Year', 'nexus-techhub'),
                'start' => date('Y-01-01 00:00:00'),
                'end' => date('Y-12-31 23:59:59')
            )
        );
    }

    // Create analytics tracking tables
    private function create_analytics_tables() {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();

        // User interactions tracking table
        $interactions_table = $wpdb->prefix . 'nexus_user_interactions';
        $sql_interactions = "CREATE TABLE $interactions_table (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            user_id bigint(20) DEFAULT NULL,
            session_id varchar(100) NOT NULL,
            interaction_type varchar(50) NOT NULL,
            page_url varchar(500) NOT NULL,
            element_clicked varchar(200),
            interaction_data text,
            user_agent text,
            ip_address varchar(45),
            emirate varchar(50),
            device_type varchar(20),
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY user_id (user_id),
            KEY session_id (session_id),
            KEY interaction_type (interaction_type),
            KEY created_at (created_at)
        ) $charset_collate;";

        // Daily analytics summary table
        $daily_summary_table = $wpdb->prefix . 'nexus_daily_analytics';
        $sql_daily = "CREATE TABLE $daily_summary_table (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            date_recorded date NOT NULL,
            total_revenue decimal(10,2) DEFAULT 0,
            total_orders int(11) DEFAULT 0,
            new_customers int(11) DEFAULT 0,
            returning_customers int(11) DEFAULT 0,
            page_views int(11) DEFAULT 0,
            unique_visitors int(11) DEFAULT 0,
            whatsapp_clicks int(11) DEFAULT 0,
            email_opens int(11) DEFAULT 0,
            email_clicks int(11) DEFAULT 0,
            top_selling_product varchar(200),
            top_emirate varchar(50),
            average_order_value decimal(10,2) DEFAULT 0,
            conversion_rate decimal(5,4) DEFAULT 0,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY date_recorded (date_recorded)
        ) $charset_collate;";

        // Product performance tracking table
        $product_performance_table = $wpdb->prefix . 'nexus_product_analytics';
        $sql_products = "CREATE TABLE $product_performance_table (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            product_id bigint(20) NOT NULL,
            date_recorded date NOT NULL,
            views int(11) DEFAULT 0,
            add_to_cart int(11) DEFAULT 0,
            purchases int(11) DEFAULT 0,
            revenue decimal(10,2) DEFAULT 0,
            whatsapp_inquiries int(11) DEFAULT 0,
            search_appearances int(11) DEFAULT 0,
            conversion_rate decimal(5,4) DEFAULT 0,
            PRIMARY KEY (id),
            UNIQUE KEY product_date (product_id, date_recorded),
            KEY product_id (product_id),
            KEY date_recorded (date_recorded)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql_interactions);
        dbDelta($sql_daily);
        dbDelta($sql_products);
    }

    // Add analytics menu to admin
    public function add_analytics_menu() {
        add_menu_page(
            __('Nexus Analytics', 'nexus-techhub'),
            __('Analytics', 'nexus-techhub'),
            'manage_options',
            'nexus-analytics',
            array($this, 'render_analytics_dashboard'),
            'dashicons-chart-area',
            25
        );

        add_submenu_page(
            'nexus-analytics',
            __('UAE Business Metrics', 'nexus-techhub'),
            __('UAE Metrics', 'nexus-techhub'),
            'manage_options',
            'nexus-uae-metrics',
            array($this, 'render_uae_metrics_page')
        );

        add_submenu_page(
            'nexus-analytics',
            __('Customer Analysis', 'nexus-techhub'),
            __('Customers', 'nexus-techhub'),
            'manage_options',
            'nexus-customer-analysis',
            array($this, 'render_customer_analysis_page')
        );

        add_submenu_page(
            'nexus-analytics',
            __('Product Performance', 'nexus-techhub'),
            __('Products', 'nexus-techhub'),
            'manage_options',
            'nexus-product-performance',
            array($this, 'render_product_performance_page')
        );

        add_submenu_page(
            'nexus-analytics',
            __('Marketing Performance', 'nexus-techhub'),
            __('Marketing', 'nexus-techhub'),
            'manage_options',
            'nexus-marketing-performance',
            array($this, 'render_marketing_performance_page')
        );
    }

    // Render main analytics dashboard
    public function render_analytics_dashboard() {
        $current_period = isset($_GET['period']) ? sanitize_text_field($_GET['period']) : 'this_month';
        $period_data = $this->reporting_periods[$current_period];

        ?>
        <div class="wrap nexus-analytics-dashboard">
            <h1 class="wp-heading-inline">
                <i class="dashicons dashicons-chart-area"></i>
                <?php _e('Nexus TechHub Analytics Dashboard', 'nexus-techhub'); ?>
            </h1>

            <div class="nexus-analytics-header">
                <div class="period-selector">
                    <label for="analytics-period"><?php _e('Period:', 'nexus-techhub'); ?></label>
                    <select id="analytics-period" onchange="updateAnalyticsPeriod(this.value)">
                        <?php foreach ($this->reporting_periods as $key => $period) : ?>
                            <option value="<?php echo esc_attr($key); ?>" <?php selected($current_period, $key); ?>>
                                <?php echo esc_html($period['label']); ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="export-options">
                    <button class="button button-secondary" onclick="exportAnalyticsData('pdf')">
                        <i class="dashicons dashicons-pdf"></i>
                        <?php _e('Export PDF', 'nexus-techhub'); ?>
                    </button>
                    <button class="button button-secondary" onclick="exportAnalyticsData('excel')">
                        <i class="dashicons dashicons-media-spreadsheet"></i>
                        <?php _e('Export Excel', 'nexus-techhub'); ?>
                    </button>
                </div>
            </div>

            <div class="nexus-analytics-grid">
                <!-- Key Performance Indicators -->
                <div class="analytics-section kpi-section">
                    <h2><?php _e('Key Performance Indicators', 'nexus-techhub'); ?></h2>
                    <div class="kpi-grid">
                        <?php $this->render_kpi_cards($period_data); ?>
                    </div>
                </div>

                <!-- Sales Performance Chart -->
                <div class="analytics-section chart-section">
                    <h2><?php _e('Sales Performance Trends', 'nexus-techhub'); ?></h2>
                    <div class="chart-container">
                        <canvas id="sales-performance-chart"></canvas>
                    </div>
                </div>

                <!-- UAE Emirates Performance -->
                <div class="analytics-section emirates-section">
                    <h2><?php _e('Performance by Emirates', 'nexus-techhub'); ?></h2>
                    <div class="emirates-grid">
                        <?php $this->render_emirates_performance($period_data); ?>
                    </div>
                </div>

                <!-- Product Categories Performance -->
                <div class="analytics-section products-section">
                    <h2><?php _e('Mobile Parts Categories Performance', 'nexus-techhub'); ?></h2>
                    <div class="products-performance">
                        <?php $this->render_product_categories_performance($period_data); ?>
                    </div>
                </div>

                <!-- Customer Behavior Analysis -->
                <div class="analytics-section behavior-section">
                    <h2><?php _e('Customer Behavior Analysis', 'nexus-techhub'); ?></h2>
                    <div class="behavior-analysis">
                        <?php $this->render_customer_behavior_analysis($period_data); ?>
                    </div>
                </div>

                <!-- Marketing Performance -->
                <div class="analytics-section marketing-section">
                    <h2><?php _e('Marketing Channel Performance', 'nexus-techhub'); ?></h2>
                    <div class="marketing-performance">
                        <?php $this->render_marketing_performance($period_data); ?>
                    </div>
                </div>
            </div>
        </div>

        <style>
        .nexus-analytics-dashboard {
            margin: 20px;
        }

        .nexus-analytics-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 20px 0;
            padding: 15px;
            background: white;
            border: 1px solid #ccd0d4;
            border-radius: 4px;
        }

        .period-selector select {
            margin-left: 10px;
            padding: 5px 10px;
        }

        .export-options {
            display: flex;
            gap: 10px;
        }

        .nexus-analytics-grid {
            display: grid;
            gap: 20px;
        }

        .analytics-section {
            background: white;
            border: 1px solid #ccd0d4;
            border-radius: 4px;
            padding: 20px;
        }

        .analytics-section h2 {
            margin-top: 0;
            color: #10b981;
            border-bottom: 2px solid #10b981;
            padding-bottom: 10px;
        }

        .kpi-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }

        .kpi-card {
            background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .kpi-value {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .kpi-label {
            font-size: 0.9rem;
            opacity: 0.9;
        }

        .kpi-change {
            font-size: 0.8rem;
            margin-top: 5px;
        }

        .kpi-change.positive {
            color: #d1fae5;
        }

        .kpi-change.negative {
            color: #fecaca;
        }

        .chart-container {
            height: 400px;
            margin-top: 20px;
        }

        .emirates-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }

        .emirate-card {
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 15px;
            text-align: center;
        }

        .emirate-name {
            font-weight: bold;
            color: #374151;
            margin-bottom: 10px;
        }

        .emirate-stats {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        .emirate-stat {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
        }

        @media (max-width: 768px) {
            .nexus-analytics-header {
                flex-direction: column;
                gap: 15px;
            }

            .kpi-grid {
                grid-template-columns: 1fr;
            }

            .emirates-grid {
                grid-template-columns: 1fr;
            }
        }
        </style>
        <?php
    }