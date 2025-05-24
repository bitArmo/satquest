import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Get the user's GitHub access token from Supabase
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify the session
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get user's GitHub token from metadata
    const githubToken = user.app_metadata.provider_token;
    
    if (!githubToken) {
      return NextResponse.json({ error: 'GitHub token not found' }, { status: 400 });
    }
    
    // Fetch repositories from GitHub API
    const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', {
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message }, { status: response.status });
    }
    
    const repositories = await response.json();
    
    // Format the response
    const formattedRepos = repositories.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      open_issues_count: repo.open_issues_count,
      created_at: repo.created_at,
      updated_at: repo.updated_at
    }));
    
    return NextResponse.json({ repositories: formattedRepos });
    
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
