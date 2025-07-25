import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  Star,
  TrendingUp,
  MessageSquare,
  ExternalLink,
  Filter,
} from 'lucide-react-native';
import { ReviewCard } from '@/components/ReviewCard';
import { ReviewStats } from '@/components/ReviewStats';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { Shadows } from '@/constants/Shadows';

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

export default function ReviewsScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const reviews: Review[] = [
    {
      id: '1',
      customerName: 'Sarah Miller',
      rating: 5,
      title: 'Outstanding service!',
      content:
        'The team was professional, timely, and exceeded all my expectations. Highly recommend!',
      platform: 'google',
      date: '2 days ago',
      responded: true,
      verified: true,
    },
    {
      id: '2',
      customerName: 'David Lee',
      rating: 4,
      title: 'Great experience overall',
      content:
        'Very satisfied with the quality of work. Minor delay but communication was excellent.',
      platform: 'facebook',
      date: '1 week ago',
      responded: false,
      verified: true,
    },
    {
      id: '3',
      customerName: 'Anonymous',
      rating: 2,
      title: 'Could be better',
      content:
        'Service was okay but not what I expected based on the price. Response time was slow.',
      platform: 'yelp',
      date: '3 days ago',
      responded: false,
      verified: false,
    },
    {
      id: '4',
      customerName: 'Maria Rodriguez',
      rating: 5,
      title: 'Fantastic results!',
      content:
        'Amazing work! The team delivered exactly what we needed on time and within budget.',
      platform: 'google',
      date: '1 week ago',
      responded: true,
      verified: true,
    },
  ];

  const filterOptions = [
    { id: 'all', label: 'All Reviews' },
    { id: 'unresponded', label: 'Need Response' },
    { id: 'recent', label: 'Recent' },
    { id: 'high-rating', label: '4+ Stars' },
    { id: 'low-rating', label: '3- Stars' },
  ];

  const stats = {
    averageRating: 4.2,
    totalReviews: 146,
    newThisWeek: 8,
    responseRate: 87,
    googleRating: 4.3,
    facebookRating: 4.1,
    yelpRating: 4.0,
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaHeader}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Reviews</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={Colors.text.inverse} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* <ReviewStats stats={stats} /> */}

      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
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
      </View>

      <ScrollView style={styles.reviewsList}>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
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
  reviewsList: {
    flex: 1,
    minHeight: 0,
    backgroundColor: Colors.background.secondary,
  },
});