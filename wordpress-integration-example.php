<?php
/**
 * WordPress Theme Integration Example
 * 
 * This file shows how to properly integrate Vite-built assets into a WordPress theme.
 * Copy the relevant functions into your theme's functions.php file.
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Enqueue Vite-built assets for WordPress
 */
function enqueue_vite_assets() {
    $theme_url = get_template_directory_uri();
    $assets_path = $theme_url . '/assets/';
    
    $is_front_page = is_front_page() || is_home();
    
    // Main CSS
    wp_enqueue_style('vite-main-css', $assets_path . 'app-CZJnCuL7.css', array(), '1.0.0');
    
    // Frontpage CSS (only on front page)
    if ($is_front_page) {
        wp_enqueue_style('vite-frontpage-css', $assets_path . 'frontpage-Xdus8ASz.css', array('vite-main-css'), '1.0.0');
    }
    
    // Main JavaScript
    wp_enqueue_script('vite-main-js', $assets_path . 'js/main-Ck0ks7cy.js', array(), '1.0.0', true);
    
    // Frontpage JavaScript (only on front page)
    if ($is_front_page) {
        wp_enqueue_script('vite-frontpage-js', $assets_path . 'js/frontpage-BNtHG3qD.js', array('vite-main-js'), '1.0.0', true);
    }
    
    // Legacy JavaScript for older browsers
    wp_enqueue_script('vite-legacy-js', $assets_path . 'js/app-legacy-DSl9aINy.js', array(), '1.0.0', true);
    wp_enqueue_script('vite-polyfills', $assets_path . 'js/polyfills-legacy-DfYQpNA6.js', array(), '1.0.0', true);
}

add_action('wp_enqueue_scripts', 'enqueue_vite_assets');

/**
 * Alternative: Dynamic asset loading with version control
 * This approach automatically detects the latest built files
 */
function enqueue_vite_assets_dynamic() {
    $theme_url = get_template_directory_uri();
    $assets_path = $theme_url . '/assets/';
    
    // Get current page type
    $is_front_page = is_front_page();
    $is_home = is_home();
    
    // Function to get the latest CSS file
    function get_latest_css_file($pattern) {
        $theme_dir = get_template_directory();
        $files = glob($theme_dir . '/assets/' . $pattern);
        if (!empty($files)) {
            $latest_file = basename(end($files));
            return $latest_file;
        }
        return false;
    }
    
    // Function to get the latest JS file
    function get_latest_js_file($pattern) {
        $theme_dir = get_template_directory();
        $files = glob($theme_dir . '/assets/js/' . $pattern);
        if (!empty($files)) {
            $latest_file = basename(end($files));
            return $latest_file;
        }
        return false;
    }
    
    // Get latest CSS files
    $main_css = get_latest_css_file('app-*.css');
    $frontpage_css = get_latest_css_file('frontpage-*.css');
    
    // Get latest JS files
    $main_js = get_latest_js_file('main-*.js');
    $frontpage_js = get_latest_js_file('frontpage-*.js');
    $legacy_js = get_latest_js_file('app-legacy-*.js');
    $polyfills_js = get_latest_js_file('polyfills-legacy-*.js');
    
    // Enqueue main CSS
    if ($main_css) {
        wp_enqueue_style(
            'vite-main-css',
            $assets_path . $main_css,
            array(),
            filemtime(get_template_directory() . '/assets/' . $main_css),
            'all'
        );
    }
    
    // Enqueue frontpage CSS
    if ($frontpage_css && ($is_front_page || $is_home)) {
        wp_enqueue_style(
            'vite-frontpage-css',
            $assets_path . $frontpage_css,
            array('vite-main-css'),
            filemtime(get_template_directory() . '/assets/' . $frontpage_css),
            'all'
        );
    }
    
    // Enqueue main JS
    if ($main_js) {
        wp_enqueue_script(
            'vite-main-js',
            $assets_path . 'js/' . $main_js,
            array(),
            filemtime(get_template_directory() . '/assets/js/' . $main_js),
            true
        );
    }
    
    // Enqueue frontpage JS
    if ($frontpage_js && ($is_front_page || $is_home)) {
        wp_enqueue_script(
            'vite-frontpage-js',
            $assets_path . 'js/' . $frontpage_js,
            array('vite-main-js'),
            filemtime(get_template_directory() . '/assets/js/' . $frontpage_js),
            true
        );
    }
    
    // Enqueue legacy JS
    if ($legacy_js) {
        wp_enqueue_script(
            'vite-legacy-js',
            $assets_path . 'js/' . $legacy_js,
            array(),
            filemtime(get_template_directory() . '/assets/js/' . $legacy_js),
            true
        );
    }
    
    // Enqueue polyfills
    if ($polyfills_js) {
        wp_enqueue_script(
            'vite-polyfills',
            $assets_path . 'js/' . $polyfills_js,
            array(),
            filemtime(get_template_directory() . '/assets/js/' . $polyfills_js),
            true
        );
    }
}

