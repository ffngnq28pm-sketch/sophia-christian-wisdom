import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Leaf, Sprout, BookOpen, Heart, ChevronRight, X } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import versesData from '@/data/creation_verses.json';
import gesturesData from '@/data/creation_gestures.json';
import saintsData from '@/data/creation_saints.json';

interface Verse { id: string; ref: string; text: string; theme: string }
interface Gesture { id: string; title: string; desc: string; verseRef: string; verseShort: string }
interface Saint { id: string; name: string; title: string; dates: string; feast?: string; bio: string; quote?: string }

function dailyIndex(length: number, salt = 0): number {
  if (length <= 0) return 0;
  const d = new Date();
  const day = Math.floor(d.getTime() / (1000 * 60 * 60 * 24));
  return Math.abs((day + salt)) % length;
}

export default function CreationScreen() {
  const { colors } = useTheme();
  const [openSaint, setOpenSaint] = useState<Saint | null>(null);

  const verses = versesData.verses as Verse[];
  const gestures = gesturesData.gestures as Gesture[];
  const saints = saintsData.saints as Saint[];

  const verseOfDay = useMemo(() => verses[dailyIndex(verses.length, 0)], [verses]);
  const gestureOfDay = useMemo(() => gestures[dailyIndex(gestures.length, 7)], [gestures]);

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['rgba(140,168,108,0.10)', 'transparent']}
        style={styles.topGradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Leaf size={22} color={colors.textAccent} />
              <Text style={[styles.title, { color: colors.textPrimary }]}>Création</Text>
            </View>
            <Text style={[styles.subtitle, { color: colors.textMuted }]}>
              Préserver la beauté du don
            </Text>
          </View>

          {/* Verse of the day */}
          <View style={[styles.card, { backgroundColor: colors.bgCard, borderColor: colors.borderAccent }]}>
            <View style={styles.cardLabelRow}>
              <BookOpen size={13} color={colors.textAccent} />
              <Text style={[styles.cardLabel, { color: colors.textAccent }]}>VERSET DU JOUR</Text>
            </View>
            <Text style={[styles.verseText, { color: colors.textPrimary }]}>
              « {verseOfDay.text} »
            </Text>
            <Text style={[styles.verseRef, { color: colors.textMuted }]}>{verseOfDay.ref}</Text>
          </View>

          {/* Gesture of the day */}
          <View style={[styles.card, styles.cardGesture, { backgroundColor: colors.bgSection, borderColor: colors.borderAccent }]}>
            <View style={styles.cardLabelRow}>
              <Sprout size={13} color={colors.textAccent} />
              <Text style={[styles.cardLabel, { color: colors.textAccent }]}>GESTE DU JOUR</Text>
            </View>
            <Text style={[styles.gestureTitle, { color: colors.textPrimary }]}>{gestureOfDay.title}</Text>
            <Text style={[styles.gestureDesc, { color: colors.textSecondary }]}>{gestureOfDay.desc}</Text>
            <View style={[styles.gestureVerse, { borderLeftColor: colors.textAccent }]}>
              <Text style={[styles.gestureVerseText, { color: colors.textSecondary }]}>
                « {gestureOfDay.verseShort} »
              </Text>
              <Text style={[styles.gestureVerseRef, { color: colors.textMuted }]}>{gestureOfDay.verseRef}</Text>
            </View>
          </View>

          {/* Saints écologistes */}
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Saints de la Création
          </Text>
          <Text style={[styles.sectionSub, { color: colors.textMuted }]}>
            Figures chrétiennes en harmonie avec le vivant.
          </Text>

          <View style={styles.saintsList}>
            {saints.map((saint) => (
              <TouchableOpacity
                key={saint.id}
                style={[styles.saintRow, { backgroundColor: colors.bgCard, borderColor: colors.border }]}
                onPress={() => setOpenSaint(saint)}
                activeOpacity={0.85}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.saintName, { color: colors.textPrimary }]}>{saint.name}</Text>
                  <Text style={[styles.saintTitle, { color: colors.textAccent }]}>{saint.title}</Text>
                  <Text style={[styles.saintDates, { color: colors.textMuted }]}>{saint.dates}</Text>
                </View>
                <ChevronRight size={18} color={colors.textMuted} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Hymne footer */}
          <View style={[styles.hymne, { borderTopColor: colors.border }]}>
            <Text style={[styles.hymneTitle, { color: colors.textAccent }]}>
              Cantique de Frère Soleil
            </Text>
            <Text style={[styles.hymneText, { color: colors.textSecondary }]}>
              « Loué sois-tu, mon Seigneur, pour notre sœur Mère Terre, qui nous porte et nous nourrit, qui produit la diversité des fruits, avec les fleurs colorées et l'herbe. »
            </Text>
            <Text style={[styles.hymneSource, { color: colors.textMuted }]}>
              Saint François d'Assise, 1224
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Saint detail modal */}
      <Modal visible={!!openSaint} transparent animationType="slide" onRequestClose={() => setOpenSaint(null)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalSheet, { backgroundColor: colors.bgCard }]}>
            <TouchableOpacity style={styles.modalClose} onPress={() => setOpenSaint(null)}>
              <X size={20} color={colors.textMuted} />
            </TouchableOpacity>
            {openSaint && (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                <Text style={[styles.modalName, { color: colors.textPrimary }]}>{openSaint.name}</Text>
                <Text style={[styles.modalTitle, { color: colors.textAccent }]}>{openSaint.title}</Text>
                <View style={[styles.modalMetaRow, { borderColor: colors.border }]}>
                  <Text style={[styles.modalMeta, { color: colors.textMuted }]}>{openSaint.dates}</Text>
                  {openSaint.feast && (
                    <Text style={[styles.modalMeta, { color: colors.textMuted }]}>Fête : {openSaint.feast}</Text>
                  )}
                </View>
                <Text style={[styles.modalBio, { color: colors.textSecondary }]}>{openSaint.bio}</Text>
                {openSaint.quote && (
                  <View style={[styles.modalQuote, { borderLeftColor: colors.textAccent, backgroundColor: colors.bgSection }]}>
                    <Heart size={14} color={colors.textAccent} />
                    <Text style={[styles.modalQuoteText, { color: colors.textPrimary }]}>« {openSaint.quote} »</Text>
                  </View>
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  topGradient: { position: 'absolute', top: 0, left: 0, right: 0, height: 240 },
  scroll: { paddingHorizontal: 20, paddingBottom: 120, paddingTop: 8 },
  header: { paddingTop: 16, paddingBottom: 20 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { fontFamily: 'Cinzel_700Bold', fontSize: 28, letterSpacing: 0.5 },
  subtitle: { fontFamily: 'Lato_400Regular', fontSize: 13, marginTop: 4, fontStyle: 'italic' },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
  },
  cardGesture: { borderRadius: 18 },
  cardLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  cardLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 10,
    letterSpacing: 2,
  },
  verseText: {
    fontFamily: 'Cinzel_400Regular',
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 12,
  },
  verseRef: {
    fontFamily: 'Lato_700Bold',
    fontSize: 11,
    letterSpacing: 1,
  },
  gestureTitle: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 18,
    marginBottom: 8,
  },
  gestureDesc: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 14,
  },
  gestureVerse: {
    borderLeftWidth: 2,
    paddingLeft: 12,
    paddingVertical: 4,
  },
  gestureVerseText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  gestureVerseRef: {
    fontFamily: 'Lato_700Bold',
    fontSize: 10,
    marginTop: 4,
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 4,
  },
  sectionSub: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    marginBottom: 14,
    fontStyle: 'italic',
  },
  saintsList: { gap: 10, marginBottom: 24 },
  saintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 10,
  },
  saintName: { fontFamily: 'Cinzel_700Bold', fontSize: 15, marginBottom: 2 },
  saintTitle: { fontFamily: 'Lato_400Regular', fontSize: 12, marginBottom: 2 },
  saintDates: { fontFamily: 'Lato_400Regular', fontSize: 11 },
  hymne: {
    borderTopWidth: 1,
    paddingTop: 24,
    paddingBottom: 16,
    marginTop: 8,
  },
  hymneTitle: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 14,
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 12,
  },
  hymneText: {
    fontFamily: 'Cinzel_400Regular',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: 12,
  },
  hymneSource: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 10,
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 24,
    maxHeight: '90%',
  },
  modalClose: {
    alignSelf: 'flex-end',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  modalName: { fontFamily: 'Cinzel_700Bold', fontSize: 26, marginBottom: 4 },
  modalTitle: { fontFamily: 'Lato_400Regular', fontSize: 14, marginBottom: 12, fontStyle: 'italic' },
  modalMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 14,
    marginBottom: 16,
    borderBottomWidth: 1,
  },
  modalMeta: { fontFamily: 'Lato_400Regular', fontSize: 12 },
  modalBio: {
    fontFamily: 'Lato_400Regular',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 18,
  },
  modalQuote: {
    borderLeftWidth: 3,
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  modalQuoteText: {
    fontFamily: 'Cinzel_400Regular',
    fontSize: 14,
    lineHeight: 22,
    flex: 1,
    fontStyle: 'italic',
  },
});
