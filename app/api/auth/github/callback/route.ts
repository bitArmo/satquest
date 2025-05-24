import { NextRequest, NextResponse } from 'next/server';
import { 
  exchangeCodeForToken, 
  fetchGitHubUser, 
  upsertUser, 
  storeAuthToken 
} from '@/lib/auth-utils';
import { createSession } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  // Get the code and state from the URL
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  
  // Validate the request
  if (!code) {
    return NextResponse.redirect(new URL('/sign-in?error=missing_code', request.url));
  }
  
  // Verify the state parameter to prevent CSRF attacks
  const cookieStore = await cookies();
  const storedState = cookieStore.get('github_oauth_state')?.value;
  
  if (!state || !storedState || state !== storedState) {
    return NextResponse.redirect(new URL('/sign-in?error=invalid_state', request.url));
  }
  
  // Clear the state cookie
  cookieStore.set('github_oauth_state', '', { maxAge: 0, path: '/' });
  
  try {
    // Exchange the code for an access token
    const tokenResponse = await exchangeCodeForToken(code);
    
    // Fetch the user's GitHub profile
    const githubUser = await fetchGitHubUser(tokenResponse.access_token);
    
    // Create or update the user in our database
    const user = await upsertUser(githubUser);
    
    // Store the GitHub token securely
    await storeAuthToken(user.id, tokenResponse);
    
    // Create a new session
    await createSession(user.id);
    
    // Redirect to the dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.redirect(new URL('/sign-in?error=auth_failed', request.url));
  }
}
