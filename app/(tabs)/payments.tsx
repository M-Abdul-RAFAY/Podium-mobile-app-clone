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
      amount: 450.00,
      status: 'pending',
      dueDate: 'Due Today',
      description: 'Website Design Services',
      invoiceNumber: 'INV-001',
    },
    {
      id: '2',
      customerName: 'Mike Chen',
      amount: 1200.00,
      status: 'paid',
      dueDate: 'Paid 2 days ago',
      description: 'Monthly Consulting Package',
      paymentMethod: 'Credit Card',
      invoiceNumber: 'INV-002',
    },
    {
      id: '3',
      customerName: 'Emily Davis',
      amount: 750.00,
      status: 'pending',
      dueDate: 'Due in 3 days',
      description: 'Digital Marketing Campaign',
      invoiceNumber: 'INV-003',
    },
    {
      id: '4',
      customerName: 'Robert Wilson',
      amount: 325.00,
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
          <Plus size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <PaymentStats stats={stats} />

      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              selectedTab === tab.id && styles.tabActive,
            ]}
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
  createButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  tabActive: {
    backgroundColor: '#1e3a8a',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  paymentsList: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
});