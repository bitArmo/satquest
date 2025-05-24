import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(
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
    const { data: project, error: fetchProjectError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .eq('owner_id', user.id)
      .single();
    
    if (fetchProjectError || !project) {
      return NextResponse.json({ error: 'Project not found or you do not have permission to manage rewards' }, { status: 403 });
    }
    
    // Fetch the issue
    const { data: issue, error: fetchIssueError } = await supabase
      .from('issues')
      .select('*')
      .eq('id', issueId)
      .eq('project_id', projectId)
      .single();
    
    if (fetchIssueError || !issue) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }
    
    // Parse the request body
    const { recipient_id, lightning_address } = await request.json();
    
    // Validate required fields
    if (!recipient_id || !lightning_address) {
      return NextResponse.json({ error: 'Recipient ID and Lightning address are required' }, { status: 400 });
    }
    
    // Create reward record
    const { data: reward, error: createRewardError } = await supabase
      .from('rewards')
      .insert({
        issue_id: issueId,
        project_id: projectId,
        recipient_id,
        lightning_address,
        amount: issue.reward_amount,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (createRewardError) {
      console.error('Error creating reward:', createRewardError);
      return NextResponse.json({ error: 'Failed to create reward' }, { status: 500 });
    }
    
    // Update issue status to completed
    const { error: updateIssueError } = await supabase
      .from('issues')
      .update({
        status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', issueId)
      .eq('project_id', projectId);
    
    if (updateIssueError) {
      console.error('Error updating issue status:', updateIssueError);
      // Continue anyway, as the reward was created
    }
    
    // In a real application, this would trigger a Lightning payment
    // For now, we'll just simulate a successful payment
    
    // Update reward status to paid
    const { data: updatedReward, error: updateRewardError } = await supabase
      .from('rewards')
      .update({
        status: 'paid',
        updated_at: new Date().toISOString()
      })
      .eq('id', reward.id)
      .select()
      .single();
    
    if (updateRewardError) {
      console.error('Error updating reward status:', updateRewardError);
      // Continue anyway, as the reward was created
    }
    
    return NextResponse.json({ 
      message: 'Reward paid successfully',
      reward: updatedReward || reward
    });
    
  } catch (error) {
    console.error('Error in reward API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
