<?php
/**
 * The template for displaying the footer
 * 
 * @package NexusTechHub
 */

$business_info = nexus_get_business_info();
?>

    <footer id="colophon" class="site-footer bg-dark text-white">
        
        <!-- Main Footer -->
        <div class="footer-main py-5">
            <div class="container">
                <div class="row">
                    
                    <!-- Company Information -->
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="footer-widget">
                            <h4 class="widget-title text-primary mb-3">
                                <span class="text-primary">Nexus</span> TechHub
                            </h4>
                            <p class="mb-3">
                                <?php _e('UAE\'s premier mobile repair parts supplier. Quality iPhone, Samsung, and iPad parts with fast shipping across the Emirates.', 'nexus-techhub'); ?>
                            </p>
                            
                            <!-- Business Address -->
                            <div class="business-address mb-3">
                                <i class="fas fa-map-marker-alt text-primary"></i>
                                <span class="ml-2">
                                    FAMC3062, Compass Building<br>
                                    Al Shohada Road, AL Hamra Industrial Zone-FZ<br>
                                    Ras Al Khaimah, United Arab Emirates
                                </span>
                            </div>
                            
                            <!-- UAE Flag Colors -->
                            <div class="uae-flag-colors mb-3"></div>
                            
                            <!-- Business Certifications -->
                            <div class="certifications">
                                <small class="text-muted">
                                    <?php _e('Licensed UAE Business | VAT Registered', 'nexus-techhub'); ?>
                                </small>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Quick Links -->
                    <div class="col-lg-2 col-md-6 mb-4">
                        <div class="footer-widget">
                            <h5 class="widget-title mb-3"><?php _e('Quick Links', 'nexus-techhub'); ?></h5>
                            <ul class="footer-links list-unstyled">
                                <li><a href="<?php echo home_url('/'); ?>" class="text-light"><?php _e('Home', 'nexus-techhub'); ?></a></li>
                                <?php if (class_exists('WooCommerce')) : ?>
                                    <li><a href="<?php echo get_permalink(wc_get_page_id('shop')); ?>" class="text-light"><?php _e('Shop', 'nexus-techhub'); ?></a></li>
                                <?php endif; ?>
                                <li><a href="<?php echo home_url('/about'); ?>" class="text-light"><?php _e('About Us', 'nexus-techhub'); ?></a></li>
                                <li><a href="<?php echo home_url('/contact'); ?>" class="text-light"><?php _e('Contact', 'nexus-techhub'); ?></a></li>
                                <li><a href="<?php echo home_url('/shipping'); ?>" class="text-light"><?php _e('Shipping Info', 'nexus-techhub'); ?></a></li>
                                <li><a href="<?php echo home_url('/returns'); ?>" class="text-light"><?php _e('Returns', 'nexus-techhub'); ?></a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Product Categories -->
                    <div class="col-lg-2 col-md-6 mb-4">
                        <div class="footer-widget">
                            <h5 class="widget-title mb-3"><?php _e('Products', 'nexus-techhub'); ?></h5>
                            <ul class="footer-links list-unstyled">
                                <?php if (class_exists('WooCommerce')) : ?>
                                    <?php
                                    $product_categories = get_terms(array(
                                        'taxonomy' => 'product_cat',
                                        'hide_empty' => true,
                                        'parent' => 0,
                                        'number' => 6
                                    ));
                                    
                                    if ($product_categories) :
                                        foreach ($product_categories as $category) :
                                            $category_link = get_term_link($category);
                                            echo '<li><a href="' . esc_url($category_link) . '" class="text-light">' . esc_html($category->name) . '</a></li>';
                                        endforeach;
                                    else :
                                    ?>
                                        <li><a href="#" class="text-light"><?php _e('iPhone Parts', 'nexus-techhub'); ?></a></li>
                                        <li><a href="#" class="text-light"><?php _e('Samsung Parts', 'nexus-techhub'); ?></a></li>
                                        <li><a href="#" class="text-light"><?php _e('iPad Parts', 'nexus-techhub'); ?></a></li>
                                        <li><a href="#" class="text-light"><?php _e('Repair Tools', 'nexus-techhub'); ?></a></li>
                                        <li><a href="#" class="text-light"><?php _e('LCD Buyback', 'nexus-techhub'); ?></a></li>
                                    <?php endif; ?>
                                <?php endif; ?>
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Contact Information -->
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="footer-widget">
                            <h5 class="widget-title mb-3"><?php _e('Contact Us', 'nexus-techhub'); ?></h5>
                            
                            <!-- Phone -->
                            <div class="contact-item mb-3">
                                <i class="fas fa-phone text-primary"></i>
                                <span class="ml-2">
                                    <a href="tel:<?php echo esc_attr($business_info['phone']); ?>" class="text-light">
                                        <?php echo esc_html($business_info['phone']); ?>
                                    </a>
                                </span>
                            </div>
                            
                            <!-- Email -->
                            <div class="contact-item mb-3">
                                <i class="fas fa-envelope text-primary"></i>
                                <span class="ml-2">
                                    <a href="mailto:<?php echo esc_attr($business_info['email']); ?>" class="text-light">
                                        <?php echo esc_html($business_info['email']); ?>
                                    </a>
                                </span>
                            </div>
                            
                            <!-- WhatsApp -->
                            <div class="contact-item mb-4">
                                <i class="fab fa-whatsapp text-success"></i>
                                <span class="ml-2">
                                    <a href="<?php echo esc_url($business_info['whatsapp']); ?>" class="text-light" target="_blank">
                                        <?php _e('WhatsApp Support', 'nexus-techhub'); ?>
                                    </a>
                                </span>
                            </div>
                            
                            <!-- Business Hours -->
                            <div class="business-hours mb-4">
                                <h6 class="text-primary"><?php _e('Business Hours', 'nexus-techhub'); ?></h6>
                                <div class="hours-list">
                                    <div class="d-flex justify-content-between">
                                        <span><?php _e('Sunday - Thursday:', 'nexus-techhub'); ?></span>
                                        <span>9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <span><?php _e('Friday:', 'nexus-techhub'); ?></span>
                                        <span>2:00 PM - 6:00 PM</span>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <span><?php _e('Saturday:', 'nexus-techhub'); ?></span>
                                        <span>9:00 AM - 6:00 PM</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Social Media -->
                            <div class="social-media">
                                <h6 class="text-primary mb-2"><?php _e('Follow Us', 'nexus-techhub'); ?></h6>
                                <div class="social-links">
                                    <a href="#" class="social-link text-light mr-3" target="_blank">
                                        <i class="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="#" class="social-link text-light mr-3" target="_blank">
                                        <i class="fab fa-instagram"></i>
                                    </a>
                                    <a href="#" class="social-link text-light mr-3" target="_blank">
                                        <i class="fab fa-linkedin-in"></i>
                                    </a>
                                    <a href="<?php echo esc_url($business_info['whatsapp']); ?>" class="social-link text-success" target="_blank">
                                        <i class="fab fa-whatsapp"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
        <!-- Footer Bottom -->
        <div class="footer-bottom bg-darker py-3">
            <div class="container">
                <div class="row align-items-center">
                    
                    <div class="col-md-6">
                        <div class="copyright">
                            <p class="mb-0 text-muted">
                                &copy; <?php echo date('Y'); ?> 
                                <span class="text-primary">Nexus TechHub</span>. 
                                <?php _e('All rights reserved.', 'nexus-techhub'); ?>
                            </p>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="footer-legal text-md-right">
                            <ul class="legal-links list-inline mb-0">
                                <li class="list-inline-item">
                                    <a href="<?php echo home_url('/privacy-policy'); ?>" class="text-muted">
                                        <?php _e('Privacy Policy', 'nexus-techhub'); ?>
                                    </a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="<?php echo home_url('/terms-conditions'); ?>" class="text-muted">
                                        <?php _e('Terms & Conditions', 'nexus-techhub'); ?>
                                    </a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="<?php echo home_url('/vat-information'); ?>" class="text-muted">
                                        <?php _e('VAT Info', 'nexus-techhub'); ?>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
                
                <!-- UAE VAT Information -->
                <div class="row mt-3">
                    <div class="col-12">
                        <div class="vat-info text-center">
                            <small class="text-muted">
                                <?php _e('UAE VAT Registration Number: [TRN Number] | All prices include 5% UAE VAT', 'nexus-techhub'); ?>
                            </small>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        
    </footer>

    <!-- WhatsApp Floating Button -->
    <div class="whatsapp-float">
        <a href="<?php echo esc_url(nexus_get_whatsapp_link('Hello! I need help with mobile repair parts.')); ?>" 
           class="btn btn-whatsapp" 
           target="_blank"
           title="<?php _e('Chat with us on WhatsApp', 'nexus-techhub'); ?>">
            <i class="fab fa-whatsapp"></i>
        </a>
    </div>

    <!-- Back to Top Button -->
    <div class="back-to-top">
        <button id="back-to-top-btn" class="btn btn-primary" title="<?php _e('Back to Top', 'nexus-techhub'); ?>">
            <i class="fas fa-chevron-up"></i>
        </button>
    </div>

