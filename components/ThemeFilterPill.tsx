import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface Props {
  label: string;
  active: boolean;
  onPress: () => void;
}

export function ThemeFilterPill({ label, active, onPress }: Props) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.pill,
        {
          backgroundColor: active ? colors.textAccent + '18' : colors.bgSection,
          borderColor: active ? colors.borderAccent : colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text
        style={[
          styles.label,
          { color: active ? colors.textAccent : colors.textMuted },
          active && { fontFamily: 'Lato_700Bold' },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 6,
  },
  label: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
  },
});
