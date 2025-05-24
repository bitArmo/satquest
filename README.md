# SatQuest

SatQuest is a platform that connects developers with Bitcoin-incentivized GitHub issues. Earn Bitcoin for your open source contributions while helping projects grow.

This is a [Next.js](https://nextjs.org) project using Supabase for backend services and GitHub OAuth for authentication.

## Features

- 🔍 Browse Bitcoin-incentivized open source issues
- 💰 Earn Bitcoin for your contributions
- ⚡ Receive payments via Lightning Network
- 🔑 GitHub OAuth integration with repository and webhook access
- 📊 Project and issue management dashboard
- 🔐 Secure GitHub token storage and management

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Supabase account for backend services
- GitHub OAuth application credentials

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_service_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# GitHub OAuth Configuration
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_WEBHOOK_SECRET=your_webhook_secret
```

### Installation

```bash
# Install dependencies
npm install
# or
yarn
# or
pnpm install

# Run the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

## GitHub OAuth Implementation

SatQuest uses a custom GitHub OAuth implementation that:

1. Authenticates users with GitHub
2. Requests the following scopes:
   - `repo` - Access to repositories (public and private)
   - `admin:repo_hook` - Full access to repository webhooks
   - `read:org` - Read-only access to organization membership
3. Securely stores GitHub access tokens in Supabase
4. Provides API endpoints for GitHub repository and webhook management

### Authentication Flow

1. User clicks "Continue with GitHub" on the sign-in page
2. User authorizes the application on GitHub
3. GitHub redirects back to our callback URL with a code
4. We exchange the code for an access token
5. We create or update the user in our database
6. We create a session and set a session cookie

### Database Schema

The application uses the following database tables:

- `users` - Stores GitHub user information
- `auth_tokens` - Securely stores GitHub access tokens
- `sessions` - Manages user sessions

See the [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for details on the migration from Clerk to GitHub OAuth.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
/components        # UI components
  /landing         # Landing page components
  /dashboard       # Dashboard components
  /auth           # Authentication components
/app               # Next.js app directory
  /page.tsx       # Landing page
  /dashboard      # Dashboard pages
  /sign-in        # Authentication pages
  /sign-up
  /onboarding
  /api            # API routes
/lib               # Utility functions and services
/types             # TypeScript type definitions
```

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, TailwindCSS
- **Backend**: Supabase (PostgreSQL, Auth)
- **Authentication**: GitHub OAuth
- **Payments**: Lightning Network (integration ready)
- **Styling**: TailwindCSS with custom color palette

## Deployment

The application can be deployed to Vercel or any other Next.js-compatible hosting platform.

```bash
# Build for production
npm run build
# or
yarn build
# or
pnpm build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
