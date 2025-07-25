import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Phone, Mail, MessageCircle, Star, MoveVertical as MoreVertical } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { Card } from './ui/Card';
import { Avatar } from './ui/Avatar';
import { Badge } from './ui/Badge';

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

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={12}
          color={i <= rating ? Colors.warning[500] : Colors.neutral[300]}
          fill={i <= rating ? Colors.warning[500] : 'transparent'}
        />
      );
    }
    return stars;
  };

  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Avatar name={contact.name} size="lg" />
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
          <MoreVertical size={20} color={Colors.neutral[400]} />
        </TouchableOpacity>
      </View>

      <View style={styles.contactDetails}>
        <View style={styles.contactRow}>
          <Phone size={14} color={Colors.neutral[500]} />
          <Text style={styles.contactText}>{contact.phone}</Text>
        </View>
        <View style={styles.contactRow}>
          <Mail size={14} color={Colors.neutral[500]} />
          <Text style={styles.contactText} numberOfLines={1}>
            {contact.email}
          </Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <MessageCircle size={16} color={Colors.primary[500]} />
          <Text style={styles.statText}>{contact.totalMessages} messages</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.lastContactText}>Last: {contact.lastContact}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.tagsContainer}>
          {contact.tags.map((tag, index) => (
            <Badge key={index} label={tag} size="sm" variant="primary" />
          ))}
        </View>
        
        <View style={styles.ratingContainer}>
          {renderStars(contact.rating)}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Phone size={18} color={Colors.primary[600]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={18} color={Colors.primary[600]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Mail size={18} color={Colors.primary[600]} />
        </TouchableOpacity>
      </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactInfo: {
    flex: 1,
    marginLeft: Spacing.lg,
  },
  name: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.primary,
    marginBottom: Spacing.xs / 2,
  },
  company: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
  },
  menuButton: {
    padding: Spacing.xs,
  },
  contactDetails: {
    marginBottom: Spacing.lg,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  contactText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    marginLeft: Spacing.sm,
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.tertiary,
    marginLeft: Spacing.sm,
  },
  lastContactText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.tertiary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  tagsContainer: {
    flexDirection: 'row',
    flex: 1,
    gap: Spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: Spacing.xs / 2,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing['2xl'],
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  actionButton: {
    padding: Spacing.md,
    backgroundColor: Colors.background.tertiary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border.medium,
  },
});