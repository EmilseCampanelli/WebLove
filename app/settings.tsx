import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSettings } from "../src/hooks/useSettings";
import { useFavorites } from "../src/hooks/useFavorites";
import { useHistory } from "../src/hooks/useHistory";
import { Colors, Typography, Spacing, Radius } from "../src/theme";
import { APP_NAME, APP_VERSION } from "../src/constants";
import { AppSettings } from "../src/storage/storage";

type SettingRowProps = {
  label: string;
  value: boolean;
  onToggle: (v: boolean) => void;
};

function SettingRow({ label, value, onToggle }: SettingRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: Colors.border, true: Colors.primary }}
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
  const { clearAll: clearFavorites } = useFavorites();
  const { clearAll: clearHistory } = useHistory();

  const toggle = <K extends keyof AppSettings>(key: K) => (v: boolean) => {
    void setSetting(key, v as AppSettings[K]);
  };

  const handleClearFavorites = () => {
    Alert.alert(
      "Limpiar favoritas",
      "¿Seguro que querés borrar todas tus preguntas favoritas?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Borrar todo", style: "destructive", onPress: () => void clearFavorites() },
      ]
    );
  };

  const handleClearHistory = () => {
    Alert.alert(
      "Limpiar historial",
      "¿Seguro que querés borrar todo el historial?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Borrar todo", style: "destructive", onPress: () => void clearHistory() },
      ]
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
        <Text style={styles.title}>Ajustes</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Experience */}
        <Text style={styles.sectionTitle}>Experiencia</Text>
        <View style={styles.section}>
          <SettingRow
            label="Animaciones"
            value={settings.animationsEnabled}
            onToggle={toggle("animationsEnabled")}
          />
          <View style={styles.separator} />
          <SettingRow
            label="Vibración"
            value={settings.vibrationEnabled}
            onToggle={toggle("vibrationEnabled")}
          />
          <View style={styles.separator} />
          <SettingRow
            label="Sonido"
            value={settings.soundEnabled}
            onToggle={toggle("soundEnabled")}
          />
        </View>

        {/* Appearance */}
        <Text style={styles.sectionTitle}>Apariencia</Text>
        <View style={styles.section}>
          <SettingRow
            label="Modo oscuro"
            value={settings.darkMode}
            onToggle={toggle("darkMode")}
          />
        </View>

        {/* Data */}
        <Text style={styles.sectionTitle}>Datos</Text>
        <View style={styles.section}>
          <Pressable
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
            onPress={handleClearFavorites}
            accessibilityRole="button"
          >
            <Text style={[styles.rowLabel, styles.destructiveLabel]}>
              Limpiar favoritas
            </Text>
          </Pressable>
          <View style={styles.separator} />
          <Pressable
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
            onPress={handleClearHistory}
            accessibilityRole="button"
          >
            <Text style={[styles.rowLabel, styles.destructiveLabel]}>
              Limpiar historial
            </Text>
          </Pressable>
        </View>

        {/* About */}
        <Text style={styles.sectionTitle}>Sobre la app</Text>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Aplicación</Text>
            <Text style={styles.rowValue}>{APP_NAME}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Versión</Text>
            <Text style={styles.rowValue}>{APP_VERSION}</Text>
          </View>
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
  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  sectionTitle: {
    ...Typography.label,
    color: Colors.textTertiary,
    marginBottom: Spacing.sm,
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.sm,
  },
  section: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    minHeight: 52,
  },
  rowPressed: {
    backgroundColor: Colors.overlayLight,
  },
  rowLabel: {
    ...Typography.body,
    color: Colors.text,
  },
  rowValue: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  destructiveLabel: {
    color: Colors.error,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.md,
  },
});
