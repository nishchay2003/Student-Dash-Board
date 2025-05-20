import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  BookOpen, 
  MapPin,
  Users,
  Edit
} from 'lucide-react';
import { mockStudent } from '../data/mockData';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [studentData, setStudentData] = useState(mockStudent);

  const handleSaveChanges = () => {
    // In a real app, would send updated data to backend
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setStudentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setStudentData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleParentInfoChange = (field: string, value: string) => {
    setStudentData((prev) => ({
      ...prev,
      parentInfo: {
        ...prev.parentInfo,
        [field]: value,
      },
    }));
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        <p className="text-gray-600 mt-1">View and manage your personal information</p>
      </div>

      {/* Profile Header */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="mr-6">
            <Avatar 
              src={studentData.avatar} 
              name={studentData.name} 
              size="xl"
            />
          </div>
          
          <div className="mt-4 md:mt-0">
            <h2 className="text-2xl font-bold text-gray-800">{studentData.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{studentData.enrollmentNo}</p>
            
            <div className="flex flex-wrap items-center mt-3">
              <div className="flex items-center mr-4 mb-2">
                <BookOpen size={16} className="text-primary-500 mr-1" />
                <span className="text-sm text-gray-700">{studentData.program}</span>
              </div>
              
              <div className="flex items-center mr-4 mb-2">
                <GraduationCap size={16} className="text-primary-500 mr-1" />
                <span className="text-sm text-gray-700">{studentData.department}</span>
              </div>
              
              <div className="flex items-center mr-4 mb-2">
                <MapPin size={16} className="text-primary-500 mr-1" />
                <span className="text-sm text-gray-700">{studentData.address.city}, {studentData.address.state}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 md:ml-auto">
            <Button
              variant={isEditing ? "outline" : "primary"}
              icon={isEditing ? undefined : <Edit size={16} />}
              onClick={() => isEditing ? handleSaveChanges() : setIsEditing(true)}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
            
            {isEditing && (
              <Button
                variant="text"
                className="mt-2 md:mt-2"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card 
        title="Personal Information"
        icon={<User size={20} />}
        className="mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={studentData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            ) : (
              <p className="text-gray-800">{studentData.name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enrollment Number
            </label>
            <p className="text-gray-800">{studentData.enrollmentNo}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={studentData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            ) : (
              <div className="flex items-center">
                <Mail size={16} className="text-gray-400 mr-2" />
                <p className="text-gray-800">{studentData.email}</p>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={studentData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            ) : (
              <div className="flex items-center">
                <Phone size={16} className="text-gray-400 mr-2" />
                <p className="text-gray-800">{studentData.phone}</p>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            {isEditing ? (
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={studentData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              />
            ) : (
              <div className="flex items-center">
                <Calendar size={16} className="text-gray-400 mr-2" />
                <p className="text-gray-800">
                  {new Date(studentData.dateOfBirth).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Academic Information */}
      <Card 
        title="Academic Information"
        icon={<BookOpen size={20} />}
        className="mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <p className="text-gray-800">{studentData.department}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Program
            </label>
            <p className="text-gray-800">{studentData.program}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Semester
            </label>
            <p className="text-gray-800">Semester {studentData.semester}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section
            </label>
            <p className="text-gray-800">{studentData.section}</p>
          </div>
        </div>
      </Card>

      {/* Contact Information */}
      <Card 
        title="Contact Information"
        icon={<MapPin size={20} />}
        className="mb-6"
      >
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={studentData.address.street}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                />
              ) : (
                <p className="text-gray-800">{studentData.address.street}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={studentData.address.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                />
              ) : (
                <p className="text-gray-800">{studentData.address.city}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={studentData.address.state}
                  onChange={(e) => handleAddressChange('state', e.target.value)}
                />
              ) : (
                <p className="text-gray-800">{studentData.address.state}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode
              </label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={studentData.address.pincode}
                  onChange={(e) => handleAddressChange('pincode', e.target.value)}
                />
              ) : (
                <p className="text-gray-800">{studentData.address.pincode}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={studentData.address.country}
                  onChange={(e) => handleAddressChange('country', e.target.value)}
                />
              ) : (
                <p className="text-gray-800">{studentData.address.country}</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Parent Information */}
      <Card 
        title="Parent/Guardian Information"
        icon={<Users size={20} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Father's Name
            </label>
            {isEditing ? (
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={studentData.parentInfo.fatherName}
                onChange={(e) => handleParentInfoChange('fatherName', e.target.value)}
              />
            ) : (
              <p className="text-gray-800">{studentData.parentInfo.fatherName}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Father's Contact Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={studentData.parentInfo.fatherPhone}
                onChange={(e) => handleParentInfoChange('fatherPhone', e.target.value)}
              />
            ) : (
              <p className="text-gray-800">{studentData.parentInfo.fatherPhone}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mother's Name
            </label>
            {isEditing ? (
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={studentData.parentInfo.motherName}
                onChange={(e) => handleParentInfoChange('motherName', e.target.value)}
              />
            ) : (
              <p className="text-gray-800">{studentData.parentInfo.motherName}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mother's Contact Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={studentData.parentInfo.motherPhone}
                onChange={(e) => handleParentInfoChange('motherPhone', e.target.value)}
              />
            ) : (
              <p className="text-gray-800">{studentData.parentInfo.motherPhone}</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;