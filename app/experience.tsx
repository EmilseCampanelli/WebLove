import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Radius } from "../src/theme";
import {
  getExperienceById,
  getExperiencesByCategory,
  Experience,
  ExperienceCategory,
  ChallengeContent,
  ActivityContent,
  TimerContent,
  MissionContent,
} from "../src/data/experiences";
import { TimerDisplay } from "../src/components/TimerDisplay";
import { SecretMissionFlow } from "../src/components/SecretMissionFlow";
import { useTimer } from "../src/hooks/useTimer";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Timer screen ─────────────────────────────────────────────────────────────

function TimerScreen({ experience, onNext }: { experience: Experience; onNext: () => void }) {
  const content = experience.content as TimerContent;
  const timer = useTimer(content.durationSeconds);

  return (
    <View style={styles.fullScreen}>
      <TimerDisplay
        formatted={timer.formatted}
        state={timer.state}
        label={content.label}
        hint={content.hint}
        completionMessage={content.completionMessage}
        onToggle={timer.toggle}
        onReset={timer.reset}
      />
      <Pressable
        style={({ pressed }) => [styles.nextBtn, pressed && styles.nextBtnPressed]}
        onPress={onNext}
        accessibilityRole="button"
        accessibilityLabel="Siguiente"
      >
        <Text style={styles.nextBtnLabel}>SIGUIENTE</Text>
      </Pressable>
    </View>
  );
}

// ── Challenge screen ─────────────────────────────────────────────────────────

function ChallengeScreen({ experience, onNext }: { experience: Experience; onNext: () => void }) {
  const content = experience.content as ChallengeContent;
  const [timerShown, setTimerShown] = useState(false);
  const timer = useTimer(content.timeLimit ?? 60);

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.eyebrow}>DESAFÍO</Text>
      <Text style={styles.challengeTitle}>{experience.title}</Text>
      <Text style={styles.challengePrompt}>{content.prompt}</Text>

      {content.winCondition && (
        <View style={styles.winBox}>
          <Text style={styles.winLabel}>🏆 {content.winCondition}</Text>
        </View>
      )}

      {content.timeLimit && (
        timerShown ? (
          <TimerDisplay
            formatted={timer.formatted}
            state={timer.state}
            label="Tiempo"
            completionMessage="¡Tiempo!"
            onToggle={timer.toggle}
            onReset={timer.reset}
          />
        ) : (
          <Pressable
            style={({ pressed }) => [styles.timerStartBtn, pressed && styles.timerStartBtnPressed]}
            onPress={() => { setTimerShown(true); timer.start(); }}
            accessibilityRole="button"
            accessibilityLabel="Iniciar cronómetro"
          >
            <Text style={styles.timerStartLabel}>INICIAR CRONÓMETRO ({content.timeLimit}s)</Text>
          </Pressable>
        )
      )}

      <Pressable
        style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}
        onPress={onNext}
        accessibilityRole="button"
        accessibilityLabel="Siguiente"
      >
        <Text style={styles.primaryBtnLabel}>SIGUIENTE</Text>
      </Pressable>
    </ScrollView>
  );
}

// ── Activity screen ──────────────────────────────────────────────────────────

function ActivityScreen({ experience, onNext }: { experience: Experience; onNext: () => void }) {
  const content = experience.content as ActivityContent;

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.eyebrow}>ACTIVIDAD{content.noPhoneRequired ? " · SIN TELÉFONO" : ""}</Text>
      <Text style={styles.challengeTitle}>{experience.title}</Text>
      <Text style={styles.challengeDesc}>{experience.description}</Text>

      <View style={styles.stepsBox}>
        {content.steps.map((step, i) => (
          <View key={i} style={styles.activityStep}>
            <View style={styles.activityBullet}>
              <Text style={styles.activityBulletText}>{i + 1}</Text>
            </View>
            <Text style={styles.activityStepText}>{step}</Text>
          </View>
        ))}
      </View>

      <Pressable
        style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}
        onPress={onNext}
        accessibilityRole="button"
        accessibilityLabel="Siguiente"
      >
        <Text style={styles.primaryBtnLabel}>SIGUIENTE</Text>
      </Pressable>
    </ScrollView>
  );
}

