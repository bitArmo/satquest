import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const status = searchParams.get('status');
    const offset = (page - 1) * limit;
    
    // Build query
    let query = supabase
      .from('issues')
      .select(`
        *,
        projects (
          id,
          name,
          repository_url,
          languages
        )
      `)
      .order('created_at', { ascending: false });
    
    // Add status filter if provided
    if (status) {
      query = query.eq('status', status);
    } else {
      // By default, only show open issues
      query = query.eq('status', 'open');
    }
    
    // Add pagination
    query = query.range(offset, offset + limit - 1);
    
    // Execute query
    const { data: issues, error, count } = await query.select('*', { count: 'exact' });
    
    if (error) {
      console.error('Error fetching issues:', error);
      return NextResponse.json({ error: 'Failed to fetch issues' }, { status: 500 });
    }
    
    return NextResponse.json({ 
      issues, 
      pagination: {
        total: count,
        page,
        limit,
        pages: Math.ceil((count || 0) / limit)
      }
    });
    
  } catch (error) {
    console.error('Error in issues API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
