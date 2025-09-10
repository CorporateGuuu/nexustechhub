# TODO: Set Up n8n for Live Testing

## Current Status
- n8n installation in progress
- Test infrastructure ready
- Webhook URLs identified from workflow:
  - Raw Materials: /webhook/Pb-raw-materials
  - Issue Request: /webhook/raw-materials-issue
  - Approval: /webhook/approve-issue

## Next Steps
1. **Complete n8n Installation**: Wait for npm install -g n8n to finish
2. **Start n8n Server**: Run `n8n start` to launch n8n at http://localhost:5678
3. **Import Workflow**: 
   - Open http://localhost:5678 in browser
   - Import 3979_workflow_3979.json
   - Activate the workflow
4. **Update Config**: Update test_environment_config.json with local webhook URLs:
   - raw_materials_webhook: "http://localhost:5678/webhook/Pb-raw-materials"
   - issue_request_webhook: "http://localhost:5678/webhook/raw-materials-issue"
   - approval_webhook: "http://localhost:5678/webhook/approve-issue"
5. **Configure Credentials**: Set up real credentials for:
   - Google Sheets service account
   - Supabase database
   - Gmail account
   - Nexus API
6. **Re-run Tests**: Execute `npm run test` with live n8n instance
7. **Validate Results**: Check that webhook tests pass (no more 404 errors)

## Expected Test Results After Setup
- ✅ Raw Materials Receiving - New Product: PASSED
- ✅ Raw Materials Receiving - Existing Product: PASSED
- ✅ Material Issue Request - Sufficient Stock: PASSED
- ✅ Material Issue Request - Insufficient Stock: PASSED
- ✅ Error Handling - Invalid Data: PASSED (already working)
- ❌ Nexus API Integration: FAILED (API not available - expected)
- ❌ Retry Logic: FAILED (simulated failures - expected)
- Manual: Low Stock Detection (requires manual stock reduction)

## Dependencies
- n8n installed globally
- Node.js environment
- Access to Google Sheets, Supabase, Gmail credentials
- Nexus API access (for full testing)
