import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Modal,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { getContradictionPuzzle } from "../../../src/data/puzzles/contradiccion/puzzles";
import { ContradictionSentence } from "../../../src/data/puzzles/contradiccion/types";
import { Colors, Radius } from "../../../src/theme";

export default function ContradiccionPlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const puzzle = getContradictionPuzzle(id);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const wrongAnim = useRef(new Animated.Value(0)).current;

  if (!puzzle) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.errorText}>Puzzle no encontrado.</Text>
        <Pressable onPress={() => router.back()} style={styles.primaryBtn}>
          <Text style={styles.primaryBtnLabel}>VOLVER</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const flashWrong = () => {
    setWrong(true);
    Animated.sequence([
      Animated.timing(wrongAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(wrongAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(wrongAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(wrongAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
    setTimeout(() => {
      setWrong(false);
      setSelectedIds([]);
    }, 1500);
  };

  const handleSentencePress = (sentence: ContradictionSentence) => {
    if (solved || wrong) return;
    setSelectedIds((prev) => {
      if (prev.includes(sentence.id)) return prev.filter((i) => i !== sentence.id);
      if (prev.length >= 2) return prev;
      return [...prev, sentence.id];
    });
  };

  const handleAccuse = () => {
    if (selectedIds.length !== 2) return;
    const [a, b] = puzzle.contradictionIds;
    const correct =
      (selectedIds.includes(a) && selectedIds.includes(b));
    if (correct) {
      setSolved(true);
      setShowModal(true);
    } else {
      flashWrong();
    }
  };

  const getBorderColor = (sentenceId: string) => {
    if (solved && puzzle.contradictionIds.includes(sentenceId)) return "#5A8A5F";
    if (wrong && selectedIds.includes(sentenceId)) return Colors.error;
    if (selectedIds.includes(sentenceId)) return Colors.primary;
    return Colors.border;
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.backLabel}>← CASOS</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>CONTRADICCIÓN</Text>
        <Text style={styles.title}>{puzzle.title}</Text>
        <Text style={styles.narrative}>{puzzle.narrative}</Text>

        <Text style={styles.sectionLabel}>SELECCIONÁ DOS ENUNCIADOS</Text>

        <View style={styles.sentenceList}>
          {puzzle.sentences.map((s) => (
            <Pressable
              key={s.id}
              style={[styles.sentenceCard, { borderColor: getBorderColor(s.id) }]}
              onPress={() => handleSentencePress(s)}
            >
              <Text style={styles.sentenceText}>{s.text}</Text>
              {selectedIds.includes(s.id) && (
                <View style={styles.selectedDot} />
              )}
            </Pressable>
          ))}
        </View>

        {selectedIds.length === 2 && !solved && (
          <Pressable
            style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}
            onPress={handleAccuse}
          >
            <Text style={styles.primaryBtnLabel}>⚖️ ACUSAR</Text>
          </Pressable>
        )}

        {wrong && (
          <View style={styles.wrongFeedback}>
            <Text style={styles.wrongText}>Esas frases no se contradicen. Seguí buscando.</Text>
          </View>
        )}

        {solved && (
          <Pressable
            style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.primaryBtnLabel}>VER SOLUCIÓN</Text>
          </Pressable>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEyebrow}>CONTRADICCIÓN RESUELTA</Text>
            <Text style={styles.modalIcon}>✅</Text>
            <Text style={styles.modalTitle}>{puzzle.title}</Text>
            <View style={styles.divider} />
            <Text style={styles.modalLabel}>EXPLICACIÓN</Text>
            <Text style={styles.modalBody}>{puzzle.solutionExplanation}</Text>
            <View style={styles.divider} />
            <Text style={styles.modalLabel}>LA CONTRADICCIÓN</Text>
            <Text style={styles.modalBody}>{puzzle.contradictionExplanation}</Text>
            <Pressable
              style={styles.primaryBtn}
              onPress={() => {
                setShowModal(false);
                router.back();
              }}
            >
              <Text style={styles.primaryBtnLabel}>VOLVER A CASOS</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8 },
  backLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.primary,
  },
  content: { paddingHorizontal: 20, paddingTop: 8 },
  eyebrow: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 3,
    color: Colors.primary,
    marginBottom: 6,
  },
  title: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 26,
    lineHeight: 34,
    color: Colors.text,
    marginBottom: 12,
  },
  narrative: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  sectionLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 2.5,
    color: Colors.textTertiary,
    marginBottom: 12,
  },
  sentenceList: { gap: 10, marginBottom: 20 },
  sentenceCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    padding: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  sentenceText: {
    flex: 1,
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: Colors.text,
  },
  selectedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginTop: 6,
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  btnPressed: { opacity: 0.8, transform: [{ scale: 0.975 }] },
  primaryBtnLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    letterSpacing: 2,
    color: Colors.background,
  },
  wrongFeedback: {
    backgroundColor: "#1A0A0A",
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.error,
    padding: 12,
    marginTop: 8,
  },
  wrongText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: Colors.error,
    lineHeight: 18,
  },
  errorText: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 18,
    color: Colors.text,
    textAlign: "center",
    marginTop: 60,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  modalCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: 28,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.primary + "44",
  },
  modalEyebrow: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 3,
    color: Colors.primary,
    textAlign: "center",
  },
  modalIcon: { fontSize: 36, textAlign: "center" },
  modalTitle: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 22,
    color: Colors.text,
    textAlign: "center",
  },
  modalLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    letterSpacing: 2.5,
    color: Colors.textTertiary,
  },
  modalBody: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  divider: { height: 1, backgroundColor: Colors.border },
});
