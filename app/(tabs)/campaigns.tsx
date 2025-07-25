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
  Calendar,
  Users,
  TrendingUp,
  Play,
  Pause,
  CreditCard as Edit,
  MoveVertical as MoreVertical,
} from 'lucide-react-native';
import { CampaignCard } from '@/components/CampaignCard';
import { CampaignStats } from '@/components/CampaignStats';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { Shadows } from '@/constants/Shadows';

interface Campaign {
  id: string;
  name: string;
  type: 'sms' | 'email' | 'automation';
  status: 'active' | 'paused' | 'draft' | 'completed';
  recipients: number;
  sent: number;
  opened: number;
  responded: number;
  scheduledDate?: string;
  lastActivity: string;
}

export default function CampaignsScreen() {
  const [selectedTab, setSelectedTab] = useState('active');

  const campaigns: Campaign[] = [
    {
      id: '1',
      name: 'Welcome New Customers',
      type: 'automation',
      status: 'active',
      recipients: 156,
      sent: 143,
      opened: 98,
      responded: 24,
      lastActivity: '2 hours ago',
    },
    {
      id: '2',
      name: 'Monthly Newsletter',
      type: 'email',
      status: 'active',
      recipients: 847,
      sent: 847,
      opened: 412,
      responded: 89,
      lastActivity: 'Yesterday',
    },
    {
      id: '3',
      name: 'Appointment Reminders',
      type: 'sms',
      status: 'active',
      recipients: 234,
      sent: 234,
      opened: 234,
      responded: 12,
      lastActivity: '3 hours ago',
    },
    {
      id: '4',
      name: 'Holiday Promotion',
      type: 'sms',
      status: 'draft',
      recipients: 0,
      sent: 0,
      opened: 0,
      responded: 0,
      scheduledDate: 'Dec 15, 2024',
      lastActivity: '1 week ago',
    },
  ];

  const tabs = [
    { id: 'active', label: 'Active', count: 3 },
    { id: 'draft', label: 'Drafts', count: 1 },
    { id: 'completed', label: 'Completed', count: 0 },
  ];

  const stats = {
    totalCampaigns: 16,
    activeCampaigns: 3,
    totalRecipients: 1237,
    averageOpenRate: 58.3,
    averageResponseRate: 14.2,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Campaigns</Text>
        <TouchableOpacity style={styles.createButton}>
          <Plus size={20} color={Colors.text.inverse} />
        </TouchableOpacity>
      </View>

      {/* <CampaignStats stats={stats} /> */}

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

      <ScrollView style={styles.campaignsList}>
        {campaigns
          .filter((campaign) =>
            selectedTab === 'active'
              ? campaign.status === 'active'
              : selectedTab === 'draft'
              ? campaign.status === 'draft'
              : campaign.status === 'completed'
          )
          .map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
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
  campaignsList: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
});
