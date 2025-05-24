import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
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
    
    // Parse the request body
    const { display_name, github_username, lightning_address, bio } = await request.json();
    
    // Validate required fields
    if (!display_name || !github_username) {
      return NextResponse.json({ error: 'Display name and GitHub username are required' }, { status: 400 });
    }
    
    // Check if profile already exists
    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (existingProfile) {
      // Update existing profile
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          display_name,
          github_username,
          lightning_address,
          bio,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);
      
      if (updateError) {
        console.error('Error updating profile:', updateError);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
      }
      
      return NextResponse.json({ message: 'Profile updated successfully' });
    } else {
      // Create new profile
      const { error: insertError } = await supabase
        .from('user_profiles')
        .insert({
          user_id: user.id,
          display_name,
          github_username,
          lightning_address,
          bio,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      
      if (insertError) {
        console.error('Error creating profile:', insertError);
        return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
      }
      
      return NextResponse.json({ message: 'Profile created successfully' });
    }
    
  } catch (error) {
    console.error('Onboarding error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
