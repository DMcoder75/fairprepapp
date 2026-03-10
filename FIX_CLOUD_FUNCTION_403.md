# Fix: Cloud Function 403 Forbidden Error

## Problem

The Cloud Function is returning **403 Forbidden** errors because it requires authentication but the frontend is not providing it.

## Root Cause

When you deployed the Cloud Function in Google Cloud Console, the **Authentication** setting was likely set to **"Require authentication"**. This blocks unauthenticated requests from the frontend.

## Solution

You have **TWO options**:

---

## Option 1: Allow Unauthenticated Access (Recommended for Public APIs)

This is the simplest solution for a public deletion request form.

### Steps:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select project: **studentkonnectcom**
3. Go to **Cloud Functions**
4. Click on your function: **api**
5. Click **EDIT** button
6. Go to **RUNTIME SETTINGS** (expand the section)
7. Look for **Authentication** dropdown
8. Change from "Require authentication" to **"Allow unauthenticated invocations"**
9. Click **DEPLOY**
10. Wait 2-5 minutes for deployment to complete

### Verification:

Run the test again:
```bash
cd /home/ubuntu/fairprep-delete-request
node test-cf-detailed.mjs
```

You should see:
```
✅ Response is valid JSON:
{
  "status": "ok",
  "timestamp": "2026-03-08T...",
  "supabaseConnected": true
}
```

---

## Option 2: Update Cloud Function Code with CORS Support

If you want to keep authentication enabled, update the function code with CORS headers.

### Steps:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select project: **studentkonnectcom**
3. Go to **Cloud Functions**
4. Click on your function: **api**
5. Click **EDIT** button
6. Go to the **index.js** tab
7. **Replace the entire code** with the updated code from `functions/index-updated.js` (see below)
8. Click **DEPLOY**
9. Wait 2-5 minutes for deployment to complete

### Updated Code:

The updated code includes:
- ✅ CORS headers for cross-origin requests
- ✅ Proper error handling
- ✅ Logging for debugging
- ✅ Preflight request handling (OPTIONS method)
- ✅ Better error messages

**Copy the entire code from `functions/index-updated.js` into your Cloud Function editor.**

---

## What Changed in Updated Code

### 1. CORS Middleware Added:
```javascript
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

### 2. Better Error Handling:
```javascript
if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials!");
  console.error("   FP_SUPABASE_URL:", supabaseUrl ? "✅ Set" : "❌ Missing");
  console.error("   FP_SUPABASE_ANON_KEY:", supabaseKey ? "✅ Set" : "❌ Missing");
}
```

### 3. Improved Logging:
```javascript
console.log("📝 Deletion request received");
console.log("💾 Inserting into Supabase...");
console.log("✅ Deletion request submitted successfully:", data[0]?.id);
```

---

## Recommended: Option 1 + Updated Code

For best results:

1. **First**, allow unauthenticated access (Option 1)
2. **Then**, update the code with CORS support (Option 2)

This gives you:
- ✅ Public API access (no auth required)
- ✅ CORS support for cross-origin requests
- ✅ Better error handling and logging
- ✅ Proper preflight request handling

---

## Testing After Fix

### Test 1: Health Check
```bash
curl https://us-central1-studentkonnectcom.cloudfunctions.net/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-03-08T...",
  "supabaseConnected": true,
  "environment": {
    "supabaseUrl": "✅ Set",
    "supabaseKey": "✅ Set"
  }
}
```

### Test 2: Deletion Request
```bash
curl -X POST https://us-central1-studentkonnectcom.cloudfunctions.net/api/deleteRequest/submit \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "email": "test@example.com",
    "reason": "I am not interested"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Deletion request submitted successfully",
  "data": {
    "id": "...",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "user_email": "test@example.com",
    "reason": "I am not interested",
    "created_at": "2026-03-08T...",
    "processed": false
  }
}
```

### Test 3: Using Node.js Test Script
```bash
cd /home/ubuntu/fairprep-delete-request
node test-cf-detailed.mjs
```

---

## Troubleshooting

### Still Getting 403 Forbidden?

1. **Check Authentication Setting**:
   - Go to Cloud Functions → Your function → TRIGGER tab
   - Verify "Allow unauthenticated invocations" is selected

2. **Check Deployment Status**:
   - Go to Cloud Functions → Your function
   - Look for green checkmark (✅) indicating successful deployment
   - If still deploying, wait 2-5 minutes

3. **Clear Browser Cache**:
   - The browser might be caching the 403 response
   - Open a new incognito/private window and test again

4. **Check Cloud Function Logs**:
   - Go to Cloud Functions → Your function → LOGS tab
   - Look for error messages
   - Share the logs if you need help

---

## Quick Checklist

- [ ] Cloud Function is deployed (green checkmark visible)
- [ ] Authentication is set to "Allow unauthenticated invocations"
- [ ] Environment variables are set: `FP_SUPABASE_URL` and `FP_SUPABASE_ANON_KEY`
- [ ] Health check returns JSON (not HTML error)
- [ ] Deletion request endpoint accepts POST requests
- [ ] Supabase table `vk_delete_requests` exists
- [ ] Frontend can call Cloud Function without errors

---

## Next Steps

1. **Apply the fix** (Option 1 or Option 2)
2. **Test the Cloud Function** using the test script
3. **Verify frontend** can submit deletion requests
4. **Check Supabase** to see if requests are being saved

---

**Last Updated**: March 8, 2026
**Cloud Function URL**: https://us-central1-studentkonnectcom.cloudfunctions.net/api
**Status**: Needs Fix
