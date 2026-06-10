import { Platform, NativeModules } from 'react-native';
import { AsyncStorage_like } from '@/context/storage';

export type ProductId =
  | 'olivia_premium_monthly'
  | 'olivia_premium_lifetime'
  | 'tip_small'
  | 'tip_medium'
  | 'tip_large';

export interface PurchaseResult {
  success: boolean;
  error?: string;
}

export interface LivePrice {
  priceString: string; // prix localisé prêt à afficher (ex. "19,99 €")
  price: number;       // valeur numérique, pour les calculs (ex. 19.99)
}

const RC_KEY_IOS     = process.env.EXPO_PUBLIC_RC_KEY_IOS_OLIVIA     ?? '';
const RC_KEY_ANDROID = process.env.EXPO_PUBLIC_RC_KEY_ANDROID_OLIVIA ?? '';
const PREMIUM_ENTITLEMENT = 'premium';
const CACHE_KEY = 'olivia_rc_premium_v1';

function getActiveKey(): string {
  return Platform.OS === 'ios' ? RC_KEY_IOS : RC_KEY_ANDROID;
}

function isRCAvailable(): boolean {
  if (Platform.OS === 'web') return false;
  return !!NativeModules.RNPurchases && getActiveKey().length > 10;
}

type PremiumListener = (isPremium: boolean) => void;
let _rcListeners: PremiumListener[] = [];

const MockStore = {
  async purchase(_productId: ProductId): Promise<PurchaseResult> {
    await new Promise((r) => setTimeout(r, 800));
    if (_productId.startsWith('olivia_premium')) {
      AsyncStorage_like.set(CACHE_KEY, 'true');
      _rcListeners.forEach((fn) => fn(true));
      return { success: true };
    }
    return { success: true };
  },
  async restore(): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 600));
    return false;
  },
};

export const StoreService = {
  async configure(): Promise<void> {
    if (!isRCAvailable()) return;
    try {
      const Purchases = require('react-native-purchases').default;
      Purchases.configure({ apiKey: getActiveKey() });

      const cached = AsyncStorage_like.get(CACHE_KEY) === 'true';

      const info = await Purchases.getCustomerInfo();
      const active = !!info.entitlements.active[PREMIUM_ENTITLEMENT];

      if (active !== cached) {
        AsyncStorage_like.set(CACHE_KEY, String(active));
        _rcListeners.forEach((fn) => fn(active));
      }

      Purchases.addCustomerInfoUpdateListener((info: any) => {
        const isPremium = !!info.entitlements.active[PREMIUM_ENTITLEMENT];
        AsyncStorage_like.set(CACHE_KEY, String(isPremium));
        _rcListeners.forEach((fn) => fn(isPremium));
      });
    } catch {}
  },

  async purchase(productId: ProductId): Promise<PurchaseResult> {
    if (!isRCAvailable()) return MockStore.purchase(productId);
    try {
      const Purchases = require('react-native-purchases').default;
      const offerings = await Purchases.getOfferings();
      const pkg = offerings.current?.availablePackages?.find(
        (p: any) => p.product.identifier === productId
      );
      if (!pkg) return { success: false, error: 'Produit introuvable' };
      await Purchases.purchasePackage(pkg);
      const info = await Purchases.getCustomerInfo();
      const isPremium = !!info.entitlements.active[PREMIUM_ENTITLEMENT];
      if (isPremium) AsyncStorage_like.set(CACHE_KEY, 'true');
      return { success: isPremium };
    } catch (e: any) {
      if (e?.userCancelled) return { success: false, error: 'Annulé' };
      return { success: false, error: e?.message ?? 'Erreur inconnue' };
    }
  },

  // Prix live depuis RevenueCat (source de vérité = ASC). {} hors RC (Expo Go/web/mock),
  // où le paywall retombe sur ses fallbacks alignés.
  async getLivePrices(): Promise<Partial<Record<ProductId, LivePrice>>> {
    if (!isRCAvailable()) return {};
    try {
      const Purchases = require('react-native-purchases').default;
      const offerings = await Purchases.getOfferings();
      const pkgs = offerings.current?.availablePackages ?? [];
      const out: Partial<Record<ProductId, LivePrice>> = {};
      for (const p of pkgs) {
        const id = p.product.identifier as ProductId;
        out[id] = { priceString: p.product.priceString, price: p.product.price };
      }
      return out;
    } catch {
      return {};
    }
  },

  async restore(): Promise<boolean> {
    if (!isRCAvailable()) return MockStore.restore();
    try {
      const Purchases = require('react-native-purchases').default;
      const info = await Purchases.restorePurchases();
      const isPremium = !!info.entitlements.active[PREMIUM_ENTITLEMENT];
      if (isPremium) AsyncStorage_like.set(CACHE_KEY, 'true');
      return isPremium;
    } catch {
      return false;
    }
  },

  isPremiumActive(): boolean {
    return AsyncStorage_like.get(CACHE_KEY) === 'true';
  },

  onPremiumChange(fn: PremiumListener): () => void {
    _rcListeners.push(fn);
    return () => {
      _rcListeners = _rcListeners.filter((l) => l !== fn);
    };
  },

};
