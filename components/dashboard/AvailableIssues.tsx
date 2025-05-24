import Link from 'next/link';
import { Issue } from '@/types';
import { Bitcoin, Clock, Tag } from 'lucide-react';

interface AvailableIssuesProps {
  issues: Issue[];
}

export default function AvailableIssues({ issues }: AvailableIssuesProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-900">Available Issues</h2>
      
      {issues.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">No issues available at the moment. Check back later.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {issues.map((issue) => (
            <div key={issue.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">
                    {issue.title}
                  </h3>
                  <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                    <Bitcoin size={16} className="mr-1" />
                    <span>{issue.reward_amount.toLocaleString()} sats</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {issue.description}
                </p>
                
                <div className="flex flex-wrap items-center justify-between mt-4">
                  <div className="flex items-center space-x-4 text-gray-500 text-sm">
                    <span className="flex items-center">
                      <Tag size={16} className="mr-1" />
                      {issue.status}
                    </span>
                    <span className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {new Date(issue.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <Link 
                    href={`/dashboard/projects/${issue.project_id}/issues/${issue.id}`}
                    className="bg-blue-900 hover:bg-blue-800 text-white text-sm py-1 px-3 rounded transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
