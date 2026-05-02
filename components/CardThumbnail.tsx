import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Lock } from 'lucide-react-native';
import { WisdomCard } from '@/types';

const { width } = Dimensions.get('window');
const CARD_W = (width - 48) / 2;

interface Props {
  card: WisdomCard;
  isPremium: boolean;
  isFavorite: boolean;
  onPress: () => void;
  onFavoriteToggle: () => void;
}

export function CardThumbnail({ card, isPremium, isFavorite, onPress, onFavoriteToggle }: Props) {
  const isLocked = card.premium && !isPremium;

  return (
    <TouchableOpacity
      style={[styles.card, { opacity: isLocked ? 0.65 : 1 }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: card.backgroundImage }}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(15,11,24,0.82)']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 0, y: 1 }}
      />

      {isLocked && (
        <View style={styles.lockBadge}>
          <Lock size={10} color="#C4954A" />
        </View>
      )}

      <TouchableOpacity style={styles.heartBtn} onPress={onFavoriteToggle} activeOpacity={0.75}>
        <Heart size={14} color={isFavorite ? '#C4954A' : 'rgba(255,255,255,0.6)'} fill={isFavorite ? '#C4954A' : 'transparent'} />
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.theme}>{card.theme}</Text>
        <Text style={styles.latin} numberOfLines={2}>{card.latin}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_W,
    height: CARD_W * 1.4,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#160E22',
  },
  lockBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(196,149,74,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(196,149,74,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    gap: 3,
  },
  theme: {
    fontFamily: 'Lato_700Bold',
    fontSize: 9,
    color: '#C4954A',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  latin: {
    fontFamily: 'Cinzel_400Regular',
    fontSize: 10,
    color: '#F2EAD8',
    lineHeight: 15,
  },
});
