import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';
import { CalendarCheck } from 'lucide-react';
import { monthlyAttendanceData } from '../../data/mockData';

const AttendanceChart: React.FC = () => {
  return (
    <Card 
      title="Monthly Attendance"
      subtitle="Last 6 months attendance record"
      icon={<CalendarCheck size={20} />}
      className="h-[350px]"
    >
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={monthlyAttendanceData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '8px', 
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }} 
          />
          <Legend iconType="circle" />
          <Bar name="Present" dataKey="present" fill="#5E35B1" radius={[4, 4, 0, 0]} />
          <Bar name="Absent" dataKey="absent" fill="#F44336" radius={[4, 4, 0, 0]} />
          <Bar name="Late" dataKey="late" fill="#FFC107" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default AttendanceChart;