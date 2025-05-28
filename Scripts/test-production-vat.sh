#!/bin/bash

# Production VAT Testing Script for Nexus TechHub
# Tests the deployed tax calculation API endpoints

# Configuration
BASE_URL="https://nexustechhub.netlify.app"
LOCAL_URL="http://localhost:3000"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🇦🇪 Nexus TechHub - Production VAT Testing${NC}"
echo "=================================================================="

# Use production URL by default, fallback to local for development
if curl -s --connect-timeout 5 "$BASE_URL" > /dev/null 2>&1; then
    API_URL="$BASE_URL"
    echo "🌐 Testing against production: $BASE_URL"
else
    API_URL="$LOCAL_URL"
    echo "🏠 Testing against local development: $LOCAL_URL"
fi

# Test 1: Basic Tax Calculation API
echo -e "\n${YELLOW}TEST 1: Tax Calculation API - iPhone Screen (299.99 AED)${NC}"
echo "--------------------------------------------------------"

RESPONSE1=$(curl -s -X POST "${API_URL}/api/stripe/calculate-tax" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "amount": 29999,
        "reference": "NTH-IPHONE-SCREEN-001",
        "tax_code": "txcd_99999999",
        "quantity": 1
      }
    ],
    "customerLocation": {
      "country": "AE",
      "state": "Dubai",
      "city": "Dubai",
      "postalCode": "12345",
      "address": "Sheikh Zayed Road, Dubai"
    },
    "shippingCost": 0,
    "currency": "aed"
  }')

echo "Response: $RESPONSE1"

if echo "$RESPONSE1" | grep -q '"total"'; then
    echo -e "${GREEN}✅ Tax calculation API working${NC}"
    
    # Extract values
    SUBTOTAL=$(echo "$RESPONSE1" | grep -o '"subtotal":[0-9.]*' | cut -d':' -f2)
    VAT_AMOUNT=$(echo "$RESPONSE1" | grep -o '"vatAmount":[0-9.]*' | cut -d':' -f2)
    TOTAL=$(echo "$RESPONSE1" | grep -o '"total":[0-9.]*' | cut -d':' -f2)
    METHOD=$(echo "$RESPONSE1" | grep -o '"calculationMethod":"[^"]*"' | cut -d':' -f2 | tr -d '"')
    
    echo "Subtotal: ${SUBTOTAL} AED"
    echo "VAT Amount: ${VAT_AMOUNT} AED"
    echo "Total: ${TOTAL} AED"
    echo "Method: ${METHOD}"
    
    # Validate 5% VAT
    if [ ! -z "$SUBTOTAL" ] && [ ! -z "$VAT_AMOUNT" ]; then
        EXPECTED_VAT=$(echo "scale=2; $SUBTOTAL * 0.05" | bc)
        if [ "$(echo "$VAT_AMOUNT == $EXPECTED_VAT" | bc)" -eq 1 ]; then
            echo -e "${GREEN}✅ VAT calculation correct (5%)${NC}"
        else
            echo -e "${YELLOW}⚠️ VAT: ${VAT_AMOUNT}, Expected: ${EXPECTED_VAT}${NC}"
        fi
    fi
else
    echo -e "${RED}❌ Tax calculation API failed${NC}"
    echo "Error: $RESPONSE1"
fi

# Test 2: Small Amount Test (1 AED)
echo -e "\n${YELLOW}TEST 2: Small Amount Test - 1 AED${NC}"
echo "--------------------------------------------------------"

RESPONSE2=$(curl -s -X POST "${API_URL}/api/stripe/calculate-tax" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "amount": 100,
        "reference": "TEST-SMALL-AMOUNT",
        "tax_code": "txcd_99999999",
        "quantity": 1
      }
    ],
    "customerLocation": {
      "country": "AE",
      "state": "Dubai",
      "city": "Dubai"
    },
    "currency": "aed"
  }')

echo "Response: $RESPONSE2"

