<?php
/**
 * WooCommerce Template
 * 
 * @package NexusTechHub
 */

get_header(); ?>

<main id="main" class="site-main woocommerce-page">
    <div class="container">
        
        <!-- Breadcrumb -->
        <?php if (function_exists('woocommerce_breadcrumb')) : ?>
            <div class="breadcrumb-wrapper py-3">
                <?php woocommerce_breadcrumb(); ?>
            </div>
        <?php endif; ?>
        
        <!-- Page Header -->
        <?php if (is_shop()) : ?>
            <div class="page-header text-center py-4 mb-4">
                <h1 class="page-title"><?php woocommerce_page_title(); ?></h1>
                <p class="page-description text-muted">
                    <?php _e('Premium mobile repair parts for iPhone, Samsung, and iPad. Fast shipping across UAE.', 'nexus-techhub'); ?>
                </p>
            </div>
        <?php elseif (is_product_category()) : ?>
            <div class="page-header text-center py-4 mb-4">
                <h1 class="page-title"><?php single_cat_title(); ?></h1>
                <?php if (category_description()) : ?>
                    <div class="category-description text-muted">
                        <?php echo category_description(); ?>
                    </div>
                <?php endif; ?>
            </div>
        <?php endif; ?>
        
        <div class="row">
            
            <!-- Sidebar for Shop Pages -->
            <?php if (is_shop() || is_product_category() || is_product_tag()) : ?>
                <div class="col-lg-3 col-md-4 mb-4">
                    <aside class="shop-sidebar">
                        
                        <!-- Product Categories -->
                        <div class="widget widget-product-categories card mb-4">
                            <div class="card-header">
                                <h5 class="widget-title mb-0">
                                    <i class="fas fa-list text-primary"></i>
                                    <?php _e('Categories', 'nexus-techhub'); ?>
                                </h5>
                            </div>
                            <div class="card-body">
                                <?php
                                $product_categories = get_terms(array(
                                    'taxonomy' => 'product_cat',
                                    'hide_empty' => true,
                                    'parent' => 0
                                ));
                                
                                if ($product_categories) :
                                    echo '<ul class="product-categories-list list-unstyled">';
                                    foreach ($product_categories as $category) :
                                        $category_link = get_term_link($category);
                                        $is_current = is_product_category($category->slug);
                                        echo '<li class="category-item ' . ($is_current ? 'current' : '') . '">';
                                        echo '<a href="' . esc_url($category_link) . '" class="category-link d-flex justify-content-between align-items-center">';
                                        echo '<span>' . esc_html($category->name) . '</span>';
                                        echo '<span class="badge badge-light">' . $category->count . '</span>';
                                        echo '</a>';
                                        echo '</li>';
                                    endforeach;
                                    echo '</ul>';
                                endif;
                                ?>
                            </div>
                        </div>
                        
                        <!-- Price Filter -->
                        <?php if (is_active_sidebar('shop-sidebar')) : ?>
                            <?php dynamic_sidebar('shop-sidebar'); ?>
                        <?php else : ?>
                            <div class="widget widget-price-filter card mb-4">
                                <div class="card-header">
                                    <h5 class="widget-title mb-0">
                                        <i class="fas fa-filter text-primary"></i>
                                        <?php _e('Filter by Price', 'nexus-techhub'); ?>
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <?php if (class_exists('WC_Widget_Price_Filter')) : ?>
                                        <?php the_widget('WC_Widget_Price_Filter'); ?>
                                    <?php endif; ?>
                                </div>
                            </div>
                        <?php endif; ?>
                        
                        <!-- Contact Support -->
                        <div class="widget widget-support card mb-4">
                            <div class="card-header bg-primary text-white">
                                <h5 class="widget-title mb-0">
                                    <i class="fas fa-headset"></i>
                                    <?php _e('Need Help?', 'nexus-techhub'); ?>
                                </h5>
                            </div>
                            <div class="card-body text-center">
                                <p class="mb-3"><?php _e('Can\'t find what you\'re looking for?', 'nexus-techhub'); ?></p>
                                <a href="<?php echo nexus_get_whatsapp_link('Hi! I need help finding mobile repair parts.'); ?>" 
                                   class="btn btn-whatsapp btn-block mb-2" target="_blank">
                                    <i class="fab fa-whatsapp"></i>
                                    <?php _e('WhatsApp Us', 'nexus-techhub'); ?>
                                </a>
                                <a href="tel:+971585531029" class="btn btn-outline-primary btn-block">
                                    <i class="fas fa-phone"></i>
                                    <?php _e('Call Now', 'nexus-techhub'); ?>
                                </a>
                            </div>
                        </div>
                        
                    </aside>
                </div>
                <div class="col-lg-9 col-md-8">
            <?php else : ?>
                <div class="col-12">
            <?php endif; ?>
            
                <!-- WooCommerce Content -->
                <div class="woocommerce-content">
                    <?php woocommerce_content(); ?>
                </div>
                
            </div>
            
        </div>
        
        <!-- Featured Products Section -->
        <?php if (is_shop()) : ?>
            <section class="featured-products py-5">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h2 class="section-title text-center mb-4">
                                <?php _e('Featured Products', 'nexus-techhub'); ?>
                            </h2>
                            <p class="section-description text-center text-muted mb-5">
                                <?php _e('Popular mobile repair parts trusted by technicians across UAE', 'nexus-techhub'); ?>
                            </p>
                        </div>
                    </div>
                    
                    <?php
                    // Display featured products
                    $featured_products = wc_get_featured_product_ids();
                    if ($featured_products) :
                        $args = array(
                            'post_type' => 'product',
                            'posts_per_page' => 8,
                            'post__in' => $featured_products,
                            'meta_query' => WC()->query->get_meta_query()
                        );
                        
                        $featured_query = new WP_Query($args);
                        
                        if ($featured_query->have_posts()) :
                            echo '<div class="row">';
                            while ($featured_query->have_posts()) : $featured_query->the_post();
                                global $product;
                                ?>
                                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                                    <div class="product-card card h-100">
                                        <div class="product-image">
                                            <a href="<?php the_permalink(); ?>">
                                                <?php echo woocommerce_get_product_thumbnail(); ?>
                                            </a>
                                            <?php if ($product->is_on_sale()) : ?>
                                                <span class="sale-badge badge badge-danger">
                                                    <?php _e('Sale', 'nexus-techhub'); ?>
                                                </span>
                                            <?php endif; ?>
                                        </div>
                                        <div class="card-body">
                                            <h5 class="product-title">
                                                <a href="<?php the_permalink(); ?>" class="text-decoration-none">
                                                    <?php the_title(); ?>
                                                </a>
                                            </h5>
                                            <div class="product-price mb-2">
                                                <?php echo $product->get_price_html(); ?>
                                            </div>
                                            <div class="product-rating mb-3">
                                                <?php echo wc_get_rating_html($product->get_average_rating()); ?>
                                            </div>
                                        </div>
                                        <div class="card-footer bg-transparent">
                                            <?php woocommerce_template_loop_add_to_cart(); ?>
                                        </div>
                                    </div>
                                </div>
                                <?php
                            endwhile;
                            echo '</div>';
                            wp_reset_postdata();
                        endif;
                    endif;
                    ?>
                </div>
            </section>
        <?php endif; ?>
        
        <!-- UAE Business Information -->
        <?php if (is_shop() || is_product_category()) : ?>
            <section class="uae-business-info bg-light py-5">
                <div class="container">
                    <div class="row">
                        <div class="col-md-3 text-center mb-4">
                            <div class="info-item">
                                <i class="fas fa-shipping-fast text-primary fa-2x mb-3"></i>
                                <h5><?php _e('Fast UAE Shipping', 'nexus-techhub'); ?></h5>
                                <p class="text-muted"><?php _e('24-48 hour delivery across all Emirates', 'nexus-techhub'); ?></p>
                            </div>
                        </div>
                        <div class="col-md-3 text-center mb-4">
                            <div class="info-item">
                                <i class="fas fa-certificate text-primary fa-2x mb-3"></i>
                                <h5><?php _e('Quality Guaranteed', 'nexus-techhub'); ?></h5>
                                <p class="text-muted"><?php _e('Premium parts with warranty coverage', 'nexus-techhub'); ?></p>
                            </div>
                        </div>
                        <div class="col-md-3 text-center mb-4">
                            <div class="info-item">
                                <i class="fab fa-whatsapp text-success fa-2x mb-3"></i>
                                <h5><?php _e('WhatsApp Support', 'nexus-techhub'); ?></h5>
                                <p class="text-muted"><?php _e('Instant technical assistance available', 'nexus-techhub'); ?></p>
                            </div>
                        </div>
                        <div class="col-md-3 text-center mb-4">
                            <div class="info-item">
                                <i class="fas fa-receipt text-primary fa-2x mb-3"></i>
                                <h5><?php _e('UAE VAT Compliant', 'nexus-techhub'); ?></h5>
                                <p class="text-muted"><?php _e('Proper invoicing with 5% VAT included', 'nexus-techhub'); ?></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        <?php endif; ?>
        
    </div>
</main>

<?php get_footer(); ?>
