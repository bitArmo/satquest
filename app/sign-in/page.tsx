import Link from 'next/link';
import { Metadata } from 'next';
import GithubSignIn from '@/components/auth/GithubSignIn';

export const metadata: Metadata = {
  title: 'Sign In | SatQuest',
  description: 'Sign in to your SatQuest account',
};

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center text-3xl font-bold">
          <span className="text-yellow-400">Sat</span>
          <span className="text-blue-900">Quest</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/sign-up" className="font-medium text-blue-900 hover:text-blue-800">
            create a new account
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
                  Why GitHub?
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 text-center">
              We use GitHub authentication to verify your identity and connect to your GitHub account for seamless project and issue management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
