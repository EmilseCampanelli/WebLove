import { Activity } from "../data/activities";

export interface Session {
  title: string;
  tagline: string;
  activities: Activity[];
}

let _session: Session | null = null;

export function setSession(s: Session): void {
  _session = s;
}

export function getSession(): Session | null {
  return _session;
}

export function clearSession(): void {
  _session = null;
}
