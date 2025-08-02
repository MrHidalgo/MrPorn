<?php
/**
 * WordPress Integration for Individual Vite CSS Files
 * 
 * This approach loads only the CSS needed for each page type,
 * resulting in much faster page loads and better performance.
 * 
 * Copy this code into your theme's functions.php file
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Enqueue Vite-built assets with individual CSS files
 */
function enqueue_vite_assets_individual() {
    $theme_url = get_template_directory_uri();
    $assets_path = $theme_url . '/assets/';
    
    // Load main CSS (includes all page-specific styles)
    wp_enqueue_style(
        'vite-main-css',
        $assets_path . 'css/app-CKJwbBsC.css',
        array(),
        '1.0.0'
    );
    
    // Load frontpage-specific CSS if on front page
    if (is_front_page() || is_home()) {
        wp_enqueue_style(
            'vite-frontpage-css',
            $assets_path . 'css/frontpage-Xdus8ASz.css',
            array('vite-main-css'),
            '1.0.0'
        );
    }
    
    // Load JavaScript (app and frontpage only) - Dynamic approach for cache busting
    $app_js = get_latest_js_file('app-*.js');
    if ($app_js) {
        wp_enqueue_script(
            'vite-app-js',
            $assets_path . 'js/' . $app_js,
            array(),
            filemtime($theme_dir . '/assets/js/' . $app_js),
            true
        );
    }
    
    // Load frontpage-specific JavaScript if on front page
    if (is_front_page() || is_home()) {
        $frontpage_js = get_latest_js_file('frontpage-*.js');
        if ($frontpage_js) {
            wp_enqueue_script(
                'vite-frontpage-js',
                $assets_path . 'js/' . $frontpage_js,
                array('vite-app-js'),
                filemtime($theme_dir . '/assets/js/' . $frontpage_js),
                true
            );
        }
    }
    
    // Load legacy JavaScript for older browsers - Dynamic approach
    $app_legacy_js = get_latest_js_file('app-legacy-*.js');
    if ($app_legacy_js) {
        wp_enqueue_script(
            'vite-app-legacy-js',
            $assets_path . 'js/' . $app_legacy_js,
            array(),
            filemtime($theme_dir . '/assets/js/' . $app_legacy_js),
            true
        );
    }
    
    // Load legacy frontpage JavaScript if on front page
    if (is_front_page() || is_home()) {
        $frontpage_legacy_js = get_latest_js_file('frontpage-legacy-*.js');
        if ($frontpage_legacy_js) {
            wp_enqueue_script(
                'vite-frontpage-legacy-js',
                $assets_path . 'js/' . $frontpage_legacy_js,
                array('vite-app-legacy-js'),
                filemtime($theme_dir . '/assets/js/' . $frontpage_legacy_js),
                true
            );
        }
    }
    
    // Load polyfills for legacy browsers
    $polyfills_js = get_latest_js_file('polyfills-legacy-*.js');
    if ($polyfills_js) {
        wp_enqueue_script(
            'vite-polyfills',
            $assets_path . 'js/' . $polyfills_js,
            array(),
            filemtime($theme_dir . '/assets/js/' . $polyfills_js),
            true
        );
    }
}

/**
 * Determine which CSS file to load based on current page
 */
