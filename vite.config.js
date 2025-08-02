import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    // Custom plugin to filter CSS entry points from legacy processing
    {
      name: 'filter-css-legacy',
      config(config) {
        // Store original input for later use
        config.build.rollupOptions.input = config.build.rollupOptions.input;
      },
      generateBundle(options, bundle) {
        // Remove CSS entry points from legacy processing
        const cssEntryPoints = [
          'porn-deals', 'porn-deals-single', 'pornstars', 'blog', 'category', 
          'review', 'webcam', 'login', 'page_categories', 'page_categories_xl', 
          'other_page', '404', 'crytical', 'fonts', 'grid', 'header', 
          'header_m', 'header_xl', 'misc', 'other_categories', 'similar_sites'
        ];
        
        // Delete legacy files for CSS entry points
        Object.keys(bundle).forEach(fileName => {
          if (cssEntryPoints.some(cssEntry => fileName.includes(cssEntry + '-legacy'))) {
            delete bundle[fileName];
          }
        });
      }
    }
  ],
  // Optimize dependencies to ensure npm modules are properly bundled
  optimizeDeps: {
    include: [
      'body-scroll-lock',
      'micromodal'
    ],
    exclude: []
  },
  build: {
    outDir: 'dest',
    emptyOutDir: true,
    // Enable CSS code splitting to create separate CSS files
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        // Main HTML entry point (for legacy fallback)
        index: resolve(__dirname, 'src/index.html'),
        // Main entry points for JavaScript (replicating Gulp behavior)
        app: resolve(__dirname, 'src/app.js'),
        frontpage: resolve(__dirname, 'src/frontpage.js'),
        
        // Individual CSS files (these will generate separate CSS files)
        'porn-deals': resolve(__dirname, 'src/scss/porn-deals.scss'),
        'porn-deals-single': resolve(__dirname, 'src/scss/porn-deals-single.scss'),
        'pornstars': resolve(__dirname, 'src/scss/pornstars.scss'),
        'blog': resolve(__dirname, 'src/scss/blog.scss'),
        'category': resolve(__dirname, 'src/scss/category.scss'),
        'review': resolve(__dirname, 'src/scss/review.scss'),
        'webcam': resolve(__dirname, 'src/scss/webcam.scss'),
        'login': resolve(__dirname, 'src/scss/login.scss'),
        'page_categories': resolve(__dirname, 'src/scss/page_categories.scss'),
        'page_categories_xl': resolve(__dirname, 'src/scss/page_categories_xl.scss'),
        'other_page': resolve(__dirname, 'src/scss/other_page.scss'),
        '404': resolve(__dirname, 'src/scss/404.scss'),
        'crytical': resolve(__dirname, 'src/scss/crytical.scss'),
        'fonts': resolve(__dirname, 'src/scss/fonts.scss'),
        'grid': resolve(__dirname, 'src/scss/grid.scss'),
        'header': resolve(__dirname, 'src/scss/header.scss'),
        'header_m': resolve(__dirname, 'src/scss/header_m.scss'),
        'header_xl': resolve(__dirname, 'src/scss/header_xl.scss'),
        'misc': resolve(__dirname, 'src/scss/misc.scss'),
        'other_categories': resolve(__dirname, 'src/scss/other_categories.scss'),
        'similar_sites': resolve(__dirname, 'src/scss/similar_sites.scss')
      },
      output: {
        // Use ES modules format but ensure compatibility
        format: 'es',
        // Disable inline dynamic imports for multiple inputs
        inlineDynamicImports: false,
        // Force all code into single chunks - no code splitting for JS
        manualChunks: (id) => {
          // Bundle all npm modules with their respective entry points
          if (id.includes('body-scroll-lock') || id.includes('micromodal')) {
            // Bundle npm modules with their respective entry points
            if (id.includes('frontpage') || id.includes('src/frontpage.js')) {
              return 'frontpage'; // Bundle with frontpage
            }
            return 'app'; // Bundle with app
          }
          
          // Force all app-related code into single app chunk
          if (id.includes('src/js/') || id.includes('src/vendorScript/')) {
            return 'app';
          }
          
          // Force all frontpage-specific SCSS into frontpage chunk
          if (id.includes('src/scss/frontpage.scss')) {
            return 'frontpage';
          }
          
          // Don't create separate chunks for anything else - bundle everything together
          return null;
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/css/i.test(ext)) {
            return `css/[name]-[hash][extname]`
          }
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `images/[name]-[hash][extname]`
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: (chunkInfo) => {
          // Add content hashing for cache busting
          if (chunkInfo.name === 'app') {
            return 'js/app-[hash].js'
          }
          if (chunkInfo.name === 'frontpage') {
            return 'js/frontpage-[hash].js'
          }
          return 'js/[name]-[hash].js'
        }
      }
    },
    sourcemap: true,
    // Optimize bundle size
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console logs for debugging
        drop_debugger: true
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // No additional data needed since variables are imported in app.scss
      }
    },
    postcss: {
      plugins: [
        require('autoprefixer')({
          overrideBrowserslist: [
            "last 10 versions",
            ">= 1%",
            "dead",
            "unreleased versions",
            "explorer >= 8",
            "chrome >= 21",
            "firefox esr",
            "opera >= 15",
            "android >= 2.3",
            "safari >= 6.2.6",
            "explorermobile >= 10",
            "ios >= 6",
            "blackberry >= 10"
          ]
        })
      ]
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})