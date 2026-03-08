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
