const express = require('express');
const router = express.Router();
const { supabase } = require('../../lib/db');
const { isAuthenticated } = require('../../middleware/auth');
const { apiLimiter } = require('../../middleware/security');

// Get reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Get approved reviews with pagination using Supabase
    const { data: reviews, error: reviewsError, count: totalReviews } = await supabase
      .from('reviews')
      .select(`
        id,
        rating,
        title,
        comment,
        is_verified_purchase,
        created_at,
        users (
          first_name,
          last_name
        )
      `, { count: 'exact' })
      .eq('product_id', productId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (reviewsError) {
      console.error('Error fetching reviews:', reviewsError);
      return res.status(500).json({
        success: false,
        message: 'Error fetching reviews'
      });
    }

    const totalPages = Math.ceil(totalReviews / limit);

    // Get rating distribution using Supabase
    const { data: ratingStats, error: ratingError } = await supabase
      .from('reviews')
      .select('rating')
      .eq('product_id', productId)
      .eq('is_approved', true);

    if (ratingError) {
      console.error('Error fetching rating stats:', ratingError);
      return res.status(500).json({
        success: false,
        message: 'Error fetching rating statistics'
      });
    }

    // Calculate rating distribution
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let totalRating = 0;

    ratingStats.forEach(review => {
      distribution[review.rating] = (distribution[review.rating] || 0) + 1;
      totalRating += review.rating;
    });

    const averageRating = totalRating / ratingStats.length || 0;

    // Format reviews
    const formattedReviews = reviews.map(review => ({
      id: review.id,
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      is_verified_purchase: review.is_verified_purchase,
      created_at: review.created_at,
      first_name: review.users?.first_name,
      last_name: review.users?.last_name
    }));

    res.json({
      success: true,
      reviews: formattedReviews,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalReviews: totalReviews
      },
      ratings: {
        average: parseFloat(averageRating.toFixed(1)) || 0,
        distribution: distribution
      }
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews'
    });
  }
});

// Submit a review
router.post('/submit', isAuthenticated, apiLimiter, async (req, res) => {
  try {
    const { productId, rating, title, comment } = req.body;
    const userId = req.session.userId;

    if (!productId || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Invalid review data'
      });
    }

    // Check if product exists using Supabase
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id')
      .eq('id', productId)
      .single();

    if (productError || !product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if user has already reviewed this product using Supabase
    const { data: existingReview, error: existingError } = await supabase
      .from('reviews')
      .select('id')
      .eq('product_id', productId)
      .eq('user_id', userId)
      .single();

    if (existingError && existingError.code !== 'PGRST116') {
      console.error('Error checking existing review:', existingError);
      return res.status(500).json({
        success: false,
        message: 'Error checking existing review'
      });
    }

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product'
      });
    }

    // Check if user has purchased this product using Supabase
    const { data: purchaseData, error: purchaseError } = await supabase
      .from('order_items')
      .select(`
        id,
        orders (
          status
        )
      `)
      .eq('product_id', productId)
      .eq('orders.user_id', userId)
      .in('orders.status', ['delivered', 'completed']);

    if (purchaseError) {
      console.error('Error checking purchase:', purchaseError);
      return res.status(500).json({
        success: false,
        message: 'Error checking purchase history'
      });
    }

    const isVerifiedPurchase = purchaseData && purchaseData.length > 0;

    // Auto-approve verified purchases, otherwise require moderation
    const isApproved = isVerifiedPurchase;

    // Insert review using Supabase
    const { data: newReview, error: insertError } = await supabase
      .from('reviews')
      .insert({
        product_id: productId,
        user_id: userId,
        rating,
        title,
        comment,
        is_verified_purchase: isVerifiedPurchase,
        is_approved: isApproved
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('Error inserting review:', insertError);
      return res.status(500).json({
        success: false,
        message: 'Error submitting review'
      });
    }

    res.json({
      success: true,
      message: isApproved ? 'Review submitted successfully' : 'Review submitted and awaiting approval',
      reviewId: newReview.id
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting review'
    });
  }
});

// Get user's reviews
router.get('/user', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;

    // Get user's reviews using Supabase
    const { data: reviews, error: reviewsError } = await supabase
      .from('reviews')
      .select(`
        id,
        rating,
        title,
        comment,
        is_verified_purchase,
        is_approved,
        created_at,
        products (
          id,
          name,
          slug,
          image_url
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (reviewsError) {
      console.error('Error fetching user reviews:', reviewsError);
      return res.status(500).json({
        success: false,
        message: 'Error fetching user reviews'
      });
    }

    // Format reviews
    const formattedReviews = reviews.map(review => ({
      id: review.id,
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      is_verified_purchase: review.is_verified_purchase,
      is_approved: review.is_approved,
      created_at: review.created_at,
      product_id: review.products?.id,
      product_name: review.products?.name,
      product_slug: review.products?.slug,
      image_url: review.products?.image_url
    }));

    res.json({
      success: true,
      reviews: formattedReviews
    });
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user reviews'
    });
  }
});

// Delete a review
router.delete('/:reviewId', isAuthenticated, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.session.userId;

    // Check if review exists and belongs to the user using Supabase
    const { data: existingReview, error: findError } = await supabase
      .from('reviews')
      .select('id')
      .eq('id', reviewId)
      .eq('user_id', userId)
      .single();

    if (findError && findError.code !== 'PGRST116') {
      console.error('Error finding review:', findError);
      return res.status(500).json({
        success: false,
        message: 'Error deleting review'
      });
    }

    if (!existingReview) {
      return res.status(404).json({
        success: false,
        message: 'Review not found or you do not have permission to delete it'
      });
    }

    // Delete review using Supabase
    const { error: deleteError } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);

    if (deleteError) {
      console.error('Error deleting review:', deleteError);
      return res.status(500).json({
        success: false,
        message: 'Error deleting review'
      });
    }

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting review'
    });
  }
});

module.exports = router;