/**
 * Add preload hints for critical assets
 */
function add_vite_preload_hints() {
    $theme_url = get_template_directory_uri();
    $assets_path = $theme_url . '/assets/';
    
    // Preload critical CSS
    echo '<link rel="preload" href="' . $assets_path . 'app-CZJnCuL7.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">';
    
    // Preload critical JS
    echo '<link rel="preload" href="' . $assets_path . 'js/main-Ck0ks7cy.js" as="script">';
    
    // Preload frontpage assets if on front page
    if (is_front_page() || is_home()) {
        echo '<link rel="preload" href="' . $assets_path . 'frontpage-Xdus8ASz.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">';
        echo '<link rel="preload" href="' . $assets_path . 'js/frontpage-BNtHG3qD.js" as="script">';
    }
}
add_action('wp_head', 'add_vite_preload_hints', 1);

/**
 * Add inline critical CSS (optional - for above-the-fold styles)
 */
function add_vite_critical_css() {
    // You can inline critical CSS here for better performance
    $critical_css = '
        /* Add your critical CSS here */
        body { margin: 0; padding: 0; }
        .header { /* your header styles */ }
    ';
    
    echo '<style id="vite-critical-css">' . $critical_css . '</style>';
}
// Uncomment the line below if you want to add critical CSS
// add_action('wp_head', 'add_vite_critical_css', 2);

/**
 * Example: How to use in your theme's header.php
 */
function example_header_integration() {
    ?>
    <!DOCTYPE html>
    <html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo('charset'); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <?php wp_head(); ?>
    </head>
    <body <?php body_class(); ?>>
        <header class="header">
            <!-- Your header content -->
        </header>
    <?php
}

/**
 * Example: How to use in your theme's footer.php
 */
function example_footer_integration() {
    ?>
        <footer class="footer">
            <!-- Your footer content -->
        </footer>
        <?php wp_footer(); ?>
    </body>
    </html>
    <?php
}

/**
 * Development vs Production asset loading
 */
function enqueue_vite_assets_environment_aware() {
    // Check if we're in development mode
    $is_dev = defined('WP_DEBUG') && WP_DEBUG;
    
    if ($is_dev) {
        // In development, you might want to load from Vite dev server
        wp_enqueue_script('vite-dev', 'http://localhost:3000/main.js', array(), null, true);
    } else {
        // In production, load built assets
        enqueue_vite_assets();
    }
}

/**
 * Add asset versioning for cache busting
 */
function get_vite_asset_version($file_path) {
    $theme_dir = get_template_directory();
    $full_path = $theme_dir . $file_path;
    
    if (file_exists($full_path)) {
        return filemtime($full_path);
    }
    
    return '1.0.0';
}

/**
 * Example usage in your theme's functions.php:
 * 
 * // Choose one of these approaches:
 * 
 * // 1. Simple static approach (use this if you know the exact filenames)
 * add_action('wp_enqueue_scripts', 'enqueue_vite_assets');
 * 
 * // 2. Dynamic approach (automatically finds latest built files)
 * add_action('wp_enqueue_scripts', 'enqueue_vite_assets_dynamic');
 * 
 * // 3. Environment-aware approach (different for dev/prod)
 * add_action('wp_enqueue_scripts', 'enqueue_vite_assets_environment_aware');
 */
?> 