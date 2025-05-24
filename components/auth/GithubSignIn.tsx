"use client";

import { useState } from 'react';
import { Github, Loader2 } from 'lucide-react';

export default function GithubSignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/github');
      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Failed to get GitHub authorization URL');
      }
    } catch (error) {
      console.error('GitHub sign-in error:', error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-70"
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Github className="h-5 w-5" />
      )}
      <span>Continue with GitHub</span>
    </button>
  );
}
