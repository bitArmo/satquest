// rough sketch in hooks.server.ts
export const handle = async ({ event, resolve }) => {
  //const user = getUserFromCookie(event.request.headers.get('cookie'));
  //event.locals.user = user;

  // if no user and trying to hit /dashboard, redirect to /login
  //if (!user && event.url.pathname.startsWith('/dashboard')) {
  //  return Response.redirect('/login');
  //}
  //return resolve(event);
  return resolve(event);
};