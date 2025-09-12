# TODO: Implement prod-ca-2021.crt Certificate

## Completed
- [x] Created shared database config in lib/db-config.js
- [x] Updated server.js to use shared db-config
- [x] Updated routes/api/repairdesk.js to use shared db-config
- [x] Updated pages/api/user/change-password.js to use CA
- [x] Updated pages/api/user/addresses/[id].js to use CA

## Pending
- [ ] Update remaining database connections to use shared db-config or CA
  - pages/api/user/profile.js
  - pages/api/user/addresses/[id]/default.js
  - pages/api/user/addresses.js
  - pages/api/user/2fa/send-test.js
  - pages/api/admin/import-inventory.js
  - pages/api/repairdesk/employee-attendance.js
  - pages/api/repairdesk/customers.js
  - pages/api/auth/2fa/duo-init.js
  - pages/api/repairdesk/employees.js
  - pages/api/auth/2fa/send-code.js
  - routes/api/invoices.js
  - routes/api/checkout.js
  - routes/api/problems.js
  - routes/api/customer.js
  - routes/api/tickets.js
  - routes/api/repaircategories.js
  - middleware/auth.js
  - scrapers/node_scraper.js
  - Scripts/update-admin-password.js
  - Scripts/run_repair_jobs_migration.js
  - Scripts/check_repair_jobs_tables.js
  - utils/related-products.js
  - utils/invoiceUtils.js
  - database/config.js
  - database/import-combined-data.js

## Next Steps
- Update remaining files to use lib/db-config.js for consistency
- Test all database connections in production