</div><!-- #page -->

<?php wp_footer(); ?>

<!-- Custom JavaScript -->
<script>
jQuery(document).ready(function($) {
    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#back-to-top-btn').fadeIn();
        } else {
            $('#back-to-top-btn').fadeOut();
        }
    });
    
    $('#back-to-top-btn').click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });
    
    // Mobile menu toggle
    $('.mobile-menu-toggle').click(function() {
        $('#mobile-menu').slideToggle();
    });
    
    // WhatsApp floating button animation
    $('.whatsapp-float').hover(
        function() {
            $(this).find('.btn-whatsapp').addClass('pulse');
        },
        function() {
            $(this).find('.btn-whatsapp').removeClass('pulse');
        }
    );
});
</script>

<!-- UAE Business Schema Markup -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nexus TechHub",
    "description": "UAE's premier mobile repair parts supplier",
    "url": "<?php echo home_url(); ?>",
    "telephone": "+971585531029",
    "email": "admin@nexustechhub.ae",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "FAMC3062, Compass Building, Al Shohada Road",
        "addressLocality": "AL Hamra Industrial Zone-FZ",
        "addressRegion": "Ras Al Khaimah",
        "addressCountry": "AE"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "25.7617",
        "longitude": "55.9757"
    },
    "openingHours": [
        "Su-Th 09:00-18:00",
        "Fr 14:00-18:00", 
        "Sa 09:00-18:00"
    ],
    "priceRange": "$$",
    "currenciesAccepted": "AED",
    "paymentAccepted": "Cash, Credit Card, Debit Card",
    "areaServed": {
        "@type": "Country",
        "name": "United Arab Emirates"
    }
}
</script>

</body>
</html>
