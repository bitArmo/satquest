// Simple authentication utilities for GitHub OAuth
// No database required - using cookies for session management

export const sessionCookieName = 'auth-session';

/**
 * Generates a random session token
 */
export function generateSessionToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(18));
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Sets the session cookie with the user data from GitHub
 * @param {import("@sveltejs/kit").RequestEvent} event
 * @param {string} token Session token
 * @param {Object} userData User data from GitHub
 */
export function setSessionCookie(event, token, userData) {
  // Create a session expiration date (30 days)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);
  
  // Set the session cookie
  event.cookies.set(sessionCookieName, token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt
  });
  
  // Store user data in the locals object for this request
  event.locals.user = userData;
  event.locals.session = { token, expiresAt };
}

/**
 * Deletes the session cookie
 * @param {import("@sveltejs/kit").RequestEvent} event
 */
export function deleteSessionCookie(event) {
  event.cookies.delete(sessionCookieName, { path: '/' });
  event.locals.user = null;
  event.locals.session = null;
}
