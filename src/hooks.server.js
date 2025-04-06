import * as auth from '$lib/server/auth.js';

// Authentication handler that processes session cookies and sets user data in locals
export async function handle({ event, resolve }) {
  // Get the session token from cookies
  const sessionToken = event.cookies.get(auth.sessionCookieName);

  // Set default user and session as null
  event.locals.user = null;
  event.locals.session = null;
  
  // If there is a session token, validate it
  if (sessionToken) {
    try {
      // Parse the user data from the cookie
      // In a real app, you might want to verify this with GitHub or Supabase
      // but for simplicity we'll just use the cookie value
      const userData = JSON.parse(event.cookies.get(`${auth.sessionCookieName}-data`) || '{}');
      
      // Set the user data in locals
      event.locals.user = userData;
      event.locals.session = { token: sessionToken };
    } catch (error) {
      // If there's an error, clear the invalid cookie
      auth.deleteSessionCookie(event);
    }
  }
  
  // No authentication check for /dashboard anymore
  
  // Continue with the request
  return resolve(event);
}