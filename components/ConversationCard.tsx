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
    switch (conversation.channel) {
      case 'sms':
        return <Phone size={16} color="#10b981" />;
      case 'webchat':
        return <MessageSquare size={16} color="#3b82f6" />;
      case 'facebook':
        return <Facebook size={16} color="#1877f2" />;
      case 'email':
        return <Mail size={16} color="#6366f1" />;
      default:
        return <MessageSquare size={16} color="#6b7280" />;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {getInitials(conversation.customerName)}
          </Text>
        </View>
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
        <MoreVertical size={20} color="#9ca3af" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3a8a',
  },
  channelBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  contentContainer: {
    flex: 1,
    marginRight: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#6b7280',
    marginRight: 6,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  lastMessage: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
    lineHeight: 20,
  },
  unreadBadge: {
    backgroundColor: '#dc2626',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  menuButton: {
    padding: 4,
  },
});