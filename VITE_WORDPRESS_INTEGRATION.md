# Vite WordPress Integration Guide

## Overview

This document explains how the Vite-generated assets are integrated into the WordPress theme, replacing the old Gulp-based asset loading system.

## File Structure

### Vite Build Output
```
/dest/
  /css/
    - app-CZJnCuL7.css (main app styles)
    - frontpage-Xdus8ASz.css (frontpage-specific styles)
    - category-BWl74i2Z.css (category page styles)
    - review-BlOp-XLX.css (single site review styles)
    - blog-CnRyf7Lm.css (blog styles)
    - pornstars-DBzJovpp.css (pornstars styles)
    - webcam-C_w7tRvM.css (webcam styles)
    - porn-deals-CgK1GFxD.css (coupon archive styles)
    - porn-deals-single-0BHZs352.css (single coupon styles)
    - login-DS7ARRXt.css (login/signup styles)
    - page_categories-DSH2RcVB.css (categories page styles)
    - 404-CYV7920Q.css (404 page styles)
    - other_page-CZcv4cny.css (other pages styles)
    - header-Bnnl4-QC.css (header styles)
    - header_m-Ddevy5Yx.css (mobile header styles)
    - header_xl-DYR2uzpa.css (xl header styles)
    - misc-hFmGtNIq.css (miscellaneous styles)
    - other_categories-Dcy8TmDp.css (other categories styles)
    - similar_sites-CDx3qWw3.css (similar sites styles)
    - crytical-idkkBrI7.css (critical styles)
    - fonts-LOZ3Jhjw.css (font styles)
    - grid-DzhalBSG.css (grid styles)
    - page_categories_xl-BQqdajyD.css (xl categories page styles)

  /js/
    - app-CI-Xx9Ug.js (main app JavaScript)
    - frontpage-cIvcXCSp.js (frontpage-specific JavaScript)
    - app-legacy-DSl9aINy.js (legacy app JavaScript)
    - frontpage-legacy-DpadItUV.js (legacy frontpage JavaScript)
    - polyfills-Cdg_oNkm.js (modern polyfills)
    - polyfills-legacy-DN4gvOhs.js (legacy polyfills)
    - index-DWtE7EWW.js (index page JavaScript)
    - index-legacy-D5Mmf9qD.js (legacy index JavaScript)
```

## Integration Functions

### 1. `get_latest_css_file($pattern)`
- **Purpose**: Dynamically finds the latest CSS file matching a pattern
- **Parameters**: 
  - `$pattern`: Glob pattern (e.g., `'app-*.css'`)
- **Returns**: Filename of the most recent matching file or `false`
- **Example**: `get_latest_css_file('app-*.css')` returns `'app-CZJnCuL7.css'`

### 2. `get_latest_js_file($pattern)`
- **Purpose**: Dynamically finds the latest JavaScript file matching a pattern
- **Parameters**: 
  - `$pattern`: Glob pattern (e.g., `'app-*.js'`)
- **Returns**: Filename of the most recent matching file or `false`
- **Example**: `get_latest_js_file('app-*.js')` returns `'app-CI-Xx9Ug.js'`

### 3. `load_vite_assets()`
- **Purpose**: Main function that loads all Vite-generated assets based on current page type
- **Features**:
  - Automatic cache busting using `filemtime()`
  - Page-specific CSS loading
  - Legacy browser support
  - Proper dependency management

## Page-Specific Asset Loading

### CSS Loading Logic

| Page Type | CSS Files Loaded |
|-----------|------------------|
| Front Page | `frontpage-*.css` |
| Category Pages | `app-*.css` + `category-*.css` |
| Single Site Reviews | `app-*.css` + `review-*.css` |
| Blog Pages | `app-*.css` + `blog-*.css` |
| Pornstars Pages | `app-*.css` + `pornstars-*.css` |
| Webcam Pages | `app-*.css` + `webcam-*.css` |
| Coupon Pages | `app-*.css` + `porn-deals-*.css` or `porn-deals-single-*.css` |
| Login/Signup Pages | `app-*.css` + `login-*.css` |
| Categories Page | `app-*.css` + `page_categories-*.css` |
| 404 Pages | `app-*.css` + `404-*.css` |
| Other Pages | `app-*.css` + `other_page-*.css` |

### JavaScript Loading Logic

| Page Type | JS Files Loaded |
|-----------|-----------------|
| All Pages | `app-*.js` + `polyfills-*.js` |
| Front Page | + `frontpage-*.js` |
| Legacy Browsers | + `app-legacy-*.js` + `polyfills-legacy-*.js` |
| Front Page + Legacy | + `frontpage-legacy-*.js` |

