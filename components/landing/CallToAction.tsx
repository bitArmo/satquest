import Link from 'next/link';

export default function CallToAction() {
  return (
    <section id="call-to-action" className="py-16 md:py-24 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-blue-900">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left column - content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              Ready to Start Your <span className="underline decoration-4 decoration-blue-900">Bitcoin Quest</span>?
            </h2>
            <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-xl">
              Join a community of developers earning Bitcoin while contributing to projects they love.
            </p>
            
            {/* Option cards */}
            <div className="space-y-4">
              {/* For developers */}
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-5 md:p-6 rounded-xl border border-white border-opacity-30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start">
                  <div className="mb-3 sm:mb-0 sm:mr-4 text-4xl">👨‍💻</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">For Developers</h3>
                    <p className="mb-4 text-blue-900 text-opacity-80">
                      Browse incentivized issues, solve them, and earn Bitcoin for your contributions.
                    </p>
                    <Link 
                      href="/signup" 
                      className="inline-block bg-blue-900 text-yellow-400 px-5 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-blue-800 transition shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
                    >
                      Create Developer Account
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* For project maintainers */}
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-5 md:p-6 rounded-xl border border-white border-opacity-30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start">
                  <div className="mb-3 sm:mb-0 sm:mr-4 text-4xl">🏢</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">For Project Maintainers</h3>
                    <p className="mb-4 text-blue-900 text-opacity-80">
                      List your project, set bounties, and attract talented developers to your issues.
                    </p>
                    <Link 
                      href="/projects/add" 
                      className="inline-block bg-white text-blue-900 px-5 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
                    >
                      List Your Project
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - stats/graphic */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Card stack */}
              <div className="absolute top-4 left-4 w-full h-full bg-white bg-opacity-20 rounded-2xl"></div>
              <div className="absolute top-2 left-2 w-full h-full bg-white bg-opacity-30 rounded-2xl"></div>
              
              {/* Main card */}
              <div className="relative bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h3 className="text-xl font-bold text-blue-900">Platform Stats</h3>
                </div>
                
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                  <div>
                    <p className="text-3xl md:text-4xl font-bold text-blue-900">250+</p>
                    <p className="text-sm text-gray-600">Active Issues</p>
                  </div>
                  <div>
                    <p className="text-3xl md:text-4xl font-bold text-blue-900">$46K+</p>
                    <p className="text-sm text-gray-600">Total Bounties</p>
                  </div>
                  <div>
                    <p className="text-3xl md:text-4xl font-bold text-blue-900">1,200+</p>
                    <p className="text-sm text-gray-600">Developers</p>
                  </div>
                  <div>
                    <p className="text-3xl md:text-4xl font-bold text-blue-900">180+</p>
                    <p className="text-sm text-gray-600">Projects</p>
                  </div>
                </div>
                
                {/* Recent payouts */}
                <div>
                  <h4 className="font-semibold text-blue-900 mb-3">Recent Payouts</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3 text-xs">
                          BF
                        </div>
                        <div>
                          <p className="text-sm font-medium">BitFixer</p>
                          <p className="text-xs text-gray-500">Pagination fix</p>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-yellow-600">21,000 sats</div>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3 text-xs">
                          JS
                        </div>
                        <div>
                          <p className="text-sm font-medium">JSMaster</p>
                          <p className="text-xs text-gray-500">Auth API update</p>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-yellow-600">15,000 sats</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3 text-xs">
                          RD
                        </div>
                        <div>
                          <p className="text-sm font-medium">ReactDev</p>
                          <p className="text-xs text-gray-500">Component fix</p>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-yellow-600">30,000 sats</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
