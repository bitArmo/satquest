import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;
    
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    
    // Build query
    let query = supabase
      .from('issues')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });
    
    // Add status filter if provided
    if (status) {
      query = query.eq('status', status);
    }
    
    // Execute query
    const { data: issues, error } = await query;
    
    if (error) {
      console.error('Error fetching issues:', error);
      return NextResponse.json({ error: 'Failed to fetch issues' }, { status: 500 });
    }
    
    return NextResponse.json({ issues });
    
  } catch (error) {
    console.error('Error in issues API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;
    
    // Get the user's session from the request
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
    
    // Check if user owns the project
    const { data: project, error: fetchError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .eq('owner_id', user.id)
      .single();
    
    if (fetchError || !project) {
      return NextResponse.json({ error: 'Project not found or you do not have permission to add issues' }, { status: 403 });
    }
    
    // Parse the request body
    const { title, description, github_issue_id, reward_amount } = await request.json();
    
    // Validate required fields
    if (!title || !description || !github_issue_id || !reward_amount) {
      return NextResponse.json({ error: 'Title, description, GitHub issue ID, and reward amount are required' }, { status: 400 });
    }
    
    // Create new issue
    const { data: issue, error: insertError } = await supabase
      .from('issues')
      .insert({
        project_id: projectId,
        title,
        description,
        github_issue_id,
        reward_amount,
        status: 'open',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (insertError) {
      console.error('Error creating issue:', insertError);
      return NextResponse.json({ error: 'Failed to create issue' }, { status: 500 });
    }
    
    return NextResponse.json({ 
      message: 'Issue created successfully',
      issue
    });
    
  } catch (error) {
    console.error('Error in issues API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