// ── Mission screen ───────────────────────────────────────────────────────────

function MissionScreen({ experience, onNext }: { experience: Experience; onNext: () => void }) {
  const content = experience.content as MissionContent;

  return (
    <View style={styles.fullScreen}>
      <SecretMissionFlow content={content} onDone={onNext} />
    </View>
  );
}

// ── Root ─────────────────────────────────────────────────────────────────────

export default function ExperienceScreen() {
  const params = useLocalSearchParams<{ id?: string; category?: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const experiences: Experience[] = React.useMemo(() => {
    if (params.id) {
      const e = getExperienceById(params.id);
      return e ? [e] : [];
    }
    if (params.category) {
      return shuffle(getExperiencesByCategory(params.category as ExperienceCategory)).slice(0, 5);
    }
    return [];
  }, [params.id, params.category]);

  const handleNext = () => {
    if (currentIndex < experiences.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      router.canGoBack() ? router.back() : router.replace("/");
    }
  };

  if (experiences.length === 0) {
    return (
      <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🎲</Text>
          <Text style={styles.emptyTitle}>Nada por acá</Text>
          <Pressable onPress={() => router.replace("/")} style={styles.primaryBtn}>
            <Text style={styles.primaryBtnLabel}>VOLVER AL INICIO</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const experience = experiences[currentIndex];
  const isLast = currentIndex === experiences.length - 1;

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      {/* Nav */}
      <View style={styles.nav}>
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
          style={styles.backBtn}
          hitSlop={16}
          accessibilityRole="button"
          accessibilityLabel="Volver"
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.navTitle}>
          {currentIndex + 1} / {experiences.length}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Content */}
      {experience.type === "timer" && (
        <TimerScreen experience={experience} onNext={handleNext} />
      )}
      {experience.type === "challenge" && (
        <ChallengeScreen experience={experience} onNext={handleNext} />
      )}
      {experience.type === "activity" && (
        <ActivityScreen experience={experience} onNext={handleNext} />
      )}
      {experience.type === "mission" && (
        <MissionScreen experience={experience} onNext={handleNext} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: "rgba(235,226,213,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 26,
    color: Colors.text,
    lineHeight: 30,
  },
  navTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    letterSpacing: 2.5,
    color: Colors.textSecondary,
  },
  fullScreen: {
    flex: 1,
    padding: 24,
    paddingBottom: 40,
    gap: 16,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 48,
    gap: 20,
  },
  eyebrow: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    letterSpacing: 3,
    color: Colors.primary,
  },
  challengeTitle: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 34,
    lineHeight: 40,
    color: Colors.text,
  },
  challengeDesc: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
  challengePrompt: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 20,
    lineHeight: 30,
    color: Colors.text,
  },
  winBox: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(235,226,213,0.07)",
  },
  winLabel: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  stepsBox: {
    gap: 12,
  },
  activityStep: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  activityBullet: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary + "22",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 2,
  },
  activityBulletText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: Colors.primary,
  },
  activityStepText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 15,
    lineHeight: 22,
    color: Colors.text,
    flex: 1,
  },
  timerStartBtn: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(235,226,213,0.1)",
  },
  timerStartBtnPressed: {
    opacity: 0.75,
  },
  timerStartLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    letterSpacing: 1.5,
    color: Colors.textSecondary,
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  primaryBtnLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    letterSpacing: 2,
    color: Colors.background,
  },
  btnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.978 }],
  },
  nextBtn: {
    backgroundColor: "rgba(235,226,213,0.08)",
    borderRadius: Radius.md,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  nextBtnPressed: {
    opacity: 0.7,
  },
  nextBtnLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    letterSpacing: 2,
    color: Colors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 32,
  },
  emptyEmoji: {
    fontSize: 48,
  },
  emptyTitle: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 24,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
});
