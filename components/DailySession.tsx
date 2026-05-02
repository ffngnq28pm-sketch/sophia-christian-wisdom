import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { DailySessionData, SessionStep } from '@/data/sessions';

interface DailySessionProps {
  session: DailySessionData;
  visible: boolean;
  onComplete: () => void;
  onClose: () => void;
  onJournalEntry?: (question: string, answer: string) => void;
}

const STEP_ICONS: Record<SessionStep['type'], string> = {
  intro: '✝️',
  reading: '📖',
  practice: '🙏',
  reflection: '💭',
  closing: '✨',
};

const STEP_LABELS: Record<SessionStep['type'], string> = {
  intro: 'Introduction',
  reading: 'Lecture',
  practice: 'Pratique',
  reflection: 'Réflexion',
  closing: 'Clôture',
};

export function DailySession({
  session,
  visible,
  onComplete,
  onClose,
  onJournalEntry,
}: DailySessionProps) {
  const { colors } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [journalAnswer, setJournalAnswer] = useState('');
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const step = session.steps[currentStep];
  const totalSteps = session.steps.length;
  const duration = step?.durationSec ?? 30;

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsed((prev) => {
        if (prev >= duration - 1) {
          clearInterval(timerRef.current!);
          return duration;
        }
        return prev + 1;
      });
    }, 1000);
  }, [duration]);

  useEffect(() => {
    if (visible && !completed) {
      setElapsed(0);
      startTimer();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [visible, currentStep, completed]);

  const handleNext = () => {
    if (step.type === 'reflection' && journalAnswer.trim() && onJournalEntry) {
      onJournalEntry(step.text, journalAnswer.trim());
    }
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      setElapsed(0);
      setJournalAnswer('');
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setCompleted(true);
      onComplete();
    }
  };

  const handleClose = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentStep(0);
    setElapsed(0);
    setJournalAnswer('');
    setCompleted(false);
    onClose();
  };

  const progressPct = Math.min(elapsed / duration, 1);
  const timeLeft = Math.max(duration - elapsed, 0);
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');

  const stepBtnLabel = () => {
    if (currentStep === 0) return 'Commencer';
    if (currentStep < totalSteps - 1) return 'Suivant';
    return 'Terminer';
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
      <SafeAreaView style={[styles.root, { backgroundColor: colors.bg }]}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={handleClose} style={styles.closeBtn} activeOpacity={0.7}>
            <Text style={[styles.closeTxt, { color: colors.textMuted }]}>✕</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={[styles.sessionTitle, { color: colors.textPrimary, fontFamily: 'Cinzel_700Bold' }]}>
              {session.title}
            </Text>
          </View>
          <View style={styles.closeBtn} />
        </View>

        {completed ? (
          /* Completion screen */
          <ScrollView contentContainerStyle={styles.completedContainer}>
            <Text style={styles.completedEmoji}>✓</Text>
            <Text style={[styles.completedTitle, { color: colors.textPrimary, fontFamily: 'Cinzel_700Bold' }]}>
              Session complétée
            </Text>
            <Text style={[styles.completedMsg, { color: colors.textSecondary, fontFamily: 'Lato_400Regular' }]}>
              Que la grâce de cette prière porte des fruits durables dans votre cœur et dans votre vie.
            </Text>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: colors.textAccent }]}
              onPress={handleClose}
              activeOpacity={0.8}
            >
              <Text style={[styles.actionBtnTxt, { fontFamily: 'Lato_700Bold' }]}>Fermer</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <>
            {/* Progress steps */}
            <View style={styles.stepsRow}>
              {session.steps.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.stepDot,
                    {
                      backgroundColor:
                        i < currentStep
                          ? colors.textAccent
                          : i === currentStep
                          ? colors.textAccent
                          : colors.border,
                      opacity: i === currentStep ? 1 : i < currentStep ? 0.7 : 0.3,
                    },
                    i === currentStep && styles.stepDotActive,
                  ]}
                />
              ))}
            </View>

            <ScrollView
              style={styles.scrollArea}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Step icon and label */}
              <View style={styles.stepHeader}>
                <Text style={styles.stepIcon}>{STEP_ICONS[step.type]}</Text>
                <Text style={[styles.stepLabel, { color: colors.textAccent, fontFamily: 'Lato_700Bold' }]}>
                  {STEP_LABELS[step.type]}
                </Text>
                <Text style={[styles.stepCount, { color: colors.textMuted, fontFamily: 'Lato_400Regular' }]}>
                  Étape {currentStep + 1} / {totalSteps}
                </Text>
              </View>

              {/* Timer bar */}
              <View style={[styles.timerTrack, { backgroundColor: colors.border }]}>
                <View
                  style={[
                    styles.timerFill,
                    { backgroundColor: colors.textAccent, width: `${progressPct * 100}%` as any },
                  ]}
                />
              </View>
              <Text style={[styles.timerText, { color: colors.textMuted, fontFamily: 'Lato_400Regular' }]}>
                {mm}:{ss}
              </Text>

              {/* Step text */}
              <Text style={[styles.stepText, { color: colors.textPrimary, fontFamily: 'Lato_400Regular' }]}>
                {step.text}
              </Text>

              {/* Instruction */}
              {step.instruction ? (
                <View style={[styles.instructionBox, { backgroundColor: colors.bgSection, borderColor: colors.borderAccent }]}>
                  <Text style={[styles.instructionTxt, { color: colors.textAccent, fontFamily: 'Lato_400Regular' }]}>
                    {step.instruction}
                  </Text>
                </View>
              ) : null}

              {/* Journal input on reflection step */}
              {step.type === 'reflection' && (
                <View style={styles.journalArea}>
                  <Text style={[styles.journalLabel, { color: colors.textSecondary, fontFamily: 'Lato_700Bold' }]}>
                    Ma réflexion (optionnel)
                  </Text>
                  <TextInput
                    style={[
                      styles.journalInput,
                      {
                        backgroundColor: colors.bgInput,
                        borderColor: colors.border,
                        color: colors.textPrimary,
                        fontFamily: 'Lato_400Regular',
                      },
                    ]}
                    multiline
                    numberOfLines={4}
                    placeholder="Notez ce qui monte dans votre cœur..."
                    placeholderTextColor={colors.textMuted}
                    value={journalAnswer}
                    onChangeText={setJournalAnswer}
                  />
                </View>
              )}
            </ScrollView>

            {/* Action button */}
            <View style={styles.actionArea}>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: colors.textAccent }]}
                onPress={handleNext}
                activeOpacity={0.8}
              >
                <Text style={[styles.actionBtnTxt, { fontFamily: 'Lato_700Bold' }]}>
                  {stepBtnLabel()}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  closeBtn: { width: 40 },
  closeTxt: { fontSize: 18, textAlign: 'center' },
  headerCenter: { flex: 1, alignItems: 'center' },
  sessionTitle: { fontSize: 15, letterSpacing: 0.5 },
  stepsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stepDotActive: { width: 24, borderRadius: 4 },
  scrollArea: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 24 },
  stepHeader: { alignItems: 'center', marginBottom: 20 },
  stepIcon: { fontSize: 40, marginBottom: 8 },
  stepLabel: { fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 },
  stepCount: { fontSize: 12 },
  timerTrack: {
    height: 4,
    borderRadius: 2,
    marginBottom: 8,
    overflow: 'hidden',
  },
  timerFill: { height: 4, borderRadius: 2 },
  timerText: { fontSize: 12, textAlign: 'right', marginBottom: 24 },
  stepText: { fontSize: 16, lineHeight: 26, marginBottom: 16 },
  instructionBox: {
    borderLeftWidth: 3,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 16,
  },
  instructionTxt: { fontSize: 13, lineHeight: 20, fontStyle: 'italic' },
  journalArea: { marginTop: 8 },
  journalLabel: { fontSize: 13, marginBottom: 8, letterSpacing: 0.3 },
  journalInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    lineHeight: 22,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  actionArea: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 12,
  },
  actionBtn: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  actionBtnTxt: { fontSize: 16, color: '#FFFFFF', letterSpacing: 0.5 },
  completedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  completedEmoji: { fontSize: 60, marginBottom: 20 },
  completedTitle: { fontSize: 22, letterSpacing: 0.5, marginBottom: 16, textAlign: 'center' },
  completedMsg: {
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 40,
  },
});
