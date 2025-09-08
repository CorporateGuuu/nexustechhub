<?php
/**
 * Nexus TechHub Theme Functions
 * 
 * @package NexusTechHub
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Theme Setup
 */
function nexus_techhub_setup() {
    // Add theme support for various features
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    add_theme_support('custom-logo');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script'
    ));
    
    // WooCommerce support
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'nexus-techhub'),
        'footer' => __('Footer Menu', 'nexus-techhub'),
        'mobile' => __('Mobile Menu', 'nexus-techhub'),
    ));
    
    // Add custom image sizes
    add_image_size('nexus-product-thumb', 300, 300, true);
    add_image_size('nexus-product-large', 600, 600, true);
    add_image_size('nexus-hero', 1200, 600, true);
}
add_action('after_setup_theme', 'nexus_techhub_setup');

/**
 * Enqueue Scripts and Styles
 */
function nexus_techhub_scripts() {
    // Theme stylesheet
    wp_enqueue_style('nexus-techhub-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // Google Fonts
    wp_enqueue_style('nexus-techhub-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap', array(), null);
    
    // Font Awesome for icons
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css', array(), '6.0.0');
    
    // Theme JavaScript
    wp_enqueue_script('nexus-techhub-script', get_template_directory_uri() . '/assets/js/theme.js', array('jquery'), '1.0.0', true);
    
    // Localize script for AJAX
    wp_localize_script('nexus-techhub-script', 'nexus_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('nexus_nonce'),
        'currency_symbol' => 'د.إ',
        'whatsapp_number' => '+971585531029',
        'business_phone' => '+971585531029'
    ));
}
add_action('wp_enqueue_scripts', 'nexus_techhub_scripts');

/**
 * Register Widget Areas
 */
