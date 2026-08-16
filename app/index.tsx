import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Typography, Radius, Shadow } from "../src/theme";

export default function HomeScreen() {
  const { height, width } = useWindowDimensions();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;

  useFocusEffect(
    React.useCallback(() => {
      opacity.setValue(0);
      translateY.setValue(16);
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 480, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 480, useNativeDriver: true }),
      ]).start();
    }, [opacity, translateY])
  );

  const cardW = Math.min(width * 0.52, 220);
  const cardH = cardW * 1.35;
  const deckH = cardH + 40;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Settings button — top right */}
      <View style={styles.topBar}>
        <View />
        <Pressable
          onPress={() => router.push("/settings")}
          style={styles.settingsButton}
          hitSlop={16}
          accessibilityRole="button"
          accessibilityLabel="Ajustes"
        >
          <Text style={styles.settingsIcon}>☀︎</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.container, { opacity, transform: [{ translateY }] }]}>
          {/* Title */}
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                { fontSize: height < 680 ? 40 : 52, lineHeight: height < 680 ? 44 : 56 },
              ]}
            >
              {"ENTRE\nNOSOTROS"}
            </Text>
            <Text style={styles.tagline}>
              {"Una pregunta.\nUna mirada.\nUn poco más de nosotros."}
            </Text>
          </View>

          {/* Card deck */}
          <View style={[styles.deckArea, { height: deckH }]}>
            <View
              style={[
                styles.deckCardBase,
                {
                  width: cardW, height: cardH, borderRadius: 18,
                  transform: [{ rotate: "-9deg" }, { translateX: -14 }, { translateY: 16 }],
                  opacity: 0.4, backgroundColor: "#DDD5C0",
                },
              ]}
            />
            <View
              style={[
                styles.deckCardBase,
                {
                  width: cardW, height: cardH, borderRadius: 18,
                  transform: [{ rotate: "-3.5deg" }, { translateX: -5 }, { translateY: 8 }],
                  opacity: 0.65, backgroundColor: "#EAE2CE",
                },
              ]}
            />
            <View style={[styles.deckCardFront, { width: cardW, height: cardH, borderRadius: 18 }]}>
              <Text style={styles.deckDiamond}>✦</Text>
              <Text style={styles.deckBrand}>ENTRE NOSOTROS</Text>
              <View style={styles.deckDivider} />
              <Text style={styles.deckCount}>20 cartas</Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [styles.btnPrimary, pressed && styles.btnPressed]}
              onPress={() => router.push("/modes")}
              accessibilityRole="button"
              accessibilityLabel="Empezar"
            >
              <Text style={styles.btnPrimaryLabel}>EMPEZAR</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.btnSecondary, pressed && styles.btnPressed]}
              onPress={() => router.push("/modes")}
              accessibilityRole="button"
              accessibilityLabel="Elegir un modo"
            >
              <Text style={styles.btnSecondaryLabel}>ELEGIR UN MODO</Text>
            </Pressable>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: "rgba(235,226,213,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  settingsIcon: {
    fontSize: 18,
    color: "rgba(235,226,213,0.55)",
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
  },
  container: {
    flex: 1,
    minHeight: 560,
    justifyContent: "space-between",
    gap: 32,
  },
  header: {
    gap: 12,
  },
  title: {
    fontFamily: "InstrumentSerif_400Regular",
    color: Colors.text,
    letterSpacing: -1,
  },
  tagline: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 17,
    lineHeight: 25,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
  deckArea: {
    alignItems: "center",
    justifyContent: "center",
  },
  deckCardBase: {
    position: "absolute",
    ...Shadow.large,
  },
  deckCardFront: {
    backgroundColor: Colors.card,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    ...Shadow.large,
  },
  deckDiamond: {
    fontSize: 24,
    color: Colors.primary,
    marginBottom: 2,
  },
  deckBrand: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 8,
    letterSpacing: 3.5,
    color: "rgba(28,16,24,0.45)",
    textTransform: "uppercase",
  },
  deckDivider: {
    width: 28,
    height: 1,
    backgroundColor: "rgba(28,16,24,0.18)",
    marginVertical: 2,
  },
  deckCount: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 12,
    color: "rgba(28,16,24,0.38)",
    letterSpacing: 0.3,
  },
  actions: {
    gap: 10,
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimaryLabel: {
    ...Typography.button,
    color: Colors.background,
  },
  btnSecondary: {
    borderRadius: Radius.md,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(235,226,213,0.18)",
  },
  btnSecondaryLabel: {
    ...Typography.button,
    color: Colors.textSecondary,
  },
  btnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.975 }],
  },
});
