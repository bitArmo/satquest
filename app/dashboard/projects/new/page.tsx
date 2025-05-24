import { Metadata } from 'next';
import Link from 'next/link';
import NewProjectForm from '@/components/dashboard/NewProjectForm';

export const metadata: Metadata = {
  title: 'Add New Project | SatQuest',
  description: 'Add a new open source project to SatQuest',
};

export default function NewProjectPage() {
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
          <h2 className="text-3xl font-bold text-blue-900 mt-4">Add New Project</h2>
          <p className="text-gray-600 mt-2">
            Add your open source project to SatQuest and start incentivizing contributions with Bitcoin rewards.
          </p>
        </div>
        
        <NewProjectForm />
      </main>
    </div>
  );
}