function nexus_techhub_widgets_init() {
    register_sidebar(array(
        'name'          => __('Sidebar', 'nexus-techhub'),
        'id'            => 'sidebar-1',
        'description'   => __('Add widgets here.', 'nexus-techhub'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
    
    register_sidebar(array(
        'name'          => __('Footer 1', 'nexus-techhub'),
        'id'            => 'footer-1',
        'description'   => __('Footer widget area 1.', 'nexus-techhub'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));
    
    register_sidebar(array(
        'name'          => __('Footer 2', 'nexus-techhub'),
        'id'            => 'footer-2',
        'description'   => __('Footer widget area 2.', 'nexus-techhub'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));
    
    register_sidebar(array(
        'name'          => __('Footer 3', 'nexus-techhub'),
        'id'            => 'footer-3',
        'description'   => __('Footer widget area 3.', 'nexus-techhub'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));
}
add_action('widgets_init', 'nexus_techhub_widgets_init');

/**
 * UAE Business Functions
 */

// Format phone number for UAE
function nexus_format_phone($phone) {
    return '+971 58 553 1029';
}

// Get WhatsApp link
function nexus_get_whatsapp_link($message = '') {
    $phone = '971585531029';
    $default_message = 'Hello! I\'m interested in your mobile repair parts.';
    $message = $message ? $message : $default_message;
    return 'https://wa.me/' . $phone . '?text=' . urlencode($message);
}

// Format currency for AED
function nexus_format_currency($amount) {
    return 'د.إ ' . number_format($amount, 2);
}

// Calculate UAE VAT (5%)
function nexus_calculate_vat($amount) {
    return $amount * 0.05;
}

// Get business information
function nexus_get_business_info() {
    return array(
        'name' => 'Nexus TechHub',
        'phone' => '+971 58 553 1029',
        'whatsapp' => 'https://wa.me/971585531029',
        'email' => 'admin@nexustechhub.ae',
        'address' => 'FAMC3062, Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates',
        'currency' => 'AED',
        'vat_rate' => 5
    );
}

/**
 * WooCommerce Customizations
 */

// Remove WooCommerce default styles
add_filter('woocommerce_enqueue_styles', '__return_empty_array');

// Customize WooCommerce currency
function nexus_woocommerce_currency_symbol($currency_symbol, $currency) {
    switch($currency) {
        case 'AED':
            $currency_symbol = 'د.إ';
            break;
    }
    return $currency_symbol;
}
add_filter('woocommerce_currency_symbol', 'nexus_woocommerce_currency_symbol', 10, 2);

// Add UAE VAT to checkout
function nexus_add_uae_vat_fee() {
    if (is_admin() && !defined('DOING_AJAX')) return;
    
    $vat_rate = 0.05; // 5% UAE VAT
    $cart_total = WC()->cart->get_subtotal();
    $vat_amount = $cart_total * $vat_rate;
    
    WC()->cart->add_fee(__('UAE VAT (5%)', 'nexus-techhub'), $vat_amount);
}
add_action('woocommerce_cart_calculate_fees', 'nexus_add_uae_vat_fee');

// Customize product loop
function nexus_woocommerce_product_loop_start() {
    echo '<div class="row nexus-products-grid">';
}
add_action('woocommerce_output_related_products_args', 'nexus_woocommerce_product_loop_start');

// Add WhatsApp button to product pages
function nexus_add_whatsapp_button() {
    global $product;
    $product_name = $product->get_name();
    $product_url = get_permalink($product->get_id());
    $message = "Hi! I'm interested in: " . $product_name . " - " . $product_url;
    $whatsapp_link = nexus_get_whatsapp_link($message);
    
    echo '<a href="' . esc_url($whatsapp_link) . '" class="btn btn-whatsapp btn-lg mt-3" target="_blank">';
    echo '<i class="fab fa-whatsapp"></i> ' . __('Ask on WhatsApp', 'nexus-techhub');
    echo '</a>';
}
add_action('woocommerce_single_product_summary', 'nexus_add_whatsapp_button', 35);

/**
 * Custom Post Types and Fields
 */

// Register custom post type for testimonials
function nexus_register_testimonials() {
    register_post_type('testimonial', array(
        'labels' => array(
            'name' => __('Testimonials', 'nexus-techhub'),
            'singular_name' => __('Testimonial', 'nexus-techhub'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-format-quote',
    ));
}
add_action('init', 'nexus_register_testimonials');

/**
 * AJAX Handlers
 */

// Handle contact form submission
function nexus_handle_contact_form() {
    check_ajax_referer('nexus_nonce', 'nonce');
    
    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $phone = sanitize_text_field($_POST['phone']);
    $message = sanitize_textarea_field($_POST['message']);
    
    // Send email notification
    $to = 'admin@nexustechhub.ae';
    $subject = 'New Contact Form Submission - Nexus TechHub';
    $body = "Name: $name\nEmail: $email\nPhone: $phone\nMessage: $message";
    $headers = array('Content-Type: text/html; charset=UTF-8');
    
    if (wp_mail($to, $subject, $body, $headers)) {
        wp_send_json_success(array('message' => 'Thank you! Your message has been sent.'));
    } else {
        wp_send_json_error(array('message' => 'Sorry, there was an error sending your message.'));
    }
}
add_action('wp_ajax_nexus_contact_form', 'nexus_handle_contact_form');
add_action('wp_ajax_nopriv_nexus_contact_form', 'nexus_handle_contact_form');

/**
 * Security and Performance
 */

// Remove WordPress version from head
remove_action('wp_head', 'wp_generator');

// Disable XML-RPC
add_filter('xmlrpc_enabled', '__return_false');

// Remove unnecessary scripts
function nexus_remove_scripts() {
    wp_deregister_script('wp-embed');
}
add_action('wp_footer', 'nexus_remove_scripts');

// Add security headers
function nexus_add_security_headers() {
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('X-XSS-Protection: 1; mode=block');
}
add_action('send_headers', 'nexus_add_security_headers');

/**
 * SEO Optimizations
 */

// Add structured data for business
function nexus_add_business_schema() {
    $business_info = nexus_get_business_info();
    $schema = array(
        '@context' => 'https://schema.org',
        '@type' => 'LocalBusiness',
        'name' => $business_info['name'],
        'telephone' => $business_info['phone'],
        'email' => $business_info['email'],
        'address' => array(
            '@type' => 'PostalAddress',
            'addressCountry' => 'AE',
            'addressRegion' => 'Ras Al Khaimah',
            'addressLocality' => 'Ras Al Khaimah'
        ),
        'url' => home_url(),
        'priceRange' => '$$',
        'currenciesAccepted' => 'AED',
        'paymentAccepted' => 'Cash, Credit Card, Debit Card'
    );
    
    echo '<script type="application/ld+json">' . json_encode($schema) . '</script>';
}
add_action('wp_head', 'nexus_add_business_schema');

/**
 * Customizer Options
 */
function nexus_customize_register($wp_customize) {
    // Business Information Section
    $wp_customize->add_section('nexus_business_info', array(
        'title' => __('Business Information', 'nexus-techhub'),
        'priority' => 30,
    ));
    
    // Phone Number
    $wp_customize->add_setting('nexus_phone', array(
        'default' => '+971 58 553 1029',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('nexus_phone', array(
        'label' => __('Phone Number', 'nexus-techhub'),
        'section' => 'nexus_business_info',
        'type' => 'text',
    ));
    
    // WhatsApp Number
    $wp_customize->add_setting('nexus_whatsapp', array(
        'default' => 'https://wa.me/971585531029',
        'sanitize_callback' => 'esc_url_raw',
    ));
    
    $wp_customize->add_control('nexus_whatsapp', array(
        'label' => __('WhatsApp Link', 'nexus-techhub'),
        'section' => 'nexus_business_info',
        'type' => 'url',
    ));
}
add_action('customize_register', 'nexus_customize_register');

/**
 * Enhanced UAE Business Functions
 */

// WhatsApp floating button with UAE number
function nexus_whatsapp_floating_button() {
    $whatsapp_number = '+971585531029';
    $default_message = 'Hello! I need help with mobile repair parts from Nexus TechHub.';
    $whatsapp_url = 'https://wa.me/971585531029?text=' . urlencode($default_message);

    echo '<div class="nexus-whatsapp-float">';
    echo '<a href="' . esc_url($whatsapp_url) . '" target="_blank" class="whatsapp-btn" title="Chat with us on WhatsApp">';
    echo '<i class="fab fa-whatsapp"></i>';
    echo '<span class="whatsapp-text">Chat with us</span>';
    echo '</a>';
    echo '</div>';
}
add_action('wp_footer', 'nexus_whatsapp_floating_button');

// AED currency formatting for UAE market
function nexus_format_aed_price($price, $show_currency = true) {
    $formatted_price = number_format($price, 2, '.', ',');
    if ($show_currency) {
        return 'د.إ ' . $formatted_price;
    }
    return $formatted_price;
}

// UAE VAT calculation and display
function nexus_calculate_uae_vat($amount, $include_vat = true) {
    $vat_rate = 0.05; // 5% UAE VAT

    if ($include_vat) {
        $vat_amount = $amount * $vat_rate;
        return array(
            'subtotal' => $amount,
            'vat_amount' => $vat_amount,
            'total' => $amount + $vat_amount,
            'vat_rate' => $vat_rate * 100
        );
    }

    return array(
        'subtotal' => $amount / (1 + $vat_rate),
        'vat_amount' => $amount - ($amount / (1 + $vat_rate)),
        'total' => $amount,
        'vat_rate' => $vat_rate * 100
    );
}

// Enhanced loading spinner with Nexus branding
function nexus_loading_spinner($type = 'default') {
    $spinner_types = array(
        'default' => 'nexus-spinner',
        'checkout' => 'nexus-spinner checkout-loading',
        'product' => 'nexus-spinner product-loading',
        'page' => 'nexus-spinner page-loading'
    );

    $spinner_class = isset($spinner_types[$type]) ? $spinner_types[$type] : $spinner_types['default'];

    return '<div class="' . $spinner_class . '"><div class="spinner-inner"></div></div>';
}

// Enhanced error message with UAE business context
function nexus_error_message($message, $type = 'error', $show_contact = true) {
    $types = array(
        'error' => 'alert-danger',
        'warning' => 'alert-warning',
        'info' => 'alert-info',
        'success' => 'alert-success'
    );

    $alert_class = isset($types[$type]) ? $types[$type] : $types['error'];

    $output = '<div class="alert ' . $alert_class . ' nexus-alert" role="alert">';
    $output .= '<div class="alert-content">';
    $output .= '<strong>' . esc_html($message) . '</strong>';

    if ($show_contact && $type === 'error') {
        $output .= '<div class="alert-contact mt-2">';
        $output .= '<small>Need help? Contact us: ';
        $output .= '<a href="tel:+971585531029" class="alert-link">+971 58 553 1029</a> | ';
        $output .= '<a href="https://wa.me/971585531029" target="_blank" class="alert-link">WhatsApp</a>';
        $output .= '</small>';
        $output .= '</div>';
    }

    $output .= '</div>';
    $output .= '</div>';

    return $output;
}

// Arabic language preparation and RTL support
function nexus_prepare_arabic_support() {
    if (is_rtl()) {
        wp_enqueue_style('nexus-rtl', get_template_directory_uri() . '/assets/css/rtl.css', array(), '1.0.0');
    }
}
add_action('wp_enqueue_scripts', 'nexus_prepare_arabic_support');

// Mobile-responsive navigation for UAE market
function nexus_mobile_navigation_menu() {
    $menu_items = array(
        'home' => array('url' => home_url('/'), 'title' => __('Home', 'nexus-techhub'), 'icon' => 'fas fa-home'),
        'shop' => array('url' => get_permalink(wc_get_page_id('shop')), 'title' => __('Shop', 'nexus-techhub'), 'icon' => 'fas fa-shopping-bag'),
        'contact' => array('url' => home_url('/contact'), 'title' => __('Contact', 'nexus-techhub'), 'icon' => 'fas fa-phone'),
        'whatsapp' => array('url' => 'https://wa.me/971585531029', 'title' => __('WhatsApp', 'nexus-techhub'), 'icon' => 'fab fa-whatsapp', 'target' => '_blank')
    );

    echo '<div class="nexus-mobile-nav">';
    foreach ($menu_items as $key => $item) {
        $target = isset($item['target']) ? 'target="' . $item['target'] . '"' : '';
        echo '<a href="' . esc_url($item['url']) . '" class="mobile-nav-item" ' . $target . '>';
        echo '<i class="' . $item['icon'] . '"></i>';
        echo '<span>' . $item['title'] . '</span>';
        echo '</a>';
    }
    echo '</div>';
}

// Enhanced customizer options for UAE business
function nexus_enhanced_customizer($wp_customize) {
    // UAE Business Section
    $wp_customize->add_section('nexus_uae_business', array(
        'title' => __('UAE Business Settings', 'nexus-techhub'),
        'priority' => 25,
    ));

    // Business Phone
    $wp_customize->add_setting('nexus_business_phone', array(
        'default' => '+971 58 553 1029',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('nexus_business_phone', array(
        'label' => __('Business Phone', 'nexus-techhub'),
        'section' => 'nexus_uae_business',
        'type' => 'tel',
    ));

    // WhatsApp Number
    $wp_customize->add_setting('nexus_whatsapp_number', array(
        'default' => 'https://wa.me/971585531029',
        'sanitize_callback' => 'esc_url_raw',
    ));

    $wp_customize->add_control('nexus_whatsapp_number', array(
        'label' => __('WhatsApp URL', 'nexus-techhub'),
        'section' => 'nexus_uae_business',
        'type' => 'url',
    ));

    // Business Address
    $wp_customize->add_setting('nexus_business_address', array(
        'default' => 'FAMC3062, Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, UAE',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));

    $wp_customize->add_control('nexus_business_address', array(
        'label' => __('Business Address', 'nexus-techhub'),
        'section' => 'nexus_uae_business',
        'type' => 'textarea',
    ));

    // VAT Registration Number
    $wp_customize->add_setting('nexus_vat_number', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('nexus_vat_number', array(
        'label' => __('UAE VAT Registration Number', 'nexus-techhub'),
        'section' => 'nexus_uae_business',
        'type' => 'text',
    ));
}
add_action('customize_register', 'nexus_enhanced_customizer');

/**
 * Include additional theme files
 */
require_once get_template_directory() . '/inc/woocommerce.php';
require_once get_template_directory() . '/inc/customizer.php';
require_once get_template_directory() . '/inc/template-functions.php';

?>
