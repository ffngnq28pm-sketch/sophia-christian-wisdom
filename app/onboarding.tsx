import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useUserProfile, FOCUS_THEMES, FocusTheme } from '@/context/UserProfileContext';
import { findChristianNameMeaning, ChristianName } from '@/data/christianNames';
import { useTheme, THEMES } from '@/context/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const THEME_CONFIG: Record<FocusTheme, { icon: string; desc: string; color: string }> = {
  Patience:    { icon: '🌊', desc: 'Marcher au pas du temps de Dieu',         color: '#4A7FA5' },
  Gratitude:   { icon: '🌸', desc: 'Recevoir chaque jour comme un don',       color: '#A5664A' },
  Amour:       { icon: '🤝', desc: 'Ouvrir le cœur à la charité évangélique', color: '#B8902D' },
  Foi:         { icon: '✝️', desc: 'Confier ce que je ne maîtrise pas',       color: '#3D5224' },
  Sagesse:     { icon: '⚖️', desc: 'Chercher la vérité avec patience',        color: '#7A5A9A' },
  Paix:        { icon: '🕊️', desc: 'Tenir le silence comme une lampe',         color: '#4A8A7A' },
};

const LAPIS_DEEP = THEMES.dark.bg;
const LAPIS_DEEPER = '#152340';
const GOLD = THEMES.dark.textAccent;
const IVORY = THEMES.dark.textPrimary;
const IVORY_SOFT = THEMES.dark.textSecondary;
const MUTED = THEMES.dark.textMuted;

