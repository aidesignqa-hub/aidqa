# Supabase Cron Job Setup

This guide explains how to set up the scheduled monitoring job in Supabase.

## Overview

The `/cron/tick` endpoint automatically runs visual regression tests for all enabled monitors. It must be called periodically (recommended: every 24 hours) to ensure continuous monitoring.

## Current Implementation

The `POST /cron/tick` endpoint:
- ✅ Selects all enabled monitors from the `monitors` table
- ✅ Calls `runMonitor(monitorId)` for each monitor
- ✅ Captures screenshots and compares against baselines
- ✅ Inserts new runs into `visual_runs` table
- ✅ Runs AI analysis asynchronously (non-blocking)
- ✅ Returns summary of processed monitors

## Setup in Supabase Dashboard

### Option 1: Using Supabase Scheduled Functions (Recommended)

1. **Navigate to Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project: `eboaqtbktyaxzrbcntzy`

2. **Access Database Webhooks**
   - Click on "Database" in the left sidebar
   - Select "Webhooks"

3. **Create New Webhook**
   - Click "+ Create a new webhook"
   - **Name**: `Monitor Cron Job`
   - **Table**: Leave empty (manual trigger)
   - **Events**: Leave unchecked (manual trigger)
   - **Type**: `HTTP Request`
   - **Method**: `POST`
   - **URL**: `https://eboaqtbktyaxzrbcntzy.supabase.co/functions/v1/visual-api/cron/tick`
   - **Headers**: 
     ```
     Authorization: Bearer [YOUR_SERVICE_ROLE_KEY]
     Content-Type: application/json
     ```
   - **Schedule**: `0 0 * * *` (daily at midnight UTC)

4. **Test the Webhook**
   - Click "Send test webhook"
   - Verify response shows processed monitors

### Option 2: Using pg_cron Extension

1. **Enable pg_cron Extension**
   ```sql
   -- Run in SQL Editor
   CREATE EXTENSION IF NOT EXISTS pg_cron;
   ```

2. **Create Cron Job**
   ```sql
   -- Schedule daily at midnight UTC
   SELECT cron.schedule(
     'monitor-visual-regression',
     '0 0 * * *',
     $$
     SELECT net.http_post(
       url := 'https://eboaqtbktyaxzrbcntzy.supabase.co/functions/v1/visual-api/cron/tick',
       headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.settings.service_role_key') || '"}'::jsonb
     );
     $$
   );
   ```

3. **Verify Job is Scheduled**
   ```sql
   SELECT * FROM cron.job;
   ```

### Option 3: External Cron Service (GitHub Actions)

Create `.github/workflows/cron-monitor.yml`:

```yaml
name: Visual Regression Monitoring

on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight UTC
  workflow_dispatch:  # Allow manual trigger

jobs:
  run-monitors:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Cron Endpoint
        run: |
          curl -X POST \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}" \
            https://eboaqtbktyaxzrbcntzy.supabase.co/functions/v1/visual-api/cron/tick
```

Add `SUPABASE_SERVICE_ROLE_KEY` to GitHub repository secrets.

## Monitoring Cadence Options

Individual monitors can run at different frequencies:

- **Hourly**: For critical pages (e.g., checkout, auth)
- **Daily**: For most pages (default)

The cron job runs all enabled monitors on each execution. For hourly monitoring, set up an additional hourly cron job.

## Testing

Test the endpoint manually:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  https://eboaqtbktyaxzrbcntzy.supabase.co/functions/v1/visual-api/cron/tick
```

Expected response:
```json
{
  "processed": 3,
  "succeeded": 3,
  "failed": 0,
  "runs": [
    {
      "monitorId": "abc123",
      "runId": "def456",
      "status": "success",
      "mismatchPercentage": 0.42,
      "aiStatus": "skipped"
    }
  ]
}
```

## Troubleshooting

### No monitors processed
- Verify monitors exist: `SELECT * FROM monitors WHERE enabled = true;`
- Check monitor has approved baseline: `SELECT * FROM design_baselines WHERE approved = true;`

### Cron not running
- Verify webhook is enabled in Supabase Dashboard
- Check pg_cron job status: `SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 10;`
- Review Edge Function logs in Supabase Dashboard

### High failure rate
- Check Browserless API key is valid
- Verify target URLs are accessible
- Review individual run errors in `visual_runs` table

## Next Steps

After setting up the cron job:

1. Create at least one monitor
2. Wait for the next scheduled run (or trigger manually)
3. Check the Dashboard to see latest run results
4. Review run details by clicking on a monitor
