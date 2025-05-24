import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, getGitHubToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Get the current authenticated user
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Get the GitHub token for the user
    const token = await getGitHubToken(user.id);
    
    if (!token) {
      return NextResponse.json(
        { error: 'GitHub token not found or expired' },
        { status: 401 }
      );
    }
    
    // Get query parameters
    const { searchParams } = request.nextUrl;
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('per_page') || '30';
    const visibility = searchParams.get('visibility') || 'all'; // all, public, private
    
    // Fetch repositories from GitHub
    const response = await fetch(
      `https://api.github.com/user/repos?page=${page}&per_page=${perPage}&visibility=${visibility}&sort=updated`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    
    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: 'Failed to fetch repositories', details: error },
        { status: response.status }
      );
    }
    
    const repos = await response.json();
    
    return NextResponse.json({ repos });
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
