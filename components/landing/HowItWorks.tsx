export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">How SatQuest Works</h2>
          <p className="text-lg text-gray-600">
            Join the Bitcoin-powered open source ecosystem in three easy steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {/* Step 1 */}
          <div className="relative">
            {/* Number */}
            <div className="absolute z-10 -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-blue-700 text-white text-xl font-bold flex items-center justify-center shadow-lg border-4 border-white">
              1
            </div>
            {/* Content */}
            <div className="bg-white p-6 md:p-8 pt-12 rounded-xl shadow-md border border-gray-100 h-full relative z-0 hover:shadow-lg transition-shadow duration-300">
              <div className="text-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 mx-auto text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3 text-center">Find an Issue</h3>
              <p className="text-gray-600">
                Browse open source issues with Bitcoin bounties attached. Filter by programming language, difficulty, or bounty size.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <span className="block">• Browse by programming language</span>
                <span className="block">• Filter by difficulty level</span>
                <span className="block">• Sort by bounty amount</span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            {/* Number */}
            <div className="absolute z-10 -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-blue-700 text-white text-xl font-bold flex items-center justify-center shadow-lg border-4 border-white">
              2
            </div>
            {/* Content */}
            <div className="bg-white p-6 md:p-8 pt-12 rounded-xl shadow-md border border-gray-100 h-full relative z-0 hover:shadow-lg transition-shadow duration-300">
              <div className="text-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 mx-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3 text-center">Solve & Submit</h3>
              <p className="text-gray-600">
                Work on the issue and submit your pull request. Our platform automatically tracks your PR on GitHub.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <span className="block">• Fork the repository</span>
                <span className="block">• Create a Pull Request</span>
                <span className="block">• Get review feedback</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            {/* Number */}
            <div className="absolute z-10 -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-blue-700 text-white text-xl font-bold flex items-center justify-center shadow-lg border-4 border-white">
              3
            </div>
            {/* Content */}
            <div className="bg-white p-6 md:p-8 pt-12 rounded-xl shadow-md border border-gray-100 h-full relative z-0 hover:shadow-lg transition-shadow duration-300">
              <div className="text-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1] h-12 w-12 md:h-16 md:w-16 mx-auto text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3 text-center">Get Paid in Bitcoin</h3>
              <p className="text-gray-600">
                Once your PR is accepted, receive the bounty instantly to your Lightning wallet. No delays, no transaction fees.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <span className="block">• Instant Lightning payments</span>
                <span className="block">• Build your payment history</span>
                <span className="block">• Find your next bounty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-12 md:mt-16 bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 flex-shrink-0">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="Developer testimonial" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="text-yellow-400 flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-gray-600 italic mb-2 text-lg">
                "SatQuest has been a game-changer for me. I've earned over 2 million sats working on projects I'm passionate about while improving my coding skills."
              </blockquote>
              <div className="font-bold text-blue-800">Alex Rodriguez</div>
              <div className="text-sm text-gray-500">Full Stack Developer • 26 completed bounties</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
