# Manual Cloud Functions Deployment Guide

This guide explains how to deploy Cloud Functions manually through the Google Firebase Console for the Fairprep deletion request application.

---

## Prerequisites

1. **Google Cloud Project**: `studentkonnectcom`
2. **Firebase Project**: Must be linked to the Google Cloud Project
3. **Service Account Key**: `studentkonnectcom-firebase-adminsdk-fbsvc-1b2b079c13.json`
4. **Cloud Functions Code**: Located in `functions/` directory

---

## Step 1: Access Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. In the top-left corner, click the project dropdown
3. Select project: **`studentkonnectcom`**
4. You should now be in the studentkonnectcom project

---

## Step 2: Navigate to Cloud Functions

1. In the left sidebar, click the **hamburger menu** (☰) if it's collapsed
2. Search for **"Cloud Functions"** in the search bar at the top
3. Click on **Cloud Functions** from the search results
4. You should see the Cloud Functions dashboard

---

## Step 3: Create a New Function

### Option A: Create from Console (Recommended for First Time)

1. Click the **+ CREATE FUNCTION** button
2. Fill in the following details:

   **Environment**: Node.js 20
   
   **Function name**: `api` (or any name you prefer)
   
   **Region**: Select a region close to your users
   - Recommended: `us-central1` or `europe-west1`
   - Or choose based on your location
   
   **Trigger type**: HTTPS
   
   **Authentication**: Require authentication (optional, but recommended)
   
   **Runtime settings** (expand this section):
   - **Memory**: 256 MB (default is fine)
   - **Timeout**: 60 seconds
   - **Environment variables**: Add the following:
     ```
     FP_SUPABASE_URL=https://xududbaqaaffcaejwuix.supabase.co
     FP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1ZHVkYmFxYWFmZmNhZWp3dWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTE4OTQsImV4cCI6MjA2Njg2Nzg5NH0.rMPZCHgDfyho4sUOXNcA1PF4yZ3GFBJxXya_SPcq8fA
     ```

3. Click **NEXT** to proceed to the code editor

---

## Step 4: Add Function Code

### In the Inline Editor

1. You'll see two tabs: **index.js** and **package.json**

2. **Replace the contents of `package.json`** with:

```json
{
  "name": "fairprep-delete-request-functions",
  "version": "1.0.0",
  "description": "Cloud Functions for Fairprep deletion request backend",
  "type": "module",
  "main": "index.js",
  "dependencies": {
    "@supabase/supabase-js": "^2.98.0",
    "express": "^4.21.2",
    "firebase-functions": "^5.0.0",
    "superjson": "^1.13.3"
  },
  "engines": {
    "node": "20"
  }
}
```

3. **Replace the contents of `index.js`** with the code from `functions/index.js` (see below for the full code)

---

## Step 5: Add the Backend Code

Copy the entire code below into the **index.js** editor:

```javascript
import functions from "firebase-functions";
import express from "express";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(express.json());

// Initialize Supabase client with FP_ prefixed environment variables
const supabaseUrl = process.env.FP_SUPABASE_URL;
const supabaseKey = process.env.FP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials. Please set FP_SUPABASE_URL and FP_SUPABASE_ANON_KEY environment variables.");
}

const supabase = createClient(supabaseUrl || "", supabaseKey || "");

/**
 * Submit a deletion request
 * POST /api/deleteRequest/submit
 */
app.post("/api/deleteRequest/submit", async (req, res) => {
  try {
    const { userId, email, reason, otherReasonDetail } = req.body;

    // Validate required fields
    if (!userId || !email || !reason) {
      return res.status(400).json({
        error: "Missing required fields: userId, email, reason",
      });
    }

    // Validate reason
    const validReasons = [
      "I am not interested",
      "I found a better application",
      "It is very expensive",
      "It is slow",
      "It doesn't have features I want",
      "Other reason",
    ];

    if (!validReasons.includes(reason)) {
      return res.status(400).json({
        error: `Invalid reason. Must be one of: ${validReasons.join(", ")}`,
      });
    }

    // If reason is "Other reason", otherReasonDetail is required
    if (reason === "Other reason" && !otherReasonDetail) {
      return res.status(400).json({
        error: "otherReasonDetail is required when reason is 'Other reason'",
      });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("vk_delete_requests")
      .insert([
        {
          user_id: userId,
          user_email: email,
          reason: reason,
          other_reason_detail: otherReasonDetail || null,
          created_at: new Date().toISOString(),
          processed: false,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        error: "Failed to submit deletion request",
        details: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Deletion request submitted successfully",
      data: data[0],
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * Health check endpoint
 * GET /api/health
 */
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    supabaseConnected: !!supabaseUrl && !!supabaseKey,
  });
});

/**
 * Get deletion requests (admin only)
 * GET /api/deleteRequest/list
 * Requires admin authentication
 */
app.get("/api/deleteRequest/list", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("vk_delete_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        error: "Failed to fetch deletion requests",
        details: error.message,
      });
    }

    return res.json({
      success: true,
      count: data.length,
      data: data,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * Mark deletion request as processed
 * PATCH /api/deleteRequest/:id/process
 * Requires admin authentication
 */
app.patch("/api/deleteRequest/:id/process", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "Missing required parameter: id",
      });
    }

    const { data, error } = await supabase
      .from("vk_delete_requests")
      .update({
        processed: true,
        processed_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        error: "Failed to update deletion request",
        details: error.message,
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        error: "Deletion request not found",
      });
    }

    return res.json({
      success: true,
      message: "Deletion request marked as processed",
      data: data[0],
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * Mark deletion request as deleted
 * PATCH /api/deleteRequest/:id/delete
 * Requires admin authentication
 */
app.patch("/api/deleteRequest/:id/delete", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "Missing required parameter: id",
      });
    }

    const { data, error } = await supabase
      .from("vk_delete_requests")
      .update({
        deleted_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        error: "Failed to update deletion request",
        details: error.message,
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        error: "Deletion request not found",
      });
    }

    return res.json({
      success: true,
      message: "Deletion request marked as deleted",
      data: data[0],
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Export the Express app as a Cloud Function
export const api = functions.https.onRequest(app);
```

