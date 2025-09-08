<?php
/**
 * The header for Nexus TechHub theme
 * 
 * @package NexusTechHub
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    
    <!-- UAE Business Meta Tags -->
    <meta name="description" content="<?php echo get_bloginfo('description'); ?> - UAE's premier mobile repair parts supplier in Ras Al Khaimah">
    <meta name="keywords" content="iPhone parts UAE, Samsung repair Dubai, iPad parts Abu Dhabi, mobile repair tools, phone parts Ras Al Khaimah">
    <meta name="author" content="Nexus TechHub">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="<?php wp_title('|', true, 'right'); ?>">
    <meta property="og:description" content="UAE's premier mobile repair parts supplier. iPhone, Samsung, iPad parts with fast shipping across UAE.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo home_url(); ?>">
    <meta property="og:site_name" content="Nexus TechHub">
    <meta property="og:locale" content="en_AE">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php wp_title('|', true, 'right'); ?>">
    <meta name="twitter:description" content="UAE's premier mobile repair parts supplier">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon.ico">
    <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/apple-touch-icon.png">
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    <a class="skip-link screen-reader-text" href="#main"><?php _e('Skip to content', 'nexus-techhub'); ?></a>
    
    <!-- UAE Flag Colors Bar -->
    <div class="uae-flag-colors"></div>
    
    <header id="masthead" class="site-header">
        
        <!-- Top Bar with Contact Information -->
        <div class="header-top bg-light py-2 d-none d-md-block">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="contact-info">
                            <span class="phone-number">
                                <i class="fas fa-phone text-primary"></i>
                                <a href="tel:+971585531029" class="text-decoration-none">
                                    <?php echo nexus_format_phone('+971585531029'); ?>
                                </a>
                            </span>
                            <span class="email ml-3">
                                <i class="fas fa-envelope text-primary"></i>
                                <a href="mailto:admin@nexustechhub.ae" class="text-decoration-none">
                                    admin@nexustechhub.ae
                                </a>
                            </span>
                        </div>
                    </div>
                    <div class="col-md-6 text-right">
                        <div class="header-actions">
                            <a href="<?php echo nexus_get_whatsapp_link(); ?>" class="btn btn-whatsapp btn-sm" target="_blank">
                                <i class="fab fa-whatsapp"></i>
                                <?php _e('WhatsApp Support', 'nexus-techhub'); ?>
                            </a>
                            
                            <?php if (class_exists('WooCommerce')) : ?>
                                <a href="<?php echo wc_get_account_endpoint_url('dashboard'); ?>" class="btn btn-outline-primary btn-sm ml-2">
                                    <i class="fas fa-user"></i>
                                    <?php _e('My Account', 'nexus-techhub'); ?>
                                </a>
                                
                                <a href="<?php echo wc_get_cart_url(); ?>" class="btn btn-outline-primary btn-sm ml-2">
                                    <i class="fas fa-shopping-cart"></i>
                                    <span class="cart-count"><?php echo WC()->cart->get_cart_contents_count(); ?></span>
                                </a>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Main Header -->
        <div class="header-main py-3">
            <div class="container">
                <div class="row align-items-center">
                    
                    <!-- Logo -->
                    <div class="col-lg-3 col-md-4 col-6">
                        <div class="site-branding">
                            <?php if (has_custom_logo()) : ?>
                                <?php the_custom_logo(); ?>
                            <?php else : ?>
                                <h1 class="site-title">
                                    <a href="<?php echo esc_url(home_url('/')); ?>" rel="home" class="text-decoration-none">
                                        <span class="text-primary">Nexus</span> TechHub
                                    </a>
                                </h1>
                                <p class="site-description text-muted">
                                    <?php echo get_bloginfo('description'); ?>
                                </p>
                            <?php endif; ?>
                        </div>
                    </div>
                    
                    <!-- Navigation -->
                    <div class="col-lg-6 col-md-8 d-none d-md-block">
                        <nav id="site-navigation" class="main-navigation">
                            <?php
                            wp_nav_menu(array(
                                'theme_location' => 'primary',
                                'menu_id'        => 'primary-menu',
                                'menu_class'     => 'navbar-nav justify-content-center',
                                'container'      => false,
                                'fallback_cb'    => 'nexus_default_menu',
                            ));
                            ?>
                        </nav>
                    </div>
                    
                    <!-- Search and Mobile Menu -->
                    <div class="col-lg-3 col-md-12 col-6">
                        <div class="header-right d-flex align-items-center justify-content-end">
                            
                            <!-- Search Form -->
                            <div class="header-search d-none d-lg-block">
                                <?php if (class_exists('WooCommerce')) : ?>
                                    <?php get_product_search_form(); ?>
                                <?php else : ?>
                                    <?php get_search_form(); ?>
                                <?php endif; ?>
                            </div>
                            
                            <!-- Mobile Menu Toggle -->
                            <button class="mobile-menu-toggle d-md-none btn btn-outline-primary ml-2" type="button" data-toggle="collapse" data-target="#mobile-menu">
                                <i class="fas fa-bars"></i>
                            </button>
                            
                        </div>
                    </div>
                    
                </div>
                
                <!-- Mobile Menu -->
                <div class="collapse d-md-none mt-3" id="mobile-menu">
                    <nav class="mobile-navigation">
                        <?php
                        wp_nav_menu(array(
                            'theme_location' => 'mobile',
                            'menu_id'        => 'mobile-menu-list',
                            'menu_class'     => 'mobile-nav-list',
                            'container'      => false,
                            'fallback_cb'    => 'nexus_default_mobile_menu',
                        ));
                        ?>
                    </nav>
                    
                    <!-- Mobile Search -->
                    <div class="mobile-search mt-3">
                        <?php if (class_exists('WooCommerce')) : ?>
                            <?php get_product_search_form(); ?>
                        <?php else : ?>
                            <?php get_search_form(); ?>
                        <?php endif; ?>
                    </div>
                    
                    <!-- Mobile Contact -->
                    <div class="mobile-contact mt-3 pt-3 border-top">
                        <a href="tel:+971585531029" class="btn btn-primary btn-block mb-2">
                            <i class="fas fa-phone"></i>
                            <?php _e('Call Now', 'nexus-techhub'); ?>
                        </a>
                        <a href="<?php echo nexus_get_whatsapp_link(); ?>" class="btn btn-whatsapp btn-block" target="_blank">
                            <i class="fab fa-whatsapp"></i>
                            <?php _e('WhatsApp', 'nexus-techhub'); ?>
                        </a>
                    </div>
                </div>
                
            </div>
        </div>
        
        <!-- Product Categories Bar (for WooCommerce) -->
        <?php if (class_exists('WooCommerce') && (is_shop() || is_product_category() || is_product())) : ?>
            <div class="categories-bar bg-light py-2">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <nav class="product-categories">
                                <?php
                                $product_categories = get_terms(array(
                                    'taxonomy' => 'product_cat',
                                    'hide_empty' => true,
                                    'parent' => 0,
                                    'number' => 6
                                ));
                                
                                if ($product_categories) :
                                    echo '<ul class="categories-list d-flex flex-wrap justify-content-center">';
                                    foreach ($product_categories as $category) :
                                        $category_link = get_term_link($category);
                                        echo '<li class="category-item">';
                                        echo '<a href="' . esc_url($category_link) . '" class="category-link">';
                                        echo esc_html($category->name);
                                        echo '</a>';
                                        echo '</li>';
                                    endforeach;
                                    echo '</ul>';
                                endif;
                                ?>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        <?php endif; ?>
        
    </header>

    <?php
    // Default menu fallback
    function nexus_default_menu() {
        echo '<ul class="navbar-nav justify-content-center">';
        echo '<li class="nav-item"><a href="' . home_url('/') . '" class="nav-link">Home</a></li>';
        if (class_exists('WooCommerce')) {
            echo '<li class="nav-item"><a href="' . get_permalink(wc_get_page_id('shop')) . '" class="nav-link">Shop</a></li>';
        }
        echo '<li class="nav-item"><a href="' . home_url('/about') . '" class="nav-link">About</a></li>';
        echo '<li class="nav-item"><a href="' . home_url('/contact') . '" class="nav-link">Contact</a></li>';
        echo '</ul>';
    }
    
    function nexus_default_mobile_menu() {
        echo '<ul class="mobile-nav-list">';
        echo '<li><a href="' . home_url('/') . '">Home</a></li>';
        if (class_exists('WooCommerce')) {
            echo '<li><a href="' . get_permalink(wc_get_page_id('shop')) . '">Shop</a></li>';
        }
        echo '<li><a href="' . home_url('/about') . '">About</a></li>';
        echo '<li><a href="' . home_url('/contact') . '">Contact</a></li>';
        echo '</ul>';
    }
    ?>
