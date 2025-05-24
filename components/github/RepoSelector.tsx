"use client";

import { useState, useEffect } from 'react';
import { Loader2, Search, ChevronDown } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface RepoSelectorProps {
  onSelect: (repo: Repository) => void;
  selectedRepo?: Repository;
}

export default function RepoSelector({ onSelect, selectedRepo }: RepoSelectorProps) {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRepos(repos);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredRepos(
        repos.filter(repo => 
          repo.name.toLowerCase().includes(query) || 
          repo.full_name.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, repos]);

  const fetchRepositories = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/github/repos?per_page=100');
      
      if (!response.ok) {
        throw new Error('Failed to fetch repositories');
      }
      
      const data = await response.json();
      setRepos(data.repos);
      setFilteredRepos(data.repos);
    } catch (error) {
      console.error('Error fetching repositories:', error);
      setError('Failed to load repositories. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectRepo = (repo: Repository) => {
    onSelect(repo);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div 
        className="flex items-center justify-between w-full p-3 border border-gray-300 rounded-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedRepo ? (
          <div className="flex items-center">
            <span className="font-medium">{selectedRepo.full_name}</span>
          </div>
        ) : (
          <span className="text-gray-500">Select a repository</span>
        )}
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search repositories..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                <span className="ml-2">Loading repositories...</span>
              </div>
            ) : error ? (
              <div className="p-4 text-red-500">{error}</div>
            ) : filteredRepos.length === 0 ? (
              <div className="p-4 text-gray-500">No repositories found</div>
            ) : (
              <ul>
                {filteredRepos.map(repo => (
                  <li 
                    key={repo.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectRepo(repo)}
                  >
                    <div className="font-medium">{repo.full_name}</div>
                    {repo.description && (
                      <div className="text-sm text-gray-500 truncate">{repo.description}</div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
