import React, { useState } from 'react';
import {
  View, Text, SafeAreaView, TouchableOpacity,
  StyleSheet, ScrollView, ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Heart, Star, Sparkles } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { usePremium } from '@/hooks/usePremium';
import { WallpaperExportButton } from '@/components/WallpaperExportButton';

const TIPS = [
  { size: 'small' as const,  emoji: '☕', label: 'Café spirituel',       price: '3,00€',  desc: 'Un geste symbolique' },
  { size: 'medium' as const, emoji: '📖', label: 'Semaine d\'enseignements', price: '10,00€', desc: 'Votre générosité compte' },
  { size: 'large' as const,  emoji: '🙏', label: 'Mois de développement', price: '25,00€', desc: 'Que Dieu vous bénisse' },
];

const MISSION_POINTS = [
  { emoji: '✨', text: 'Préserver et transmettre la sagesse millénaire des saints et des Pères de l\'Église' },
  { emoji: '📱', text: 'Rendre accessible l\'authenticité spirituelle face aux distractions modernes' },
  { emoji: '🌍', text: 'Promouvoir les vraies valeurs dans un univers digital souvent superficiel' },
  { emoji: '📚', text: 'Continuer d\'enrichir le contenu avec de nouveaux saints, mystiques et enseignements' },
];

