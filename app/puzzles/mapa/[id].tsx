import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { getMapaPuzzle } from "../../../src/data/puzzles/mapa/puzzles";
import { MapaRoom } from "../../../src/data/puzzles/mapa/types";
import { Colors, Radius } from "../../../src/theme";

export default function MapaPlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const puzzle = getMapaPuzzle(id);

  const [userRoute, setUserRoute] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [wrongRoute, setWrongRoute] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);

  if (!puzzle) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.errorText}>Puzzle no encontrado.</Text>
        <Pressable onPress={() => router.back()} style={styles.primaryBtn}>
          <Text style={styles.primaryBtnLabel}>VOLVER</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const correctOrderedIds = puzzle.correctRoute
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((r) => r.roomId);

  const handleRoomPress = (room: MapaRoom) => {
    if (solved || room.blocked) return;
    const startId = puzzle.startRoomId;
    const endId = puzzle.endRoomId;

    if (userRoute.length === 0) {
      if (room.id === startId) setUserRoute([startId]);
      return;
    }

    const last = userRoute[userRoute.length - 1];
    if (room.id === last) {
      if (userRoute.length > 1 && userRoute[userRoute.length - 2] !== undefined) {
        setUserRoute((prev) => prev.slice(0, -1));
      }
      return;
    }

    const lastRoom = puzzle.rooms.find((r) => r.id === last)!;
    const isAdjacent =
      (Math.abs(room.row - lastRoom.row) === 1 && room.col === lastRoom.col) ||
      (Math.abs(room.col - lastRoom.col) === 1 && room.row === lastRoom.row);

    if (!isAdjacent) return;
    if (userRoute.includes(room.id)) return;

    setUserRoute((prev) => [...prev, room.id]);
  };

  const handleVerify = () => {
    const isCorrect =
      userRoute.length === correctOrderedIds.length &&
      userRoute.every((id, i) => id === correctOrderedIds[i]);
    if (isCorrect) {
      setSolved(true);
      setShowModal(true);
    } else {
      setWrongRoute(true);
      setTimeout(() => setWrongRoute(false), 1500);
    }
  };

  const handleReset = () => {
    setUserRoute([]);
    setSolved(false);
    setWrongRoute(false);
  };

  const handleHint = () => {
    const nextLevel = Math.min(hintLevel + 1, puzzle.hints.length);
    setHintLevel(nextLevel);
    setShowHint(true);
  };

  const routeIndexOf = (roomId: string) => userRoute.indexOf(roomId);
  const isStart = (roomId: string) => roomId === puzzle.startRoomId;
  const isEnd = (roomId: string) => roomId === puzzle.endRoomId;

  const canVerify = userRoute.length === correctOrderedIds.length && userRoute[userRoute.length - 1] === puzzle.endRoomId;

  const rows = Array.from({ length: puzzle.gridRows }, (_, r) =>
    puzzle.rooms.filter((rm) => rm.row === r).sort((a, b) => a.col - b.col)
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.backLabel}>← CASOS</Text>
        </Pressable>
        <Pressable onPress={handleHint} hitSlop={8} disabled={hintLevel >= puzzle.hints.length}>
          <Text style={[styles.hintBtn, hintLevel >= puzzle.hints.length && styles.hintBtnUsed]}>
            💡 PISTA {hintLevel}/{puzzle.hints.length}
          </Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>MAPA DEL SOSPECHOSO</Text>
        <Text style={styles.title}>{puzzle.title}</Text>

        <View style={styles.suspectRow}>
          <Text style={styles.suspectEmoji}>{puzzle.suspect.emoji}</Text>
          <View>
            <Text style={styles.suspectName}>{puzzle.suspect.name}</Text>
            <Text style={styles.suspectRole}>{puzzle.suspect.role}</Text>
          </View>
        </View>

        <Text style={styles.story}>{puzzle.story}</Text>

        <View style={styles.clueCard}>
          <Text style={styles.clueLabel}>DECLARACIÓN</Text>
          <Text style={styles.clueText}>{puzzle.routeClue}</Text>
        </View>

        {showHint && hintLevel > 0 && (
          <View style={styles.hintCard}>
            <Text style={styles.hintLabel}>PISTA {hintLevel}</Text>
            <Text style={styles.hintText}>{puzzle.hints[hintLevel - 1].text}</Text>
            <Pressable onPress={() => setShowHint(false)} hitSlop={8}>
              <Text style={styles.hintClose}>CERRAR ×</Text>
            </Pressable>
          </View>
        )}

        <Text style={styles.instructions}>{puzzle.instructions}</Text>

        {wrongRoute && (
          <View style={styles.wrongCard}>
            <Text style={styles.wrongText}>❌ Esa ruta no coincide con la declaración. Intentá de nuevo.</Text>
          </View>
        )}

        <View style={styles.grid}>
          {rows.map((rowRooms, rowIdx) => (
            <View key={rowIdx} style={styles.gridRow}>
              {rowRooms.map((room) => {
                const idx = routeIndexOf(room.id);
                const inRoute = idx !== -1;
                const isStartRoom = isStart(room.id);
                const isEndRoom = isEnd(room.id);
                return (
                  <Pressable
                    key={room.id}
                    style={[
                      styles.cell,
                      room.blocked && styles.cellBlocked,
                      inRoute && styles.cellInRoute,
                      isStartRoom && styles.cellStart,
                      isEndRoom && styles.cellEnd,
                      solved && inRoute && styles.cellSolved,
                    ]}
                    onPress={() => handleRoomPress(room)}
                    disabled={!!room.blocked || solved}
                  >
                    {!room.blocked && (
                      <>
                        {inRoute && (
                          <View style={styles.routeNumBadge}>
                            <Text style={styles.routeNum}>{idx + 1}</Text>
                          </View>
                        )}
                        <Text style={styles.cellEmoji}>{room.emoji}</Text>
                        <Text style={styles.cellName} numberOfLines={1}>{room.name}</Text>
                      </>
                    )}
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>

        <View style={styles.routeTrail}>
          <Text style={styles.routeTrailLabel}>RUTA ACTUAL:</Text>
          <Text style={styles.routeTrailText}>
            {userRoute.length === 0
              ? "Tocá la habitación inicial para comenzar"
              : userRoute.map((rid) => puzzle.rooms.find((r) => r.id === rid)?.name ?? rid).join(" → ")}
          </Text>
        </View>

        <View style={styles.btnRow}>
          <Pressable
            style={({ pressed }) => [styles.resetBtn, pressed && styles.btnPressed]}
            onPress={handleReset}
          >
            <Text style={styles.resetBtnLabel}>↩ REINICIAR</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.verifyBtn,
              !canVerify && styles.verifyBtnDisabled,
              pressed && canVerify ? styles.btnPressed : null,
            ]}
            onPress={handleVerify}
            disabled={!canVerify || solved}
          >
            <Text style={[styles.verifyBtnLabel, !canVerify && styles.verifyBtnLabelDisabled]}>
              {canVerify ? "🔍 VERIFICAR" : `⏳ FALTAN ${correctOrderedIds.length - userRoute.length}`}
            </Text>
          </Pressable>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEyebrow}>RUTA VERIFICADA</Text>
            <Text style={styles.modalIcon}>🧭</Text>
            <Text style={styles.modalTitle}>{puzzle.title}</Text>
            <View style={styles.modalRouteBox}>
              <Text style={styles.modalRouteLabel}>RUTA CORRECTA</Text>
              <Text style={styles.modalRouteText}>
                {correctOrderedIds
                  .map((rid) => puzzle.rooms.find((r) => r.id === rid)?.name ?? rid)
                  .join(" → ")}
              </Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.modalBody}>{puzzle.solutionExplanation}</Text>
            <Pressable
              style={styles.primaryBtn}
              onPress={() => {
                setShowModal(false);
                router.back();
              }}
            >
              <Text style={styles.primaryBtnLabel}>VOLVER A CASOS</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  hintBtn: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 1.5,
    color: Colors.primary,
  },
  hintBtnUsed: { color: Colors.textTertiary },
  content: { paddingHorizontal: 20, paddingTop: 8 },
  eyebrow: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 3,
    color: Colors.primary,
    marginBottom: 6,
  },
  title: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 26,
    lineHeight: 34,
    color: Colors.text,
    marginBottom: 14,
  },
  suspectRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginBottom: 16,
  },
  suspectEmoji: { fontSize: 30 },
  suspectName: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: Colors.text,
  },
  suspectRole: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  story: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
    marginBottom: 14,
  },
  clueCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.primary + "55",
    padding: 16,
    marginBottom: 16,
    gap: 6,
  },
  clueLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    letterSpacing: 2.5,
    color: Colors.primary,
  },
  clueText: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
    fontStyle: "italic",
  },
  hintCard: {
    backgroundColor: "#0D0A14",
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.primary + "66",
    padding: 14,
    marginBottom: 14,
    gap: 6,
  },
  hintLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    letterSpacing: 2,
    color: Colors.primary,
  },
  hintText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  hintClose: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 1.5,
    color: Colors.textTertiary,
    marginTop: 4,
  },
  instructions: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textTertiary,
    marginBottom: 14,
  },
  wrongCard: {
    backgroundColor: "#1A0A0A",
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.error,
    padding: 12,
    marginBottom: 12,
  },
  wrongText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: Colors.error,
  },
  grid: { gap: 6, marginBottom: 16 },
  gridRow: { flexDirection: "row", gap: 6 },
  cell: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 64,
    position: "relative",
  },
  cellBlocked: {
    backgroundColor: Colors.background,
    borderColor: Colors.background,
  },
  cellInRoute: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + "18",
  },
  cellStart: {
    borderColor: "#5A8A5F",
    backgroundColor: "#5A8A5F18",
  },
  cellEnd: {
    borderColor: "#9A7830",
    backgroundColor: "#9A783018",
  },
  cellSolved: {
    borderColor: "#5A8A5F",
    backgroundColor: "#5A8A5F22",
  },
  routeNumBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  routeNum: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    color: Colors.background,
  },
  cellEmoji: { fontSize: 20, marginBottom: 2 },
  cellName: {
    fontFamily: "Manrope_400Regular",
    fontSize: 9,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  routeTrail: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    marginBottom: 16,
    gap: 4,
  },
  routeTrailLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 8,
    letterSpacing: 2,
    color: Colors.textTertiary,
  },
  routeTrailText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    lineHeight: 18,
    color: Colors.textSecondary,
  },
  btnRow: { flexDirection: "row", gap: 10 },
  resetBtn: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  resetBtnLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    letterSpacing: 1.5,
    color: Colors.textSecondary,
  },
  verifyBtn: {
    flex: 2,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  verifyBtnDisabled: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  verifyBtnLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    letterSpacing: 2,
    color: Colors.background,
  },
  verifyBtnLabelDisabled: { color: Colors.textSecondary },
  btnPressed: { opacity: 0.8, transform: [{ scale: 0.975 }] },
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 8,
  },
  primaryBtnLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    letterSpacing: 2,
    color: Colors.background,
  },
  errorText: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 18,
    color: Colors.text,
    textAlign: "center",
    marginTop: 60,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  modalCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: 28,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.primary + "44",
  },
  modalEyebrow: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 3,
    color: Colors.primary,
    textAlign: "center",
  },
  modalIcon: { fontSize: 36, textAlign: "center" },
  modalTitle: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 22,
    color: Colors.text,
    textAlign: "center",
  },
  modalRouteBox: {
    backgroundColor: Colors.background,
    borderRadius: Radius.sm,
    padding: 14,
    gap: 4,
  },
  modalRouteLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 8,
    letterSpacing: 2,
    color: Colors.textTertiary,
  },
  modalRouteText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: Colors.text,
  },
  divider: { height: 1, backgroundColor: Colors.border },
  modalBody: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
});
