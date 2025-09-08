<?php
/**
 * The Template for displaying all single products
 *
 * @package NexusTechHub
 */

defined('ABSPATH') || exit;

get_header('shop'); ?>

<div class="container">
    <div class="row">
        
        <!-- Breadcrumb -->
        <div class="col-12">
            <nav class="breadcrumb-nav py-3">
                <?php woocommerce_breadcrumb(); ?>
            </nav>
        </div>
        
        <!-- Product Content -->
        <div class="col-lg-6 mb-4">
            <!-- Product Images -->
            <div class="product-images">
                <?php
                /**
                 * Hook: woocommerce_before_single_product_summary.
                 *
                 * @hooked woocommerce_show_product_sale_flash - 10
                 * @hooked woocommerce_show_product_images - 20
                 */
                do_action('woocommerce_before_single_product_summary');
                ?>
            </div>
        </div>
        
        <div class="col-lg-6 mb-4">
            <!-- Product Summary -->
            <div class="product-summary">
                <?php
                /**
                 * Hook: woocommerce_single_product_summary.
                 *
                 * @hooked woocommerce_template_single_title - 5
                 * @hooked woocommerce_template_single_rating - 10
                 * @hooked woocommerce_template_single_price - 10
                 * @hooked woocommerce_template_single_excerpt - 20
                 * @hooked woocommerce_template_single_add_to_cart - 30
                 * @hooked woocommerce_template_single_meta - 40
                 * @hooked woocommerce_template_single_sharing - 50
                 * @hooked WC_Structured_Data::generate_product_data() - 60
                 */
                do_action('woocommerce_single_product_summary');
                ?>
                
                <!-- UAE Business Features -->
                <div class="uae-business-features mt-4 p-3 bg-light rounded">
                    <h6 class="text-primary mb-3">
                        <i class="fas fa-star"></i>
                        <?php _e('UAE Business Benefits', 'nexus-techhub'); ?>
                    </h6>
                    
                    <div class="feature-list">
                        <div class="feature-item d-flex align-items-center mb-2">
                            <i class="fas fa-shipping-fast text-success mr-2"></i>
                            <small><?php _e('Fast UAE delivery (24-48 hours)', 'nexus-techhub'); ?></small>
                        </div>
                        <div class="feature-item d-flex align-items-center mb-2">
                            <i class="fas fa-certificate text-warning mr-2"></i>
                            <small><?php _e('Quality guaranteed with warranty', 'nexus-techhub'); ?></small>
                        </div>
                        <div class="feature-item d-flex align-items-center mb-2">
                            <i class="fas fa-receipt text-info mr-2"></i>
                            <small><?php _e('UAE VAT included (5%)', 'nexus-techhub'); ?></small>
                        </div>
                        <div class="feature-item d-flex align-items-center">
                            <i class="fab fa-whatsapp text-success mr-2"></i>
                            <small><?php _e('WhatsApp support available', 'nexus-techhub'); ?></small>
                        </div>
                    </div>
                </div>
                
                <!-- WhatsApp Product Inquiry -->
                <div class="whatsapp-inquiry mt-3">
                    <?php
                    global $product;
                    $product_name = $product->get_name();
                    $product_url = get_permalink();
                    $whatsapp_message = sprintf(
                        __('Hi! I\'m interested in: %s - %s', 'nexus-techhub'),
                        $product_name,
                        $product_url
                    );
                    $whatsapp_link = 'https://wa.me/971585531029?text=' . urlencode($whatsapp_message);
                    ?>
                    <a href="<?php echo esc_url($whatsapp_link); ?>" 
                       class="btn btn-success btn-block" 
                       target="_blank">
                        <i class="fab fa-whatsapp mr-2"></i>
                        <?php _e('Ask About This Product on WhatsApp', 'nexus-techhub'); ?>
                    </a>
                </div>
                
                <!-- Bulk Order Information -->
                <div class="bulk-order-info mt-3 p-3 border rounded">
                    <h6 class="text-primary mb-2">
                        <i class="fas fa-boxes"></i>
                        <?php _e('Bulk Orders & Repair Shops', 'nexus-techhub'); ?>
                    </h6>
                    <p class="small text-muted mb-2">
                        <?php _e('Special pricing available for repair shops and bulk orders.', 'nexus-techhub'); ?>
                    </p>
                    <a href="<?php echo esc_url('https://wa.me/971585531029?text=' . urlencode('Hi! I need bulk pricing for repair shop.')); ?>" 
                       class="btn btn-outline-primary btn-sm" 
                       target="_blank">
                        <i class="fab fa-whatsapp mr-1"></i>
                        <?php _e('Get Bulk Pricing', 'nexus-techhub'); ?>
                    </a>
                </div>
            </div>
        </div>
        
        <!-- Product Details Tabs -->
        <div class="col-12">
            <div class="product-details-tabs">
                <?php
                /**
                 * Hook: woocommerce_output_product_data_tabs.
                 *
                 * @hooked woocommerce_output_product_data_tabs - 10
                 */
                do_action('woocommerce_output_product_data_tabs');
                ?>
            </div>
        </div>
        
        <!-- Related Products -->
        <div class="col-12">
            <?php
            /**
             * Hook: woocommerce_output_related_products.
             *
             * @hooked woocommerce_output_related_products - 20
             */
            do_action('woocommerce_output_related_products');
            ?>
        </div>
        
    </div>
</div>

<!-- UAE Business Information Section -->
<section class="uae-business-section bg-light py-4 mt-5">
    <div class="container">
        <div class="row">
            <div class="col-md-3 text-center mb-3">
                <div class="business-feature">
                    <i class="fas fa-map-marker-alt text-primary fa-2x mb-2"></i>
                    <h6><?php _e('UAE Location', 'nexus-techhub'); ?></h6>
                    <small class="text-muted"><?php _e('Ras Al Khaimah, UAE', 'nexus-techhub'); ?></small>
                </div>
            </div>
            <div class="col-md-3 text-center mb-3">
                <div class="business-feature">
                    <i class="fas fa-phone text-primary fa-2x mb-2"></i>
                    <h6><?php _e('Call Us', 'nexus-techhub'); ?></h6>
                    <small class="text-muted">+971 58 553 1029</small>
                </div>
            </div>
            <div class="col-md-3 text-center mb-3">
                <div class="business-feature">
                    <i class="fas fa-clock text-primary fa-2x mb-2"></i>
                    <h6><?php _e('Business Hours', 'nexus-techhub'); ?></h6>
                    <small class="text-muted"><?php _e('Sun-Thu: 9AM-6PM', 'nexus-techhub'); ?></small>
                </div>
            </div>
            <div class="col-md-3 text-center mb-3">
                <div class="business-feature">
                    <i class="fas fa-shield-alt text-primary fa-2x mb-2"></i>
                    <h6><?php _e('Warranty', 'nexus-techhub'); ?></h6>
                    <small class="text-muted"><?php _e('Quality Guaranteed', 'nexus-techhub'); ?></small>
                </div>
            </div>
        </div>
    </div>
</section>

<?php get_footer('shop'); ?>
