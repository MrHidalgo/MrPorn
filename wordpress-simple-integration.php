<?php
/**
 * Simple WordPress Integration for Vite Assets
 * 
 * Copy this code into your theme's functions.php file
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Enqueue Vite-built assets
 */
function enqueue_vite_assets() {
    // Get theme directory URL
    $theme_url = get_template_directory_uri();
    
    // Define asset paths - adjust this path to match your theme structure
    $assets_path = $theme_url . '/assets/';
    
    // Check if we're on the front page or home page
    $is_front_page = is_front_page() || is_home();
    
    // Load main CSS
    wp_enqueue_style('vite-main-css', $assets_path . 'css/app-P_zzMeNC.css');

    // Load page-specific CSS based on current page
    if (is_page('porn-deals')) {
        wp_enqueue_style('vite-porn-deals-css', $assets_path . 'css/porn-deals-r-8MGJhs.css');
    } elseif (is_page('pornstars')) {
        wp_enqueue_style('vite-pornstars-css', $assets_path . 'css/pornstars-CMnF2Rz8.css');
    } elseif (is_front_page()) {
        wp_enqueue_style('vite-frontpage-css', $assets_path . 'css/frontpage-Daco7TDc.css');
    }
    // ... and so on for each page type
    
    // Enqueue main JavaScript
    wp_enqueue_script(
        'vite-main-js',
        $assets_path . 'js/main-Ck0ks7cy.js',
        array(),
        '1.0.0',
        true // Load in footer
    );
    
    // Enqueue frontpage JavaScript only on front page
    if ($is_front_page) {
        wp_enqueue_script(
            'vite-frontpage-js',
            $assets_path . 'js/frontpage-BNtHG3qD.js',
            array('vite-main-js'),
            '1.0.0',
            true
        );
    }
    
    // Enqueue legacy JavaScript for older browsers
    wp_enqueue_script(
        'vite-legacy-js',
        $assets_path . 'js/app-legacy-DSl9aINy.js',
        array(),
        '1.0.0',
        true
    );
    
    // Enqueue polyfills
    wp_enqueue_script(
        'vite-polyfills',
        $assets_path . 'c',
        array(),
        '1.0.0',
        true
    );
}

// Hook the function to WordPress
add_action('wp_enqueue_scripts', 'enqueue_vite_assets');

/**
 * Optional: Add preload hints for better performance
 */
function add_vite_preload_hints() {
    $theme_url = get_template_directory_uri();
    $assets_path = $theme_url . '/assets/';
    
    // Preload main CSS
    echo '<link rel="preload" href="' . $assets_path . 'app-CZJnCuL7.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">';
    
    // Preload main JS
    echo '<link rel="preload" href="' . $assets_path . 'js/main-Ck0ks7cy.js" as="script">';
    
    // Preload frontpage assets if on front page
    if (is_front_page() || is_home()) {
        echo '<link rel="preload" href="' . $assets_path . 'frontpage-Xdus8ASz.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">';
        echo '<link rel="preload" href="' . $assets_path . 'js/frontpage-BNtHG3qD.js" as="script">';
    }
}

// Uncomment the line below to enable preload hints
// add_action('wp_head', 'add_vite_preload_hints', 1);
?> 