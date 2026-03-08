# Fairprep Data Deletion Request Application

A professional, secure web application for handling user data deletion requests with Supabase authentication and Firebase deployment.

## 🎯 Overview

This application provides a complete solution for managing user data deletion requests. Users can authenticate via email/password or JWT tokens, then submit a deletion request through a multi-step form. All requests are securely stored in Supabase and can be managed through an admin dashboard.

**Live Application**: https://fairprepapp.web.app

## ✨ Features

### Authentication
- ✅ Email/password authentication via Supabase
- ✅ Automatic JWT token authentication from URL parameter (`?token=...`)
- ✅ Secure session management with cookies
- ✅ User profile management

### Deletion Request Form
- ✅ Step 1: Explicit confirmation checkbox
- ✅ Step 2: Reason selection (6 predefined options)
- ✅ Conditional text input for "Other reason"
- ✅ Form validation and error handling
- ✅ Summary page with success confirmation

### Design & UX
- ✅ Dark purple theme matching Fairprep branding
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Professional UI with excellent contrast
- ✅ Fairprep logo prominently displayed
- ✅ Smooth form flow and transitions

### Backend & Database
- ✅ Express.js server with tRPC procedures
- ✅ Supabase integration for data storage
- ✅ Row Level Security (RLS) policies
- ✅ Admin endpoints for managing requests
- ✅ Health check and monitoring endpoints

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm package manager
- Supabase account and project
- Firebase project for hosting
- Google Cloud project for Cloud Functions

### Installation

```bash
# Clone the repository
git clone https://github.com/DMcoder75/fairprepapp.git
cd fairprepapp

# Install dependencies
pnpm install

# Set up environment variables (see ENV_VARIABLES.md)
```

### Environment Variables

**Frontend (.env.local)**:
```
VITE_FP_SUPABASE_URL=https://xududbaqaaffcaejwuix.supabase.co
VITE_FP_SUPABASE_ANON_KEY=your_anon_key_here
```

**Backend (Cloud Functions)**:
```
FP_SUPABASE_URL=https://xududbaqaaffcaejwuix.supabase.co
FP_SUPABASE_ANON_KEY=your_anon_key_here
```

See `ENV_VARIABLES.md` for detailed setup instructions.

### Development

```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build

# Start production server
pnpm start
```

## 📁 Project Structure

```
fairprepapp/
├── client/                          # React frontend
│   ├── src/
│   │   ├── pages/                  # Page components
│   │   │   ├── Login.tsx           # Authentication page
│   │   │   ├── DeleteRequest.tsx   # Multi-step form
│   │   │   └── Confirmation.tsx    # Success page
│   │   ├── components/             # Reusable components
│   │   ├── contexts/               # React contexts
│   │   ├── hooks/                  # Custom hooks
│   │   ├── lib/                    # Utilities
│   │   └── App.tsx                 # Main app component
│   └── public/                     # Static assets
├── server/                          # Backend
│   ├── routers.ts                  # tRPC procedures
│   ├── db.ts                       # Database helpers
│   └── deleteRequest.ts            # Deletion logic
├── functions/                       # Google Cloud Functions
│   ├── index.js                    # Cloud Functions code
│   └── package.json                # Dependencies
├── drizzle/                        # Database schema
│   └── schema.ts                   # Table definitions
├── shared/                         # Shared code
│   └── branding.ts                 # Brand constants
├── DATABASE_SCHEMA.sql             # Supabase table creation
├── ENV_VARIABLES.md                # Environment setup guide
├── SUPABASE_SETUP.md               # Supabase deployment guide
├── CLOUD_FUNCTIONS_DEPLOYMENT.md   # Cloud Functions guide
└── MANUAL_CLOUD_FUNCTIONS_DEPLOYMENT.md # Manual deployment steps
```

## 🗄️ Database Schema

The application uses a `vk_delete_requests` table with the following structure:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Unique identifier |
| `user_id` | UUID | Reference to auth.users |
| `user_email` | TEXT | User's email address |
| `reason` | TEXT | Selected deletion reason |
| `other_reason_detail` | TEXT | Additional details if "Other" |
| `created_at` | TIMESTAMP | Request submission time |
| `processed` | BOOLEAN | Whether deletion is processed |
| `processed_at` | TIMESTAMP | When deletion was processed |
| `deleted_at` | TIMESTAMP | When data was actually deleted |