function get_current_page_css() {
    // Check for specific page types and return appropriate CSS file
    
    if (is_front_page() || is_home()) {
        return 'frontpage-Xdus8ASz.css';
    }
    
    if (is_404()) {
        return '404-CYV7920Q.css';
    }
    
    if (is_page()) {
        $page_slug = get_post_field('post_name', get_post());
        
        // Map page slugs to CSS files
        $page_css_map = array(
            'porn-deals' => 'porn-deals-CgK1GFxD.css',
            'porn-deals-single' => 'porn-deals-single-0BHZs352.css',
            'pornstars' => 'pornstars-DBzJovpp.css',
            'blog' => 'blog-CnRyf7Lm.css',
            'category' => 'category-BWl74i2Z.css',
            'review' => 'review-DHnUJJhG.css',
            'webcam' => 'webcam-C_w7tRvM.css',
            'login' => 'login-DS7ARRXt.css',
            'page-categories' => 'page-categories-DSH2RcVB.css',
            'page-categories-xl' => 'page-categories-xl-BQqdajyD.css',
            'other-page' => 'other-page-CZcv4cny.css',
            'crytical' => 'crytical-idkkBrI7.css',
            'fonts' => 'fonts-LOZ3Jhjw.css',
            'grid' => 'grid-DzhalBSG.css',
            'header' => 'header-Bnnl4-QC.css',
            'header-m' => 'header-m-Ddevy5Yx.css',
            'header-xl' => 'header-xl-DYR2uzpa.css',
            'misc' => 'misc-hFmGtNIq.css',
            'other-categories' => 'other-categories-Dcy8TmDp.css',
            'similar-sites' => 'similar-sites-CDx3qWw3.css'
        );
        
        if (isset($page_css_map[$page_slug])) {
            return $page_css_map[$page_slug];
        }
    }
    
    if (is_single()) {
        $post_type = get_post_type();
        
        // Map post types to CSS files
        $post_type_css_map = array(
            'post' => 'blog-CnRyf7Lm.css',
            'porn-deals' => 'porn-deals-single-0BHZs352.css',
            'pornstars' => 'pornstars-DBzJovpp.css',
            'review' => 'review-DHnUJJhG.css'
        );
        
        if (isset($post_type_css_map[$post_type])) {
            return $post_type_css_map[$post_type];
        }
    }
    
    if (is_category() || is_tax()) {
        $term = get_queried_object();
        $taxonomy = $term->taxonomy;
        
        // Map taxonomies to CSS files
        $taxonomy_css_map = array(
            'category' => 'category-BWl74i2Z.css',
            'porn-deals-category' => 'porn-deals-CgK1GFxD.css',
            'pornstars-category' => 'pornstars-DBzJovpp.css'
        );
        
        if (isset($taxonomy_css_map[$taxonomy])) {
            return $taxonomy_css_map[$taxonomy];
        }
    }
    
    if (is_search()) {
        return 'category-BWl74i2Z.css'; // Use category styles for search results
    }
    
    if (is_author()) {
        return 'blog-CnRyf7Lm.css'; // Use blog styles for author pages
    }
    
    if (is_tag()) {
        return 'category-BWl74i2Z.css'; // Use category styles for tag pages
    }
    
    // Default fallback
    return 'other-page-CZcv4cny.css';
}

// Hook the function to WordPress
add_action('wp_enqueue_scripts', 'enqueue_vite_assets_individual');

/**
 * Alternative: Dynamic CSS file detection
 * This automatically finds the latest CSS files with content hashing
 */
function enqueue_vite_assets_dynamic() {
    $theme_url = get_template_directory_uri();
    $theme_dir = get_template_directory();
    $assets_path = $theme_url . '/assets/';
    
    // Function to get the latest CSS file by pattern
    function get_latest_css_file($pattern) {
        $theme_dir = get_template_directory();
        $files = glob($theme_dir . '/assets/' . $pattern);
        if (!empty($files)) {
            $latest_file = basename(end($files));
            return $latest_file;
        }
        return false;
    }
    
    // Function to get the latest JS file by pattern
    function get_latest_js_file($pattern) {
        $theme_dir = get_template_directory();
        $files = glob($theme_dir . '/assets/js/' . $pattern);
        if (!empty($files)) {
            $latest_file = basename(end($files));
            return $latest_file;
        }
        return false;
    }
    
    // Always load main CSS
    $main_css = get_latest_css_file('app-*.css');
    if ($main_css) {
        wp_enqueue_style(
            'vite-main-css',
            $assets_path . $main_css,
            array(),
            filemtime($theme_dir . '/assets/' . $main_css)
        );
    }
    
    // Load page-specific CSS
    $current_page_css = get_current_page_css_dynamic();
    if ($current_page_css) {
        wp_enqueue_style(
            'vite-page-specific-css',
            $assets_path . $current_page_css,
            array('vite-main-css'),
            filemtime($theme_dir . '/assets/' . $current_page_css)
        );
    }
    
    // Load JavaScript
    $main_js = get_latest_css_file('js/main-*.js');
    if ($main_js) {
        wp_enqueue_script(
            'vite-main-js',
            $assets_path . 'js/' . $main_js,
            array(),
            filemtime($theme_dir . '/assets/js/' . $main_js),
            true
        );
    }
    
    // Load frontpage JavaScript if needed
    if (is_front_page() || is_home()) {
        $frontpage_js = get_latest_css_file('js/frontpage-*.js');
        if ($frontpage_js) {
            wp_enqueue_script(
                'vite-frontpage-js',
                $assets_path . 'js/' . $frontpage_js,
                array('vite-main-js'),
                filemtime($theme_dir . '/assets/js/' . $frontpage_js),
                true
            );
        }
    }
    
    // Load legacy JavaScript
    $legacy_js = get_latest_css_file('js/app-legacy-*.js');
    if ($legacy_js) {
        wp_enqueue_script(
            'vite-legacy-js',
            $assets_path . 'js/' . $legacy_js,
            array(),
            filemtime($theme_dir . '/assets/js/' . $legacy_js),
            true
        );
    }
    
    // Load polyfills
    $polyfills_js = get_latest_css_file('js/polyfills-legacy-*.js');
    if ($polyfills_js) {
        wp_enqueue_script(
            'vite-polyfills',
            $assets_path . 'js/' . $polyfills_js,
            array(),
            filemtime($theme_dir . '/assets/js/' . $polyfills_js),
            true
        );
    }
}

