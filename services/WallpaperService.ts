import { Alert, Platform } from 'react-native';
import type { RefObject } from 'react';
import type { View } from 'react-native';

// Optional peer deps — install with: npx expo install expo-media-library react-native-view-shot
let captureRef: ((ref: RefObject<View>, opts?: object) => Promise<string>) | null = null;
let MediaLibrary: { requestPermissionsAsync: () => Promise<{ status: string }>; saveToLibraryAsync: (uri: string) => Promise<unknown> } | null = null;

try { captureRef = require('react-native-view-shot').captureRef; } catch {}
try { MediaLibrary = require('expo-media-library'); } catch {}

export type ExportFormat = 'wallpaper' | 'story';

const FORMATS: Record<ExportFormat, { width: number; height: number; label: string }> = {
  wallpaper: { width: 1170, height: 2532, label: 'Fond d\'écran' },
  story: { width: 1080, height: 1920, label: 'Story Instagram' },
};

export async function requestGalleryPermission(): Promise<boolean> {
  if (!MediaLibrary) return false;
  const { status } = await MediaLibrary.requestPermissionsAsync();
  return status === 'granted';
}

export async function captureAndSave(
  viewRef: RefObject<View>,
  format: ExportFormat = 'wallpaper'
): Promise<{ success: boolean; message: string }> {
  if (!captureRef || !MediaLibrary) {
    return {
      success: false,
      message: 'Installation requise : expo-media-library react-native-view-shot',
    };
  }

  const granted = await requestGalleryPermission();
  if (!granted) {
    return { success: false, message: 'Permission galerie photos refusée.' };
  }

  try {
    const { width, height } = FORMATS[format];
    const uri = await captureRef(viewRef, {
      format: 'jpg',
      quality: 0.95,
      width,
      height,
    });
    await MediaLibrary.saveToLibraryAsync(uri);
    return {
      success: true,
      message: `${FORMATS[format].label} sauvegardé dans votre galerie ✦`,
    };
  } catch (e) {
    return { success: false, message: 'Erreur lors de la sauvegarde.' };
  }
}

export function showSaveResult(result: { success: boolean; message: string }) {
  Alert.alert(
    result.success ? '✦ Sauvegardé' : 'Erreur',
    result.message,
    [{ text: 'OK' }]
  );
}

export function isWallpaperAvailable(): boolean {
  return captureRef !== null && MediaLibrary !== null && Platform.OS !== 'web';
}
