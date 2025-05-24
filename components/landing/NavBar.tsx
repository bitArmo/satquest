"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-primary-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <div className="logo-container">
                <img 
                  src="/sq-logo.svg" 
                  alt="SatQuest Logo" 
                  className="h-32 w-32"
                />
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Home
            </Link>
            <Link href="#features" className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              How It Works
            </Link>
            <Link 
              href="/dashboard" 
              className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="text-white hover:text-yellow-300 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="/" 
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="#features" 
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#how-it-works" 
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-800"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                href="/dashboard" 
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-700 hover:bg-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <div className="pt-2 mt-2 border-t border-blue-800">
                <Link 
                  href="/sign-in" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  href="/sign-up" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 bg-yellow-400 hover:bg-yellow-300 mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
