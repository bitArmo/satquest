"use client";

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import RepoSelector from './RepoSelector';

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

interface Webhook {
  id: number;
  url: string;
  events: string[];
}

interface WebhookRegistrationProps {
  onSuccess?: (webhook: Webhook) => void;
}

export default function WebhookRegistration({ onSuccess }: WebhookRegistrationProps) {
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [events, setEvents] = useState<string[]>(['issues', 'issue_comment', 'pull_request']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const availableEvents = [
    { id: 'issues', label: 'Issues' },
    { id: 'issue_comment', label: 'Issue Comments' },
    { id: 'pull_request', label: 'Pull Requests' },
    { id: 'push', label: 'Push Events' },
    { id: 'release', label: 'Releases' }
  ];

  const handleToggleEvent = (eventId: string) => {
    setEvents(prev => {
      if (prev.includes(eventId)) {
        return prev.filter(e => e !== eventId);
      } else {
        return [...prev, eventId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRepo) {
      setError('Please select a repository');
      return;
    }
    
    if (events.length === 0) {
      setError('Please select at least one event type');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await fetch('/api/github/webhooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          owner: selectedRepo.owner.login,
          repo: selectedRepo.name,
          events,
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to register webhook');
      }
      
      const data = await response.json();
      setSuccess(`Webhook successfully registered for ${selectedRepo.full_name}`);
      
      if (onSuccess) {
        onSuccess(data.webhook);
      }
    } catch (error) {
      console.error('Error registering webhook:', error);
      setError(error instanceof Error ? error.message : 'Failed to register webhook');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-blue-900 mb-4">Register GitHub Webhook</h2>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 text-green-700 p-3 rounded-md mb-4">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Repository
          </label>
          <RepoSelector 
            onSelect={(repo) => {
              setSelectedRepo(repo);
              setError(null);
            }}
            selectedRepo={selectedRepo || undefined}
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Events to Subscribe
          </label>
          <div className="space-y-2">
            {availableEvents.map((event) => (
              <div key={event.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`event-${event.id}`}
                  checked={events.includes(event.id)}
                  onChange={() => handleToggleEvent(event.id)}
                  className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`event-${event.id}`} className="ml-2 text-gray-700">
                  {event.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-70"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Registering...
            </span>
          ) : (
            'Register Webhook'
          )}
        </button>
      </form>
    </div>
  );
}