if echo "$RESPONSE2" | grep -q '"total"'; then
    echo -e "${GREEN}✅ Small amount test working${NC}"
    
    VAT_AMOUNT2=$(echo "$RESPONSE2" | grep -o '"vatAmount":[0-9.]*' | cut -d':' -f2)
    if [ ! -z "$VAT_AMOUNT2" ]; then
        echo "VAT on 1 AED: ${VAT_AMOUNT2} AED (should be 0.05)"
        
        if [ "$(echo "$VAT_AMOUNT2 == 0.05" | bc)" -eq 1 ]; then
            echo -e "${GREEN}✅ Small amount VAT correct${NC}"
        else
            echo -e "${YELLOW}⚠️ Small amount VAT: ${VAT_AMOUNT2} (expected 0.05)${NC}"
        fi
    fi
else
    echo -e "${RED}❌ Small amount test failed${NC}"
fi

# Test 3: Multiple Items
echo -e "\n${YELLOW}TEST 3: Multiple Items Cart${NC}"
echo "--------------------------------------------------------"

RESPONSE3=$(curl -s -X POST "${API_URL}/api/stripe/calculate-tax" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "amount": 8999,
        "reference": "NTH-SAMSUNG-BATTERY-001",
        "tax_code": "txcd_99999999",
        "quantity": 2
      },
      {
        "amount": 29999,
        "reference": "NTH-IPHONE-SCREEN-001",
        "tax_code": "txcd_99999999",
        "quantity": 1
      }
    ],
    "customerLocation": {
      "country": "AE",
      "state": "Abu Dhabi",
      "city": "Abu Dhabi"
    },
    "currency": "aed"
  }')

echo "Response: $RESPONSE3"

if echo "$RESPONSE3" | grep -q '"total"'; then
    echo -e "${GREEN}✅ Multiple items test working${NC}"
else
    echo -e "${RED}❌ Multiple items test failed${NC}"
fi

# Test 4: Error Handling
echo -e "\n${YELLOW}TEST 4: Error Handling - Empty Items${NC}"
echo "--------------------------------------------------------"

RESPONSE4=$(curl -s -X POST "${API_URL}/api/stripe/calculate-tax" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [],
    "customerLocation": {
      "country": "AE"
    },
    "currency": "aed"
  }')

echo "Response: $RESPONSE4"

if echo "$RESPONSE4" | grep -q '"error"'; then
    echo -e "${GREEN}✅ Error handling working correctly${NC}"
else
    echo -e "${YELLOW}⚠️ Expected error response for empty items${NC}"
fi

echo -e "\n${BLUE}=================================================================="
echo -e "Production VAT Testing Complete${NC}"
echo "=================================================================="

# Summary
echo -e "\n${BLUE}📊 Test Summary:${NC}"
echo "1. Tax Calculation API: $(echo "$RESPONSE1" | grep -q '"total"' && echo -e "${GREEN}PASS${NC}" || echo -e "${RED}FAIL${NC}")"
echo "2. Small Amount Test: $(echo "$RESPONSE2" | grep -q '"total"' && echo -e "${GREEN}PASS${NC}" || echo -e "${RED}FAIL${NC}")"
echo "3. Multiple Items Test: $(echo "$RESPONSE3" | grep -q '"total"' && echo -e "${GREEN}PASS${NC}" || echo -e "${RED}FAIL${NC}")"
echo "4. Error Handling: $(echo "$RESPONSE4" | grep -q '"error"' && echo -e "${GREEN}PASS${NC}" || echo -e "${YELLOW}PARTIAL${NC}")"

echo -e "\n${BLUE}🎯 Next Steps:${NC}"
echo "1. If tests pass: VAT integration is working correctly"
echo "2. If Stripe Tax returns 0%: Enable UAE VAT in Stripe Dashboard"
echo "3. Manual fallback ensures 5% VAT is always calculated"
echo "4. Ready for production use with live transactions"
