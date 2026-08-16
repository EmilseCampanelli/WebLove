import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Radius } from "../src/theme";
import { getSession, clearSession } from "../src/stores/sessionStore";
import {
  Activity,
  ActivityContent,
  QuestionContent,
  ChallengeContent,
  GameContent,
  StepsContent,
  SecretMissionContent,
  TimerContent,
  ChoiceContent,
  NoPhoneContent,
  DateContent,
  SurpriseContent,
  ACTIVITY_POOL,
} from "../src/data/activities";
import { TimerDisplay } from "../src/components/TimerDisplay";
import { SecretMissionFlow } from "../src/components/SecretMissionFlow";
import { useTimer } from "../src/hooks/useTimer";

// ── Shared UI pieces ──────────────────────────────────────────────────────────

function Eyebrow({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <Text style={[styles.eyebrow, accent && styles.eyebrowAccent]}>{label}</Text>
  );
}

function ContinueBtn({
  label = "CONTINUAR",
  onPress,
}: {
  label?: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.continueBtn, pressed && styles.continueBtnPressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={styles.continueBtnLabel}>{label}</Text>
    </Pressable>
  );
}

// ── Activity renderers ────────────────────────────────────────────────────────

function QuestionRenderer({
  content,
  onDone,
}: {
  content: QuestionContent;
  onDone: () => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.rendererScroll}>
      <Eyebrow label="PREGUNTA" />
      <Text style={styles.questionText}>{content.question}</Text>
      {content.followUp && (
        <Text style={styles.followUp}>{content.followUp}</Text>
      )}
      <Text style={styles.paceHint}>Tomense el tiempo que necesiten.</Text>
      <ContinueBtn label="SIGUIENTE →" onPress={onDone} />
    </ScrollView>
  );
}

