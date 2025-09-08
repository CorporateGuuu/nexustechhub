<?php
/**
 * The front page template for Nexus TechHub
 * 
 * @package NexusTechHub
 */

get_header(); ?>

<main id="main" class="site-main homepage">
    
    <!-- Hero Section -->
    <section class="hero-section nexus-gradient text-white py-5">
        <div class="container">
            <div class="row align-items-center min-vh-50">
                <div class="col-lg-6 mb-4 mb-lg-0">
                    <div class="hero-content">
                        <h1 class="hero-title display-4 font-weight-bold mb-4">
                            <?php _e('UAE\'s Premier Mobile Repair Parts', 'nexus-techhub'); ?>
                        </h1>
                        <p class="hero-description lead mb-4">
                            <?php _e('Quality iPhone, Samsung, and iPad parts with fast shipping across all Emirates. Professional repair tools and expert support.', 'nexus-techhub'); ?>
                        </p>
                        
                        <!-- UAE Business Highlights -->
                        <div class="hero-features mb-4">
                            <div class="feature-item d-flex align-items-center mb-2">
                                <i class="fas fa-shipping-fast text-warning mr-3"></i>
                                <span><?php _e('24-48 Hour UAE Delivery', 'nexus-techhub'); ?></span>
                            </div>
                            <div class="feature-item d-flex align-items-center mb-2">
                                <i class="fas fa-certificate text-warning mr-3"></i>
                                <span><?php _e('Quality Guaranteed Parts', 'nexus-techhub'); ?></span>
                            </div>
                            <div class="feature-item d-flex align-items-center mb-2">
                                <i class="fab fa-whatsapp text-warning mr-3"></i>
                                <span><?php _e('WhatsApp Support: +971 58 553 1029', 'nexus-techhub'); ?></span>
                            </div>
                        </div>
                        
                        <!-- CTA Buttons -->
                        <div class="hero-actions">
                            <?php if (class_exists('WooCommerce')) : ?>
                                <a href="<?php echo get_permalink(wc_get_page_id('shop')); ?>" class="btn btn-light btn-lg mr-3 mb-2">
                                    <i class="fas fa-shopping-bag mr-2"></i>
                                    <?php _e('Shop Now', 'nexus-techhub'); ?>
                                </a>
                            <?php endif; ?>
                            <a href="<?php echo nexus_get_whatsapp_link('Hi! I\'m interested in mobile repair parts.'); ?>" 
                               class="btn btn-outline-light btn-lg mb-2" target="_blank">
                                <i class="fab fa-whatsapp mr-2"></i>
                                <?php _e('WhatsApp Us', 'nexus-techhub'); ?>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-6">
                    <div class="hero-image text-center">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/hero-mobile-parts.jpg" 
                             alt="<?php _e('Mobile Repair Parts UAE', 'nexus-techhub'); ?>" 
                             class="img-fluid rounded shadow-lg">
                    </div>
                </div>
            </div>
        </div>
        
        <!-- UAE Flag Colors -->
        <div class="uae-flag-colors"></div>
    </section>
    
    <!-- Product Categories Section -->
    <section class="product-categories py-5">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center mb-5">
                    <h2 class="section-title"><?php _e('Our Product Categories', 'nexus-techhub'); ?></h2>
                    <p class="section-description text-muted">
                        <?php _e('Professional mobile repair parts for all major brands', 'nexus-techhub'); ?>
                    </p>
                </div>
            </div>
            
            <div class="row">
                <?php
                $categories = array(
                    array(
                        'name' => __('iPhone Parts', 'nexus-techhub'),
                        'description' => __('Complete range from iPhone 6 to iPhone 15 Pro Max', 'nexus-techhub'),
                        'icon' => 'fab fa-apple',
                        'link' => '#',
                        'color' => 'primary'
                    ),
                    array(
                        'name' => __('Samsung Parts', 'nexus-techhub'),
                        'description' => __('Galaxy S series, Note series, and A series components', 'nexus-techhub'),
                        'icon' => 'fas fa-mobile-alt',
                        'link' => '#',
                        'color' => 'info'
                    ),
                    array(
                        'name' => __('iPad Parts', 'nexus-techhub'),
                        'description' => __('All iPad models including Pro, Air, and Mini series', 'nexus-techhub'),
                        'icon' => 'fas fa-tablet-alt',
                        'link' => '#',
                        'color' => 'secondary'
                    ),
                    array(
                        'name' => __('Repair Tools', 'nexus-techhub'),
                        'description' => __('Professional tools and equipment for technicians', 'nexus-techhub'),
                        'icon' => 'fas fa-tools',
                        'link' => '#',
                        'color' => 'warning'
                    )
                );
                
                foreach ($categories as $category) :
                ?>
                    <div class="col-lg-3 col-md-6 mb-4">
                        <div class="category-card card h-100 text-center">
                            <div class="card-body">
                                <div class="category-icon mb-3">
                                    <i class="<?php echo $category['icon']; ?> fa-3x text-<?php echo $category['color']; ?>"></i>
                                </div>
                                <h5 class="category-title"><?php echo $category['name']; ?></h5>
                                <p class="category-description text-muted"><?php echo $category['description']; ?></p>
                            </div>
                            <div class="card-footer bg-transparent">
                                <a href="<?php echo $category['link']; ?>" class="btn btn-outline-<?php echo $category['color']; ?>">
                                    <?php _e('View Products', 'nexus-techhub'); ?>
                                </a>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    
    <!-- UAE Business Features -->
    <section class="uae-features bg-light py-5">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center mb-5">
                    <h2 class="section-title"><?php _e('Why Choose Nexus TechHub?', 'nexus-techhub'); ?></h2>
                    <p class="section-description text-muted">
                        <?php _e('Trusted by repair technicians across the UAE', 'nexus-techhub'); ?>
                    </p>
                </div>
            </div>
            
            <div class="row">
                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="feature-item text-center">
                        <div class="feature-icon mb-3">
                            <i class="fas fa-shipping-fast fa-3x text-primary"></i>
                        </div>
                        <h5 class="feature-title"><?php _e('Fast UAE Shipping', 'nexus-techhub'); ?></h5>
                        <p class="feature-description text-muted">
                            <?php _e('24-48 hour delivery to all Emirates. Same-day delivery available in Ras Al Khaimah.', 'nexus-techhub'); ?>
                        </p>
                    </div>
                </div>
                
                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="feature-item text-center">
                        <div class="feature-icon mb-3">
                            <i class="fas fa-certificate fa-3x text-success"></i>
                        </div>
                        <h5 class="feature-title"><?php _e('Quality Guaranteed', 'nexus-techhub'); ?></h5>
                        <p class="feature-description text-muted">
                            <?php _e('Premium quality parts with warranty. Tested and verified before shipping.', 'nexus-techhub'); ?>
                        </p>
                    </div>
                </div>
                
                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="feature-item text-center">
                        <div class="feature-icon mb-3">
                            <i class="fab fa-whatsapp fa-3x text-success"></i>
                        </div>
                        <h5 class="feature-title"><?php _e('WhatsApp Support', 'nexus-techhub'); ?></h5>
                        <p class="feature-description text-muted">
                            <?php _e('Instant technical support via WhatsApp. Expert advice for all your repair needs.', 'nexus-techhub'); ?>
                        </p>
                    </div>
                </div>
                
                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="feature-item text-center">
                        <div class="feature-icon mb-3">
                            <i class="fas fa-receipt fa-3x text-info"></i>
                        </div>
                        <h5 class="feature-title"><?php _e('UAE VAT Compliant', 'nexus-techhub'); ?></h5>
                        <p class="feature-description text-muted">
                            <?php _e('Proper invoicing with 5% UAE VAT. Professional business documentation.', 'nexus-techhub'); ?>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Contact Section -->
    <section class="contact-section py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto text-center">
                    <h2 class="section-title mb-4"><?php _e('Get in Touch', 'nexus-techhub'); ?></h2>
                    <p class="section-description text-muted mb-4">
                        <?php _e('Need help finding the right parts? Our experts are here to assist you.', 'nexus-techhub'); ?>
                    </p>
                    
                    <div class="contact-methods">
                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <a href="tel:+971585531029" class="contact-method">
                                    <i class="fas fa-phone fa-2x text-primary mb-2"></i>
                                    <h6><?php _e('Call Us', 'nexus-techhub'); ?></h6>
                                    <p class="text-muted">+971 58 553 1029</p>
                                </a>
                            </div>
                            
                            <div class="col-md-4 mb-3">
                                <a href="<?php echo nexus_get_whatsapp_link(); ?>" target="_blank" class="contact-method">
                                    <i class="fab fa-whatsapp fa-2x text-success mb-2"></i>
                                    <h6><?php _e('WhatsApp', 'nexus-techhub'); ?></h6>
                                    <p class="text-muted"><?php _e('Instant Support', 'nexus-techhub'); ?></p>
                                </a>
                            </div>
                            
                            <div class="col-md-4 mb-3">
                                <a href="mailto:admin@nexustechhub.ae" class="contact-method">
                                    <i class="fas fa-envelope fa-2x text-info mb-2"></i>
                                    <h6><?php _e('Email Us', 'nexus-techhub'); ?></h6>
                                    <p class="text-muted">admin@nexustechhub.ae</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="business-location mt-4">
                        <h6 class="text-primary"><?php _e('Visit Our Location', 'nexus-techhub'); ?></h6>
                        <p class="text-muted">
                            FAMC3062, Compass Building, Al Shohada Road<br>
                            AL Hamra Industrial Zone-FZ, Ras Al Khaimah, UAE
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
</main>

<?php get_footer(); ?>
