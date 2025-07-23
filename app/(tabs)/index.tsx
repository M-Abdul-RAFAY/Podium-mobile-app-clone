import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {
  Search,
  Filter,
  Phone,
  MessageSquare,
  Facebook,
  Mail,
  MoveVertical as MoreVertical,
  CheckCheck,
  Check,
  Clock,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { ConversationCard } from '@/components/ConversationCard';
import { MessageStatusIcon } from '@/components/MessageStatusIcon';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inbox</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#1e3a8a" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1e3a8a',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  filterButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  filterContainer: {
    backgroundColor: '#ffffff',
    paddingBottom: 16,
  },
  filterContent: {
    paddingHorizontal: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterChipActive: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  filterChipTextActive: {
    color: '#ffffff',
  },
  conversationsList: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});
