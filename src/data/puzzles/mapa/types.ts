import { BasePuzzle } from "../types";

export interface MapaRoom {
  id: string;
  name: string;
  emoji: string;
  row: number;
  col: number;
  blocked?: boolean;
}

export interface MapaRouteStep {
  roomId: string;
  order: number;
}

export interface MapaPuzzle extends BasePuzzle {
  category: "mapa";
  suspect: { name: string; emoji: string; role: string };
  gridCols: number;
  gridRows: number;
  rooms: MapaRoom[];
  correctRoute: MapaRouteStep[];
  routeClue: string;
  startRoomId: string;
  endRoomId: string;
}
