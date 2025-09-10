# Inventory Workflow Testing Suite

This directory contains a comprehensive testing suite for the optimized inventory management workflow (3979_workflow_3979.json).

## 📁 Files Overview

### Core Testing Files
- **`test_scenarios.md`** - Detailed test scenarios covering all workflow paths and edge cases
- **`sample_test_data.json`** - Sample data for different test scenarios
- **`test_environment_config.json`** - Environment configuration for testing
- **`test_execution_script.js`** - Automated test execution script
- **`TODO-testing.md`** - Test progress tracking

### Original Files
- **`3979_workflow_3979.json`** - The optimized inventory workflow
- **`TODO.md`** - Original optimization plan and progress

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Access to test n8n instance
- Configured Google Sheets, Supabase, and Gmail credentials

### Installation
```bash
cd n8n-workflows-main/workflows
npm install axios
```

### Environment Setup
1. Copy `test_environment_config.json` to your test environment
2. Update the environment variables with your actual test credentials:
   - `NEXUS_API_URL` and `NEXUS_API_KEY`
   - Google Sheets service account credentials
   - Supabase credentials
   - Gmail OAuth credentials

3. Ensure your n8n instance has the workflow imported and active

## 🧪 Running Tests

### Option 1: Automated Testing (Recommended)
```bash
node test_execution_script.js
```

This will run all test scenarios automatically and generate a detailed report.

### Option 2: Manual Testing
Follow the test scenarios in `test_scenarios.md` and use the sample data from `sample_test_data.json`.

#### Manual Test Steps:
1. **Raw Materials Receiving Test**
   ```bash
   curl -X POST https://your-n8n-instance/webhook/Pb-raw-materials \
     -H "Content-Type: application/json" \
     -d @sample_test_data.json
   ```

2. **Material Issue Request Test**
   ```bash
   curl -X POST https://your-n8n-instance/webhook/raw-materials-issue \
     -H "Content-Type: application/json" \
     -d '{"product_id": "RM-1001", "quantity_requested": 20, "measurement_unit": "kg", "requested_by": "Alice", "description": "Test issue", "submissionId": "test-001"}'
   ```

## 📋 Test Scenarios

### 1. Raw Materials Receiving - New Product
- **Endpoint**: `/Pb-raw-materials`
- **Data**: `sample_test_data.json` -> `raw_materials_receiving[0]`
- **Expected**: New product initialized in stock, no low stock alert

### 2. Raw Materials Receiving - Existing Product
- **Endpoint**: `/Pb-raw-materials`
- **Data**: `sample_test_data.json` -> `raw_materials_receiving[1]`
- **Expected**: Stock updated correctly, previous stock recorded

### 3. Material Issue Request - Sufficient Stock
- **Endpoint**: `/raw-materials-issue`
- **Data**: `sample_test_data.json` -> `material_issue_requests[0]`
- **Expected**: Approval email sent, stock reduced after approval

### 4. Material Issue Request - Insufficient Stock
- **Endpoint**: `/raw-materials-issue`
- **Data**: `sample_test_data.json` -> `material_issue_requests[1]`
- **Expected**: Approval email shows insufficient stock warning

### 5. Low Stock Detection
- **Setup**: Reduce stock below minimum level (50 units)
- **Expected**: Low stock alert email sent with correct details

### 6. Error Handling - Invalid Data
- **Data**: Invalid product_id, negative quantity, invalid unit_price
- **Expected**: Validation errors caught and logged, no data saved

### 7. Nexus API Integration
- **Setup**: Configure `NEXUS_API_URL` and `NEXUS_API_KEY`
- **Expected**: API called with correct parameters after stock updates

### 8. Retry Logic and Error Recovery
- **Setup**: Temporarily make Google Sheets unavailable
- **Expected**: Retry with exponential backoff, error logging

## 🔧 Configuration

### Environment Variables
Update these in your n8n instance or `.env` file:

```bash
# Nexus API
NEXUS_API_URL=https://api.nexus.com/stock/update
NEXUS_API_KEY=your-api-key

# Sentry (optional)
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Google Sheets Setup
1. Create a Google Cloud Project
2. Enable Google Sheets API
3. Create a Service Account
4. Share your test spreadsheet with the service account email
5. Download the JSON key file and update `test_environment_config.json`

### Gmail Setup
1. Create a Google Cloud Project
2. Enable Gmail API
3. Create OAuth 2.0 credentials
4. Configure OAuth consent screen
5. Update credentials in `test_environment_config.json`

## 📊 Test Results

After running tests, check:
- **`test_results.json`** - Detailed test results and metrics
- **Console output** - Real-time test progress and results
- **n8n workflow logs** - Detailed execution logs
- **Google Sheets** - Verify data was saved correctly
- **Email inbox** - Check approval and alert emails

## 🐛 Troubleshooting

### Common Issues

1. **Webhook not responding**
   - Check if n8n instance is running
   - Verify webhook URLs in `test_environment_config.json`
   - Check n8n workflow activation status

2. **Google Sheets errors**
   - Verify service account credentials
   - Check spreadsheet sharing permissions
   - Ensure Google Sheets API is enabled

3. **Email not sending**
   - Verify Gmail OAuth credentials
   - Check OAuth consent screen configuration
   - Ensure Gmail API is enabled

4. **Supabase connection issues**
   - Verify Supabase URL and keys
   - Check database table permissions
   - Ensure Supabase project is active

### Debug Mode
Enable detailed logging by setting:
```javascript
console.log('Debug data:', JSON.stringify(data, null, 2));
```

## 📈 Performance Testing

For performance testing, you can:
1. Run multiple concurrent requests
2. Test with large datasets
3. Monitor response times
4. Check memory usage in n8n

## 🔒 Security Considerations

- Use test credentials only
- Never commit real API keys to version control
- Rotate test credentials regularly
- Monitor test environment access logs

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review n8n workflow execution logs
3. Verify all environment variables are set correctly
4. Test individual components before running full suite

## 🎯 Next Steps

After successful testing:
1. Update production environment variables
2. Deploy workflow to production
3. Set up monitoring and alerting
4. Document production procedures
5. Train team members on the workflow
