import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ManageProjectIssues from '@/components/dashboard/ManageProjectIssues';

export const metadata: Metadata = {
  title: 'Manage Project Issues | SatQuest',
  description: 'Manage issues and bounties for your open source project',
};

// This is a server component that fetches data
async function getProject(projectId: string) {
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();
  
  if (error || !project) {
    return null;
  }
  
  return project;
}

async function getProjectIssues(projectId: string) {
  const { data: issues, error } = await supabase
    .from('issues')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching issues:', error);
    return [];
  }
  
  return issues;
}

export default async function ProjectIssuesPage({ params }: { params: { projectId: string } }) {
  const project = await getProject(params.projectId);
  
  if (!project) {
    notFound();
  }
  
  const issues = await getProjectIssues(params.projectId);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              <Link href="/" className="flex items-center">
                <span className="text-yellow-400 mr-1">Sat</span>Quest
              </Link>
            </h1>
            
            <nav className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-white hover:text-yellow-400 transition-colors">
                Browse Issues
              </Link>
              <Link href="/dashboard/projects" className="text-white hover:text-yellow-400 transition-colors">
                Projects
              </Link>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-blue-900 font-bold">
                U
              </div>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            href={`/dashboard/projects/${project.id}`} 
            className="text-blue-900 hover:text-blue-700 transition-colors flex items-center"
          >
            ← Back to Project
          </Link>
          <h2 className="text-3xl font-bold text-blue-900 mt-4">{project.name}: Issues</h2>
          <p className="text-gray-600 mt-2">
            Manage issues and bounties for this project.
          </p>
        </div>
        
        <ManageProjectIssues projectId={project.id} issues={issues} />
      </main>
    </div>
  );
}
