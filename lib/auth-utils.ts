import { createClient } from '@supabase/supabase-js';
import { GitHubTokenResponse, GitHubUser, User } from '@/types/auth';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;

// Use the exact redirect URI from the environment variable to match GitHub OAuth settings
// This is critical for the OAuth flow to work correctly
const REDIRECT_URI = process.env.GITHUB_REDIRECT_URI || 'http://localhost:3000/api/auth/github/callback';

// Required scopes for our application
export const GITHUB_SCOPES = ['repo', 'admin:repo_hook', 'read:org'];

// Generate GitHub OAuth URL
export function getGitHubAuthURL(state: string): string {
  const scope = GITHUB_SCOPES.join(' ');
  return `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scope)}&state=${state}`;
}

// Exchange code for GitHub access token
export async function exchangeCodeForToken(code: string): Promise<GitHubTokenResponse> {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to exchange code for token');
  }

  return response.json();
}

// Fetch GitHub user profile
export async function fetchGitHubUser(accessToken: string): Promise<GitHubUser> {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch GitHub user');
  }

  return response.json();
}

// Create or update user in database
export async function upsertUser(githubUser: GitHubUser): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .upsert({
      github_id: githubUser.id.toString(),
      username: githubUser.login,
      email: githubUser.email,
      avatar_url: githubUser.avatar_url,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'github_id',
    })
    .select('*')
    .single();

  if (error || !data) {
    console.error('Error upserting user:', error);
    throw new Error('Failed to create or update user');
  }

  return {
    id: data.id,
    githubId: data.github_id,
    username: data.username,
    email: data.email,
    avatarUrl: data.avatar_url,
  };
}

// Store GitHub token in database
export async function storeAuthToken(
  userId: string, 
  tokenResponse: GitHubTokenResponse
): Promise<void> {
  const expiresAt = tokenResponse.expires_in 
    ? new Date(Date.now() + tokenResponse.expires_in * 1000).toISOString()
    : null;

  const { error } = await supabase
    .from('auth_tokens')
    .upsert({
      user_id: userId,
      access_token: tokenResponse.access_token,
      refresh_token: tokenResponse.refresh_token || null,
      expires_at: expiresAt,
      scopes: tokenResponse.scope.split(' '),
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id',
    });

  if (error) {
    console.error('Error storing auth token:', error);
    throw new Error('Failed to store authentication token');
  }
}

// Get GitHub token for a user
export async function getGitHubToken(userId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('auth_tokens')
    .select('access_token, refresh_token, expires_at')
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    return null;
  }

  // Check if token is expired and needs refresh
  if (data.expires_at && new Date(data.expires_at) < new Date() && data.refresh_token) {
    try {
      const newToken = await refreshGitHubToken(data.refresh_token);
      await storeAuthToken(userId, newToken);
      return newToken.access_token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  }

  return data.access_token;
}

// Refresh GitHub token
async function refreshGitHubToken(refreshToken: string): Promise<GitHubTokenResponse> {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  return response.json();
}
