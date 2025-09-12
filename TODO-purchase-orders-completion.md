# Purchase Orders API Completion Tasks

## ✅ Completed Tasks
- [x] Analyzed current purchase orders API structure
- [x] Reviewed database functions in lib/db.js
- [x] Identified missing POST/PUT handlers in API
- [x] Found column name mismatch (created_date vs created_at)
- [x] Located utils/purchaseOrderUtils.js file to remove
- [x] Checked for frontend components using purchase orders API (none found)

## 🔄 Remaining Tasks
- [ ] Add missing handleCreatePurchaseOrder and handleUpdatePurchaseOrder functions to pages/api/purchaseorders.js
- [ ] Fix column name mismatch in API query (use created_date consistently)
- [ ] Remove utils/purchaseOrderUtils.js file
- [ ] Check and remove axios dependency from package.json if not used elsewhere
- [ ] Run purchase_orders table creation script in Supabase (optional for production)
- [ ] Test the API endpoints to ensure they work correctly

## 📋 Implementation Details
1. **API Handlers to Add:**
   - `handleCreatePurchaseOrder(req, res)` - Handle POST requests for creating new purchase orders
   - `handleUpdatePurchaseOrder(req, res)` - Handle PUT requests for updating existing purchase orders

2. **Column Fix:**
   - Change `countQuery.gte('created_at', startDate.toISOString())` to `countQuery.gte('created_date', startDate.toISOString())`

3. **Cleanup:**
   - Remove `utils/purchaseOrderUtils.js`
   - Remove axios from package.json if not used elsewhere

4. **Database Schema:**
   - Table: `purchase_orders`
   - Fields: id, item_name, manufacturer, purchase_order_status, po_order_id, supplier, sku, quantity, unit_price, total_amount, created_date, updated_at

## 📝 Next Steps
1. Add POST and PUT handlers to pages/api/purchaseorders.js
2. Fix column name in query
3. Remove unused files and dependencies
4. Test API functionality
5. Create database table if needed
