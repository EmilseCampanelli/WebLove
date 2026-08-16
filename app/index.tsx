import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrimaryButton } from "../src/components/PrimaryButton";
import { SecondaryButton } from "../src/components/SecondaryButton";
import { APP_NAME, APP_TAGLINE } from "../src/constants";
import { Colors, Typography, Spacing } from "../src/theme";
import { useFocusEffect } from "expo-router";

export default function HomeScreen() {
  const { height } = useWindowDimensions();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(24)).current;

  useFocusEffect(
    React.useCallback(() => {
      opacity.setValue(0);
      translateY.setValue(24);
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }, [opacity, translateY])
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={[styles.container, { minHeight: height - 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[styles.hero, { opacity, transform: [{ translateY }] }]}
        >
          {/* Logo area */}
          <View style={styles.logoArea}>
            <Text style={styles.logoEmoji}>💕</Text>
            <Text style={styles.appName}>{APP_NAME}</Text>
            <View style={styles.divider} />
            <Text style={styles.tagline}>{APP_TAGLINE}</Text>
          </View>

          {/* Decorative card preview */}
          <View style={styles.cardPreview}>
            <View style={styles.previewAccent} />
            <Text style={styles.previewQuestion}>
              "¿Cuál es tu recuerdo{"\n"}favorito de nosotros?"
            </Text>
            <Text style={styles.previewCategory}>CONEXIÓN</Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.actions, { opacity }]}>
          <PrimaryButton
            label="Empezar"
            onPress={() => router.push("/modes")}
            style={styles.primaryBtn}
          />
          <SecondaryButton
            label="Elegir un modo"
            onPress={() => router.push("/modes")}
            style={styles.secondaryBtn}
          />
          <View style={styles.bottomLinks}>
            <Text
              style={styles.link}
              onPress={() => router.push("/favorites")}
              accessibilityRole="link"
            >
              Mis favoritas
            </Text>
            <Text style={styles.linkSeparator}>·</Text>
            <Text
              style={styles.link}
              onPress={() => router.push("/history")}
              accessibilityRole="link"
            >
              Historial
            </Text>
            <Text style={styles.linkSeparator}>·</Text>
            <Text
              style={styles.link}
              onPress={() => router.push("/settings")}
              accessibilityRole="link"
            >
              Ajustes
            </Text>
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
  container: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
    justifyContent: "space-between",
  },
  hero: {
    flex: 1,
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },
  logoArea: {
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },
  logoEmoji: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  appName: {
    ...Typography.display,
    color: Colors.text,
    textAlign: "center",
  },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: Colors.primary,
    borderRadius: 1,
    marginVertical: Spacing.md,
  },
  tagline: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: "center",
    fontStyle: "italic",
    maxWidth: 280,
  },
  cardPreview: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: Spacing.xl,
    paddingTop: 0,
    width: "100%",
    maxWidth: 340,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 10,
    overflow: "hidden",
  },
  previewAccent: {
    height: 4,
    backgroundColor: Colors.primary,
    marginBottom: Spacing.lg,
  },
  previewQuestion: {
    ...Typography.question,
    color: Colors.text,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  previewCategory: {
    ...Typography.label,
    color: Colors.primary,
    textAlign: "center",
  },
  actions: {
    gap: Spacing.md,
  },
  primaryBtn: {
    width: "100%",
  },
  secondaryBtn: {
    width: "100%",
  },
  bottomLinks: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
  link: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textDecorationLine: "underline",
  },
  linkSeparator: {
    ...Typography.bodySmall,
    color: Colors.textTertiary,
  },
});
