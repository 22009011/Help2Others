import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Notifications.css';

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    // Simulating API call to fetch notifications
    setTimeout(() => {
      // Mock data
      const mockNotifications = [
        {
          id: 1,
          type: 'pickup_request',
          title: 'New Pickup Request',
          message: 'Food Bank XYZ has requested to pick up your fresh produce donation.',
          status: 'unread',
          timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
          actionRequired: true,
          donation: {
            id: 101,
            title: 'Fresh Produce'
          }
        },
        {
          id: 2,
          type: 'status_change',
          title: 'Donation Collected',
          message: 'Your bakery items donation has been successfully collected.',
          status: 'read',
          timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
          actionRequired: false,
          donation: {
            id: 102,
            title: 'Bakery Items'
          }
        },
        {
          id: 3,
          type: 'reminder',
          title: 'Pickup Window Approaching',
          message: 'Reminder: Your prepared meals donation has a pickup window in 2 hours.',
          status: 'unread',
          timestamp: new Date(Date.now() - 1 * 3600000).toISOString(),
          actionRequired: false,
          donation: {
            id: 103,
            title: 'Prepared Meals'
          }
        },
        {
          id: 4,
          type: 'thank_you',
          title: 'Thank You Note',
          message: 'Food Bank XYZ thanks you for your recent donation. You helped provide meals for 15 families!',
          status: 'read',
          timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
          actionRequired: false,
          donation: {
            id: 104,
            title: 'Canned Goods'
          }
        },
        {
          id: 5,
          type: 'feedback',
          title: 'Recipient Feedback',
          message: 'A recipient has left feedback on your recent donation.',
          status: 'unread',
          timestamp: new Date(Date.now() - 4 * 86400000).toISOString(),
          actionRequired: true,
          donation: {
            id: 105,
            title: 'Dairy Products'
          }
        }
      ];
      
      setNotifications(mockNotifications);
      setIsLoading(false);
    }, 1000);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id 
          ? { ...notification, status: 'read' } 
          : notification
      )
    );
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffMinutes < 1) {
      return 'Just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else if (diffMinutes < 1440) {
      const hours = Math.floor(diffMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'pickup_request':
        return <i className="fas fa-truck"></i>;
      case 'status_change':
        return <i className="fas fa-exchange-alt"></i>;
      case 'reminder':
        return <i className="fas fa-clock"></i>;
      case 'thank_you':
        return <i className="fas fa-heart"></i>;
      case 'feedback':
        return <i className="fas fa-comment"></i>;
      default:
        return <i className="fas fa-bell"></i>;
    }
  };

  const filteredNotifications = () => {
    switch(filter) {
      case 'unread':
        return notifications.filter(notification => notification.status === 'unread');
      case 'action':
        return notifications.filter(notification => notification.actionRequired);
      default:
        return notifications;
    }
  };

  const handleNotificationClick = (notification) => {
    // Mark as read when clicked
    markAsRead(notification.id);
    
    // Navigate to relevant page based on notification type
    if (notification.type === 'pickup_request') {
      navigate(`/donations/${notification.donation.id}/pickup-requests`);
    } else if (notification.type === 'feedback') {
      navigate(`/donations/${notification.donation.id}/feedback`);
    } else {
      navigate(`/donations/${notification.donation.id}`);
    }
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({
        ...notification, 
        status: 'read'
      }))
    );
  };

  const getUnreadCount = () => {
    return notifications.filter(notification => notification.status === 'unread').length;
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2>Notifications</h2>
        <div className="notifications-actions">
          <button 
            className="mark-all-read" 
            onClick={markAllAsRead}
            disabled={getUnreadCount() === 0}
          >
            Mark all as read
          </button>
        </div>
      </div>
      
      <div className="notifications-filter">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'unread' ? 'active' : ''}
          onClick={() => setFilter('unread')}
        >
          Unread ({getUnreadCount()})
        </button>
        <button 
          className={filter === 'action' ? 'active' : ''}
          onClick={() => setFilter('action')}
        >
          Action Required
        </button>
      </div>
      
      <div className="notifications-list">
        {isLoading ? (
          <div className="loading">Loading notifications...</div>
        ) : filteredNotifications().length === 0 ? (
          <div className="no-notifications">
            {filter === 'all' 
              ? 'You have no notifications.' 
              : filter === 'unread' 
                ? 'You have no unread notifications.' 
                : 'You have no notifications requiring action.'}
          </div>
        ) : (
          filteredNotifications().map(notification => (
            <div 
              key={notification.id} 
              className={`notification-item ${notification.status === 'unread' ? 'unread' : ''}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="notification-icon">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="notification-content">
                <div className="notification-header">
                  <h3>{notification.title}</h3>
                  <span className="notification-time">
                    {formatTimeAgo(notification.timestamp)}
                  </span>
                </div>
                <p className="notification-message">{notification.message}</p>
                <div className="notification-meta">
                  <span className="donation-name">
                    {notification.donation.title}
                  </span>
                  {notification.actionRequired && (
                    <span className="action-required">Action Required</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;