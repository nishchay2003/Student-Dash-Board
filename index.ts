// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar: string;
}

// Student related types
export interface Student {
  id: string;
  name: string;
  enrollmentNo: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  department: string;
  program: string;
  semester: number;
  section: string;
  avatar: string;
  address: Address;
  parentInfo: ParentInfo;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface ParentInfo {
  fatherName: string;
  fatherPhone: string;
  motherName: string;
  motherPhone: string;
}

// Attendance related types
export interface AttendanceRecord {
  id: string;
  date: string;
  subjectId: string;
  subjectName: string;
  status: 'present' | 'absent' | 'late';
}

export interface AttendanceSummary {
  subjectId: string;
  subjectName: string;
  totalClasses: number;
  attended: number;
  percentage: number;
}

// Hostel related types
export interface HostelDetails {
  id: string;
  hostelName: string;
  blockName: string;
  roomNumber: string;
  roomType: string;
  bedNumber: number;
  wardenName: string;
  wardenContact: string;
}

export interface HostelComplaint {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'pending' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
}

// Fees related types
export interface FeeDetail {
  id: string;
  feeType: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentDate?: string;
  paymentMethod?: string;
  transactionId?: string;
}

export interface FeeSummary {
  totalFees: number;
  paidAmount: number;
  pendingAmount: number;
  overdueAmount: number;
}

// Notification type
export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}