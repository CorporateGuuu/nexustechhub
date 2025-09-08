<?php
/**
 * Enhanced Product Search for Mobile Repair Parts - Nexus TechHub
 * 
 * Advanced search functionality for iPhone, Samsung, iPad components
 * with device model, part type, and compatibility filters
 */

// Enhanced product search with mobile repair parts filters
function nexus_enhanced_product_search() {
    ?>
    <div class="nexus-advanced-search">
        <form class="advanced-search-form" method="get" action="<?php echo esc_url(home_url('/')); ?>">
            <input type="hidden" name="post_type" value="product">
            
            <div class="search-container">
                <div class="row">
                    <!-- Main Search Input -->
                    <div class="col-lg-4 col-md-6 mb-3">
                        <div class="search-field">
                            <label for="search-query" class="sr-only"><?php _e('Search Products', 'nexus-techhub'); ?></label>
                            <input type="text" 
                                   id="search-query"
                                   name="s" 
                                   class="form-control search-input" 
                                   placeholder="<?php _e('Search for parts...', 'nexus-techhub'); ?>"
                                   value="<?php echo get_search_query(); ?>">
                            <i class="fas fa-search search-icon"></i>
                        </div>
                    </div>
                    
                    <!-- Device Brand Filter -->
                    <div class="col-lg-2 col-md-6 mb-3">
                        <select name="device_brand" class="form-control search-select">
                            <option value=""><?php _e('All Brands', 'nexus-techhub'); ?></option>
                            <option value="iphone" <?php selected(isset($_GET['device_brand']) ? $_GET['device_brand'] : '', 'iphone'); ?>>
                                <?php _e('iPhone', 'nexus-techhub'); ?>
                            </option>
                            <option value="samsung" <?php selected(isset($_GET['device_brand']) ? $_GET['device_brand'] : '', 'samsung'); ?>>
                                <?php _e('Samsung', 'nexus-techhub'); ?>
                            </option>
                            <option value="ipad" <?php selected(isset($_GET['device_brand']) ? $_GET['device_brand'] : '', 'ipad'); ?>>
                                <?php _e('iPad', 'nexus-techhub'); ?>
                            </option>
                        </select>
                    </div>
                    
                    <!-- Part Type Filter -->
                    <div class="col-lg-2 col-md-6 mb-3">
                        <select name="part_type" class="form-control search-select">
                            <option value=""><?php _e('All Parts', 'nexus-techhub'); ?></option>
                            <option value="screen" <?php selected(isset($_GET['part_type']) ? $_GET['part_type'] : '', 'screen'); ?>>
                                <?php _e('Screen/Display', 'nexus-techhub'); ?>
                            </option>
                            <option value="battery" <?php selected(isset($_GET['part_type']) ? $_GET['part_type'] : '', 'battery'); ?>>
                                <?php _e('Battery', 'nexus-techhub'); ?>
                            </option>
                            <option value="camera" <?php selected(isset($_GET['part_type']) ? $_GET['part_type'] : '', 'camera'); ?>>
                                <?php _e('Camera', 'nexus-techhub'); ?>
                            </option>
                            <option value="charging-port" <?php selected(isset($_GET['part_type']) ? $_GET['part_type'] : '', 'charging-port'); ?>>
                                <?php _e('Charging Port', 'nexus-techhub'); ?>
                            </option>
                            <option value="speaker" <?php selected(isset($_GET['part_type']) ? $_GET['part_type'] : '', 'speaker'); ?>>
                                <?php _e('Speaker', 'nexus-techhub'); ?>
                            </option>
                        </select>
                    </div>
                    
                    <!-- Quality Grade Filter -->
                    <div class="col-lg-2 col-md-6 mb-3">
                        <select name="quality_grade" class="form-control search-select">
                            <option value=""><?php _e('All Grades', 'nexus-techhub'); ?></option>
                            <option value="premium" <?php selected(isset($_GET['quality_grade']) ? $_GET['quality_grade'] : '', 'premium'); ?>>
                                <?php _e('Premium (AAA+)', 'nexus-techhub'); ?>
                            </option>
                            <option value="high" <?php selected(isset($_GET['quality_grade']) ? $_GET['quality_grade'] : '', 'high'); ?>>
                                <?php _e('High Quality (AAA)', 'nexus-techhub'); ?>
                            </option>
                            <option value="standard" <?php selected(isset($_GET['quality_grade']) ? $_GET['quality_grade'] : '', 'standard'); ?>>
                                <?php _e('Standard (AA)', 'nexus-techhub'); ?>
                            </option>
                        </select>
                    </div>
                    
                    <!-- Search Button -->
                    <div class="col-lg-2 col-md-12 mb-3">
                        <button type="submit" class="btn btn-primary btn-block search-btn">
                            <i class="fas fa-search mr-2"></i>
                            <?php _e('Search', 'nexus-techhub'); ?>
                        </button>
                    </div>
                </div>
                
                <!-- Advanced Filters Toggle -->
                <div class="advanced-filters-toggle">
                    <button type="button" class="btn btn-link" data-toggle="collapse" data-target="#advanced-filters">
                        <i class="fas fa-filter mr-2"></i>
                        <?php _e('Advanced Filters', 'nexus-techhub'); ?>
                        <i class="fas fa-chevron-down ml-2"></i>
                    </button>
                </div>
                
                <!-- Advanced Filters Panel -->
                <div class="collapse" id="advanced-filters">
                    <div class="advanced-filters-panel mt-3 p-3 bg-light rounded">
                        <div class="row">
                            <!-- Price Range -->
                            <div class="col-md-3 mb-3">
                                <label class="filter-label"><?php _e('Price Range (AED)', 'nexus-techhub'); ?></label>
                                <div class="price-range-inputs">
                                    <input type="number" 
                                           name="min_price" 
                                           class="form-control form-control-sm mb-2" 
                                           placeholder="<?php _e('Min Price', 'nexus-techhub'); ?>"
                                           value="<?php echo isset($_GET['min_price']) ? esc_attr($_GET['min_price']) : ''; ?>">
                                    <input type="number" 
                                           name="max_price" 
                                           class="form-control form-control-sm" 
                                           placeholder="<?php _e('Max Price', 'nexus-techhub'); ?>"
                                           value="<?php echo isset($_GET['max_price']) ? esc_attr($_GET['max_price']) : ''; ?>">
                                </div>
                            </div>
                            
                            <!-- Device Model -->
                            <div class="col-md-3 mb-3">
                                <label class="filter-label"><?php _e('Device Model', 'nexus-techhub'); ?></label>
                                <select name="device_model" class="form-control form-control-sm">
                                    <option value=""><?php _e('All Models', 'nexus-techhub'); ?></option>
                                    <optgroup label="iPhone">
                                        <option value="iphone-15-pro-max">iPhone 15 Pro Max</option>
                                        <option value="iphone-15-pro">iPhone 15 Pro</option>
                                        <option value="iphone-15-plus">iPhone 15 Plus</option>
                                        <option value="iphone-15">iPhone 15</option>
                                        <option value="iphone-14-pro-max">iPhone 14 Pro Max</option>
                                        <option value="iphone-14-pro">iPhone 14 Pro</option>
                                    </optgroup>
                                    <optgroup label="Samsung">
                                        <option value="galaxy-s24-ultra">Galaxy S24 Ultra</option>
                                        <option value="galaxy-s24-plus">Galaxy S24 Plus</option>
                                        <option value="galaxy-s24">Galaxy S24</option>
                                        <option value="galaxy-s23-ultra">Galaxy S23 Ultra</option>
                                    </optgroup>
                                    <optgroup label="iPad">
                                        <option value="ipad-pro-12-9">iPad Pro 12.9"</option>
                                        <option value="ipad-pro-11">iPad Pro 11"</option>
                                        <option value="ipad-air">iPad Air</option>
                                        <option value="ipad-mini">iPad Mini</option>
                                    </optgroup>
                                </select>
                            </div>
                            
                            <!-- Condition -->
                            <div class="col-md-3 mb-3">
                                <label class="filter-label"><?php _e('Condition', 'nexus-techhub'); ?></label>
                                <select name="condition" class="form-control form-control-sm">
                                    <option value=""><?php _e('All Conditions', 'nexus-techhub'); ?></option>
                                    <option value="new-original"><?php _e('New (Original)', 'nexus-techhub'); ?></option>
                                    <option value="new-aftermarket"><?php _e('New (Aftermarket)', 'nexus-techhub'); ?></option>
                                    <option value="refurbished"><?php _e('Refurbished', 'nexus-techhub'); ?></option>
                                </select>
                            </div>
                            
                            <!-- Warranty -->
                            <div class="col-md-3 mb-3">
                                <label class="filter-label"><?php _e('Warranty', 'nexus-techhub'); ?></label>
                                <select name="warranty" class="form-control form-control-sm">
                                    <option value=""><?php _e('All Warranties', 'nexus-techhub'); ?></option>
                                    <option value="12-months"><?php _e('12 Months', 'nexus-techhub'); ?></option>
                                    <option value="6-months"><?php _e('6 Months', 'nexus-techhub'); ?></option>
                                    <option value="3-months"><?php _e('3 Months', 'nexus-techhub'); ?></option>
                                    <option value="30-days"><?php _e('30 Days', 'nexus-techhub'); ?></option>
                                </select>
                            </div>
                        </div>
                        
                        <!-- Filter Actions -->
                        <div class="filter-actions mt-3">
                            <button type="submit" class="btn btn-primary mr-2">
                                <i class="fas fa-filter mr-2"></i>
                                <?php _e('Apply Filters', 'nexus-techhub'); ?>
                            </button>
                            <a href="<?php echo get_permalink(wc_get_page_id('shop')); ?>" class="btn btn-outline-secondary">
                                <i class="fas fa-times mr-2"></i>
                                <?php _e('Clear All', 'nexus-techhub'); ?>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        
        <!-- Search Suggestions -->
        <div class="search-suggestions mt-3">
            <div class="suggestions-container">
                <span class="suggestions-label"><?php _e('Popular Searches:', 'nexus-techhub'); ?></span>
                <div class="suggestions-list">
                    <a href="?s=iphone+15+screen" class="suggestion-tag">iPhone 15 Screen</a>
                    <a href="?s=samsung+s24+battery" class="suggestion-tag">Samsung S24 Battery</a>
                    <a href="?s=ipad+pro+display" class="suggestion-tag">iPad Pro Display</a>
                    <a href="?s=charging+port" class="suggestion-tag">Charging Port</a>
                    <a href="?s=camera+module" class="suggestion-tag">Camera Module</a>
                </div>
            </div>
        </div>
    </div>
    
    <style>
    .nexus-advanced-search {
        background: #fff;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 30px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .search-field {
        position: relative;
    }
    
    .search-input {
        padding-right: 40px;
        border: 2px solid #10b981;
        border-radius: 6px;
    }
    
    .search-input:focus {
        border-color: #059669;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
    
    .search-icon {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: #10b981;
    }
    
    .search-select {
        border: 1px solid #d1d5db;
        border-radius: 6px;
    }
    
    .search-btn {
        background: #10b981;
        border-color: #10b981;
        border-radius: 6px;
        font-weight: 500;
    }
    
    .search-btn:hover {
        background: #059669;
        border-color: #059669;
    }
    
    .advanced-filters-toggle .btn-link {
        color: #6b7280;
        text-decoration: none;
        padding: 0;
    }
    
    .advanced-filters-toggle .btn-link:hover {
        color: #10b981;
    }
    
    .advanced-filters-panel {
        border: 1px solid #e5e7eb;
    }
    
    .filter-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: #374151;
        margin-bottom: 5px;
        display: block;
    }
    
    .suggestions-container {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
    }
    
    .suggestions-label {
        font-size: 0.875rem;
        color: #6b7280;
        font-weight: 500;
    }
    
    .suggestions-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    
    .suggestion-tag {
        background: #f3f4f6;
        color: #374151;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.875rem;
        text-decoration: none;
        transition: all 0.2s;
    }
    
    .suggestion-tag:hover {
        background: #10b981;
        color: white;
        text-decoration: none;
    }
    
    @media (max-width: 768px) {
        .nexus-advanced-search {
            padding: 15px;
        }
        
        .suggestions-container {
            flex-direction: column;
            align-items: flex-start;
        }
    }
    </style>
    <?php
}

