<?php
/**
 * Bulk Pricing Calculator for Repair Businesses - Nexus TechHub
 * 
 * Tiered AED pricing system for repair shops with automatic discounts
 * and bulk order management for mobile repair parts
 */

// Bulk pricing calculator class
class Nexus_Bulk_Pricing_Calculator {
    
    private $pricing_tiers;
    
    public function __construct() {
        $this->init_pricing_tiers();
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('woocommerce_before_single_product_summary', array($this, 'display_bulk_pricing_table'), 25);
        add_action('woocommerce_before_add_to_cart_form', array($this, 'display_bulk_calculator'), 15);
        add_filter('woocommerce_product_get_price', array($this, 'apply_bulk_pricing'), 10, 2);
        add_action('wp_ajax_calculate_bulk_pricing', array($this, 'ajax_calculate_bulk_pricing'));
        add_action('wp_ajax_nopriv_calculate_bulk_pricing', array($this, 'ajax_calculate_bulk_pricing'));
        add_action('woocommerce_cart_calculate_fees', array($this, 'apply_bulk_discount_to_cart'));
    }
    
    public function init() {
        // Register bulk pricing user role for repair shops
        add_role('repair_shop', __('Repair Shop', 'nexus-techhub'), array(
            'read' => true,
            'edit_posts' => false,
            'delete_posts' => false,
        ));
        
        // Add bulk pricing meta fields to products
        add_action('woocommerce_product_options_pricing', array($this, 'add_bulk_pricing_fields'));
        add_action('woocommerce_process_product_meta', array($this, 'save_bulk_pricing_fields'));
    }
    
    // Initialize pricing tiers for UAE market
    private function init_pricing_tiers() {
        $this->pricing_tiers = array(
            'individual' => array(
                'min_quantity' => 1,
                'max_quantity' => 4,
                'discount_percentage' => 0,
                'title' => __('Individual Customer', 'nexus-techhub'),
                'description' => __('Standard retail pricing', 'nexus-techhub')
            ),
            'small_repair' => array(
                'min_quantity' => 5,
                'max_quantity' => 19,
                'discount_percentage' => 5,
                'title' => __('Small Repair Shop', 'nexus-techhub'),
                'description' => __('5% discount for small quantities', 'nexus-techhub')
            ),
            'medium_repair' => array(
                'min_quantity' => 20,
                'max_quantity' => 49,
                'discount_percentage' => 10,
                'title' => __('Medium Repair Business', 'nexus-techhub'),
                'description' => __('10% discount for medium quantities', 'nexus-techhub')
            ),
            'large_repair' => array(
                'min_quantity' => 50,
                'max_quantity' => 99,
                'discount_percentage' => 15,
                'title' => __('Large Repair Center', 'nexus-techhub'),
                'description' => __('15% discount for large quantities', 'nexus-techhub')
            ),
            'wholesale' => array(
                'min_quantity' => 100,
                'max_quantity' => 999999,
                'discount_percentage' => 20,
                'title' => __('Wholesale/Distributor', 'nexus-techhub'),
                'description' => __('20% discount for wholesale orders', 'nexus-techhub')
            )
        );
    }
    
