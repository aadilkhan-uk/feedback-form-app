# Authentication Setup Guide

This application uses NextAuth.js with a simple password-based authentication system to protect the dashboard.

## Security Features Implemented

- **Environment Variable Storage**: Password is stored securely in environment variables, not hardcoded
- **Session Management**: Uses NextAuth.js with JWT strategy for secure session handling
- **Route Protection**: Middleware automatically redirects unauthenticated users
- **CSRF Protection**: Built-in protection via NextAuth
- **Minimum Password Length**: Enforced 8 character minimum via environment variable validation

## Setup Instructions

### 1. Create Environment Variables File

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="file:./prisma/db.sqlite"

# Authentication
AUTH_SECRET="your-auth-secret-here"
DASHBOARD_PASSWORD="your-secure-password-here"

# OpenAI API
OPENAI_API_KEY="your-openai-api-key-here"

# Environment
NODE_ENV="development"
```

### 2. Configure the Password

**Important Security Notes:**

- Choose a strong password with at least 8 characters
- Use a mix of uppercase, lowercase, numbers, and special characters
- Never commit the `.env` file to version control (it should already be in `.gitignore`)

**To set AUTH_SECRET:**
You can generate a secure random string using:

```bash
openssl rand -base64 32
```

### 3. How It Works

#### Login Flow:

1. User navigates to `/login`
2. Enters the password
3. System validates against `DASHBOARD_PASSWORD` environment variable
4. On success, creates a JWT session
5. Redirects to `/dashboard`

#### Protection:

- The middleware automatically checks for valid sessions
- Unauthenticated access to `/dashboard` redirects to `/login`
- Session persists across page refreshes using JWT tokens

#### Logout:

- Click the "Sign Out" button in the dashboard header
- Session is destroyed and user is redirected to login page

## Files Modified/Created

### New Files:

- `src/middleware.ts` - Route protection middleware
- `AUTH_SETUP.md` - This setup guide

### Modified Files:

- `src/env.js` - Added `DASHBOARD_PASSWORD` validation
- `src/server/auth/config.ts` - Configured Credentials provider
- `src/app/login/page.tsx` - Integrated NextAuth signIn
- `src/app/dashboard/page.tsx` - Added session checking and logout button
- `src/app/layout.tsx` - Added SessionProvider wrapper

## Testing the Authentication

1. Start the development server:

```bash
pnpm dev
```

2. Navigate to `http://localhost:3000/dashboard`
   - You should be redirected to `/login`

3. Enter the password you set in `DASHBOARD_PASSWORD`
   - On success, you'll be redirected to the dashboard

4. Try accessing the dashboard again
   - You should remain authenticated (session persisted)

5. Click "Sign Out"
   - You should be logged out and redirected to login

## Security Best Practices

✅ **Implemented:**

- Password stored in environment variables
- JWT-based session management
- Route protection via middleware
- Minimum password length validation
- Proper session handling
- CSRF protection (via NextAuth)

❌ **Not Implemented (by design, as per simple password requirement):**

- Rate limiting (consider adding for production)
- Password hashing (since there's no database persistence needed)
- Multi-factor authentication
- Password complexity requirements (beyond minimum length)

## Production Considerations

When deploying to production:

1. **Use a very strong password** for `DASHBOARD_PASSWORD`
2. **Always set `AUTH_SECRET`** to a cryptographically secure random string
3. **Consider adding rate limiting** to prevent brute force attacks
4. **Use HTTPS** in production (most platforms do this by default)
5. **Never expose your `.env` file** or commit it to version control
6. **Rotate the password periodically** for better security

## Troubleshooting

### "Invalid password" even with correct password:

- Ensure your `.env` file is in the root directory
- Restart the development server after changing `.env`
- Check for trailing spaces in the password

### Session not persisting:

- Ensure `AUTH_SECRET` is set in `.env`
- Clear browser cookies and try again

### Redirecting to login immediately after login:

- Check browser console for errors
- Ensure middleware is configured correctly
- Verify SessionProvider is wrapping the app in layout.tsx
