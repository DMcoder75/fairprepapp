# Environment Variables Reference

All Supabase environment variables use the `FP_` prefix (Fairprep).

## Supabase Environment Variables

### Frontend Environment Variables (Firebase Hosting)

These variables are used by the React frontend application and must be prefixed with `VITE_` for Vite to expose them to the browser.

```
VITE_FP_SUPABASE_URL=https://xududbaqaaffcaejwuix.supabase.co
VITE_FP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1ZHVkYmFxYWFmZmNhZWp3dWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTE4OTQsImV4cCI6MjA2Njg2Nzg5NH0.rMPZCHgDfyho4sUOXNcA1PF4yZ3GFBJxXya_SPcq8fA
```

### Backend Environment Variables (Google Cloud Functions)

These variables are used by the Cloud Functions backend and do NOT need the `VITE_` prefix.

```
FP_SUPABASE_URL=https://xududbaqaaffcaejwuix.supabase.co
FP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1ZHVkYmFxYWFmZmNhZWp3dWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTE4OTQsImV4cCI6MjA2Njg2Nzg5NH0.rMPZCHgDfyho4sUOXNcA1PF4yZ3GFBJxXya_SPcq8fA
```

---

## Environment Variable Definitions

| Variable | Value | Purpose | Used By |
|----------|-------|---------|---------|
| `VITE_FP_SUPABASE_URL` | `https://xududbaqaaffcaejwuix.supabase.co` | Supabase project URL | Frontend |
| `VITE_FP_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Supabase anonymous API key | Frontend |
| `FP_SUPABASE_URL` | `https://xududbaqaaffcaejwuix.supabase.co` | Supabase project URL | Cloud Functions |
| `FP_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Supabase anonymous API key | Cloud Functions |

---

## How to Set Environment Variables

### For Firebase Hosting (Frontend)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project: `fairprepapp`
3. Go to **Hosting** → **fairprepapp**
4. Click **Settings** (gear icon)
5. Go to **Environment variables** tab
6. Add the following variables:
   - `VITE_FP_SUPABASE_URL`: `https://xududbaqaaffcaejwuix.supabase.co`
   - `VITE_FP_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### For Google Cloud Functions (Backend)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select project: `studentkonnectcom`
3. Go to **Cloud Functions**
4. Click on your function
5. Click **Edit**
6. Expand **Runtime settings**
7. Add environment variables:
   - `FP_SUPABASE_URL`: `https://xududbaqaaffcaejwuix.supabase.co`
   - `FP_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
8. Click **Deploy**

---

## Accessing Environment Variables in Code

### Frontend (React/Vite)

```javascript
// In React components
const supabaseUrl = import.meta.env.VITE_FP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_FP_SUPABASE_ANON_KEY;

// Or in environment files
// .env.local
VITE_FP_SUPABASE_URL=https://xududbaqaaffcaejwuix.supabase.co
VITE_FP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Backend (Node.js/Cloud Functions)

```javascript
// In Cloud Functions
const supabaseUrl = process.env.FP_SUPABASE_URL;
const supabaseAnonKey = process.env.FP_SUPABASE_ANON_KEY;

// Validate that variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing FP_SUPABASE_URL or FP_SUPABASE_ANON_KEY environment variables');
}
```

---

## Complete Credentials Reference

### Supabase Project Details
- **Project ID**: `xududbaqaaffcaejwuix`
- **Project URL**: `https://xududbaqaaffcaejwuix.supabase.co`
- **Region**: (Check Supabase dashboard)
- **Database**: PostgreSQL

### API Keys
- **Anon Key** (Public): `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1ZHVkYmFxYWFmZmNhZWp3dWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTE4OTQsImV4cCI6MjA2Njg2Nzg5NH0.rMPZCHgDfyho4sUOXNcA1PF4yZ3GFBJxXya_SPcq8fA`
  - Used for: Frontend, public API access
  - Scope: Limited by Row Level Security (RLS) policies
  - Safe to expose in frontend code

### Firebase Projects
- **Hosting Project**: `fairprepapp`
- **Functions Project**: `studentkonnectcom`

---

## Security Best Practices

1. **Never commit credentials to git**
   - Add `.env.local` to `.gitignore`
   - Use Firebase Console for environment variable management

2. **Keep ANON_KEY safe**
   - While it's public, it's restricted by RLS policies
   - Never share SERVICE_ROLE_KEY (keep it secret)

3. **Rotate keys periodically**
   - Go to Supabase → Settings → API
   - Regenerate keys if compromised

4. **Use different keys for different environments**
   - Development: One set of credentials
   - Production: Another set (recommended but optional for small projects)

---

## Troubleshooting

### Issue: "Environment variable not found"

**Frontend**:
- Ensure variable starts with `VITE_` prefix
- Restart dev server after adding variables
- Check Firebase Console for correct values

**Backend**:
- Ensure variable name matches exactly (case-sensitive)
- Redeploy Cloud Function after changing variables
- Check Cloud Function logs for errors

### Issue: "Cannot connect to Supabase"

- Verify `FP_SUPABASE_URL` is correct
- Verify `FP_SUPABASE_ANON_KEY` is not expired
- Check Supabase project is active
- Verify network connectivity

### Issue: "RLS policy violation"

- Ensure user is authenticated
- Check RLS policies in Supabase
- Verify user has permission to access the table

---

## Environment Variable Checklist

### Frontend (Firebase Hosting)
- [ ] `VITE_FP_SUPABASE_URL` set in Firebase Console
- [ ] `VITE_FP_SUPABASE_ANON_KEY` set in Firebase Console
- [ ] Variables are accessible in browser (check DevTools)
- [ ] Frontend can connect to Supabase

### Backend (Cloud Functions)
- [ ] `FP_SUPABASE_URL` set in Cloud Function settings
- [ ] `FP_SUPABASE_ANON_KEY` set in Cloud Function settings
- [ ] Cloud Function redeployed after setting variables
- [ ] Backend can connect to Supabase

---

## Quick Reference

### Copy-Paste Values

**Frontend (.env.local or Firebase Console)**:
```
VITE_FP_SUPABASE_URL=https://xududbaqaaffcaejwuix.supabase.co
VITE_FP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1ZHVkYmFxYWFmZmNhZWp3dWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTE4OTQsImV4cCI6MjA2Njg2Nzg5NH0.rMPZCHgDfyho4sUOXNcA1PF4yZ3GFBJxXya_SPcq8fA
```

**Backend (Cloud Function settings)**:
```
FP_SUPABASE_URL=https://xududbaqaaffcaejwuix.supabase.co
FP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1ZHVkYmFxYWFmZmNhZWp3dWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTE4OTQsImV4cCI6MjA2Njg2Nzg5NH0.rMPZCHgDfyho4sUOXNcA1PF4yZ3GFBJxXya_SPcq8fA
```

---

## Additional Notes

- **FP** stands for **Fairprep**
- All Fairprep-specific variables should use this prefix
- This convention makes it easy to identify which variables belong to which application
- If you have multiple apps, each can have its own prefix (e.g., `SK_` for StudentKonnect)

---

**Last Updated**: March 8, 2026
**Supabase Project**: xududbaqaaffcaejwuix
**Firebase Hosting**: fairprepapp
**Cloud Functions**: studentkonnectcom
