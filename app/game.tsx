import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Animated,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { QuestionCard } from "../src/components/QuestionCard";
import { PrimaryButton } from "../src/components/PrimaryButton";
import { JokerButton } from "../src/components/JokerButton";
import { useQuestionDeck } from "../src/hooks/useQuestionDeck";
import { useFavorites } from "../src/hooks/useFavorites";
import { useSettings } from "../src/hooks/useSettings";
import { GAME_MODES } from "../src/data/modes";
import { Colors, Typography, Spacing, Radius } from "../src/theme";
import { QuestionCategory } from "../src/data/questions";

type GameModeId = QuestionCategory | "sorpresa";

export default function GameScreen() {
  const { modeId } = useLocalSearchParams<{ modeId: string }>();
  const { settings } = useSettings();
  const deck = useQuestionDeck();
  const { isFavorite, toggle } = useFavorites();

  const [jokerCard, setJokerCard] = useState<{
    emoji: string;
    text: string;
  } | null>(null);

  const jokerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (modeId) {
      deck.setMode(modeId as GameModeId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modeId]);

  const mode = GAME_MODES.find((m) => m.id === modeId);

  const showJoker = (emoji: string, text: string) => {
    setJokerCard({ emoji, text });
    jokerAnim.setValue(0);
    Animated.sequence([
      Animated.timing(jokerAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2500),
      Animated.timing(jokerAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setJokerCard(null));
  };

  const handleBeso = () => showJoker("💋", "Esta pregunta se responde con un beso.");
  const handleMimo = () => showJoker("🫶", "Dejá la pregunta de lado. Durante un minuto, solo mimos.");
  const handleSorpresa = () => {
    deck.advance();
  };

  const handleFavoriteToggle = () => {
    const card = deck.currentCard;
    if (card?.kind === "question") {
      void toggle(card.data.id);
    }
  };

  const currentQuestionId =
    deck.currentCard?.kind === "question" ? deck.currentCard.data.id : null;

  if (!deck.currentCard) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🃏</Text>
          <Text style={styles.emptyTitle}>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={16}
          accessibilityRole="button"
          accessibilityLabel="Volver"
        >
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.modeLabel}>
            {mode?.emoji} {mode?.label ?? "Juego"}
          </Text>
          {deck.currentCard.kind === "question" && (
            <Text style={styles.counter}>
              {deck.questionsAnswered + 1} / {deck.totalQuestions}
            </Text>
          )}
        </View>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Main card */}
        <View style={styles.cardContainer}>
          <QuestionCard
            card={deck.currentCard}
            onFavoriteToggle={
              deck.currentCard.kind === "question"
                ? handleFavoriteToggle
                : undefined
            }
            isFavorite={currentQuestionId ? isFavorite(currentQuestionId) : false}
            animationsEnabled={settings.animationsEnabled}
          />
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <PrimaryButton
            label="Otra pregunta"
            onPress={deck.advance}
            style={styles.mainAction}
          />
          <Pressable
            style={({ pressed }) => [styles.passButton, pressed && styles.passPressed]}
            accessibilityRole="button"
            accessibilityLabel="Pasar"
            onPress={deck.advance}
          >
            <Text style={styles.passLabel}>Pasar</Text>
          </Pressable>
        </View>

        {/* Jokers */}
        <View style={styles.jokersSection}>
          <Text style={styles.jokersTitle}>Comodines</Text>
          <View style={styles.jokersRow}>
            <JokerButton type="beso" onPress={handleBeso} />
            <JokerButton type="mimo" onPress={handleMimo} />
            <JokerButton type="sorpresa" onPress={handleSorpresa} />
          </View>
        </View>
      </ScrollView>

      {/* Joker overlay */}
      {jokerCard && (
        <Animated.View
          style={[
            styles.jokerOverlay,
            {
              opacity: jokerAnim,
              transform: [
                {
                  scale: jokerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  }),
                },
              ],
            },
          ]}
          pointerEvents="none"
        >
          <Text style={styles.jokerOverlayEmoji}>{jokerCard.emoji}</Text>
          <Text style={styles.jokerOverlayText}>{jokerCard.text}</Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    alignItems: "center",
  },
  backIcon: {
    fontSize: 22,
    color: Colors.text,
  },
  headerCenter: {
    alignItems: "center",
    gap: 2,
  },
  modeLabel: {
    ...Typography.h3,
    color: Colors.text,
  },
  counter: {
    ...Typography.caption,
    color: Colors.textTertiary,
  },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
    alignItems: "center",
  },
  cardContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  actions: {
    width: "100%",
    alignItems: "center",
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  mainAction: {
    width: "100%",
  },
  passButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  passPressed: {
    opacity: 0.6,
  },
  passLabel: {
    ...Typography.body,
    color: Colors.textTertiary,
    textDecorationLine: "underline",
  },
  jokersSection: {
    width: "100%",
    alignItems: "center",
    gap: Spacing.md,
  },
  jokersTitle: {
    ...Typography.labelSmall,
    color: Colors.textTertiary,
  },
  jokersRow: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.lg,
  },
  emptyEmoji: {
    fontSize: 56,
  },
  emptyTitle: {
    ...Typography.h2,
    color: Colors.text,
    textAlign: "center",
  },
  // Joker overlay
  jokerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.overlay,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
    padding: Spacing.xxl,
  },
  jokerOverlayEmoji: {
    fontSize: 72,
    marginBottom: Spacing.lg,
  },
  jokerOverlayText: {
    ...Typography.h2,
    color: Colors.white,
    textAlign: "center",
  },
});
