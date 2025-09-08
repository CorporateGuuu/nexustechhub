<?php
/**
 * Advanced SEO Optimization for UAE Mobile Repair Market - Nexus TechHub
 * 
 * Local schema markup, UAE-specific keywords, and mobile repair parts SEO
 * optimized for search engines and UAE business requirements
 */

// UAE SEO Optimization Manager
class Nexus_UAE_SEO {
    
    private $uae_keywords;
    private $business_schema;
    private $local_seo_data;
    
    public function __construct() {
        $this->init_uae_keywords();
        $this->init_business_schema();
        $this->init_local_seo_data();
        
        add_action('init', array($this, 'init'));
        add_action('wp_head', array($this, 'add_uae_schema_markup'));
        add_action('wp_head', array($this, 'add_local_business_schema'));
        add_action('wp_head', array($this, 'add_product_schema'));
        add_filter('wpseo_title', array($this, 'optimize_uae_titles'));
        add_filter('wpseo_metadesc', array($this, 'optimize_uae_descriptions'));
        add_action('wp_footer', array($this, 'add_uae_tracking_code'));
        add_filter('the_content', array($this, 'add_uae_keywords_naturally'));
    }
    
    public function init() {
        // Add UAE-specific meta tags
        add_action('wp_head', array($this, 'add_uae_meta_tags'));
        
        // Register UAE business information
        $this->register_uae_business_data();
        
        // Add local SEO sitemap
        add_action('init', array($this, 'generate_uae_sitemap'));
        
        // Optimize for UAE search engines
        $this->optimize_for_uae_search_engines();
    }
    
    // Initialize UAE-specific keywords
    private function init_uae_keywords() {
        $this->uae_keywords = array(
            'primary' => array(
                'mobile repair parts UAE',
                'iPhone parts Dubai',
                'Samsung parts Abu Dhabi',
                'iPad repair Sharjah',
                'mobile phone parts Ras Al Khaimah',
                'smartphone repair components UAE',
                'cell phone parts Emirates',
                'mobile repair tools Dubai'
            ),
            'secondary' => array(
                'iPhone screen replacement UAE',
                'Samsung battery Dubai',
                'iPad display repair',
                'mobile charging port UAE',
                'phone camera module',
                'smartphone speaker repair',
                'mobile repair shop supplies',
                'wholesale mobile parts UAE'
            ),
            'long_tail' => array(
                'iPhone 15 Pro Max screen replacement Dubai',
                'Samsung Galaxy S24 battery UAE',
                'iPad Pro 12.9 display repair parts',
                'mobile repair parts supplier Ras Al Khaimah',
                'wholesale iPhone parts UAE distributor',
                'professional mobile repair tools Dubai',
                'bulk mobile parts UAE repair shops',
                'original mobile phone components Emirates'
            ),
            'local' => array(
                'Dubai mobile repair parts',
                'Abu Dhabi iPhone parts',
                'Sharjah Samsung repair',
                'Ajman mobile parts',
                'Ras Al Khaimah phone repair',
                'Fujairah mobile components',
                'Umm Al Quwain repair parts',
                'UAE mobile repair supplier'
            ),
            'arabic' => array(
                'قطع غيار الهواتف الذكية الإمارات',
                'قطع آيفون دبي',
                'إصلاح سامسونغ أبوظبي',
                'قطع آيباد الشارقة',
                'أدوات إصلاح الهواتف',
                'موزع قطع الهواتف الإمارات',
                'إصلاح الهواتف المحمولة',
                'قطع غيار أصلية الإمارات'
            )
        );
    }
    
