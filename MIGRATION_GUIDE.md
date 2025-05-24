# Migration Guide: Clerk to GitHub OAuth

This guide outlines the steps taken to migrate from Clerk authentication to a custom GitHub OAuth implementation in the SatQuest application.

## Overview of Changes

1. Removed Clerk dependencies
2. Implemented custom GitHub OAuth flow
3. Created Supabase database tables for user and token storage
4. Added GitHub API integration for repository access and webhook management
5. Updated middleware for authentication protection

## Database Schema Changes

New tables created in Supabase:

- `users`: Stores GitHub user information
- `auth_tokens`: Securely stores GitHub access tokens
- `sessions`: Manages user sessions

## Authentication Flow

The new authentication flow works as follows:

1. User clicks "Continue with GitHub" on the sign-in page
2. User is redirected to GitHub's OAuth authorization page
3. After authorization, GitHub redirects back to our callback URL
4. We exchange the code for an access token
5. We fetch the user's GitHub profile
6. We create/update the user in our database and store the token
7. We create a session and set a session cookie
8. User is redirected to the dashboard

## API Endpoints

New API endpoints created:

- `/api/auth/github`: Initiates the GitHub OAuth flow
- `/api/auth/github/callback`: Handles the OAuth callback
- `/api/auth/user`: Returns the current authenticated user
- `/api/auth/logout`: Logs out the user
- `/api/github/repos`: Fetches the user's GitHub repositories
- `/api/github/webhooks`: Manages GitHub webhooks

## Components

New components created:

- `GithubSignIn`: Button to initiate GitHub OAuth
- `UserProfile`: Displays user information and logout option
- `LogoutButton`: Handles user logout
- `RepoSelector`: Allows users to select a GitHub repository
- `WebhookRegistration`: Registers webhooks for GitHub repositories

## Middleware

The middleware has been updated to:

1. Check for a valid session cookie
2. Verify the session in the database
3. Allow access to public routes without authentication
4. Redirect to the sign-in page if not authenticated

## Environment Variables

Required environment variables:

```
# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_WEBHOOK_SECRET=your_webhook_secret

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Scopes Requested

The GitHub OAuth flow requests the following scopes:

- `repo`: Full access to repositories (public and private)
- `admin:repo_hook`: Full access to repository webhooks
- `read:org`: Read-only access to organization membership

## Token Storage and Security

GitHub access tokens are stored securely in the Supabase database. The tokens are:

1. Only accessible server-side
2. Used for API requests to GitHub
3. Refreshed automatically when expired (if refresh token available)

## Additional Notes

1. The migration removes all Clerk-specific code and configurations
2. Session management is now handled via HTTP-only cookies
3. The middleware provides similar protection as Clerk's middleware
4. GitHub webhook registration is now available for repository integration

## Next Steps

1. Run database migrations to create the required tables
2. Update environment variables with GitHub OAuth credentials
3. Test the authentication flow end-to-end
4. Verify webhook registration functionality