---

## Step 6: Deploy the Function

1. After pasting the code, click the **DEPLOY** button at the bottom right
2. The deployment will take 2-5 minutes
3. You'll see a progress indicator showing the deployment status
4. Once complete, you'll see a green checkmark and the function URL

---

## Step 7: Get Your Function URL

After deployment completes:

1. The function will appear in the Cloud Functions list
2. Click on the function name (`api`)
3. Go to the **TRIGGER** tab
4. Copy the **Trigger URL** - it will look like:
   ```
   https://REGION-studentkonnectcom.cloudfunctions.net/api
   ```
5. This is your Cloud Function URL

---

## Step 8: Verify Environment Variables

1. Click on the function name to view details
2. Go to the **RUNTIME** tab
3. Scroll down to **Environment variables**
4. Verify both variables are set:
   - `FP_SUPABASE_URL`
   - `FP_SUPABASE_ANON_KEY`

---

## Step 9: Test the Function

### Test Health Check

1. Open your browser and go to:
   ```
   https://REGION-studentkonnectcom.cloudfunctions.net/api/health
   ```
2. You should see:
   ```json
   {
     "status": "ok",
     "timestamp": "2026-03-08T08:30:00.000Z",
     "supabaseConnected": true
   }
   ```

### Test Deletion Request Submission

1. Use a tool like **Postman** or **curl** to test:

```bash
curl -X POST https://REGION-studentkonnectcom.cloudfunctions.net/api/deleteRequest/submit \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "email": "test@example.com",
    "reason": "I am not interested",
    "otherReasonDetail": null
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Deletion request submitted successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "user_email": "test@example.com",
    "reason": "I am not interested",
    "created_at": "2026-03-08T08:30:00.000Z",
    "processed": false
  }
}
```

---

## Step 10: Update Frontend with Function URL

1. The frontend at https://fairprepapp.web.app is already configured to use the Cloud Function endpoint
2. It will automatically call your function when users submit deletion requests
3. Make sure the function URL is accessible from the browser (no CORS issues)

---

## Troubleshooting

### Issue: "Function deployment failed"

**Solution**:
1. Check the error message in the console
2. Verify all code is correctly copied
3. Check that `package.json` has correct dependencies
4. Try deploying again

### Issue: "Environment variables not found"

**Solution**:
1. Go to **RUNTIME** tab
2. Verify both `FP_SUPABASE_URL` and `FP_SUPABASE_ANON_KEY` are set
3. Redeploy the function after adding variables

### Issue: "Cannot connect to Supabase"

**Solution**:
1. Verify Supabase URL is correct: `https://xududbaqaaffcaejwuix.supabase.co`
2. Verify Supabase ANON_KEY is correct
3. Check that Supabase project is active
4. Check Cloud Function logs for errors

### Issue: "RLS policy violation"

**Solution**:
1. Ensure the `vk_delete_requests` table exists in Supabase
2. Verify RLS policies are correctly configured
3. Run the SQL schema script from `DATABASE_SCHEMA.sql`

---

## Monitoring and Logs

### View Function Logs

1. Go to Cloud Functions dashboard
2. Click on your function name (`api`)
3. Go to the **LOGS** tab
4. You'll see all function execution logs
5. Filter by date/time to find specific requests

### View Metrics

1. Go to the **METRICS** tab
2. See:
   - Execution count
   - Average execution time
   - Error rate
   - Memory usage

---

## Update Function Code

If you need to update the function code later:

1. Go to Cloud Functions dashboard
2. Click on your function name
3. Click **EDIT**
4. Update the code in the editor
5. Click **DEPLOY**
6. The new version will be deployed in 2-5 minutes

---

## Delete Function

If you need to delete the function:

1. Go to Cloud Functions dashboard
2. Click the three-dot menu next to your function
3. Click **DELETE**
4. Confirm deletion

---

## Important Notes

- **Cold Start**: First request may take 2-3 seconds (normal for serverless)
- **Warm Requests**: Subsequent requests are typically < 500ms
- **Scaling**: Automatically scales to handle traffic
- **Costs**: Free tier includes 2 million invocations/month
- **Timeout**: Default 60 seconds (adjust in Runtime settings if needed)

---

## Quick Reference

| Item | Value |
|------|-------|
| Project | studentkonnectcom |
| Function Name | api |
| Runtime | Node.js 20 |
| Trigger Type | HTTPS |
| Region | (Your choice) |
| Environment Variable 1 | FP_SUPABASE_URL |
| Environment Variable 2 | FP_SUPABASE_ANON_KEY |

---

## Next Steps

1. ✅ Deploy the Cloud Function using this guide
2. ✅ Get the function URL
3. ✅ Test the health check endpoint
4. ✅ Test the deletion request submission
5. ✅ Frontend will automatically use the function URL
6. ✅ Monitor logs and metrics in Cloud Console

---

**Last Updated**: March 8, 2026
**Project**: studentkonnectcom
**Function Name**: api
