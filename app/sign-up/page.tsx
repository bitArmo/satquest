import Link from 'next/link';
import { Metadata } from 'next';
import GithubSignIn from '@/components/auth/GithubSignIn';

export const metadata: Metadata = {
  title: 'Sign Up | SatQuest',
  description: 'Create a new SatQuest account',
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center text-3xl font-bold">
          <span className="text-yellow-400">Sat</span>
          <span className="text-blue-900">Quest</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/sign-in" className="font-medium text-blue-900 hover:text-blue-800">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <GithubSignIn />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  What to expect
                </span>
              </div>
            </div>
            
            <div className="text-sm text-gray-500 space-y-2">
              <p>
                After signing up with GitHub, you'll be able to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Add your open source projects</li>
                <li>Create Bitcoin-incentivized issues</li>
                <li>Contribute to other projects and earn Bitcoin</li>
                <li>Connect your Lightning wallet for instant payments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
