import React from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { Colors, Radius } from "../../theme";
import { MurdokuRoom, MurdokuSuspect } from "../../data/puzzles/murdoku/types";

interface Props {
  rooms: MurdokuRoom[];
  suspects: MurdokuSuspect[];
  gridCols: number;
  gridRows: number;
  victimRoomId: string;
  selectedSuspectId: string | null;
  placements: Record<string, string>; // suspectId → roomId
  wrongRoomIds: string[];
  solved: boolean;
  onRoomPress: (roomId: string) => void;
  onSuspectPress: (suspectId: string) => void;
}

export function MurdokuBoard({
  rooms,
  suspects,
  gridCols,
  gridRows,
  victimRoomId,
  selectedSuspectId,
  placements,
  wrongRoomIds,
  solved,
  onRoomPress,
  onSuspectPress,
}: Props) {
  const reversePlacements: Record<string, string> = {};
  for (const [sid, rid] of Object.entries(placements)) {
    reversePlacements[rid] = sid;
  }

  const selectedSuspect = suspects.find((s) => s.id === selectedSuspectId);

  return (
    <View style={styles.container}>
      {/* Clue strip */}
      <View style={styles.clueStrip}>
        {selectedSuspect ? (
          <>
            <Text style={styles.clueEyebrow}>{selectedSuspect.emoji} {selectedSuspect.name.toUpperCase()}</Text>
            <Text style={styles.clueText}>{selectedSuspect.clue}</Text>
          </>
        ) : (
          <Text style={styles.clueHint}>Seleccioná un sospechoso para ver su pista</Text>
        )}
      </View>

      {/* Grid */}
      <View style={styles.grid}>
        {Array.from({ length: gridRows }, (_, row) => (
          <View key={row} style={styles.gridRow}>
            {Array.from({ length: gridCols }, (_, col) => {
              const room = rooms.find((r) => r.row === row && r.col === col);
              if (!room) return <View key={col} style={styles.cellEmpty} />;
              if (room.blocked) return <View key={col} style={styles.cellBlocked} />;

              const isVictimRoom = room.id === victimRoomId;
              const placedSuspectId = reversePlacements[room.id];
              const placedSuspect = suspects.find((s) => s.id === placedSuspectId);
              const isWrong = wrongRoomIds.includes(room.id);
              const isTarget = selectedSuspectId !== null && !solved;

              return (
                <Pressable
                  key={col}
                  style={({ pressed }) => [
                    styles.cell,
                    isVictimRoom && styles.cellVictim,
                    isWrong && styles.cellWrong,
                    solved && isVictimRoom && styles.cellSolved,
                    isTarget && pressed && styles.cellPressed,
                  ]}
                  onPress={() => {
                    if (!room.blocked && !solved) onRoomPress(room.id);
                  }}
                  accessibilityLabel={room.name}
                >
                  <Text style={styles.cellEmoji}>{room.emoji}</Text>
                  <Text style={styles.cellName} numberOfLines={2}>{room.name}</Text>
                  {placedSuspect && (
                    <View style={styles.suspectToken}>
                      <Text style={styles.suspectTokenEmoji}>{placedSuspect.emoji}</Text>
                    </View>
                  )}
                  {isVictimRoom && (
                    <View style={styles.victimToken}>
                      <Text style={styles.victimTokenEmoji}>💀</Text>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>

      {/* Suspect row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.suspectScroll}
        contentContainerStyle={styles.suspectList}
      >
        {suspects.map((s) => {
          const isSelected = s.id === selectedSuspectId;
          const isPlaced = placements[s.id] != null;
          return (
            <Pressable
              key={s.id}
              style={[
                styles.suspectCard,
                isSelected && styles.suspectCardSelected,
                isPlaced && !isSelected && styles.suspectCardPlaced,
              ]}
              onPress={() => onSuspectPress(s.id)}
              accessibilityLabel={s.name}
            >
              <Text style={styles.suspectEmoji}>{s.emoji}</Text>
              <Text style={styles.suspectName} numberOfLines={1}>{s.name.split(" ")[0]}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const CELL_SIZE = 68;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  clueStrip: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    minHeight: 62,
    justifyContent: "center",
  },
  clueEyebrow: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.primary,
    marginBottom: 4,
  },
  clueText: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 14,
    lineHeight: 20,
    color: Colors.text,
  },
  clueHint: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
  grid: {
    alignSelf: "center",
    gap: 4,
  },
  gridRow: {
    flexDirection: "row",
    gap: 4,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: Colors.surface,
    borderRadius: Radius.sm,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "transparent",
    position: "relative",
  },
  cellEmpty: {
    width: CELL_SIZE,
    height: CELL_SIZE,
  },
  cellBlocked: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: "#1A1222",
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: "#2A1F35",
  },
  cellVictim: {
    borderColor: "#8B4513",
    backgroundColor: "#1A0F0A",
  },
  cellWrong: {
    borderColor: "#C05252",
    backgroundColor: "#1A0A0A",
  },
  cellSolved: {
    borderColor: Colors.primary,
    backgroundColor: "#1A1608",
  },
  cellPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.96 }],
  },
  cellEmoji: {
    fontSize: 18,
  },
  cellName: {
    fontFamily: "Manrope_400Regular",
    fontSize: 9,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 2,
    lineHeight: 12,
  },
  suspectToken: {
    position: "absolute",
    top: 3,
    right: 3,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  suspectTokenEmoji: {
    fontSize: 11,
  },
  victimToken: {
    position: "absolute",
    bottom: 3,
    left: 3,
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  victimTokenEmoji: {
    fontSize: 11,
  },
  suspectScroll: {
    marginTop: 16,
  },
  suspectList: {
    gap: 8,
    paddingHorizontal: 4,
  },
  suspectCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: "center",
    width: 72,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  suspectCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: "#1C1508",
  },
  suspectCardPlaced: {
    opacity: 0.55,
  },
  suspectEmoji: {
    fontSize: 22,
  },
  suspectName: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    letterSpacing: 0.5,
    color: Colors.text,
    marginTop: 4,
  },
});
