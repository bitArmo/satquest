"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User } from '@/types/auth';
import LogoutButton from './LogoutButton';

interface UserProfileProps {
  initialUser?: User | null;
}

export default function UserProfile({ initialUser }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [isLoading, setIsLoading] = useState(!initialUser);

  useEffect(() => {
    if (!initialUser) {
      fetchUser();
    }
  }, [initialUser]);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/auth/user');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Link 
        href="/sign-in" 
        className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Sign In
      </Link>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="relative group">
        <div className="flex items-center space-x-2 cursor-pointer">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={user.username}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="font-medium">{user.username}</span>
        </div>
        
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
          <Link 
            href="/dashboard/settings" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Settings
          </Link>
          <div className="px-4 py-2">
            <LogoutButton variant="minimal" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
