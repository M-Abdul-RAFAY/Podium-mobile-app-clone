import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { Check, CheckCheck, Clock } from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isFromUser: boolean;
  status?: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'payment';
}

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const getStatusIcon = () => {
    if (!message.isFromUser) return null;
    
    switch (message.status) {
      case 'sent':
        return <Clock size={12} color="#6b7280" />;
      case 'delivered':
        return <Check size={12} color="#6b7280" />;
      case 'read':
        return <CheckCheck size={12} color="#10b981" />;
      default:
        return <Clock size={12} color="#6b7280" />;
    }
  };

  return (
    <View style={[
      styles.container,
      message.isFromUser ? styles.sentContainer : styles.receivedContainer
    ]}>
      <View style={[
        styles.bubble,
        message.isFromUser ? styles.sentBubble : styles.receivedBubble
      ]}>
        <Text style={[
          styles.messageText,
          message.isFromUser ? styles.sentText : styles.receivedText
        ]}>
          {message.text}
        </Text>
        
        <View style={styles.messageFooter}>
          <Text style={[
            styles.timestamp,
            message.isFromUser ? styles.sentTimestamp : styles.receivedTimestamp
          ]}>
            {message.timestamp}
          </Text>
          {getStatusIcon()}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 2,
  },
  sentContainer: {
    alignItems: 'flex-end',
  },
  receivedContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  sentBubble: {
    backgroundColor: '#1e3a8a',
    borderBottomRightRadius: 4,
  },
  receivedBubble: {
    backgroundColor: '#f1f5f9',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
  sentText: {
    color: '#ffffff',
  },
  receivedText: {
    color: '#1f2937',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  timestamp: {
    fontSize: 11,
    fontWeight: '500',
  },
  sentTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  receivedTimestamp: {
    color: '#6b7280',
  },
});