function ChallengeRenderer({
  content,
  onDone,
}: {
  content: ChallengeContent;
  activity: Activity;
  onDone: () => void;
}) {
  const [timerStarted, setTimerStarted] = useState(false);
  const timer = useTimer(content.timeLimitSeconds ?? 60);
  const [round, setRound] = useState(0);
  const [prompts] = useState<string[]>(() =>
    content.prompts ? shuffle(content.prompts) : []
  );
  const totalRounds = prompts.length;
  const currentPrompt = prompts[round] ?? null;

  const nextRound = () => {
    if (round + 1 >= totalRounds) {
      onDone();
    } else {
      setRound((r) => r + 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.rendererScroll}>
      <Eyebrow label="DESAFÍO" />
      {currentPrompt ? (
        <>
          <Text style={styles.roundBadge}>TURNO {round + 1} / {totalRounds}</Text>
          <Text style={styles.questionText}>{currentPrompt}</Text>
          <Text style={styles.secondaryHint}>{content.prompt}</Text>
        </>
      ) : (
        <Text style={styles.promptText}>{content.prompt}</Text>
      )}
      {content.winCondition && (
        <View style={styles.winBox}>
          <Text style={styles.winText}>🏆 {content.winCondition}</Text>
        </View>
      )}
      {content.timeLimitSeconds &&
        (timerStarted ? (
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
            style={({ pressed }) => [
              styles.timerStartBtn,
              pressed && styles.timerStartBtnPressed,
            ]}
            onPress={() => {
              setTimerStarted(true);
              timer.start();
            }}
          >
            <Text style={styles.timerStartLabel}>
              ▶ INICIAR CRONÓMETRO ({content.timeLimitSeconds}s)
            </Text>
          </Pressable>
        ))}
      {currentPrompt ? (
        <ContinueBtn
          label={round + 1 >= totalRounds ? "TERMINAMOS" : "SIGUIENTE →"}
          onPress={nextRound}
        />
      ) : (
        <ContinueBtn onPress={onDone} />
      )}
    </ScrollView>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function GameRenderer({
  content,
  onDone,
}: {
  content: GameContent;
  activity: Activity;
  onDone: () => void;
}) {
  const [scores, setScores] = useState([0, 0]);
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const totalRounds = content.rounds ?? 10;
  const [questions] = useState<string[]>(() =>
    content.questions ? shuffle(content.questions).slice(0, totalRounds) : []
  );
  const currentQuestion = questions[round] ?? null;

  const nextRound = () => {
    if (round + 1 >= totalRounds) {
      onDone();
    } else {
      setRound((r) => r + 1);
    }
  };

  if (!started) {
    return (
      <ScrollView contentContainerStyle={styles.rendererScroll}>
        <Eyebrow label="JUEGO" />
        <Text style={styles.promptText}>{content.rules}</Text>
        {content.turnInstructions && (
          <Text style={styles.secondaryHint}>{content.turnInstructions}</Text>
        )}
        <ContinueBtn label="EMPEZAMOS" onPress={() => setStarted(true)} />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.rendererScroll}>
      <Text style={styles.roundBadge}>RONDA {round + 1} / {totalRounds}</Text>
      {currentQuestion ? (
        <Text style={styles.questionText}>{currentQuestion}</Text>
      ) : (
        <Text style={styles.promptText}>{content.rules}</Text>
      )}
      {content.trackScore && (
        <View style={styles.scoreboard}>
          <View style={styles.scoreCol}>
            <Text style={styles.scoreLabel}>ÉL / ELLA</Text>
            <View style={styles.scoreRow}>
              <Pressable
                style={styles.scoreBtn}
                onPress={() => setScores(([a, b]) => [Math.max(0, a - 1), b])}
              >
                <Text style={styles.scoreBtnText}>−</Text>
              </Pressable>
              <Text style={styles.scoreValue}>{scores[0]}</Text>
              <Pressable
                style={styles.scoreBtn}
                onPress={() => setScores(([a, b]) => [a + 1, b])}
              >
                <Text style={styles.scoreBtnText}>+</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.scoreDivider} />
          <View style={styles.scoreCol}>
            <Text style={styles.scoreLabel}>ÉL / ELLA</Text>
            <View style={styles.scoreRow}>
              <Pressable
                style={styles.scoreBtn}
                onPress={() => setScores(([a, b]) => [a, Math.max(0, b - 1)])}
              >
                <Text style={styles.scoreBtnText}>−</Text>
              </Pressable>
              <Text style={styles.scoreValue}>{scores[1]}</Text>
              <Pressable
                style={styles.scoreBtn}
                onPress={() => setScores(([a, b]) => [a, b + 1])}
              >
                <Text style={styles.scoreBtnText}>+</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
      <ContinueBtn
        label={round + 1 >= totalRounds ? "TERMINAMOS" : "SIGUIENTE RONDA →"}
        onPress={nextRound}
      />
    </ScrollView>
  );
}

function StepsRenderer({
  content,
  activity,
  onDone,
}: {
  content: StepsContent;
  activity: Activity;
  onDone: () => void;
}) {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(content.steps.length).fill(false)
  );

  const toggle = (i: number) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <ScrollView contentContainerStyle={styles.rendererScroll}>
      <Eyebrow label="ACTIVIDAD" />
      {content.noPhoneHint && (
        <Text style={styles.noPhoneHint}>📵 Esta actividad es mejor sin el teléfono.</Text>
      )}
      <View style={styles.stepsList}>
        {content.steps.map((step, i) => (
          <Pressable
            key={i}
            style={[styles.stepRow, checked[i] && styles.stepRowDone]}
            onPress={() => toggle(i)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: checked[i] }}
          >
            <View style={[styles.stepBullet, checked[i] && styles.stepBulletDone]}>
              <Text style={styles.stepBulletText}>{checked[i] ? "✓" : i + 1}</Text>
            </View>
            <Text style={[styles.stepText, checked[i] && styles.stepTextDone]}>
              {step}
            </Text>
          </Pressable>
        ))}
      </View>
      <ContinueBtn label="LISTO" onPress={onDone} />
    </ScrollView>
  );
}

function SecretMissionRenderer({
  content,
  onDone,
}: {
  content: SecretMissionContent;
  onDone: () => void;
}) {
  return (
    <View style={styles.fullScreen}>
      <SecretMissionFlow content={content} onDone={onDone} />
    </View>
  );
}

function TimerRenderer({
  content,
  onDone,
}: {
  content: TimerContent;
  onDone: () => void;
}) {
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
      {timer.state === "done" && (
        <View style={styles.timerNext}>
          <ContinueBtn onPress={onDone} />
        </View>
      )}
    </View>
  );
}

