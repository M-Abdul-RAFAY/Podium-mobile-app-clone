import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MessageSquare, Mail, Zap, Play, Pause, Calendar, Users, Eye, MessageCircle, MoveVertical as MoreVertical } from 'lucide-react-native';

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
    switch (campaign.type) {
      case 'sms':
        return <MessageSquare size={18} color="#10b981" />;
      case 'email':
        return <Mail size={18} color="#3b82f6" />;
      case 'automation':
        return <Zap size={18} color="#f59e0b" />;
      default:
        return <MessageSquare size={18} color="#6b7280" />;
    }
  };

  const getStatusColor = () => {
    switch (campaign.status) {
      case 'active':
        return '#10b981';
      case 'paused':
        return '#f59e0b';
      case 'draft':
        return '#6b7280';
      case 'completed':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  const getOpenRate = () => {
    return campaign.sent > 0 ? ((campaign.opened / campaign.sent) * 100).toFixed(1) : '0';
  };

  const getResponseRate = () => {
    return campaign.sent > 0 ? ((campaign.responded / campaign.sent) * 100).toFixed(1) : '0';
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
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
          <MoreVertical size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      <View style={styles.metricsContainer}>
        <View style={styles.metricRow}>
          <View style={styles.metric}>
            <Users size={16} color="#6b7280" />
            <Text style={styles.metricValue}>{campaign.recipients}</Text>
            <Text style={styles.metricLabel}>Recipients</Text>
          </View>
          
          <View style={styles.metric}>
            <Eye size={16} color="#6b7280" />
            <Text style={styles.metricValue}>{getOpenRate()}%</Text>
            <Text style={styles.metricLabel}>Open Rate</Text>
          </View>
          
          <View style={styles.metric}>
            <MessageCircle size={16} color="#6b7280" />
            <Text style={styles.metricValue}>{getResponseRate()}%</Text>
            <Text style={styles.metricLabel}>Response</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.activityContainer}>
          <Calendar size={14} color="#6b7280" />
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
              <Pause size={16} color="#f59e0b" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.actionButton}>
              <Play size={16} color="#10b981" />
            </TouchableOpacity>
          )}
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
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeContainer: {
    position: 'relative',
    marginRight: 16,
  },
  statusDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  titleContainer: {
    flex: 1,
  },
  campaignName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  campaignType: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  menuButton: {
    padding: 4,
  },
  metricsContainer: {
    marginBottom: 16,
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
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 4,
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  activityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  activityText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 6,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
});