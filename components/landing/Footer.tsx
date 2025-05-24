import { Github, Twitter, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-900 text-white py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {/* Column 1: Logo & About */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-yellow-400 text-2xl mr-2">⚡</span>
              <span className="font-bold text-xl">SatQuest</span>
            </div>
            <p className="text-gray-400 mb-5 text-sm">
              The open source contribution marketplace powered by Bitcoin Lightning Network.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
                aria-label="Follow us on Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com" 
                className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
                aria-label="Visit our GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://discord.com" 
                className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
                aria-label="Join our Discord"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-yellow-400">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/explore" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">Browse Issues</a></li>
              <li><a href="/projects" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">Explore Projects</a></li>
              <li><a href="/how-it-works" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">How It Works</a></li>
              <li><a href="/blog" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">Blog</a></li>
              <li><a href="/faq" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">FAQs</a></li>
            </ul>
          </div>

          {/* Column 3: For Developers */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-yellow-400">For Developers</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/signup" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">Join as Developer</a></li>
              <li><a href="/wallet" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">Connect Wallet</a></li>
              <li><a href="/leaderboard" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">Developer Leaderboard</a></li>
              <li><a href="/success-stories" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">Success Stories</a></li>
            </ul>
          </div>

          {/* Column 4: For Projects */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-yellow-400">For Projects</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/projects/add" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">List Your Project</a></li>
              <li><a href="/pricing" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">Pricing</a></li>
              <li><a href="/case-studies" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">Case Studies</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 mt-8 border-t border-blue-800 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            &copy; {currentYear} SatQuest. Built with &hearts; by armo.
          </div>
          <div className="space-x-4">
            <a href="/terms" className="hover:text-yellow-500 transition-colors duration-300">Terms of Service</a>
            <a href="/privacy" className="hover:text-yellow-500 transition-colors duration-300">Privacy Policy</a>
            <a href="/legal" className="hover:text-yellow-500 transition-colors duration-300">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
