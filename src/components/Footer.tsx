import { Link } from "react-router-dom";
import { Brain, Rocket, BarChart2, Database } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              About Our Engine
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Powered by advanced AI and emotional intelligence, our news regeneration engine delivers personalized content tailored to your preferences and mood.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Rocket className="w-5 h-5 text-primary" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">About</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Contact</Link></li>
              <li><Link to="/news-engine" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">News Engine</Link></li>
              <li><Link to="/personalize" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Personalize</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-primary" />
              Features
            </h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">AI Personalization</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Weight Analysis</Link></li>
              <li><Link to="/cookies" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Emotional Intelligence</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              Connect With Us
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Stay updated with our latest AI-driven news delivery innovations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">Twitter</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">LinkedIn</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">GitHub</a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} News Regeneration Engine. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;