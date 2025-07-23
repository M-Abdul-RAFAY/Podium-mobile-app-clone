import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Star, TrendingUp, MessageSquare, Users } from 'lucide-react-native';

interface ReviewStatsProps {
  stats: {
    averageRating: number;
    totalReviews: number;
    newThisWeek: number;
    responseRate: number;
    googleRating: number;
    facebookRating: number;
    yelpRating: number;
  };
}

export function ReviewStats({ stats }: ReviewStatsProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          color={i <= fullStars ? '#fbbf24' : '#e5e7eb'}
          fill={i <= fullStars ? '#fbbf24' : 'transparent'}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainStats}>
        <View style={styles.ratingSection}>
          <Text style={styles.averageRating}>{stats.averageRating}</Text>
          <View style={styles.starsContainer}>
            {renderStars(stats.averageRating)}
          </View>
          <Text style={styles.totalReviews}>{stats.totalReviews} reviews</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <TrendingUp size={18} color="#10b981" />
            <Text style={styles.statValue}>{stats.newThisWeek}</Text>
            <Text style={styles.statLabel}>New This Week</Text>
          </View>

          <View style={styles.statItem}>
            <MessageSquare size={18} color="#3b82f6" />
            <Text style={styles.statValue}>{stats.responseRate}%</Text>
            <Text style={styles.statLabel}>Response Rate</Text>
          </View>
        </View>
      </View>

      <View style={styles.platformStats}>
        <Text style={styles.platformTitle}>Platform Ratings</Text>
        <View style={styles.platformGrid}>
          <View style={styles.platformItem}>
            <Text style={styles.platformName}>Google</Text>
            <Text style={styles.platformRating}>{stats.googleRating}</Text>
          </View>

          <View style={styles.platformItem}>
            <Text style={styles.platformName}>Facebook</Text>
            <Text style={styles.platformRating}>{stats.facebookRating}</Text>
          </View>

          <View style={styles.platformItem}>
            <Text style={styles.platformName}>Yelp</Text>
            <Text style={styles.platformRating}>{stats.yelpRating}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 1,
  },
  mainStats: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  ratingSection: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 10,
  },
  averageRating: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  totalReviews: {
    fontSize: 14,
    color: '#6b7280',
  },
  statsGrid: {
    flex: 1,
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
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
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginLeft: 12,
    marginRight: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    flex: 1,
  },
  platformStats: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  platformTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  platformGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  platformItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#dbeafe',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  platformName: {
    fontSize: 12,
    color: '#1e3a8a',
    fontWeight: '600',
    marginBottom: 4,
  },
  platformRating: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e3a8a',
  },
});
