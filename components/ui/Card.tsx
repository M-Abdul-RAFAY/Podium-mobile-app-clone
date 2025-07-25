import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { Shadows } from '@/constants/Shadows';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'small' | 'medium' | 'large';
}

export function Card({
  children,
  style,
  padding = 'md',
  shadow = 'medium',
}: CardProps) {
  const cardStyles = [
    styles.base,
    padding !== 'none' && styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
    shadow !== 'none' && Shadows[shadow],
    style,
  ];

  return <View style={cardStyles}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.background.primary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  
  paddingSm: {
    padding: Spacing.md,
  },
  paddingMd: {
    padding: Spacing.xl,
  },
  paddingLg: {
    padding: Spacing['2xl'],
  },
});