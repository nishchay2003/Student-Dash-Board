import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GraduationCap, 
  CalendarCheck, 
  Building2, 
  Receipt, 
  User,
  Bell,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';
import Logo from './Logo';

interface SidebarLink {
  name: string;
  to: string;
  icon: React.ReactNode;
}

const links: SidebarLink[] = [
  { name: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { name: 'Profile', to: '/profile', icon: <User size={20} /> },
  { name: 'Attendance', to: '/attendance', icon: <CalendarCheck size={20} /> },
  { name: 'Academics', to: '/academics', icon: <GraduationCap size={20} /> },
  { name: 'Hostel', to: '/hostel', icon: <Building2 size={20} /> },
  { name: 'Fees', to: '/fees', icon: <Receipt size={20} /> },
  { name: 'Notifications', to: '/notifications', icon: <Bell size={20} /> },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-20"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 w-64 z-30
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-100">
            <Logo />
          </div>

          {/* User Info */}
          {user && (
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <Avatar 
                  src={user.avatar} 
                  name={user.name} 
                  size="md" 
                />
                <div>
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => `
                      flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                      ${isActive 
                        ? 'text-primary-600 bg-primary-50 font-medium' 
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                      }
                    `}
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        onClose();
                      }
                    }}
                  >
                    <span className="mr-3">{link.icon}</span>
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={logout}
              className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-error-600 transition-colors"
            >
              <LogOut size={20} className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;