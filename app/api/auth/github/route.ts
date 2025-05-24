import { NextResponse } from 'next/server';
import { getGitHubAuthURL } from '@/lib/auth-utils';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export async function GET() {
  // Generate a random state for CSRF protection
  const state = crypto.randomBytes(16).toString('hex');
  
  // Store the state in a cookie for verification in the callback
  // Note: cookies() must be awaited in Next.js 14+
  const cookieStore = await cookies();
  cookieStore.set('github_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 600, // 10 minutes
    path: '/',
  });
  
  // Generate the GitHub authorization URL with all required scopes
  const url = getGitHubAuthURL(state);
  
  return NextResponse.json({ url });
}
