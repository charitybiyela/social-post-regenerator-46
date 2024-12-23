import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Grid, Video, MessageSquare, Bell, User } from 'lucide-react';

const Navigation = () => {
  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Home', path: '/' },
    { icon: <Search className="w-5 h-5" />, label: 'Search', path: '/search' },
    { icon: <Grid className="w-5 h-5" />, label: 'Explore', path: '/explore' },
    { icon: <Video className="w-5 h-5" />, label: 'Videos', path: '/videos' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Messages', path: '/messages' },
    { icon: <Bell className="w-5 h-5" />, label: 'Notifications', path: '/notifications' },
    { icon: <User className="w-5 h-5" />, label: 'Profile', path: '/profile' }
  ];

  return (
    <nav className="fixed left-0 top-0 h-screen w-12 md:w-48 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col py-6">
      <div className="px-3 mb-6">
        <h1 className="text-lg font-bold hidden md:block">NewsApp</h1>
        <span className="md:hidden text-lg font-bold">N</span>
      </div>
      <ul className="space-y-1 px-2">
        {navItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {item.icon}
              <span className="hidden md:inline-block text-sm">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;