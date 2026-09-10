export type UnitId = 8 | 9 | 10 | 11 | 12 | 13 | "bridge";

export type MasteryState =
  | "not_assessed"
  | "learning"
  | "provisional"
  | "independent"
  | "retained"
  | "needs_review";

export type SciencePractice = 1 | 2 | 3;

export type FrqCategory =
  | "mathematical_routines"
  | "translation_between_representations"
  | "experimental_design"
  | "qualitative_quantitative_translation";

export type SkillTrack =
  | "physical_modelling"
  | "mathematical_execution"
  | "representations"
  | "experimental_reasoning"
  | "argumentation"
  | "timed_execution";

export type PathwayId = "24-week" | "16-week" | "8-week";

export type ContentStatus =
  | "draft"
  | "in_review"
  | "approved"
  | "published"
  | "withdrawn";

export type ExamYear = 2026 | 2027;

export interface ExamProfile {
  id: string;
  year: ExamYear;
  label: string;
  sourceUrl: string;
  sourceReviewDate: string;
  approver: string;
  mcqCount: number;
  mcqMinutes: number;
  frqCount: number;
  frqMinutes: number;
  mcqWeight: number;
  frqWeight: number;
  calculator: string;
  referenceInfo: boolean;
  delivery: string;
  frqCategories: FrqCategory[];
  notes: string[];
}

export interface Topic {
  id: string;
  unit: UnitId;
  title: string;
  emphasis: string;
  evidenceOfUnderstanding: string;
  mcqWeightHint?: string;
  lessonIds: string[];
  objectiveIds: string[];
}

export interface Objective {
  id: string;
  topicId: string;
  statement: string;
  essentialKnowledge: string[];
  lessonId: string;
  workedExampleId: string;
  independentItemIds: string[];
  retrievalItemIds: string[];
  representation: string;
  reviewOwner: string;
}

export interface Choice {
  id: "A" | "B" | "C" | "D";
  text: string;
  distractorTag?: string;
}

export interface Provenance {
  author: string;
  reviewer: string;
  reviewed: string;
  version: string;
}

export interface McqItem {
  id: string;
  family: string;
  version: string;
  unit: UnitId;
  topic: string;
  objective: string;
  sciencePractice: SciencePractice;
  difficulty: 1 | 2 | 3 | 4 | 5;
  expectedSeconds: number;
  prereqSkill: string;
  pool: "practice" | "unit" | "mock" | "diagnostic" | "retrieval";
  stimulus?: string;
  stem: string;
  choices: Choice[];
  diagram?: string;
  allowedResources: string[];
  provenance: Provenance;
  status: ContentStatus;
  misconception?: string;
  /** Present on learning/practice items. Mock keys live server-side. */
  correct?: Choice["id"];
  explanation?: string;
  distractorRationales?: Partial<Record<Choice["id"], string>>;
}

export interface RubricPoint {
  id: string;
  points: number;
  earns: string;
  alternate?: string;
  assumptions?: string;
  afterError?: string;
}

export interface FrqTask {
  id: string;
  family: string;
  version: string;
  unit: UnitId;
  topic: string;
  objective: string;
  category: FrqCategory;
  sciencePractice: SciencePractice;
  parts: { id: string; prompt: string; points: number }[];
  totalPoints: number;
  expectedMinutes: number;
  stimulus?: string;
  modelSolution: string;
  rubric: RubricPoint[];
  selfChecks: string[];
  pool: "practice" | "mock" | "diagnostic";
  provenance: Provenance;
  status: ContentStatus;
}

export interface WorkedExample {
  title: string;
  situation: string;
  assumptions: string[];
  derivation: string;
  units: string;
  interpretation: string;
  whyAlternativesFail: string;
}

export interface FadedStep {
  prompt: string;
  hint: string;
  expected: string;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  unit: UnitId;
  topics: string[];
  objectives: string[];
  capability: string;
  prereqs: string[];
  minutes: [number, number];
  enrichment?: boolean;
  reviewDate: string;
  authors: { name: string; role: "author" | "reviewer" }[];
  version: string;
  status: ContentStatus;
  prediction: {
    prompt: string;
    choices: { id: string; text: string; correct?: boolean; misconception?: string }[];
    explanation: string;
  };
  explanation: {
    model: string;
    represent: string;
    derive: string;
    check: string;
    explain: string;
  };
  workedExample: WorkedExample;
  fadedExample: { situation: string; steps: FadedStep[] };
  independentItemIds: string[];
  representationTask?: {
    prompt: string;
    expected: string;
    kind: "graph" | "diagram" | "explanation";
  };
  retrievalItemId?: string;
  investigationId?: string;
  videoAlt: string;
}

