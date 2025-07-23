import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { ChartBar as BarChart3, Users, TrendingUp, MessageSquare } from 'lucide-react-native';

interface CampaignStatsProps {
  stats: {
    totalCampaigns: number;
    activeCampaigns: number;
    totalRecipients: number;
    averageOpenRate: number;
    averageResponseRate: number;
  };
}

export function CampaignStats({ stats }: CampaignStatsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <BarChart3 size={20} color="#1e3a8a" />
          </View>
          <Text style={styles.statValue}>{stats.totalCampaigns}</Text>
          <Text style={styles.statLabel}>Total Campaigns</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <TrendingUp size={20} color="#10b981" />
          </View>
          <Text style={styles.statValue}>{stats.activeCampaigns}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Users size={20} color="#3b82f6" />
          </View>
          <Text style={styles.statValue}>{stats.totalRecipients}</Text>
          <Text style={styles.statLabel}>Recipients</Text>
        </View>
      </View>

      <View style={styles.performanceRow}>
        <View style={styles.performanceCard}>
          <Text style={styles.performanceValue}>{stats.averageOpenRate}%</Text>
          <Text style={styles.performanceLabel}>Avg. Open Rate</Text>
        </View>
        
        <View style={styles.performanceCard}>
          <Text style={styles.performanceValue}>{stats.averageResponseRate}%</Text>
          <Text style={styles.performanceLabel}>Avg. Response Rate</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginHorizontal: 4,
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
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  performanceRow: {
    flexDirection: 'row',
    gap: 12,
  },
  performanceCard: {
    flex: 1,
    backgroundColor: '#dbeafe',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  performanceValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: 2,
  },
  performanceLabel: {
    fontSize: 11,
    color: '#1e3a8a',
    fontWeight: '600',
  },
});