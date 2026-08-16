import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { DeckCard } from "../hooks/useQuestionDeck";
import { GAME_MODES } from "../data/modes";
import { Colors, Typography, Spacing, Radius, Shadow } from "../theme";

type Props = {
  card: DeckCard;
  onFavoriteToggle?: () => void;
  isFavorite?: boolean;
  animationsEnabled?: boolean;
};

const CATEGORY_COLORS: Record<string, string> = {
  conexion: Colors.conexion,
  coqueteo: Colors.coqueteo,
  intimo: Colors.intimo,
  diversion: Colors.diversion,
  profundo: Colors.profundo,
  sorpresa: Colors.sorpresa,
  previas: "#7A8B5E",
};

export function QuestionCard({
  card,
  onFavoriteToggle,
  isFavorite,
  animationsEnabled = true,
}: Props) {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width - Spacing.xl * 2, 380);

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    opacity.setValue(0);
    translateY.setValue(20);

    if (animationsEnabled) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 320,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 320,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      opacity.setValue(1);
      translateY.setValue(0);
    }
  }, [card, animationsEnabled, opacity, translateY]);

  if (card.kind === "special") {
    return (
      <Animated.View
        style={[
          styles.card,
          styles.specialCard,
          { width: cardWidth, opacity, transform: [{ translateY }] },
        ]}
      >
        <Text style={styles.specialEmoji}>{card.data.emoji}</Text>
        <Text style={styles.specialText}>{card.data.text}</Text>
      </Animated.View>
    );
  }

  const { data: question } = card;
  const categoryColor = CATEGORY_COLORS[question.category] ?? Colors.primary;
  const modeLabel =
    GAME_MODES.find((m) => m.id === question.category)?.label ?? question.category;

  return (
    <Animated.View
      style={[
        styles.card,
        { width: cardWidth, opacity, transform: [{ translateY }] },
      ]}
    >
      {/* Decorative top accent */}
      <View style={[styles.topAccent, { backgroundColor: categoryColor }]} />

      <View style={styles.cardInner}>
        {/* Favorite toggle */}
        {onFavoriteToggle && (
          <Pressable
            onPress={onFavoriteToggle}
            style={styles.heartButton}
            accessibilityRole="button"
            accessibilityLabel={
              isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
            }
            hitSlop={16}
          >
            <Text style={styles.heartIcon}>{isFavorite ? "♥" : "♡"}</Text>
          </Pressable>
        )}

        {/* Question text */}
        <Text
          style={[
            styles.questionText,
            question.text.length > 80
              ? styles.questionTextSmall
              : undefined,
          ]}
        >
          {question.text}
        </Text>

        {/* Category label */}
        <View style={styles.footer}>
          <View style={[styles.categoryBadge, { borderColor: categoryColor }]}>
            <Text style={[styles.categoryLabel, { color: categoryColor }]}>
              {modeLabel.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    ...Shadow.large,
    overflow: "hidden",
    minHeight: 300,
  },
  topAccent: {
    height: 5,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
  },
  cardInner: {
    padding: Spacing.xl,
    paddingTop: Spacing.lg,
    flex: 1,
    justifyContent: "space-between",
  },
  heartButton: {
    alignSelf: "flex-end",
    marginBottom: Spacing.md,
  },
  heartIcon: {
    fontSize: 26,
    color: Colors.heartRed,
  },
  questionText: {
    ...Typography.question,
    color: Colors.cardText,
    flex: 1,
    textAlignVertical: "center",
    paddingVertical: Spacing.md,
  },
  questionTextSmall: {
    ...Typography.questionSmall,
  },
  footer: {
    marginTop: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryBadge: {
    borderWidth: 1,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  categoryLabel: {
    ...Typography.labelSmall,
  },
  // Special card
  specialCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.card,
  },
  specialEmoji: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  specialText: {
    ...Typography.h2,
    color: Colors.cardText,
    textAlign: "center",
    paddingHorizontal: Spacing.xl,
  },
});
