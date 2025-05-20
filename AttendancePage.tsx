import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { 
  CalendarCheck, 
  Calendar, 
  PieChart, 
  Filter
} from 'lucide-react';
import { mockAttendanceRecords, mockAttendanceSummary } from '../data/mockData';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const AttendancePage: React.FC = () => {
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterMonth, setFilterMonth] = useState<string>('all');

  // Filtered records based on selected filters
  const filteredRecords = mockAttendanceRecords.filter(record => {
    const matchesSubject = filterSubject === 'all' || record.subjectId === filterSubject;
    const recordDate = new Date(record.date);
    const recordMonth = recordDate.getMonth() + 1;
    const matchesMonth = filterMonth === 'all' || recordMonth.toString() === filterMonth;
    
    return matchesSubject && matchesMonth;
  });

  // Calculate overall summary for pie chart
  const attendanceStatusCount = {
    present: mockAttendanceRecords.filter(r => r.status === 'present').length,
    absent: mockAttendanceRecords.filter(r => r.status === 'absent').length,
    late: mockAttendanceRecords.filter(r => r.status === 'late').length
  };

  const pieChartData = [
    { name: 'Present', value: attendanceStatusCount.present, color: '#4CAF50' },
    { name: 'Absent', value: attendanceStatusCount.absent, color: '#F44336' },
    { name: 'Late', value: attendanceStatusCount.late, color: '#FFC107' }
  ];

  // Month options for filter
  const monthOptions = [
    { value: 'all', label: 'All Months' },
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  // Subject options for filter
  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    ...mockAttendanceRecords
      .map(record => ({ value: record.subjectId, label: record.subjectName }))
      .filter((subject, index, self) => 
        index === self.findIndex(s => s.value === subject.value)
      )
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
        <p className="text-gray-600 mt-1">View and track your attendance records</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <Filter size={18} className="text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="subject-filter" className="block text-xs font-medium text-gray-500 mb-1">
                Subject
              </label>
              <select
                id="subject-filter"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
              >
                {subjectOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="month-filter" className="block text-xs font-medium text-gray-500 mb-1">
                Month
              </label>
              <select
                id="month-filter"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
              >
                {monthOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Summary Chart */}
        <Card 
          title="Attendance Overview"
          icon={<PieChart size={20} />}
          className="col-span-1"
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="border border-gray-100 rounded-md p-2 text-center">
              <div className="text-xl font-bold text-success-500">
                {attendanceStatusCount.present}
              </div>
              <div className="text-xs text-gray-500">Present</div>
            </div>
            <div className="border border-gray-100 rounded-md p-2 text-center">
              <div className="text-xl font-bold text-error-500">
                {attendanceStatusCount.absent}
              </div>
              <div className="text-xs text-gray-500">Absent</div>
            </div>
            <div className="border border-gray-100 rounded-md p-2 text-center">
              <div className="text-xl font-bold text-warning-500">
                {attendanceStatusCount.late}
              </div>
              <div className="text-xs text-gray-500">Late</div>
            </div>
          </div>
        </Card>
        
        {/* Subject-wise Attendance */}
        <Card 
          title="Subject-wise Attendance"
          icon={<CalendarCheck size={20} />}
          className="col-span-2"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Classes
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attended
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Percentage
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockAttendanceSummary.map((subject) => (
                  <tr key={subject.subjectId} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{subject.subjectName}</div>
                      <div className="text-xs text-gray-500">{subject.subjectId}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {subject.totalClasses}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {subject.attended}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{subject.percentage.toFixed(1)}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          className={`h-1.5 rounded-full ${
                            subject.percentage >= 75 
                              ? 'bg-success-500' 
                              : subject.percentage >= 65 
                                ? 'bg-warning-500' 
                                : 'bg-error-500'
                          }`}
                          style={{ width: `${subject.percentage}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge 
                        variant={
                          subject.percentage >= 75 
                            ? 'success' 
                            : subject.percentage >= 65 
                              ? 'warning' 
                              : 'error'
                        }
                      >
                        {subject.percentage >= 75 
                          ? 'Good' 
                          : subject.percentage >= 65 
                            ? 'Warning' 
                            : 'Critical'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Attendance Records */}
      <Card 
        title="Attendance Records"
        subtitle={`Showing ${filteredRecords.length} records`}
        icon={<Calendar size={20} />}
      >
        {filteredRecords.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(record.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{record.subjectName}</div>
                      <div className="text-xs text-gray-500">{record.subjectId}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge 
                        variant={
                          record.status === 'present' 
                            ? 'success' 
                            : record.status === 'late' 
                              ? 'warning' 
                              : 'error'
                        }
                      >
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            <CalendarCheck size={40} className="mx-auto text-gray-300 mb-2" />
            <p>No attendance records found for the selected filters.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AttendancePage;