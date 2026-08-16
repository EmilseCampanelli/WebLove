import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHistory } from "../src/hooks/useHistory";
import { GAME_MODES } from "../src/data/modes";
import { Colors, Typography, Spacing, Radius, Shadow } from "../src/theme";
import { HistoryEntry } from "../src/storage/storage";

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Ayer";
  if (diffDays < 7) return `Hace ${diffDays} días`;

  return date.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "short",
  });
}

export default function HistoryScreen() {
  const { history, clearAll, reload, isLoaded } = useHistory();

  useFocusEffect(
    useCallback(() => {
      void reload();
    }, [reload])
  );

  const handleClearAll = () => {
    Alert.alert(
      "Limpiar historial",
      "¿Seguro que querés borrar todo el historial?",
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

  const renderItem = ({ item }: { item: HistoryEntry }) => {
    const color = getCategoryColor(item.category);
    return (
      <View style={styles.card}>
        <View style={[styles.cardDot, { backgroundColor: color }]} />
        <View style={styles.cardContent}>
          <Text style={styles.questionText} numberOfLines={2}>
            {item.questionText}
          </Text>
          <View style={styles.cardMeta}>
            <Text style={[styles.categoryLabel, { color }]}>
              {getCategoryLabel(item.category).toUpperCase()}
            </Text>
            <Text style={styles.dateLabel}>{formatDate(item.timestamp)}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
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
        <Text style={styles.title}>Historial</Text>
        <Pressable
          onPress={handleClearAll}
          style={styles.clearButton}
          disabled={history.length === 0}
          hitSlop={16}
          accessibilityRole="button"
          accessibilityLabel="Limpiar historial"
        >
          <Text
            style={[
              styles.clearLabel,
              history.length === 0 && styles.clearLabelDisabled,
            ]}
          >
            Limpiar
          </Text>
        </Pressable>
      </View>

      {!isLoaded ? null : history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🕰</Text>
          <Text style={styles.emptyTitle}>Sin historial aún</Text>
          <Text style={styles.emptySubtitle}>
            Las preguntas que abras aparecerán acá.
          </Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => `${item.questionId}-${index}`}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
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
    gap: Spacing.sm,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    flexDirection: "row",
    alignItems: "flex-start",
    padding: Spacing.md,
    gap: Spacing.md,
    ...Shadow.small,
  },
  cardDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    flexShrink: 0,
  },
  cardContent: {
    flex: 1,
    gap: Spacing.xs,
  },
  questionText: {
    ...Typography.body,
    color: Colors.text,
  },
  cardMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryLabel: {
    ...Typography.labelSmall,
  },
  dateLabel: {
    ...Typography.caption,
    color: Colors.textTertiary,
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