// Hook the enhanced search into WooCommerce shop page
add_action('woocommerce_before_shop_loop', 'nexus_enhanced_product_search', 5);

// Custom search query modification for mobile repair parts
function nexus_modify_product_search_query($query) {
    if (!is_admin() && $query->is_main_query() && is_search() && isset($query->query_vars['post_type']) && $query->query_vars['post_type'] === 'product') {
        
        $meta_query = array('relation' => 'AND');
        $tax_query = array('relation' => 'AND');
        
        // Device brand filter
        if (!empty($_GET['device_brand'])) {
            $tax_query[] = array(
                'taxonomy' => 'pa_device-brand',
                'field'    => 'slug',
                'terms'    => sanitize_text_field($_GET['device_brand']),
            );
        }
        
        // Part type filter
        if (!empty($_GET['part_type'])) {
            $tax_query[] = array(
                'taxonomy' => 'pa_part-type',
                'field'    => 'slug',
                'terms'    => sanitize_text_field($_GET['part_type']),
            );
        }
        
        // Quality grade filter
        if (!empty($_GET['quality_grade'])) {
            $tax_query[] = array(
                'taxonomy' => 'pa_quality-grade',
                'field'    => 'slug',
                'terms'    => sanitize_text_field($_GET['quality_grade']),
            );
        }
        
        // Price range filter
        if (!empty($_GET['min_price']) || !empty($_GET['max_price'])) {
            $price_meta = array(
                'key'     => '_price',
                'type'    => 'NUMERIC',
                'compare' => 'BETWEEN',
            );
            
            $min_price = !empty($_GET['min_price']) ? floatval($_GET['min_price']) : 0;
            $max_price = !empty($_GET['max_price']) ? floatval($_GET['max_price']) : 999999;
            
            $price_meta['value'] = array($min_price, $max_price);
            $meta_query[] = $price_meta;
        }
        
        // Device model filter
        if (!empty($_GET['device_model'])) {
            $tax_query[] = array(
                'taxonomy' => 'pa_device-model',
                'field'    => 'slug',
                'terms'    => sanitize_text_field($_GET['device_model']),
            );
        }
        
        // Condition filter
        if (!empty($_GET['condition'])) {
            $tax_query[] = array(
                'taxonomy' => 'pa_condition',
                'field'    => 'slug',
                'terms'    => sanitize_text_field($_GET['condition']),
            );
        }
        
        // Warranty filter
        if (!empty($_GET['warranty'])) {
            $tax_query[] = array(
                'taxonomy' => 'pa_warranty',
                'field'    => 'slug',
                'terms'    => sanitize_text_field($_GET['warranty']),
            );
        }
        
        if (!empty($meta_query)) {
            $query->set('meta_query', $meta_query);
        }
        
        if (!empty($tax_query)) {
            $query->set('tax_query', $tax_query);
        }
    }
}
add_action('pre_get_posts', 'nexus_modify_product_search_query');