function ChoiceRenderer({
  content,
  onDone,
}: {
  content: ChoiceContent;
  onDone: () => void;
}) {
  const [chosen, setChosen] = useState<number | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.rendererScroll}>
      <Eyebrow label="ELIJAN" />
      <Text style={styles.promptText}>{content.prompt}</Text>
      <View style={styles.choiceList}>
        {content.options.map((opt, i) => (
          <Pressable
            key={i}
            style={({ pressed }) => [
              styles.choiceOption,
              chosen === i && styles.choiceOptionActive,
              pressed && styles.choiceOptionPressed,
            ]}
            onPress={() => setChosen(i)}
            accessibilityRole="radio"
            accessibilityState={{ selected: chosen === i }}
          >
            <Text
              style={[
                styles.choiceOptionText,
                chosen === i && styles.choiceOptionTextActive,
              ]}
            >
              {opt}
            </Text>
          </Pressable>
        ))}
      </View>
      {chosen !== null && (
        <ContinueBtn onPress={onDone} />
      )}
    </ScrollView>
  );
}

function NoPhoneRenderer({
  content,
  onDone,
}: {
  content: NoPhoneContent;
  onDone: () => void;
}) {
  const timer = useTimer(content.durationSeconds);
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
    timer.start();
  };

  return (
    <View style={styles.noPhoneScreen}>
      <View style={styles.noPhoneContent}>
        <Text style={styles.noPhoneEmoji}>📵</Text>
        <Text style={styles.noPhoneInstruction}>{content.instruction}</Text>
        {started && (
          <Text style={styles.noPhoneTimer}>{timer.formatted}</Text>
        )}
      </View>
      {!started ? (
        <ContinueBtn label="INICIAR" onPress={handleStart} />
      ) : timer.state === "done" ? (
        <View style={styles.noPhoneReturn}>
          <Text style={styles.noPhoneReturnMsg}>{content.returnMessage} ❤️</Text>
          <ContinueBtn label="CONTINUAR" onPress={onDone} />
        </View>
      ) : (
        <Text style={styles.noPhoneHintSmall}>
          Apoyá el teléfono boca abajo.
        </Text>
      )}
    </View>
  );
}

function DateRenderer({
  content,
  activity,
  onDone,
}: {
  content: DateContent;
  activity: Activity;
  onDone: () => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.rendererScroll}>
      <Eyebrow label="PLAN" />
      <Text style={styles.dateIdea}>{content.idea}</Text>
      {content.steps && (
        <View style={styles.stepsList}>
          {content.steps.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepBullet}>
                <Text style={styles.stepBulletText}>{i + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      )}
      {content.budgetNote && (
        <Text style={styles.budgetNote}>💰 {content.budgetNote}</Text>
      )}
      <ContinueBtn label="¡ARRANQUEMOS!" onPress={onDone} />
    </ScrollView>
  );
}

function SurpriseRenderer({
  content,
  onDone,
}: {
  content: SurpriseContent;
  onDone: () => void;
}) {
  const [picked] = useState<Activity>(() => {
    const pool = ACTIVITY_POOL.filter(
      (a) =>
        a.type !== "surprise" &&
        (!content.poolCategories ||
          a.tags.categories.some((c) => content.poolCategories?.includes(c)))
    );
    return pool[Math.floor(Math.random() * pool.length)];
  });

  return <ActivityRenderer activity={picked} onDone={onDone} />;
}

