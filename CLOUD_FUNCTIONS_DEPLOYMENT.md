# Cloud Functions Deployment Guide

This guide explains how to deploy the backend Cloud Functions to Google Cloud Functions for the Fairprep deletion request application.

## Overview

The backend is an Express.js server that handles deletion request submissions and stores them in Supabase. It's designed to run as a Google Cloud Function.

## Prerequisites

1. **Google Cloud Project**: `studentkonnectcom` (already set up)
2. **Firebase CLI**: Already installed in the sandbox
3. **Supabase Credentials**: You'll need your Supabase URL and ANON_KEY
4. **Service Account Key**: `studentkonnectcom-firebase-adminsdk-fbsvc-1b2b079c13.json`

## Deployment Steps

### Step 1: Set Up Environment Variables

In Google Cloud Console, set the following environment variables for your Cloud Function:

```
SUPABASE_URL=https://xududbaqaaffcaejwuix.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1ZHVkYmFxYWFmZmNhZWp3dWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTE4OTQsImV4cCI6MjA2Njg2Nzg5NH0.rMPZCHgDfyho4sUOXNcA1PF4yZ3GFBJxXya_SPcq8fA
```

### Step 2: Deploy Cloud Functions

Run the following command from the project root:

```bash
GOOGLE_APPLICATION_CREDENTIALS=firebase-adminsdk-studentkonnect.json firebase deploy --project studentkonnectcom --only functions
```

This will:
- Deploy the Express.js server as a Cloud Function
- Set up the HTTP trigger
- Configure the environment variables

### Step 3: Get Your Cloud Function URL

After deployment, Firebase will provide you with a function URL. It will look like:

```
https://REGION-studentkonnectcom.cloudfunctions.net/api
```

### Step 4: Update Frontend Configuration

Update the frontend environment variables to point to your Cloud Function:

In `client/src/lib/supabase.ts` or your environment configuration, update the API endpoint:

```javascript
const API_ENDPOINT = "https://REGION-studentkonnectcom.cloudfunctions.net/api";
```

## API Endpoints

### 1. Submit Deletion Request

**Endpoint**: `POST /api/deleteRequest/submit`

**Request Body**:
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "reason": "I am not interested",
  "otherReasonDetail": null
}
```

**Response**:
```json
{
  "success": true,
  "message": "Deletion request submitted successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "user_email": "user@example.com",
    "reason": "I am not interested",
    "other_reason_detail": null,
    "created_at": "2026-03-08T04:30:00Z",
    "processed": false
  }
}
```

### 2. Health Check

**Endpoint**: `GET /api/health`

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2026-03-08T04:30:00Z"
}
```

### 3. List Deletion Requests (Admin)

**Endpoint**: `GET /api/deleteRequest/list`

**Response**:
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "user_email": "user@example.com",
      "reason": "I am not interested",
      "created_at": "2026-03-08T04:30:00Z",
      "processed": false
    }
  ]
}
```

### 4. Mark Request as Processed (Admin)

**Endpoint**: `PATCH /api/deleteRequest/:id/process`

**Response**:
```json
{
  "success": true,
  "message": "Deletion request marked as processed",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "processed": true,
    "processed_at": "2026-03-08T04:35:00Z"
  }
}
```

## Troubleshooting

### Issue: "Missing Supabase credentials"

**Solution**: Ensure environment variables are set in Cloud Functions settings:
1. Go to Google Cloud Console
2. Navigate to Cloud Functions
3. Click on your function
4. Edit the function
5. Expand "Runtime settings"
6. Add environment variables: `SUPABASE_URL` and `SUPABASE_ANON_KEY`

### Issue: "CORS errors"

**Solution**: The Cloud Function automatically handles CORS for requests from Firebase Hosting. If you need additional origins, update the CORS configuration in `functions/index.js`.

### Issue: "Supabase connection failed"

**Solution**: 
1. Verify Supabase credentials are correct
2. Check that your Supabase project is active
3. Ensure the `vk_delete_requests` table exists (see SUPABASE_SETUP.md)

## Monitoring

To view Cloud Function logs:

```bash
firebase functions:log --project studentkonnectcom
```

Or in Google Cloud Console:
1. Go to Cloud Functions
2. Click on your function
3. Go to "Logs" tab

## Scaling

By default, Cloud Functions auto-scale. If you need to adjust settings:

1. Go to Google Cloud Console
2. Navigate to Cloud Functions
3. Edit your function
4. Adjust "Memory" and "Timeout" in Runtime settings
5. Deploy changes

## Cost Optimization

- Cloud Functions are free up to 2 million invocations per month
- Each invocation costs $0.40 per million after that
- Monitor usage in Google Cloud Console Billing section

## Next Steps

1. Deploy the Cloud Functions using the command above
2. Get the function URL from the deployment output
3. Update frontend configuration with the Cloud Function URL
4. Test the deletion request flow end-to-end
5. Set up monitoring and alerts in Google Cloud Console
