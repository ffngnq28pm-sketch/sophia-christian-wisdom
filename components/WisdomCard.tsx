import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WisdomCard as WisdomCardType } from '@/types';

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = height * 0.72;

interface Props {
  card: WisdomCardType;
  compact?: boolean;
}

export function WisdomCard({ card, compact = false }: Props) {
  const cardH = compact ? height * 0.44 : CARD_HEIGHT;

  return (
    <View style={[styles.card, { height: cardH }]}>
      <Image
        source={{ uri: card.backgroundImage }}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['rgba(15,11,24,0.35)', 'rgba(15,11,24,0.72)', 'rgba(15,11,24,0.93)']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      <ScrollView
        contentContainerStyle={[styles.content, compact && styles.contentCompact]}
        showsVerticalScrollIndicator={false}
      >
        {/* Ornament */}
        <Text style={styles.ornament}>✦</Text>

        {/* Latin/Greek primary text */}
        <View style={styles.latinGlowWrap}>
          <View style={styles.latinGlow} />
          <Text style={[styles.latin, compact && styles.latinCompact]}>
            {card.latin}
          </Text>
        </View>

        {/* Source badge */}
        <View style={styles.sourceBadge}>
          <Text style={styles.sourceText}>{card.source}</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* French translation */}
        <Text style={[styles.french, compact && styles.frenchCompact]}>
          {card.french}
        </Text>

        {/* Philosophy quote */}
        {card.philosophy ? (
          <>
            <View style={styles.philosophyDivider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerLabel}>MÉDITATION</Text>
              <View style={styles.dividerLine} />
            </View>
            <Text style={[styles.philosophy, compact && styles.philosophyCompact]}>
              "{card.philosophy}"
            </Text>
            {card.philosophyAuthor ? (
              <Text style={styles.author}>— {card.philosophyAuthor}</Text>
            ) : null}
          </>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#0F0B18',
  },
  content: {
    padding: 28,
    paddingTop: 20,
    alignItems: 'center',
    minHeight: '100%',
    justifyContent: 'center',
  },
  contentCompact: {
    padding: 20,
    paddingTop: 16,
  },
  ornament: {
    color: '#C4954A',
    fontSize: 18,
    marginBottom: 16,
    letterSpacing: 8,
  },
  latinGlowWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    width: '100%',
  },
  latinGlow: {
    position: 'absolute',
    width: '90%',
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(196,149,74,0.10)',
    shadowColor: '#C4954A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 32,
    elevation: 0,
  },
  latin: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 22,
    color: '#F2EAD8',
    textAlign: 'center',
    lineHeight: 38,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(196,149,74,0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  latinCompact: {
    fontSize: 17,
    lineHeight: 30,
  },
  sourceBadge: {
    borderWidth: 1,
    borderColor: 'rgba(196,149,74,0.5)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 18,
  },
  sourceText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    color: '#C4954A',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  divider: {
    width: 48,
    height: 1,
    backgroundColor: 'rgba(196,149,74,0.4)',
    marginBottom: 18,
  },
  french: {
    fontFamily: 'Lato_400Regular',
    fontSize: 17,
    color: '#EAE0C8',
    textAlign: 'center',
    lineHeight: 28,
    fontStyle: 'italic',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  frenchCompact: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  philosophyDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  dividerLabel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 9,
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: 2,
  },
  philosophy: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    color: 'rgba(232,224,200,0.8)',
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  philosophyCompact: {
    fontSize: 12,
    lineHeight: 18,
  },
  author: {
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
    color: '#C4954A',
    letterSpacing: 0.8,
  },
});