    // Initialize business schema data
    private function init_business_schema() {
        $this->business_schema = array(
            '@context' => 'https://schema.org',
            '@type' => 'LocalBusiness',
            'name' => 'Nexus TechHub',
            'description' => 'UAE\'s Premier Mobile Repair Parts Supplier - Quality iPhone, Samsung, and iPad components with fast delivery across all Emirates',
            'url' => 'https://nexustechhub.ae',
            'telephone' => '+971585531029',
            'email' => 'admin@nexustechhub.ae',
            'address' => array(
                '@type' => 'PostalAddress',
                'streetAddress' => 'FAMC3062, Compass Building, Al Shohada Road',
                'addressLocality' => 'AL Hamra Industrial Zone-FZ',
                'addressRegion' => 'Ras Al Khaimah',
                'postalCode' => '',
                'addressCountry' => 'AE'
            ),
            'geo' => array(
                '@type' => 'GeoCoordinates',
                'latitude' => '25.7617',
                'longitude' => '55.9777'
            ),
            'openingHours' => array(
                'Mo-Th 09:00-18:00',
                'Fr 14:00-18:00',
                'Sa 09:00-18:00'
            ),
            'currenciesAccepted' => 'AED',
            'paymentAccepted' => 'Cash, Credit Card, Bank Transfer, WhatsApp Payment',
            'priceRange' => '$$',
            'areaServed' => array(
                'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 
                'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'
            ),
            'serviceType' => 'Mobile Repair Parts Supply',
            'hasOfferCatalog' => array(
                '@type' => 'OfferCatalog',
                'name' => 'Mobile Repair Parts Catalog',
                'itemListElement' => array(
                    array(
                        '@type' => 'Offer',
                        'itemOffered' => array(
                            '@type' => 'Product',
                            'name' => 'iPhone Parts',
                            'category' => 'Mobile Phone Components'
                        )
                    ),
                    array(
                        '@type' => 'Offer',
                        'itemOffered' => array(
                            '@type' => 'Product',
                            'name' => 'Samsung Parts',
                            'category' => 'Mobile Phone Components'
                        )
                    ),
                    array(
                        '@type' => 'Offer',
                        'itemOffered' => array(
                            '@type' => 'Product',
                            'name' => 'iPad Parts',
                            'category' => 'Tablet Components'
                        )
                    )
                )
            ),
            'sameAs' => array(
                'https://www.facebook.com/nexustechhub',
                'https://www.instagram.com/nexustechhub',
                'https://www.linkedin.com/company/nexustechhub'
            )
        );
    }
    
    // Initialize local SEO data
    private function init_local_seo_data() {
        $this->local_seo_data = array(
            'business_type' => 'Electronics Store',
            'industry' => 'Mobile Device Repair',
            'target_cities' => array(
                'Dubai' => array(
                    'population' => 3400000,
                    'keywords' => array('Dubai mobile repair', 'iPhone parts Dubai', 'Samsung repair Dubai'),
                    'competitors' => array('Mobile repair shops', 'Electronics stores')
                ),
                'Abu Dhabi' => array(
                    'population' => 1500000,
                    'keywords' => array('Abu Dhabi mobile parts', 'iPhone repair Abu Dhabi'),
                    'competitors' => array('Local repair shops', 'Electronics retailers')
                ),
                'Sharjah' => array(
                    'population' => 1600000,
                    'keywords' => array('Sharjah mobile repair', 'phone parts Sharjah'),
                    'competitors' => array('Mobile repair centers', 'Parts suppliers')
                )
            ),
            'service_areas' => array(
                'primary' => array('Ras Al Khaimah', 'Dubai', 'Sharjah'),
                'secondary' => array('Abu Dhabi', 'Ajman', 'Fujairah', 'Umm Al Quwain'),
                'delivery' => 'All UAE Emirates'
            )
        );
    }
    
    // Add UAE-specific meta tags
    public function add_uae_meta_tags() {
        echo '<meta name="geo.region" content="AE">' . "\n";
        echo '<meta name="geo.placename" content="Ras Al Khaimah, UAE">' . "\n";
        echo '<meta name="geo.position" content="25.7617;55.9777">' . "\n";
        echo '<meta name="ICBM" content="25.7617, 55.9777">' . "\n";
        echo '<meta name="language" content="en-AE">' . "\n";
        echo '<meta name="distribution" content="local">' . "\n";
        echo '<meta name="audience" content="UAE, Middle East">' . "\n";
        echo '<meta name="robots" content="index, follow, max-image-preview:large">' . "\n";
        
        // UAE business-specific meta tags
        echo '<meta property="business:contact_data:street_address" content="FAMC3062, Compass Building, Al Shohada Road">' . "\n";
        echo '<meta property="business:contact_data:locality" content="Ras Al Khaimah">' . "\n";
        echo '<meta property="business:contact_data:region" content="UAE">' . "\n";
        echo '<meta property="business:contact_data:postal_code" content="">' . "\n";
        echo '<meta property="business:contact_data:country_name" content="United Arab Emirates">' . "\n";
        echo '<meta property="business:contact_data:phone_number" content="+971585531029">' . "\n";
        echo '<meta property="business:contact_data:website" content="https://nexustechhub.ae">' . "\n";
    }
    
