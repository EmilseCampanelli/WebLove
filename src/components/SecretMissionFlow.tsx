import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Colors, Radius } from "../theme";

type MissionLike = {
  introText: string;
  missionA: string;
  missionB: string;
  revealText: string;
};

type Phase = "intro_a" | "reveal_a" | "covered_a" | "reveal_b" | "done";

interface Props {
  content: MissionLike;
  onDone: () => void;
}

export function SecretMissionFlow({ content, onDone }: Props) {
  const [phase, setPhase] = useState<Phase>("intro_a");

  const advance = () => {
    if (phase === "intro_a") setPhase("reveal_a");
    else if (phase === "reveal_a") setPhase("covered_a");
    else if (phase === "covered_a") setPhase("reveal_b");
    else if (phase === "reveal_b") setPhase("done");
    else onDone();
  };

  if (phase === "intro_a") {
    return (
      <PhaseScreen
        eyebrow="MISIÓN SECRETA"
        title={content.introText}
        cta="PERSONA 1: MIRÁ TU MISIÓN"
        onPress={advance}
      />
    );
  }

  if (phase === "reveal_a") {
    return (
      <PhaseScreen
        eyebrow="TU MISIÓN — SOLO VOS"
        title={content.missionA}
        cta="LISTO. CUBRIR PANTALLA"
        onPress={advance}
        secret
      />
    );
  }

  if (phase === "covered_a") {
    return (
      <PhaseScreen
        eyebrow="PASALE EL TELÉFONO"
        title={"Pantalla cubierta.\n\nPasale el teléfono a la otra persona."}
        cta="PERSONA 2: VER MI MISIÓN"
        onPress={advance}
        covered
      />
    );
  }

  if (phase === "reveal_b") {
    return (
      <PhaseScreen
        eyebrow="TU MISIÓN — SOLO VOS"
        title={content.missionB}
        cta="LISTO. EMPEZAR MISIÓN"
        onPress={advance}
        secret
      />
    );
  }

  return (
    <PhaseScreen
      eyebrow="FIN DE LA MISIÓN"
      title={content.revealText}
      cta="TERMINAR"
      onPress={onDone}
    />
  );
}

interface PhaseProps {
  eyebrow: string;
  title: string;
  cta: string;
  onPress: () => void;
  secret?: boolean;
  covered?: boolean;
}

function PhaseScreen({ eyebrow, title, cta, onPress, secret, covered }: PhaseProps) {
  const bg = covered
    ? Colors.background
    : secret
    ? "#0D0816"
    : Colors.background;

  return (
    <View style={[styles.screen, { backgroundColor: bg }]}>
      <View style={styles.content}>
        <Text style={[styles.eyebrow, secret && styles.eyebrowSecret]}>{eyebrow}</Text>
        <Text style={[styles.title, covered && styles.titleDim]}>{title}</Text>
      </View>
      <Pressable
        style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={cta}
      >
        <Text style={styles.btnLabel}>{cta}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 28,
    paddingBottom: 40,
    paddingTop: 60,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
  },
  eyebrow: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    letterSpacing: 3,
    color: Colors.primary,
  },
  eyebrowSecret: {
    color: Colors.accent,
  },
  title: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 22,
    lineHeight: 32,
    color: Colors.text,
  },
  titleDim: {
    color: Colors.textSecondary,
  },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  btnLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    letterSpacing: 2,
    color: Colors.background,
  },
  btnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.975 }],
  },
});
