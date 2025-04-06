import { redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth.js';

export async function GET(event) {
  // Get the session
  const sessionToken = event.cookies.get(auth.sessionCookieName);
  
  if (sessionToken) {
    try {
      // Invalidate the session in the database
      const { session } = await auth.validateSessionToken(sessionToken);
      if (session) {
        await auth.invalidateSession(session.id);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    // Delete the session cookie
    auth.deleteSessionTokenCookie(event);
  }
  
  // Redirect to home page after logout
  throw redirect(302, '/');
}