### Create Table

Run the SQL script from `DATABASE_SCHEMA.sql` in your Supabase SQL Editor.

## 🔧 API Endpoints

### Submit Deletion Request
```
POST /api/deleteRequest/submit
Content-Type: application/json

{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "reason": "I am not interested",
  "otherReasonDetail": null
}
```

### Health Check
```
GET /api/health
```

### List Deletion Requests (Admin)
```
GET /api/deleteRequest/list
```

### Mark as Processed (Admin)
```
PATCH /api/deleteRequest/:id/process
```

### Mark as Deleted (Admin)
```
PATCH /api/deleteRequest/:id/delete
```

## 🚀 Deployment

### Firebase Hosting (Frontend)

```bash
# Build the project
pnpm build

# Deploy to Firebase
firebase deploy --project fairprepapp --only hosting
```

**Live URL**: https://fairprepapp.web.app

### Google Cloud Functions (Backend)

See `MANUAL_CLOUD_FUNCTIONS_DEPLOYMENT.md` for detailed step-by-step instructions.

**Function URL**: `https://REGION-studentkonnectcom.cloudfunctions.net/api`

## 🔐 Security Features

- ✅ Supabase Row Level Security (RLS) policies
- ✅ User data isolation
- ✅ Input validation on all endpoints
- ✅ Secure authentication with JWT tokens
- ✅ HTTPS-only communication
- ✅ Environment variables for sensitive data
- ✅ No credentials in version control

## 📊 Deletion Reasons

Users can select from the following reasons:
1. I am not interested
2. I found a better application
3. It is very expensive
4. It is slow
5. It doesn't have features I want
6. Other reason (with optional text input)

## 🎨 Branding

The application uses Fairprep brand colors:
- **Header Background**: `#1a0f2e` (Dark purple from logo)
- **Page Background**: `#2d1b4e` (Dark purple)
- **Primary Button**: `#6B46C1` (Bluish purple)
- **Text Color**: `#ffffff` (White)
- **Logo**: Fairprep logo displayed at the top

## 📱 Responsive Design

The application is fully responsive and works on:
- ✅ Desktop (1920px and above)
- ✅ Tablet (768px to 1024px)
- ✅ Mobile (320px to 767px)

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run specific test file
pnpm test server/deleteRequest.test.ts
```

### Test Coverage
- ✅ Supabase configuration validation
- ✅ Deletion request validation
- ✅ Authentication flows
- ✅ JWT token handling
- ✅ Form submission logic

## 📝 Documentation

- **ENV_VARIABLES.md** - Environment variable setup and reference
- **SUPABASE_SETUP.md** - Supabase database configuration
- **CLOUD_FUNCTIONS_DEPLOYMENT.md** - Cloud Functions deployment guide
- **MANUAL_CLOUD_FUNCTIONS_DEPLOYMENT.md** - Step-by-step manual deployment
- **DATABASE_SCHEMA.sql** - SQL script for table creation

## 🐛 Troubleshooting

### "Cannot connect to Supabase"
- Verify `FP_SUPABASE_URL` and `FP_SUPABASE_ANON_KEY` are correct
- Check Supabase project is active
- Verify network connectivity

### "RLS policy violation"
- Ensure user is authenticated
- Check RLS policies in Supabase
- Verify user has permission to access table

### "Cloud Functions timeout"
- Increase timeout in Cloud Functions settings
- Check Supabase connection
- Review function logs for errors

## 💰 Cost Estimation

**Monthly costs (within free tiers)**:
- Firebase Hosting: $0 (10 GB/month storage included)
- Google Cloud Functions: $0 (2 million invocations/month included)
- Supabase: $0 (500 MB database included)
- **Total**: $0/month

## 📞 Support

For issues or questions:
1. Check the documentation files
2. Review the troubleshooting section
3. Check Cloud Functions logs
4. Review Supabase logs

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

Built with:
- React 19 + Tailwind CSS 4
- Express.js + tRPC
- Supabase
- Firebase Hosting
- Google Cloud Functions

---

**Last Updated**: March 8, 2026
**Version**: 1.0.0
**Status**: ✅ Production Ready
**Live URL**: https://fairprepapp.web.app
**GitHub**: https://github.com/DMcoder75/fairprepapp
