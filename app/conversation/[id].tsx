import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Send, Paperclip, Phone, MessageSquare, Facebook, Mail, MoveVertical as MoreVertical, Info } from 'lucide-react-native';
import { MessageBubble } from '@/components/MessageBubble';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { Shadows } from '@/constants/Shadows';
import { Avatar } from '@/components/ui/Avatar';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isFromUser: boolean;
  status?: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'payment';
}

export default function ConversationScreen() {
  const { id, customerName, channel } = useLocalSearchParams<{
    id: string;
    customerName: string;
    channel: string;
  }>();
  
  const [messageText, setMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Mock messages data
  const [messages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m interested in your services. Can you tell me more about pricing?',
      timestamp: '10:30 AM',
      isFromUser: false,
    },
    {
      id: '2',
      text: 'Hello! I\'d be happy to help you with pricing information. We offer several packages depending on your needs.',
      timestamp: '10:32 AM',
      isFromUser: true,
      status: 'read',
    },
    {
      id: '3',
      text: 'That sounds great! What\'s included in your basic package?',
      timestamp: '10:35 AM',
      isFromUser: false,
    },
    {
      id: '4',
      text: 'Our basic package includes:\n• Initial consultation\n• Custom strategy development\n• Monthly reporting\n• Email support\n\nWould you like to schedule a call to discuss this further?',
      timestamp: '10:37 AM',
      isFromUser: true,
      status: 'read',
    },
    {
      id: '5',
      text: 'Yes, that would be perfect! When are you available?',
      timestamp: '10:40 AM',
      isFromUser: false,
    },
    {
      id: '6',
      text: 'I have availability tomorrow at 2 PM or Thursday at 10 AM. Which works better for you?',
      timestamp: '10:42 AM',
      isFromUser: true,
      status: 'delivered',
    },
    {
      id: '7',
      text: 'Thursday at 10 AM works perfectly! Thank you.',
      timestamp: '2m ago',
      isFromUser: false,
    },
  ]);

  const getChannelIcon = () => {
    const iconSize = 18;
    switch (channel) {
      case 'sms':
        return <Phone size={iconSize} color={Colors.channels.sms} />;
      case 'webchat':
        return <MessageSquare size={iconSize} color={Colors.channels.webchat} />;
      case 'facebook':
        return <Facebook size={iconSize} color={Colors.channels.facebook} />;
      case 'email':
        return <Mail size={iconSize} color={Colors.channels.email} />;
      default:
        return <MessageSquare size={iconSize} color={Colors.neutral[500]} />;
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', messageText);
      setMessageText('');
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    // Scroll to bottom when component mounts
    setTimeout(scrollToBottom, 100);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.text.inverse} />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <Avatar 
              name={customerName || 'User'} 
              size="md" 
              backgroundColor="rgba(255, 255, 255, 0.2)"
              textColor={Colors.text.inverse}
            />
            <View style={styles.headerText}>
              <Text style={styles.customerName}>{customerName}</Text>
              <View style={styles.channelInfo}>
                {getChannelIcon()}
                <Text style={styles.channelText}>
                  {channel?.toUpperCase() || 'CHAT'}
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Phone size={20} color={Colors.text.inverse} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Info size={20} color={Colors.text.inverse} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <MoreVertical size={20} color={Colors.text.inverse} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <View style={styles.typingIndicator}>
              <View style={styles.typingBubble}>
                <View style={styles.typingDots}>
                  <View style={[styles.dot, styles.dot1]} />
                  <View style={[styles.dot, styles.dot2]} />
                  <View style={[styles.dot, styles.dot3]} />
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Paperclip size={20} color={Colors.neutral[500]} />
          </TouchableOpacity>
          
          <TextInput
            style={styles.messageInput}
            placeholder="Type a message..."
            placeholderTextColor={Colors.neutral[400]}
            value={messageText}
            onChangeText={setMessageText}
            multiline
            maxLength={1000}
          />
          
          <TouchableOpacity 
            style={[
              styles.sendButton,
              messageText.trim() ? styles.sendButtonActive : styles.sendButtonInactive
            ]}
            onPress={handleSendMessage}
            disabled={!messageText.trim()}
          >
            <Send size={20} color={messageText.trim() ? Colors.text.inverse : Colors.neutral[400]} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.primary[600],
    ...Shadows.small,
  },
  backButton: {
    padding: Spacing.sm,
    marginRight: Spacing.sm,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerText: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  customerName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.inverse,
    marginBottom: Spacing.xs / 2,
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: Spacing.xs,
    fontWeight: Typography.fontWeight.medium,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  headerButton: {
    padding: Spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  messagesContent: {
    paddingVertical: Spacing.lg,
  },
  typingIndicator: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  typingBubble: {
    backgroundColor: Colors.background.tertiary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: 18,
    alignSelf: 'flex-start',
    maxWidth: '70%',
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.neutral[400],
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  attachButton: {
    padding: Spacing.md,
    marginRight: Spacing.sm,
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border.medium,
    borderRadius: 20,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    maxHeight: 100,
    backgroundColor: Colors.background.tertiary,
    color: Colors.text.primary,
  },
  sendButton: {
    padding: Spacing.md,
    borderRadius: 20,
    marginLeft: Spacing.sm,
  },
  sendButtonActive: {
    backgroundColor: Colors.primary[600],
  },
  sendButtonInactive: {
    backgroundColor: Colors.background.tertiary,
  },
});