<?php
/**
 * Advanced WhatsApp Integration with Chatbot - Nexus TechHub
 *
 * Automated product inquiries, chatbot responses, and UAE business integration
 * for mobile repair parts customer support
 */

// Advanced WhatsApp Integration Manager
class Nexus_WhatsApp_Integration {

    private $whatsapp_number;
    private $business_hours;
    private $chatbot_responses;

    public function __construct() {
        $this->whatsapp_number = '+971585531029';
        $this->init_business_hours();
        $this->init_chatbot_responses();

        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_footer', array($this, 'render_whatsapp_widget'));
        add_action('woocommerce_single_product_summary', array($this, 'add_product_whatsapp_button'), 35);
        add_action('wp_ajax_whatsapp_inquiry', array($this, 'handle_whatsapp_inquiry'));
        add_action('wp_ajax_nopriv_whatsapp_inquiry', array($this, 'handle_whatsapp_inquiry'));
        add_filter('woocommerce_add_to_cart_message_html', array($this, 'add_whatsapp_to_cart_message'));
    }

    public function init() {
        // Create WhatsApp inquiries tracking table
        $this->create_inquiries_table();

        // Add WhatsApp settings to admin
        add_action('admin_menu', array($this, 'add_whatsapp_admin_menu'));

        // Schedule automated responses cleanup
        if (!wp_next_scheduled('nexus_cleanup_whatsapp_logs')) {
            wp_schedule_event(time(), 'daily', 'nexus_cleanup_whatsapp_logs');
        }
        add_action('nexus_cleanup_whatsapp_logs', array($this, 'cleanup_old_inquiries'));
    }

    // Initialize UAE business hours
    private function init_business_hours() {
        $this->business_hours = array(
            'sunday' => array('open' => '09:00', 'close' => '18:00'),
            'monday' => array('open' => '09:00', 'close' => '18:00'),
            'tuesday' => array('open' => '09:00', 'close' => '18:00'),
            'wednesday' => array('open' => '09:00', 'close' => '18:00'),
            'thursday' => array('open' => '09:00', 'close' => '18:00'),
            'friday' => array('open' => '14:00', 'close' => '18:00'), // UAE Friday schedule
            'saturday' => array('open' => '09:00', 'close' => '18:00')
        );
    }

