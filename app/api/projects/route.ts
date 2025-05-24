import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const offset = (page - 1) * limit;
    
    // Fetch projects with pagination
    const { data: projects, error, count } = await supabase
      .from('projects')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) {
      console.error('Error fetching projects:', error);
      return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
    
    return NextResponse.json({ 
      projects, 
      pagination: {
        total: count,
        page,
        limit,
        pages: Math.ceil((count || 0) / limit)
      }
    });
    
  } catch (error) {
    console.error('Error in projects API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get the user's session from our custom auth
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userId = user.id;
    
    // Parse the request body
    const { name, description, repository_url, languages } = await request.json();
    
    // Validate required fields
    if (!name || !description || !repository_url) {
      return NextResponse.json({ error: 'Name, description, and repository URL are required' }, { status: 400 });
    }
    
    // Create new project
    const { data: project, error: insertError } = await supabase
      .from('projects')
      .insert({
        name,
        description,
        repository_url,
        languages,
        owner_id: userId,
        github_id: user.githubId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (insertError) {
      console.error('Error creating project:', insertError);
      return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
    
    return NextResponse.json({ 
      message: 'Project created successfully',
      project
    });
    
  } catch (error) {
    console.error('Error in projects API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
