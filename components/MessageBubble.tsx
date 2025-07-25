import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { Check, CheckCheck, Clock } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { Shadows } from '@/constants/Shadows';

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
    
    const iconSize = 12;
    switch (message.status) {
      case 'sent':
        return <Clock size={iconSize} color={Colors.neutral[500]} />;
      case 'delivered':
        return <Check size={iconSize} color={Colors.neutral[500]} />;
      case 'read':
        return <CheckCheck size={iconSize} color={Colors.success[500]} />;
      default:
        return <Clock size={iconSize} color={Colors.neutral[500]} />;
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
    paddingHorizontal: Spacing.lg,
    marginVertical: Spacing.xs / 2,
  },
  sentContainer: {
    alignItems: 'flex-end',
  },
  receivedContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: 18,
    ...Shadows.small,
  },
  sentBubble: {
    backgroundColor: Colors.primary[600],
    borderBottomRightRadius: 4,
  },
  receivedBubble: {
    backgroundColor: Colors.background.tertiary,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    lineHeight: Typography.fontSize.base * Typography.lineHeight.normal,
    marginBottom: Spacing.xs,
  },
  sentText: {
    color: Colors.text.inverse,
  },
  receivedText: {
    color: Colors.text.primary,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: Spacing.xs,
  },
  timestamp: {
    fontSize: Typography.fontSize.xs - 1,
    fontFamily: Typography.fontFamily.regular,
    fontWeight: Typography.fontWeight.medium,
  },
  sentTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  receivedTimestamp: {
    color: Colors.text.tertiary,
  },
});