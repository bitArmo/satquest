import { Metadata } from 'next';
import Link from 'next/link';
import AvailableIssues from '@/components/dashboard/AvailableIssues';
import { supabase } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Dashboard | SatQuest',
  description: 'Browse Bitcoin-incentivized open source issues',
};

// This is a server component that fetches data
async function getIssues() {
  const { data: issues, error } = await supabase
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
    .eq('status', 'open')
    .order('created_at', { ascending: false })
    .limit(10);
  
  if (error) {
    console.error('Error fetching issues:', error);
    return [];
  }
  
  return issues;
}

export default async function DashboardPage() {
  const issues = await getIssues();
  
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
          <h2 className="text-3xl font-bold text-blue-900">Available Bounties</h2>
          <div className="flex space-x-4">
            <Link 
              href="/dashboard/projects" 
              className="text-blue-900 hover:text-blue-700 transition-colors"
            >
              View All Projects
            </Link>
            <Link 
              href="/dashboard/projects/new" 
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Add New Project
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AvailableIssues issues={issues} />
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
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
                  Reward Amount
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'reward-1', label: '< 10,000 sats' },
                    { id: 'reward-2', label: '10,000 - 50,000 sats' },
                    { id: 'reward-3', label: '50,000 - 100,000 sats' },
                    { id: 'reward-4', label: '> 100,000 sats' }
                  ].map((option) => (
                    <div key={option.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={option.id}
                        className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={option.id} className="ml-2 text-gray-700">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors mt-4"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
