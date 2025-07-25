import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export function Badge({
  label,
  variant = 'primary',
  size = 'md',
  style,
  textStyle,
  icon,
}: BadgeProps) {
  const badgeStyles = [
    styles.base,
    styles[variant],
    styles[size],
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    textStyle,
  ];

  return (
    <View style={badgeStyles}>
      {icon && icon}
      <Text style={textStyles}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    gap: Spacing.xs,
  },
  
  // Variants
  primary: {
    backgroundColor: Colors.primary[100],
  },
  secondary: {
    backgroundColor: Colors.neutral[100],
  },
  success: {
    backgroundColor: Colors.success[100],
  },
  warning: {
    backgroundColor: Colors.warning[100],
  },
  error: {
    backgroundColor: Colors.error[100],
  },
  
  // Sizes
  sm: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  md: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  
  // Text styles
  text: {
    fontFamily: Typography.fontFamily.medium,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  primaryText: {
    color: Colors.primary[700],
  },
  secondaryText: {
    color: Colors.neutral[700],
  },
  successText: {
    color: Colors.success[700],
  },
  warningText: {
    color: Colors.warning[700],
  },
  errorText: {
    color: Colors.error[700],
  },
  
  smText: {
    fontSize: Typography.fontSize.xs,
  },
  mdText: {
    fontSize: Typography.fontSize.sm,
  },
});