import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { X, Info, Image as ImageIcon } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useDailySaint } from '@/hooks/useDailySaint';
import { isWallpaperAvailable } from '@/services/WallpaperService';

interface Props {
  onExportPress?: () => void;
}

export function DailySaintWidget({ onExportPress }: Props) {
  const { colors } = useTheme();
  const saint = useDailySaint();
  const [modalVisible, setModalVisible] = useState(false);
  const accent = '#C4954A';
  const wallpaperOk = isWallpaperAvailable();

  const FEAST_LABELS: Record<string, string> = {
    solennité: '✦ Solennité',
    fête: '✦ Fête',
    mémoire: '· Mémoire',
    commémoraison: '· Commémoraison',
  };

  return (
    <>
      <View style={[styles.card, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
        <View style={styles.header}>
          <Text style={[styles.chip, { color: accent, borderColor: 'rgba(196,149,74,0.3)', backgroundColor: 'rgba(196,149,74,0.07)' }]}>
            📅 Saint du jour
          </Text>
          {saint.feastType && (
            <Text style={[styles.feastType, { color: colors.textMuted }]}>
              {FEAST_LABELS[saint.feastType] ?? saint.feastType}
            </Text>
          )}
        </View>

        <Text style={[styles.name, { color: colors.textPrimary }]}>{saint.saint}</Text>
        {saint.life && (
          <Text style={[styles.life, { color: accent }]}>{saint.life}</Text>
        )}
        <Text style={[styles.story, { color: colors.textSecondary }]} numberOfLines={2}>
          {saint.achievement}
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.btn, { borderColor: colors.border }]}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.75}
          >
            <Info size={14} color={accent} />
            <Text style={[styles.btnText, { color: colors.textSecondary }]}>En savoir plus</Text>
          </TouchableOpacity>

          {wallpaperOk && onExportPress && (
            <TouchableOpacity
              style={[styles.btn, styles.btnAccent, { borderColor: 'rgba(196,149,74,0.4)', backgroundColor: 'rgba(196,149,74,0.07)' }]}
              onPress={onExportPress}
              activeOpacity={0.75}
            >
              <ImageIcon size={14} color={accent} />
              <Text style={[styles.btnText, { color: accent }]}>Fond d'écran</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modal, { backgroundColor: colors.bg }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>{saint.saint}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <X size={22} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.modalBody} showsVerticalScrollIndicator={false}>
            {saint.life && (
              <Text style={[styles.modalLife, { color: accent }]}>{saint.life}</Text>
            )}
            <Text style={[styles.modalSection, { color: colors.textMuted }]}>VIE ET ŒUVRE</Text>
            <Text style={[styles.modalText, { color: colors.textSecondary }]}>{saint.story}</Text>
            <Text style={[styles.modalSection, { color: colors.textMuted }]}>ACCOMPLISSEMENT</Text>
            <Text style={[styles.modalText, { color: colors.textSecondary }]}>{saint.achievement}</Text>
            <View style={[styles.anecdoteBox, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
              <Text style={[styles.anecdoteLabel, { color: accent }]}>✦ Anecdote mémorable</Text>
              <Text style={[styles.anecdoteText, { color: colors.textSecondary }]}>{saint.anecdote}</Text>
            </View>
            {saint.link && (
              <Text style={[styles.link, { color: colors.textMuted }]}>{saint.link}</Text>
            )}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 12 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  chip: { fontFamily: 'Lato_700Bold', fontSize: 11, letterSpacing: 0.5, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, borderWidth: 1 },
  feastType: { fontFamily: 'Lato_400Regular', fontSize: 10, fontStyle: 'italic' },
  name: { fontFamily: 'Cinzel_700Bold', fontSize: 18, marginBottom: 2 },
  life: { fontFamily: 'Lato_400Regular', fontSize: 12, marginBottom: 6, fontStyle: 'italic' },
  story: { fontFamily: 'Lato_400Regular', fontSize: 13, lineHeight: 20, marginBottom: 14 },
  actions: { flexDirection: 'row', gap: 10 },
  btn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, borderWidth: 1 },
  btnAccent: {},
  btnText: { fontFamily: 'Lato_700Bold', fontSize: 12 },
  modal: { flex: 1, paddingTop: 16 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 16 },
  modalTitle: { fontFamily: 'Cinzel_700Bold', fontSize: 20, flex: 1 },
  modalBody: { paddingHorizontal: 20, paddingBottom: 40 },
  modalLife: { fontFamily: 'Lato_400Regular', fontSize: 13, fontStyle: 'italic', marginBottom: 20 },
  modalSection: { fontFamily: 'Lato_400Regular', fontSize: 10, letterSpacing: 2, marginBottom: 8, marginTop: 12 },
  modalText: { fontFamily: 'Lato_400Regular', fontSize: 14, lineHeight: 22 },
  anecdoteBox: { borderRadius: 14, borderWidth: 1, padding: 16, marginTop: 20 },
  anecdoteLabel: { fontFamily: 'Cinzel_700Bold', fontSize: 13, marginBottom: 8 },
  anecdoteText: { fontFamily: 'Lato_400Regular', fontStyle: 'italic', fontSize: 14, lineHeight: 22 },
  link: { fontFamily: 'Lato_400Regular', fontStyle: 'italic', fontSize: 12, marginTop: 16, lineHeight: 20 },
});
