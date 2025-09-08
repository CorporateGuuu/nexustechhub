<?php
/**
 * Multi-Language Arabic Support System - Nexus TechHub
 * 
 * RTL layout components, Arabic product descriptions, and UAE localization
 * for mobile repair parts business
 */

// Arabic Language Support Manager
class Nexus_Arabic_Support {
    
    private $supported_languages;
    private $rtl_languages;
    
    public function __construct() {
        $this->init_languages();
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_rtl_styles'));
        add_action('wp_head', array($this, 'add_rtl_meta_tags'));
        add_filter('body_class', array($this, 'add_language_body_classes'));
        add_action('woocommerce_product_options_general_product_data', array($this, 'add_arabic_product_fields'));
        add_action('woocommerce_process_product_meta', array($this, 'save_arabic_product_fields'));
        add_filter('the_content', array($this, 'add_arabic_content_support'));
        add_action('wp_footer', array($this, 'add_language_switcher'));
    }
    
    public function init() {
        // Load text domain for translations
        load_theme_textdomain('nexus-techhub', get_template_directory() . '/languages');
        
        // Register Arabic language support
        $this->register_arabic_support();
        
        // Create Arabic content tables
        $this->create_arabic_content_tables();
        
        // Add language switcher to menus
        add_filter('wp_nav_menu_items', array($this, 'add_menu_language_switcher'), 10, 2);
    }
    
    // Initialize supported languages
    private function init_languages() {
        $this->supported_languages = array(
            'en' => array(
                'name' => 'English',
                'native_name' => 'English',
                'flag' => '🇺🇸',
                'direction' => 'ltr',
                'locale' => 'en_US'
            ),
            'ar' => array(
                'name' => 'Arabic',
                'native_name' => 'العربية',
                'flag' => '🇦🇪',
                'direction' => 'rtl',
                'locale' => 'ar_AE'
            )
        );
        
        $this->rtl_languages = array('ar', 'he', 'fa', 'ur');
    }
    
    // Register Arabic language support
    private function register_arabic_support() {
        // Add Arabic locale support
        add_filter('locale', array($this, 'set_arabic_locale'));
        
        // Register Arabic strings for translation
        $this->register_arabic_strings();
        
        // Add Arabic number formatting
        add_filter('woocommerce_price_format', array($this, 'arabic_price_format'));
    }
    
    // Create Arabic content database tables
    private function create_arabic_content_tables() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'nexus_arabic_content';
        
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            post_id bigint(20) NOT NULL,
            content_type varchar(50) NOT NULL,
            arabic_title text,
            arabic_content longtext,
            arabic_excerpt text,
            arabic_meta_description text,
            arabic_meta_keywords text,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY post_content (post_id, content_type),
            KEY post_id (post_id)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
        
        // Create Arabic product attributes table
        $attributes_table = $wpdb->prefix . 'nexus_arabic_product_attributes';
        
