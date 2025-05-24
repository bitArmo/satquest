import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { supabase } from '@/utils/supabase';

// Verify GitHub webhook signature
function verifyGitHubSignature(payload: string, signature: string): boolean {
  if (!process.env.GITHUB_WEBHOOK_SECRET) {
    console.error('GITHUB_WEBHOOK_SECRET is not defined');
    return false;
  }

  const hmac = createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET);
  const calculatedSignature = 'sha256=' + hmac.update(payload).digest('hex');
  return calculatedSignature === signature;
}

export async function POST(request: NextRequest) {
  try {
    // Get the GitHub signature from headers
    const signature = request.headers.get('x-hub-signature-256');
    const event = request.headers.get('x-github-event');
    const delivery = request.headers.get('x-github-delivery');

    if (!signature || !event || !delivery) {
      return NextResponse.json(
        { error: 'Missing required headers' },
        { status: 400 }
      );
    }

    // Get the raw request body
    const payload = await request.text();

    // Verify the signature
    if (!verifyGitHubSignature(payload, signature)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse the payload
    const data = JSON.parse(payload);

    // Process different webhook events
    switch (event) {
      case 'issues':
        await handleIssueEvent(data);
        break;
      case 'issue_comment':
        await handleIssueCommentEvent(data);
        break;
      case 'pull_request':
        await handlePullRequestEvent(data);
        break;
      default:
        console.log(`Unhandled GitHub event: ${event}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing GitHub webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle GitHub issue events
async function handleIssueEvent(data: any) {
  const { action, issue, repository } = data;
  
  // Only process opened, closed, or reopened issues
  if (!['opened', 'closed', 'reopened'].includes(action)) {
    return;
  }

  try {
    // Check if we're tracking this repository
    const { data: project } = await supabase
      .from('projects')
      .select('id')
      .eq('repository_url', repository.html_url)
      .single();

    if (!project) {
      console.log(`Repository not tracked: ${repository.full_name}`);
      return;
    }

    // Update or create the issue in our database
    const { error } = await supabase
      .from('issues')
      .upsert({
        project_id: project.id,
        issue_number: issue.number,
        title: issue.title,
        body: issue.body,
        status: issue.state,
        github_id: issue.id.toString(),
        github_url: issue.html_url,
        user_github_id: issue.user.id.toString(),
        user_login: issue.user.login,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'github_id',
      });

    if (error) {
      console.error('Error upserting issue:', error);
    }
  } catch (error) {
    console.error('Error handling issue event:', error);
  }
}

// Handle GitHub issue comment events
async function handleIssueCommentEvent(data: any) {
  const { action, comment, issue, repository } = data;
  
  // Only process created comments
  if (action !== 'created') {
    return;
  }

  try {
    // Check if we're tracking this repository
    const { data: project } = await supabase
      .from('projects')
      .select('id')
      .eq('repository_url', repository.html_url)
      .single();

    if (!project) {
      console.log(`Repository not tracked: ${repository.full_name}`);
      return;
    }

    // Store the comment in our database
    const { error } = await supabase
      .from('issue_comments')
      .insert({
        issue_github_id: issue.id.toString(),
        comment_github_id: comment.id.toString(),
        body: comment.body,
        user_github_id: comment.user.id.toString(),
        user_login: comment.user.login,
        created_at: new Date(comment.created_at).toISOString(),
      });

    if (error) {
      console.error('Error inserting comment:', error);
    }
  } catch (error) {
    console.error('Error handling issue comment event:', error);
  }
}

// Handle GitHub pull request events
async function handlePullRequestEvent(data: any) {
  const { action, pull_request, repository } = data;
  
  // Only process opened, closed, or reopened pull requests
  if (!['opened', 'closed', 'reopened'].includes(action)) {
    return;
  }

  try {
    // Check if we're tracking this repository
    const { data: project } = await supabase
      .from('projects')
      .select('id')
      .eq('repository_url', repository.html_url)
      .single();

    if (!project) {
      console.log(`Repository not tracked: ${repository.full_name}`);
      return;
    }

    // Update or create the pull request in our database
    const { error } = await supabase
      .from('pull_requests')
      .upsert({
        project_id: project.id,
        pr_number: pull_request.number,
        title: pull_request.title,
        body: pull_request.body,
        status: pull_request.state,
        github_id: pull_request.id.toString(),
        github_url: pull_request.html_url,
        user_github_id: pull_request.user.id.toString(),
        user_login: pull_request.user.login,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'github_id',
      });

    if (error) {
      console.error('Error upserting pull request:', error);
    }
  } catch (error) {
    console.error('Error handling pull request event:', error);
  }
}
