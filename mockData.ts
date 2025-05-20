import { 
  Student, 
  AttendanceRecord, 
  AttendanceSummary, 
  HostelDetails, 
  HostelComplaint, 
  FeeDetail, 
  FeeSummary, 
  Notification 
} from '../types';

// Mock Student Data
export const mockStudent: Student = {
  id: '123456',
  name: 'Rahul Sharma',
  enrollmentNo: 'PU2021CS012',
  email: 'rahul.sharma@paruluniversity.ac.in',
  phone: '9876543210',
  dateOfBirth: '2001-05-15',
  department: 'Computer Science & Engineering',
  program: 'B.Tech',
  semester: 5,
  section: 'A',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
  address: {
    street: '123 University Road',
    city: 'Vadodara',
    state: 'Gujarat',
    country: 'India',
    pincode: '390014'
  },
  parentInfo: {
    fatherName: 'Rajesh Sharma',
    fatherPhone: '9876543211',
    motherName: 'Sunita Sharma',
    motherPhone: '9876543212'
  }
};

// Mock Attendance Data
export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: 'att1',
    date: '2025-04-01',
    subjectId: 'CS301',
    subjectName: 'Data Structures & Algorithms',
    status: 'present'
  },
  {
    id: 'att2',
    date: '2025-04-01',
    subjectId: 'CS302',
    subjectName: 'Database Management Systems',
    status: 'present'
  },
  {
    id: 'att3',
    date: '2025-04-02',
    subjectId: 'CS303',
    subjectName: 'Computer Networks',
    status: 'absent'
  },
  {
    id: 'att4',
    date: '2025-04-02',
    subjectId: 'CS304',
    subjectName: 'Operating Systems',
    status: 'present'
  },
  {
    id: 'att5',
    date: '2025-04-03',
    subjectId: 'CS301',
    subjectName: 'Data Structures & Algorithms',
    status: 'late'
  },
  {
    id: 'att6',
    date: '2025-04-03',
    subjectId: 'CS302',
    subjectName: 'Database Management Systems',
    status: 'present'
  },
  {
    id: 'att7',
    date: '2025-04-04',
    subjectId: 'CS303',
    subjectName: 'Computer Networks',
    status: 'present'
  },
  {
    id: 'att8',
    date: '2025-04-04',
    subjectId: 'CS304',
    subjectName: 'Operating Systems',
    status: 'present'
  },
  {
    id: 'att9',
    date: '2025-04-05',
    subjectId: 'CS301',
    subjectName: 'Data Structures & Algorithms',
    status: 'present'
  },
  {
    id: 'att10',
    date: '2025-04-05',
    subjectId: 'CS302',
    subjectName: 'Database Management Systems',
    status: 'absent'
  }
];

export const mockAttendanceSummary: AttendanceSummary[] = [
  {
    subjectId: 'CS301',
    subjectName: 'Data Structures & Algorithms',
    totalClasses: 20,
    attended: 18,
    percentage: 90
  },
  {
    subjectId: 'CS302',
    subjectName: 'Database Management Systems',
    totalClasses: 18,
    attended: 15,
    percentage: 83.33
  },
  {
    subjectId: 'CS303',
    subjectName: 'Computer Networks',
    totalClasses: 15,
    attended: 10,
    percentage: 66.67
  },
  {
    subjectId: 'CS304',
    subjectName: 'Operating Systems',
    totalClasses: 16,
    attended: 14,
    percentage: 87.5
  },
  {
    subjectId: 'CS305',
    subjectName: 'Software Engineering',
    totalClasses: 10,
    attended: 9,
    percentage: 90
  }
];

// Mock Hostel Data
export const mockHostelDetails: HostelDetails = {
  id: 'hostel1',
  hostelName: 'Boys Hostel 3',
  blockName: 'Block C',
  roomNumber: 'C-204',
  roomType: 'Triple Sharing',
  bedNumber: 2,
  wardenName: 'Mr. Prakash Patel',
  wardenContact: '9876543213'
};

