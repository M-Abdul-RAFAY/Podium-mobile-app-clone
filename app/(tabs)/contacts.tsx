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
  UserPlus,
  Phone,
  Mail,
  MessageCircle,
  Star,
  MoveVertical as MoreVertical,
} from 'lucide-react-native';
import { ContactCard } from '@/components/ContactCard';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { Shadows } from '@/constants/Shadows';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  lastContact: string;
  totalMessages: number;
  rating: number;
  tags: string[];
  avatar?: string;
}

export default function ContactsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 123-4567',
      company: 'Tech Solutions Inc.',
      lastContact: '2 minutes ago',
      totalMessages: 24,
      rating: 5,
      tags: ['VIP', 'Lead'],
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@business.com',
      phone: '+1 (555) 987-6543',
      company: 'Creative Agency',
      lastContact: '15 minutes ago',
      totalMessages: 12,
      rating: 4,
      tags: ['New Customer'],
    },
    {
      id: '3',
      name: 'Emily Davis',
      email: 'emily.davis@startup.io',
      phone: '+1 (555) 456-7890',
      lastContact: '1 hour ago',
      totalMessages: 8,
      rating: 5,
      tags: ['Prospect'],
    },
    {
      id: '4',
      name: 'Robert Wilson',
      email: 'r.wilson@corp.com',
      phone: '+1 (555) 321-9876',
      company: 'Wilson & Associates',
      lastContact: '2 hours ago',
      totalMessages: 36,
      rating: 4,
      tags: ['Long-term Client', 'VIP'],
    },
  ];

  const filterOptions = [
    { id: 'all', label: 'All Contacts' },
    { id: 'recent', label: 'Recent' },
    { id: 'vip', label: 'VIP' },
    { id: 'leads', label: 'Leads' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contacts</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Filter size={20} color={Colors.text.inverse} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <UserPlus size={20} color={Colors.text.inverse} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={Colors.neutral[500]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search contacts..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.neutral[400]}
          />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filterOptions.map((filter) => (
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
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.contactsList}>
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
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
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  headerButton: {
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
    paddingBottom: Spacing.lg,
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
  contactsList: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
});
