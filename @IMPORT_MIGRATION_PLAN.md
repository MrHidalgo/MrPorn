# @import to @use Migration Plan

## Overview
Converting all Sass `@import` statements to modern `@use` statements to eliminate deprecation warnings.

## Migration Strategy

### Phase 1: Core Utilities (Foundation)
1. **Convert utility files first** - These are imported by everything else
   - `_utilities/_function.scss` - Already has @use statements
   - `_utilities/_mixin.scss` - Already has @use statements  
   - `_utilities/_variable.scss` - Needs conversion
   - `_utilities/_extend.scss` - Needs conversion

### Phase 2: Main Entry Files
2. **Convert main SCSS files** - These are the entry points
   - `frontpage.scss`
   - `webcam.scss`
   - `login.scss`
   - `review.scss`
   - `pornstars.scss`
   - `porn-deals.scss`
   - `porn-deals-single.scss`
   - `page_categories.scss`
   - `page_categories_xl.scss`
   - `header.scss`
   - `header_xl.scss`
   - `header_m.scss`
   - `misc.scss`
   - `other_page.scss`
   - `other_categories.scss`
   - `similar_sites.scss`
   - `grid.scss`
   - `app.scss`
   - `blog.scss`
   - `category.scss`
   - `category_deals.scss`
   - `crytical.scss`
   - `fonts.scss`
   - `404.scss`

### Phase 3: Component Files
3. **Convert component files** - These are imported by main files
   - All files in `_components/` directory
   - All files in `_shared/` directory
   - All files in `_vendor/` directory
   - All files in `_macros/` directory

## @use Syntax Examples

### Before (@import):
```scss
@import "_utilities/function";
@import "_utilities/mixin";
@import "_utilities/variable";
```

### After (@use):
```scss
@use "_utilities/function" as *;
@use "_utilities/mixin" as *;
@use "_utilities/variable" as *;
```

### For namespaced imports:
```scss
@use "_utilities/function" as func;
@use "_utilities/mixin" as mix;
@use "_utilities/variable" as var;
```

## Key Considerations

1. **Global namespace** - Using `as *` makes all variables/functions globally available (like @import)
2. **Namespacing** - Using `as namespace` prevents conflicts but requires updating references
3. **Forward** - Use `@forward` to re-export modules
4. **Dependencies** - Must convert in dependency order (utilities first, then components)

## Testing Strategy

1. Convert one file at a time
2. Test build after each conversion
3. Verify no compilation errors
4. Check that styles render correctly
5. Monitor deprecation warning reduction

## Files to Convert (Priority Order)

### High Priority (Core Utilities)
- [ ] `src/scss/_utilities/_variable.scss`
- [ ] `src/scss/_utilities/_extend.scss`

### Medium Priority (Main Entry Files)
- [ ] `src/scss/frontpage.scss`
- [ ] `src/scss/webcam.scss`
- [ ] `src/scss/login.scss`
- [ ] `src/scss/review.scss`
- [ ] `src/scss/pornstars.scss`
- [ ] `src/scss/porn-deals.scss`
- [ ] `src/scss/porn-deals-single.scss`
- [ ] `src/scss/page_categories.scss`
- [ ] `src/scss/page_categories_xl.scss`
- [ ] `src/scss/header.scss`
- [ ] `src/scss/header_xl.scss`
- [ ] `src/scss/header_m.scss`
- [ ] `src/scss/misc.scss`
- [ ] `src/scss/other_page.scss`
- [ ] `src/scss/other_categories.scss`
- [ ] `src/scss/similar_sites.scss`
- [ ] `src/scss/grid.scss`
- [ ] `src/scss/app.scss`
- [ ] `src/scss/blog.scss`
- [ ] `src/scss/category.scss`
- [ ] `src/scss/category_deals.scss`
- [ ] `src/scss/crytical.scss`
- [ ] `src/scss/fonts.scss`
- [ ] `src/scss/404.scss`

### Low Priority (Component Files)
- [ ] All files in `_components/` directory
- [ ] All files in `_shared/` directory  
- [ ] All files in `_vendor/` directory
- [ ] All files in `_macros/` directory 