export const mockHostelComplaints: HostelComplaint[] = [
  {
    id: 'complaint1',
    title: 'Faulty Air Conditioner',
    description: 'The AC in room C-204 is not cooling properly and making noise.',
    date: '2025-03-28',
    status: 'in-progress',
    priority: 'medium'
  },
  {
    id: 'complaint2',
    title: 'Water Leakage',
    description: 'There is water leakage from the ceiling in the bathroom.',
    date: '2025-03-20',
    status: 'resolved',
    priority: 'high'
  },
  {
    id: 'complaint3',
    title: 'Broken Chair',
    description: 'One of the study chairs is broken and needs replacement.',
    date: '2025-03-15',
    status: 'pending',
    priority: 'low'
  }
];

// Mock Fee Data
export const mockFeeDetails: FeeDetail[] = [
  {
    id: 'fee1',
    feeType: 'Tuition Fee (Semester 5)',
    amount: 60000,
    dueDate: '2025-01-15',
    status: 'paid',
    paymentDate: '2025-01-10',
    paymentMethod: 'Net Banking',
    transactionId: 'TXN123456'
  },
  {
    id: 'fee2',
    feeType: 'Hostel Fee (Semester 5)',
    amount: 35000,
    dueDate: '2025-01-15',
    status: 'paid',
    paymentDate: '2025-01-10',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN123457'
  },
  {
    id: 'fee3',
    feeType: 'Exam Fee (Semester 5)',
    amount: 5000,
    dueDate: '2025-03-20',
    status: 'pending'
  },
  {
    id: 'fee4',
    feeType: 'Library Fee (Annual)',
    amount: 2000,
    dueDate: '2025-02-28',
    status: 'overdue'
  }
];

export const mockFeeSummary: FeeSummary = {
  totalFees: 102000,
  paidAmount: 95000,
  pendingAmount: 5000,
  overdueAmount: 2000
};

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    title: 'Fee Payment Reminder',
    message: 'Last date for Exam Fee payment is approaching. Please pay before March 20, 2025.',
    date: '2025-03-15T10:30:00',
    isRead: false,
    type: 'warning'
  },
  {
    id: 'notif2',
    title: 'Mid-semester Exam Schedule',
    message: 'Mid-semester exams will start from April 15, 2025. Check your student portal for detailed schedule.',
    date: '2025-03-10T14:45:00',
    isRead: true,
    type: 'info'
  },
  {
    id: 'notif3',
    title: 'Library Book Return',
    message: 'Your library book "Database Systems" is overdue. Please return it as soon as possible.',
    date: '2025-03-05T09:15:00',
    isRead: false,
    type: 'error'
  },
  {
    id: 'notif4',
    title: 'Hostel Maintenance',
    message: 'Maintenance work will be carried out in Block C on Sunday, April 10, 2025, from 10 AM to 4 PM.',
    date: '2025-03-01T16:20:00',
    isRead: true,
    type: 'info'
  }
];

// Monthly attendance data for charts
export const monthlyAttendanceData = [
  { month: 'Jan', present: 22, absent: 3, late: 1 },
  { month: 'Feb', present: 18, absent: 2, late: 2 },
  { month: 'Mar', present: 20, absent: 1, late: 3 },
  { month: 'Apr', present: 16, absent: 4, late: 0 },
  { month: 'May', present: 15, absent: 5, late: 2 },
  { month: 'Jun', present: 19, absent: 0, late: 1 }
];

// Semester fee payment data for charts
export const semesterFeeData = [
  { name: 'Semester 1', paid: 85000, pending: 15000 },
  { name: 'Semester 2', paid: 95000, pending: 5000 },
  { name: 'Semester 3', paid: 100000, pending: 0 },
  { name: 'Semester 4', paid: 90000, pending: 10000 },
  { name: 'Semester 5', paid: 95000, pending: 7000 }
];