        $sql_attributes = "CREATE TABLE $attributes_table (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            product_id bigint(20) NOT NULL,
            attribute_name varchar(100) NOT NULL,
            arabic_name varchar(100) NOT NULL,
            arabic_value text,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY product_attribute (product_id, attribute_name),
            KEY product_id (product_id)
        ) $charset_collate;";
        
        dbDelta($sql_attributes);
    }
    
    // Add Arabic product fields to admin
    public function add_arabic_product_fields() {
        global $post;
        
        echo '<div class="options_group">';
        echo '<h3>' . __('Arabic Content', 'nexus-techhub') . '</h3>';
        
        // Arabic product name
        woocommerce_wp_text_input(array(
            'id' => '_arabic_product_name',
            'label' => __('Arabic Product Name', 'nexus-techhub'),
            'placeholder' => __('Enter Arabic product name', 'nexus-techhub'),
            'desc_tip' => true,
            'description' => __('Arabic translation of the product name for UAE customers', 'nexus-techhub'),
            'value' => get_post_meta($post->ID, '_arabic_product_name', true)
        ));
        
        // Arabic short description
        woocommerce_wp_textarea_input(array(
            'id' => '_arabic_short_description',
            'label' => __('Arabic Short Description', 'nexus-techhub'),
            'placeholder' => __('Enter Arabic short description', 'nexus-techhub'),
            'desc_tip' => true,
            'description' => __('Brief Arabic description for product listings', 'nexus-techhub'),
            'value' => get_post_meta($post->ID, '_arabic_short_description', true),
            'rows' => 3
        ));
        
        // Arabic full description
        echo '<p class="form-field">';
        echo '<label for="_arabic_description">' . __('Arabic Description', 'nexus-techhub') . '</label>';
        wp_editor(
            get_post_meta($post->ID, '_arabic_description', true),
            '_arabic_description',
            array(
                'textarea_rows' => 8,
                'media_buttons' => false,
                'teeny' => true,
                'textarea_name' => '_arabic_description'
            )
        );
        echo '</p>';
        
        // Arabic device compatibility
        woocommerce_wp_text_input(array(
            'id' => '_arabic_device_compatibility',
            'label' => __('Arabic Device Compatibility', 'nexus-techhub'),
            'placeholder' => __('e.g., متوافق مع آيفون 15 برو ماكس', 'nexus-techhub'),
            'desc_tip' => true,
            'description' => __('Device compatibility in Arabic', 'nexus-techhub'),
            'value' => get_post_meta($post->ID, '_arabic_device_compatibility', true)
        ));
        
        // Arabic installation notes
        woocommerce_wp_textarea_input(array(
            'id' => '_arabic_installation_notes',
            'label' => __('Arabic Installation Notes', 'nexus-techhub'),
            'placeholder' => __('Installation instructions in Arabic', 'nexus-techhub'),
            'desc_tip' => true,
            'description' => __('Technical installation notes for Arabic-speaking technicians', 'nexus-techhub'),
            'value' => get_post_meta($post->ID, '_arabic_installation_notes', true),
            'rows' => 4
        ));
        
        echo '</div>';
    }
    
    // Save Arabic product fields
    public function save_arabic_product_fields($post_id) {
        $arabic_fields = array(
            '_arabic_product_name',
            '_arabic_short_description',
            '_arabic_description',
            '_arabic_device_compatibility',
            '_arabic_installation_notes'
        );
        
        foreach ($arabic_fields as $field) {
            if (isset($_POST[$field])) {
                update_post_meta($post_id, $field, sanitize_textarea_field($_POST[$field]));
            }
        }
        
        // Save to Arabic content table
        $this->save_arabic_content_to_table($post_id);
    }
    
    // Save Arabic content to dedicated table
    private function save_arabic_content_to_table($post_id) {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'nexus_arabic_content';
        
        $arabic_data = array(
            'post_id' => $post_id,
            'content_type' => 'product',
            'arabic_title' => get_post_meta($post_id, '_arabic_product_name', true),
            'arabic_content' => get_post_meta($post_id, '_arabic_description', true),
            'arabic_excerpt' => get_post_meta($post_id, '_arabic_short_description', true)
        );
        
        $existing = $wpdb->get_row($wpdb->prepare(
            "SELECT id FROM $table_name WHERE post_id = %d AND content_type = 'product'",
            $post_id
        ));
        
        if ($existing) {
            $wpdb->update(
                $table_name,
                $arabic_data,
                array('id' => $existing->id),
                array('%d', '%s', '%s', '%s', '%s'),
                array('%d')
            );
        } else {
            $wpdb->insert(
                $table_name,
                $arabic_data,
                array('%d', '%s', '%s', '%s', '%s')
            );
        }
    }
    
    // Enqueue RTL styles
    public function enqueue_rtl_styles() {
        $current_language = $this->get_current_language();
        
        if (in_array($current_language, $this->rtl_languages)) {
            wp_enqueue_style('nexus-rtl', get_template_directory_uri() . '/assets/css/rtl.css', array(), '1.0.0');
            wp_enqueue_style('nexus-arabic', get_template_directory_uri() . '/assets/css/arabic.css', array(), '1.0.0');
        }
        
        // Always enqueue language switcher styles
        wp_enqueue_style('nexus-language-switcher', get_template_directory_uri() . '/assets/css/language-switcher.css', array(), '1.0.0');
    }
    
    // Add RTL meta tags
    public function add_rtl_meta_tags() {
        $current_language = $this->get_current_language();
        
        if (in_array($current_language, $this->rtl_languages)) {
            echo '<meta name="direction" content="rtl">' . "\n";
            echo '<meta name="language" content="' . $current_language . '">' . "\n";
        }
    }
    
    // Add language-specific body classes
    public function add_language_body_classes($classes) {
        $current_language = $this->get_current_language();
        
        $classes[] = 'lang-' . $current_language;
        
        if (in_array($current_language, $this->rtl_languages)) {
            $classes[] = 'rtl';
            $classes[] = 'arabic-support';
        } else {
            $classes[] = 'ltr';
        }
        
        return $classes;
    }
    
    // Get current language
    private function get_current_language() {
        // Check URL parameter
        if (isset($_GET['lang']) && array_key_exists($_GET['lang'], $this->supported_languages)) {
            return sanitize_text_field($_GET['lang']);
        }
        
        // Check cookie
        if (isset($_COOKIE['nexus_language']) && array_key_exists($_COOKIE['nexus_language'], $this->supported_languages)) {
            return $_COOKIE['nexus_language'];
        }
        
        // Check browser language
        $browser_language = $this->detect_browser_language();
        if ($browser_language) {
            return $browser_language;
        }
        
        // Default to English
        return 'en';
    }
    
    // Detect browser language
    private function detect_browser_language() {
        if (!isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
            return false;
        }
        
        $browser_languages = explode(',', $_SERVER['HTTP_ACCEPT_LANGUAGE']);
        
        foreach ($browser_languages as $lang) {
            $lang = trim(strtolower(substr($lang, 0, 2)));
            if (array_key_exists($lang, $this->supported_languages)) {
                return $lang;
            }
        }
        
        return false;
    }
    
    // Add language switcher to footer
    public function add_language_switcher() {
        $current_language = $this->get_current_language();
        
        ?>
        <div id="nexus-language-switcher" class="language-switcher">
            <button class="language-toggle" onclick="toggleLanguageSwitcher()">
                <span class="current-flag"><?php echo $this->supported_languages[$current_language]['flag']; ?></span>
                <span class="current-lang"><?php echo $this->supported_languages[$current_language]['native_name']; ?></span>
                <i class="fas fa-chevron-down"></i>
            </button>
            
            <div class="language-options" id="language-options">
                <?php foreach ($this->supported_languages as $code => $language) : ?>
                    <?php if ($code !== $current_language) : ?>
                        <a href="<?php echo add_query_arg('lang', $code); ?>" 
                           class="language-option"
                           onclick="setLanguage('<?php echo $code; ?>')">
                            <span class="flag"><?php echo $language['flag']; ?></span>
                            <span class="name"><?php echo $language['native_name']; ?></span>
                        </a>
                    <?php endif; ?>
                <?php endforeach; ?>
            </div>
        </div>
        
        <script>
        function toggleLanguageSwitcher() {
            const options = document.getElementById('language-options');
            options.style.display = options.style.display === 'block' ? 'none' : 'block';
        }
        
        function setLanguage(langCode) {
            // Set cookie for language preference
            document.cookie = `nexus_language=${langCode}; path=/; max-age=31536000`; // 1 year
            
            // Redirect with language parameter
            const url = new URL(window.location);
            url.searchParams.set('lang', langCode);
            window.location.href = url.toString();
        }
        
        // Close language switcher when clicking outside
        document.addEventListener('click', function(event) {
            const switcher = document.getElementById('nexus-language-switcher');
            const options = document.getElementById('language-options');
            
            if (!switcher.contains(event.target)) {
                options.style.display = 'none';
            }
        });
        </script>
        
        <style>
        .language-switcher {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .language-toggle {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 8px 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: all 0.2s;
        }
        
        .language-toggle:hover {
            background: #f9fafb;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
        
        .current-flag {
            font-size: 16px;
        }
        
        .current-lang {
            font-weight: 500;
            color: #374151;
        }
        
        .language-toggle i {
            color: #6b7280;
            font-size: 12px;
        }
        
        .language-options {
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: none;
            min-width: 150px;
            margin-top: 4px;
        }
        
        .language-option {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 12px;
            text-decoration: none;
            color: #374151;
            font-size: 14px;
            transition: background 0.2s;
        }
        
        .language-option:hover {
            background: #f3f4f6;
            color: #10b981;
        }
        
        .language-option .flag {
            font-size: 16px;
        }
        
        .language-option .name {
            font-weight: 500;
        }
        
        /* RTL Support */
        .rtl .language-switcher {
            right: auto;
            left: 20px;
        }
        
        .rtl .language-options {
            right: auto;
            left: 0;
        }
        
        .rtl .language-toggle {
            flex-direction: row-reverse;
        }
        
        .rtl .language-option {
            flex-direction: row-reverse;
        }
        
        @media (max-width: 768px) {
            .language-switcher {
                top: 10px;
                right: 10px;
            }
            
            .rtl .language-switcher {
                right: auto;
                left: 10px;
            }
        }
        </style>
        <?php
    }
    
    // Register Arabic strings for translation
    private function register_arabic_strings() {
        $arabic_strings = array(
            // Common UI elements
            'Home' => 'الرئيسية',
            'Shop' => 'المتجر',
            'About' => 'حولنا',
            'Contact' => 'اتصل بنا',
            'Cart' => 'السلة',
            'Checkout' => 'الدفع',
            'My Account' => 'حسابي',
            
            // Product related
            'Add to Cart' => 'أضف إلى السلة',
            'Buy Now' => 'اشتري الآن',
            'Price' => 'السعر',
            'In Stock' => 'متوفر',
            'Out of Stock' => 'غير متوفر',
            'SKU' => 'رمز المنتج',
            'Category' => 'الفئة',
            'Tags' => 'العلامات',
            
            // Mobile repair specific
            'iPhone Parts' => 'قطع آيفون',
            'Samsung Parts' => 'قطع سامسونغ',
            'iPad Parts' => 'قطع آيباد',
            'Repair Tools' => 'أدوات الإصلاح',
            'Screen' => 'الشاشة',
            'Battery' => 'البطارية',
            'Camera' => 'الكاميرا',
            'Charging Port' => 'منفذ الشحن',
            'Speaker' => 'السماعة',
            
            // Business terms
            'Fast Delivery' => 'توصيل سريع',
            'Quality Guaranteed' => 'جودة مضمونة',
            'UAE VAT Included' => 'ضريبة القيمة المضافة الإماراتية مشمولة',
            'WhatsApp Support' => 'دعم واتساب',
            'Business Hours' => 'ساعات العمل',
            'Free Shipping' => 'شحن مجاني'
        );
        
        // Store strings for translation system
        update_option('nexus_arabic_strings', $arabic_strings);
    }
    
    // Arabic price formatting
    public function arabic_price_format($format) {
        $current_language = $this->get_current_language();
        
        if ($current_language === 'ar') {
            // Arabic number formatting with Arabic-Indic digits
            return '%1$s %2$s'; // Currency symbol before amount
        }
        
        return $format;
    }
    
    // Set Arabic locale
    public function set_arabic_locale($locale) {
        $current_language = $this->get_current_language();
        
        if (isset($this->supported_languages[$current_language])) {
            return $this->supported_languages[$current_language]['locale'];
        }
        
        return $locale;
    }
    
    // Add Arabic content support to the_content filter
    public function add_arabic_content_support($content) {
        $current_language = $this->get_current_language();
        
        if ($current_language === 'ar' && is_singular('product')) {
            global $post;
            $arabic_content = $this->get_arabic_content($post->ID);
            
            if ($arabic_content && !empty($arabic_content['arabic_content'])) {
                return $arabic_content['arabic_content'];
            }
        }
        
        return $content;
    }
    
    // Get Arabic content from database
    private function get_arabic_content($post_id) {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'nexus_arabic_content';
        
        return $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table_name WHERE post_id = %d AND content_type = 'product'",
            $post_id
        ), ARRAY_A);
    }
    
    // Add language switcher to navigation menus
    public function add_menu_language_switcher($items, $args) {
        if ($args->theme_location === 'primary') {
            $current_language = $this->get_current_language();
            $flag = $this->supported_languages[$current_language]['flag'];
            
            $language_menu = '<li class="menu-item menu-item-language">';
            $language_menu .= '<a href="#" onclick="toggleLanguageSwitcher(); return false;">';
            $language_menu .= $flag . ' <i class="fas fa-chevron-down"></i>';
            $language_menu .= '</a>';
            $language_menu .= '</li>';
            
            $items .= $language_menu;
        }
        
        return $items;
    }
}

// Initialize Arabic language support
new Nexus_Arabic_Support();

?>
