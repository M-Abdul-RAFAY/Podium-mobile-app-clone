import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewStyle;
  backgroundColor?: string;
  textColor?: string;
}

export function Avatar({
  name,
  size = 'md',
  style,
  backgroundColor = Colors.primary[100],
  textColor = Colors.primary[700],
}: AvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarStyles = [
    styles.base,
    styles[size],
    { backgroundColor },
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${size}Text`],
    { color: textColor },
  ];

  return (
    <View style={avatarStyles}>
      <Text style={textStyles}>{getInitials(name)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  sm: {
    width: 32,
    height: 32,
  },
  md: {
    width: 40,
    height: 40,
  },
  lg: {
    width: 48,
    height: 48,
  },
  xl: {
    width: 56,
    height: 56,
  },
  
  text: {
    fontFamily: Typography.fontFamily.medium,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  smText: {
    fontSize: Typography.fontSize.xs,
  },
  mdText: {
    fontSize: Typography.fontSize.sm,
  },
  lgText: {
    fontSize: Typography.fontSize.base,
  },
  xlText: {
    fontSize: Typography.fontSize.lg,
  },
});