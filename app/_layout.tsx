import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Stack, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Cinzel_400Regular, Cinzel_700Bold } from '@expo-google-fonts/cinzel';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider } from '@/context/ThemeContext';
import { UserProfileProvider } from '@/context/UserProfileContext';
import { I18nProvider } from '@/context/I18nContext';
import { NightModeProvider, useNightModeContext } from '@/context/NightModeContext';
import { Signature } from '@/components/Signature';
import { StoreService } from '@/services/StoreService';
import { NotificationService } from '@/services/NotificationService';
import { hydrateStorage } from '@/context/storage';

SplashScreen.preventAutoHideAsync();

function NightOverlay() {
  const { isNightMode } = useNightModeContext();
  if (!isNightMode) return null;
  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(255, 140, 0, 0.055)',
        zIndex: 999,
      }}
    />
  );
}

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    Cinzel_400Regular,
    Cinzel_700Bold,
    Lato_400Regular,
    Lato_700Bold,
  });

  // Hydratation du stockage persistant avant tout rendu : on évite ainsi de
  // monter le router avec un profil vide (flash d'onboarding) puis de l'écraser.
  const [storageHydrated, setStorageHydrated] = useState(false);
  useEffect(() => {
    hydrateStorage().then(() => setStorageHydrated(true));
  }, []);

  useEffect(() => {
    StoreService.configure().catch(() => {});
    NotificationService.requestPermissions().then((granted) => {
      if (granted) NotificationService.scheduleEveningCheckin();
    });
  }, []);

  useEffect(() => {
    if ((fontsLoaded || fontError) && storageHydrated) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, storageHydrated]);

  // Tant que polices ET stockage ne sont pas prêts, on ne rend rien : le splash
  // natif reste affiché (écran neutre), donc aucun flash ni perte de données.
  if ((!fontsLoaded && !fontError) || !storageHydrated) {
    return null;
  }

  return (
    <I18nProvider>
      <UserProfileProvider>
        <ThemeProvider>
          <NightModeProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
              <Stack.Screen name="divine-names" options={{ animation: 'slide_from_right' }} />
              <Stack.Screen name="church-fathers" options={{ animation: 'slide_from_right' }} />
              <Stack.Screen name="psalms" options={{ animation: 'slide_from_right' }} />
              <Stack.Screen name="support" options={{ animation: 'slide_from_bottom', presentation: 'modal' }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <Signature />
            <NightOverlay />
            <StatusBar style="auto" />
          </NightModeProvider>
        </ThemeProvider>
      </UserProfileProvider>
    </I18nProvider>
  );
}
