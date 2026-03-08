# Fairprep Delete Request - Project TODO

## Phase 1: Setup & Configuration
- [x] Configure Supabase credentials (URL and ANON_KEY)
- [x] Upload Fairprep logo to CDN and get URL
- [x] Create vk_delete_requests table schema in Supabase
- [x] Set up environment variables for Supabase

## Phase 2: Authentication
- [x] Build Supabase auth client module
- [x] Implement email/password login
- [x] Implement JWT token verification for pre-authenticated users
- [x] Create Login page component
- [x] Add logout functionality

## Phase 3: Deletion Request Form
- [x] Build multi-step form component
- [x] Implement checkbox confirmation (step 1)
- [x] Implement reason selection with 6 options (step 2)
- [x] Add conditional text input for "Other reason"
- [x] Add Fairprep branding (logo, colors, typography)
- [x] Style with bluish purple, dark purple, white text

## Phase 4: Submission & Storage
- [x] Create tRPC procedure to insert deletion request into vk_delete_requests
- [x] Wire form submission to database
- [x] Build Confirmation/Summary page
- [x] Display success message after submission

## Phase 5: Testing & Polish
- [x] Test login flow (email/password)
- [x] Test JWT pre-authentication
- [x] Test form validation and multi-step logic
- [x] Test database insertion
- [ ] Test responsive design on mobile/tablet/desktop
- [ ] Polish UI and ensure brand consistency

## Phase 6: Delivery
- [x] Create final checkpoint
- [x] Provide SQL schema for vk_delete_requests table
- [ ] Expose live preview URL
- [ ] Deliver project to user
