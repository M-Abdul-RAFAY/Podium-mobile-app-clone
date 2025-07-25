import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MessageSquare, Mail, Zap, Play, Pause, Calendar, Users, Eye, MessageCircle, MoveVertical as MoreVertical } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { Card } from './ui/Card';

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

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const getTypeIcon = () => {
    const iconSize = 18;
    switch (campaign.type) {
      case 'sms':
        return <MessageSquare size={iconSize} color={Colors.success[500]} />;
      case 'email':
        return <Mail size={iconSize} color={Colors.primary[500]} />;
      case 'automation':
        return <Zap size={iconSize} color={Colors.warning[500]} />;
      default:
        return <MessageSquare size={iconSize} color={Colors.neutral[500]} />;
    }
  };

  const getStatusColor = () => {
    switch (campaign.status) {
      case 'active':
        return Colors.success[500];
      case 'paused':
        return Colors.warning[500];
      case 'draft':
        return Colors.neutral[500];
      case 'completed':
        return Colors.primary[500];
      default:
        return Colors.neutral[500];
    }
  };

  const getOpenRate = () => {
    return campaign.sent > 0 ? ((campaign.opened / campaign.sent) * 100).toFixed(1) : '0';
  };

  const getResponseRate = () => {
    return campaign.sent > 0 ? ((campaign.responded / campaign.sent) * 100).toFixed(1) : '0';
  };

  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.typeContainer}>
            {getTypeIcon()}
            <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.campaignName} numberOfLines={1}>
              {campaign.name}
            </Text>
            <Text style={styles.campaignType}>
              {campaign.type.toUpperCase()} • {campaign.status.toUpperCase()}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.menuButton}>
          <MoreVertical size={20} color={Colors.neutral[400]} />
        </TouchableOpacity>
      </View>

      <View style={styles.metricsContainer}>
        <View style={styles.metricRow}>
          <View style={styles.metric}>
            <Users size={16} color={Colors.neutral[500]} />
            <Text style={styles.metricValue}>{campaign.recipients}</Text>
            <Text style={styles.metricLabel}>Recipients</Text>
          </View>
          
          <View style={styles.metric}>
            <Eye size={16} color={Colors.neutral[500]} />
            <Text style={styles.metricValue}>{getOpenRate()}%</Text>
            <Text style={styles.metricLabel}>Open Rate</Text>
          </View>
          
          <View style={styles.metric}>
            <MessageCircle size={16} color={Colors.neutral[500]} />
            <Text style={styles.metricValue}>{getResponseRate()}%</Text>
            <Text style={styles.metricLabel}>Response</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.activityContainer}>
          <Calendar size={14} color={Colors.neutral[500]} />
          <Text style={styles.activityText}>
            {campaign.scheduledDate 
              ? `Scheduled: ${campaign.scheduledDate}`
              : `Last activity: ${campaign.lastActivity}`
            }
          </Text>
        </View>
        
        <View style={styles.actions}>
          {campaign.status === 'active' ? (
            <TouchableOpacity style={styles.actionButton}>
              <Pause size={16} color={Colors.warning[500]} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.actionButton}>
              <Play size={16} color={Colors.success[500]} />
            </TouchableOpacity>
          )}
        </View>
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeContainer: {
    position: 'relative',
    marginRight: Spacing.lg,
  },
  statusDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.background.primary,
  },
  titleContainer: {
    flex: 1,
  },
  campaignName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.primary,
    marginBottom: Spacing.xs / 2,
  },
  campaignType: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.tertiary,
    fontWeight: Typography.fontWeight.medium,
  },
  menuButton: {
    padding: Spacing.xs,
  },
  metricsContainer: {
    marginBottom: Spacing.lg,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metric: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    marginTop: Spacing.xs,
    marginBottom: Spacing.xs / 2,
  },
  metricLabel: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.tertiary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  activityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  activityText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.tertiary,
    marginLeft: Spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionButton: {
    padding: Spacing.sm,
    backgroundColor: Colors.background.tertiary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border.medium,
  },
});