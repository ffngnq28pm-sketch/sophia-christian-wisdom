import React, { useState } from 'react';
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
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useUserProfile, FOCUS_THEMES, FocusTheme } from '@/context/UserProfileContext';
import { findChristianNameMeaning, ChristianName } from '@/data/christianNames';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const THEME_CONFIG: Record<FocusTheme, { icon: string; desc: string; color: string }> = {
  Patience:    { icon: '🕊️', desc: 'Développer la persévérance et la sérénité', color: '#4A7FA5' },
  Gratitude:   { icon: '🌸', desc: 'Cultiver la reconnaissance chaque jour',    color: '#A5664A' },
  Amour:       { icon: '✦',  desc: 'Ouvrir le cœur à la charité évangélique',  color: '#C4954A' },
  Foi:         { icon: '✝️', desc: 'Renforcer la confiance en Dieu',            color: '#5A7A5A' },
  Sagesse:     { icon: '◈',  desc: 'Chercher la connaissance et la vérité',     color: '#7A5A9A' },
  Paix:        { icon: '◯',  desc: 'Trouver la tranquillité intérieure',        color: '#4A8A7A' },
};

export default function OnboardingScreen() {
  const { update } = useUserProfile();
  const [step, setStep] = useState<'name' | 'theme'>('name');
  const [name, setName] = useState('');
  const [chosen, setChosen] = useState<FocusTheme | null>(null);
  const [nameMeaning, setNameMeaning] = useState<ChristianName | null>(null);

  function handleNameChange(text: string) {
    setName(text);
    setNameMeaning(findChristianNameMeaning(text));
  }

  function handleNameNext() {
    if (step === 'name') {
      setStep('theme');
    }
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

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="light" />
      <LinearGradient
        colors={['#0F0B18', '#1A1030', '#0F0B18']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.topOrnament}>
        <Text style={styles.crossLogo}>✝</Text>
        <Text style={styles.logoTitle}>Sophia</Text>
        <Text style={styles.logoSub}>ΣΟΦΙΑ · SAGESSE</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {step === 'name' ? (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Bienvenue</Text>
            <Text style={styles.stepSubtitle}>
              Commençons votre chemin de sagesse.{'\n'}Comment puis-je vous appeler ?
            </Text>

            <View style={styles.inputWrap}>
              <TextInput
                style={styles.input}
                placeholder="Votre prénom..."
                placeholderTextColor="rgba(196,149,74,0.35)"
                value={name}
                onChangeText={handleNameChange}
                autoFocus
                returnKeyType="next"
                onSubmitEditing={handleNameNext}
                selectionColor="#C4954A"
              />
            </View>

            {nameMeaning && (
              <View style={styles.meaningCard}>
                <View style={styles.meaningHeader}>
                  <Text style={styles.meaningLatin}>{nameMeaning.latin}</Text>
                  <View style={styles.originBadge}>
                    <Text style={styles.originBadgeText}>{nameMeaning.origin}</Text>
                  </View>
                </View>
                <Text style={styles.meaningText}>{nameMeaning.meaning}</Text>
                {nameMeaning.patron && (
                  <View style={styles.meaningRow}>
                    <Text style={styles.meaningLabel}>✝ Patron</Text>
                    <Text style={styles.meaningValue}>{nameMeaning.patron}</Text>
                  </View>
                )}
                {nameMeaning.feast && (
                  <View style={styles.meaningRow}>
                    <Text style={styles.meaningLabel}>📅 Fête</Text>
                    <Text style={styles.meaningValue}>{nameMeaning.feast}</Text>
                  </View>
                )}
                {nameMeaning.virtue && (
                  <View style={styles.virtueBadge}>
                    <Text style={styles.virtueBadgeText}>{nameMeaning.virtue}</Text>
                  </View>
                )}
              </View>
            )}

            <TouchableOpacity
              style={[styles.nextBtn, !name.trim() && styles.nextBtnDisabled]}
              onPress={handleNameNext}
              disabled={!name.trim()}
              activeOpacity={0.85}
            >
              <Text style={styles.nextBtnText}>Continuer</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setStep('theme')} style={styles.skipBtn} activeOpacity={0.7}>
              <Text style={styles.skipText}>Passer</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>
              {name.trim() ? `Bonjour ${name.trim()}` : 'Votre intention'}
            </Text>
            <Text style={styles.stepSubtitle}>
              Choisissez un thème sur lequel vous concentrer ce mois-ci.{'\n'}
              Vos sagesses quotidiennes y seront adaptées.
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
                      isActive && { borderColor: cfg.color, backgroundColor: cfg.color + '18' },
                    ]}
                    onPress={() => setChosen(theme)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.themeIcon}>{cfg.icon}</Text>
                    <Text style={[styles.themeName, isActive && { color: '#F2EAD8' }]}>{theme}</Text>
                    <Text style={styles.themeDesc}>{cfg.desc}</Text>
                    {isActive && <View style={[styles.themeActiveBar, { backgroundColor: cfg.color }]} />}
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={[styles.nextBtn, !chosen && styles.nextBtnDisabled]}
              onPress={handleFinish}
              disabled={!chosen}
              activeOpacity={0.85}
            >
              <Text style={styles.nextBtnText}>Commencer mon chemin</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <View style={styles.dots}>
        <View style={[styles.dot, step === 'name' && styles.dotActive]} />
        <View style={[styles.dot, step === 'theme' && styles.dotActive]} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0F0B18' },
  topOrnament: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 8,
  },
  crossLogo: {
    fontSize: 48,
    color: '#C4954A',
    textShadowColor: 'rgba(196,149,74,0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  logoTitle: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 28,
    color: '#C4954A',
    letterSpacing: 4,
    marginTop: 4,
  },
  logoSub: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    color: 'rgba(196,149,74,0.5)',
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
    color: '#F2EAD8',
    textAlign: 'center',
    marginBottom: 12,
  },
  stepSubtitle: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    color: '#8A8FA8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 36,
  },
  inputWrap: {
    width: '100%',
    marginBottom: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(196,149,74,0.3)',
    backgroundColor: 'rgba(196,149,74,0.06)',
    overflow: 'hidden',
  },
  input: {
    fontFamily: 'Lato_400Regular',
    fontSize: 18,
    color: '#F2EAD8',
    paddingHorizontal: 20,
    paddingVertical: 16,
    textAlign: 'center',
  },
  nextBtn: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#C4954A',
    alignItems: 'center',
    marginBottom: 16,
  },
  nextBtnDisabled: {
    backgroundColor: 'rgba(196,149,74,0.25)',
  },
  nextBtnText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    color: '#0F0B18',
  },
  skipBtn: { padding: 12 },
  skipText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    color: '#4A5068',
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
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    alignItems: 'center',
    gap: 6,
    overflow: 'hidden',
  },
  themeIcon: { fontSize: 26 },
  themeName: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 14,
    color: '#8A8FA8',
  },
  themeDesc: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
    color: '#4A5068',
    textAlign: 'center',
    lineHeight: 14,
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
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  dotActive: {
    width: 24,
    backgroundColor: '#C4954A',
  },
  meaningCard: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(74,127,165,0.35)',
    backgroundColor: 'rgba(74,127,165,0.08)',
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
    color: '#4A7FA5',
    letterSpacing: 0.5,
    flexShrink: 1,
  },
  originBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: 'rgba(200,169,110,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(200,169,110,0.4)',
  },
  originBadgeText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 10,
    color: '#C8A96E',
    letterSpacing: 0.5,
  },
  meaningText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    color: '#B0B8CC',
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
    color: '#4A7FA5',
    minWidth: 60,
    marginTop: 1,
  },
  meaningValue: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    color: '#8A8FA8',
    flex: 1,
    lineHeight: 18,
  },
  virtueBadge: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(74,127,165,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(74,127,165,0.5)',
    marginTop: 4,
  },
  virtueBadgeText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 11,
    color: '#4A7FA5',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
