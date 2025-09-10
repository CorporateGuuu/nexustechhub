# Inventory Workflow Test Scenarios

## Test Scenario 1: Raw Materials Receiving - New Product
**Objective**: Test the complete flow for receiving a new raw material that doesn't exist in stock.

**Test Data**:
```json
{
  "timestamp": "2024-06-01T10:00:00Z",
  "product_id": "RM-1001",
  "supplier_name": "Supplier A",
  "quantity_received": 100,
  "description": "Raw material batch 1",
  "measurement_unit": "kg",
  "unit_price": 5.5,
  "date_of_delivery": "2024-06-01",
  "received_by": "John Doe",
  "submissionId": "sub-001"
}
```

**Expected Flow**:
1. Webhook receives data
2. Data standardization
3. Total price calculation (100 * 5.5 = 550.00)
4. Append to "Raw Materials" Google Sheet
5. Validate quantity received
6. Lookup existing stock (should return empty/null)
7. Check if product exists (false branch)
8. Initialize new product in stock
9. Update Supabase "Current Stock" table
10. Check for low stock (should be false for new product with 100 units)

**Success Criteria**:
- Data correctly saved to Google Sheets
- New product initialized in stock with 100 units
- No low stock alert triggered
- Supabase records updated

## Test Scenario 2: Raw Materials Receiving - Existing Product
**Objective**: Test receiving additional stock for an existing product.

**Test Data**:
```json
{
  "timestamp": "2024-06-02T11:00:00Z",
  "product_id": "RM-1001",
  "supplier_name": "Supplier A",
  "quantity_received": 50,
  "description": "Additional raw material batch",
  "measurement_unit": "kg",
  "unit_price": 5.5,
  "date_of_delivery": "2024-06-02",
  "received_by": "John Doe",
  "submissionId": "sub-002"
}
```

**Expected Flow**:
1. Webhook receives data
2. Data standardization
3. Total price calculation (50 * 5.5 = 275.00)
4. Append to "Raw Materials" Google Sheet
5. Validate quantity received
6. Lookup existing stock (should find 100 units)
7. Check if product exists (true branch)
8. Calculate updated stock (100 + 50 = 150)
9. Update Google Sheets "Current Stock"
10. Update Supabase "Current Stock" table
11. Check for low stock (should be false)

**Success Criteria**:
- Stock correctly updated to 150 units
- Previous stock recorded as 100
- All database updates successful

## Test Scenario 3: Material Issue Request - Sufficient Stock
**Objective**: Test material issue request with sufficient stock available.

**Test Data**:
```json
{
  "product_id": "RM-1001",
  "quantity_requested": 20,
  "measurement_unit": "kg",
  "requested_by": "Alice",
  "description": "Issue for production",
  "submissionId": "issue-001"
}
```

**Expected Flow**:
1. Webhook receives issue request
2. Data standardization
3. Validate issue request data
4. Verify requested quantity
5. Append to "Materials Issued" Google Sheet
6. Check available stock (150 units available)
7. Prepare approval (sufficient stock)
8. Send approval email
9. Wait for approval response
10. Process approval (assume approved)
11. Update stock (150 - 20 = 130)
12. Update issue status to "Approved"
13. Check for low stock (should be false)

**Success Criteria**:
- Approval email sent successfully
- Stock reduced to 130 units after approval
- Issue status updated to "Approved"

## Test Scenario 4: Material Issue Request - Insufficient Stock
**Objective**: Test material issue request with insufficient stock.

**Test Data**:
```json
{
  "product_id": "RM-1001",
  "quantity_requested": 200,
  "measurement_unit": "kg",
  "requested_by": "Bob",
  "description": "Large issue request",
  "submissionId": "issue-002"
}
```

**Expected Flow**:
1. Webhook receives issue request
2. Data standardization
3. Validate issue request data
4. Verify requested quantity
5. Append to "Materials Issued" Google Sheet
6. Check available stock (130 units available)
7. Prepare approval (insufficient stock)
8. Send approval email (showing insufficient stock)
9. Wait for approval response
10. Process approval (assume rejected)
11. Update issue status to "Rejected"
12. No stock changes

**Success Criteria**:
- Approval email shows insufficient stock warning
- Issue status updated to "Rejected"
- Stock remains unchanged

## Test Scenario 5: Low Stock Detection
**Objective**: Test low stock detection and alerting.

**Setup**: First reduce stock to below minimum level (assume minimum is 50)

**Test Data**:
```json
{
  "product_id": "RM-1001",
  "quantity_requested": 90,
  "measurement_unit": "kg",
  "requested_by": "Charlie",
  "description": "Issue that triggers low stock",
  "submissionId": "issue-003"
}
```

**Expected Flow**:
1. Process issue request and approval
2. Update stock (130 - 90 = 40)
3. Check for low stock (40 < 50, should trigger alert)
4. Send low stock email alert

**Success Criteria**:
- Low stock alert email sent
- Alert contains correct product information and stock levels

## Test Scenario 6: Error Handling - Invalid Data
**Objective**: Test error handling for invalid input data.

**Test Data**:
```json
{
  "product_id": "",
  "quantity_received": -10,
  "measurement_unit": "kg",
  "unit_price": "invalid",
  "submissionId": "error-001"
}
```

**Expected Flow**:
1. Webhook receives invalid data
2. Validation fails in Calculate Total Price node
3. Error thrown and logged
4. Workflow stops gracefully

**Success Criteria**:
- Error properly caught and logged
- No invalid data saved to databases
- Clear error message returned

## Test Scenario 7: Nexus API Integration
**Objective**: Test the Nexus API call after stock updates.

**Setup**: Configure NEXUS_API_URL and NEXUS_API_KEY environment variables

**Expected Flow**:
1. Complete a stock update operation
2. Call Nexus API with updated stock data
3. Handle API response (success/error)

**Success Criteria**:
- API call made with correct parameters
- Response handled appropriately
- Errors logged if API fails

## Test Scenario 8: Retry Logic and Error Recovery
**Objective**: Test retry mechanisms for Google Sheets API failures.

**Setup**: Temporarily make Google Sheets unavailable during test

**Expected Flow**:
1. Attempt Google Sheets operation
2. Operation fails (simulated)
3. Retry with exponential backoff (up to 3 retries)
4. Log error and send notification if all retries fail

**Success Criteria**:
- Retry logic executes correctly
- Appropriate error handling and logging
- User notified of persistent failures
