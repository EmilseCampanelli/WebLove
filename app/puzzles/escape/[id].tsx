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
import { getEscapePuzzle } from "../../../src/data/puzzles/escape/puzzles";
import { Colors, Radius } from "../../../src/theme";

export default function EscapePlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const puzzle = getEscapePuzzle(id);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [stepState, setStepState] = useState<"idle" | "success" | "wrong">("idle");
  const [showFinalModal, setShowFinalModal] = useState(false);

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

  const currentStep = puzzle.steps[currentStepIndex];
  const isLastStep = currentStepIndex === puzzle.steps.length - 1;
  const allDone = currentStepIndex >= puzzle.steps.length;

  const handleAdvance = () => {
    if (!currentStep) return;
    const correct =
      answer.trim().toLowerCase() === currentStep.answer.trim().toLowerCase();
    if (correct) {
      setStepState("success");
    } else {
      setStepState("wrong");
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      setShowFinalModal(true);
    } else {
      setCurrentStepIndex((i) => i + 1);
      setAnswer("");
      setStepState("idle");
    }
  };

  const typeLabel: Record<string, string> = {
    combination: "COMBINACIÓN",
    riddle: "ACERTIJO",
    sequence: "SECUENCIA",
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
          <View style={styles.progressChips}>
            {puzzle.steps.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.progressDot,
                  i < currentStepIndex && styles.progressDotDone,
                  i === currentStepIndex && styles.progressDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <Text style={styles.eyebrow}>ESCAPE · {puzzle.location}</Text>
          <Text style={styles.title}>{puzzle.title}</Text>
          <Text style={styles.story}>{puzzle.story}</Text>

          {currentStep && !allDone && (
            <>
              <View style={styles.stepCard}>
                <View style={styles.stepHeader}>
                  <Text style={styles.stepTypeLabel}>
                    {typeLabel[currentStep.type] ?? currentStep.type}
                  </Text>
                  <Text style={styles.stepCounter}>
                    PASO {currentStepIndex + 1} DE {puzzle.steps.length}
                  </Text>
                </View>
                <Text style={styles.stepTitle}>{currentStep.title}</Text>
                <Text style={styles.stepDescription}>{currentStep.description}</Text>
                <View style={styles.divider} />
                <Text style={styles.stepPromptLabel}>TU MISIÓN</Text>
                <Text style={styles.stepPrompt}>{currentStep.prompt}</Text>
              </View>

              {stepState === "success" && (
                <View style={styles.successFeedback}>
                  <Text style={styles.successText}>{currentStep.successText}</Text>
                </View>
              )}

              {stepState === "wrong" && (
                <View style={styles.wrongFeedback}>
                  <Text style={styles.wrongText}>{currentStep.failText}</Text>
                </View>
              )}

              {stepState === "idle" && (
                <>
                  <TextInput
                    style={styles.input}
                    value={answer}
                    onChangeText={setAnswer}
                    placeholder="Escribí tu respuesta..."
                    placeholderTextColor={Colors.textTertiary}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <Pressable
                    style={({ pressed }) => [
                      styles.primaryBtn,
                      !answer.trim() && styles.primaryBtnDisabled,
                      pressed && answer.trim() && styles.btnPressed,
                    ]}
                    onPress={handleAdvance}
                    disabled={!answer.trim()}
                  >
                    <Text style={[
                      styles.primaryBtnLabel,
                      !answer.trim() && styles.primaryBtnLabelDisabled,
                    ]}>
                      AVANZAR →
                    </Text>
                  </Pressable>
                </>
              )}

              {stepState === "wrong" && (
                <Pressable
                  style={({ pressed }) => [styles.secondaryBtn, pressed && styles.btnPressed]}
                  onPress={() => { setAnswer(""); setStepState("idle"); }}
                >
                  <Text style={styles.secondaryBtnLabel}>INTENTAR DE NUEVO</Text>
                </Pressable>
              )}

              {stepState === "success" && (
                <Pressable
                  style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}
                  onPress={handleNext}
                >
                  <Text style={styles.primaryBtnLabel}>
                    {isLastStep ? "🔓 VER REVELACIÓN FINAL" : "SIGUIENTE PASO →"}
                  </Text>
                </Pressable>
              )}
            </>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={showFinalModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEyebrow}>¡ESCAPASTE!</Text>
            <Text style={styles.modalIcon}>🔓</Text>
            <Text style={styles.modalTitle}>{puzzle.title}</Text>
            <View style={styles.divider} />
            <Text style={styles.modalBody}>{puzzle.finalReveal}</Text>
            <View style={styles.divider} />
            <Text style={styles.modalBody}>{puzzle.solutionExplanation}</Text>
            <Pressable
              style={styles.primaryBtn}
              onPress={() => {
                setShowFinalModal(false);
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
  progressChips: { flexDirection: "row", gap: 6 },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  progressDotDone: { backgroundColor: Colors.primary + "88" },
  progressDotActive: { backgroundColor: Colors.primary, width: 20 },
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
  stepCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 18,
    gap: 10,
    marginBottom: 16,
  },
  stepHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepTypeLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    letterSpacing: 2.5,
    color: Colors.primary,
  },
  stepCounter: {
    fontFamily: "Manrope_400Regular",
    fontSize: 10,
    letterSpacing: 1.5,
    color: Colors.textTertiary,
  },
  stepTitle: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 20,
    color: Colors.text,
  },
  stepDescription: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textSecondary,
  },
  stepPromptLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    letterSpacing: 2,
    color: Colors.textTertiary,
  },
  stepPrompt: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: Colors.text,
    fontStyle: "italic",
  },
  divider: { height: 1, backgroundColor: Colors.border },
  successFeedback: {
    backgroundColor: "#0A1A0A",
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: "#5A8A5F",
    padding: 12,
    marginBottom: 12,
  },
  successText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: "#5A8A5F",
    lineHeight: 18,
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
    lineHeight: 18,
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
  modalIcon: { fontSize: 42, textAlign: "center" },
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
});