    // Display bulk pricing table on product pages
    public function display_bulk_pricing_table() {
        global $product;
        
        if (!$product || !$product->is_type('simple')) {
            return;
        }
        
        $base_price = $product->get_regular_price();
        if (!$base_price) {
            return;
        }
        
        ?>
        <div class="nexus-bulk-pricing-table">
            <h4 class="bulk-pricing-title">
                <i class="fas fa-calculator text-primary"></i>
                <?php _e('Bulk Pricing for Repair Shops', 'nexus-techhub'); ?>
            </h4>
            <p class="bulk-pricing-subtitle">
                <?php _e('Special pricing available for repair businesses. Prices include 5% UAE VAT.', 'nexus-techhub'); ?>
            </p>
            
            <div class="pricing-tiers-table">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th><?php _e('Quantity', 'nexus-techhub'); ?></th>
                            <th><?php _e('Customer Type', 'nexus-techhub'); ?></th>
                            <th><?php _e('Discount', 'nexus-techhub'); ?></th>
                            <th><?php _e('Price per Unit (AED)', 'nexus-techhub'); ?></th>
                            <th><?php _e('Total Savings', 'nexus-techhub'); ?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($this->pricing_tiers as $tier_key => $tier) : 
                            $discounted_price = $base_price * (1 - $tier['discount_percentage'] / 100);
                            $savings_per_unit = $base_price - $discounted_price;
                            $quantity_display = $tier['max_quantity'] == 999999 ? $tier['min_quantity'] . '+' : $tier['min_quantity'] . '-' . $tier['max_quantity'];
                        ?>
                            <tr class="pricing-tier-row" data-tier="<?php echo esc_attr($tier_key); ?>">
                                <td class="quantity-range">
                                    <strong><?php echo $quantity_display; ?></strong>
                                </td>
                                <td class="customer-type">
                                    <div class="tier-info">
                                        <strong><?php echo esc_html($tier['title']); ?></strong>
                                        <small class="text-muted d-block"><?php echo esc_html($tier['description']); ?></small>
                                    </div>
                                </td>
                                <td class="discount-percentage">
                                    <?php if ($tier['discount_percentage'] > 0) : ?>
                                        <span class="badge badge-success"><?php echo $tier['discount_percentage']; ?>% OFF</span>
                                    <?php else : ?>
                                        <span class="text-muted">-</span>
                                    <?php endif; ?>
                                </td>
                                <td class="unit-price">
                                    <strong class="price-aed"><?php echo number_format($discounted_price, 2); ?></strong>
                                    <?php if ($tier['discount_percentage'] > 0) : ?>
                                        <small class="original-price text-muted">
                                            <del>د.إ <?php echo number_format($base_price, 2); ?></del>
                                        </small>
                                    <?php endif; ?>
                                </td>
                                <td class="total-savings">
                                    <?php if ($savings_per_unit > 0) : ?>
                                        <span class="savings-amount text-success">
                                            د.إ <?php echo number_format($savings_per_unit, 2); ?> per unit
                                        </span>
                                    <?php else : ?>
                                        <span class="text-muted">-</span>
                                    <?php endif; ?>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
            
            <div class="bulk-pricing-notes mt-3">
                <div class="alert alert-info">
                    <h6><i class="fas fa-info-circle"></i> <?php _e('Bulk Pricing Benefits', 'nexus-techhub'); ?></h6>
                    <ul class="mb-0">
                        <li><?php _e('Automatic discounts applied at checkout', 'nexus-techhub'); ?></li>
                        <li><?php _e('Free shipping on orders over AED 500', 'nexus-techhub'); ?></li>
                        <li><?php _e('Priority customer support for repair shops', 'nexus-techhub'); ?></li>
                        <li><?php _e('Extended payment terms available', 'nexus-techhub'); ?></li>
                    </ul>
                </div>
            </div>
        </div>
        
        <style>
        .nexus-bulk-pricing-table {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .bulk-pricing-title {
            color: #10b981;
            margin-bottom: 5px;
            font-size: 1.2rem;
        }
        
        .bulk-pricing-subtitle {
            color: #6c757d;
            margin-bottom: 20px;
            font-size: 0.9rem;
        }
        
        .pricing-tiers-table .table {
            background: white;
            border-radius: 6px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .pricing-tiers-table th {
            background: #10b981;
            color: white;
            border: none;
            font-weight: 600;
            padding: 12px;
        }
        
        .pricing-tiers-table td {
            padding: 12px;
            vertical-align: middle;
        }
        
        .quantity-range {
            font-family: monospace;
            font-size: 1.1rem;
        }
        
        .tier-info strong {
            color: #495057;
        }
        
        .unit-price {
            font-size: 1.1rem;
        }
        
        .price-aed {
            color: #10b981;
            font-weight: 600;
        }
        
        .price-aed::before {
            content: "د.إ ";
        }
        
        .original-price {
            display: block;
            font-size: 0.8rem;
        }
        
        .savings-amount {
            font-weight: 600;
        }
        
        .pricing-tier-row:hover {
            background-color: #f1f3f4;
        }
        
        @media (max-width: 768px) {
            .nexus-bulk-pricing-table {
                padding: 15px;
            }
            
            .pricing-tiers-table {
                overflow-x: auto;
            }
            
            .pricing-tiers-table .table {
                min-width: 600px;
            }
        }
        </style>
        <?php
    }
    
    // Display bulk calculator widget
    public function display_bulk_calculator() {
        global $product;
        
        if (!$product || !$product->is_type('simple')) {
            return;
        }
        
        $base_price = $product->get_regular_price();
        if (!$base_price) {
            return;
        }
        
        ?>
        <div class="nexus-bulk-calculator">
            <h5 class="calculator-title">
                <i class="fas fa-calculator text-primary"></i>
                <?php _e('Bulk Pricing Calculator', 'nexus-techhub'); ?>
            </h5>
            
            <div class="calculator-form">
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <label for="bulk-quantity" class="form-label"><?php _e('Quantity', 'nexus-techhub'); ?></label>
                        <input type="number" 
                               id="bulk-quantity" 
                               class="form-control" 
                               min="1" 
                               value="1" 
                               data-base-price="<?php echo esc_attr($base_price); ?>"
                               data-product-id="<?php echo esc_attr($product->get_id()); ?>">
                    </div>
                    
                    <div class="col-md-8 mb-3">
                        <label class="form-label"><?php _e('Pricing Breakdown', 'nexus-techhub'); ?></label>
                        <div class="pricing-breakdown">
                            <div class="breakdown-item">
                                <span class="breakdown-label"><?php _e('Unit Price:', 'nexus-techhub'); ?></span>
                                <span class="breakdown-value" id="unit-price">د.إ <?php echo number_format($base_price, 2); ?></span>
                            </div>
                            <div class="breakdown-item">
                                <span class="breakdown-label"><?php _e('Discount:', 'nexus-techhub'); ?></span>
                                <span class="breakdown-value" id="discount-amount">د.إ 0.00</span>
                            </div>
                            <div class="breakdown-item">
                                <span class="breakdown-label"><?php _e('Subtotal:', 'nexus-techhub'); ?></span>
                                <span class="breakdown-value" id="subtotal">د.إ <?php echo number_format($base_price, 2); ?></span>
                            </div>
                            <div class="breakdown-item">
                                <span class="breakdown-label"><?php _e('UAE VAT (5%):', 'nexus-techhub'); ?></span>
                                <span class="breakdown-value" id="vat-amount">د.إ <?php echo number_format($base_price * 0.05, 2); ?></span>
                            </div>
                            <div class="breakdown-item total">
                                <span class="breakdown-label"><?php _e('Total:', 'nexus-techhub'); ?></span>
                                <span class="breakdown-value" id="total-price">د.إ <?php echo number_format($base_price * 1.05, 2); ?></span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="calculator-actions">
                    <button type="button" class="btn btn-success" id="add-bulk-to-cart">
                        <i class="fas fa-cart-plus mr-2"></i>
                        <?php _e('Add to Cart', 'nexus-techhub'); ?>
                    </button>
                    <button type="button" class="btn btn-outline-primary" id="request-quote">
                        <i class="fab fa-whatsapp mr-2"></i>
                        <?php _e('Request Quote via WhatsApp', 'nexus-techhub'); ?>
                    </button>
                </div>
                
                <div class="tier-indicator mt-3">
                    <div class="alert alert-success" id="current-tier" style="display: none;">
                        <strong id="tier-title"></strong>
                        <span id="tier-description"></span>
                    </div>
                </div>
            </div>
        </div>
        
        <style>
        .nexus-bulk-calculator {
            background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
            color: white;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .calculator-title {
            margin-bottom: 20px;
            color: white;
        }
        
        .form-label {
            color: white;
            font-weight: 500;
            margin-bottom: 5px;
        }
        
        .pricing-breakdown {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 6px;
            padding: 15px;
        }
        
        .breakdown-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        
        .breakdown-item.total {
            border-top: 1px solid rgba(255, 255, 255, 0.3);
            padding-top: 8px;
            margin-top: 8px;
            font-weight: 600;
            font-size: 1.1rem;
        }
        
        .breakdown-label {
            color: rgba(255, 255, 255, 0.9);
        }
        
        .breakdown-value {
            color: white;
            font-weight: 500;
        }
        
        .calculator-actions {
            margin-top: 20px;
        }
        
        .calculator-actions .btn {
            margin-right: 10px;
            margin-bottom: 10px;
        }
        
        #current-tier {
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
        }
        
        @media (max-width: 768px) {
            .nexus-bulk-calculator {
                padding: 15px;
            }
            
            .calculator-actions .btn {
                width: 100%;
                margin-right: 0;
            }
        }
        </style>
        <?php
    }
    
    // AJAX calculate bulk pricing
    public function ajax_calculate_bulk_pricing() {
        check_ajax_referer('nexus_bulk_nonce', 'nonce');
        
        $product_id = intval($_POST['product_id']);
        $quantity = intval($_POST['quantity']);
        
        $product = wc_get_product($product_id);
        if (!$product) {
            wp_send_json_error('Product not found');
        }
        
        $base_price = $product->get_regular_price();
        $tier = $this->get_pricing_tier($quantity);
        
        $unit_price = $base_price * (1 - $tier['discount_percentage'] / 100);
        $subtotal = $unit_price * $quantity;
        $discount_amount = ($base_price - $unit_price) * $quantity;
        $vat_amount = $subtotal * 0.05;
        $total = $subtotal + $vat_amount;
        
        $response = array(
            'unit_price' => number_format($unit_price, 2),
            'subtotal' => number_format($subtotal, 2),
            'discount_amount' => number_format($discount_amount, 2),
            'vat_amount' => number_format($vat_amount, 2),
            'total' => number_format($total, 2),
            'tier' => $tier,
            'savings_per_unit' => number_format($base_price - $unit_price, 2)
        );
        
        wp_send_json_success($response);
    }
    
    // Get pricing tier based on quantity
    private function get_pricing_tier($quantity) {
        foreach ($this->pricing_tiers as $tier_key => $tier) {
            if ($quantity >= $tier['min_quantity'] && $quantity <= $tier['max_quantity']) {
                return array_merge($tier, array('key' => $tier_key));
            }
        }
        
        return $this->pricing_tiers['individual'];
    }
    
    // Apply bulk pricing to product price
    public function apply_bulk_pricing($price, $product) {
        if (is_admin() || !is_object($product)) {
            return $price;
        }
        
        // Check if we're in cart context
        if (WC()->cart && !WC()->cart->is_empty()) {
            foreach (WC()->cart->get_cart() as $cart_item) {
                if ($cart_item['product_id'] == $product->get_id()) {
                    $quantity = $cart_item['quantity'];
                    $tier = $this->get_pricing_tier($quantity);
                    return $price * (1 - $tier['discount_percentage'] / 100);
                }
            }
        }
        
        return $price;
    }
    
    // Apply bulk discount to cart
    public function apply_bulk_discount_to_cart() {
        if (is_admin() && !defined('DOING_AJAX')) {
            return;
        }
        
        $total_discount = 0;
        
        foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
            $product = $cart_item['data'];
            $quantity = $cart_item['quantity'];
            $base_price = $product->get_regular_price();
            
            $tier = $this->get_pricing_tier($quantity);
            $discount_per_unit = $base_price * ($tier['discount_percentage'] / 100);
            $total_discount += $discount_per_unit * $quantity;
        }
        
        if ($total_discount > 0) {
            WC()->cart->add_fee(__('Bulk Discount', 'nexus-techhub'), -$total_discount);
        }
    }
    
    // Add bulk pricing fields to product admin
    public function add_bulk_pricing_fields() {
        global $post;
        
        echo '<div class="options_group">';
        
        woocommerce_wp_checkbox(array(
            'id' => '_enable_bulk_pricing',
            'label' => __('Enable Bulk Pricing', 'nexus-techhub'),
            'description' => __('Enable tiered pricing for this product', 'nexus-techhub')
        ));
        
        echo '</div>';
    }
    
    // Save bulk pricing fields
    public function save_bulk_pricing_fields($post_id) {
        $enable_bulk_pricing = isset($_POST['_enable_bulk_pricing']) ? 'yes' : 'no';
        update_post_meta($post_id, '_enable_bulk_pricing', $enable_bulk_pricing);
    }
    
    // Enqueue scripts
    public function enqueue_scripts() {
        if (is_product()) {
            wp_enqueue_script('nexus-bulk-calculator', get_template_directory_uri() . '/assets/js/bulk-calculator.js', array('jquery'), '1.0.0', true);
            wp_localize_script('nexus-bulk-calculator', 'nexus_bulk', array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('nexus_bulk_nonce'),
                'whatsapp_url' => 'https://wa.me/971585531029',
                'pricing_tiers' => $this->pricing_tiers
            ));
        }
    }
}

// Initialize bulk pricing calculator
new Nexus_Bulk_Pricing_Calculator();

?>