export default function SupportScreen() {
  const { colors } = useTheme();
  const { purchaseTip, isLoading } = usePremium();
  const [donated, setDonated] = useState<string | null>(null);
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const accent = '#C4954A';

  async function handleTip(size: 'small' | 'medium' | 'large', price: string) {
    setActiveSize(size);
    const result = await purchaseTip(size);
    if (result.success) setDonated(price);
    setActiveSize(null);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style={colors.statusBar} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <ChevronLeft size={22} color={colors.textMuted} />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.iconBadge, { backgroundColor: 'rgba(196,149,74,0.1)' }]}>
              <Heart size={30} color={accent} fill="rgba(196,149,74,0.25)" />
            </View>
            <Text style={[styles.title, { color: colors.textPrimary }]}>💝 Soutenir la Mission</Text>
            <Text style={[styles.subtitle, { color: colors.textMuted }]}>
              Dans un monde qui relègue de plus en plus la spiritualité et les valeurs morales au second plan,
              votre soutien nous aide à :
            </Text>
          </View>

          {/* Mission points */}
          <View style={[styles.missionBox, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
            {MISSION_POINTS.map((pt, i) => (
              <View key={i} style={styles.missionRow}>
                <Text style={styles.missionEmoji}>{pt.emoji}</Text>
                <Text style={[styles.missionText, { color: colors.textSecondary }]}>{pt.text}</Text>
              </View>
            ))}
            <Text style={[styles.missionClosing, { color: colors.textMuted }]}>
              Chaque contribution, même modeste, nous permet de maintenir ces oasis de paix et de profondeur dans l'App Store.
            </Text>
          </View>

          {/* Verse */}
          <View style={[styles.verseBox, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
            <Text style={[styles.verseLatino, { color: accent }]}>Date et dabitur vobis.</Text>
            <Text style={[styles.verseFr, { color: colors.textMuted }]}>Donnez, et il vous sera donné. — Luc 6:38</Text>
          </View>

          {/* Success */}
          {donated && (
            <View style={[styles.successBox, { backgroundColor: 'rgba(196,149,74,0.08)', borderColor: 'rgba(196,149,74,0.3)' }]}>
              <Sparkles size={16} color={accent} />
              <Text style={[styles.successText, { color: accent }]}>
                Que Dieu vous bénisse — Merci pour votre don de {donated}
              </Text>
            </View>
          )}

          {/* Tiers */}
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>CHOISIR UNE OFFRANDE</Text>
          <View style={styles.tipGrid}>
            {TIPS.map((tip) => {
              const active = activeSize === tip.size;
              return (
                <TouchableOpacity
                  key={tip.size}
                  style={[
                    styles.tipCard,
                    { backgroundColor: colors.bgSection, borderColor: active ? accent : colors.border },
                    active && { backgroundColor: 'rgba(196,149,74,0.07)' },
                  ]}
                  onPress={() => handleTip(tip.size, tip.price)}
                  disabled={isLoading}
                  activeOpacity={0.8}
                >
                  <Text style={styles.tipEmoji}>{tip.emoji}</Text>
                  <Text style={[styles.tipPrice, { color: accent }]}>{tip.price}</Text>
                  <Text style={[styles.tipLabel, { color: colors.textSecondary }]}>{tip.label}</Text>
                  <Text style={[styles.tipDesc, { color: colors.textMuted }]}>{tip.desc}</Text>
                  {active && <ActivityIndicator color={accent} size="small" style={{ marginTop: 8 }} />}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Custom amount placeholder */}
          <TouchableOpacity
            style={[styles.customBtn, { borderColor: colors.border, backgroundColor: colors.bgSection }]}
            activeOpacity={0.75}
          >
            <Star size={16} color={accent} fill="rgba(196,149,74,0.2)" />
            <Text style={[styles.customText, { color: colors.textSecondary }]}>Montant de votre choix</Text>
          </TouchableOpacity>

          {/* Wallpaper */}
          <Text style={[styles.sectionLabel, { color: colors.textMuted, marginTop: 20 }]}>FOND D'ÉCRAN SPIRITUEL</Text>
          <WallpaperExportButton format="wallpaper" />
          <WallpaperExportButton format="story" />

          {/* Info */}
          <View style={[styles.msgBox, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
            <Star size={16} color={accent} fill="rgba(196,149,74,0.2)" />
            <Text style={[styles.msgText, { color: colors.textMuted }]}>
              Vos contributions nous permettent de{' '}
              <Text style={{ color: colors.textSecondary, fontFamily: 'Lato_700Bold' }}>
                créer du contenu de qualité
              </Text>
              {' '}et d'enrichir la bibliothèque de sagesses.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerCross, { color: 'rgba(196,149,74,0.25)' }]}>✝</Text>
            <Text style={[styles.footerText, { color: colors.textMuted }]}>
              Que ce projet soit une œuvre de charité permanente
            </Text>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 60, paddingTop: 8 },
  backBtn: { marginLeft: 14, marginBottom: 4, width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  header: { alignItems: 'center', paddingHorizontal: 24, paddingBottom: 20 },
  iconBadge: { width: 68, height: 68, borderRadius: 34, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title: { fontFamily: 'Cinzel_700Bold', fontSize: 24, marginBottom: 12, textAlign: 'center' },
  subtitle: { fontFamily: 'Lato_400Regular', fontSize: 14, lineHeight: 22, textAlign: 'center' },
  missionBox: { marginHorizontal: 20, borderRadius: 16, borderWidth: 1, padding: 18, marginBottom: 16, gap: 14 },
  missionRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  missionEmoji: { fontSize: 18, lineHeight: 22 },
  missionText: { flex: 1, fontFamily: 'Lato_400Regular', fontSize: 13, lineHeight: 20 },
  missionClosing: { fontFamily: 'Lato_400Regular', fontStyle: 'italic', fontSize: 12, lineHeight: 20, marginTop: 4 },
  verseBox: { marginHorizontal: 20, borderWidth: 1, borderRadius: 14, padding: 16, alignItems: 'center', gap: 6, marginBottom: 16 },
  verseLatino: { fontFamily: 'Cinzel_400Regular', fontSize: 15, textAlign: 'center', fontStyle: 'italic' },
  verseFr: { fontFamily: 'Lato_400Regular', fontStyle: 'italic', fontSize: 12, textAlign: 'center', lineHeight: 18 },
  successBox: { flexDirection: 'row', alignItems: 'center', gap: 10, marginHorizontal: 20, marginBottom: 16, padding: 14, borderRadius: 14, borderWidth: 1 },
  successText: { fontFamily: 'Lato_700Bold', fontSize: 13, flex: 1 },
  sectionLabel: { fontFamily: 'Lato_400Regular', fontSize: 10, letterSpacing: 2, paddingHorizontal: 24, marginBottom: 12 },
  tipGrid: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginBottom: 12 },
  tipCard: { flex: 1, borderRadius: 16, borderWidth: 1, padding: 14, alignItems: 'center' },
  tipEmoji: { fontSize: 26, marginBottom: 8 },
  tipPrice: { fontFamily: 'Cinzel_700Bold', fontSize: 18, marginBottom: 4 },
  tipLabel: { fontFamily: 'Lato_700Bold', fontSize: 11, textAlign: 'center', marginBottom: 4 },
  tipDesc: { fontFamily: 'Lato_400Regular', fontSize: 10, textAlign: 'center', lineHeight: 14 },
  customBtn: { flexDirection: 'row', alignItems: 'center', gap: 12, marginHorizontal: 20, padding: 14, borderRadius: 14, borderWidth: 1, marginBottom: 8 },
  customText: { fontFamily: 'Lato_700Bold', fontSize: 14 },
  msgBox: { flexDirection: 'row', gap: 12, marginHorizontal: 20, padding: 16, borderRadius: 14, borderWidth: 1, marginBottom: 28, alignItems: 'flex-start' },
  msgText: { flex: 1, fontFamily: 'Lato_400Regular', fontSize: 12, lineHeight: 20 },
  footer: { alignItems: 'center', gap: 8 },
  footerCross: { fontSize: 36 },
  footerText: { fontFamily: 'Lato_400Regular', fontStyle: 'italic', fontSize: 11, textAlign: 'center', paddingHorizontal: 40, lineHeight: 18 },
});
