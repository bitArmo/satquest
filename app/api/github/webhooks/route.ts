import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, getGitHubToken } from '@/lib/auth';

// Register a webhook for a GitHub repository
export async function POST(request: NextRequest) {
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
    
    // Parse the request body
    const body = await request.json();
    const { owner, repo, events = ['issues'], config } = body;
    
    if (!owner || !repo) {
      return NextResponse.json(
        { error: 'Owner and repo are required' },
        { status: 400 }
      );
    }
    
    // Default webhook configuration
    const webhookConfig = {
      url: config?.url || `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/github`,
      content_type: 'json',
      secret: process.env.GITHUB_WEBHOOK_SECRET,
      ...config
    };
    
    // Register the webhook with GitHub
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/hooks`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'web',
          active: true,
          events,
          config: webhookConfig,
        }),
      }
    );
    
    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: 'Failed to create webhook', details: error },
        { status: response.status }
      );
    }
    
    const webhook = await response.json();
    
    return NextResponse.json({ webhook });
  } catch (error) {
    console.error('Error registering webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// List webhooks for a GitHub repository
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
    const owner = searchParams.get('owner');
    const repo = searchParams.get('repo');
    
    if (!owner || !repo) {
      return NextResponse.json(
        { error: 'Owner and repo query parameters are required' },
        { status: 400 }
      );
    }
    
    // Fetch webhooks from GitHub
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/hooks`,
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
        { error: 'Failed to fetch webhooks', details: error },
        { status: response.status }
      );
    }
    
    const webhooks = await response.json();
    
    return NextResponse.json({ webhooks });
  } catch (error) {
    console.error('Error fetching webhooks:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Delete a webhook from a GitHub repository
export async function DELETE(request: NextRequest) {
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
    
    // Parse the request body
    const body = await request.json();
    const { owner, repo, hookId } = body;
    
    if (!owner || !repo || !hookId) {
      return NextResponse.json(
        { error: 'Owner, repo, and hookId are required' },
        { status: 400 }
      );
    }
    
    // Delete the webhook from GitHub
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/hooks/${hookId}`,
      {
        method: 'DELETE',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    
    if (!response.ok && response.status !== 204) {
      const error = await response.json();
      return NextResponse.json(
        { error: 'Failed to delete webhook', details: error },
        { status: response.status }
      );
    }
    
    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