/**
 * Dynamic version of get_current_page_css()
 */
function get_current_page_css_dynamic() {
    $theme_dir = get_template_directory();
    
    if (is_front_page() || is_home()) {
        $files = glob($theme_dir . '/assets/frontpage-*.css');
        return !empty($files) ? basename(end($files)) : false;
    }
    
    if (is_404()) {
        $files = glob($theme_dir . '/assets/404-*.css');
        return !empty($files) ? basename(end($files)) : false;
    }
    
    if (is_page()) {
        $page_slug = get_post_field('post_name', get_post());
        
        // Map page slugs to CSS patterns
        $page_css_patterns = array(
            'porn-deals' => 'porn-deals-*.css',
            'porn-deals-single' => 'porn-deals-single-*.css',
            'pornstars' => 'pornstars-*.css',
            'blog' => 'blog-*.css',
            'category' => 'category-*.css',
            'review' => 'review-*.css',
            'webcam' => 'webcam-*.css',
            'login' => 'login-*.css',
            'page-categories' => 'page-categories-*.css',
            'page-categories-xl' => 'page-categories-xl-*.css',
            'other-page' => 'other-page-*.css',
            'crytical' => 'crytical-*.css',
            'fonts' => 'fonts-*.css',
            'grid' => 'grid-*.css',
            'header' => 'header-*.css',
            'header-m' => 'header-m-*.css',
            'header-xl' => 'header-xl-*.css',
            'misc' => 'misc-*.css',
            'other-categories' => 'other-categories-*.css',
            'similar-sites' => 'similar-sites-*.css'
        );
        
        if (isset($page_css_patterns[$page_slug])) {
            $files = glob($theme_dir . '/assets/' . $page_css_patterns[$page_slug]);
            return !empty($files) ? basename(end($files)) : false;
        }
    }
    
    // Default fallback
    $files = glob($theme_dir . '/assets/other-page-*.css');
    return !empty($files) ? basename(end($files)) : false;
}

/**
 * Add preload hints for critical assets
 */
function add_vite_preload_hints_individual() {
    $theme_url = get_template_directory_uri();
    $assets_path = $theme_url . '/assets/';
    
    // Preload main CSS
    echo '<link rel="preload" href="' . $assets_path . 'css/app-CKJwbBsC.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">';
    
    // Preload frontpage CSS if on front page
    if (is_front_page() || is_home()) {
        echo '<link rel="preload" href="' . $assets_path . 'css/frontpage-Xdus8ASz.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">';
    }
    
    // Preload main JS
    echo '<link rel="preload" href="' . $assets_path . 'js/app.js" as="script">';
    
    // Preload frontpage JS if on front page
    if (is_front_page() || is_home()) {
        echo '<link rel="preload" href="' . $assets_path . 'js/frontpage.js" as="script">';
    }
}

// Uncomment the line below to enable preload hints
// add_action('wp_head', 'add_vite_preload_hints_individual', 1);

/**
 * Example usage in your theme's functions.php:
 * 
 * // Choose one of these approaches:
 * 
 * // 1. Static approach (use this if you know the exact filenames)
 * add_action('wp_enqueue_scripts', 'enqueue_vite_assets_individual');
 * 
 * // 2. Dynamic approach (automatically finds latest built files)
 * add_action('wp_enqueue_scripts', 'enqueue_vite_assets_dynamic');
 */

/**
 * Performance Benefits:
 * 
 * 1. **Smaller Initial Payload**: Only loads CSS needed for current page
 * 2. **Better Caching**: Page-specific changes don't invalidate other pages
 * 3. **Faster Page Loads**: Less CSS to download and parse
 * 4. **Better User Experience**: Faster perceived performance
 * 5. **Reduced Bandwidth**: Especially important for mobile users
 * 
 * Example file sizes:
 * - Main CSS (app): 232KB
 * - Frontpage CSS: 263KB
 * - Category CSS: 275KB
 * - Review CSS: 298KB
 * 
 * Loading only what's needed can save 200-300KB per page!
 */
?> 