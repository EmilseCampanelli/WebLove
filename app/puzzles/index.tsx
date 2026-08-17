import React from "react";
import { View, Text, Pressable, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { router } from "expo-router";
import { Colors, Radius } from "../../src/theme";

interface CategoryCard {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  available: boolean;
  route?: string;
}

const CATEGORIES: CategoryCard[] = [
  {
    id: "murdoku",
    emoji: "🗺️",
    title: "Murdoku",
    subtitle: "Ubicá a los sospechosos en el plano. El asesino comparte habitación con la víctima.",
    available: true,
    route: "/puzzles/murdoku",
  },
  {
    id: "detective",
    emoji: "🗂️",
    title: "Casos policiales",
    subtitle: "Leé el expediente, marcá las pistas clave y acusá al culpable.",
    available: false,
  },
  {
    id: "coartada",
    emoji: "🎭",
    title: "Coartadas",
    subtitle: "Encontrá la contradicción entre declaraciones y evidencias.",
    available: false,
  },
  {
    id: "cronologia",
    emoji: "⏱️",
    title: "Cronologías",
    subtitle: "Ordená los eventos. Detectá el que es imposible según los hechos.",
    available: false,
  },
  {
    id: "cifrado",
    emoji: "🔐",
    title: "Cifrados",
    subtitle: "Descifrá el mensaje usando el código explicado en el caso.",
    available: false,
  },
  {
    id: "mapa",
    emoji: "🧭",
    title: "Mapa del sospechoso",
    subtitle: "Trazá la ruta del sospechoso en el plano según los testimonios.",
    available: false,
  },
  {
    id: "contradiccion",
    emoji: "⚡",
    title: "Contradicciones",
    subtitle: "Encontrá las dos frases del relato que se contradicen entre sí.",
    available: false,
  },
  {
    id: "evidencias",
    emoji: "🔬",
    title: "Evidencias",
    subtitle: "Clasificá cada evidencia y elegí al sospechoso con el mejor motivo.",
    available: false,
  },
  {
    id: "escape",
    emoji: "🚪",
    title: "Escape",
    subtitle: "Resolvé cada paso en orden para abrir la siguiente puerta.",
    available: false,
  },
  {
    id: "interrogatorio",
    emoji: "💬",
    title: "Interrogatorio",
    subtitle: "Interrogá sospechosos con créditos limitados. Acusá al culpable.",
    available: false,
  },
];

export default function PuzzlesHubScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.backLabel}>← INICIO</Text>
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>🧠 JUEGOS</Text>
        <Text style={styles.title}>Casos de misterio</Text>
        <Text style={styles.subtitle}>
          Diez tipos de puzzles de asesinato. Todos con un asesino, una víctima, y una solución que tenés que encontrar.
        </Text>
        <View style={styles.grid}>
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat.id}
              style={({ pressed }) => [
                styles.card,
                !cat.available && styles.cardLocked,
                pressed && cat.available && styles.cardPressed,
              ]}
              onPress={() => {
                if (cat.available && cat.route) {
                  router.push(cat.route as never);
                }
              }}
              disabled={!cat.available}
              accessibilityLabel={cat.title}
            >
              <View style={styles.cardTop}>
                <Text style={styles.cardEmoji}>{cat.emoji}</Text>
                {!cat.available && (
                  <View style={styles.lockBadge}>
                    <Text style={styles.lockLabel}>PRONTO</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.cardTitle, !cat.available && styles.cardTitleLocked]}>
                {cat.title}
              </Text>
              <Text style={styles.cardSubtitle} numberOfLines={3}>
                {cat.subtitle}
              </Text>
            </Pressable>
          ))}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
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
  content: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  eyebrow: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 3,
    color: Colors.primary,
    marginBottom: 6,
  },
  title: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 30,
    lineHeight: 38,
    color: Colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
    marginBottom: 28,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: 16,
    width: "47%",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardLocked: {
    opacity: 0.5,
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  cardEmoji: {
    fontSize: 28,
  },
  lockBadge: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.full,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  lockLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 7,
    letterSpacing: 1.5,
    color: Colors.textTertiary,
  },
  cardTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: Colors.text,
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  cardTitleLocked: {
    color: Colors.textSecondary,
  },
  cardSubtitle: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    lineHeight: 16,
    color: Colors.textTertiary,
  },
});