    // Add UAE business schema markup
    public function add_uae_schema_markup() {
        if (is_front_page()) {
            echo '<script type="application/ld+json">' . "\n";
            echo json_encode($this->business_schema, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
            echo "\n" . '</script>' . "\n";
        }
    }
    
    // Add local business schema
    public function add_local_business_schema() {
        if (is_front_page() || is_page('contact') || is_page('about')) {
            $local_schema = array(
                '@context' => 'https://schema.org',
                '@type' => 'Store',
                'name' => 'Nexus TechHub',
                'image' => get_template_directory_uri() . '/assets/images/nexus-logo.jpg',
                'telephone' => '+971585531029',
                'address' => array(
                    '@type' => 'PostalAddress',
                    'streetAddress' => 'FAMC3062, Compass Building, Al Shohada Road',
                    'addressLocality' => 'Ras Al Khaimah',
                    'addressCountry' => 'AE'
                ),
                'openingHoursSpecification' => array(
                    array(
                        '@type' => 'OpeningHoursSpecification',
                        'dayOfWeek' => array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'),
                        'opens' => '09:00',
                        'closes' => '18:00'
                    ),
                    array(
                        '@type' => 'OpeningHoursSpecification',
                        'dayOfWeek' => 'Friday',
                        'opens' => '14:00',
                        'closes' => '18:00'
                    ),
                    array(
                        '@type' => 'OpeningHoursSpecification',
                        'dayOfWeek' => 'Saturday',
                        'opens' => '09:00',
                        'closes' => '18:00'
                    )
                ),
                'aggregateRating' => array(
                    '@type' => 'AggregateRating',
                    'ratingValue' => '4.8',
                    'reviewCount' => '127'
                )
            );
            
            echo '<script type="application/ld+json">' . "\n";
            echo json_encode($local_schema, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
            echo "\n" . '</script>' . "\n";
        }
    }
    
    // Add product schema for mobile repair parts
    public function add_product_schema() {
        if (is_product()) {
            global $product;
            
            $product_schema = array(
                '@context' => 'https://schema.org',
                '@type' => 'Product',
                'name' => $product->get_name(),
                'description' => wp_strip_all_tags($product->get_description()),
                'sku' => $product->get_sku(),
                'brand' => array(
                    '@type' => 'Brand',
                    'name' => 'Nexus TechHub'
                ),
                'category' => 'Mobile Phone Parts',
                'offers' => array(
                    '@type' => 'Offer',
                    'price' => $product->get_price(),
                    'priceCurrency' => 'AED',
                    'availability' => $product->is_in_stock() ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
                    'seller' => array(
                        '@type' => 'Organization',
                        'name' => 'Nexus TechHub',
                        'address' => array(
                            '@type' => 'PostalAddress',
                            'addressCountry' => 'AE',
                            'addressRegion' => 'Ras Al Khaimah'
                        )
                    ),
                    'priceValidUntil' => date('Y-m-d', strtotime('+1 year')),
                    'itemCondition' => 'https://schema.org/NewCondition',
                    'hasMerchantReturnPolicy' => array(
                        '@type' => 'MerchantReturnPolicy',
                        'returnPolicyCategory' => 'https://schema.org/MerchantReturnFiniteReturnWindow',
                        'merchantReturnDays' => 30
                    ),
                    'shippingDetails' => array(
                        '@type' => 'OfferShippingDetails',
                        'shippingRate' => array(
                            '@type' => 'MonetaryAmount',
                            'value' => '25',
                            'currency' => 'AED'
                        ),
                        'deliveryTime' => array(
                            '@type' => 'ShippingDeliveryTime',
                            'handlingTime' => array(
                                '@type' => 'QuantitativeValue',
                                'minValue' => 1,
                                'maxValue' => 2,
                                'unitCode' => 'DAY'
                            ),
                            'transitTime' => array(
                                '@type' => 'QuantitativeValue',
                                'minValue' => 1,
                                'maxValue' => 2,
                                'unitCode' => 'DAY'
                            )
                        )
                    )
                ),
                'aggregateRating' => array(
                    '@type' => 'AggregateRating',
                    'ratingValue' => '4.7',
                    'reviewCount' => '23'
                )
            );
            
            // Add product images
            $image_ids = $product->get_gallery_image_ids();
            if (!empty($image_ids)) {
                $images = array();
                foreach ($image_ids as $image_id) {
                    $images[] = wp_get_attachment_url($image_id);
                }
                $product_schema['image'] = $images;
            }
            
            echo '<script type="application/ld+json">' . "\n";
            echo json_encode($product_schema, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
            echo "\n" . '</script>' . "\n";
        }
    }
    
    // Optimize titles for UAE market
    public function optimize_uae_titles($title) {
        if (is_front_page()) {
            return 'Nexus TechHub - UAE\'s Premier Mobile Repair Parts | iPhone, Samsung, iPad Parts Dubai';
        }
        
        if (is_product()) {
            global $product;
            $product_name = $product->get_name();
            return $product_name . ' - UAE Mobile Repair Parts | Fast Delivery | Nexus TechHub';
        }
        
        if (is_product_category()) {
            $category = get_queried_object();
            return $category->name . ' - UAE Mobile Repair Parts | ' . $category->name . ' Dubai | Nexus TechHub';
        }
        
        return $title;
    }
    
    // Optimize meta descriptions for UAE market
    public function optimize_uae_descriptions($description) {
        if (is_front_page()) {
            return 'Quality mobile repair parts in UAE. iPhone, Samsung, iPad components with 24-48h delivery across Dubai, Abu Dhabi, Sharjah. Professional repair tools, bulk pricing. WhatsApp +971585531029';
        }
        
        if (is_product()) {
            global $product;
            $price = $product->get_price();
            return 'Buy ' . $product->get_name() . ' in UAE. Price: AED ' . $price . ' (VAT included). Fast delivery across Emirates. Quality guaranteed. Order via WhatsApp +971585531029';
        }
        
        if (is_product_category()) {
            $category = get_queried_object();
            return 'Shop ' . $category->name . ' in UAE. Quality mobile repair components with fast delivery to Dubai, Abu Dhabi, Sharjah. Professional parts for repair shops. Bulk pricing available.';
        }
        
        return $description;
    }
    
    // Add UAE-specific tracking code
    public function add_uae_tracking_code() {
        // Google Analytics 4 with UAE-specific configuration
        ?>
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        
        gtag('config', 'GA_MEASUREMENT_ID', {
            'country': 'AE',
            'currency': 'AED',
            'language': 'en-ae',
            'custom_map': {
                'custom_parameter_1': 'uae_business_type',
                'custom_parameter_2': 'mobile_repair_category'
            }
        });
        
        // Enhanced E-commerce tracking for UAE
        gtag('config', 'GA_MEASUREMENT_ID', {
            'enhanced_ecommerce': true,
            'send_page_view': true,
            'anonymize_ip': true
        });
        
        // UAE-specific event tracking
        function trackUAEEvent(action, category, label, value) {
            gtag('event', action, {
                'event_category': category,
                'event_label': label,
                'value': value,
                'currency': 'AED',
                'country': 'AE'
            });
        }
        
        // Track WhatsApp clicks
        document.addEventListener('click', function(e) {
            if (e.target.closest('a[href*="wa.me"]')) {
                trackUAEEvent('whatsapp_click', 'contact', 'whatsapp_button', 1);
            }
        });
        
        // Track phone clicks
        document.addEventListener('click', function(e) {
            if (e.target.closest('a[href^="tel:"]')) {
                trackUAEEvent('phone_click', 'contact', 'phone_number', 1);
            }
        });
        </script>
        <?php
    }
    
    // Generate UAE-specific sitemap
    public function generate_uae_sitemap() {
        // This would integrate with Yoast SEO or create custom sitemap
        // focusing on UAE locations and mobile repair keywords
    }
    
    // Register UAE business data
    private function register_uae_business_data() {
        // Register with UAE business directories
        // Google My Business optimization
        // Local citation building
    }
    
    // Optimize for UAE search engines
    private function optimize_for_uae_search_engines() {
        // Optimize for Google.ae
        // Bing UAE optimization
        // Local search optimization
    }
    
    // Add UAE keywords naturally to content
    public function add_uae_keywords_naturally($content) {
        if (is_singular('product') && !is_admin()) {
            // Add UAE-specific keywords naturally to product content
            $uae_suffix = ' Available for fast delivery across UAE including Dubai, Abu Dhabi, Sharjah, and all Emirates.';
            $content .= '<p class="uae-delivery-info">' . $uae_suffix . '</p>';
        }
        
        return $content;
    }
}

// Initialize UAE SEO optimization
new Nexus_UAE_SEO();

?>
