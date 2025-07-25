import { Platform } from 'react-native';

export const Typography = {
  // Font families
  fontFamily: {
    regular: Platform.select({
      ios: 'System',
      android: 'Roboto',
      web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      default: 'System',
    }),
    medium: Platform.select({
      ios: 'System',
      android: 'Roboto-Medium',
      web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      default: 'System',
    }),
    bold: Platform.select({
      ios: 'System',
      android: 'Roboto-Bold',
      web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      default: 'System',
    }),
  },
  
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  
  // Font weights
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },
};