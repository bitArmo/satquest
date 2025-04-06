import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function GET({ url }) {
  const state = url.searchParams.get('state');
  
  // GitHub OAuth configuration
  const GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID;
  const GITHUB_CALLBACK_URL = env.GITHUB_CALLBACK_URL || 'http://localhost:5173/auth/callback/github';
  
  // Build the GitHub OAuth URL
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: GITHUB_CALLBACK_URL,
    scope: 'read:user user:email',
    state,
    allow_signup: 'true'
  });
  
  // Redirect to GitHub for authentication
  throw redirect(302, `https://github.com/login/oauth/authorize?${params.toString()}`);
}