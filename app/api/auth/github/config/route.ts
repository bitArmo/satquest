import { NextResponse } from 'next/server';

// This endpoint is only for debugging purposes
// It exposes non-sensitive configuration information
export async function GET() {
  return NextResponse.json({
    clientId: process.env.GITHUB_CLIENT_ID || 'Not configured',
    redirectUri: process.env.GITHUB_REDIRECT_URI || 'Not configured (fallback to default)',
    defaultRedirectUri: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/auth/github/callback`,
  });
}