export default function OnboardingScreen() {
  const { update } = useUserProfile();
  const { setTheme } = useTheme();
  const [step, setStep] = useState<'name' | 'theme'>('name');
  const [name, setName] = useState('');
  const [chosen, setChosen] = useState<FocusTheme | null>(null);
  const [nameMeaning, setNameMeaning] = useState<ChristianName | null>(null);

  const stepAnim = useRef(new Animated.Value(0)).current;
  const introAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTheme('dark');
    Animated.timing(introAnim, {
      toValue: 1,
      duration: 720,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, []);

  function handleNameChange(text: string) {
    setName(text);
    setNameMeaning(findChristianNameMeaning(text));
  }

  function goToStep(next: 'name' | 'theme') {
    Animated.timing(stepAnim, {
      toValue: next === 'theme' ? 1 : 0,
      duration: 360,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start(() => setStep(next));
  }

  function handleNameNext() {
    if (step === 'name') goToStep('theme');
  }

  function handleFinish() {
    if (!chosen) return;
    update({
      firstName: name.trim(),
      focusTheme: chosen,
      focusStartedAt: Date.now(),
      onboardingDone: true,
    });
    router.replace('/(tabs)');
  }

  const stepOpacity = stepAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 1],
  });
  const stepTranslate = stepAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 10, 0],
  });

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: LAPIS_DEEP }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="light" />
      <LinearGradient
        colors={[LAPIS_DEEP, LAPIS_DEEPER, LAPIS_DEEP]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <Animated.View
        style={[
          styles.topOrnament,
          {
            opacity: introAnim,
            transform: [{
              translateY: introAnim.interpolate({ inputRange: [0, 1], outputRange: [-12, 0] }),
            }],
          },
        ]}
      >
        <Text style={[styles.crossLogo, { color: GOLD }]}>🕊</Text>
        <Text style={[styles.logoTitle, { color: GOLD }]}>Olivia</Text>
        <Text style={[styles.logoSub, { color: 'rgba(220,180,80,0.55)' }]}>SAGESSE · PAIX · CRÉATION</Text>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: stepOpacity, transform: [{ translateY: stepTranslate }] }}>
          {step === 'name' ? (
            <View style={styles.stepContent}>
              <Text style={[styles.stepTitle, { color: IVORY }]}>Bienvenue</Text>
              <Text style={[styles.stepSubtitle, { color: MUTED }]}>
                Asseyez-vous un instant.{'\n'}Comment puis-je vous appeler ?
              </Text>

              <View style={[styles.inputWrap, { borderColor: 'rgba(220,180,80,0.30)', backgroundColor: 'rgba(220,180,80,0.06)' }]}>
                <TextInput
                  style={[styles.input, { color: IVORY }]}
                  placeholder="Votre prénom"
                  placeholderTextColor="rgba(220,180,80,0.35)"
                  value={name}
                  onChangeText={handleNameChange}
                  autoFocus
                  returnKeyType="next"
                  onSubmitEditing={handleNameNext}
                  selectionColor={GOLD}
                  accessibilityLabel="Saisir votre prénom"
                />
              </View>

              <TouchableOpacity
                style={[styles.nextBtn, { backgroundColor: GOLD }, !name.trim() && styles.nextBtnDisabled]}
                onPress={handleNameNext}
                disabled={!name.trim()}
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityLabel="Continuer vers le choix du thème"
              >
                <Text style={[styles.nextBtnText, { color: LAPIS_DEEP }]}>Continuer</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => goToStep('theme')}
                style={styles.skipBtn}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Passer cette étape"
              >
                <Text style={[styles.skipText, { color: 'rgba(237,228,208,0.45)' }]}>Plus tard</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.stepContent}>
              <Text style={[styles.stepTitle, { color: IVORY }]}>
                {name.trim() ? `Bonjour ${name.trim()}` : 'Votre intention'}
              </Text>

              {nameMeaning && (
                <View style={[styles.meaningCard, { borderColor: 'rgba(220,180,80,0.30)', backgroundColor: 'rgba(220,180,80,0.06)' }]}>
                  <View style={styles.meaningHeader}>
                    <Text style={[styles.meaningLatin, { color: GOLD }]}>{nameMeaning.latin}</Text>
                    <View style={styles.originBadge}>
                      <Text style={[styles.originBadgeText, { color: GOLD }]}>{nameMeaning.origin}</Text>
                    </View>
                  </View>
                  <Text style={[styles.meaningText, { color: IVORY_SOFT }]}>{nameMeaning.meaning}</Text>
                  {nameMeaning.patron && (
                    <View style={styles.meaningRow}>
                      <Text style={[styles.meaningLabel, { color: GOLD }]}>✝  Patron</Text>
                      <Text style={[styles.meaningValue, { color: IVORY_SOFT }]}>{nameMeaning.patron}</Text>
                    </View>
                  )}
                  {nameMeaning.feast && (
                    <View style={styles.meaningRow}>
                      <Text style={[styles.meaningLabel, { color: GOLD }]}>📅  Fête</Text>
                      <Text style={[styles.meaningValue, { color: IVORY_SOFT }]}>{nameMeaning.feast}</Text>
                    </View>
                  )}
                  {nameMeaning.virtue && (
                    <View style={[styles.virtueBadge, { borderColor: 'rgba(220,180,80,0.45)', backgroundColor: 'rgba(220,180,80,0.14)' }]}>
                      <Text style={[styles.virtueBadgeText, { color: GOLD }]}>{nameMeaning.virtue}</Text>
                    </View>
                  )}
                </View>
              )}

              <Text style={[styles.stepSubtitle, { color: MUTED }]}>
                Choisissez une vertu à cultiver ce mois-ci.{'\n'}
                Vos sagesses du jour s'y accorderont.
              </Text>

              <View style={styles.themesGrid}>
                {FOCUS_THEMES.map((theme) => {
                  const cfg = THEME_CONFIG[theme];
                  const isActive = chosen === theme;
                  return (
                    <TouchableOpacity
                      key={theme}
                      style={[
                        styles.themeCard,
                        { borderColor: 'rgba(237,228,208,0.08)', backgroundColor: 'rgba(237,228,208,0.03)' },
                        isActive && { borderColor: cfg.color, backgroundColor: cfg.color + '20' },
                      ]}
                      onPress={() => setChosen(theme)}
                      activeOpacity={0.8}
                      accessibilityRole="button"
                      accessibilityState={{ selected: isActive }}
                      accessibilityLabel={`Vertu ${theme} : ${cfg.desc}`}
                    >
                      <Text style={styles.themeIcon}>{cfg.icon}</Text>
                      <Text style={[styles.themeName, { color: isActive ? IVORY : MUTED }]}>{theme}</Text>
                      <Text style={[styles.themeDesc, { color: 'rgba(237,228,208,0.42)' }]}>{cfg.desc}</Text>
                      {isActive && <View style={[styles.themeActiveBar, { backgroundColor: cfg.color }]} />}
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TouchableOpacity
                style={[styles.nextBtn, { backgroundColor: GOLD }, !chosen && styles.nextBtnDisabled]}
                onPress={handleFinish}
                disabled={!chosen}
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityLabel="Entrer dans Olivia"
              >
                <Text style={[styles.nextBtnText, { color: LAPIS_DEEP }]}>Entrer en silence</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      <View style={styles.dots}>
        <View style={[styles.dot, { backgroundColor: 'rgba(237,228,208,0.14)' }, step === 'name' && [styles.dotActive, { backgroundColor: GOLD }]]} />
        <View style={[styles.dot, { backgroundColor: 'rgba(237,228,208,0.14)' }, step === 'theme' && [styles.dotActive, { backgroundColor: GOLD }]]} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  topOrnament: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 8,
  },
  crossLogo: {
    fontSize: 48,
    textShadowColor: 'rgba(220,180,80,0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  logoTitle: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 28,
    letterSpacing: 4,
    marginTop: 4,
  },
  logoSub: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    letterSpacing: 4,
    marginTop: 4,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  stepContent: {
    paddingTop: 32,
    alignItems: 'center',
  },
  stepTitle: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 12,
  },
  stepSubtitle: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 36,
  },
  inputWrap: {
    width: '100%',
    marginBottom: 24,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  input: {
    fontFamily: 'Lato_400Regular',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 16,
    textAlign: 'center',
  },
  nextBtn: {
    width: '100%',
    minHeight: 48,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  nextBtnDisabled: {
    opacity: 0.35,
  },
  nextBtnText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  skipBtn: { padding: 12, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  skipText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
  },
  themesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    width: '100%',
    marginBottom: 32,
  },
  themeCard: {
    width: (SCREEN_WIDTH - 60) / 2,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: 'center',
    gap: 6,
    overflow: 'hidden',
    minHeight: 110,
  },
  themeIcon: { fontSize: 26 },
  themeName: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 14,
  },
  themeDesc: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 15,
  },
  themeActiveBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    borderRadius: 0,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 24,
  },
  meaningCard: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 20,
    gap: 8,
  },
  meaningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  meaningLatin: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 13,
    letterSpacing: 0.5,
    flexShrink: 1,
  },
  originBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: 'rgba(220,180,80,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(220,180,80,0.35)',
  },
  originBadgeText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  meaningText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  meaningRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  meaningLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 11,
    minWidth: 70,
    marginTop: 1,
  },
  meaningValue: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    flex: 1,
    lineHeight: 18,
  },
  virtueBadge: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    marginTop: 4,
  },
  virtueBadgeText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
