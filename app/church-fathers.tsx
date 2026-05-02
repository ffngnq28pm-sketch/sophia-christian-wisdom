import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, X, Star, MapPin, Calendar } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { CHURCH_FATHERS, ChurchFather } from '@/data/churchFathers';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function SectionHeader({ label, accent }: { label: string; accent: string }) {
  return (
    <View style={sectionHeaderStyle}>
      <View style={[sectionBarStyle, { backgroundColor: accent }]} />
      <Text style={[sectionLabelStyle, { color: accent + 'CC' }]}>{label}</Text>
    </View>
  );
}
const sectionHeaderStyle = { flexDirection: 'row' as const, alignItems: 'center' as const, gap: 8, marginBottom: 14 };
const sectionBarStyle = { width: 3, height: 16, borderRadius: 2 };
const sectionLabelStyle = { fontFamily: 'Lato_700Bold' as const, fontSize: 10, letterSpacing: 1.8 };

export default function ChurchFathersScreen() {
  const { colors } = useTheme();
  const [selected, setSelected] = useState<ChurchFather | null>(null);

  const renderItem = ({ item }: { item: ChurchFather }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.bgCard, borderColor: item.color + '40' }]}
      onPress={() => setSelected(item)}
      activeOpacity={0.88}
    >
      <View style={styles.cardImageWrap}>
        <Image source={{ uri: item.portrait }} style={styles.cardImage} resizeMode="cover" />
        <LinearGradient
          colors={['transparent', colors.bgCard]}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0.3 }}
          end={{ x: 0, y: 1 }}
        />
        <View style={[styles.glyphWrap, { backgroundColor: item.color + '22', borderColor: item.color + '50' }]}>
          <Text style={[styles.glyph, { color: item.color }]}>✝</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.fieldRow}>
          {item.field.split(' · ').slice(0, 2).map((f) => (
            <View key={f} style={[styles.fieldPill, { backgroundColor: item.color + '18', borderColor: item.color + '40' }]}>
              <Text style={[styles.fieldPillText, { color: item.color }]}>{f}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.nameLatin, { color: colors.textMuted }]}>{item.latinName}</Text>
        <Text style={[styles.nameFrench, { color: item.color }]}>{item.name}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Calendar size={11} color={colors.textMuted} />
            <Text style={[styles.metaText, { color: colors.textMuted }]}>{item.years}</Text>
          </View>
          <View style={styles.metaItem}>
            <MapPin size={11} color={colors.textMuted} />
            <Text style={[styles.metaText, { color: colors.textMuted }]} numberOfLines={1}>{item.origin}</Text>
          </View>
        </View>

        <View style={[styles.quotePreview, { borderLeftColor: item.color }]}>
          <Text style={[styles.quotePreviewText, { color: colors.textSecondary }]} numberOfLines={2}>
            "{item.famousQuote}"
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <StatusBar style={colors.statusBar} />
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.8}>
            <ArrowLeft size={20} color={colors.textAccent} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
              Pères de l'Église
            </Text>
            <Text style={[styles.headerSub, { color: colors.textAccent }]}>
              Les Grands Saints & Mystiques
            </Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.premiumRow}>
          <Star size={13} color={colors.textAccent} fill={colors.textAccent} />
          <Text style={[styles.premiumLabel, { color: colors.textAccent }]}>Collection Exclusive Premium</Text>
          <Star size={13} color={colors.textAccent} fill={colors.textAccent} />
        </View>

        <FlatList
          data={CHURCH_FATHERS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      </SafeAreaView>

      <Modal
        visible={!!selected}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelected(null)}
      >
        {selected && (
          <View style={[styles.detailRoot, { backgroundColor: colors.bg }]}>
            <View style={styles.detailHeroWrap}>
              <Image source={{ uri: selected.portrait }} style={styles.detailHeroImg} resizeMode="cover" />
              <LinearGradient
                colors={['rgba(0,0,0,0.1)', colors.bg]}
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0, y: 0.4 }}
                end={{ x: 0, y: 1 }}
              />
              <View style={styles.detailHeroOverlay}>
                <View style={[styles.detailGlyphWrap, { backgroundColor: selected.color + '20', borderColor: selected.color + '60' }]}>
                  <View style={[styles.detailGlow, { backgroundColor: selected.color }]} />
                  <Text style={[styles.detailGlyph, { color: selected.color }]}>✝</Text>
                </View>
              </View>
            </View>

            <SafeAreaView style={styles.detailCloseSafe}>
              <TouchableOpacity onPress={() => setSelected(null)} style={[styles.closeBtn, { backgroundColor: 'rgba(0,0,0,0.5)' }]} activeOpacity={0.8}>
                <X size={20} color="#F2EAD8" />
              </TouchableOpacity>
            </SafeAreaView>

            <ScrollView contentContainerStyle={styles.detailScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.detailNameBlock}>
                <View style={styles.fieldRowDetail}>
                  {selected.field.split(' · ').map((f) => (
                    <View key={f} style={[styles.fieldPill, { backgroundColor: selected.color + '20', borderColor: selected.color + '50' }]}>
                      <Text style={[styles.fieldPillText, { color: selected.color }]}>{f}</Text>
                    </View>
                  ))}
                </View>
                <Text style={[styles.detailNameLatin, { color: colors.textMuted }]}>{selected.latinName}</Text>
                <Text style={[styles.detailNameFrench, { color: selected.color }]}>{selected.name}</Text>

                <View style={styles.detailMetaRow}>
                  <View style={[styles.detailMetaChip, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
                    <Calendar size={12} color={colors.textMuted} />
                    <Text style={[styles.detailMetaText, { color: colors.textSecondary }]}>{selected.years}</Text>
                  </View>
                  <View style={[styles.detailMetaChip, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
                    <MapPin size={12} color={colors.textMuted} />
                    <Text style={[styles.detailMetaText, { color: colors.textSecondary }]}>{selected.origin}</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.detailSection, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
                <SectionHeader label="CITATION CÉLÈBRE" accent={selected.color} />
                <Text style={[styles.detailQuote, { color: colors.textSecondary }]}>"{selected.famousQuote}"</Text>
              </View>

              <View style={[styles.detailSection, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
                <SectionHeader label="BIOGRAPHIE" accent={selected.color} />
                <Text style={[styles.detailBody, { color: colors.textSecondary }]}>{selected.description}</Text>
              </View>

              <View style={[styles.detailSection, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
                <SectionHeader label="HÉRITAGE" accent={selected.color} />
                <Text style={[styles.detailBody, { color: colors.textSecondary }]}>{selected.legacy}</Text>
              </View>

              {selected.works.length > 0 && (
                <View style={[styles.detailSection, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
                  <SectionHeader label="ŒUVRES MAJEURES" accent={selected.color} />
                  {selected.works.map((w, i) => (
                    <View key={i} style={styles.workRow}>
                      <View style={[styles.workDot, { backgroundColor: selected.color }]} />
                      <Text style={[styles.workText, { color: colors.textSecondary }]}>{w}</Text>
                    </View>
                  ))}
                </View>
              )}

              <View style={{ height: 60 }} />
            </ScrollView>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  headerCenter: { alignItems: 'center', flex: 1 },
  headerTitle: { fontFamily: 'Cinzel_700Bold', fontSize: 18, textAlign: 'center' },
  headerSub: { fontFamily: 'Lato_400Regular', fontSize: 11, letterSpacing: 0.5, marginTop: 2 },
  premiumRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, marginBottom: 16,
  },
  premiumLabel: { fontFamily: 'Lato_700Bold', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' },
  list: { paddingHorizontal: 20, paddingBottom: 100 },
  card: {
    borderRadius: 20, borderWidth: 1, overflow: 'hidden',
  },
  cardImageWrap: { height: 160, position: 'relative' },
  cardImage: { ...StyleSheet.absoluteFillObject },
  glyphWrap: {
    position: 'absolute', bottom: 12, right: 16,
    width: 56, height: 56, borderRadius: 28, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center',
  },
  glyph: { fontFamily: 'Cinzel_700Bold', fontSize: 28 },
  cardBody: { padding: 18, paddingTop: 12 },
  fieldRow: { flexDirection: 'row', gap: 6, marginBottom: 10, flexWrap: 'wrap' },
  fieldPill: {
    paddingHorizontal: 10, paddingVertical: 3,
    borderRadius: 12, borderWidth: 1,
  },
  fieldPillText: { fontFamily: 'Lato_700Bold', fontSize: 10, letterSpacing: 0.5 },
  nameLatin: { fontFamily: 'Cinzel_400Regular', fontSize: 11, fontStyle: 'italic', marginBottom: 2 },
  nameFrench: { fontFamily: 'Lato_700Bold', fontSize: 16, marginBottom: 10 },
  metaRow: { flexDirection: 'row', gap: 14, marginBottom: 12 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4, flex: 1 },
  metaText: { fontFamily: 'Lato_400Regular', fontSize: 11 },
  quotePreview: { borderLeftWidth: 2, paddingLeft: 12 },
  quotePreviewText: { fontFamily: 'Lato_400Regular', fontSize: 12, lineHeight: 18, fontStyle: 'italic' },
  // Detail
  detailRoot: { flex: 1 },
  detailHeroWrap: { height: 280, position: 'relative' },
  detailHeroImg: { ...StyleSheet.absoluteFillObject },
  detailHeroOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20,
  },
  detailGlyphWrap: {
    width: 100, height: 100, borderRadius: 50, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  detailGlow: {
    position: 'absolute', width: '100%', height: '100%', opacity: 0.15,
  },
  detailGlyph: { fontFamily: 'Cinzel_700Bold', fontSize: 52 },
  detailCloseSafe: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 },
  closeBtn: {
    alignSelf: 'flex-end', margin: 16,
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  detailScroll: { paddingTop: 8, paddingHorizontal: 20 },
  detailNameBlock: { alignItems: 'center', marginBottom: 20 },
  fieldRowDetail: { flexDirection: 'row', gap: 6, marginBottom: 12, flexWrap: 'wrap', justifyContent: 'center' },
  detailNameLatin: { fontFamily: 'Cinzel_400Regular', fontSize: 12, fontStyle: 'italic', marginBottom: 4, textAlign: 'center' },
  detailNameFrench: { fontFamily: 'Lato_700Bold', fontSize: 22, marginBottom: 14, textAlign: 'center' },
  detailMetaRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', justifyContent: 'center' },
  detailMetaChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1,
  },
  detailMetaText: { fontFamily: 'Lato_400Regular', fontSize: 12 },
  detailSection: {
    borderRadius: 16, borderWidth: 1, padding: 18, marginBottom: 14,
  },
  detailQuote: {
    fontFamily: 'Lato_400Regular', fontSize: 14, lineHeight: 22,
    fontStyle: 'italic', textAlign: 'center',
  },
  detailBody: { fontFamily: 'Lato_400Regular', fontSize: 14, lineHeight: 24 },
  workRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  workDot: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  workText: { fontFamily: 'Lato_400Regular', fontSize: 13, lineHeight: 20, flex: 1 },
});
