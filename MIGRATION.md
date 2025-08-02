# Migration Guide: Node.js 14 to Node.js 18+

This project has been upgraded to work with Node.js 18.0.0 and higher. Here are the key changes made:

## 🔄 Major Changes

### 1. **Node.js Version Requirement**
- **Before**: Node.js 14.x
- **After**: Node.js 18.0.0 or higher
- Added `engines` field to `package.json`
- Created `.nvmrc` file for version management

### 2. **Dependency Updates**
All dependencies have been updated to their latest stable versions:

#### Babel Packages
- `@babel/core`: `^7.0.0-bridge.0` → `^7.23.0`
- `@babel/preset-env`: `^7.0.0-beta.44` → `^7.23.0`
- `@babel/runtime`: `^7.10.5` → `^7.23.0`
- `@babel/plugin-transform-runtime`: `^7.10.5` → `^7.23.0`

#### Gulp Plugins
- `gulp-sass`: `^4.0.1` → `^5.1.0` (requires `sass` package)
- `gulp-autoprefixer`: `^5.0.0` → `^8.0.0`
- `gulp-babel`: `^8.0.0-beta.2` → `^8.0.0`
- `gulp-imagemin`: `^4.1.0` → `^7.1.0`
- `gulp-iconfont`: `^10.0.2` → `^11.0.0`
- `gulp-pug`: `^4.0.1` → `^5.0.0`
- And many more...

#### Other Dependencies
- `del`: `^3.0.0` → `^7.1.0` (API changed)
- `browser-sync`: `^2.26.3` → `^2.29.3`
- `pug`: `^2.0.3` → `^3.0.2`
- `yargs`: `^12.0.2` → `^17.7.2`

### 3. **Code Changes**

#### SCSS Task (`gulp/task/scss.js`)
```javascript
// Before
const scss = require('gulp-sass');

// After
const sass = require('gulp-sass')(require('sass'));
```

#### Clean Task (`gulp/task/clean.js`)
```javascript
// Before
const del = require('del');
del.sync([...]);

// After
const { deleteSync } = require('del');
deleteSync([...]);
```

#### Autoprefixer Configuration (`gulp/config/configOption.js`)
```javascript
// Before
autoPrefixOptions: {
  browsers: [
    "last 10 versions",
    ">= 1%",
    // ... many browser targets
  ],
  cascade: true
}

// After
autoPrefixOptions: {
  cascade: true
}
```

## 🚀 Quick Setup

1. **Upgrade Node.js** (if needed):
   ```bash
   nvm install 18
   nvm use 18
   ```

2. **Run the installation script**:
   ```bash
   ./install.sh
   ```

3. **Or install manually**:
   ```bash
   rm -rf node_modules package-lock.json yarn.lock
   npm install
   ```

## ✅ Verification

After installation, verify everything works:

```bash
npm start    # Start development server
npm run build # Build for production
```

## 🔧 Troubleshooting

### Common Issues

1. **Node.js version too old**
   - Error: "Node.js version X is too old"
   - Solution: Upgrade to Node.js 18+ using nvm or download from nodejs.org

2. **Sass compilation errors**
   - Error: "Cannot find module 'sass'"
   - Solution: Run `npm install` to install the new `sass` dependency

3. **Gulp tasks failing**
   - Error: "Cannot find module 'del'"
   - Solution: The `del` package API changed, but this is already fixed in the code

4. **Autoprefixer warnings**
   - Warning: "Replace Autoprefixer browsers option"
   - Solution: Already fixed - removed deprecated `browsers` option

## 📝 Notes

- The project now uses modern ES6+ features supported by Node.js 18+
- All deprecated APIs have been updated to their modern equivalents
- Browser support is now handled automatically by Autoprefixer
- The build process should be faster with modern dependencies

## 🆘 Support

If you encounter any issues during migration, please:
1. Check that you're using Node.js 18.0.0 or higher
2. Ensure all old dependencies are cleared (`rm -rf node_modules`)
3. Run `npm install` to get the latest compatible versions 