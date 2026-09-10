"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  ContentIssue,
  Entitlement,
  EvidenceEvent,
  ExpertTicket,
  MistakeEntry,
  MockAttempt,
  StudentProfile,
  StudentState,
} from "@/lib/types";

const KEY = "anannt-em-student-v1";

const defaultState = (): StudentState => ({
  version: 1,
  role: "student",
  profile: null,
  entitlement: { tier: "free", frqReviewsRemaining: 0, mocksIncluded: 0 },
  events: [],
  mistakes: [],
  completedLessons: [],
  fadedCompleted: [],
  seenFamilies: [],
  currentSession: null,
  mockAttempts: [],
  tickets: [],
  issues: [],
  cmsOverrides: {},
  lastActiveAt: Date.now(),
});

function sampleProfile(): StudentProfile {
  return {
    name: "Sample learner",
    examYear: 2027,
    timezone: "Asia/Dubai",
    weeklyHours: 6,
    priorPhysics: "School physics through mechanics; limited E&M",
    priorCalculus: "Derivatives comfortable; integrals uneven",
    schoolSequence: "Unit 8 currently in school",
    accessibility: { reducedMotion: false, largeText: false, extraTime: false },
    pathway: "16-week",
    onboardingComplete: true,
    diagnosticComplete: true,
    diagnosticSummary:
      "Prerequisite vectors are usable. Flux versus local field is a tagged misconception. Calculus of exponentials needs a short bridge. This is an Anannt profile, not an official AP score.",
    createdAt: Date.now() - 86400000 * 12,
  };
}

export function seedSampleState(): StudentState {
  const s = defaultState();
  s.profile = sampleProfile();
  s.entitlement = { tier: "core", frqReviewsRemaining: 0, mocksIncluded: 4 };
  s.completedLessons = ["u8-flux-misconception"];
  s.events = [
    {
      id: "e1",
      at: Date.now() - 86400000 * 11,
      sessionId: "s0",
      type: "diagnostic_completed",
      assisted: false,
    },
    {
      id: "e2",
      at: Date.now() - 86400000 * 2,
      sessionId: "s1",
      type: "independent_response_submitted",
      objectiveId: "8.5.B",
      itemId: "u8-mis-1",
      itemFamily: "u8-external-charge-flux",
      correct: false,
      assisted: false,
      misconception: "flux-equals-local-field",
      skill: "argumentation",
    },
  ];
  s.mistakes = [
    {
      id: "m1",
      at: Date.now() - 86400000 * 2,
      itemId: "u8-mis-1",
      family: "u8-external-charge-flux",
      objectiveId: "8.5.B",
      misconception: "flux-equals-local-field",
      studentAnswer: "A",
      repaired: false,
      retrievalItemId: "u8-mis-r",
      retrievalDueAt: Date.now() - 3600000,
    },
  ];
  s.seenFamilies = ["u8-external-charge-flux"];
  return s;
}

const Ctx = createContext<{
  state: StudentState;
  loaded: boolean;
  setState: (fn: (s: StudentState) => StudentState) => void;
  log: (e: Omit<EvidenceEvent, "id" | "at" | "sessionId"> & { sessionId?: string }) => void;
  reset: () => void;
  loadSample: () => void;
} | null>(null);

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [state, setStateRaw] = useState<StudentState>(defaultState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setStateRaw(JSON.parse(raw) as StudentState);
    } catch {
      /* ignore corrupt storage */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(KEY, JSON.stringify({ ...state, lastActiveAt: Date.now() }));
  }, [state, loaded]);

  const setState = useCallback((fn: (s: StudentState) => StudentState) => {
    setStateRaw((prev) => fn(prev));
  }, []);

  const log = useCallback(
    (e: Omit<EvidenceEvent, "id" | "at" | "sessionId"> & { sessionId?: string }) => {
      setStateRaw((prev) => {
        const sessionId = e.sessionId ?? prev.currentSession?.id ?? "loose";
        const event: EvidenceEvent = {
          ...e,
          sessionId,
          id: crypto.randomUUID(),
          at: Date.now(),
        };
        const seenFamilies = e.itemFamily
          ? Array.from(new Set([...prev.seenFamilies, e.itemFamily]))
          : prev.seenFamilies;
        return { ...prev, events: [...prev.events, event], seenFamilies };
      });
    },
    [],
  );

  const reset = useCallback(() => {
    const next = defaultState();
    setStateRaw(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }, []);

  const loadSample = useCallback(() => {
    const next = seedSampleState();
    setStateRaw(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }, []);

  const value = useMemo(
    () => ({ state, loaded, setState, log, reset, loadSample }),
    [state, loaded, setState, log, reset, loadSample],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStudent() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStudent must be used under StudentProvider");
  return ctx;
}

export function addMistake(
  setState: (fn: (s: StudentState) => StudentState) => void,
  entry: Omit<MistakeEntry, "id" | "at" | "repaired" | "retrievalDueAt"> & { retrievalDueAt?: number },
) {
  setState((s) => ({
    ...s,
    mistakes: [
      ...s.mistakes,
      {
        ...entry,
        id: crypto.randomUUID(),
        at: Date.now(),
        repaired: false,
        retrievalDueAt: entry.retrievalDueAt ?? Date.now() + 7 * 86400000,
      },
    ],
  }));
}

export function addTicket(
  setState: (fn: (s: StudentState) => StudentState) => void,
  ticket: Omit<ExpertTicket, "id" | "at" | "status">,
) {
  setState((s) => ({
    ...s,
    tickets: [
      ...s.tickets,
      { ...ticket, id: crypto.randomUUID(), at: Date.now(), status: "queued" },
    ],
  }));
}

export function addIssue(
  setState: (fn: (s: StudentState) => StudentState) => void,
  issue: Omit<ContentIssue, "id" | "at">,
) {
  setState((s) => ({
    ...s,
    issues: [...s.issues, { ...issue, id: crypto.randomUUID(), at: Date.now() }],
  }));
}

export function upsertMockAttempt(
  setState: (fn: (s: StudentState) => StudentState) => void,
  attempt: MockAttempt,
) {
  setState((s) => {
    const others = s.mockAttempts.filter((a) => a.id !== attempt.id);
    return { ...s, mockAttempts: [...others, attempt] };
  });
}

export function setEntitlement(
  setState: (fn: (s: StudentState) => StudentState) => void,
  entitlement: Entitlement,
) {
  setState((s) => ({ ...s, entitlement }));
}
