# WordPress Integration Guide for Vite Assets

This guide shows you how to integrate your Vite-built assets into a WordPress theme.

## 📁 File Structure

After building with Vite, your assets are located in the `dest/` directory:

```
dest/
├── assets/
│   ├── app-CZJnCuL7.css          # Main CSS bundle
│   └── frontpage-Xdus8ASz.css    # Frontpage-specific CSS
├── js/
│   ├── main-Ck0ks7cy.js          # Main JavaScript bundle
│   ├── frontpage-BNtHG3qD.js     # Frontpage-specific JavaScript
│   ├── app-legacy-DSl9aINy.js    # Legacy JavaScript for older browsers
│   └── polyfills-legacy-DfYQpNA6.js # Polyfills for legacy browsers
├── fonts/                        # Font files
├── images/                       # Image files
└── index.html                    # Generated HTML (not needed for WordPress)
```

## 🚀 Quick Start

### Step 1: Copy Assets to Your WordPress Theme

1. Copy the contents of the `dest/` folder to your WordPress theme directory:
   ```bash
   cp -r dest/* /path/to/your/wordpress/wp-content/themes/your-theme/assets/
   ```

2. Your theme structure should look like this:
   ```
   your-theme/
   ├── assets/
   │   ├── app-CZJnCuL7.css
   │   ├── frontpage-Xdus8ASz.css
   │   └── js/
   │       ├── main-Ck0ks7cy.js
   │       ├── frontpage-BNtHG3qD.js
   │       ├── app-legacy-DSl9aINy.js
   │       └── polyfills-legacy-DfYQpNA6.js
   ├── functions.php
   ├── header.php
   ├── footer.php
   └── ...
   ```

### Step 2: Add Integration Code to functions.php

Copy the code from `wordpress-simple-integration.php` into your theme's `functions.php` file:

```php
<?php
// Add this to your theme's functions.php

function enqueue_vite_assets() {
    $theme_url = get_template_directory_uri();
    $assets_path = $theme_url . '/assets/';
    
    $is_front_page = is_front_page() || is_home();
    
    // Enqueue main CSS
    wp_enqueue_style(
        'vite-main-css',
        $assets_path . 'app-CZJnCuL7.css',
        array(),
        '1.0.0'
    );
    
    // Enqueue frontpage CSS only on front page
    if ($is_front_page) {
        wp_enqueue_style(
            'vite-frontpage-css',
            $assets_path . 'frontpage-Xdus8ASz.css',
            array('vite-main-css'),
            '1.0.0'
        );
    }
    
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
        $assets_path . 'js/polyfills-legacy-DfYQpNA6.js',
        array(),
        '1.0.0',
        true
    );
}

add_action('wp_enqueue_scripts', 'enqueue_vite_assets');
?>
```

### Step 3: Update Your Theme Templates

Make sure your theme's `header.php` and `footer.php` include the proper WordPress hooks:

**header.php:**
```php
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
```

**footer.php:**
```php
    <?php wp_footer(); ?>
</body>
</html>
```

## 🔄 Updating Assets

When you rebuild your assets with Vite, the filenames will change due to content hashing. You have two options:

### Option 1: Manual Update (Simple)
After each build, update the filenames in your `functions.php` file to match the new generated files.

### Option 2: Dynamic Loading (Advanced)
Use the dynamic loading approach from `wordpress-integration-example.php` which automatically detects the latest built files.

## 🎯 Conditional Loading

The integration code automatically handles conditional loading:

- **Main CSS/JS**: Loaded on all pages
- **Frontpage CSS/JS**: Only loaded on the front page and home page
- **Legacy JS**: Loaded for older browser compatibility
- **Polyfills**: Loaded for browser feature support

## 🚀 Performance Optimization

### Enable Preload Hints (Optional)
Uncomment this line in your `functions.php` to enable preload hints:

```php
add_action('wp_head', 'add_vite_preload_hints', 1);
```

### Add Critical CSS (Optional)
For better performance, you can inline critical CSS above the fold:

```php
function add_vite_critical_css() {
    $critical_css = '
        /* Add your critical CSS here */
        body { margin: 0; padding: 0; }
        .header { /* your header styles */ }
    ';
    
    echo '<style id="vite-critical-css">' . $critical_css . '</style>';
}
add_action('wp_head', 'add_vite_critical_css', 2);
```

## 🔧 Development vs Production

For development, you might want to load assets from the Vite dev server:

```php
function enqueue_vite_assets_environment_aware() {
    $is_dev = defined('WP_DEBUG') && WP_DEBUG;
    
    if ($is_dev) {
        // Load from Vite dev server
        wp_enqueue_script('vite-dev', 'http://localhost:3000/main.js', array(), null, true);
    } else {
        // Load built assets
        enqueue_vite_assets();
    }
}
```

## 📝 Troubleshooting

### Assets Not Loading
1. Check that the file paths in `functions.php` match your actual file structure
2. Verify that the assets are copied to the correct theme directory
3. Check browser console for 404 errors

### CSS Not Applying
1. Make sure the CSS files are being enqueued (check page source)
2. Verify that your theme's CSS isn't overriding the Vite styles
3. Check for CSS specificity issues

### JavaScript Not Working
1. Check browser console for JavaScript errors
2. Verify that scripts are loading in the correct order
3. Make sure jQuery dependencies are available if needed

### Legacy Browser Issues
1. Ensure legacy JavaScript files are being loaded
2. Check that polyfills are included
3. Test in older browsers to verify compatibility

## 🎉 Success!

Once integrated, your WordPress theme will use the modern Vite-built assets with:
- ✅ Optimized CSS and JavaScript bundles
- ✅ Legacy browser support
- ✅ Conditional loading for different pages
- ✅ Performance optimizations
- ✅ Modern development workflow

## 📚 Additional Resources

- [WordPress wp_enqueue_style() Documentation](https://developer.wordpress.org/reference/functions/wp_enqueue_style/)
- [WordPress wp_enqueue_script() Documentation](https://developer.wordpress.org/reference/functions/wp_enqueue_script/)
- [Vite Documentation](https://vitejs.dev/) 