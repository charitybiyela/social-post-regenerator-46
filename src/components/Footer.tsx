import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your trusted source for real-time news and updates, delivering accurate and timely information across multiple sectors.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent">About</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent">Contact</Link></li>
              <li><Link to="/careers" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent">Careers</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent">Cookie Policy</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect With Us</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Follow us on social media for the latest updates and breaking news.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-accent">Twitter</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-accent">Facebook</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-accent">LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} News Dashboard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;