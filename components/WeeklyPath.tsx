import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { WeeklyPath as WeeklyPathType } from '@/data/weeklyPaths';

interface WeeklyPathProps {
  paths: WeeklyPathType[];
  progress: Record<string, number>;
  isPremium: boolean;
  onAdvance: (id: string) => void;
  onReset: (id: string) => void;
}

export function WeeklyPath({ paths, progress, isPremium, onAdvance, onReset }: WeeklyPathProps) {
  const { colors } = useTheme();

  return (
    <View>
      {paths.map((path) => {
        const dayCompleted = progress[path.id] ?? 0;
        const isLocked = path.premium && !isPremium;
        const isComplete = dayCompleted >= path.durationDays;
        const progressPct = Math.min(dayCompleted / path.durationDays, 1);
        const currentDay = path.days[dayCompleted] ?? null;

        return (
          <View
            key={path.id}
            style={[
              styles.pathCard,
              {
                backgroundColor: colors.bgSection,
                borderColor: isLocked ? colors.border : colors.borderAccent,
                opacity: isLocked ? 0.65 : 1,
              },
            ]}
          >
            {/* Card header */}
            <View style={styles.cardHeader}>
              <Text style={styles.cardEmoji}>{path.emoji}</Text>
              <View style={styles.cardInfo}>
                <View style={styles.titleRow}>
                  <Text
                    style={[styles.cardTitle, { color: colors.textPrimary, fontFamily: 'Cinzel_700Bold' }]}
                    numberOfLines={1}
                  >
                    {path.title}
                  </Text>
                  {path.premium && (
                    <View style={[styles.premiumBadge, { backgroundColor: colors.textAccent + '22', borderColor: colors.borderAccent }]}>
                      <Text style={[styles.premiumBadgeTxt, { color: colors.textAccent }]}>
                        {isLocked ? '★ Premium' : '★'}
                      </Text>
                    </View>
                  )}
                </View>
                <Text
                  style={[styles.cardSubtitle, { color: colors.textMuted, fontFamily: 'Lato_400Regular' }]}
                  numberOfLines={2}
                >
                  {path.subtitle}
                </Text>
              </View>
            </View>

            {/* Progress bar */}
            <View style={styles.progressRow}>
              <View style={[styles.progressTrack, { backgroundColor: colors.border }]}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      backgroundColor: colors.textAccent,
                      width: `${progressPct * 100}%` as any,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.progressLabel, { color: colors.textMuted, fontFamily: 'Lato_400Regular' }]}>
                Jour {dayCompleted}/{path.durationDays}
              </Text>
            </View>

            {/* Today's practice when active */}
            {!isLocked && !isComplete && dayCompleted > 0 && currentDay && (
              <View style={[styles.todayPractice, { backgroundColor: colors.bgInput, borderColor: colors.border }]}>
                <Text style={[styles.todayTitle, { color: colors.textAccent, fontFamily: 'Lato_700Bold' }]}>
                  Aujourd'hui — {currentDay.title}
                </Text>
                <Text style={[styles.todayText, { color: colors.textSecondary, fontFamily: 'Lato_400Regular' }]}>
                  {currentDay.practice}
                </Text>
                {currentDay.scripture ? (
                  <Text style={[styles.todayScripture, { color: colors.textMuted, fontFamily: 'Lato_400Regular' }]}>
                    {currentDay.scripture}
                  </Text>
                ) : null}
              </View>
            )}

            {/* Action button */}
            {isLocked ? (
              <View style={[styles.lockedBtn, { borderColor: colors.border }]}>
                <Text style={[styles.lockedBtnTxt, { color: colors.textMuted, fontFamily: 'Lato_400Regular' }]}>
                  Débloquez Premium pour accéder à ce parcours
                </Text>
              </View>
            ) : isComplete ? (
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: colors.bgSection, borderColor: colors.borderAccent, borderWidth: 1 }]}
                onPress={() => onReset(path.id)}
                activeOpacity={0.8}
              >
                <Text style={[styles.actionBtnTxt, { color: colors.textAccent, fontFamily: 'Lato_700Bold' }]}>
                  Recommencer
                </Text>
              </TouchableOpacity>
            ) : dayCompleted === 0 ? (
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: colors.textAccent }]}
                onPress={() => onAdvance(path.id)}
                activeOpacity={0.8}
              >
                <Text style={[styles.actionBtnTxt, { color: '#FFFFFF', fontFamily: 'Lato_700Bold' }]}>
                  Commencer
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: colors.textAccent }]}
                onPress={() => onAdvance(path.id)}
                activeOpacity={0.8}
              >
                <Text style={[styles.actionBtnTxt, { color: '#FFFFFF', fontFamily: 'Lato_700Bold' }]}>
                  Continuer (jour {dayCompleted + 1})
                </Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  pathCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  cardEmoji: { fontSize: 32, lineHeight: 38 },
  cardInfo: { flex: 1 },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  cardTitle: { fontSize: 14, letterSpacing: 0.3, flexShrink: 1 },
  premiumBadge: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  premiumBadgeTxt: { fontSize: 10, letterSpacing: 0.5 },
  cardSubtitle: { fontSize: 13, lineHeight: 19 },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: { height: 4, borderRadius: 2 },
  progressLabel: { fontSize: 11, minWidth: 60, textAlign: 'right' },
  todayPractice: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
  },
  todayTitle: { fontSize: 12, letterSpacing: 0.3, marginBottom: 6 },
  todayText: { fontSize: 13, lineHeight: 19, marginBottom: 4 },
  todayScripture: { fontSize: 11, fontStyle: 'italic' },
  actionBtn: {
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  actionBtnTxt: { fontSize: 14, letterSpacing: 0.3 },
  lockedBtn: {
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  lockedBtnTxt: { fontSize: 13, textAlign: 'center' },
});
