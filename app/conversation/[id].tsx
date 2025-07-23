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
    switch (channel) {
      case 'sms':
        return <Phone size={18} color="#10b981" />;
      case 'webchat':
        return <MessageSquare size={18} color="#3b82f6" />;
      case 'facebook':
        return <Facebook size={18} color="#1877f2" />;
      case 'email':
        return <Mail size={18} color="#6366f1" />;
      default:
        return <MessageSquare size={18} color="#6b7280" />;
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
            <ArrowLeft size={24} color="#ffffff" />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {customerName?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
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
              <Phone size={20} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Info size={20} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <MoreVertical size={20} color="#ffffff" />
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
            <Paperclip size={20} color="#6b7280" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.messageInput}
            placeholder="Type a message..."
            placeholderTextColor="#9ca3af"
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
            <Send size={20} color={messageText.trim() ? "#ffffff" : "#9ca3af"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1e3a8a',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  headerText: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  messagesContent: {
    paddingVertical: 16,
  },
  typingIndicator: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  typingBubble: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    alignSelf: 'flex-start',
    maxWidth: '70%',
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9ca3af',
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  attachButton: {
    padding: 12,
    marginRight: 8,
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    backgroundColor: '#f9fafb',
  },
  sendButton: {
    padding: 12,
    borderRadius: 20,
    marginLeft: 8,
  },
  sendButtonActive: {
    backgroundColor: '#1e3a8a',
  },
  sendButtonInactive: {
    backgroundColor: '#f3f4f6',
  },
});