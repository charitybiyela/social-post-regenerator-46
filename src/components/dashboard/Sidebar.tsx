import React from 'react';
import { Home, Search, Compass, Film, MessageSquare, Bell, PlusCircle, User } from 'lucide-react';

const navigationItems = [
  { icon: Home, label: 'Home' },
  { icon: Search, label: 'Search' },
  { icon: Compass, label: 'Explore' },
  { icon: Film, label: 'Videos' },
  { icon: MessageSquare, label: 'Messages' },
  { icon: Bell, label: 'Notifications' },
  { icon: PlusCircle, label: 'Create' },
  { icon: User, label: 'Profile' },
];

export const Sidebar = () => {
  return (
    <div className="hidden md:flex w-64 border-r border-border bg-sidebar-background text-sidebar-foreground p-4 flex-col gap-6 h-screen sticky top-0">
      <div className="text-xl font-bold mb-8">News Dashboard</div>
      {navigationItems.map((item, index) => (
        <button
          key={index}
          className="flex items-center gap-4 p-3 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
        >
          <item.icon className="w-6 h-6" />
          <span className="text-sm font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
};