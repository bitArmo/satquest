import { Metadata } from 'next';
import Link from 'next/link';
import ProjectsList from '@/components/dashboard/ProjectsList';
import { supabase } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Projects | SatQuest',
  description: 'Browse open source projects with Bitcoin bounties',
};

// This is a server component that fetches data
async function getProjects() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  
  return projects;
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  
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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900">Open Source Projects</h2>
          <Link 
            href="/dashboard/projects/new" 
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Add New Project
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 order-last lg:order-first">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Filters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Programming Languages
                  </label>
                  <div className="space-y-2">
                    {['JavaScript', 'TypeScript', 'Python', 'Rust', 'Go'].map((language) => (
                      <div key={language} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`lang-${language}`}
                          className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`lang-${language}`} className="ml-2 text-gray-700">
                          {language}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <select
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option>Most Recent</option>
                    <option>Most Stars</option>
                    <option>Most Issues</option>
                    <option>Highest Bounties</option>
                  </select>
                </div>
                
                <button
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors mt-4"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <ProjectsList projects={projects} />
          </div>
        </div>
      </main>
    </div>
  );
}
