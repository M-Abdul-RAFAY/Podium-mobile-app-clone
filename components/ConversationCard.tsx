import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Phone, MessageSquare, Facebook, Mail, MoveVertical as MoreVertical } from 'lucide-react-native';
import { MessageStatusIcon } from './MessageStatusIcon';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { Shadows } from '@/constants/Shadows';
import { Avatar } from './ui/Avatar';

interface Conversation {
  id: string;
  customerName: string;
  lastMessage: string;
  timestamp: string;
  channel: 'sms' | 'webchat' | 'facebook' | 'email';
  unreadCount: number;
  status: 'sent' | 'delivered' | 'read';
  avatar?: string;
}

interface ConversationCardProps {
  conversation: Conversation;
  onPress?: () => void;
}

export function ConversationCard({ conversation, onPress }: ConversationCardProps) {
  const getChannelIcon = () => {
    const iconSize = 16;
    switch (conversation.channel) {
      case 'sms':
        return <Phone size={iconSize} color={Colors.channels.sms} />;
      case 'webchat':
        return <MessageSquare size={iconSize} color={Colors.channels.webchat} />;
      case 'facebook':
        return <Facebook size={iconSize} color={Colors.channels.facebook} />;
      case 'email':
        return <Mail size={iconSize} color={Colors.channels.email} />;
      default:
        return <MessageSquare size={iconSize} color={Colors.neutral[500]} />;
    }
  };


  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <Avatar name={conversation.customerName} size="lg" />
        <View style={styles.channelBadge}>
          {getChannelIcon()}
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.customerName} numberOfLines={1}>
            {conversation.customerName}
          </Text>
          <View style={styles.timestampContainer}>
            <Text style={styles.timestamp}>{conversation.timestamp}</Text>
            <MessageStatusIcon status={conversation.status} />
          </View>
        </View>

        <View style={styles.messageRow}>
          <Text style={styles.lastMessage} numberOfLines={2}>
            {conversation.lastMessage}
          </Text>
          {conversation.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>
                {conversation.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.menuButton}>
        <MoreVertical size={20} color={Colors.neutral[400]} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Spacing.screen.horizontal,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: Spacing.lg,
  },
  channelBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.background.primary,
    ...Shadows.small,
  },
  contentContainer: {
    flex: 1,
    marginRight: Spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  customerName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.primary,
    flex: 1,
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  timestamp: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.tertiary,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  lastMessage: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    flex: 1,
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.normal,
  },
  unreadBadge: {
    backgroundColor: Colors.error[500],
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.sm,
  },
  unreadCount: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.inverse,
  },
  menuButton: {
    padding: Spacing.xs,
  },
});