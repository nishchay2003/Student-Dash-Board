import React from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { 
  Receipt, 
  CreditCard, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight,
  Download
} from 'lucide-react';
import { mockFeeDetails, mockFeeSummary } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { semesterFeeData } from '../data/mockData';

const FeesPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Fees Management</h1>
        <p className="text-gray-600 mt-1">Track and manage your fee payments</p>
      </div>

      {/* Fee Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-primary-500 to-primary-600 text-white">
          <div className="flex items-center mb-4">
            <Receipt size={24} className="text-primary-100" />
            <h3 className="ml-2 text-lg font-semibold">Total Fees</h3>
          </div>
          <p className="text-3xl font-bold">₹{mockFeeSummary.totalFees.toLocaleString()}</p>
          <p className="text-primary-100 mt-2">Academic Year 2024-25</p>
        </Card>
        
        <Card className="bg-gradient-to-br from-secondary-500 to-secondary-600 text-white">
          <div className="flex items-center mb-4">
            <CheckCircle2 size={24} className="text-secondary-100" />
            <h3 className="ml-2 text-lg font-semibold">Paid Amount</h3>
          </div>
          <p className="text-3xl font-bold">₹{mockFeeSummary.paidAmount.toLocaleString()}</p>
          <p className="text-secondary-100 mt-2">
            {((mockFeeSummary.paidAmount / mockFeeSummary.totalFees) * 100).toFixed(1)}% of total
          </p>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
          <div className="flex items-center mb-4">
            <AlertCircle size={24} className="text-amber-100" />
            <h3 className="ml-2 text-lg font-semibold">Pending</h3>
          </div>
          <p className="text-3xl font-bold">₹{mockFeeSummary.pendingAmount.toLocaleString()}</p>
          <p className="text-amber-100 mt-2">
            {((mockFeeSummary.pendingAmount / mockFeeSummary.totalFees) * 100).toFixed(1)}% of total
          </p>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
          <div className="flex items-center mb-4">
            <AlertCircle size={24} className="text-red-100" />
            <h3 className="ml-2 text-lg font-semibold">Overdue</h3>
          </div>
          <p className="text-3xl font-bold">₹{mockFeeSummary.overdueAmount.toLocaleString()}</p>
          <p className="text-red-100 mt-2">
            {((mockFeeSummary.overdueAmount / mockFeeSummary.totalFees) * 100).toFixed(1)}% of total
          </p>
        </Card>
      </div>

      {/* Fee History Chart */}
      <Card 
        title="Fee Payment History" 
        subtitle="Semester-wise payment records"
        icon={<Receipt size={20} />}
        className="mb-6"
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={semesterFeeData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Legend />
              <Bar name="Paid" dataKey="paid" stackId="a" fill="#00897B" />
              <Bar name="Pending" dataKey="pending" stackId="a" fill="#FFC107" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Current Fee Details */}
      <Card 
        title="Fee Details" 
        subtitle="Current academic year"
        icon={<CreditCard size={20} />}
        className="mb-6"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockFeeDetails.map((fee) => (
                <tr key={fee.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{fee.feeType}</div>
                    {fee.status === 'paid' && fee.transactionId && (
                      <div className="text-xs text-gray-500">
                        Transaction ID: {fee.transactionId}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    ₹{fee.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(fee.dueDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Badge 
                      variant={
                        fee.status === 'paid' 
                          ? 'success' 
                          : fee.status === 'pending' 
                            ? 'warning' 
                            : 'error'
                      }
                    >
                      {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {fee.status === 'paid' ? (
                      <Button 
                        variant="text" 
                        size="sm"
                        icon={<Download size={14} />}
                      >
                        Receipt
                      </Button>
                    ) : (
                      <Button 
                        variant="primary" 
                        size="sm"
                        icon={<CreditCard size={14} />}
                      >
                        Pay Now
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Payment Methods */}
      <Card 
        title="Payment Methods" 
        icon={<CreditCard size={20} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 hover:shadow-sm cursor-pointer transition-all">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Online Payment</h3>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-600">Pay using credit/debit cards, net banking, UPI, or wallets</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 hover:shadow-sm cursor-pointer transition-all">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Bank Transfer</h3>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-600">Transfer directly to university bank account via NEFT/RTGS</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 hover:shadow-sm cursor-pointer transition-all">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Demand Draft</h3>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-600">Pay via DD in favor of "Parul University" payable at Vadodara</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FeesPage;