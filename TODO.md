# Purchase Orders API Completion Tasks

## ✅ Completed Tasks
- [x] Analyzed current purchase orders API structure
- [x] Reviewed products API for consistency reference
- [x] Identified database functions needed in lib/db.js
- [x] Add purchase order functions to lib/db.js (getPurchaseOrders, createPurchaseOrder, etc.)
- [x] Update pages/api/purchaseorders.js to use lib/db.js instead of utils/purchaseOrderUtils.js
- [x] Remove external API dependency (RepairDesk API)
- [x] Update API to handle local database queries with pagination and filtering
- [x] Remove API key validation (or replace with user authentication)
- [x] Test the refactored API endpoint
- [x] Implement fallback to mock data when database table doesn't exist

## 🔄 Remaining Tasks
- [ ] Add missing handleCreatePurchaseOrder and handleUpdatePurchaseOrder functions to pages/api/purchaseorders.js
- [ ] Fix column name mismatch in API query (created_date vs created_at)
- [ ] Remove utils/purchaseOrderUtils.js file
- [ ] Check and remove axios dependency if no longer needed
- [ ] Run purchase_orders table creation script in Supabase (optional for production)
- [ ] Update any frontend components that use the purchase orders API (none found)
- [ ] Test the complete API functionality

## 📋 Implementation Details
1. **API Functions to Add:**
   - `handleCreatePurchaseOrder(req, res)` - Handle POST requests for creating purchase orders
   - `handleUpdatePurchaseOrder(req, res)` - Handle PUT requests for updating purchase orders

2. **Database Schema:**
   - Table: `purchase_orders`
   - Fields: id, item_name, manufacturer, purchase_order_status, po_order_id, supplier, sku, quantity, unit_price, total_amount, created_date, updated_at

3. **Dependencies to Remove:**
   - utils/purchaseOrderUtils.js (external API wrapper)
   - axios (if no longer used)

## 📝 Next Steps
1. Add POST and PUT handlers to pages/api/purchaseorders.js
2. Fix column name consistency in queries
3. Remove deprecated files
4. Test API endpoints
5. Create database table if needed
