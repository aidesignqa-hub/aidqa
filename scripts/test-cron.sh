#!/bin/bash

# Test script for /cron/tick endpoint
# Usage: ./test-cron.sh [SUPABASE_SERVICE_ROLE_KEY]

set -e

# Configuration
PROJECT_URL="https://eboaqtbktyaxzrbcntzy.supabase.co"
ENDPOINT="/functions/v1/visual-api/cron/tick"

# Check if service role key is provided
if [ -z "$1" ]; then
  echo "Error: Service role key required"
  echo "Usage: ./test-cron.sh YOUR_SERVICE_ROLE_KEY"
  exit 1
fi

SERVICE_ROLE_KEY="$1"

echo "Testing cron endpoint at: ${PROJECT_URL}${ENDPOINT}"
echo ""

# Make request
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${SERVICE_ROLE_KEY}" \
  "${PROJECT_URL}${ENDPOINT}")

# Extract HTTP status code (last line)
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo "HTTP Status: $HTTP_CODE"
echo "Response Body:"
echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"

if [ "$HTTP_CODE" = "200" ]; then
  echo ""
  echo "✅ Cron endpoint working correctly!"
  
  # Parse and display summary
  PROCESSED=$(echo "$BODY" | jq -r '.processed' 2>/dev/null || echo "N/A")
  SUCCEEDED=$(echo "$BODY" | jq -r '.succeeded' 2>/dev/null || echo "N/A")
  FAILED=$(echo "$BODY" | jq -r '.failed' 2>/dev/null || echo "N/A")
  
  echo ""
  echo "Summary:"
  echo "  Processed: $PROCESSED"
  echo "  Succeeded: $SUCCEEDED"
  echo "  Failed: $FAILED"
else
  echo ""
  echo "❌ Cron endpoint failed with status $HTTP_CODE"
  exit 1
fi
