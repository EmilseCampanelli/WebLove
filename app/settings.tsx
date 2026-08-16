import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSettings } from "../src/hooks/useSettings";
import { useFavorites } from "../src/hooks/useFavorites";
import { useHistory } from "../src/hooks/useHistory";
import { Colors, Radius, Spacing } from "../src/theme";
import { APP_VERSION } from "../src/constants";
import { AppSettings } from "../src/storage/storage";

type RowProps = { label: string; value: boolean; onToggle: (v: boolean) => void };

function ToggleRow({ label, value, onToggle }: RowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: "rgba(235,226,213,0.12)", true: Colors.accent }}
        thumbColor={Colors.white}
        accessibilityLabel={label}
        accessibilityRole="switch"
        accessibilityState={{ checked: value }}
      />
    </View>
  );
}

export default function SettingsScreen() {
  const { settings, setSetting } = useSettings();
  const { favorites, clearAll: clearFavorites } = useFavorites();
  const { history, clearAll: clearHistory, reload: reloadHistory } = useHistory();

  useFocusEffect(
    useCallback(() => {
      void reloadHistory();
    }, [reloadHistory])
  );

  const toggle = <K extends keyof AppSettings>(key: K) => (v: boolean) =>
    void setSetting(key, v as AppSettings[K]);

  const confirmAndRun = (msg: string, action: () => Promise<void>) => {
    if (Platform.OS === "web") {
      // Alert.alert no funciona confiablemente en web builds estáticos
      if (window.confirm(msg)) void action();
    } else {
      Alert.alert("Confirmar", msg, [
        { text: "Cancelar", style: "cancel" },
        { text: "Borrar todo", style: "destructive", onPress: () => void action() },
      ]);
    }
  };

  const handleClearFavorites = () =>
    confirmAndRun(
      "¿Querés borrar todas tus preguntas favoritas?",
      async () => { await clearFavorites(); }
    );

  const handleClearHistory = () =>
    confirmAndRun(
      "¿Querés borrar todo el historial?",
      async () => { await clearHistory(); await reloadHistory(); }
    );

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      {/* Nav */}
      <View style={styles.nav}>
        <Pressable
          onPress={() => router.canGoBack() ? router.back() : router.replace("/")}
          style={styles.backBtn}
          hitSlop={16}
          accessibilityRole="button"
          accessibilityLabel="Volver"
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.navTitle}>AJUSTES</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Page title */}
        <Text style={styles.pageTitle}>Ajustes</Text>

        {/* Toggles */}
        <View style={styles.group}>
          <ToggleRow label="Animaciones" value={settings.animationsEnabled} onToggle={toggle("animationsEnabled")} />
          <View style={styles.sep} />
          <ToggleRow label="Sonido" value={settings.soundEnabled} onToggle={toggle("soundEnabled")} />
          <View style={styles.sep} />
          <ToggleRow label="Vibración" value={settings.vibrationEnabled} onToggle={toggle("vibrationEnabled")} />
          <View style={styles.sep} />
          <ToggleRow label="Modo oscuro" value={settings.darkMode} onToggle={toggle("darkMode")} />
        </View>

        {/* Data counts */}
        <View style={styles.group}>
          <Pressable
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
            onPress={handleClearFavorites}
            accessibilityRole="button"
          >
            <Text style={styles.rowLabel}>Favoritos</Text>
            <View style={styles.rowEnd}>
              <Text style={styles.rowCount}>{favorites.length}</Text>
              <Text style={styles.trashIcon}>Limpiar</Text>
            </View>
          </Pressable>
          <View style={styles.sep} />
          <Pressable
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
            onPress={handleClearHistory}
            accessibilityRole="button"
          >
            <Text style={styles.rowLabel}>Historial</Text>
            <View style={styles.rowEnd}>
              <Text style={styles.rowCount}>{history.length}</Text>
              <Text style={styles.trashIcon}>Limpiar</Text>
            </View>
          </Pressable>
        </View>

        {/* About card */}
        <View style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>SOBRE ENTRE NOSOTROS</Text>
          <Text style={styles.aboutBody}>
            {"Hecha para dos personas, un sillón\ny un rato sin apuro. Versión " + APP_VERSION}
          </Text>
        </View>
      </ScrollView>
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
    borderRadius: Radius.full,
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
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 48,
    gap: 16,
  },
  pageTitle: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 34,
    lineHeight: 40,
    color: Colors.text,
    marginBottom: 8,
  },
  group: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(235,226,213,0.07)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 52,
  },
  rowPressed: {
    backgroundColor: "rgba(235,226,213,0.05)",
  },
  rowLabel: {
    fontFamily: "Manrope_400Regular",
    fontSize: 16,
    color: Colors.text,
  },
  rowCount: {
    fontFamily: "Manrope_400Regular",
    fontSize: 16,
    color: Colors.textTertiary,
  },
  rowEnd: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  trashIcon: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    letterSpacing: 0.5,
    color: Colors.error,
    opacity: 0.7,
  },
  sep: {
    height: 1,
    backgroundColor: "rgba(235,226,213,0.07)",
    marginHorizontal: 16,
  },
  aboutCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(235,226,213,0.07)",
  },
  aboutTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 2.5,
    color: Colors.primary,
  },
  aboutBody: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
});
