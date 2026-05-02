import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { JournalEntry } from '@/hooks/usePractice';

const QUESTIONS = [
  "Qu'est-ce qui m'a rapproché de Dieu aujourd'hui ?",
  'Un moment de grâce reçu',
  'Comment ai-je servi mon prochain ?',
  'Un texte spirituel qui m\'a touché',
  'Ma demande du soir',
  'Ce pour quoi je rends grâce',
];

interface SpiritualJournalProps {
  entries: JournalEntry[];
  onAdd: (e: Omit<JournalEntry, 'id'>) => void;
  onDelete: (id: string) => void;
}

export function SpiritualJournal({ entries, onAdd, onDelete }: SpiritualJournalProps) {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [questionPickerOpen, setQuestionPickerOpen] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const handleSave = () => {
    if (!answer.trim()) return;
    onAdd({
      date: today,
      question: QUESTIONS[selectedQuestion],
      answer: answer.trim(),
    });
    setAnswer('');
    setSelectedQuestion(0);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setAnswer('');
    setSelectedQuestion(0);
    setModalVisible(false);
  };

  const visibleEntries = entries.slice(0, 10);

  return (
    <View>
      {/* New entry button */}
      <TouchableOpacity
        style={[styles.newEntryBtn, { borderColor: colors.borderAccent, backgroundColor: colors.bgSection }]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={[styles.newEntryBtnTxt, { color: colors.textAccent, fontFamily: 'Lato_700Bold' }]}>
          + Nouvelle entrée
        </Text>
      </TouchableOpacity>

      {/* Entries list */}
      {visibleEntries.length === 0 ? (
        <View style={[styles.emptyBox, { borderColor: colors.border }]}>
          <Text style={[styles.emptyTxt, { color: colors.textMuted, fontFamily: 'Lato_400Regular' }]}>
            Votre journal spirituel est vide. Commencez à noter vos réflexions.
          </Text>
        </View>
      ) : (
        visibleEntries.map((entry) => (
          <View
            key={entry.id}
            style={[styles.entryCard, { backgroundColor: colors.bgSection, borderColor: colors.border }]}
          >
            <View style={styles.entryHeader}>
              <Text style={[styles.entryDate, { color: colors.textAccent, fontFamily: 'Lato_700Bold' }]}>
                {formatDate(entry.date)}
              </Text>
              <TouchableOpacity
                onPress={() => onDelete(entry.id)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={[styles.deleteBtn, { color: colors.textMuted }]}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={[styles.entryQuestion, { color: colors.textSecondary, fontFamily: 'Lato_700Bold' }]}
              numberOfLines={1}
            >
              {entry.question}
            </Text>
            <Text
              style={[styles.entryAnswer, { color: colors.textPrimary, fontFamily: 'Lato_400Regular' }]}
              numberOfLines={2}
            >
              {entry.answer}
            </Text>
          </View>
        ))
      )}

      {/* Add entry modal */}
      <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={[styles.modalRoot, { backgroundColor: colors.bg }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <TouchableOpacity onPress={handleCancel} activeOpacity={0.7}>
              <Text style={[styles.modalCancelTxt, { color: colors.textMuted, fontFamily: 'Lato_400Regular' }]}>
                Annuler
              </Text>
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: colors.textPrimary, fontFamily: 'Cinzel_700Bold' }]}>
              Nouvelle entrée
            </Text>
            <TouchableOpacity onPress={handleSave} activeOpacity={0.7}>
              <Text style={[styles.modalSaveTxt, { color: colors.textAccent, fontFamily: 'Lato_700Bold' }]}>
                Sauver
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody} contentContainerStyle={styles.modalBodyContent}>
            {/* Question picker */}
            <Text style={[styles.fieldLabel, { color: colors.textSecondary, fontFamily: 'Lato_700Bold' }]}>
              Question
            </Text>
            <TouchableOpacity
              style={[styles.pickerBtn, { backgroundColor: colors.bgInput, borderColor: colors.border }]}
              onPress={() => setQuestionPickerOpen((prev) => !prev)}
              activeOpacity={0.8}
            >
              <Text
                style={[styles.pickerBtnTxt, { color: colors.textPrimary, fontFamily: 'Lato_400Regular' }]}
                numberOfLines={2}
              >
                {QUESTIONS[selectedQuestion]}
              </Text>
              <Text style={[styles.pickerChevron, { color: colors.textMuted }]}>
                {questionPickerOpen ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>

            {questionPickerOpen && (
              <View style={[styles.pickerDropdown, { backgroundColor: colors.bgCard, borderColor: colors.border }]}>
                {QUESTIONS.map((q, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.pickerOption,
                      { borderBottomColor: colors.border },
                      i === selectedQuestion && { backgroundColor: colors.bgSection },
                    ]}
                    onPress={() => {
                      setSelectedQuestion(i);
                      setQuestionPickerOpen(false);
                    }}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.pickerOptionTxt,
                        {
                          color: i === selectedQuestion ? colors.textAccent : colors.textPrimary,
                          fontFamily: 'Lato_400Regular',
                        },
                      ]}
                    >
                      {q}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Answer input */}
            <Text style={[styles.fieldLabel, { color: colors.textSecondary, fontFamily: 'Lato_700Bold', marginTop: 20 }]}>
              Ma réponse
            </Text>
            <TextInput
              style={[
                styles.answerInput,
                {
                  backgroundColor: colors.bgInput,
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  fontFamily: 'Lato_400Regular',
                },
              ]}
              multiline
              numberOfLines={6}
              placeholder="Écrivez votre réflexion..."
              placeholderTextColor={colors.textMuted}
              value={answer}
              onChangeText={setAnswer}
              textAlignVertical="top"
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  newEntryBtn: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderStyle: 'dashed',
  },
  newEntryBtnTxt: { fontSize: 14, letterSpacing: 0.3 },
  emptyBox: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  emptyTxt: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
  entryCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  entryDate: { fontSize: 12, letterSpacing: 0.3, textTransform: 'capitalize' },
  deleteBtn: { fontSize: 14 },
  entryQuestion: { fontSize: 12, marginBottom: 4, letterSpacing: 0.2 },
  entryAnswer: { fontSize: 14, lineHeight: 20 },
  // Modal
  modalRoot: { flex: 1 },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  modalTitle: { fontSize: 15, letterSpacing: 0.5 },
  modalCancelTxt: { fontSize: 15 },
  modalSaveTxt: { fontSize: 15 },
  modalBody: { flex: 1 },
  modalBodyContent: { padding: 20, paddingBottom: 40 },
  fieldLabel: { fontSize: 13, letterSpacing: 0.3, marginBottom: 8 },
  pickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  pickerBtnTxt: { flex: 1, fontSize: 14, lineHeight: 20 },
  pickerChevron: { fontSize: 11, marginLeft: 8 },
  pickerDropdown: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 4,
    overflow: 'hidden',
  },
  pickerOption: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  pickerOptionTxt: { fontSize: 14, lineHeight: 20 },
  answerInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    lineHeight: 22,
    minHeight: 140,
  },
});
