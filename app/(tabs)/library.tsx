import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { X, Star, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeFilterPill } from '@/components/ThemeFilterPill';
import { CardThumbnail } from '@/components/CardThumbnail';
import { WisdomCard } from '@/components/WisdomCard';
import { CardActions } from '@/components/CardActions';
import { PremiumPaywall } from '@/components/PremiumPaywall';
import { useFavorites } from '@/hooks/useFavorites';
import { usePremium, FREE_CARD_LIMIT } from '@/hooks/usePremium';
import { useTheme } from '@/context/ThemeContext';
import { CARDS, THEMES, SOURCE_TYPES } from '@/data/cards';
import { WisdomCard as WisdomCardType, Theme, SourceType } from '@/types';

type FilterMode = 'theme' | 'source';

export default function LibraryScreen() {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const { isPremium, isCardLocked } = usePremium();
  const { colors } = useTheme();
  const [filterMode, setFilterMode] = useState<FilterMode>('theme');
  const [activeTheme, setActiveTheme] = useState<Theme | null>(null);
  const [activeSource, setActiveSource] = useState<SourceType | null>(null);
  const [selectedCard, setSelectedCard] = useState<WisdomCardType | null>(null);
  const [premiumVisible, setPremiumVisible] = useState(false);

  const filtered = CARDS.filter((c) => {
    if (filterMode === 'theme' && activeTheme) return c.theme === activeTheme;
    if (filterMode === 'source' && activeSource) return c.sourceType === activeSource;
    return true;
  });

  const left = filtered.filter((_, i) => i % 2 === 0);
  const right = filtered.filter((_, i) => i % 2 === 1);

  function handleCardPress(card: WisdomCardType) {
    const globalIndex = CARDS.indexOf(card);
    if (isCardLocked(globalIndex)) {
      setPremiumVisible(true);
      return;
    }
    setSelectedCard(card);
  }

  function handleNamesPress() {
    if (!isPremium) { setPremiumVisible(true); return; }
    router.push('/divine-names');
  }

  function handleFathersPress() {
    if (!isPremium) { setPremiumVisible(true); return; }
    router.push('/church-fathers' as any);
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <StatusBar style={colors.statusBar} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Bibliothèque</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>{CARDS.length} sagesses</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Divine Names Banner */}
          <TouchableOpacity
            style={styles.namesBanner}
            onPress={handleNamesPress}
            activeOpacity={0.88}
          >
            <Image
              source={{ uri: 'https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=800' }}
              style={StyleSheet.absoluteFillObject}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['rgba(15,11,24,0.25)', 'rgba(15,11,24,0.82)']}
              style={StyleSheet.absoluteFillObject}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
            <View style={styles.namesBannerContent}>
              <View style={styles.namesBannerLeft}>
                <View style={styles.namesPremiumBadge}>
                  <Star size={11} color="#C4954A" fill="#C4954A" />
                  <Text style={styles.namesPremiumText}>PREMIUM</Text>
                </View>
                <Text style={styles.namesLatin}>Nomina Dei</Text>
                <Text style={styles.namesFrench}>Les 50 Noms de Dieu</Text>
                <Text style={styles.namesDesc}>Collection exclusive de 50 méditations</Text>
              </View>
              <View style={styles.namesArrow}>
                <ChevronRight size={20} color="#C4954A" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Church Fathers Banner */}
          <TouchableOpacity
            style={styles.fathersBanner}
            onPress={handleFathersPress}
            activeOpacity={0.88}
          >
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=800' }}
              style={StyleSheet.absoluteFillObject}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['rgba(15,11,24,0.15)', 'rgba(15,11,24,0.85)']}
              style={StyleSheet.absoluteFillObject}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
            <View style={styles.namesBannerContent}>
              <View style={styles.namesBannerLeft}>
                <View style={styles.namesPremiumBadge}>
                  <Star size={11} color="#C4954A" fill="#C4954A" />
                  <Text style={styles.namesPremiumText}>PREMIUM</Text>
                </View>
                <Text style={styles.fathersTitle}>Patres Ecclesiae</Text>
                <Text style={styles.fathersFrench}>Pères de l'Église & Saints</Text>
                <Text style={styles.namesDesc}>8 figures encyclopédiques</Text>
              </View>
              <View style={styles.namesArrow}>
                <ChevronRight size={20} color="#C4954A" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Filter mode toggle */}
          <View style={[styles.modeToggle, { backgroundColor: colors.bgSection }]}>
            <TouchableOpacity
              style={[styles.modeBtn, filterMode === 'theme' && { backgroundColor: colors.textAccent + '20' }]}
              onPress={() => { setFilterMode('theme'); setActiveSource(null); }}
            >
              <Text style={[styles.modeBtnText, { color: colors.textMuted }, filterMode === 'theme' && { color: colors.textAccent, fontFamily: 'Lato_700Bold' }]}>
                Thèmes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeBtn, filterMode === 'source' && { backgroundColor: colors.textAccent + '20' }]}
              onPress={() => { setFilterMode('source'); setActiveTheme(null); }}
            >
              <Text style={[styles.modeBtnText, { color: colors.textMuted }, filterMode === 'source' && { color: colors.textAccent, fontFamily: 'Lato_700Bold' }]}>
                Sources
              </Text>
            </TouchableOpacity>
          </View>

          {/* Filter pills */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
            <ThemeFilterPill
              label="Tout"
              active={filterMode === 'theme' ? !activeTheme : !activeSource}
              onPress={() => filterMode === 'theme' ? setActiveTheme(null) : setActiveSource(null)}
            />
            {filterMode === 'theme'
              ? THEMES.map((t) => (
                  <ThemeFilterPill
                    key={t}
                    label={t}
                    active={activeTheme === t}
                    onPress={() => setActiveTheme(activeTheme === t ? null : t)}
                  />
                ))
              : SOURCE_TYPES.map((s) => (
                  <ThemeFilterPill
                    key={s}
                    label={s}
                    active={activeSource === s}
                    onPress={() => setActiveSource(activeSource === s ? null : s as SourceType)}
                  />
                ))}
          </ScrollView>

          {/* Masonry grid */}
          <View style={styles.grid}>
            <View style={styles.column}>
              {left.map((card) => {
                const gIdx = CARDS.indexOf(card);
                const locked = isCardLocked(gIdx);
                return (
                  <CardThumbnail
                    key={card.id}
                    card={card}
                    isPremium={!locked}
                    isFavorite={favoriteIds.has(card.id)}
                    onPress={() => handleCardPress(card)}
                    onFavoriteToggle={() => locked ? setPremiumVisible(true) : toggleFavorite(card.id)}
                  />
                );
              })}
            </View>
            <View style={[styles.column, styles.columnOffset]}>
              {right.map((card) => {
                const gIdx = CARDS.indexOf(card);
                const locked = isCardLocked(gIdx);
                return (
                  <CardThumbnail
                    key={card.id}
                    card={card}
                    isPremium={!locked}
                    isFavorite={favoriteIds.has(card.id)}
                    onPress={() => handleCardPress(card)}
                    onFavoriteToggle={() => locked ? setPremiumVisible(true) : toggleFavorite(card.id)}
                  />
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Card detail modal */}
      <Modal visible={!!selectedCard} transparent animationType="slide" statusBarTranslucent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalSheet, { backgroundColor: colors.bgCard }]}>
            <TouchableOpacity style={styles.modalClose} onPress={() => setSelectedCard(null)}>
              <X size={20} color="#8A8FA8" />
            </TouchableOpacity>
            {selectedCard && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <WisdomCard card={selectedCard} />
                <View style={{ height: 16 }} />
                <CardActions
                  card={selectedCard}
                  isFavorite={favoriteIds.has(selectedCard.id)}
                  onFavoriteToggle={() => toggleFavorite(selectedCard.id)}
                />
                <View style={{ height: 40 }} />
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      <PremiumPaywall
        visible={premiumVisible}
        onClose={() => setPremiumVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safeArea: { flex: 1 },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  title: { fontFamily: 'Cinzel_700Bold', fontSize: 24 },
  subtitle: { fontFamily: 'Lato_400Regular', fontSize: 13 },
  namesBanner: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 18,
    height: 120,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(196,149,74,0.3)',
  },
  namesBannerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
  },
  namesBannerLeft: { flex: 1, gap: 3 },
  namesPremiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  namesPremiumText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 9,
    color: '#C4954A',
    letterSpacing: 1.5,
  },
  namesLatin: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 16,
    color: '#F2EAD8',
    textShadowColor: 'rgba(196,149,74,0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  namesFrench: {
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    color: '#C4954A',
    letterSpacing: 0.3,
  },
  namesDesc: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
  },
  fathersBanner: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 18,
    height: 110,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(138,75,19,0.3)',
  },
  fathersTitle: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 15,
    color: '#F2EAD8',
    textShadowColor: 'rgba(138,75,19,0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  fathersFrench: {
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    color: '#D4956A',
    letterSpacing: 0.3,
  },
  namesArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(196,149,74,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(196,149,74,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeToggle: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 12,
    borderRadius: 12,
    padding: 3,
  },
  modeBtn: { flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: 'center' },
  modeBtnText: { fontFamily: 'Lato_400Regular', fontSize: 13 },
  filters: { paddingHorizontal: 20, paddingBottom: 14 },
  grid: { flexDirection: 'row', paddingHorizontal: 20, gap: 8 },
  column: { flex: 1 },
  columnOffset: { marginTop: 28 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'flex-end' },
  modalSheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 20,
    paddingHorizontal: 20,
    maxHeight: '93%',
  },
  modalClose: {
    alignSelf: 'flex-end',
    marginBottom: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
