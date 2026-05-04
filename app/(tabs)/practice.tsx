import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { usePremium } from '@/hooks/usePremium';
import { usePractice } from '@/hooks/usePractice';
import { DailySession } from '@/components/DailySession';
import { SpiritualJournal } from '@/components/SpiritualJournal';
import { WeeklyPath } from '@/components/WeeklyPath';
import { DAILY_SESSIONS } from '@/data/sessions';
import { WEEKLY_PATHS } from '@/data/weeklyPaths';

// Pick daily session based on day of year
function getDailySession() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return DAILY_SESSIONS[dayOfYear % DAILY_SESSIONS.length];
}

export default function PracticeScreen() {
  const { colors } = useTheme();
  const { isPremium } = usePremium();
  const {
    sessionCompletedToday,
    completeSession,
    entries,
    addEntry,
    deleteEntry,
    pathProgress,
    advancePath,
    resetPath,
  } = usePractice();

  const [sessionVisible, setSessionVisible] = useState(false);
  const dailySession = getDailySession();

  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const handleSessionComplete = () => {
    completeSession();
    setSessionVisible(false);
  };

  const handleJournalEntry = (question: string, answer: string) => {
    addEntry({
      date: new Date().toISOString().slice(0, 10),
      sessionId: dailySession.id,
      question,
      answer,
    });
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <StatusBar style={colors.statusBar} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.screenTitle, { color: colors.textPrimary, fontFamily: 'Cinzel_700Bold' }]}>
              Ma Pratique
            </Text>
            <Text style={[styles.dateText, { color: colors.textMuted, fontFamily: 'Lato_400Regular' }]}>
              {today}
            </Text>
          </View>

          {/* Session du Jour */}
          <View style={[styles.card, { backgroundColor: colors.bgSection, borderColor: colors.borderAccent }]}>
            <View style={styles.cardTitleRow}>
              <Text style={[styles.cardTitle, { color: colors.textPrimary, fontFamily: 'Cinzel_700Bold' }]}>
                Session du Jour
              </Text>
            </View>

            <View style={styles.sessionMeta}>
              <View style={[styles.badge, { backgroundColor: colors.textAccent + '22', borderColor: colors.borderAccent }]}>
                <Text style={[styles.badgeTxt, { color: colors.textAccent, fontFamily: 'Lato_700Bold' }]}>
                  {dailySession.durationMin} min
                </Text>
              </View>
              <View style={[styles.badge, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
                <Text style={[styles.badgeTxt, { color: colors.textSecondary, fontFamily: 'Lato_400Regular' }]}>
                  {dailySession.theme}
                </Text>
              </View>
            </View>

            <Text style={[styles.sessionTitle, { color: colors.textPrimary, fontFamily: 'Cinzel_700Bold' }]}>
              {dailySession.title}
            </Text>
            <Text style={[styles.sessionSubtitle, { color: colors.textSecondary, fontFamily: 'Lato_400Regular' }]}>
              {dailySession.subtitle}
            </Text>

            {sessionCompletedToday ? (
              <View style={[styles.completedBadge, { backgroundColor: '#2D6A4F22', borderColor: '#2D6A4F55' }]}>
                <Text style={[styles.completedBadgeTxt, { color: '#52B788', fontFamily: 'Lato_700Bold' }]}>
                  ✓ Complété aujourd'hui
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.startBtn, { backgroundColor: colors.textAccent }]}
                onPress={() => setSessionVisible(true)}
                activeOpacity={0.8}
              >
                <Text style={[styles.startBtnTxt, { fontFamily: 'Lato_700Bold' }]}>
                  Commencer (5 min)
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Section Journal */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontFamily: 'Cinzel_700Bold' }]}>
              Mon Journal
            </Text>
            <SpiritualJournal
              entries={entries}
              onAdd={addEntry}
              onDelete={deleteEntry}
            />
          </View>

          {/* Section Parcours */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontFamily: 'Cinzel_700Bold' }]}>
              Mes Parcours
            </Text>
            <WeeklyPath
              paths={WEEKLY_PATHS}
              progress={pathProgress}
              isPremium={isPremium}
              onAdvance={advancePath}
              onReset={resetPath}
            />
          </View>

          {/* Ressources spirituelles */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary, fontFamily: 'Cinzel_400Regular' }]}>
              RESSOURCES
            </Text>
            <TouchableOpacity
              style={[styles.resourceRow, { backgroundColor: colors.bgCard, borderColor: colors.border }]}
              onPress={() => router.push('/psalms' as any)}
              activeOpacity={0.8}
            >
              <Text style={styles.resourceIcon}>📜</Text>
              <View style={styles.resourceInfo}>
                <Text style={[styles.resourceTitle, { color: colors.textPrimary }]}>Psaumes & Prières</Text>
                <Text style={[styles.resourceSub, { color: colors.textMuted }]}>150 Psaumes, Notre Père, Ave Maria…</Text>
              </View>
              <ChevronRight size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>

      <DailySession
        session={dailySession}
        visible={sessionVisible}
        onComplete={handleSessionComplete}
        onClose={() => setSessionVisible(false)}
        onJournalEntry={handleJournalEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safeArea: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  header: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
  },
  screenTitle: {
    fontSize: 22,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 13,
    textTransform: 'capitalize',
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
  },
  cardTitleRow: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  sessionMeta: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  badge: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeTxt: { fontSize: 12, letterSpacing: 0.3 },
  sessionTitle: { fontSize: 17, letterSpacing: 0.3, marginBottom: 6 },
  sessionSubtitle: { fontSize: 14, lineHeight: 21, marginBottom: 16 },
  completedBadge: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  completedBadgeTxt: { fontSize: 14, letterSpacing: 0.3 },
  startBtn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  startBtnTxt: {
    fontSize: 15,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    letterSpacing: 0.5,
    marginBottom: 14,
  },
  resourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 10,
    gap: 14,
  },
  resourceIcon: { fontSize: 28, width: 36 },
  resourceInfo: { flex: 1 },
  resourceTitle: { fontFamily: 'Lato_700Bold', fontSize: 15, marginBottom: 2 },
  resourceSub: { fontFamily: 'Lato_400Regular', fontSize: 12 },
});
