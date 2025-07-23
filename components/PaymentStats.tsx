import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { DollarSign, TrendingUp, Clock, CircleCheck as CheckCircle, Calendar } from 'lucide-react-native';

interface PaymentStatsProps {
  stats: {
    totalRevenue: number;
    pendingAmount: number;
    thisMonthRevenue: number;
    successRate: number;
    averagePaymentTime: number;
  };
}

export function PaymentStats({ stats }: PaymentStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainStats}>
        <View style={styles.revenueCard}>
          <DollarSign size={24} color="#1e3a8a" />
          <Text style={styles.revenueAmount}>
            {formatCurrency(stats.totalRevenue)}
          </Text>
          <Text style={styles.revenueLabel}>Total Revenue</Text>
        </View>

        <View style={styles.pendingCard}>
          <Clock size={20} color="#f59e0b" />
          <Text style={styles.pendingAmount}>
            {formatCurrency(stats.pendingAmount)}
          </Text>
          <Text style={styles.pendingLabel}>Pending</Text>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <TrendingUp size={18} color="#10b981" />
          </View>
          <Text style={styles.statValue}>
            {formatCurrency(stats.thisMonthRevenue)}
          </Text>
          <Text style={styles.statLabel}>This Month</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <CheckCircle size={18} color="#3b82f6" />
          </View>
          <Text style={styles.statValue}>{stats.successRate}%</Text>
          <Text style={styles.statLabel}>Success Rate</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Calendar size={18} color="#6366f1" />
          </View>
          <Text style={styles.statValue}>{stats.averagePaymentTime}d</Text>
          <Text style={styles.statLabel}>Avg. Payment</Text>
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
  mainStats: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 16,
  },
  revenueCard: {
    flex: 2,
    backgroundColor: '#dbeafe',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  revenueAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e3a8a',
    marginTop: 8,
    marginBottom: 4,
  },
  revenueLabel: {
    fontSize: 14,
    color: '#1e3a8a',
    fontWeight: '600',
  },
  pendingCard: {
    flex: 1,
    backgroundColor: '#fef3c7',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  pendingAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f59e0b',
    marginTop: 8,
    marginBottom: 4,
  },
  pendingLabel: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingVertical: 16,
    paddingHorizontal: 12,
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
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#6b7280',
    textAlign: 'center',
  },
});