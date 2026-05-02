import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Vibration,
  Platform,
} from 'react-native';
import { RotateCcw } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useRosary } from '@/hooks/useRosary';

export function RosaryCounter() {
  const { colors } = useTheme();
  const { count, milestone, progress, floatAnim, prayerLabel, milestoneLabel, increment, reset } = useRosary();

  const isMilestone = [10, 50, 150].includes(count);

  const floatY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -28],
  });
  const floatOpacity = floatAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });

  return (
    <View style={styles.wrapper}>
      {/* Prayer label */}
      <Text style={[styles.prayerText, { color: colors.textMuted }]}>
        {prayerLabel}
      </Text>

      {/* Progress + tap button */}
      <View style={styles.tapArea}>
        <View style={[styles.progressTrack, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(progress, 1) * 100}%` as any,
                backgroundColor: isMilestone ? '#C4954A' : colors.textAccent,
              },
            ]}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.tapBtn,
            {
              backgroundColor: isMilestone ? '#C4954A18' : colors.bgSection,
              borderColor: isMilestone ? '#C4954A' : colors.borderAccent,
            },
          ]}
          onPress={() => {
            if (Platform.OS !== 'web') Vibration.vibrate(isMilestone ? [0, 30, 60, 30] : 20);
            increment();
          }}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.countText,
              {
                color: isMilestone ? '#C4954A' : colors.textPrimary,
                fontFamily: isMilestone ? 'Cinzel_700Bold' : 'Lato_700Bold',
              },
            ]}
          >
            {count}
          </Text>
          <Text style={[styles.milestoneText, { color: colors.textMuted }]}>
            /{milestone}
          </Text>
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.floatLabel,
            { transform: [{ translateY: floatY }], opacity: floatOpacity },
          ]}
          pointerEvents="none"
        >
          <Text style={[styles.floatText, { color: colors.textAccent }]}>+1</Text>
        </Animated.View>

        <TouchableOpacity style={styles.resetBtn} onPress={reset} activeOpacity={0.7}>
          <RotateCcw size={14} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      {milestoneLabel ? (
        <Text style={styles.milestoneLabel}>{milestoneLabel}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  prayerText: {
    fontFamily: 'Cinzel_400Regular',
    fontSize: 13,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  tapArea: {
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    gap: 8,
  },
  progressTrack: {
    width: '60%',
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: 3,
    borderRadius: 2,
  },
  tapBtn: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 0,
  },
  countText: {
    fontSize: 32,
    letterSpacing: -1,
  },
  milestoneText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    alignSelf: 'flex-end',
    marginBottom: 6,
    marginLeft: 1,
  },
  floatLabel: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
  },
  floatText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
  },
  resetBtn: {
    padding: 8,
  },
  milestoneLabel: {
    fontFamily: 'Cinzel_400Regular',
    fontSize: 13,
    color: '#C4954A',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
