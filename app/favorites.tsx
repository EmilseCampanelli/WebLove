import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFavorites } from "../src/hooks/useFavorites";
import { QUESTIONS, Question } from "../src/data/questions";
import { GAME_MODES } from "../src/data/modes";
import { Colors, Typography, Spacing, Radius, Shadow } from "../src/theme";

export default function FavoritesScreen() {
  const { favorites, isFavorite, toggle, clearAll, isLoaded } = useFavorites();

  const favoriteQuestions: Question[] = QUESTIONS.filter((q) =>
    favorites.includes(q.id)
  );

  const handleClearAll = () => {
    Alert.alert(
      "Limpiar favoritas",
      "¿Seguro que querés borrar todas tus preguntas favoritas?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Borrar todo",
          style: "destructive",
          onPress: () => void clearAll(),
        },
      ]
    );
  };

  const getCategoryColor = (category: string) => {
    return GAME_MODES.find((m) => m.id === category)?.color ?? Colors.primary;
  };

  const getCategoryLabel = (category: string) => {
    return GAME_MODES.find((m) => m.id === category)?.label ?? category;
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.canGoBack() ? router.back() : router.replace("/")}
          style={styles.backButton}
          hitSlop={16}
          accessibilityRole="button"
          accessibilityLabel="Volver"
        >
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.title}>Mis favoritas</Text>
        <Pressable
          onPress={handleClearAll}
          style={styles.clearButton}
          disabled={favoriteQuestions.length === 0}
          hitSlop={16}
          accessibilityRole="button"
          accessibilityLabel="Limpiar favoritas"
        >
          <Text
            style={[
              styles.clearLabel,
              favoriteQuestions.length === 0 && styles.clearLabelDisabled,
            ]}
          >
            Limpiar
          </Text>
        </Pressable>
      </View>

      {!isLoaded ? null : favoriteQuestions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>♡</Text>
          <Text style={styles.emptyTitle}>Sin favoritas aún</Text>
          <Text style={styles.emptySubtitle}>
            Tocá el corazón en una carta para guardarla acá.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoriteQuestions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const color = getCategoryColor(item.category);
            return (
              <View style={styles.card}>
                <View style={[styles.cardAccent, { backgroundColor: color }]} />
                <View style={styles.cardContent}>
                  <Text style={styles.questionText}>{item.text}</Text>
                  <View style={styles.cardFooter}>
                    <Text style={[styles.categoryLabel, { color }]}>
                      {getCategoryLabel(item.category).toUpperCase()}
                    </Text>
                    <Pressable
                      onPress={() => void toggle(item.id)}
                      hitSlop={12}
                      accessibilityRole="button"
                      accessibilityLabel="Quitar de favoritas"
                    >
                      <Text style={styles.heartIcon}>
                        {isFavorite(item.id) ? "♥" : "♡"}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          }}
        />
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
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  clearButton: {
    width: 60,
    alignItems: "flex-end",
  },
  clearLabel: {
    ...Typography.bodySmall,
    color: Colors.error,
  },
  clearLabelDisabled: {
    color: Colors.textTertiary,
  },
  list: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
    gap: Spacing.md,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    overflow: "hidden",
    flexDirection: "row",
    ...Shadow.small,
  },
  cardAccent: {
    width: 4,
  },
  cardContent: {
    flex: 1,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  questionText: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryLabel: {
    ...Typography.labelSmall,
  },
  heartIcon: {
    fontSize: 20,
    color: Colors.heartRed,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.xxl,
    gap: Spacing.lg,
  },
  emptyEmoji: {
    fontSize: 56,
    color: Colors.primary,
  },
  emptyTitle: {
    ...Typography.h2,
    color: Colors.text,
    textAlign: "center",
  },
  emptySubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: "center",
    fontStyle: "italic",
  },
});
