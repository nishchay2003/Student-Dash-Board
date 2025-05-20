import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { 
  Bell, 
  Check, 
  Trash2
} from 'lucide-react';
import { mockNotifications } from '../data/mockData';
import { Notification } from '../types';

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({
        ...notification,
        isRead: true
      }))
    );
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true } 
          : notification
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(
      notifications.filter(notification => notification.id !== id)
    );
  };

  const filteredNotifications = showUnreadOnly 
    ? notifications.filter(notification => !notification.isRead)
    : notifications;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <p className="text-gray-600 mt-1">Stay updated with the latest announcements and alerts</p>
      </div>

      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <input
              id="show-unread"
              type="checkbox"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="show-unread" className="ml-2 block text-sm text-gray-700">
              Show unread only
            </label>
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              icon={<Trash2 size={16} />}
              disabled={notifications.length === 0}
              onClick={() => setNotifications([])}
            >
              Clear All
            </Button>
            
            <Button
              variant="primary"
              size="sm"
              icon={<Check size={16} />}
              disabled={!notifications.some(n => !n.isRead)}
              onClick={markAllAsRead}
            >
              Mark All as Read
            </Button>
          </div>
        </div>
      </Card>

      {filteredNotifications.length > 0 ? (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`
                bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm
                transition-colors duration-300
                ${!notification.isRead ? 'bg-primary-50 border-primary-100' : ''}
              `}
            >
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className={`
                      flex-shrink-0 h-8 w-8 rounded-full mr-3 flex items-center justify-center
                      ${notification.type === 'info' ? 'bg-blue-100' : ''}
                      ${notification.type === 'warning' ? 'bg-amber-100' : ''}
                      ${notification.type === 'error' ? 'bg-red-100' : ''}
                      ${notification.type === 'success' ? 'bg-green-100' : ''}
                    `}>
                      <Bell size={16} className={`
                        ${notification.type === 'info' ? 'text-blue-600' : ''}
                        ${notification.type === 'warning' ? 'text-amber-600' : ''}
                        ${notification.type === 'error' ? 'text-red-600' : ''}
                        ${notification.type === 'success' ? 'text-green-600' : ''}
                      `} />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold text-gray-800">{notification.title}</h3>
                        {!notification.isRead && (
                          <span className="ml-2 inline-block h-2 w-2 rounded-full bg-error-500"></span>
                        )}
                      </div>
                      <p className="mt-1 text-gray-600">{notification.message}</p>
                      <div className="mt-2 flex items-center">
                        <Badge 
                          variant={
                            notification.type === 'info' 
                              ? 'info' 
                              : notification.type === 'warning' 
                                ? 'warning' 
                                : notification.type === 'error' 
                                  ? 'error' 
                                  : 'success'
                          }
                        >
                          {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                        </Badge>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-xs text-gray-500">
                          {new Date(notification.date).toLocaleString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!notification.isRead && (
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Check size={16} />}
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                    
                    <Button
                      variant="text"
                      size="sm"
                      icon={<Trash2 size={16} />}
                      onClick={() => deleteNotification(notification.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <div className="py-12 text-center">
            <Bell size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              {showUnreadOnly ? "No unread notifications" : "No notifications"}
            </h3>
            <p className="text-gray-500">
              {showUnreadOnly 
                ? "You have read all your notifications" 
                : "You don't have any notifications yet"}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default NotificationsPage;