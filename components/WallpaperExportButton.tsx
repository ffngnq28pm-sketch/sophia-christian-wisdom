import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image as ImageIcon, Share2 } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { captureAndSave, showSaveResult, isWallpaperAvailable, type ExportFormat } from '@/services/WallpaperService';

interface Props {
  /** Pass a ref to the view you want to capture. If null, captures a default wallpaper view. */
  targetRef?: React.RefObject<View>;
  format?: ExportFormat;
  compact?: boolean;
}

export function WallpaperExportButton({ targetRef, format = 'wallpaper', compact = false }: Props) {
  const { colors } = useTheme();
  const accent = '#C4954A';
  const [loading, setLoading] = useState(false);
  const internalRef = useRef<View>(null);
  const ref = targetRef ?? internalRef;

  if (!isWallpaperAvailable()) return null;

  const label = format === 'story' ? 'Story Instagram' : 'Fond d\'écran';
  const emoji = format === 'story' ? '📲' : '📱';

  async function handlePress() {
    setLoading(true);
    const result = await captureAndSave(ref as React.RefObject<View>, format);
    setLoading(false);
    showSaveResult(result);
  }

  if (compact) {
    return (
      <TouchableOpacity
        style={[styles.compact, { borderColor: 'rgba(196,149,74,0.35)', backgroundColor: 'rgba(196,149,74,0.07)' }]}
        onPress={handlePress}
        disabled={loading}
        activeOpacity={0.75}
      >
        {loading ? (
          <ActivityIndicator size="small" color={accent} />
        ) : (
          <ImageIcon size={16} color={accent} />
        )}
        <Text style={[styles.compactText, { color: accent }]}>{emoji} {label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View ref={internalRef}>
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: 'rgba(196,149,74,0.1)', borderColor: 'rgba(196,149,74,0.3)' }]}
        onPress={handlePress}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color={accent} />
        ) : (
          <>
            <ImageIcon size={20} color={accent} />
            <View>
              <Text style={[styles.btnTitle, { color: accent }]}>{emoji} Définir comme {label}</Text>
              <Text style={[styles.btnSub, { color: colors.textMuted }]}>Sauvegarde dans votre galerie photos</Text>
            </View>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginVertical: 6,
  },
  btnTitle: { fontFamily: 'Lato_700Bold', fontSize: 14, marginBottom: 2 },
  btnSub: { fontFamily: 'Lato_400Regular', fontSize: 11 },
  compact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  compactText: { fontFamily: 'Lato_700Bold', fontSize: 12 },
});
