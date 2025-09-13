# Header and Footer Updates

## Tasks
- [x] Remove Footer import and usage from pages/index.js
- [x] Remove Footer import and usage from pages/products.js
- [x] Remove Footer import and usage from pages/contact.js
- [x] Move UnifiedHeader to _app.js and remove from individual pages
- [x] Replace shippingCutoffContainer with SideMenu in UnifiedHeader
- [x] Create SideMenu component
- [x] Remove UnifiedHeader from pages/products/[slug].js
- [x] Remove UnifiedHeader from components/Layout/Layout.js
- [ ] Test the site to ensure headers and footers appear correctly

## Notes
- Footer is kept in _app.js for global rendering
- Header is now global in _app.js with SideMenu
- SideMenu provides navigation in the header area
- XPath changed from /html/body/div[2]/div/main/header/div[3]/div to /html/body/div[2]/div/header/div[2]
