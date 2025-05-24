import Link from 'next/link';
import { Project } from '@/types';
import { ExternalLink, GitFork, Star } from 'lucide-react';

interface ProjectsListProps {
  projects: Project[];
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-900">Open Source Projects</h2>
      
      {projects.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">No projects found. Check back later or add a new project.</p>
          <Link 
            href="/dashboard/projects/new" 
            className="mt-4 inline-block bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Add New Project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2 truncate">
                  {project.name}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2 h-12">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.languages.map((language: string, index: number) => (
                    <span 
                      key={index} 
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {language}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4 text-gray-500 text-sm">
                    <span className="flex items-center">
                      <Star size={16} className="mr-1" />
                      120
                    </span>
                    <span className="flex items-center">
                      <GitFork size={16} className="mr-1" />
                      45
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <a 
                      href={project.repository_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-900 transition-colors"
                    >
                      <ExternalLink size={18} />
                    </a>
                    <Link 
                      href={`/dashboard/projects/${project.id}`}
                      className="bg-blue-900 hover:bg-blue-800 text-white text-sm py-1 px-3 rounded transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