export interface Investigation {
  id: string;
  title: string;
  unit: UnitId;
  topics: string[];
  assumption: string;
  prediction: { prompt: string; choices: { id: string; text: string; correct?: boolean }[]; explanation: string };
  transferItemId: string;
  staticEquivalent: string;
}

export interface NextTask {
  kind:
    | "diagnostic"
    | "lesson"
    | "retrieval"
    | "repair"
    | "practice"
    | "investigation"
    | "frq"
    | "mock"
    | "bridge";
  id: string;
  title: string;
  why: string;
  minutes: [number, number];
  href: string;
}

export interface EvidenceEvent {
  id: string;
  at: number;
  sessionId: string;
  type:
    | "diagnostic_completed"
    | "lesson_started"
    | "lesson_prediction"
    | "independent_response_submitted"
    | "hint_opened"
    | "solution_viewed"
    | "misconception_tagged"
    | "review_completed"
    | "mock_submitted"
    | "grade_confirmed"
    | "expert_escalation"
    | "representation_submitted"
    | "frq_submitted"
    | "retrieval_due";
  objectiveId?: string;
  skill?: SkillTrack;
  itemId?: string;
  itemFamily?: string;
  lessonId?: string;
  correct?: boolean;
  assisted: boolean;
  misconception?: string;
  notes?: string;
}

export interface MistakeEntry {
  id: string;
  at: number;
  itemId: string;
  family: string;
  objectiveId: string;
  misconception?: string;
  studentAnswer: string;
  repaired: boolean;
  retrievalItemId: string;
  retrievalDueAt: number;
  retrievalAttempted?: boolean;
  retrievalCorrect?: boolean;
}

export interface MockAttempt {
  id: string;
  formId: string;
  profileId: string;
  startedAt: number;
  section: "mcq" | "frq" | "done";
  mcqEndsAt: number;
  frqEndsAt: number;
  pausedForAccommodation?: boolean;
  answers: Record<string, string>;
  flags: string[];
  frqText: Record<string, string>;
  uploads: { name: string; dataUrl: string; pages?: number }[];
  submittedAt?: number;
  mcqScore?: number;
  mcqTotal?: number;
  frqStatus: "not_started" | "submitted" | "self_reviewed" | "pending_instructor" | "instructor_reviewed";
  selfRubric?: Record<string, boolean>;
  confidenceBefore?: number;
  confidenceAfter?: number;
  incidentLog: string[];
  revision: number;
}

export interface StudentProfile {
  name: string;
  examYear: ExamYear;
  timezone: string;
  weeklyHours: number;
  priorPhysics: string;
  priorCalculus: string;
  schoolSequence: string;
  accessibility: {
    reducedMotion: boolean;
    largeText: boolean;
    extraTime: boolean;
  };
  pathway: PathwayId;
  onboardingComplete: boolean;
  diagnosticComplete: boolean;
  diagnosticSummary?: string;
  createdAt: number;
}

export interface Entitlement {
  tier: "free" | "core" | "reviewed";
  frqReviewsRemaining: number;
  mocksIncluded: number;
}

export interface ExpertTicket {
  id: string;
  at: number;
  lessonId?: string;
  itemId?: string;
  question: string;
  status: "queued" | "needs_clarification" | "answered";
  answer?: string;
  clarification?: string;
}

export interface ContentIssue {
  id: string;
  at: number;
  targetType: "lesson" | "item" | "frq" | "investigation";
  targetId: string;
  note: string;
  severity: "low" | "high";
}

export interface StudentState {
  version: 1;
  role: "student" | "instructor" | "editor" | "parent";
  profile: StudentProfile | null;
  entitlement: Entitlement;
  events: EvidenceEvent[];
  mistakes: MistakeEntry[];
  completedLessons: string[];
  fadedCompleted: string[];
  seenFamilies: string[];
  currentSession: {
    id: string;
    startedAt: number;
    kind: "standard" | "short";
    retrievalDone: boolean;
    instructionDone: boolean;
    applicationDone: boolean;
    errorReviewDone: boolean;
    planDone: boolean;
  } | null;
  mockAttempts: MockAttempt[];
  tickets: ExpertTicket[];
  issues: ContentIssue[];
  cmsOverrides: Record<string, ContentStatus>;
  lastActiveAt: number;
}
