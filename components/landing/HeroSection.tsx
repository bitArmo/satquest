import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-blue-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Earn Bitcoin for Open Source Contributions
          </h1>
          <p className="text-xl mb-10">
            Connect with Bitcoin-incentivized GitHub issues and get rewarded for your valuable contributions to open source projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              href="/dashboard" 
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Browse Issues
            </Link>
            <Link 
              href="#how-it-works" 
              className="bg-transparent hover:bg-white/10 border-2 border-white py-3 px-8 rounded-lg transition-colors"
            >
              Learn How It Works
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { label: 'Active Issues', value: '250+' },
              { label: 'Open Source Projects', value: '120+' },
              { label: 'Total Bounties', value: '₿ 5.8' },
              { label: 'Developers', value: '1,500+' }
            ].map((stat, index) => (
              <div key={index} className="bg-blue-800/50 rounded-lg p-6 backdrop-blur-sm">
                <p className="text-4xl font-bold text-yellow-400">{stat.value}</p>
                <p className="text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