// ── Main dispatcher ───────────────────────────────────────────────────────────

function ActivityRenderer({
  activity,
  onDone,
}: {
  activity: Activity;
  onDone: () => void;
}) {
  const c = activity.content;

  switch (c.kind) {
    case "question":
      return <QuestionRenderer content={c} onDone={onDone} />;
    case "challenge":
      return <ChallengeRenderer content={c} activity={activity} onDone={onDone} />;
    case "game":
      return <GameRenderer content={c} activity={activity} onDone={onDone} />;
    case "steps":
      return <StepsRenderer content={c} activity={activity} onDone={onDone} />;
    case "secret_mission":
      return <SecretMissionRenderer content={c} onDone={onDone} />;
    case "timer":
      return <TimerRenderer content={c} onDone={onDone} />;
    case "choice":
      return <ChoiceRenderer content={c} onDone={onDone} />;
    case "no_phone":
      return <NoPhoneRenderer content={c} onDone={onDone} />;
    case "date":
      return <DateRenderer content={c} activity={activity} onDone={onDone} />;
    case "surprise":
      return <SurpriseRenderer content={c} onDone={onDone} />;
  }
}

// ── Activity type labels ──────────────────────────────────────────────────────

const TYPE_LABELS: Record<string, string> = {
  question: "Pregunta",
  challenge: "Desafío",
  game: "Juego",
  activity: "Actividad",
  secret_mission: "Misión",
  timer: "Temporizador",
  choice: "Elección",
  no_phone: "Sin teléfono",
  date: "Plan",
  surprise: "Sorpresa",
};

// ── Session screen ────────────────────────────────────────────────────────────

