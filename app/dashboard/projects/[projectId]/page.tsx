import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ExternalLink, GitFork, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Project Details | SatQuest',
  description: 'View project details and available issues',
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

export default async function ProjectDetailPage({ params }: { params: { projectId: string } }) {
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
            href="/dashboard/projects" 
            className="text-blue-900 hover:text-blue-700 transition-colors flex items-center"
          >
            ← Back to Projects
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h2 className="text-3xl font-bold text-blue-900">{project.name}</h2>
              <p className="text-gray-600 mt-2 mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.languages && project.languages.map((language: string, index: number) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {language}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center space-x-4 text-gray-500 text-sm">
                <span className="flex items-center">
                  <Star size={16} className="mr-1" />
                  120
                </span>
                <span className="flex items-center">
                  <GitFork size={16} className="mr-1" />
                  45
                </span>
                <span>Created: {new Date(project.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <a 
                href={project.repository_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
              >
                <ExternalLink size={16} className="mr-2" />
                View on GitHub
              </a>
              <Link 
                href={`/dashboard/projects/${project.id}/issues`}
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition-colors text-center"
              >
                Manage Issues
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mb-6 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-blue-900">Project Issues</h3>
          <Link 
            href={`/dashboard/projects/${project.id}/issues`}
            className="text-blue-900 hover:text-blue-700 transition-colors"
          >
            View All Issues
          </Link>
        </div>
        
        {issues.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 mb-4">No issues have been added to this project yet.</p>
            <Link 
              href={`/dashboard/projects/${project.id}/issues`}
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition-colors inline-block"
            >
              Add First Issue
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {issues.slice(0, 5).map((issue: any) => (
              <div key={issue.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">
                      {issue.title}
                    </h3>
                    <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                      <span>{issue.reward_amount.toLocaleString()} sats</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {issue.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-between mt-4">
                    <div className="flex items-center space-x-4 text-gray-500 text-sm">
                      <span>GitHub Issue: #{issue.github_issue_id}</span>
                      <span>Status: {issue.status}</span>
                      <span>Created: {new Date(issue.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
