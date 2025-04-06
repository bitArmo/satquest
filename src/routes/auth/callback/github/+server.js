import { redirect } from '@sveltejs/kit';
import { handleGitHubCallback } from '$lib/server/oauth/github.js';

export async function GET({ url, request, cookies }) {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  
  // The state should be verified against what was stored in localStorage
  // on the client side when the user clicks login
  
  if (!code) {
    // If no code is provided, redirect to login
    throw redirect(302, '/auth/login?error=missing_code');
  }
  
  // Process the GitHub OAuth callback
  const result = await handleGitHubCallback({ url, request, cookies }, code);
  
  if (!result.success) {
    // If authentication failed, redirect to login with error
    throw redirect(302, `/auth/login?error=${result.error}`);
  }
  
  // Get the redirect URL from localStorage or default to dashboard
  // In a real implementation, you might want to store this in a more secure way
  const redirectTo = '/dashboard';
  
  // Redirect to dashboard or original destination on successful login
  throw redirect(302, redirectTo);
}