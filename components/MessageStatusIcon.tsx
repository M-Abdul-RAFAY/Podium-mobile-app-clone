import React from 'react';
import { CheckCheck, Check, Clock } from 'lucide-react-native';

interface MessageStatusIconProps {
  status: 'sent' | 'delivered' | 'read';
}

export function MessageStatusIcon({ status }: MessageStatusIconProps) {
  switch (status) {
    case 'sent':
      return <Clock size={14} color="#6b7280" />;
    case 'delivered':
      return <Check size={14} color="#6b7280" />;
    case 'read':
      return <CheckCheck size={14} color="#10b981" />;
    default:
      return null;
  }
}