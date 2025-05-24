import { redirect } from 'next/navigation';
import { User, Session } from '@/types/auth';
import { supabase } from './auth-utils';
import { cookies } from 'next/headers';



// Create a new session
export async function createSession(userId: string): Promise<Session> {
  // Session expires in 7 days
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('sessions')
    .insert({
      user_id: userId,
      expires_at: expiresAt,
    })
    .select('*')
    .single();

  if (error || !data) {
    console.error('Error creating session:', error);
    throw new Error('Failed to create session');
  }

  // Set session cookie
  const cookieStore = await cookies();
  cookieStore.set('session_id', data.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    path: '/',
    sameSite: 'lax'
  });

  return {
    id: data.id,
    userId: data.user_id,
    expiresAt: new Date(data.expires_at),
  };
}

// Get current session
export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id')?.value;

  if (!sessionId) {
    return null;
  }

  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('id', sessionId)
    .single();

  if (error || !data) {
    // Invalid or expired session
    const cookieStore = await cookies();
    cookieStore.set('session_id', '', { maxAge: 0, path: '/' });
    return null;
  }

  // Check if session is expired
  if (new Date(data.expires_at) < new Date()) {
    await supabase.from('sessions').delete().eq('id', sessionId);
    const cookieStore = await cookies();
    cookieStore.set('session_id', '', { maxAge: 0, path: '/' });
    return null;
  }

  return {
    id: data.id,
    userId: data.user_id,
    expiresAt: new Date(data.expires_at),
  };
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.userId)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    githubId: data.github_id,
    username: data.username,
    email: data.email,
    avatarUrl: data.avatar_url,
  };
}


// Delete session (logout)
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id')?.value;

  if (sessionId) {
    await supabase.from('sessions').delete().eq('id', sessionId);
    cookieStore.set('session_id', '', { maxAge: 0, path: '/' });
  }
}

// Require authentication middleware
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/sign-in');
  }
  
  return user;
}

// Export getGitHubToken from auth-utils
export { getGitHubToken } from './auth-utils';
