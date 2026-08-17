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
import { getDetectivePuzzle } from "../../../src/data/puzzles/detective/puzzles";
import { DetectiveSuspect } from "../../../src/data/puzzles/detective/types";
import { Colors, Radius } from "../../../src/theme";

export default function DetectivePlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const puzzle = getDetectivePuzzle(id);

  const [activeTab, setActiveTab] = useState(0);
  const [accusedId, setAccusedId] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);

  if (!puzzle) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.errorText}>Caso no encontrado.</Text>
        <Pressable onPress={() => router.back()} style={styles.primaryBtn}>
          <Text style={styles.primaryBtnLabel}>VOLVER</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const killer = puzzle.suspects.find((s) => s.id === puzzle.killerId)!;

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

  const handleHint = () => {
    const nextLevel = Math.min(hintLevel + 1, puzzle.hints.length);
    setHintLevel(nextLevel);
    setShowHint(true);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.backLabel}>← CASOS</Text>
        </Pressable>
        <Pressable onPress={handleHint} hitSlop={8} disabled={hintLevel >= puzzle.hints.length}>
          <Text style={[styles.hintBtn, hintLevel >= puzzle.hints.length && styles.hintBtnUsed]}>
            💡 PISTA {hintLevel}/{puzzle.hints.length}
          </Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>CASO POLICIAL</Text>
        <Text style={styles.title}>{puzzle.title}</Text>
        <View style={styles.victimRow}>
          <Text style={styles.victimEmoji}>{puzzle.victim.emoji}</Text>
          <View>
            <Text style={styles.victimName}>{puzzle.victim.name}</Text>
            <Text style={styles.victimRole}>{puzzle.victim.role} — VÍCTIMA</Text>
          </View>
        </View>
        <Text style={styles.story}>{puzzle.story}</Text>

        {showHint && hintLevel > 0 && (
          <View style={styles.hintCard}>
            <Text style={styles.hintLabel}>PISTA {hintLevel}</Text>
            <Text style={styles.hintText}>{puzzle.hints[hintLevel - 1].text}</Text>
            <Pressable onPress={() => setShowHint(false)} hitSlop={8}>
              <Text style={styles.hintClose}>CERRAR ×</Text>
            </Pressable>
          </View>
        )}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabScroll}
          contentContainerStyle={styles.tabRow}
        >
          {puzzle.tabs.map((tab, i) => (
            <Pressable
              key={tab.id}
              onPress={() => setActiveTab(i)}
              style={[styles.tab, activeTab === i && styles.tabActive]}
            >
              <Text style={styles.tabEmoji}>{tab.emoji}</Text>
              <Text style={[styles.tabLabel, activeTab === i && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.tabContent}>
          {puzzle.tabs[activeTab].content.map((line, i) => (
            <View key={i} style={styles.contentLine}>
              <Text style={styles.contentBullet}>—</Text>
              <Text style={styles.contentText}>{line}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionLabel}>ACUSÁ AL CULPABLE</Text>
        {wrong && (
          <View style={styles.wrongCard}>
            <Text style={styles.wrongText}>❌ Esa no es la persona correcta. Revisá el expediente.</Text>
          </View>
        )}
        <View style={styles.suspectGrid}>
          {puzzle.suspects.map((s: DetectiveSuspect) => (
            <Pressable
              key={s.id}
              style={[
                styles.suspectCard,
                accusedId === s.id && styles.suspectCardSelected,
                solved && s.id === puzzle.killerId && styles.suspectCardKiller,
              ]}
              onPress={() => !solved && setAccusedId(s.id)}
            >
              <Text style={styles.suspectEmoji}>{s.emoji}</Text>
              <Text style={styles.suspectName}>{s.name}</Text>
              <Text style={styles.suspectMotive} numberOfLines={2}>{s.motive}</Text>
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
            <Text style={styles.modalEyebrow}>CASO RESUELTO</Text>
            <Text style={styles.modalIcon}>{killer.emoji}</Text>
            <Text style={styles.modalTitle}>{killer.name}</Text>
            <Text style={styles.modalKillerRole}>EL CULPABLE</Text>
            <View style={styles.clueBox}>
              <Text style={styles.clueBoxLabel}>PISTA CLAVE</Text>
              <Text style={styles.clueBoxText}>{puzzle.keyClue}</Text>
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
  hintBtn: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 1.5,
    color: Colors.primary,
  },
  hintBtnUsed: { color: Colors.textTertiary },
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
    marginBottom: 14,
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
  hintCard: {
    backgroundColor: "#0D0A14",
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.primary + "66",
    padding: 14,
    marginBottom: 16,
    gap: 6,
  },
  hintLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    letterSpacing: 2,
    color: Colors.primary,
  },
  hintText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  hintClose: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 1.5,
    color: Colors.textTertiary,
    marginTop: 4,
  },
  tabScroll: { marginBottom: 4 },
  tabRow: { gap: 8, paddingBottom: 12 },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabActive: {
    backgroundColor: Colors.primary + "22",
    borderColor: Colors.primary,
  },
  tabEmoji: { fontSize: 14 },
  tabLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    letterSpacing: 1,
    color: Colors.textSecondary,
  },
  tabLabelActive: { color: Colors.primary },
  tabContent: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    marginBottom: 24,
    gap: 10,
  },
  contentLine: { flexDirection: "row", gap: 8, alignItems: "flex-start" },
  contentBullet: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: Colors.textTertiary,
    marginTop: 1,
  },
  contentText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
    flex: 1,
  },
  sectionLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    letterSpacing: 2.5,
    color: Colors.textTertiary,
    marginBottom: 12,
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
  suspectGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  suspectCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    width: "47%",
    alignItems: "center",
    gap: 4,
  },
  suspectCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + "15",
  },
  suspectCardKiller: {
    borderColor: "#A04D3A",
    backgroundColor: "#A04D3A15",
  },
  suspectEmoji: { fontSize: 28 },
  suspectName: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: Colors.text,
    textAlign: "center",
  },
  suspectMotive: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    lineHeight: 15,
    color: Colors.textTertiary,
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
    gap: 10,
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
  clueBox: {
    backgroundColor: Colors.background,
    borderRadius: Radius.sm,
    padding: 14,
    gap: 4,
  },
  clueBoxLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 8,
    letterSpacing: 2,
    color: Colors.textTertiary,
  },
  clueBoxText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textSecondary,
  },
  divider: { height: 1, backgroundColor: Colors.border },
  modalBody: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
});
