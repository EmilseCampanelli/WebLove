import React, { useState, useEffect } from "react";
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
import { getCronologiaPuzzle } from "../../../src/data/puzzles/cronologia/puzzles";
import { CronologiaEvent } from "../../../src/data/puzzles/cronologia/types";
import { Colors, Radius } from "../../../src/theme";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function CronologiaPlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const puzzle = getCronologiaPuzzle(id);

  const [events, setEvents] = useState<CronologiaEvent[]>([]);
  const [phase, setPhase] = useState<"ordering" | "impossible">("ordering");
  const [impossibleId, setImpossibleId] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (puzzle) setEvents(shuffle(puzzle.events));
  }, [puzzle?.id]);

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

  const moveUp = (index: number) => {
    if (index === 0) return;
    setEvents((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };

  const moveDown = (index: number) => {
    if (index === events.length - 1) return;
    setEvents((prev) => {
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  };

  const handleVerify = () => {
    if (!impossibleId) return;
    const orderCorrect = events.every((e, i) => e.correctPosition === i + 1);
    const impossibleCorrect = impossibleId === puzzle.impossibleEventId;
    if (orderCorrect && impossibleCorrect) {
      setSolved(true);
      setShowModal(true);
    } else {
      setWrong(true);
      setTimeout(() => setWrong(false), 1500);
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
            {phase === "ordering" ? "FASE 1: ORDENAR" : "FASE 2: IMPOSIBLE"}
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>CRONOLOGÍA</Text>
        <Text style={styles.title}>{puzzle.title}</Text>
        <Text style={styles.story}>{puzzle.story}</Text>
        <Text style={styles.instructions}>{puzzle.instructions}</Text>

        {phase === "ordering" && (
          <>
            <Text style={styles.sectionLabel}>ORDENÁ LOS EVENTOS (ARRASTRÁ CON LAS FLECHAS)</Text>
            <View style={styles.eventList}>
              {events.map((event, index) => (
                <View key={event.id} style={styles.eventRow}>
                  <View style={styles.eventPosition}>
                    <Text style={styles.eventPositionText}>{index + 1}</Text>
                  </View>
                  <View style={styles.eventCard}>
                    <Text style={styles.eventText}>{event.text}</Text>
                  </View>
                  <View style={styles.arrowButtons}>
                    <Pressable
                      style={[styles.arrowBtn, index === 0 && styles.arrowBtnDisabled]}
                      onPress={() => moveUp(index)}
                      disabled={index === 0}
                    >
                      <Text style={styles.arrowBtnLabel}>▲</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.arrowBtn, index === events.length - 1 && styles.arrowBtnDisabled]}
                      onPress={() => moveDown(index)}
                      disabled={index === events.length - 1}
                    >
                      <Text style={styles.arrowBtnLabel}>▼</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
            <Pressable
              style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}
              onPress={() => setPhase("impossible")}
            >
              <Text style={styles.primaryBtnLabel}>MARCAR IMPOSIBLE →</Text>
            </Pressable>
          </>
        )}

        {phase === "impossible" && (
          <>
            <Text style={styles.sectionLabel}>¿CUÁL EVENTO ES IMPOSIBLE?</Text>
            <View style={styles.eventList}>
              {events.map((event, index) => (
                <Pressable
                  key={event.id}
                  style={[
                    styles.impossibleCard,
                    impossibleId === event.id && !wrong && { borderColor: Colors.primary },
                    wrong && impossibleId === event.id && { borderColor: Colors.error },
                    solved && event.id === puzzle.impossibleEventId && { borderColor: "#5A8A5F" },
                  ]}
                  onPress={() => !solved && setImpossibleId(event.id)}
                >
                  <Text style={styles.impossiblePosition}>{index + 1}</Text>
                  <Text style={styles.impossibleText}>{event.text}</Text>
                  {impossibleId === event.id && (
                    <Text style={styles.impossibleCheck}>✗</Text>
                  )}
                </Pressable>
              ))}
            </View>

            <Pressable
              style={[styles.secondaryBtn]}
              onPress={() => setPhase("ordering")}
            >
              <Text style={styles.secondaryBtnLabel}>← REORDENAR</Text>
            </Pressable>

            {wrong && (
              <View style={styles.wrongFeedback}>
                <Text style={styles.wrongText}>
                  {impossibleId !== puzzle.impossibleEventId
                    ? "Ese evento no es imposible."
                    : "El orden no es correcto."}{" "}
                  Revisá el relato.
                </Text>
              </View>
            )}

            {impossibleId && !solved && (
              <Pressable
                style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}
                onPress={handleVerify}
              >
                <Text style={styles.primaryBtnLabel}>⚠️ VERIFICAR</Text>
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
          </>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEyebrow}>CRONOLOGÍA RESUELTA</Text>
            <Text style={styles.modalIcon}>📅</Text>
            <Text style={styles.modalTitle}>{puzzle.title}</Text>
            <View style={styles.divider} />
            <Text style={styles.modalLabel}>EVENTO IMPOSIBLE</Text>
            <Text style={styles.modalBody}>{puzzle.impossibleReason}</Text>
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
  sectionLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    letterSpacing: 2,
    color: Colors.textTertiary,
    marginBottom: 12,
  },
  eventList: { gap: 8, marginBottom: 16 },
  eventRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  eventPosition: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  eventPositionText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: Colors.primary,
  },
  eventCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
  },
  eventText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    lineHeight: 19,
    color: Colors.text,
  },
  arrowButtons: { gap: 4 },
  arrowBtn: {
    width: 30,
    height: 30,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  arrowBtnDisabled: { opacity: 0.3 },
  arrowBtnLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    color: Colors.primary,
  },
  impossibleCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  impossiblePosition: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: Colors.textTertiary,
    width: 20,
  },
  impossibleText: {
    flex: 1,
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    lineHeight: 19,
    color: Colors.text,
  },
  impossibleCheck: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
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
  secondaryBtn: {
    borderRadius: Radius.md,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  secondaryBtnLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    letterSpacing: 1.5,
    color: Colors.textSecondary,
  },
  wrongFeedback: {
    backgroundColor: "#1A0A0A",
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.error,
    padding: 12,
    marginBottom: 8,
  },
  wrongText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: Colors.error,
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
});
