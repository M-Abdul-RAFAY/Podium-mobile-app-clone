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
import { Search, Filter, UserPlus, Phone, Mail, MessageCircle, Star, MoveVertical as MoreVertical } from 'lucide-react-native';
import { ContactCard } from '@/components/ContactCard';

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
            <Filter size={20} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <UserPlus size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search contacts..."
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
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
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
  contactsList: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
});