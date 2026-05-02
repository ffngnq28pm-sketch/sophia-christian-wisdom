import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface Props {
  streak: number;
  bestStreak: number;
  onPress?: () => void;
}

export function StreakBadge({ streak, bestStreak, onPress }: Props) {
  const { colors } = useTheme();
  const accent = '#C4954A';

  if (streak === 0) return null;

  const label = streak >= 30 ? '🔥🔥🔥' : streak >= 7 ? '🔥🔥' : '🔥';

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: 'rgba(196,149,74,0.08)', borderColor: 'rgba(196,149,74,0.2)' }]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={styles.fire}>{label}</Text>
      <View style={styles.textBlock}>
        <Text style={[styles.count, { color: accent }]}>{streak} jour{streak > 1 ? 's' : ''}</Text>
        <Text style={[styles.label, { color: colors.textMuted }]}>consécutifs</Text>
      </View>
      {bestStreak > streak && (
        <Text style={[styles.best, { color: colors.textMuted }]}>record: {bestStreak}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  fire: { fontSize: 18 },
  textBlock: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  count: { fontFamily: 'Cinzel_700Bold', fontSize: 15 },
  label: { fontFamily: 'Lato_400Regular', fontSize: 11 },
  best: { fontFamily: 'Lato_400Regular', fontSize: 10, marginLeft: 4 },
});
