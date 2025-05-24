import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../utils/supabase/middleware';

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/sign-in',
  '/sign-up',
  '/api/auth/github',
  '/api/auth/github/callback',
  '/api/projects',
  '/api/webhooks/supabase'
];

// Check if the request is for a public route
function isPublicRoute(path: string): boolean {
  return publicRoutes.some(route => {
    if (route.endsWith('*')) {
      const baseRoute = route.slice(0, -1);
      return path.startsWith(baseRoute);
    }
    return path === route;
  });
}

// Check if the request is for a static asset
function isStaticAsset(path: string): boolean {
  return path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|ttf|woff|woff2)$/) !== null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public routes and static assets
  if (isPublicRoute(pathname) || isStaticAsset(pathname)) {
    return NextResponse.next();
  }
  
  // Check for session cookie
  const sessionId = request.cookies.get('session_id')?.value;
  
  if (!sessionId) {
    // Redirect to sign-in if no session
    const signInUrl = new URL('/sign-in', request.url);
    return NextResponse.redirect(signInUrl);
  }
  
  // Create Supabase client with cookies
  const { supabase, response } = createClient(request);
  
  // Verify session
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('id', sessionId)
    .single();
  
  if (error || !data || new Date(data.expires_at) < new Date()) {
    // Invalid or expired session, redirect to sign-in
    const signInUrl = new URL('/sign-in', request.url);
    return NextResponse.redirect(signInUrl);
  }
  
  // Session is valid, continue with the request
  return response;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
