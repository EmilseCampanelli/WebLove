import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { getCifradoPuzzle } from "../../../src/data/puzzles/cifrado/puzzles";
import { Colors, Radius } from "../../../src/theme";

export default function CifradoPlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const puzzle = getCifradoPuzzle(id);

  const [answer, setAnswer] = useState("");
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

  const handleVerify = () => {
    const correct = answer.trim().toLowerCase() === puzzle.answer.trim().toLowerCase();
    if (correct) {
      setSolved(true);
      setShowModal(true);
    } else {
      setWrong(true);
      setTimeout(() => setWrong(false), 1500);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Text style={styles.backLabel}>← CASOS</Text>
          </Pressable>
          <View style={styles.cipherChip}>
            <Text style={styles.cipherChipLabel}>{puzzle.cipherName}</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <Text style={styles.eyebrow}>CIFRADO</Text>
          <Text style={styles.title}>{puzzle.title}</Text>
          <Text style={styles.story}>{puzzle.story}</Text>

          <Text style={styles.sectionLabel}>MÉTODO DE CIFRADO</Text>
          <View style={styles.cipherDescCard}>
            <Text style={styles.cipherDescText}>{puzzle.cipherDescription}</Text>
          </View>

          <Text style={styles.sectionLabel}>MENSAJE CIFRADO</Text>
          <View style={styles.encodedCard}>
            <Text style={styles.encodedText}>{puzzle.encodedMessage}</Text>
          </View>

          <Text style={styles.sectionLabel}>TU RESPUESTA</Text>
          <TextInput
            style={[
              styles.input,
              wrong && styles.inputWrong,
              solved && styles.inputSolved,
            ]}
            value={answer}
            onChangeText={(t) => {
              setAnswer(t);
              setWrong(false);
            }}
            placeholder="Escribí el mensaje descifrado..."
            placeholderTextColor={Colors.textTertiary}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!solved}
          />

          {wrong && (
            <View style={styles.wrongFeedback}>
              <Text style={styles.wrongText}>Respuesta incorrecta. Revisá el cifrado.</Text>
            </View>
          )}

          {!solved && (
            <Pressable
              style={({ pressed }) => [
                styles.primaryBtn,
                !answer.trim() && styles.primaryBtnDisabled,
                pressed && answer.trim() && styles.btnPressed,
              ]}
              onPress={handleVerify}
              disabled={!answer.trim()}
            >
              <Text style={[styles.primaryBtnLabel, !answer.trim() && styles.primaryBtnLabelDisabled]}>
                🔍 VERIFICAR
              </Text>
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
      </KeyboardAvoidingView>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEyebrow}>CIFRADO RESUELTO</Text>
            <Text style={styles.modalIcon}>🔓</Text>
            <Text style={styles.modalTitle}>{puzzle.title}</Text>
            <View style={styles.answerDisplay}>
              <Text style={styles.answerDisplayLabel}>MENSAJE DESCIFRADO</Text>
              <Text style={styles.answerDisplayText}>{puzzle.answerDisplay}</Text>
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
  kav: { flex: 1 },
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
  cipherChip: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cipherChipLabel: {
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
    marginBottom: 24,
  },
  sectionLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    letterSpacing: 2.5,
    color: Colors.textTertiary,
    marginBottom: 8,
  },
  cipherDescCard: {
    backgroundColor: "#0D0A14",
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginBottom: 20,
  },
  cipherDescText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    lineHeight: 21,
    color: Colors.textSecondary,
    fontVariant: ["tabular-nums"],
  },
  encodedCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.primary + "55",
    padding: 18,
    marginBottom: 24,
    alignItems: "center",
  },
  encodedText: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 22,
    lineHeight: 34,
    color: Colors.primary,
    textAlign: "center",
    letterSpacing: 3,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: 14,
    fontFamily: "Manrope_400Regular",
    fontSize: 15,
    color: Colors.text,
    marginBottom: 12,
  },
  inputWrong: { borderColor: Colors.error },
  inputSolved: { borderColor: "#5A8A5F" },
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
    fontSize: 22,
    color: Colors.text,
    textAlign: "center",
  },
  answerDisplay: {
    backgroundColor: Colors.background,
    borderRadius: Radius.sm,
    padding: 14,
    gap: 4,
  },
  answerDisplayLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 8,
    letterSpacing: 2,
    color: Colors.textTertiary,
  },
  answerDisplayText: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 18,
    color: Colors.primary,
    letterSpacing: 1,
  },
  modalBody: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  divider: { height: 1, backgroundColor: Colors.border },
});
