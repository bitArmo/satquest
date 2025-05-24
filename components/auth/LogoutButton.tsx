"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Loader2 } from 'lucide-react';

interface LogoutButtonProps {
  variant?: 'default' | 'minimal';
  className?: string;
}

export default function LogoutButton({ variant = 'default', className = '' }: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        // Redirect to home page after successful logout
        router.push('/');
        router.refresh();
      } else {
        console.error('Logout failed');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoading(false);
    }
  };

  if (variant === 'minimal') {
    return (
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className={`text-gray-600 hover:text-gray-900 flex items-center gap-1 ${className}`}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <LogOut className="h-4 w-4" />
        )}
        <span>Logout</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70 ${className}`}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <LogOut className="h-5 w-5" />
      )}
      <span>Sign Out</span>
    </button>
  );
}