// AJAX search suggestions for mobile repair parts
function nexus_ajax_search_suggestions() {
    check_ajax_referer('nexus_search_nonce', 'nonce');
    
    $search_term = sanitize_text_field($_POST['search_term']);
    
    if (strlen($search_term) < 2) {
        wp_die();
    }
    
    $suggestions = array();
    
    // Search in product titles
    $products = get_posts(array(
        'post_type' => 'product',
        'posts_per_page' => 5,
        's' => $search_term,
        'post_status' => 'publish'
    ));
    
    foreach ($products as $product) {
        $suggestions[] = array(
            'title' => $product->post_title,
            'url' => get_permalink($product->ID),
            'type' => 'product'
        );
    }
    
    // Search in product categories
    $categories = get_terms(array(
        'taxonomy' => 'product_cat',
        'name__like' => $search_term,
        'number' => 3
    ));
    
    foreach ($categories as $category) {
        $suggestions[] = array(
            'title' => $category->name,
            'url' => get_term_link($category),
            'type' => 'category'
        );
    }
    
    wp_send_json_success($suggestions);
}
add_action('wp_ajax_nexus_search_suggestions', 'nexus_ajax_search_suggestions');
add_action('wp_ajax_nopriv_nexus_search_suggestions', 'nexus_ajax_search_suggestions');

?>
