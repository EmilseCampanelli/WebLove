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
import { getEvidenciasPuzzle } from "../../../src/data/puzzles/evidencias/puzzles";
import { EvidenceClass, EvidenceCard } from "../../../src/data/puzzles/evidencias/types";
import { Colors, Radius } from "../../../src/theme";

const CLASS_CONFIG: Record<EvidenceClass, { label: string; color: string; bg: string }> = {
  relevante:   { label: "RELEVANTE",   color: "#5A8A5F", bg: "#5A8A5F33" },
  enganosa:    { label: "ENGAÑOSA",    color: "#9A7830", bg: "#9A783033" },
  irrelevante: { label: "IRRELEVANTE", color: "#555060", bg: "#55506033" },
};

export default function EvidenciasPlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const puzzle = getEvidenciasPuzzle(id);

  const [phase, setPhase] = useState<"classification" | "accusation">("classification");
  const [classifications, setClassifications] = useState<Record<string, EvidenceClass>>({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [accusedId, setAccusedId] = useState<string | null>(null);
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

  const currentCard: EvidenceCard | undefined = puzzle.cards[currentCardIndex];
  const allClassified = Object.keys(classifications).length === puzzle.cards.length;

  const handleClassify = (cls: EvidenceClass) => {
    if (!currentCard) return;
    const updated = { ...classifications, [currentCard.id]: cls };
    setClassifications(updated);
    if (currentCardIndex < puzzle.cards.length - 1) {
      setCurrentCardIndex((i) => i + 1);
    } else {
      setPhase("accusation");
    }
  };

  const handleAccuse = () => {
    if (!accusedId) return;
    if (accusedId === puzzle.killerId) {
      setSolved(true);
      setShowModal(true);
    } else {
      setWrong(true);
      setTimeout(() => {
        setWrong(false);
        setAccusedId(null);
      }, 1500);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.backLabel}>← CASOS</Text>
        </Pressable>
        <View style={styles.phaseChip}>
          <Text style={styles.phaseChipLabel}>
            {phase === "classification" ? "FASE 1: CLASIFICAR" : "FASE 2: ACUSAR"}
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>EVIDENCIAS</Text>
        <Text style={styles.title}>{puzzle.title}</Text>
        <Text style={styles.story}>{puzzle.story}</Text>

        {phase === "classification" && currentCard && (
          <>
            <View style={styles.progressRow}>
              <Text style={styles.progressText}>
                {currentCardIndex + 1} de {puzzle.cards.length} evidencias
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${((currentCardIndex + 1) / puzzle.cards.length) * 100}%` },
                  ]}
                />
              </View>
            </View>

            <View style={styles.evidenceCard}>
              <Text style={styles.evidenceEmoji}>{currentCard.emoji}</Text>
              <Text style={styles.evidenceLabel}>{currentCard.label}</Text>
              <Text style={styles.evidenceDesc}>{currentCard.description}</Text>
            </View>

            <Text style={styles.classifyPrompt}>¿Cómo clasificás esta evidencia?</Text>
            <View style={styles.classifyButtons}>
              {(Object.keys(CLASS_CONFIG) as EvidenceClass[]).map((cls) => {
                const cfg = CLASS_CONFIG[cls];
                return (
                  <Pressable
                    key={cls}
                    style={({ pressed }) => [
                      styles.classifyBtn,
                      { backgroundColor: cfg.bg, borderColor: cfg.color + "88" },
                      pressed && { opacity: 0.8 },
                    ]}
                    onPress={() => handleClassify(cls)}
                  >
                    <Text style={[styles.classifyBtnLabel, { color: cfg.color }]}>{cfg.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          </>
        )}

        {phase === "accusation" && (
          <>
            <Text style={styles.sectionLabel}>TUS CLASIFICACIONES</Text>
            <View style={styles.summaryList}>
              {puzzle.cards.map((card) => {
                const cls = classifications[card.id];
                const cfg = cls ? CLASS_CONFIG[cls] : null;
                return (
                  <View key={card.id} style={styles.summaryRow}>
                    <Text style={styles.summaryEmoji}>{card.emoji}</Text>
                    <Text style={styles.summaryCardLabel}>{card.label}</Text>
                    {cfg && (
                      <View style={[styles.summaryBadge, { backgroundColor: cfg.bg }]}>
                        <Text style={[styles.summaryBadgeLabel, { color: cfg.color }]}>{cfg.label}</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>

            <Text style={styles.sectionLabel}>ACUSÁ AL CULPABLE</Text>
            <View style={styles.suspectList}>
              {puzzle.suspects.map((suspect) => (
                <Pressable
                  key={suspect.id}
                  style={[
                    styles.suspectCard,
                    accusedId === suspect.id && !wrong && { borderColor: Colors.primary },
                    wrong && accusedId === suspect.id && { borderColor: Colors.error },
                    solved && suspect.id === puzzle.killerId && { borderColor: "#5A8A5F" },
                  ]}
                  onPress={() => !solved && setAccusedId(suspect.id)}
                >
                  <Text style={styles.suspectEmoji}>{suspect.emoji}</Text>
                  <View style={styles.suspectInfo}>
                    <Text style={styles.suspectName}>{suspect.name}</Text>
                    <Text style={styles.suspectMotive}>{suspect.motive}</Text>
                  </View>
                  {accusedId === suspect.id && (
                    <Text style={styles.suspectCheck}>◉</Text>
                  )}
                </Pressable>
              ))}
            </View>

            {wrong && (
              <View style={styles.wrongFeedback}>
                <Text style={styles.wrongText}>Acusación incorrecta. Revisá las evidencias.</Text>
              </View>
            )}

            {accusedId && !solved && (
              <Pressable
                style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}
                onPress={handleAccuse}
              >
                <Text style={styles.primaryBtnLabel}>⚖️ ACUSAR FORMALMENTE</Text>
              </Pressable>
            )}
          </>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <ScrollView style={styles.modalScroll} contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalEyebrow}>CASO RESUELTO</Text>
            <Text style={styles.modalIcon}>
              {puzzle.suspects.find((s) => s.id === puzzle.killerId)?.emoji ?? "🔍"}
            </Text>
            <Text style={styles.modalTitle}>
              {puzzle.suspects.find((s) => s.id === puzzle.killerId)?.name}
            </Text>
            <View style={styles.divider} />
            <Text style={styles.modalBody}>{puzzle.solutionExplanation}</Text>
            <View style={styles.divider} />
            <Text style={styles.modalLabel}>CLASIFICACIONES CORRECTAS</Text>
            {puzzle.cards.map((card) => {
              const cfg = CLASS_CONFIG[card.correctClass];
              const userCls = classifications[card.id];
              const correct = userCls === card.correctClass;
              return (
                <View key={card.id} style={styles.modalClassRow}>
                  <Text style={styles.modalClassEmoji}>{card.emoji}</Text>
                  <View style={styles.modalClassInfo}>
                    <Text style={styles.modalClassLabel}>{card.label}</Text>
                    <Text style={styles.modalClassExpl}>{card.explanation}</Text>
                  </View>
                  <View style={[styles.summaryBadge, { backgroundColor: cfg.bg }]}>
                    <Text style={[styles.summaryBadgeLabel, { color: correct ? cfg.color : Colors.error }]}>
                      {cfg.label}
                    </Text>
                  </View>
                </View>
              );
            })}
            <Pressable
              style={[styles.primaryBtn, { marginTop: 16 }]}
              onPress={() => {
                setShowModal(false);
                router.back();
              }}
            >
              <Text style={styles.primaryBtnLabel}>VOLVER A CASOS</Text>
            </Pressable>
            <View style={{ height: 24 }} />
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.primary,
  },
  phaseChip: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  phaseChipLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    letterSpacing: 1.5,
    color: Colors.textSecondary,
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
  story: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  progressRow: { marginBottom: 16, gap: 6 },
  progressText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.textTertiary,
  },
  progressBar: {
    height: 3,
    backgroundColor: Colors.surface,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  evidenceCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 24,
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  evidenceEmoji: { fontSize: 48 },
  evidenceLabel: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 20,
    color: Colors.text,
    textAlign: "center",
  },
  evidenceDesc: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  classifyPrompt: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.textTertiary,
    marginBottom: 12,
    textAlign: "center",
  },
  classifyButtons: { gap: 10, marginBottom: 20 },
  classifyBtn: {
    borderRadius: Radius.md,
    borderWidth: 1,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  classifyBtnLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    letterSpacing: 2,
  },
  sectionLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    letterSpacing: 2.5,
    color: Colors.textTertiary,
    marginBottom: 12,
  },
  summaryList: { gap: 8, marginBottom: 24 },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.surface,
    borderRadius: Radius.sm,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryEmoji: { fontSize: 20 },
  summaryCardLabel: {
    flex: 1,
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: Colors.text,
  },
  summaryBadge: {
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  summaryBadgeLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 8,
    letterSpacing: 1.5,
  },
  suspectList: { gap: 10, marginBottom: 16 },
  suspectCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  suspectEmoji: { fontSize: 28 },
  suspectInfo: { flex: 1 },
  suspectName: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 17,
    color: Colors.text,
  },
  suspectMotive: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: Colors.textSecondary,
  },
  suspectCheck: {
    fontFamily: "Manrope_700Bold",
    fontSize: 18,
    color: Colors.primary,
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
  },
  modalScroll: { flex: 1, marginTop: "auto" },
  modalContent: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: 28,
    borderTopWidth: 1,
    borderColor: Colors.primary + "44",
    gap: 12,
  },
  modalEyebrow: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 3,
    color: Colors.primary,
    textAlign: "center",
  },
  modalIcon: { fontSize: 42, textAlign: "center" },
  modalTitle: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 22,
    color: Colors.text,
    textAlign: "center",
  },
  modalLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    letterSpacing: 2,
    color: Colors.textTertiary,
  },
  modalBody: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  divider: { height: 1, backgroundColor: Colors.border },
  modalClassRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  modalClassEmoji: { fontSize: 20, marginTop: 2 },
  modalClassInfo: { flex: 1, gap: 2 },
  modalClassLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: Colors.text,
  },
  modalClassExpl: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    lineHeight: 17,
    color: Colors.textSecondary,
  },
});
