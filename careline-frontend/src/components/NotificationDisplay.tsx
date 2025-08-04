"use client"
import React, { useEffect } from 'react';
import { notification } from 'antd';
import { useSignalRState, useSignalRActions } from '@/providers/signalr-provider';
import { TicketNotification } from '@/services/signalRService';

export const NotificationDisplay: React.FC = () => {
    const { notifications } = useSignalRState();
    const { clearNotifications } = useSignalRActions();
     useEffect(() => {
    // Show notifications using Ant Design notification
    notifications.forEach((notif: TicketNotification) => {
      switch (notif.type) {
        case 'TicketCreated':
          notification.info({
            message: 'New Ticket Created',
            description: notif.message,
            duration: 4,
          });
          break;
        case 'TicketStatusUpdated':
          notification.success({
            message: 'Ticket Status Updated',
            description: notif.message,
            duration: 4,
          });
          break;
        default:
          notification.open({
            message: 'Queue Update',
            description: notif.message,
            duration: 4,
          });
      }
    });
    // Clear notifications after showing them
    if (notifications.length > 0) {
      clearNotifications();
    }
  }, [notifications, clearNotifications]);

  return null;
};
