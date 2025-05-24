import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;
    
    // Fetch project details
    const { data: project, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      }
      console.error('Error fetching project:', error);
      return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
    }
    
    return NextResponse.json({ project });
    
  } catch (error) {
    console.error('Error in project API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
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
      return NextResponse.json({ error: 'Project not found or you do not have permission to update it' }, { status: 403 });
    }
    
    // Parse the request body
    const { name, description, repository_url, languages } = await request.json();
    
    // Validate required fields
    if (!name || !description || !repository_url) {
      return NextResponse.json({ error: 'Name, description, and repository URL are required' }, { status: 400 });
    }
    
    // Update project
    const { data: updatedProject, error: updateError } = await supabase
      .from('projects')
      .update({
        name,
        description,
        repository_url,
        languages,
        updated_at: new Date().toISOString()
      })
      .eq('id', projectId)
      .select()
      .single();
    
    if (updateError) {
      console.error('Error updating project:', updateError);
      return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
    
    return NextResponse.json({ 
      message: 'Project updated successfully',
      project: updatedProject
    });
    
  } catch (error) {
    console.error('Error in project API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
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
      return NextResponse.json({ error: 'Project not found or you do not have permission to delete it' }, { status: 403 });
    }
    
    // Delete project
    const { error: deleteError } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);
    
    if (deleteError) {
      console.error('Error deleting project:', deleteError);
      return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
    
    return NextResponse.json({ 
      message: 'Project deleted successfully'
    });
    
  } catch (error) {
    console.error('Error in project API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
