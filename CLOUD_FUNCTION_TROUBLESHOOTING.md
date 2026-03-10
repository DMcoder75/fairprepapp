# Cloud Function Troubleshooting Guide

## Issue: Cloud Function Returning HTML Error Page

If your Cloud Function is returning HTML error pages instead of JSON responses, follow these troubleshooting steps.

---

## Diagnostic Information

**Cloud Function URL**: https://us-central1-studentkonnectcom.cloudfunctions.net/api

**Expected Response Format**: JSON
```json
{
  "status": "ok",
  "timestamp": "2026-03-08T...",
  "supabaseConnected": true
}
```

**Actual Response**: HTML error page

---

## Common Issues & Solutions

### 1. CORS (Cross-Origin Resource Sharing) Issue

**Symptom**: Browser console shows CORS error, or Cloud Function returns 403 Forbidden

**Solution**:
1. Go to Google Cloud Console → Cloud Functions
2. Click on your function (`api`)
3. Go to **RUNTIME** tab
4. Update the code to add CORS headers:

```javascript
// Add this at the top of your Express app
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
```

5. Redeploy the function

---

### 2. Function Not Properly Deployed

**Symptom**: Function appears deployed but returns errors

**Solution**:
1. Go to Google Cloud Console → Cloud Functions
2. Click on your function
3. Go to **LOGS** tab
4. Look for error messages
5. Common issues:
   - Missing environment variables
   - Dependency installation failed
   - Syntax errors in code

**To redeploy**:
1. Click **EDIT**
2. Verify all code is correct
3. Check `package.json` dependencies
4. Click **DEPLOY**
5. Wait for deployment to complete (2-5 minutes)

---

### 3. Environment Variables Not Set

**Symptom**: Function runs but returns error about missing Supabase credentials

**Solution**:
1. Go to Cloud Functions → Your function
2. Go to **RUNTIME** tab
3. Scroll to **Environment variables**
4. Verify both variables are set:
   - `FP_SUPABASE_URL=https://xududbaqaaffcaejwuix.supabase.co`
   - `FP_SUPABASE_ANON_KEY=your_key_here`
5. If missing, add them and redeploy

---

### 4. Function Timeout

**Symptom**: Request takes too long and times out

**Solution**:
1. Go to Cloud Functions → Your function
2. Go to **RUNTIME** tab
3. Increase **Timeout** from 60 to 120 seconds
4. Click **DEPLOY**

---

### 5. Authentication Required

**Symptom**: Function requires authentication but frontend doesn't provide it

**Solution**:
1. Go to Cloud Functions → Your function
2. Go to **TRIGGER** tab
3. Check **Authentication** setting:
   - If set to "Require authentication", change to "Allow unauthenticated invocations"
   - Or add authentication headers to frontend requests

---

## Testing the Cloud Function

### Using curl from terminal:

```bash
# Test health check
curl -X GET https://us-central1-studentkonnectcom.cloudfunctions.net/api/health

# Test deletion request
curl -X POST https://us-central1-studentkonnectcom.cloudfunctions.net/api/deleteRequest/submit \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test-123",
    "email": "test@example.com",
    "reason": "I am not interested"
  }'
```

### Using the test script:

```bash
cd /home/ubuntu/fairprep-delete-request
node test-cloud-function.mjs
```

---

## Checking Cloud Function Logs

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select project: **studentkonnectcom**
3. Go to **Cloud Functions**
4. Click on your function name (`api`)
5. Go to **LOGS** tab
6. Look for recent errors
7. Filter by date/time to find specific requests

---

## Verifying Supabase Connection

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select project: **xududbaqaaffcaejwuix**
3. Go to **SQL Editor**
4. Run this query:
   ```sql
   SELECT COUNT(*) as table_count FROM information_schema.tables 
   WHERE table_schema = 'public' AND table_name = 'vk_delete_requests';
   ```
5. Should return `1` if table exists

---

## Step-by-Step Redeploy

If nothing else works, redeploy from scratch:

1. Go to Google Cloud Console → Cloud Functions
2. Click on your function
3. Click **DELETE** (⚠️ This will delete the function)
4. Confirm deletion
5. Click **+ CREATE FUNCTION**
6. Follow the manual deployment guide in `MANUAL_CLOUD_FUNCTIONS_DEPLOYMENT.md`

---

## Quick Checklist

- [ ] Cloud Function is deployed and shows as "active" (green checkmark)
- [ ] Environment variables are set: `FP_SUPABASE_URL` and `FP_SUPABASE_ANON_KEY`
- [ ] Timeout is set to at least 60 seconds
- [ ] Authentication is set to "Allow unauthenticated invocations"
- [ ] CORS headers are configured in the Express app
- [ ] Supabase table `vk_delete_requests` exists
- [ ] Health check endpoint returns JSON (not HTML)
- [ ] Deletion request endpoint accepts POST requests

---

## Getting Help

If you're still having issues:

1. **Check Cloud Function Logs** - Go to Cloud Functions → Logs tab
2. **Check Supabase Logs** - Go to Supabase → Database → Logs
3. **Test with curl** - Use the curl commands above to test endpoints
4. **Verify credentials** - Double-check Supabase URL and ANON_KEY are correct
5. **Check network** - Ensure your network allows outbound HTTPS requests

---

## Contact Support

If you need help:
1. Share the error message from Cloud Function logs
2. Share the response from the health check endpoint
3. Verify Supabase credentials are correct
4. Check that the `vk_delete_requests` table exists in Supabase

---

**Last Updated**: March 8, 2026
**Cloud Function URL**: https://us-central1-studentkonnectcom.cloudfunctions.net/api
