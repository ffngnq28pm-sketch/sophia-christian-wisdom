import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Cross, Clock, ChevronLeft, ChevronRight, Star } from 'lucide-react-native';
import { WisdomCard } from '@/components/WisdomCard';
import { CardActions } from '@/components/CardActions';
import { useFavorites } from '@/hooks/useFavorites';
import { useLent } from '@/hooks/useLent';
import { useTheme } from '@/context/ThemeContext';
import { LENT_CARDS, getLentCardOfDay } from '@/data/lentCards';
import { WisdomCard as WisdomCardType } from '@/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DEMO_DAY = 14;

export default function LentScreen() {
  const { isLent, day: realDay, total, seasonLabel, daysLeft, isAdvent } = useLent();
  const { favoriteIds, toggleFavorite } = useFavorites();
  const { colors, theme } = useTheme();

  const activeDay = isLent ? realDay : DEMO_DAY;
  const [activeIndex, setActiveIndex] = useState(activeDay - 1);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (idx !== activeIndex) setActiveIndex(idx);
  };

  const renderItem = ({ item }: { item: WisdomCardType }) => (
    <View style={styles.slide}>
      <WisdomCard card={item} />
      <View style={styles.slideActions}>
        <CardActions
          card={item}
          isFavorite={favoriteIds.has(item.id)}
          onFavoriteToggle={() => toggleFavorite(item.id)}
        />
      </View>
    </View>
  );

  const lentBg = theme === 'light' ? '#0D0A02' : '#080500';
  const accentColor = isAdvent ? '#4A6FA5' : '#C4954A';

  return (
    <View style={[styles.root, { backgroundColor: lentBg }]}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          stickyHeaderIndices={[0]}
        >
          {/* Header */}
          <LinearGradient
            colors={isAdvent ? ['#05060D', '#0A0E1A', '#05060D'] : ['#0D0A00', '#1A1200', '#0D0A00']}
            style={styles.headerGradient}
          >
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <View style={styles.crossRow}>
                  <Cross size={18} color={accentColor} />
                  <Text style={[styles.headerTitle, { color: '#F2EAD8' }]}>
                    {isAdvent ? "Temps de l'Avent" : "Temps du Carême"}
                  </Text>
                  <Cross size={18} color={accentColor} />
                </View>
                <Text style={[styles.headerSub, { color: accentColor }]}>
                  {isLent
                    ? `${seasonLabel} · Jour ${activeDay} sur ${total}`
                    : `Aperçu — Jour ${DEMO_DAY} sur 40`}
                </Text>
              </View>
            </View>

            {/* Season info box */}
            <View style={[styles.infoBox, { borderColor: accentColor + '40', backgroundColor: accentColor + '0A' }]}>
              <View style={styles.infoInner}>
                <Clock size={14} color={accentColor} />
                <Text style={[styles.infoLabel, { color: accentColor }]}>
                  {isLent
                    ? (isAdvent ? 'Jusqu\'à Noël' : 'Jusqu\'à Pâques')
                    : 'Méditations pour le temps liturgique'}
                </Text>
              </View>
              {isLent && daysLeft > 0 ? (
                <Text style={[styles.infoTimer, { color: '#F2EAD8' }]}>
                  {daysLeft} jour{daysLeft > 1 ? 's' : ''}
                </Text>
              ) : null}
              {!isLent && (
                <Text style={styles.infoNote}>
                  (Mode aperçu — actif automatiquement en Carême ou Avent)
                </Text>
              )}
            </View>

            {/* Day pills */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.pillsScroll}
              contentContainerStyle={styles.pillsContent}
            >
              {LENT_CARDS.map((_, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.dayPill, { borderColor: accentColor + '30' }, i === activeIndex && { backgroundColor: accentColor, borderColor: accentColor }]}
                  onPress={() => setActiveIndex(i)}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.dayPillText, { color: accentColor + '99' }, i === activeIndex && { color: '#0F0B18' }]}>
                    {i + 1}
                  </Text>
                  {i + 1 <= (isLent ? activeDay : DEMO_DAY) && i !== activeIndex && (
                    <Star size={5} color={accentColor} fill={accentColor} style={styles.completedDot} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </LinearGradient>

          {/* Cards swiper */}
          <View style={styles.swiperSection}>
            <View style={styles.navRow}>
              <TouchableOpacity
                disabled={activeIndex === 0}
                onPress={() => setActiveIndex((i) => i - 1)}
                style={[styles.navBtn, { borderColor: accentColor + '40', backgroundColor: accentColor + '0D' }, activeIndex === 0 && styles.navBtnDisabled]}
                activeOpacity={0.7}
              >
                <ChevronLeft size={16} color={activeIndex === 0 ? '#1E1540' : accentColor} />
              </TouchableOpacity>
              <Text style={styles.navLabel}>JOUR {activeIndex + 1} / {LENT_CARDS.length}</Text>
              <TouchableOpacity
                disabled={activeIndex === LENT_CARDS.length - 1}
                onPress={() => setActiveIndex((i) => i + 1)}
                style={[styles.navBtn, { borderColor: accentColor + '40', backgroundColor: accentColor + '0D' }, activeIndex === LENT_CARDS.length - 1 && styles.navBtnDisabled]}
                activeOpacity={0.7}
              >
                <ChevronRight size={16} color={activeIndex === LENT_CARDS.length - 1 ? '#1E1540' : accentColor} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={LENT_CARDS}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
              scrollEventThrottle={16}
              decelerationRate="fast"
              snapToInterval={SCREEN_WIDTH}
              snapToAlignment="start"
              initialScrollIndex={activeIndex}
              getItemLayout={(_, index) => ({
                length: SCREEN_WIDTH,
                offset: SCREEN_WIDTH * index,
                index,
              })}
              style={styles.flatList}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  scroll: { paddingBottom: 100 },

  headerGradient: {
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(196,149,74,0.12)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  headerLeft: { alignItems: 'center' },
  crossRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 20,
    letterSpacing: 0.5,
  },
  headerSub: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    marginTop: 4,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },

  infoBox: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: 'center',
  },
  infoInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  infoLabel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  infoTimer: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 28,
    letterSpacing: 2,
  },
  infoNote: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
    color: 'rgba(196,149,74,0.45)',
    marginTop: 4,
    textAlign: 'center',
  },

  pillsScroll: { maxHeight: 52 },
  pillsContent: {
    paddingHorizontal: 16,
    gap: 6,
    alignItems: 'center',
    paddingBottom: 4,
  },
  dayPill: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  dayPillText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 11,
  },
  completedDot: { position: 'absolute', bottom: 4, right: 4 },

  swiperSection: { marginTop: 16 },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  navBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBtnDisabled: {
    borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: 'transparent',
  },
  navLabel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    color: '#4A5068',
    letterSpacing: 2,
  },
  flatList: {},
  slide: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 20,
  },
  slideActions: { marginTop: 16 },
});
