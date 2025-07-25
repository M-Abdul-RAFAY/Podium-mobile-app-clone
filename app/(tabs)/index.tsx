import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Search,
  Filter,
  MessageSquare,
  Phone,
  Mail,
  MoveVertical as MoreVertical,
  CheckCheck,
  Check,
  Clock,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { ConversationCard } from '@/components/ConversationCard';
import { MessageStatusIcon } from '@/components/MessageStatusIcon';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { Shadows } from '@/constants/Shadows';

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

export default function InboxScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const insets = useSafeAreaInsets();

  const conversations: Conversation[] = [
    {
      id: '1',
      customerName: 'Sarah Johnson',
      lastMessage: 'Thank you! When can I schedule my next appointment?',
      timestamp: '2m ago',
      channel: 'sms',
      unreadCount: 2,
      status: 'read',
    },
    {
      id: '2',
      customerName: 'Mike Chen',
      lastMessage: 'Is the service still available today?',
      timestamp: '15m ago',
      channel: 'webchat',
      unreadCount: 1,
      status: 'delivered',
    },
    {
      id: '3',
      customerName: 'Emily Davis',
      lastMessage: 'Perfect! I love the new pricing options.',
      timestamp: '1h ago',
      channel: 'facebook',
      unreadCount: 0,
      status: 'read',
    },
    {
      id: '4',
      customerName: 'Robert Wilson',
      lastMessage: 'Could you send me the quote via email?',
      timestamp: '2h ago',
      channel: 'email',
      unreadCount: 3,
      status: 'sent',
    },
    {
      id: '5',
      customerName: 'Lisa Thompson',
      lastMessage: 'The team did an amazing job! Thank you so much.',
      timestamp: '3h ago',
      channel: 'sms',
      unreadCount: 0,
      status: 'read',
    },
    {
      id: '6',
      customerName: 'John Smith',
      lastMessage: 'I need help with my order',
      timestamp: '5h ago',
      channel: 'webchat',
      unreadCount: 1,
      status: 'delivered',
    },
  ];

  const filterButtons = [
    { id: 'all', label: 'All', count: conversations.length },
    {
      id: 'unread',
      label: 'Unread',
      count: conversations.filter((c) => c.unreadCount > 0).length,
    },
    { id: 'assigned', label: 'Assigned', count: 2 },
    { id: 'urgent', label: 'Urgent', count: 1 },
  ];

  const getFilteredConversations = () => {
    let filtered = conversations;

    // Apply filter
    switch (selectedFilter) {
      case 'unread':
        filtered = conversations.filter((c) => c.unreadCount > 0);
        break;
      case 'assigned':
        // Mock assigned conversations (first 2)
        filtered = conversations.slice(0, 2);
        break;
      case 'urgent':
        // Mock urgent conversations (first 1)
        filtered = conversations.slice(0, 1);
        break;
      default:
        filtered = conversations;
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (c) =>
          c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const handleConversationPress = (conversation: Conversation) => {
    router.push({
      pathname: '/conversation/[id]',
      params: {
        id: conversation.id,
        customerName: conversation.customerName,
        channel: conversation.channel,
      },
    });
  };
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inbox</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={Colors.text.inverse} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search
            size={20}
            color={Colors.neutral[500]}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.neutral[400]}
          />
        </View>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
        >
          {filterButtons.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                selectedFilter === filter.id && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === filter.id && styles.filterChipTextActive,
                ]}
              >
                {filter.label} ({filter.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.conversationsList}>
        {getFilteredConversations().map((conversation) => (
          <ConversationCard
            key={conversation.id}
            conversation={conversation}
            onPress={() => handleConversationPress(conversation)}
          />
        ))}
        {getFilteredConversations().length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No conversations found</Text>
            <Text style={styles.emptyStateSubtext}>
              {searchQuery
                ? 'Try adjusting your search terms'
                : 'No conversations match the selected filter'}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  safeAreaHeader: {
    backgroundColor: Colors.primary[700],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screen.horizontal,
    paddingVertical: Spacing.screen.vertical,
    backgroundColor: Colors.primary[600],
    ...Shadows.small,
  },
  headerTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.inverse,
  },
  filterButton: {
    padding: Spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
  },
  searchContainer: {
    paddingHorizontal: Spacing.screen.horizontal,
    paddingVertical: Spacing.screen.vertical,
    backgroundColor: Colors.background.primary,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.tertiary,
    borderRadius: 12,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  searchIcon: {
    marginRight: Spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.primary,
  },
  filterContainer: {
    backgroundColor: Colors.background.primary,
    paddingVertical: Spacing.sm,
  },
  filterContent: {
    paddingHorizontal: Spacing.screen.horizontal,
  },
  filterChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    marginRight: Spacing.md,
    backgroundColor: Colors.background.tertiary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border.medium,
  },
  filterChipActive: {
    backgroundColor: Colors.primary[600],
    borderColor: Colors.primary[600],
  },
  filterChipText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.secondary,
  },
  filterChipTextActive: {
    color: Colors.text.inverse,
  },
  conversationsList: {
    flex: 1,
    minHeight: 0,
    backgroundColor: Colors.background.secondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing['6xl'],
    paddingHorizontal: Spacing['4xl'],
  },
  emptyStateText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.normal,
  },
});