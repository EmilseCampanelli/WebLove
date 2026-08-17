import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { getCoartadaPuzzle } from "../../../src/data/puzzles/coartada/puzzles";
import { CoartadaItem } from "../../../src/data/puzzles/coartada/types";
import { Colors, Radius } from "../../../src/theme";

export default function CoartadaPlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const puzzle = getCoartadaPuzzle(id);

  const [selectedTestimonyId, setSelectedTestimonyId] = useState<string | null>(null);
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const testimonies = puzzle.items.filter((i) => i.kind === "testimony");
  const evidences = puzzle.items.filter((i) => i.kind === "evidence");
  const bothSelected = selectedTestimonyId !== null && selectedEvidenceId !== null;

  const handleVerify = () => {
    if (!bothSelected) return;
    const [a, b] = puzzle.solutionPairIds;
    const correct =
      (selectedTestimonyId === a && selectedEvidenceId === b) ||
      (selectedTestimonyId === b && selectedEvidenceId === a);
    if (correct) {
      setSolved(true);
      setShowModal(true);
    } else {
      setWrong(true);
      setTimeout(() => {
        setWrong(false);
        setSelectedTestimonyId(null);
        setSelectedEvidenceId(null);
      }, 1500);
    }
  };

  const getItemBorderColor = (item: CoartadaItem) => {
    const isSelected =
      item.kind === "testimony"
        ? selectedTestimonyId === item.id
        : selectedEvidenceId === item.id;
    if (solved && puzzle.solutionPairIds.includes(item.id)) return "#5A8A5F";
    if (wrong && isSelected) return Colors.error;
    if (isSelected) return Colors.primary;
    return Colors.border;
  };

  const handleItemPress = (item: CoartadaItem) => {
    if (solved || wrong) return;
    if (item.kind === "testimony") {
      setSelectedTestimonyId((prev) => (prev === item.id ? null : item.id));
    } else {
      setSelectedEvidenceId((prev) => (prev === item.id ? null : item.id));
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.backLabel}>← CASOS</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>COARTADA</Text>
        <Text style={styles.title}>{puzzle.title}</Text>

        <View style={styles.suspectCard}>
          <Text style={styles.suspectEmoji}>{puzzle.suspect.emoji}</Text>
          <View style={styles.suspectInfo}>
            <Text style={styles.suspectLabel}>SOSPECHOSO/A</Text>
            <Text style={styles.suspectName}>{puzzle.suspect.name}</Text>
            <Text style={styles.suspectRole}>{puzzle.suspect.role}</Text>
          </View>
        </View>

        <Text style={styles.story}>{puzzle.story}</Text>
        <Text style={styles.instructions}>{puzzle.instructions}</Text>

        <View style={styles.columns}>
          <View style={styles.column}>
            <Text style={styles.columnHeader}>TESTIMONIOS</Text>
            {testimonies.map((item) => (
              <Pressable
                key={item.id}
                style={[styles.itemCard, { borderColor: getItemBorderColor(item) }]}
                onPress={() => handleItemPress(item)}
              >
                <Text style={styles.itemKindLabel}>TESTIMONIO</Text>
                <Text style={styles.itemLabel}>{item.label}</Text>
                <Text style={styles.itemContent}>{item.content}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.column}>
            <Text style={styles.columnHeader}>EVIDENCIAS</Text>
            {evidences.map((item) => (
              <Pressable
                key={item.id}
                style={[styles.itemCard, { borderColor: getItemBorderColor(item) }]}
                onPress={() => handleItemPress(item)}
              >
                <Text style={styles.itemKindLabel}>EVIDENCIA</Text>
                <Text style={styles.itemLabel}>{item.label}</Text>
                <Text style={styles.itemContent}>{item.content}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {wrong && (
          <View style={styles.wrongFeedback}>
            <Text style={styles.wrongText}>Ese par no delata la coartada. Intentá de nuevo.</Text>
          </View>
        )}

        {bothSelected && !solved && (
          <Pressable
            style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}
            onPress={handleVerify}
          >
            <Text style={styles.primaryBtnLabel}>🔗 VERIFICAR PAR</Text>
          </Pressable>
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
            <Text style={styles.modalEyebrow}>COARTADA ROTA</Text>
            <Text style={styles.modalIcon}>⚖️</Text>
            <Text style={styles.modalTitle}>{puzzle.title}</Text>
            <View style={styles.divider} />
            <Text style={styles.modalBody}>{puzzle.solutionExplanation}</Text>
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
    marginBottom: 16,
  },
  suspectCard: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  suspectEmoji: { fontSize: 30 },
  suspectInfo: { flex: 1 },
  suspectLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    letterSpacing: 2.5,
    color: Colors.textTertiary,
    marginBottom: 2,
  },
  suspectName: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 17,
    color: Colors.text,
  },
  suspectRole: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: Colors.textSecondary,
  },
  story: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  instructions: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
    fontStyle: "italic",
    marginBottom: 20,
  },
  columns: { flexDirection: "row", gap: 10, marginBottom: 16 },
  column: { flex: 1, gap: 10 },
  columnHeader: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    letterSpacing: 2,
    color: Colors.textTertiary,
    marginBottom: 4,
  },
  itemCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    padding: 12,
    gap: 4,
  },
  itemKindLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 8,
    letterSpacing: 1.5,
    color: Colors.primary,
  },
  itemLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: Colors.text,
  },
  itemContent: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    lineHeight: 16,
    color: Colors.textSecondary,
  },
  wrongFeedback: {
    backgroundColor: "#1A0A0A",
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.error,
    padding: 12,
    marginBottom: 12,
  },
  wrongText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: Colors.error,
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
  modalBody: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  divider: { height: 1, backgroundColor: Colors.border },
});
