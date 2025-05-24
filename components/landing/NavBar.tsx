"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-primary-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <img 
                src="/sq-logo.svg" 
                alt="SatQuest Logo" 
                className="h-12 w-auto"
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="#how-it-works" 
              className="text-white hover:text-yellow-300 px-3 py-2 text-sm font-medium transition-colors flex items-center"
            >
              How It Works
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
            <a 
              href="#call-to-action" 
              className="text-white hover:text-yellow-300 px-3 py-2 text-sm font-medium transition-colors flex items-center"
            >
              Get Started
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
            <Link 
              href="/sign-in" 
              className="bg-yellow-400 hover:bg-yellow-300 text-primary-900 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
            >
              Sign In
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
          <div className="md:hidden mt-2 pb-2">
            <div className="px-2 pt-2 space-y-1">
              <a 
                href="#how-it-works" 
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-800 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a 
                href="#call-to-action" 
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-800 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <div className="pt-2 mt-1">
                <Link 
                  href="/sign-in" 
                  className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-primary-900 bg-yellow-400 hover:bg-yellow-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>

  );
}