    // Initialize chatbot responses for mobile repair parts
    private function init_chatbot_responses() {
        $this->chatbot_responses = array(
            'greeting' => array(
                'triggers' => array('hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'مرحبا', 'السلام عليكم'),
                'responses' => array(
                    'Hello! Welcome to Nexus TechHub 👋',
                    'مرحباً بك في نكسوس تك هب! 🔧',
                    'Hi there! How can I help you with mobile repair parts today?',
                    'Welcome to UAE\'s premier mobile repair parts supplier! 📱'
                )
            ),
            'product_inquiry' => array(
                'triggers' => array('price', 'cost', 'how much', 'available', 'stock', 'in stock', 'السعر', 'كم', 'متوفر'),
                'responses' => array(
                    'I\'d be happy to help you with pricing and availability! 💰',
                    'Let me check our current stock and prices for you 📋',
                    'Our prices include 5% UAE VAT and we offer bulk discounts for repair shops 🏪',
                    'Which specific device model are you looking for? iPhone, Samsung, or iPad? 📱'
                )
            ),
            'iphone_parts' => array(
                'triggers' => array('iphone', 'apple', 'ios', 'iphone 15', 'iphone 14', 'iphone 13', 'ايفون'),
                'responses' => array(
                    'We have complete iPhone parts inventory! 📱',
                    'iPhone parts available: Screens, Batteries, Cameras, Charging Ports, Speakers 🔧',
                    'Which iPhone model? We stock from iPhone 6 to iPhone 15 Pro Max ✨',
                    'All iPhone parts come with warranty and fast UAE delivery 🚚'
                )
            ),
            'samsung_parts' => array(
                'triggers' => array('samsung', 'galaxy', 'android', 's24', 's23', 's22', 'note', 'سامسونغ'),
                'responses' => array(
                    'Samsung Galaxy parts in stock! 🌟',
                    'We carry S-Series, Note Series, and A-Series components 📱',
                    'Galaxy parts: Displays, Batteries, Cameras, Charging Ports, Back Covers 🔧',
                    'Which Galaxy model are you repairing? 🛠️'
                )
            ),
            'ipad_parts' => array(
                'triggers' => array('ipad', 'tablet', 'ipad pro', 'ipad air', 'ipad mini', 'ايباد'),
                'responses' => array(
                    'iPad repair parts available! 📱',
                    'We stock iPad Pro, Air, Mini, and standard iPad components 🔧',
                    'iPad parts: Screens, Batteries, Charging Ports, Cameras, Home Buttons ⚡',
                    'Professional quality iPad parts with warranty 🛡️'
                )
            ),
            'shipping' => array(
                'triggers' => array('delivery', 'shipping', 'ship', 'send', 'courier', 'توصيل', 'شحن'),
                'responses' => array(
                    'Fast UAE shipping available! 🚚',
                    '24-48 hour delivery across all Emirates ⚡',
                    'Free shipping on orders over AED 200 💰',
                    'Same-day delivery available in Ras Al Khaimah 🏃‍♂️'
                )
            ),
            'bulk_orders' => array(
                'triggers' => array('bulk', 'wholesale', 'repair shop', 'business', 'quantity', 'discount', 'جملة', 'كمية'),
                'responses' => array(
                    'Special bulk pricing for repair shops! 🏪',
                    'Discounts: 5-19 units (5% off), 20-49 units (10% off), 50+ units (15% off) 💰',
                    'Wholesale pricing available for 100+ units (20% off) 📦',
                    'Let me prepare a custom quote for your repair business 📋'
                )
            ),
            'warranty' => array(
                'triggers' => array('warranty', 'guarantee', 'return', 'exchange', 'defective', 'ضمان', 'استبدال'),
                'responses' => array(
                    'All parts come with warranty! 🛡️',
                    'Warranty periods: Premium parts (12 months), Standard parts (6 months) ⏰',
                    'Easy returns and exchanges within warranty period 🔄',
                    'Quality guaranteed - we stand behind our products! ✅'
                )
            ),
            'payment' => array(
                'triggers' => array('payment', 'pay', 'card', 'cash', 'cod', 'stripe', 'دفع', 'نقد'),
                'responses' => array(
                    'Multiple payment options available! 💳',
                    'Credit/Debit cards, Bank transfer, Cash on Delivery 💰',
                    'All payments include 5% UAE VAT 🧾',
                    'Secure payment processing with Stripe 🔒'
                )
            ),
            'business_hours' => array(
                'triggers' => array('hours', 'open', 'closed', 'time', 'when', 'ساعات', 'مفتوح', 'وقت'),
                'responses' => array(
                    'Business Hours (UAE Time): ⏰',
                    'Sunday-Thursday: 9:00 AM - 6:00 PM 🕘',
                    'Friday: 2:00 PM - 6:00 PM 🕐',
                    'Saturday: 9:00 AM - 6:00 PM 🕘'
                )
            ),
            'location' => array(
                'triggers' => array('location', 'address', 'where', 'visit', 'store', 'موقع', 'عنوان', 'أين'),
                'responses' => array(
                    'Visit our location in Ras Al Khaimah! 📍',
                    'Address: FAMC3062, Compass Building, Al Shohada Road 🏢',
                    'AL Hamra Industrial Zone-FZ, Ras Al Khaimah, UAE 🇦🇪',
                    'Easy access from all Emirates! 🚗'
                )
            ),
            'fallback' => array(
                'triggers' => array(),
                'responses' => array(
                    'I\'m here to help with mobile repair parts! 🔧',
                    'Let me connect you with our team for personalized assistance 👥',
                    'Feel free to ask about iPhone, Samsung, iPad parts, or bulk pricing 📱',
                    'Our experts are ready to help with your repair needs! 🛠️'
                )
            )
        );
    }

    // Create WhatsApp inquiries tracking table
    private function create_inquiries_table() {
        global $wpdb;

        $table_name = $wpdb->prefix . 'nexus_whatsapp_inquiries';

        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            customer_phone varchar(20) NOT NULL,
            customer_name varchar(100),
            inquiry_type varchar(50) NOT NULL,
            product_id bigint(20) NULL,
            message_content text NOT NULL,
            automated_response text,
            inquiry_status varchar(20) DEFAULT 'new',
            follow_up_required tinyint(1) DEFAULT 0,
            assigned_agent varchar(100),
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            responded_at datetime NULL,
            PRIMARY KEY (id),
            KEY customer_phone (customer_phone),
            KEY inquiry_type (inquiry_type),
            KEY created_at (created_at)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    // Render WhatsApp floating widget
    public function render_whatsapp_widget() {
        $is_business_hours = $this->is_business_hours();
        $status_message = $is_business_hours ?
            __('We\'re online now!', 'nexus-techhub') :
            __('We\'ll respond soon!', 'nexus-techhub');

        ?>
        <div id="nexus-whatsapp-widget" class="whatsapp-widget">
            <div class="whatsapp-button" onclick="toggleWhatsAppChat()">
                <i class="fab fa-whatsapp"></i>
                <span class="status-indicator <?php echo $is_business_hours ? 'online' : 'offline'; ?>"></span>
            </div>

            <div class="whatsapp-chat-window" id="whatsapp-chat-window">
                <div class="chat-header">
                    <div class="chat-avatar">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/nexus-avatar.jpg" alt="Nexus TechHub">
                    </div>
                    <div class="chat-info">
                        <h4>Nexus TechHub</h4>
                        <p class="status"><?php echo $status_message; ?></p>
                    </div>
                    <button class="close-chat" onclick="toggleWhatsAppChat()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="chat-body">
                    <div class="welcome-message">
                        <div class="message bot-message">
                            <div class="message-content">
                                <p><?php _e('Hello! 👋 Welcome to Nexus TechHub', 'nexus-techhub'); ?></p>
                                <p><?php _e('How can I help you with mobile repair parts today?', 'nexus-techhub'); ?></p>
                            </div>
                            <div class="message-time"><?php echo current_time('H:i'); ?></div>
                        </div>
                    </div>

                    <div class="quick-options">
                        <h5><?php _e('Quick Options:', 'nexus-techhub'); ?></h5>
                        <div class="option-buttons">
                            <button class="option-btn" onclick="sendQuickMessage('iPhone parts pricing')">
                                📱 <?php _e('iPhone Parts', 'nexus-techhub'); ?>
                            </button>
                            <button class="option-btn" onclick="sendQuickMessage('Samsung parts availability')">
                                🌟 <?php _e('Samsung Parts', 'nexus-techhub'); ?>
                            </button>
                            <button class="option-btn" onclick="sendQuickMessage('iPad repair components')">
                                📱 <?php _e('iPad Parts', 'nexus-techhub'); ?>
                            </button>
                            <button class="option-btn" onclick="sendQuickMessage('Bulk pricing for repair shop')">
                                🏪 <?php _e('Bulk Pricing', 'nexus-techhub'); ?>
                            </button>
                            <button class="option-btn" onclick="sendQuickMessage('UAE shipping information')">
                                🚚 <?php _e('Shipping Info', 'nexus-techhub'); ?>
                            </button>
                            <button class="option-btn" onclick="sendQuickMessage('Warranty and returns policy')">
                                🛡️ <?php _e('Warranty', 'nexus-techhub'); ?>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="chat-footer">
                    <div class="message-input-container">
                        <input type="text"
                               id="whatsapp-message-input"
                               placeholder="<?php _e('Type your message...', 'nexus-techhub'); ?>"
                               onkeypress="handleMessageKeyPress(event)">
                        <button class="send-btn" onclick="sendWhatsAppMessage()">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    <div class="chat-actions">
                        <button class="action-btn" onclick="openWhatsAppDirect()">
                            <i class="fab fa-whatsapp"></i>
                            <?php _e('Open WhatsApp', 'nexus-techhub'); ?>
                        </button>
                        <button class="action-btn" onclick="callNexusTechHub()">
                            <i class="fas fa-phone"></i>
                            <?php _e('Call Us', 'nexus-techhub'); ?>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <style>
        .whatsapp-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .whatsapp-button {
            width: 60px;
            height: 60px;
            background: #25d366;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
            transition: all 0.3s ease;
            position: relative;
        }

        .whatsapp-button:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
        }

        .whatsapp-button i {
            font-size: 28px;
            color: white;
        }

        .status-indicator {
            position: absolute;
            top: 5px;
            right: 5px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid white;
        }

        .status-indicator.online {
            background: #4ade80;
        }

        .status-indicator.offline {
            background: #f87171;
        }

        .whatsapp-chat-window {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
            display: none;
            flex-direction: column;
            overflow: hidden;
        }

        .chat-header {
            background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
            color: white;
            padding: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .chat-avatar img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .chat-info h4 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
        }

        .chat-info .status {
            margin: 0;
            font-size: 12px;
            opacity: 0.9;
        }

        .close-chat {
            margin-left: auto;
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 5px;
        }

        .chat-body {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            background: #f8f9fa;
        }

        .message {
            margin-bottom: 15px;
        }

        .bot-message .message-content {
            background: white;
            padding: 12px 15px;
            border-radius: 18px 18px 18px 4px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .message-content p {
            margin: 0 0 5px 0;
            font-size: 14px;
            line-height: 1.4;
        }

        .message-content p:last-child {
            margin-bottom: 0;
        }

        .message-time {
            font-size: 11px;
            color: #6b7280;
            margin-top: 5px;
        }

        .quick-options {
            margin-top: 20px;
        }

        .quick-options h5 {
            margin: 0 0 10px 0;
            font-size: 14px;
            color: #374151;
            font-weight: 600;
        }

        .option-buttons {
            display: grid;
            gap: 8px;
        }

        .option-btn {
            background: white;
            border: 1px solid #e5e7eb;
            padding: 10px 12px;
            border-radius: 8px;
            text-align: left;
            cursor: pointer;
            font-size: 13px;
            transition: all 0.2s;
        }

        .option-btn:hover {
            background: #f3f4f6;
            border-color: #10b981;
        }

        .chat-footer {
            padding: 15px;
            border-top: 1px solid #e5e7eb;
            background: white;
        }

        .message-input-container {
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
        }

        .message-input-container input {
            flex: 1;
            padding: 10px 15px;
            border: 1px solid #e5e7eb;
            border-radius: 20px;
            font-size: 14px;
            outline: none;
        }

        .message-input-container input:focus {
            border-color: #10b981;
        }

        .send-btn {
            width: 40px;
            height: 40px;
            background: #10b981;
            border: none;
            border-radius: 50%;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .chat-actions {
            display: flex;
            gap: 8px;
        }

        .action-btn {
            flex: 1;
            padding: 8px 12px;
            background: #f3f4f6;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            font-size: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
        }

        .action-btn:hover {
            background: #e5e7eb;
        }

        @media (max-width: 768px) {
            .whatsapp-chat-window {
                width: 300px;
                height: 450px;
            }

            .whatsapp-widget {
                bottom: 15px;
                right: 15px;
            }
        }
        </style>
        <?php
    }