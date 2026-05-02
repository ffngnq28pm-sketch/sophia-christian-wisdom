import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Share,
} from 'react-native';
import { Heart, Share2 } from 'lucide-react-native';
import { WisdomCard } from '@/types';

interface Props {
  card: WisdomCard;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

export function CardActions({ card, isFavorite, onFavoriteToggle }: Props) {
  async function handleShare() {
    try {
      await Share.share({
        message: `${card.latin}\n\n"${card.french}"\n— ${card.source}\n\n"${card.philosophy}"\n— ${card.philosophyAuthor}\n\n✦ Sophia · Σοφία`,
      });
    } catch {}
  }

  return (
    <View style={styles.container}>
      {/* Favorite */}
      <TouchableOpacity
        style={[styles.btn, isFavorite && styles.btnActive]}
        onPress={onFavoriteToggle}
        activeOpacity={0.75}
      >
        <Heart
          size={17}
          color={isFavorite ? '#C4954A' : '#8A8FA8'}
          fill={isFavorite ? '#C4954A' : 'transparent'}
        />
        <Text style={[styles.btnLabel, isFavorite && styles.btnLabelActive]}>
          {isFavorite ? 'Sauvegardé' : 'Favoris'}
        </Text>
      </TouchableOpacity>

      {/* Share */}
      <TouchableOpacity
        style={styles.btnPrimary}
        onPress={handleShare}
        activeOpacity={0.8}
      >
        <Share2 size={17} color="#0F0B18" />
        <Text style={styles.btnPrimaryLabel}>Partager</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 13,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(138,143,168,0.3)',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  btnActive: {
    borderColor: 'rgba(196,149,74,0.5)',
    backgroundColor: 'rgba(196,149,74,0.08)',
  },
  btnLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    color: '#8A8FA8',
  },
  btnLabelActive: { color: '#C4954A' },
  btnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: '#C4954A',
  },
  btnPrimaryLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    color: '#0F0B18',
  },
});
