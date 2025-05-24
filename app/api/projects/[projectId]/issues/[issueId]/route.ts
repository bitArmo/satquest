import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string, issueId: string } }
) {
  try {
    const { projectId, issueId } = params;
    
    // Fetch issue details
    const { data: issue, error } = await supabase
      .from('issues')
      .select('*')
      .eq('id', issueId)
      .eq('project_id', projectId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
      }
      console.error('Error fetching issue:', error);
      return NextResponse.json({ error: 'Failed to fetch issue' }, { status: 500 });
    }
    
    return NextResponse.json({ issue });
    
  } catch (error) {
    console.error('Error in issue API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { projectId: string, issueId: string } }
) {
  try {
    const { projectId, issueId } = params;
    
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
      return NextResponse.json({ error: 'Project not found or you do not have permission to update issues' }, { status: 403 });
    }
    
    // Parse the request body
    const { title, description, github_issue_id, reward_amount, status } = await request.json();
    
    // Validate required fields
    if (!title || !description || !github_issue_id || !reward_amount) {
      return NextResponse.json({ error: 'Title, description, GitHub issue ID, and reward amount are required' }, { status: 400 });
    }
    
    // Update issue
    const { data: updatedIssue, error: updateError } = await supabase
      .from('issues')
      .update({
        title,
        description,
        github_issue_id,
        reward_amount,
        status: status || 'open',
        updated_at: new Date().toISOString()
      })
      .eq('id', issueId)
      .eq('project_id', projectId)
      .select()
      .single();
    
    if (updateError) {
      console.error('Error updating issue:', updateError);
      return NextResponse.json({ error: 'Failed to update issue' }, { status: 500 });
    }
    
    return NextResponse.json({ 
      message: 'Issue updated successfully',
      issue: updatedIssue
    });
    
  } catch (error) {
    console.error('Error in issue API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { projectId: string, issueId: string } }
) {
  try {
    const { projectId, issueId } = params;
    
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
      return NextResponse.json({ error: 'Project not found or you do not have permission to delete issues' }, { status: 403 });
    }
    
    // Delete issue
    const { error: deleteError } = await supabase
      .from('issues')
      .delete()
      .eq('id', issueId)
      .eq('project_id', projectId);
    
    if (deleteError) {
      console.error('Error deleting issue:', deleteError);
      return NextResponse.json({ error: 'Failed to delete issue' }, { status: 500 });
    }
    
    return NextResponse.json({ 
      message: 'Issue deleted successfully'
    });
    
  } catch (error) {
    console.error('Error in issue API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
