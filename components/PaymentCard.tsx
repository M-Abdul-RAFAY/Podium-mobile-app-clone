import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { DollarSign, Calendar, CreditCard, CircleAlert as AlertCircle, CircleCheck as CheckCircle, Circle as XCircle, Clock, MessageSquare, Send, MoveVertical as MoreVertical } from 'lucide-react-native';

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

interface PaymentCardProps {
  payment: Payment;
}

export function PaymentCard({ payment }: PaymentCardProps) {
  const getStatusIcon = () => {
    switch (payment.status) {
      case 'pending':
        return <Clock size={18} color="#f59e0b" />;
      case 'paid':
        return <CheckCircle size={18} color="#10b981" />;
      case 'failed':
        return <XCircle size={18} color="#ef4444" />;
      case 'refunded':
        return <AlertCircle size={18} color="#6b7280" />;
      default:
        return <Clock size={18} color="#6b7280" />;
    }
  };

  const getStatusColor = () => {
    switch (payment.status) {
      case 'pending':
        return '#f59e0b';
      case 'paid':
        return '#10b981';
      case 'failed':
        return '#ef4444';
      case 'refunded':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const getStatusBgColor = () => {
    switch (payment.status) {
      case 'pending':
        return '#fef3c7';
      case 'paid':
        return '#d1fae5';
      case 'failed':
        return '#fee2e2';
      case 'refunded':
        return '#f3f4f6';
      default:
        return '#f3f4f6';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.customerInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {getInitials(payment.customerName)}
            </Text>
          </View>
          <View style={styles.customerDetails}>
            <Text style={styles.customerName} numberOfLines={1}>
              {payment.customerName}
            </Text>
            <Text style={styles.invoiceNumber}>
              {payment.invoiceNumber}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.menuButton}>
          <MoreVertical size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      <View style={styles.amountContainer}>
        <View style={styles.amountRow}>
          <DollarSign size={24} color="#1e3a8a" />
          <Text style={styles.amount}>
            ${payment.amount.toFixed(2)}
          </Text>
        </View>
        
        <View style={[styles.statusBadge, { backgroundColor: getStatusBgColor() }]}>
          {getStatusIcon()}
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {payment.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {payment.description}
      </Text>

      <View style={styles.dateContainer}>
        <Calendar size={14} color="#6b7280" />
        <Text style={styles.dateText}>{payment.dueDate}</Text>
        {payment.paymentMethod && (
          <>
            <CreditCard size={14} color="#6b7280" />
            <Text style={styles.paymentMethodText}>{payment.paymentMethod}</Text>
          </>
        )}
      </View>

      <View style={styles.actions}>
        {payment.status === 'pending' && (
          <>
            <TouchableOpacity style={styles.primaryButton}>
              <Send size={16} color="#ffffff" />
              <Text style={styles.primaryButtonText}>Send Reminder</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton}>
              <MessageSquare size={16} color="#1e3a8a" />
              <Text style={styles.secondaryButtonText}>Message</Text>
            </TouchableOpacity>
          </>
        )}
        
        {payment.status === 'failed' && (
          <>
            <TouchableOpacity style={styles.primaryButton}>
              <Send size={16} color="#ffffff" />
              <Text style={styles.primaryButtonText}>Retry Payment</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton}>
              <MessageSquare size={16} color="#1e3a8a" />
              <Text style={styles.secondaryButtonText}>Contact</Text>
            </TouchableOpacity>
          </>
        )}
        
        {payment.status === 'paid' && (
          <TouchableOpacity style={styles.secondaryButton}>
            <MessageSquare size={16} color="#1e3a8a" />
            <Text style={styles.secondaryButtonText}>View Receipt</Text>
          </TouchableOpacity>
        )}
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
    fontSize: 14,
    fontWeight: '600',
    color: '#1e3a8a',
  },
  customerDetails: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  invoiceNumber: {
    fontSize: 12,
    color: '#6b7280',
  },
  menuButton: {
    padding: 4,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e3a8a',
    marginLeft: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    color: '#6b7280',
    marginRight: 12,
  },
  paymentMethodText: {
    fontSize: 12,
    color: '#6b7280',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 6,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flex: 1,
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e3a8a',
    marginLeft: 6,
  },
});