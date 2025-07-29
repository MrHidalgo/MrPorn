import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  root: 'src',
  build: {
    outDir: '../dest',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // Main entry points for JavaScript
        main: resolve(__dirname, 'src/main.js'),
        frontpage: resolve(__dirname, 'src/frontpage.js'),
        
        // Individual CSS files (these will only generate CSS, not JS)
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
        // No manual chunks for now since we're not using external libraries
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `images/[name]-[hash][extname]`
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js'
      }
    },
    cssCodeSplit: true,
    sourcemap: true
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