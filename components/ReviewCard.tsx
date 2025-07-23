import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Star, MessageSquare, ExternalLink, CircleCheck as CheckCircle, CircleAlert as AlertCircle, MoveVertical as MoreVertical } from 'lucide-react-native';

interface Review {
  id: string;
  customerName: string;
  rating: number;
  title: string;
  content: string;
  platform: 'google' | 'facebook' | 'yelp' | 'website';
  date: string;
  responded: boolean;
  verified: boolean;
}

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const getPlatformColor = () => {
    switch (review.platform) {
      case 'google':
        return '#4285f4';
      case 'facebook':
        return '#1877f2';
      case 'yelp':
        return '#d32323';
      case 'website':
        return '#1e3a8a';
      default:
        return '#6b7280';
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          color={i <= rating ? '#fbbf24' : '#e5e7eb'}
          fill={i <= rating ? '#fbbf24' : 'transparent'}
        />
      );
    }
    return stars;
  };

  const getRatingColor = () => {
    if (review.rating >= 4) return '#10b981';
    if (review.rating >= 3) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.customerInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {review.customerName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.customerDetails}>
            <View style={styles.nameRow}>
              <Text style={styles.customerName}>{review.customerName}</Text>
              {review.verified && (
                <CheckCircle size={14} color="#10b981" />
              )}
            </View>
            <View style={styles.platformRow}>
              <View style={[styles.platformBadge, { backgroundColor: getPlatformColor() }]}>
                <Text style={styles.platformText}>
                  {review.platform.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.date}>{review.date}</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.menuButton}>
          <MoreVertical size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      <View style={styles.ratingContainer}>
        <View style={styles.starsContainer}>
          {renderStars(review.rating)}
        </View>
        <Text style={[styles.ratingText, { color: getRatingColor() }]}>
          {review.rating}.0
        </Text>
      </View>

      <Text style={styles.reviewTitle} numberOfLines={2}>
        {review.title}
      </Text>

      <Text style={styles.reviewContent} numberOfLines={3}>
        {review.content}
      </Text>

      <View style={styles.footer}>
        <View style={styles.statusContainer}>
          {review.responded ? (
            <View style={styles.respondedBadge}>
              <CheckCircle size={14} color="#10b981" />
              <Text style={styles.respondedText}>Responded</Text>
            </View>
          ) : (
            <View style={styles.pendingBadge}>
              <AlertCircle size={14} color="#f59e0b" />
              <Text style={styles.pendingText}>Needs Response</Text>
            </View>
          )}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <MessageSquare size={16} color="#1e3a8a" />
            <Text style={styles.actionText}>Reply</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <ExternalLink size={16} color="#1e3a8a" />
            <Text style={styles.actionText}>View</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 12,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3a8a',
  },
  customerDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginRight: 6,
  },
  platformRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  platformText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
  },
  date: {
    fontSize: 12,
    color: '#6b7280',
  },
  menuButton: {
    padding: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '700',
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
    lineHeight: 22,
  },
  reviewContent: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  statusContainer: {
    flex: 1,
  },
  respondedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  respondedText: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
    marginLeft: 4,
  },
  pendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pendingText: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: '600',
    marginLeft: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e3a8a',
    marginLeft: 4,
  },
});