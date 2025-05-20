import React from 'react';
import Card from '../components/ui/Card';
import StatCard from '../components/dashboard/StatCard';
import AttendanceChart from '../components/dashboard/AttendanceChart';
import FeesChart from '../components/dashboard/FeesChart';
import { 
  CalendarCheck, 
  Receipt, 
  GraduationCap, 
  Bell, 
  CreditCard,
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import { 
  mockAttendanceSummary, 
  mockFeeDetails, 
  mockNotifications, 
  mockStudent 
} from '../data/mockData';
import Badge from '../components/ui/Badge';

const DashboardPage: React.FC = () => {
  // Calculate average attendance
  const averageAttendance = mockAttendanceSummary.reduce(
    (acc, subject) => acc + subject.percentage, 0
  ) / mockAttendanceSummary.length;

  // Get pending fees
  const pendingFees = mockFeeDetails.filter(fee => fee.status === 'pending' || fee.status === 'overdue');
  
  // Get unread notifications
  const unreadNotifications = mockNotifications.filter(notif => !notif.isRead);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {mockStudent.name}!</h1>
        <p className="text-gray-600 mt-1">Here's your dashboard summary</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Average Attendance" 
          value={`${averageAttendance.toFixed(1)}%`} 
          icon={<CalendarCheck size={20} className="text-primary-700" />}
          change={{ value: 3.2, isPositive: true }}
          iconBackground="bg-primary-100"
        />
        
        <StatCard 
          title="Pending Fees" 
          value={`₹${pendingFees.reduce((acc, fee) => acc + fee.amount, 0).toLocaleString()}`} 
          icon={<Receipt size={20} className="text-secondary-700" />}
          iconBackground="bg-secondary-100"
        />
        
        <StatCard 
          title="Current Semester" 
          value={`Semester ${mockStudent.semester}`} 
          icon={<GraduationCap size={20} className="text-accent-700" />}
          iconBackground="bg-accent-100"
        />
        
        <StatCard 
          title="Notifications" 
          value={`${unreadNotifications.length} Unread`} 
          icon={<Bell size={20} className="text-error-500" />}
          iconBackground="bg-red-100"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AttendanceChart />
        <FeesChart />
      </div>
      
      {/* Additional Info Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upcoming Fees */}
        <Card 
          title="Upcoming Fees"
          icon={<CreditCard size={20} />}
        >
          <div className="space-y-4">
            {pendingFees.slice(0, 3).map(fee => (
              <div key={fee.id} className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium text-gray-800">{fee.feeType}</h4>
                  <p className="text-xs text-gray-500">Due: {new Date(fee.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">₹{fee.amount.toLocaleString()}</p>
                  <Badge 
                    variant={fee.status === 'pending' ? 'warning' : 'error'}
                  >
                    {fee.status === 'pending' ? 'Pending' : 'Overdue'}
                  </Badge>
                </div>
              </div>
            ))}
            
            {pendingFees.length === 0 && (
              <div className="py-4 text-center text-gray-500">
                <p>No pending fees!</p>
              </div>
            )}
          </div>
        </Card>
        
        {/* Attendance Warnings */}
        <Card 
          title="Attendance Alerts"
          icon={<AlertCircle size={20} />}
        >
          <div className="space-y-4">
            {mockAttendanceSummary
              .filter(subject => subject.percentage < 75)
              .slice(0, 3)
              .map(subject => (
                <div key={subject.subjectId} className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">{subject.subjectName}</h4>
                    <p className="text-xs text-gray-500">Below minimum requirement</p>
                  </div>
                  <Badge 
                    variant={subject.percentage < 65 ? 'error' : 'warning'}
                  >
                    {subject.percentage.toFixed(1)}%
                  </Badge>
                </div>
              ))}
            
            {mockAttendanceSummary.filter(subject => subject.percentage < 75).length === 0 && (
              <div className="py-4 text-center text-gray-500">
                <p>No attendance warnings!</p>
              </div>
            )}
          </div>
        </Card>
        
        {/* Upcoming Events */}
        <Card 
          title="Recent Notifications"
          icon={<Bell size={20} />}
        >
          <div className="space-y-4">
            {mockNotifications.slice(0, 3).map(notification => (
              <div key={notification.id} className="flex space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <span className={`
                    inline-block w-2 h-2 rounded-full
                    ${notification.type === 'info' ? 'bg-blue-500' : ''}
                    ${notification.type === 'warning' ? 'bg-warning-500' : ''}
                    ${notification.type === 'error' ? 'bg-error-500' : ''}
                    ${notification.type === 'success' ? 'bg-success-500' : ''}
                  `}></span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">{notification.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notification.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;