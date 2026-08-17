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
import { getMurdokuPuzzle } from "../../../src/data/puzzles/murdoku/puzzles";
import { MurdokuBoard } from "../../../src/components/puzzles/MurdokuBoard";
import { Colors, Radius } from "../../../src/theme";

export default function MurdokuPlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const puzzle = getMurdokuPuzzle(id);

  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [selectedSuspectId, setSelectedSuspectId] = useState<string | null>(null);
  const [wrongRoomIds, setWrongRoomIds] = useState<string[]>([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [solved, setSolved] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [verifyAttempts, setVerifyAttempts] = useState(0);

  if (!puzzle) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.errorText}>Puzzle no encontrado.</Text>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnLabel}>VOLVER</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const handleSuspectPress = (suspectId: string) => {
    if (solved) return;
    setSelectedSuspectId((prev) => (prev === suspectId ? null : suspectId));
    setWrongRoomIds([]);
  };

  const handleRoomPress = (roomId: string) => {
    if (!selectedSuspectId || solved) return;

    const room = puzzle.rooms.find((r) => r.id === roomId);
    if (!room || room.blocked) return;

    setPlacements((prev) => {
      const updated = { ...prev };
      // Remove previous assignment of this suspect
      const existing = updated[selectedSuspectId];
      if (existing) delete updated[selectedSuspectId];
      // Remove any suspect previously in this room
      for (const [sid, rid] of Object.entries(updated)) {
        if (rid === roomId) delete updated[sid];
      }
      updated[selectedSuspectId] = roomId;
      return updated;
    });

    setWrongRoomIds([]);
  };

  const handleVerify = () => {
    const allPlaced = puzzle.suspects.every((s) => placements[s.id] != null);
    if (!allPlaced) return;

    const wrong: string[] = [];
    for (const suspect of puzzle.suspects) {
      if (placements[suspect.id] !== suspect.roomId) {
        wrong.push(placements[suspect.id]);
      }
    }

    setVerifyAttempts((a) => a + 1);

    if (wrong.length === 0) {
      setSolved(true);
      setShowSolution(true);
    } else {
      setWrongRoomIds(wrong);
    }
  };

  const allPlaced = puzzle.suspects.every((s) => placements[s.id] != null);
  const currentHint = puzzle.hints[hintsUsed];

  const difficultyColor: Record<string, string> = {
    facil: "#5A8A5F",
    medio: "#9A7830",
    dificil: "#A04D3A",
    experto: "#6B5090",
  };

  const difficultyLabel: Record<string, string> = {
    facil: "FÁCIL",
    medio: "MEDIO",
    dificil: "DIFÍCIL",
    experto: "EXPERTO",
  };

  return (
    <SafeAreaView style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={12}>
          <Text style={styles.backBtnLabel}>← CASOS</Text>
        </Pressable>
        <View style={[styles.diffBadge, { backgroundColor: difficultyColor[puzzle.difficulty] + "33" }]}>
          <Text style={[styles.diffBadgeLabel, { color: difficultyColor[puzzle.difficulty] }]}>
            {difficultyLabel[puzzle.difficulty]}
          </Text>
        </View>
        <Pressable
          style={styles.hintBtn}
          onPress={() => setShowHint(true)}
          disabled={hintsUsed >= puzzle.hints.length}
          hitSlop={12}
        >
          <Text style={[styles.hintBtnLabel, hintsUsed >= puzzle.hints.length && styles.hintBtnDisabled]}>
            💡 {puzzle.hints.length - hintsUsed}
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Title block */}
        <View style={styles.titleBlock}>
          <Text style={styles.eyebrow}>CASO MURDOKU</Text>
          <Text style={styles.title}>{puzzle.title}</Text>
          <Text style={styles.story}>{puzzle.story}</Text>
        </View>

        {/* Victim card */}
        <View style={styles.victimCard}>
          <Text style={styles.victimEmoji}>{puzzle.victim.emoji}</Text>
          <View style={styles.victimInfo}>
            <Text style={styles.victimLabel}>VÍCTIMA</Text>
            <Text style={styles.victimName}>{puzzle.victim.name}</Text>
            <Text style={styles.victimRole}>{puzzle.victim.role}</Text>
          </View>
          <View style={styles.victimSkull}>
            <Text style={styles.victimSkullEmoji}>💀</Text>
          </View>
        </View>

        {/* Instructions */}
        <Text style={styles.instructions}>{puzzle.instructions}</Text>

        {/* Board */}
        <MurdokuBoard
          rooms={puzzle.rooms}
          suspects={puzzle.suspects}
          gridCols={puzzle.gridCols}
          gridRows={puzzle.gridRows}
          victimRoomId={puzzle.victim.roomId}
          selectedSuspectId={selectedSuspectId}
          placements={placements}
          wrongRoomIds={wrongRoomIds}
          solved={solved}
          onRoomPress={handleRoomPress}
          onSuspectPress={handleSuspectPress}
        />

        {/* Wrong feedback */}
        {wrongRoomIds.length > 0 && !solved && (
          <View style={styles.feedbackWrong}>
            <Text style={styles.feedbackWrongText}>
              Hay {wrongRoomIds.length} ubicación{wrongRoomIds.length > 1 ? "es" : ""} incorrecta{wrongRoomIds.length > 1 ? "s" : ""}.
              Las celdas en rojo están mal. Revisá las pistas.
            </Text>
          </View>
        )}

        {/* Verify button */}
        {!solved && (
          <Pressable
            style={({ pressed }) => [
              styles.verifyBtn,
              !allPlaced && styles.verifyBtnDisabled,
              pressed && allPlaced && styles.verifyBtnPressed,
            ]}
            onPress={handleVerify}
            disabled={!allPlaced}
          >
            <Text style={[styles.verifyBtnLabel, !allPlaced && styles.verifyBtnLabelDisabled]}>
              {allPlaced
                ? "🔍 VERIFICAR UBICACIONES"
                : `⏳ FALTAN ${puzzle.suspects.filter((s) => !placements[s.id]).length} POR UBICAR`}
            </Text>
          </Pressable>
        )}

        {solved && (
          <Pressable
            style={({ pressed }) => [styles.verifyBtn, pressed && styles.verifyBtnPressed]}
            onPress={() => setShowSolution(true)}
          >
            <Text style={styles.verifyBtnLabel}>VER SOLUCIÓN</Text>
          </Pressable>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Hint modal */}
      <Modal visible={showHint} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEyebrow}>PISTA {hintsUsed + 1} DE {puzzle.hints.length}</Text>
            <Text style={styles.modalTitle}>💡</Text>
            <Text style={styles.modalBody}>{currentHint?.text ?? "No hay más pistas."}</Text>
            <Pressable
              style={styles.modalBtn}
              onPress={() => {
                if (hintsUsed < puzzle.hints.length) setHintsUsed((h) => h + 1);
                setShowHint(false);
              }}
            >
              <Text style={styles.modalBtnLabel}>ENTENDIDO</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Solution modal */}
      <Modal visible={showSolution} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.solutionCard}>
            <Text style={styles.solutionEyebrow}>CASO RESUELTO</Text>
            <Text style={styles.solutionKillerEmoji}>
              {puzzle.suspects.find((s) => s.id === puzzle.killerId)?.emoji ?? "🔍"}
            </Text>
            <Text style={styles.solutionKillerName}>
              {puzzle.suspects.find((s) => s.id === puzzle.killerId)?.name}
            </Text>
            <Text style={styles.solutionKillerRole}>
              {puzzle.suspects.find((s) => s.id === puzzle.killerId)?.role}
            </Text>
            <View style={styles.solutionDivider} />
            <Text style={styles.solutionExplanation}>{puzzle.solutionExplanation}</Text>
            {verifyAttempts > 0 && (
              <Text style={styles.solutionStat}>
                Intentos: {verifyAttempts} · Pistas usadas: {hintsUsed}
              </Text>
            )}
            <Pressable
              style={styles.modalBtn}
              onPress={() => {
                setShowSolution(false);
                router.back();
              }}
            >
              <Text style={styles.modalBtnLabel}>VOLVER A CASOS</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    justifyContent: "space-between",
  },
  backBtn: {
    paddingVertical: 6,
    paddingHorizontal: 2,
  },
  backBtnLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.primary,
  },
  diffBadge: {
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  diffBadgeLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 2,
  },
  hintBtn: {
    paddingVertical: 6,
    paddingHorizontal: 2,
  },
  hintBtnLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: Colors.primary,
  },
  hintBtnDisabled: {
    color: Colors.textTertiary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  titleBlock: {
    marginBottom: 20,
  },
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
  },
  victimCard: {
    flexDirection: "row",
    backgroundColor: "#1A0F0A",
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: "#8B4513",
    padding: 14,
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  victimEmoji: {
    fontSize: 32,
  },
  victimInfo: {
    flex: 1,
  },
  victimLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    letterSpacing: 2.5,
    color: "#8B4513",
    marginBottom: 2,
  },
  victimName: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 17,
    color: Colors.text,
  },
  victimRole: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: Colors.textSecondary,
  },
  victimSkull: {
    opacity: 0.6,
  },
  victimSkullEmoji: {
    fontSize: 24,
  },
  instructions: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
    marginBottom: 20,
    fontStyle: "italic",
  },
  feedbackWrong: {
    backgroundColor: "#1A0A0A",
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.error,
    padding: 12,
    marginTop: 12,
  },
  feedbackWrongText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: Colors.error,
    lineHeight: 18,
  },
  verifyBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  verifyBtnDisabled: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  verifyBtnLabelDisabled: {
    color: Colors.textSecondary,
  },
  verifyBtnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.975 }],
  },
  verifyBtnLabel: {
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: 28,
    alignItems: "center",
    width: "100%",
    gap: 12,
  },
  modalEyebrow: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 3,
    color: Colors.primary,
  },
  modalTitle: {
    fontSize: 36,
  },
  modalBody: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 17,
    lineHeight: 26,
    color: Colors.text,
    textAlign: "center",
  },
  modalBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  modalBtnLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    letterSpacing: 2,
    color: Colors.background,
  },
  solutionCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: 28,
    alignItems: "center",
    marginHorizontal: 24,
    marginTop: "auto",
    marginBottom: 24,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.primary + "44",
  },
  solutionEyebrow: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 3,
    color: Colors.primary,
    marginBottom: 4,
  },
  solutionKillerEmoji: {
    fontSize: 48,
  },
  solutionKillerName: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 24,
    color: Colors.text,
    textAlign: "center",
  },
  solutionKillerRole: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  solutionDivider: {
    height: 1,
    backgroundColor: Colors.border,
    width: "100%",
    marginVertical: 8,
  },
  solutionExplanation: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  solutionStat: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    letterSpacing: 1.5,
    color: Colors.primary,
    marginTop: 4,
  },
});
