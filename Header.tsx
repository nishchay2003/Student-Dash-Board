import React, { useState } from 'react';
import { Menu, Bell, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { mockNotifications } from '../../data/mockData';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuth();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const unreadNotifications = mockNotifications.filter(n => !n.isRead);

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10 h-16">
      <div className="px-4 md:px-6 h-full flex items-center justify-between mx-auto">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="mr-4 p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 md:hidden"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 hidden md:block">Parul University</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 relative"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <Bell size={20} />
              {unreadNotifications.length > 0 && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-error-500 ring-2 ring-white" />
              )}
            </button>

            {/* Notifications dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="font-medium">Notifications</h3>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {mockNotifications.length > 0 ? (
                    <div>
                      {mockNotifications.slice(0, 5).map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`px-4 py-3 border-b border-gray-100 last:border-0 ${!notification.isRead ? 'bg-gray-50' : ''}`}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                              <span className={`
                                inline-block w-2 h-2 rounded-full
                                ${notification.type === 'info' ? 'bg-blue-500' : ''}
                                ${notification.type === 'warning' ? 'bg-warning-500' : ''}
                                ${notification.type === 'error' ? 'bg-error-500' : ''}
                                ${notification.type === 'success' ? 'bg-success-500' : ''}
                              `}></span>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                {new Date(notification.date).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center text-gray-500">
                      <p>No notifications</p>
                    </div>
                  )}
                </div>
                <div className="px-4 py-2 border-t border-gray-100">
                  <a 
                    href="/notifications" 
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    View all notifications
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* User profile */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <Avatar 
                src={user?.avatar}
                name={user?.name || 'User'} 
                size="sm" 
              />
            </button>

            {/* User dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <a 
                  href="/profile" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </a>
                <a 
                  href="/settings" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;