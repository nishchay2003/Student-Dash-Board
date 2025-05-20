import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import Card from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  iconBackground?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  iconBackground = 'bg-primary-100',
  className = '',
}) => {
  return (
    <Card className={`transform transition-transform duration-300 hover:scale-[1.02] ${className}`}>
      <div className="flex items-start">
        <div className={`p-3 rounded-lg ${iconBackground}`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h4 className="text-2xl font-semibold text-gray-800 mt-1">{value}</h4>
          
          {change && (
            <div className="flex items-center mt-1">
              <span
                className={`flex items-center text-sm ${
                  change.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {change.isPositive ? (
                  <ArrowUp size={16} className="mr-1" />
                ) : (
                  <ArrowDown size={16} className="mr-1" />
                )}
                {change.value}%
              </span>
              <span className="ml-1.5 text-xs text-gray-500">from last month</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;