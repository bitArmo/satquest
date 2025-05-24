"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OAuthDebugPage() {
  const [redirectUri, setRedirectUri] = useState<string>('');
  const [clientId, setClientId] = useState<string>('');
  const [baseUrl, setBaseUrl] = useState<string>('');
  const [fullCallbackUrl, setFullCallbackUrl] = useState<string>('');

  useEffect(() => {
    // Get the base URL of the current page
    const protocol = window.location.protocol;
    const host = window.location.host;
    const baseUrl = `${protocol}//${host}`;
    setBaseUrl(baseUrl);
    
    // Construct the full callback URL
    const callbackUrl = `${baseUrl}/api/auth/github/callback`;
    setFullCallbackUrl(callbackUrl);
    
    // Fetch the redirect URI from the API
    fetch('/api/auth/github/config')
      .then(response => response.json())
      .then(data => {
        setRedirectUri(data.redirectUri || 'Not configured');
        setClientId(data.clientId || 'Not configured');
      })
      .catch(error => {
        console.error('Error fetching OAuth config:', error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">GitHub OAuth Debug</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Current Configuration</h2>
        
        <div className="space-y-4">
          <div>
            <p className="font-medium">GitHub Client ID:</p>
            <p className="bg-gray-100 p-2 rounded">{clientId}</p>
          </div>
          
          <div>
            <p className="font-medium">Configured Redirect URI:</p>
            <p className="bg-gray-100 p-2 rounded">{redirectUri}</p>
          </div>
          
          <div>
            <p className="font-medium">Current Base URL:</p>
            <p className="bg-gray-100 p-2 rounded">{baseUrl}</p>
          </div>
          
          <div>
            <p className="font-medium">Full Callback URL (use this in GitHub):</p>
            <p className="bg-gray-100 p-2 rounded">{fullCallbackUrl}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Instructions</h2>
        
        <ol className="list-decimal pl-5 space-y-2">
          <li>Go to your <a href="https://github.com/settings/developers" target="_blank" className="text-blue-600 hover:underline">GitHub OAuth Apps</a> settings</li>
          <li>Find and edit your SatQuest application</li>
          <li>Set the "Authorization callback URL" to the "Full Callback URL" shown above</li>
          <li>Save your changes</li>
          <li>Update your <code>.env.local</code> file with the following:</li>
        </ol>
        
        <div className="bg-gray-800 text-white p-4 rounded mt-4 overflow-x-auto">
          <pre>{`GITHUB_REDIRECT_URI=${fullCallbackUrl}`}</pre>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Link href="/" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors">
          Back to Home
        </Link>
        
        <Link href="/sign-in" className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          Try Sign In
        </Link>
      </div>
    </div>
  );
}
