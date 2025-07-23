import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Phone, Mail, MessageCircle, Star, MoveVertical as MoreVertical } from 'lucide-react-native';

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

interface ContactCardProps {
  contact: Contact;
}

export function ContactCard({ contact }: ContactCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={12}
          color={i <= rating ? '#fbbf24' : '#e5e7eb'}
          fill={i <= rating ? '#fbbf24' : 'transparent'}
        />
      );
    }
    return stars;
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {getInitials(contact.name)}
            </Text>
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.name} numberOfLines={1}>
              {contact.name}
            </Text>
            {contact.company && (
              <Text style={styles.company} numberOfLines={1}>
                {contact.company}
              </Text>
            )}
          </View>
        </View>
        
        <TouchableOpacity style={styles.menuButton}>
          <MoreVertical size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      <View style={styles.contactDetails}>
        <View style={styles.contactRow}>
          <Phone size={14} color="#6b7280" />
          <Text style={styles.contactText}>{contact.phone}</Text>
        </View>
        <View style={styles.contactRow}>
          <Mail size={14} color="#6b7280" />
          <Text style={styles.contactText} numberOfLines={1}>
            {contact.email}
          </Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <MessageCircle size={16} color="#3b82f6" />
          <Text style={styles.statText}>{contact.totalMessages} messages</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.lastContactText}>Last: {contact.lastContact}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.tagsContainer}>
          {contact.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.ratingContainer}>
          {renderStars(contact.rating)}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Phone size={18} color="#1e3a8a" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={18} color="#1e3a8a" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Mail size={18} color="#1e3a8a" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e3a8a',
  },
  contactInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  company: {
    fontSize: 14,
    color: '#6b7280',
  },
  menuButton: {
    padding: 4,
  },
  contactDetails: {
    marginBottom: 16,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#4b5563',
    marginLeft: 8,
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 6,
  },
  lastContactText: {
    fontSize: 12,
    color: '#6b7280',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  tag: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1e3a8a',
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  actionButton: {
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
});