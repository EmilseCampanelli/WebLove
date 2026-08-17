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
import { getInterrogatorioPuzzle } from "../../../src/data/puzzles/interrogatorio/puzzles";
import { InterrogatorioSuspect, InterrogatorioQuestion } from "../../../src/data/puzzles/interrogatorio/types";
import { Colors, Radius } from "../../../src/theme";

export default function InterrogatorioPlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const puzzle = getInterrogatorioPuzzle(id);

  const [credits, setCredits] = useState(0);
  const [started, setStarted] = useState(false);
  const [activeSuspectId, setActiveSuspectId] = useState<string | null>(null);
  const [revealedQuestions, setRevealedQuestions] = useState<Record<string, string[]>>({});
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

  if (!started) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Text style={styles.backLabel}>← CASOS</Text>
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.eyebrow}>INTERROGATORIO</Text>
          <Text style={styles.title}>{puzzle.title}</Text>
          <View style={styles.victimRow}>
            <Text style={styles.victimEmoji}>{puzzle.victim.emoji}</Text>
            <View>
              <Text style={styles.victimName}>{puzzle.victim.name}</Text>
              <Text style={styles.victimRole}>{puzzle.victim.role} — VÍCTIMA</Text>
            </View>
          </View>
          <Text style={styles.story}>{puzzle.story}</Text>
          <View style={styles.creditsBox}>
            <Text style={styles.creditsBoxLabel}>CRÉDITOS DISPONIBLES</Text>
            <Text style={styles.creditsBoxNum}>{puzzle.totalCredits}</Text>
            <Text style={styles.creditsBoxSub}>
              Cada pregunta tiene un costo en créditos. Elegí bien.
            </Text>
          </View>
          <Text style={styles.instructions}>{puzzle.instructions}</Text>
          <Pressable
            style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}
            onPress={() => {
              setCredits(puzzle.totalCredits);
              setStarted(true);
              setActiveSuspectId(puzzle.suspects[0]?.id ?? null);
            }}
          >
            <Text style={styles.primaryBtnLabel}>💬 INICIAR INTERROGATORIO</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const activeSuspect = puzzle.suspects.find((s) => s.id === activeSuspectId) ?? puzzle.suspects[0];
  const killer = puzzle.suspects.find((s) => s.id === puzzle.killerId)!;

  const handleAskQuestion = (suspect: InterrogatorioSuspect, question: InterrogatorioQuestion) => {
    if (credits < question.creditCost) return;
    const key = suspect.id;
    const alreadyRevealed = (revealedQuestions[key] ?? []).includes(question.id);
    if (alreadyRevealed) return;
    setCredits((prev) => prev - question.creditCost);
    setRevealedQuestions((prev) => ({
      ...prev,
      [key]: [...(prev[key] ?? []), question.id],
    }));
  };

  const handleAccuse = () => {
    if (!accusedId) return;
    if (accusedId === puzzle.killerId) {
      setSolved(true);
      setShowModal(true);
    } else {
      setWrong(true);
      setTimeout(() => setWrong(false), 1500);
    }
  };

  const revealedForActive = revealedQuestions[activeSuspect.id] ?? [];

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.backLabel}>← CASOS</Text>
        </Pressable>
        <View style={styles.creditsBadge}>
          <Text style={styles.creditsBadgeLabel}>💰 {credits} CRÉDITOS</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>INTERROGATORIO</Text>
        <Text style={styles.title}>{puzzle.title}</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.suspectTabScroll}
          contentContainerStyle={styles.suspectTabRow}
        >
          {puzzle.suspects.map((s) => (
            <Pressable
              key={s.id}
              onPress={() => setActiveSuspectId(s.id)}
              style={[
                styles.suspectTab,
                activeSuspectId === s.id && styles.suspectTabActive,
              ]}
            >
              <Text style={styles.suspectTabEmoji}>{s.emoji}</Text>
              <Text style={[styles.suspectTabName, activeSuspectId === s.id && styles.suspectTabNameActive]}>
                {s.name.split(" ")[0]}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.suspectHeader}>
          <Text style={styles.suspectHeaderEmoji}>{activeSuspect.emoji}</Text>
          <View style={styles.suspectHeaderInfo}>
            <Text style={styles.suspectHeaderName}>{activeSuspect.name}</Text>
            <Text style={styles.suspectHeaderRole}>{activeSuspect.role}</Text>
            <Text style={styles.suspectHeaderMotive}>{activeSuspect.motive}</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>PREGUNTAS DISPONIBLES</Text>
        {activeSuspect.questions.map((q) => {
          const revealed = revealedForActive.includes(q.id);
          const canAfford = credits >= q.creditCost;
          return (
            <View key={q.id} style={styles.questionCard}>
              <View style={styles.questionTopRow}>
                <Text style={[styles.questionText, revealed && styles.questionTextRevealed]}>
                  {q.text}
                </Text>
                {!revealed && (
                  <Pressable
                    onPress={() => handleAskQuestion(activeSuspect, q)}
                    disabled={!canAfford || solved}
                    style={[styles.askBtn, !canAfford && styles.askBtnDisabled]}
                  >
                    <Text style={[styles.askBtnLabel, !canAfford && styles.askBtnLabelDisabled]}>
                      -{q.creditCost}
                    </Text>
                  </Pressable>
                )}
              </View>
              {revealed && (
                <View style={[styles.revealBox, q.isKeyQuestion && styles.revealBoxKey]}>
                  {q.isKeyQuestion && (
                    <Text style={styles.keyQuestionBadge}>🔑 PISTA CLAVE</Text>
                  )}
                  <Text style={styles.revealText}>{q.revealText}</Text>
                </View>
              )}
            </View>
          );
        })}

        <Text style={styles.sectionLabel}>ACUSÁ AL CULPABLE</Text>
        {wrong && (
          <View style={styles.wrongCard}>
            <Text style={styles.wrongText}>❌ Acusación incorrecta. Seguí investigando.</Text>
          </View>
        )}
        <View style={styles.accuseGrid}>
          {puzzle.suspects.map((s) => (
            <Pressable
              key={s.id}
              style={[
                styles.accuseCard,
                accusedId === s.id && styles.accuseCardSelected,
                solved && s.id === puzzle.killerId && styles.accuseCardKiller,
              ]}
              onPress={() => !solved && setAccusedId(s.id)}
            >
              <Text style={styles.accuseEmoji}>{s.emoji}</Text>
              <Text style={styles.accuseName} numberOfLines={1}>{s.name}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.primaryBtn,
            !accusedId && styles.primaryBtnDisabled,
            pressed && accusedId ? styles.btnPressed : null,
          ]}
          onPress={handleAccuse}
          disabled={!accusedId || solved}
        >
          <Text style={[styles.primaryBtnLabel, !accusedId && styles.primaryBtnLabelDisabled]}>
            {accusedId ? "🔍 ACUSAR" : "⏳ SELECCIONÁ UN SOSPECHOSO"}
          </Text>
        </Pressable>

        <View style={{ height: 40 }} />
      </ScrollView>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEyebrow}>CASO CERRADO</Text>
            <Text style={styles.modalIcon}>{killer.emoji}</Text>
            <Text style={styles.modalTitle}>{killer.name}</Text>
            <Text style={styles.modalKillerRole}>EL CULPABLE</Text>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statNum}>{puzzle.totalCredits - credits}</Text>
                <Text style={styles.statLabel}>CRÉDITOS USADOS</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNum}>{credits}</Text>
                <Text style={styles.statLabel}>RESTANTES</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <Text style={styles.modalBody}>{puzzle.solutionExplanation}</Text>
            <Pressable
              style={styles.primaryBtn}
              onPress={() => {
                setShowModal(false);
                router.back();
              }}
            >
              <Text style={styles.primaryBtnLabel}>CERRAR CASO</Text>
            </Pressable>
          </View>
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
  creditsBadge: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.primary + "66",
  },
  creditsBadgeLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 1.5,
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
  victimRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginBottom: 16,
  },
  victimEmoji: { fontSize: 32 },
  victimName: {
    fontFamily: "Manrope_700Bold",
    fontSize: 15,
    color: Colors.text,
  },
  victimRole: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  story: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  creditsBox: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.primary + "55",
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    gap: 4,
  },
  creditsBoxLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    letterSpacing: 2.5,
    color: Colors.textTertiary,
  },
  creditsBoxNum: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 48,
    color: Colors.primary,
    lineHeight: 56,
  },
  creditsBoxSub: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: Colors.textTertiary,
    textAlign: "center",
  },
  instructions: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  suspectTabScroll: { marginBottom: 4 },
  suspectTabRow: { gap: 8, paddingBottom: 12 },
  suspectTab: {
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
    minWidth: 64,
  },
  suspectTabActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + "18",
  },
  suspectTabEmoji: { fontSize: 20 },
  suspectTabName: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 0.5,
    color: Colors.textSecondary,
  },
  suspectTabNameActive: { color: Colors.primary },
  suspectHeader: {
    flexDirection: "row",
    gap: 14,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginBottom: 20,
  },
  suspectHeaderEmoji: { fontSize: 36 },
  suspectHeaderInfo: { flex: 1, gap: 3 },
  suspectHeaderName: {
    fontFamily: "Manrope_700Bold",
    fontSize: 15,
    color: Colors.text,
  },
  suspectHeaderRole: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: Colors.textTertiary,
  },
  suspectHeaderMotive: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    lineHeight: 18,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
  sectionLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    letterSpacing: 2.5,
    color: Colors.textTertiary,
    marginBottom: 10,
  },
  questionCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginBottom: 10,
    gap: 8,
  },
  questionTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  questionText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
    flex: 1,
  },
  questionTextRevealed: { color: Colors.text },
  askBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 42,
    alignItems: "center",
  },
  askBtnDisabled: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  askBtnLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: Colors.background,
  },
  askBtnLabelDisabled: { color: Colors.textTertiary },
  revealBox: {
    backgroundColor: Colors.background,
    borderRadius: Radius.sm,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
  },
  revealBoxKey: {
    borderColor: Colors.primary + "66",
  },
  keyQuestionBadge: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    letterSpacing: 1.5,
    color: Colors.primary,
  },
  revealText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
  wrongCard: {
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
  accuseGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  accuseCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 10,
    alignItems: "center",
    gap: 4,
    minWidth: 80,
  },
  accuseCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + "15",
  },
  accuseCardKiller: {
    borderColor: "#A04D3A",
    backgroundColor: "#A04D3A15",
  },
  accuseEmoji: { fontSize: 24 },
  accuseName: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    color: Colors.text,
    textAlign: "center",
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 8,
  },
  primaryBtnDisabled: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  btnPressed: { opacity: 0.8, transform: [{ scale: 0.975 }] },
  primaryBtnLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    letterSpacing: 2,
    color: Colors.background,
  },
  primaryBtnLabelDisabled: { color: Colors.textSecondary },
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
    fontSize: 24,
    color: Colors.text,
    textAlign: "center",
  },
  modalKillerRole: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    letterSpacing: 2,
    color: "#A04D3A",
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: Radius.sm,
    padding: 14,
    alignItems: "center",
    gap: 4,
  },
  statNum: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 28,
    color: Colors.primary,
  },
  statLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 8,
    letterSpacing: 1.5,
    color: Colors.textTertiary,
  },
  divider: { height: 1, backgroundColor: Colors.border },
  modalBody: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
});
