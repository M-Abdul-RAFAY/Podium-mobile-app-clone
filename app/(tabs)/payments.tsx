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
  Plus,
  DollarSign,
  CreditCard,
  Calendar,
  TrendingUp,
  Filter,
} from 'lucide-react-native';
import { PaymentCard } from '@/components/PaymentCard';
import { PaymentStats } from '@/components/PaymentStats';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { Shadows } from '@/constants/Shadows';

interface Payment {
  id: string;
  customerName: string;
  amount: number;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  dueDate: string;
  description: string;
  paymentMethod?: string;
  invoiceNumber: string;
}

export default function PaymentsScreen() {
  const [selectedTab, setSelectedTab] = useState('pending');

  const payments: Payment[] = [
    {
      id: '1',
      customerName: 'Sarah Johnson',
      amount: 450.0,
      status: 'pending',
      dueDate: 'Due Today',
      description: 'Website Design Services',
      invoiceNumber: 'INV-001',
    },
    {
      id: '2',
      customerName: 'Mike Chen',
      amount: 1200.0,
      status: 'paid',
      dueDate: 'Paid 2 days ago',
      description: 'Monthly Consulting Package',
      paymentMethod: 'Credit Card',
      invoiceNumber: 'INV-002',
    },
    {
      id: '3',
      customerName: 'Emily Davis',
      amount: 750.0,
      status: 'pending',
      dueDate: 'Due in 3 days',
      description: 'Digital Marketing Campaign',
      invoiceNumber: 'INV-003',
    },
    {
      id: '4',
      customerName: 'Robert Wilson',
      amount: 325.0,
      status: 'failed',
      dueDate: 'Payment Failed',
      description: 'Logo Design Project',
      invoiceNumber: 'INV-004',
    },
  ];

  const tabs = [
    { id: 'pending', label: 'Pending', count: 2 },
    { id: 'paid', label: 'Paid', count: 1 },
    { id: 'failed', label: 'Failed', count: 1 },
  ];

  const stats = {
    totalRevenue: 12750,
    pendingAmount: 1525,
    thisMonthRevenue: 3420,
    successRate: 94.2,
    averagePaymentTime: 2.3,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Payments</Text>
        <TouchableOpacity style={styles.createButton}>
          <Plus size={20} color={Colors.text.inverse} />
        </TouchableOpacity>
      </View>

      {/* <PaymentStats stats={stats} /> */}

      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, selectedTab === tab.id && styles.tabActive]}
            onPress={() => setSelectedTab(tab.id)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab.id && styles.tabTextActive,
              ]}
            >
              {tab.label} ({tab.count})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.paymentsList}>
        {payments
          .filter((payment) => payment.status === selectedTab)
          .map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
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
  createButton: {
    padding: Spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Spacing.screen.horizontal,
    paddingVertical: Spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
  },
  tabActive: {
    backgroundColor: Colors.primary[600],
  },
  tabText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.secondary,
  },
  tabTextActive: {
    color: Colors.text.inverse,
  },
  paymentsList: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
});
