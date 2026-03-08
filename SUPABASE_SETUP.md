# Supabase Setup Guide

This guide explains how to set up the Supabase database for the Fairprep deletion request application.

## Prerequisites

1. **Supabase Account**: Already created
2. **Supabase Project**: `xududbaqaaffcaejwuix`
3. **Database Access**: You have access to the Supabase SQL editor

## Supabase Credentials

Your Supabase credentials are:

```
URL: https://xududbaqaaffcaejwuix.supabase.co
ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1ZHVkYmFxYWFmZmNhZWp3dWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTE4OTQsImV4cCI6MjA2Njg2Nzg5NH0.rMPZCHgDfyho4sUOXNcA1PF4yZ3GFBJxXya_SPcq8fA
```

## Step 1: Create the vk_delete_requests Table

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project: `xududbaqaaffcaejwuix`
3. Go to **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste the entire SQL script below
6. Click **Run**

### SQL Script

```sql
-- Fairprep Data Deletion Request Table Schema
-- This table stores user deletion requests for the Fairprep application

-- Create the vk_delete_requests table
CREATE TABLE public.vk_delete_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  reason TEXT NOT NULL,
  other_reason_detail TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed BOOLEAN DEFAULT FALSE,
  processed_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_vk_delete_requests_user_id 
  ON public.vk_delete_requests(user_id);

CREATE INDEX IF NOT EXISTS idx_vk_delete_requests_user_email 
  ON public.vk_delete_requests(user_email);

CREATE INDEX IF NOT EXISTS idx_vk_delete_requests_created_at 
  ON public.vk_delete_requests(created_at);

CREATE INDEX IF NOT EXISTS idx_vk_delete_requests_processed 
  ON public.vk_delete_requests(processed);

-- Enable Row Level Security (RLS)
ALTER TABLE public.vk_delete_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow users to view their own deletion requests
CREATE POLICY "Users can view their own deletion requests" 
  ON public.vk_delete_requests 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- RLS Policy: Allow users to insert their own deletion requests
CREATE POLICY "Users can insert their own deletion requests" 
  ON public.vk_delete_requests 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Allow service role (admin) to view all deletion requests
CREATE POLICY "Service role can view all deletion requests" 
  ON public.vk_delete_requests 
  FOR SELECT 
  USING (auth.jwt() ->> 'role' = 'service_role');

-- RLS Policy: Allow service role to update deletion requests
CREATE POLICY "Service role can update deletion requests" 
  ON public.vk_delete_requests 
  FOR UPDATE 
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Add comments for documentation
COMMENT ON TABLE public.vk_delete_requests IS 'Stores user deletion requests for Fairprep application';
COMMENT ON COLUMN public.vk_delete_requests.id IS 'Unique identifier for the deletion request';
COMMENT ON COLUMN public.vk_delete_requests.user_id IS 'Foreign key reference to auth.users table';
COMMENT ON COLUMN public.vk_delete_requests.user_email IS 'Email address of the user requesting deletion';
COMMENT ON COLUMN public.vk_delete_requests.reason IS 'Reason selected by the user for deletion';
COMMENT ON COLUMN public.vk_delete_requests.other_reason_detail IS 'Additional details if "Other reason" was selected';
COMMENT ON COLUMN public.vk_delete_requests.created_at IS 'Timestamp when the deletion request was created';
COMMENT ON COLUMN public.vk_delete_requests.processed IS 'Flag indicating if the deletion has been processed';
COMMENT ON COLUMN public.vk_delete_requests.processed_at IS 'Timestamp when the deletion was processed';
COMMENT ON COLUMN public.vk_delete_requests.deleted_at IS 'Timestamp when the user data was actually deleted';
```

## Step 2: Verify Table Creation

After running the SQL script:

1. Go to **Table Editor** in the left sidebar
2. You should see `vk_delete_requests` in the table list
3. Click on it to view the table structure
4. Verify all columns are present:
   - `id` (UUID, Primary Key)
   - `user_id` (UUID, Foreign Key to auth.users)
   - `user_email` (Text)
   - `reason` (Text)
   - `other_reason_detail` (Text, nullable)
   - `created_at` (Timestamp with timezone)
   - `processed` (Boolean, default: false)
   - `processed_at` (Timestamp with timezone, nullable)
   - `deleted_at` (Timestamp with timezone, nullable)

