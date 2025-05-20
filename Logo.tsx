import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/dashboard" className="flex items-center">
      <GraduationCap className="text-primary-500" size={28} />
      <div className="ml-2">
        <span className="text-lg font-bold text-primary-500">PU</span>
        <span className="text-lg font-medium text-gray-800">Dashboard</span>
      </div>
    </Link>
  );
};

export default Logo;