## Cache Busting Strategy

### Automatic Cache Busting
- **CSS Files**: Version based on `filemtime()` of the actual file
- **JS Files**: Version based on `filemtime()` of the actual file
- **Benefits**: 
  - No manual version management
  - Automatic cache invalidation when files change
  - Consistent with Vite's content hashing

### Example
```php
$app_css = get_latest_css_file('app-*.css');
if ($app_css) {
    wp_enqueue_style(
        'mpg-app-vite',
        $assets_path . 'css/' . $app_css,
        array(),
        filemtime($theme_dir . '/dest/css/' . $app_css) // Dynamic version
    );
}
```

## Legacy Browser Support

### Modern vs Legacy Files
- **Modern**: `app-*.js`, `frontpage-*.js`, `polyfills-*.js`
- **Legacy**: `app-legacy-*.js`, `frontpage-legacy-*.js`, `polyfills-legacy-*.js`

### Loading Strategy
1. Modern files are loaded first
2. Legacy files are loaded as fallbacks
3. Polyfills are loaded for both modern and legacy browsers

## Integration Points

### 1. `functions.php` Modifications
- Added `load_vite_assets()` call in `mpg_scripts_styles()`
- Commented out old static asset loading
- Maintained existing script dependencies

### 2. Asset Paths
- **Base Path**: `/wp-content/themes/mpg/dest/`
- **CSS Path**: `/wp-content/themes/mpg/dest/css/`
- **JS Path**: `/wp-content/themes/mpg/dest/js/`

### 3. Handle Names
All Vite assets use the `-vite` suffix to distinguish from old assets:
- `mpg-app-vite`
- `mpg-frontpage-vite`
- `mpg-category-vite`
- `mpg-review-vite`
- etc.

## Migration Benefits

### 1. Performance Improvements
- **Bundling**: All dependencies bundled into single files
- **Minification**: Automatic CSS/JS minification
- **Tree Shaking**: Unused code elimination
- **Code Splitting**: Page-specific chunks

### 2. Development Experience
- **Hot Module Replacement**: Instant updates during development
- **Modern JavaScript**: ES6+ features with automatic transpilation
- **SCSS Support**: Advanced CSS preprocessing
- **Asset Optimization**: Automatic image optimization

### 3. Maintenance
- **Automatic Cache Busting**: No manual version management
- **Dependency Management**: Modern npm-based dependencies
- **Build Process**: Standardized Vite build pipeline

## Troubleshooting

### Common Issues

#### 1. Assets Not Loading
- **Check**: File paths in `/dest/` directory
- **Verify**: `get_template_directory()` returns correct path
- **Debug**: Use `var_dump(get_latest_css_file('app-*.css'))` to test file detection

#### 2. Cache Issues
- **Clear**: WordPress cache plugins
- **Verify**: File modification times are correct
- **Check**: Browser developer tools for 404 errors

#### 3. Legacy Browser Issues
- **Verify**: Legacy files are generated by Vite
- **Check**: Browser console for JavaScript errors
- **Test**: Use browser dev tools to simulate older browsers

### Debug Functions
```php
// Debug CSS file detection
function debug_css_files() {
    $files = glob(get_template_directory() . '/dest/css/app-*.css');
    var_dump($files);
}

// Debug JS file detection
function debug_js_files() {
    $files = glob(get_template_directory() . '/dest/js/app-*.js');
    var_dump($files);
}
```

## Future Enhancements

### 1. Preloading
- Add `<link rel="preload">` for critical assets
- Implement resource hints for better performance

### 2. Service Worker
- Add service worker for offline support
- Implement asset caching strategies

### 3. Critical CSS
- Extract and inline critical CSS
- Defer non-critical styles

### 4. Asset Optimization
- Implement image lazy loading
- Add WebP support with fallbacks
- Optimize font loading

## Build Process

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
```

### File Watching
```bash
npm run dev -- --watch
```

## Dependencies

### Required PHP Functions
- `glob()`: File pattern matching
- `filemtime()`: File modification time
- `wp_enqueue_style()`: WordPress style enqueuing
- `wp_enqueue_script()`: WordPress script enqueuing

### Required WordPress Hooks
- `wp_enqueue_scripts`: Asset loading hook
- `wp_default_scripts`: Script modification hook

## Security Considerations

### File Access
- Assets are served from `/dest/` directory
- No direct PHP execution in asset directory
- Proper file permissions required

### Cache Busting
- Uses file modification time, not content hash
- Consider implementing content-based hashing for better security

### Legacy Support
- Legacy files may contain polyfills
- Ensure compatibility with target browsers 