export default function SessionScreen() {
  const [index, setIndex] = useState(0);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // re-validate session on focus
  useFocusEffect(
    useCallback(() => {
      if (!getSession()) {
        setShouldRedirect(true);
      }
    }, [])
  );

  if (shouldRedirect) {
    router.replace("/");
    return null;
  }

  const session = getSession();
  if (!session) return null;

  const { title, tagline, activities } = session;
  const activity = activities[index];
  const isLast = index >= activities.length - 1;
  const typeLabel = TYPE_LABELS[activity.type] ?? "Actividad";

  const advance = () => {
    if (isLast) {
      clearSession();
      router.replace("/");
    } else {
      setIndex((i) => i + 1);
    }
  };

  const isMissionOrTimer =
    activity.content.kind === "secret_mission" ||
    activity.content.kind === "timer" ||
    activity.content.kind === "no_phone";

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      {/* Nav */}
      <View style={styles.nav}>
        <Pressable
          onPress={() => {
            clearSession();
            router.canGoBack() ? router.back() : router.replace("/");
          }}
          style={styles.backBtn}
          hitSlop={16}
          accessibilityRole="button"
          accessibilityLabel="Salir"
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <View style={styles.navCenter}>
          <Text style={styles.navTitle}>
            {typeLabel.toUpperCase()} · {index + 1} / {activities.length}
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Experience title bar (collapsed for full-screen types) */}
      {!isMissionOrTimer && (
        <View style={styles.expHeader}>
          <Text style={styles.expTitle} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.activityTitle} numberOfLines={2}>
            {activity.title}
          </Text>
        </View>
      )}

      {/* Activity content */}
      <View style={styles.body}>
        <ActivityRenderer activity={activity} onDone={advance} />
      </View>
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

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
  navCenter: {
    flex: 1,
    alignItems: "center",
  },
  navTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    letterSpacing: 2.5,
    color: Colors.textSecondary,
  },
  expHeader: {
    paddingHorizontal: 24,
    paddingTop: 4,
    paddingBottom: 12,
    gap: 3,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(235,226,213,0.06)",
  },
  expTitle: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    letterSpacing: 1.5,
    color: Colors.textTertiary,
    textTransform: "uppercase",
  },
  activityTitle: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 22,
    lineHeight: 28,
    color: Colors.text,
  },
  body: {
    flex: 1,
  },
  // ── Renderers ──
  fullScreen: {
    flex: 1,
    padding: 24,
    paddingBottom: 32,
    gap: 16,
  },
  rendererScroll: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 48,
    gap: 20,
  },
  eyebrow: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    letterSpacing: 3,
    color: Colors.primary,
  },
  eyebrowAccent: {
    color: Colors.accent,
  },
  questionText: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 30,
    lineHeight: 40,
    color: Colors.text,
  },
  followUp: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
  paceHint: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    letterSpacing: 0.3,
    color: Colors.textTertiary,
  },
  promptText: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 20,
    lineHeight: 30,
    color: Colors.text,
  },
  secondaryHint: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
  winBox: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(235,226,213,0.07)",
  },
  winText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
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
    opacity: 0.7,
  },
  timerStartLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    letterSpacing: 1.5,
    color: Colors.textSecondary,
  },
  timerNext: {
    paddingBottom: 8,
  },
  // Scoreboard
  roundBadge: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    letterSpacing: 2.5,
    color: Colors.primary,
    marginBottom: 4,
  },
  scoreboard: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(235,226,213,0.07)",
  },
  scoreCol: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
  scoreLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.textTertiary,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  scoreBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(235,226,213,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreBtnText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 20,
    color: Colors.text,
    lineHeight: 24,
  },
  scoreValue: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 42,
    color: Colors.text,
    lineHeight: 50,
    minWidth: 40,
    textAlign: "center",
  },
  scoreDivider: {
    width: 1,
    height: 60,
    backgroundColor: "rgba(235,226,213,0.1)",
  },
  // Steps
  stepsList: {
    gap: 10,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 12,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: "rgba(235,226,213,0.07)",
  },
  stepRowDone: {
    opacity: 0.5,
    backgroundColor: "rgba(192,154,82,0.05)",
    borderColor: "rgba(192,154,82,0.2)",
  },
  stepBullet: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(192,154,82,0.15)",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  stepBulletDone: {
    backgroundColor: Colors.primary + "44",
  },
  stepBulletText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: Colors.primary,
  },
  stepText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 15,
    lineHeight: 22,
    color: Colors.text,
    flex: 1,
  },
  stepTextDone: {
    color: Colors.textTertiary,
  },
  noPhoneHint: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
  // Choice
  choiceList: {
    gap: 8,
  },
  choiceOption: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "rgba(235,226,213,0.07)",
  },
  choiceOptionActive: {
    backgroundColor: Colors.primary + "1A",
    borderColor: Colors.primary,
  },
  choiceOptionPressed: {
    opacity: 0.75,
  },
  choiceOptionText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 15,
    color: Colors.text,
  },
  choiceOptionTextActive: {
    fontFamily: "Manrope_600SemiBold",
    color: Colors.primary,
  },
  // No phone
  noPhoneScreen: {
    flex: 1,
    paddingHorizontal: 28,
    paddingBottom: 40,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  noPhoneContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  noPhoneEmoji: {
    fontSize: 64,
  },
  noPhoneInstruction: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 24,
    lineHeight: 34,
    color: Colors.text,
    textAlign: "center",
  },
  noPhoneTimer: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 72,
    lineHeight: 80,
    color: Colors.primary,
    letterSpacing: -1,
  },
  noPhoneReturn: {
    gap: 12,
    width: "100%",
    alignItems: "center",
  },
  noPhoneReturnMsg: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 20,
    lineHeight: 28,
    color: Colors.text,
    fontStyle: "italic",
    textAlign: "center",
  },
  noPhoneHintSmall: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: Colors.textTertiary,
    letterSpacing: 0.5,
  },
  // Date
  dateIdea: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 20,
    lineHeight: 30,
    color: Colors.text,
  },
  budgetNote: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  // Continue button
  continueBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  continueBtnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.978 }],
  },
  continueBtnLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    letterSpacing: 2,
    color: Colors.background,
  },
});
