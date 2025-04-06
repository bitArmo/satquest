import { env } from '$env/dynamic/private';
import * as auth from '$lib/server/auth.js';

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL = env.GITHUB_CALLBACK_URL || 'http://localhost:5173/auth/callback/github';

/**
 * Get the GitHub OAuth authorization URL
 * @param {string} state Random state for CSRF protection
 */
export function getAuthorizationUrl(state) {
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: GITHUB_CALLBACK_URL,
    scope: 'read:user user:email',
    state,
    allow_signup: 'true'
  });
  
  return `https://github.com/login/oauth/authorize?${params.toString()}`;
}

/**
 * Exchange code for access token
 * @param {string} code Authorization code from GitHub callback
 */
export async function getAccessToken(code) {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: GITHUB_CALLBACK_URL
    })
  });
  
  const data = await response.json();
  return data.access_token;
}

/**
 * Get user data from GitHub API
 * @param {string} accessToken GitHub access token
 */
export async function getGitHubUser(accessToken) {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  
  return response.json();
}

/**
 * Get user's email from GitHub API (if private)
 * @param {string} accessToken GitHub access token
 */
export async function getGitHubUserEmails(accessToken) {
  const response = await fetch('https://api.github.com/user/emails', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  
  const emails = await response.json();
  return emails.find(email => email.primary)?.email || emails[0]?.email;
}

/**
 * Complete GitHub OAuth flow and create session
 * @param {import('@sveltejs/kit').RequestEvent} requestEvent SvelteKit request event
 * @param {string} code Authorization code from GitHub callback
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function handleGitHubCallback(requestEvent, code) {
  try {
    // Exchange code for access token
    const accessToken = await getAccessToken(code);
    
    if (!accessToken) {
      return { success: false, error: 'invalid_token' };
    }
    
    // Get user data from GitHub
    const githubUser = await getGitHubUser(accessToken);
    
    if (!githubUser || !githubUser.id) {
      return { success: false, error: 'invalid_user_data' };
    }
    
    // Get user's email (if not public)
    let email = githubUser.email;
    if (!email) {
      email = await getGitHubUserEmails(accessToken);
    }
    
    // Create a user object with GitHub data
    const userData = {
      id: `github-${githubUser.id}`,
      username: githubUser.login,
      name: githubUser.name,
      email: email,
      avatar: githubUser.avatar_url,
      provider: 'github',
      providerId: githubUser.id.toString()
    };
    
    // Generate a session token
    const sessionToken = auth.generateSessionToken();
    
    // Set the session cookie with the user data
    auth.setSessionCookie(requestEvent, sessionToken, userData);
    
    // Also store the user data in a separate cookie for our simplified system
    requestEvent.cookies.set(`${auth.sessionCookieName}-data`, JSON.stringify(userData), {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 // 30 days in seconds
    });
    
    return { success: true };
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    return { success: false, error: 'server_error' };
  }
}