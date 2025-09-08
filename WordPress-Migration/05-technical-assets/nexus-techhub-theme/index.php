<?php
/**
 * The main template file
 * 
 * @package NexusTechHub
 */

get_header(); ?>

<main id="main" class="site-main">
    <div class="container">
        
        <?php if (is_home() && !is_front_page()) : ?>
            <header class="page-header">
                <h1 class="page-title"><?php single_post_title(); ?></h1>
            </header>
        <?php endif; ?>

        <div class="row">
            <div class="col-lg-8">
                
                <?php if (have_posts()) : ?>
                    
                    <div class="posts-grid">
                        <?php while (have_posts()) : the_post(); ?>
                            
                            <article id="post-<?php the_ID(); ?>" <?php post_class('card mb-4'); ?>>
                                
                                <?php if (has_post_thumbnail()) : ?>
                                    <div class="card-image">
                                        <a href="<?php the_permalink(); ?>">
                                            <?php the_post_thumbnail('large', array('class' => 'img-fluid')); ?>
                                        </a>
                                    </div>
                                <?php endif; ?>
                                
                                <div class="card-body">
                                    <header class="entry-header">
                                        <?php
                                        if (is_singular()) :
                                            the_title('<h1 class="entry-title">', '</h1>');
                                        else :
                                            the_title('<h2 class="entry-title"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h2>');
                                        endif;
                                        ?>
                                        
                                        <div class="entry-meta text-muted">
                                            <span class="posted-on">
                                                <i class="far fa-calendar"></i>
                                                <time datetime="<?php echo get_the_date('c'); ?>">
                                                    <?php echo get_the_date(); ?>
                                                </time>
                                            </span>
                                            
                                            <span class="byline">
                                                <i class="far fa-user"></i>
                                                <a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>">
                                                    <?php the_author(); ?>
                                                </a>
                                            </span>
                                            
                                            <?php if (has_category()) : ?>
                                                <span class="cat-links">
                                                    <i class="far fa-folder"></i>
                                                    <?php the_category(', '); ?>
                                                </span>
                                            <?php endif; ?>
                                        </div>
                                    </header>
                                    
                                    <div class="entry-content">
                                        <?php
                                        if (is_singular()) :
                                            the_content();
                                        else :
                                            the_excerpt();
                                        endif;
                                        ?>
                                    </div>
                                    
                                    <?php if (!is_singular()) : ?>
                                        <div class="entry-footer">
                                            <a href="<?php the_permalink(); ?>" class="btn btn-primary">
                                                <?php _e('Read More', 'nexus-techhub'); ?>
                                                <i class="fas fa-arrow-right ml-2"></i>
                                            </a>
                                        </div>
                                    <?php endif; ?>
                                </div>
                                
                            </article>
                            
                        <?php endwhile; ?>
                    </div>
                    
                    <?php
                    // Pagination
                    the_posts_pagination(array(
                        'mid_size' => 2,
                        'prev_text' => '<i class="fas fa-chevron-left"></i> ' . __('Previous', 'nexus-techhub'),
                        'next_text' => __('Next', 'nexus-techhub') . ' <i class="fas fa-chevron-right"></i>',
                        'class' => 'pagination-wrapper'
                    ));
                    ?>
                    
                <?php else : ?>
                    
                    <div class="no-posts-found text-center py-5">
                        <h2><?php _e('Nothing Found', 'nexus-techhub'); ?></h2>
                        <p class="text-muted">
                            <?php _e('It seems we can\'t find what you\'re looking for. Perhaps searching can help.', 'nexus-techhub'); ?>
                        </p>
                        <?php get_search_form(); ?>
                    </div>
                    
                <?php endif; ?>
                
            </div>
            
            <div class="col-lg-4">
                <?php get_sidebar(); ?>
            </div>
            
        </div>
        
    </div>
</main>

<?php get_footer(); ?>
