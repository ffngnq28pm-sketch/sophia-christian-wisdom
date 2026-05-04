import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Platform, LayoutAnimation,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { usePremium } from '@/hooks/usePremium';
import { AudioService, AMBIENT_TRACKS, AmbientId, unlockWebAudioSync, isWebAudioUnlocked } from '@/services/AudioService';
import { AsyncStorage_like } from '@/context/storage';

const PREFS_KEY = 'sophia_ambient_prefs_v1';
const DISMISSED_KEY = 'sophia_audio_banner_dismissed';

const SILENCE_B64 = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=';
const silenceAsset: unknown = require('../assets/audio/silence.wav');
function getSilenceUrl(): string {
  return typeof silenceAsset === 'string' ? silenceAsset : SILENCE_B64;
}

interface Props {
  onDismiss?: () => void;
}

export function AudioActivationBanner({ onDismiss }: Props) {
  const { colors } = useTheme();
  const { isPremium } = usePremium();
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState<AmbientId | null>(() => {
    try {
      const raw = AsyncStorage_like.get(PREFS_KEY);
      return raw ? JSON.parse(raw).activeId : null;
    } catch { return null; }
  });
  const [loading, setLoading] = useState<AmbientId | null>(null);

  const handleActivate = useCallback(() => {
    // SYNCHRONOUS web unlock — must happen before any await
    if (!isWebAudioUnlocked()) {
      unlockWebAudioSync(getSilenceUrl());
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(true);
  }, []);

  const handleSelect = useCallback(async (id: AmbientId) => {
    if (!isWebAudioUnlocked()) unlockWebAudioSync(getSilenceUrl());
    if (activeId === id) {
      await AudioService.stopAmbient();
      setActiveId(null);
      AsyncStorage_like.set(PREFS_KEY, JSON.stringify({ activeId: null, volume: 0.7 }));
      return;
    }
    setLoading(id);
    try {
      await AudioService.playAmbient(id, 0.7);
      setActiveId(id);
      AsyncStorage_like.set(PREFS_KEY, JSON.stringify({ activeId: id, volume: 0.7 }));
    } catch {}
    finally { setLoading(null); }
  }, [activeId]);

  const handleDismiss = useCallback(async () => {
    await AudioService.stopAmbient();
    AsyncStorage_like.set(DISMISSED_KEY, '1');
    AsyncStorage_like.set(PREFS_KEY, JSON.stringify({ activeId: null, volume: 0.7 }));
    setExpanded(false);
    onDismiss?.();
  }, [onDismiss]);

  const accent = colors.textAccent;

  if (!expanded) {
    return (
      <TouchableOpacity
        style={[styles.pill, { borderColor: accent + '40', backgroundColor: accent + '10' }]}
        onPress={handleActivate}
        activeOpacity={0.75}
      >
        <Text style={styles.pillEmoji}>🎵</Text>
        <Text style={[styles.pillText, { color: accent }]}>Activer l'audio sacré</Text>
        <Text style={[styles.pillArrow, { color: accent }]}>›</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.panel, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
      <View style={styles.panelHeader}>
        <Text style={[styles.panelTitle, { color: colors.textPrimary }]}>🎵 Ambiances sacrées</Text>
        <TouchableOpacity onPress={handleDismiss} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={[styles.closeBtn, { color: colors.textMuted }]}>✕</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.trackGrid}>
        {AMBIENT_TRACKS.map((track) => {
          const isActive = activeId === track.id;
          const isLoading = loading === track.id;
          const locked = track.premium && !isPremium;
          return (
            <TouchableOpacity
              key={track.id}
              style={[
                styles.trackBtn,
                { borderColor: colors.border, backgroundColor: colors.bgInput },
                isActive && { borderColor: accent, backgroundColor: accent + '18' },
                locked && { opacity: 0.5 },
              ]}
              onPress={() => !locked && handleSelect(track.id)}
              activeOpacity={locked ? 1 : 0.75}
            >
              <Text style={styles.trackEmoji}>{isLoading ? '⏳' : track.emoji}</Text>
              <Text style={[styles.trackLabel, { color: isActive ? accent : colors.textMuted }]} numberOfLines={2}>
                {track.label}
              </Text>
              {locked && <Text style={[styles.lock, { color: accent }]}>★</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
      {activeId && activeId !== 'silence' && (
        <Text style={[styles.hint, { color: colors.textMuted }]}>
          Réglage volume dans Paramètres · Son
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    gap: 8,
  },
  pillEmoji: { fontSize: 15 },
  pillText: {
    flex: 1,
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    letterSpacing: 0.3,
  },
  pillArrow: { fontSize: 18, fontWeight: '300' },
  panel: {
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    gap: 12,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  panelTitle: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  closeBtn: {
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
  },
  trackGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  trackBtn: {
    width: '30%',
    borderRadius: 12,
    borderWidth: 1,
    padding: 10,
    gap: 4,
    alignItems: 'center',
    minWidth: 80,
  },
  trackEmoji: { fontSize: 20 },
  trackLabel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 14,
  },
  lock: { fontSize: 9, fontFamily: 'Lato_700Bold' },
  hint: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
    textAlign: 'center',
    opacity: 0.7,
  },
});