## Step 3: Enable Row Level Security (RLS)

RLS is already enabled by the SQL script. To verify:

1. Go to **Authentication** → **Policies** in the left sidebar
2. Select the `vk_delete_requests` table
3. You should see 4 policies:
   - "Users can view their own deletion requests"
   - "Users can insert their own deletion requests"
   - "Service role can view all deletion requests"
   - "Service role can update deletion requests"

## Step 4: Test the Setup

### Create a Test User

1. Go to **Authentication** → **Users** in the left sidebar
2. Click **Add user**
3. Enter an email and password
4. Click **Create user**

### Test Insertion

1. Go to **SQL Editor**
2. Run this query to insert a test deletion request:

```sql
INSERT INTO public.vk_delete_requests (
  user_id, 
  user_email, 
  reason
) VALUES (
  'YOUR_USER_ID_HERE',
  'test@example.com',
  'I am not interested'
);
```

Replace `YOUR_USER_ID_HERE` with the user ID from the test user you created.

3. Go to **Table Editor** → **vk_delete_requests**
4. You should see the test record

## Step 5: Configure Environment Variables

Make sure your environment variables are set correctly:

### For Frontend (Firebase Hosting)
```
VITE_SUPABASE_URL=https://xududbaqaaffcaejwuix.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1ZHVkYmFxYWFmZmNhZWp3dWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTE4OTQsImV4cCI6MjA2Njg2Nzg5NH0.rMPZCHgDfyho4sUOXNcA1PF4yZ3GFBJxXya_SPcq8fA
```

### For Cloud Functions
```
SUPABASE_URL=https://xududbaqaaffcaejwuix.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1ZHVkYmFxYWFmZmNhZWp3dWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTE4OTQsImV4cCI6MjA2Njg2Nzg5NH0.rMPZCHgDfyho4sUOXNcA1PF4yZ3GFBJxXya_SPcq8fA
```

## Troubleshooting

### Issue: "Table already exists"

If you get an error that the table already exists, you can either:

1. **Drop and recreate** (if you don't need existing data):
```sql
DROP TABLE IF EXISTS public.vk_delete_requests CASCADE;
-- Then run the creation script above
```

2. **Skip table creation** and just add missing policies/indexes

### Issue: "RLS policies not working"

1. Verify RLS is enabled on the table:
```sql
SELECT relname, relrowsecurity FROM pg_class WHERE relname = 'vk_delete_requests';
```

2. Check policies:
```sql
SELECT * FROM pg_policies WHERE tablename = 'vk_delete_requests';
```

### Issue: "Foreign key constraint failed"

This means the `user_id` doesn't exist in `auth.users`. Make sure:
1. The user is created in Supabase Authentication
2. You're using the correct user ID (UUID format)

## Data Management

### View All Deletion Requests

```sql
SELECT * FROM public.vk_delete_requests ORDER BY created_at DESC;
```

### View Unprocessed Requests

```sql
SELECT * FROM public.vk_delete_requests 
WHERE processed = FALSE 
ORDER BY created_at DESC;
```

### Mark as Processed

```sql
UPDATE public.vk_delete_requests 
SET processed = TRUE, processed_at = NOW() 
WHERE id = 'REQUEST_ID_HERE';
```

### Delete User Data (GDPR Compliance)

```sql
UPDATE public.vk_delete_requests 
SET deleted_at = NOW() 
WHERE id = 'REQUEST_ID_HERE';
```

## Backup and Recovery

### Export Data

1. Go to **SQL Editor**
2. Run: `SELECT * FROM public.vk_delete_requests;`
3. Click the download icon to export as CSV

### Restore Data

1. Go to **SQL Editor**
2. Use the import feature to restore from CSV

## Security Best Practices

1. **Never share your ANON_KEY publicly** - It's used in the frontend but should only access public data
2. **Use SERVICE_ROLE_KEY for admin operations** - Keep this secret and only use on the backend
3. **Monitor RLS policies** - Regularly review who can access what data
4. **Enable backups** - Supabase automatically backs up your data daily
5. **Audit logs** - Enable audit logs to track all database changes

## Next Steps

1. Run the SQL script in Supabase SQL Editor
2. Verify the table is created
3. Deploy Cloud Functions with Supabase credentials
4. Test the deletion request flow end-to-end
5. Monitor the database for incoming requests
