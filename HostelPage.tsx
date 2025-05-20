import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { 
  Building2, 
  Home, 
  User, 
  Phone, 
  AlertTriangle, 
  Plus,
  Check
} from 'lucide-react';
import { mockHostelDetails, mockHostelComplaints } from '../data/mockData';

const HostelPage: React.FC = () => {
  const [isAddingComplaint, setIsAddingComplaint] = useState(false);
  const [complaintForm, setComplaintForm] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, would send to backend
    setIsAddingComplaint(false);
    setComplaintForm({
      title: '',
      description: '',
      priority: 'medium'
    });
    // Would normally add to list here
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Hostel Management</h1>
        <p className="text-gray-600 mt-1">View hostel details and manage complaints</p>
      </div>

      {/* Hostel Details Card */}
      <Card 
        title="Hostel Information"
        icon={<Building2 size={20} />}
        className="mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Hostel & Room Details</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <Home className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Hostel & Block</p>
                    <p className="text-base text-gray-800">{mockHostelDetails.hostelName}, {mockHostelDetails.blockName}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <Building2 className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Room Number & Type</p>
                    <p className="text-base text-gray-800">Room {mockHostelDetails.roomNumber}, {mockHostelDetails.roomType}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <Home className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Bed Number</p>
                    <p className="text-base text-gray-800">Bed {mockHostelDetails.bedNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Warden Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center mr-3">
                    <User className="h-4 w-4 text-secondary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Warden Name</p>
                    <p className="text-base text-gray-800">{mockHostelDetails.wardenName}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center mr-3">
                    <Phone className="h-4 w-4 text-secondary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Contact Number</p>
                    <p className="text-base text-gray-800">{mockHostelDetails.wardenContact}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-primary-50 border border-primary-100 rounded-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-primary-800 font-medium">Hostel Rules & Guidelines</h3>
              <p className="text-primary-600 text-sm mt-1">Please follow all hostel rules to maintain a healthy and disciplined environment.</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 md:mt-0"
            >
              View Rules
            </Button>
          </div>
        </div>
      </Card>

      {/* Complaints Management */}
      <Card 
        title="Complaints & Requests"
        icon={<AlertTriangle size={20} />}
        className="mb-6"
        footer={
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              All complaints are addressed within 48 hours.
            </p>
            <Button
              variant="primary"
              size="sm"
              icon={<Plus size={16} />}
              onClick={() => setIsAddingComplaint(true)}
            >
              Add Complaint
            </Button>
          </div>
        }
      >
        {isAddingComplaint ? (
          <div className="border border-gray-200 rounded-lg p-4 mb-4 animate-slide-up">
            <h3 className="text-lg font-medium mb-4">Add New Complaint</h3>
            <form onSubmit={handleSubmitComplaint}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="complaint-title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    id="complaint-title"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Brief title of the issue"
                    value={complaintForm.title}
                    onChange={(e) => setComplaintForm({ ...complaintForm, title: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="complaint-description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="complaint-description"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Detailed description of the issue"
                    value={complaintForm.description}
                    onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="complaint-priority" className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    id="complaint-priority"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={complaintForm.priority}
                    onChange={(e) => setComplaintForm({ ...complaintForm, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddingComplaint(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    icon={<Check size={16} />}
                  >
                    Submit Complaint
                  </Button>
                </div>
              </div>
            </form>
          </div>
        ) : mockHostelComplaints.length > 0 ? (
          <div className="space-y-4">
            {mockHostelComplaints.map((complaint) => (
              <div key={complaint.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-200 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center mr-3
                      ${complaint.priority === 'high' ? 'bg-red-100' : ''}
                      ${complaint.priority === 'medium' ? 'bg-amber-100' : ''}
                      ${complaint.priority === 'low' ? 'bg-blue-100' : ''}
                    `}>
                      <AlertTriangle className={`
                        h-4 w-4
                        ${complaint.priority === 'high' ? 'text-red-600' : ''}
                        ${complaint.priority === 'medium' ? 'text-amber-600' : ''}
                        ${complaint.priority === 'low' ? 'text-blue-600' : ''}
                      `} />
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-800">{complaint.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{complaint.description}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-xs text-gray-500">
                          {new Date(complaint.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                        <span className="mx-2 text-gray-300">•</span>
                        <Badge 
                          variant={
                            complaint.status === 'resolved' 
                              ? 'success' 
                              : complaint.status === 'in-progress' 
                                ? 'warning' 
                                : 'info'
                          }
                        >
                          {complaint.status === 'in-progress' 
                            ? 'In Progress' 
                            : complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Badge 
                      variant={
                        complaint.priority === 'high' 
                          ? 'error' 
                          : complaint.priority === 'medium' 
                            ? 'warning' 
                            : 'info'
                      }
                    >
                      {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)} Priority
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            <AlertTriangle size={40} className="mx-auto text-gray-300 mb-2" />
            <p>No complaints or requests found.</p>
            <p className="text-sm mt-1">Click "Add Complaint" to report an issue.</p>
          </div>
        )}
      </Card>
      
      {/* Hostel Facilities */}
      <Card 
        title="Hostel Facilities"
        icon={<Home size={20} />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <h4 className="font-medium text-gray-800 mb-2">Common Room</h4>
            <p className="text-sm text-gray-600">Equipped with TV, indoor games, and seating area</p>
            <p className="text-xs text-gray-500 mt-2">Open: 6 AM - 10 PM</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <h4 className="font-medium text-gray-800 mb-2">Laundry Service</h4>
            <p className="text-sm text-gray-600">Washing machines and ironing facilities available</p>
            <p className="text-xs text-gray-500 mt-2">Open: 7 AM - 8 PM</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <h4 className="font-medium text-gray-800 mb-2">Study Room</h4>
            <p className="text-sm text-gray-600">Quiet study space with desks and Wi-Fi</p>
            <p className="text-xs text-gray-500 mt-2">Open: 24 hours</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <h4 className="font-medium text-gray-800 mb-2">Gym</h4>
            <p className="text-sm text-gray-600">Basic fitness equipment for residents</p>
            <p className="text-xs text-gray-500 mt-2">Open: 6 AM - 9 PM</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <h4 className="font-medium text-gray-800 mb-2">Cafeteria</h4>
            <p className="text-sm text-gray-600">Snacks and beverages available</p>
            <p className="text-xs text-gray-500 mt-2">Open: 7 AM - 10 PM</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <h4 className="font-medium text-gray-800 mb-2">Wi-Fi</h4>
            <p className="text-sm text-gray-600">High-speed internet throughout the hostel</p>
            <p className="text-xs text-gray-500 mt-2">Available: 24/7</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HostelPage;