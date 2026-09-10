/** Study host mount contract. Do not invent a second catalog or gate form. */

export const SITE_ORIGIN = "https://study.anannt.ae";
export const BASE_PATH = "/physics-em";
export const SUBJECT_SLUG = "physics-em";
export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;
export const SESSION_COOKIE = "anannt_study_session";
export const DEV_PORT = 43140;
export const MONEY_PAGE = "https://anannt.ae/ap-physics-c-electricity-and-magnetism-dubai";
export const PHYSICS_1_HREF = `${SITE_ORIGIN}/physics-1`;

export const PUBLIC_LESSONS = [
  {
    id: "u8-flux-misconception",
    slug: "zero-flux-is-not-zero-field",
    path: "/learn/zero-flux-is-not-zero-field",
    unit: "8",
    title: "Flux versus local field",
    blurb:
      "Gauss’s law is not “E times A for every surface.” Zero net flux does not mean the field is zero at every point. Predict before the explanation.",
  },
  {
    id: "u8-continuous-line",
    slug: "finite-line-of-charge",
    path: "/learn/finite-line-of-charge",
    unit: "8",
    title: "A finite line of charge",
    blurb:
      "Electrostatics with calculus: build dE from a source element, keep the vector component you need, and integrate. An independent check uses a new length, not the worked numbers.",
  },
] as const;

export const PUBLIC_LESSON_SLUGS: ReadonlySet<string> = new Set(PUBLIC_LESSONS.map((l) => l.slug));
export const LESSON_2 = PUBLIC_LESSONS[1];

export const HONESTY =
  "Two public lessons. Not a complete E&M course. Wednesday 5 May 2027 Session 2 clashes with Physics 1. Choose one sitting. Mock B is not a second paper.";

export const VOICE =
  "The mathematics is calculus. Wednesday 5 May 2027 is the other problem — same session as Physics 1. Read two lessons, then ask Burjuman which sitting to keep.";

export const QUIET_LINE =
  "We would rather you finish this idea than buy a package. A person at Office 105 will sit with the exact question if you want one later.";

/** Official Wave C clash sentence. Print in human language. Never as a boast. */
export const CLASH_OFFICIAL =
  "Physics 1 and Physics C: Electricity and Magnetism share Session 2 on Wednesday 5 May 2027. Pick one sitting. A mentor at Office 105 can help you choose. Late testing exists; we do not promise a Dubai school will offer it.";

export const CLASH_HOME =
  "Wednesday 5 May 2027, Session 2 — same afternoon as Physics 1. A student cannot sit both. Pick one sitting. A person at Office 105 can help you choose.";

export const LEGAL = {
  ap: "AP® is a trademark registered by the College Board, which is not affiliated with, and does not endorse, this website.",
  psat: "PSAT/NMSQT® is a registered trademark of the College Board and the National Merit Scholarship Corporation, which are not affiliated with, and do not endorse, this website.",
  supplement:
    "This studio is a self-study supplement. It does not predict an official AP score and is not Bluebook or AP Classroom.",
  nap: "Anannt Education · Office 105, Bank Street Building, Burjuman Metro Exit 2, Dubai · +971 58585 3551 · wecare@anannt.ae",
} as const;

export const EXAM_SITTING = {
  dateLabel: "Wednesday 5 May 2027",
  session: "Session 2",
  localTime: "15:00 Dubai (UTC+4)",
  mode: "Hybrid digital",
  shape: "42 MCQ / 85 min + 4 FRQ / 95 min. Calculator on both sections. FRQ handwritten in booklets.",
} as const;

export function absUrl(path = "/") {
  const p = !path || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

export function gateHref(unit = "8", intent?: string) {
  const url = new URL("/start", SITE_ORIGIN);
  url.searchParams.set("subject", SUBJECT_SLUG);
  if (unit) url.searchParams.set("unit", unit);
  if (intent) url.searchParams.set("intent", intent);
  return url.toString();
}

export function sittingChoiceHref() {
  return gateHref("8", "1:1");
}

export function waitlistHref(unit = "") {
  const url = new URL("/start", SITE_ORIGIN);
  url.searchParams.set("subject", SUBJECT_SLUG);
  if (unit) url.searchParams.set("unit", unit);
  url.searchParams.set("intent", "waitlist");
  return url.toString();
}

export function whatsappHelpUrl(sku = "one-to-one mentoring") {
  const text = `Hi Anannt Burjuman — I started ${SUBJECT_SLUG} on study.anannt.ae and want help with ${sku}`;
  return `https://wa.me/971585853551?text=${encodeURIComponent(text)}`;
}

export function isPublicLessonPath(pathname: string) {
  return PUBLIC_LESSONS.some((l) => pathname === l.path || pathname.startsWith(`${l.path}/`));
}

export function isLesson2Slug(slug: string) {
  return slug === LESSON_2.slug;
}

export const ROBOTS_DISALLOW = [
  `${BASE_PATH}/mock`,
  `${BASE_PATH}/mocks`,
  `${BASE_PATH}/api`,
  `${BASE_PATH}/keys`,
  `${BASE_PATH}/cms`,
  `${BASE_PATH}/practice`,
  `${BASE_PATH}/investigations`,
  `${BASE_PATH}/plan`,
  `${BASE_PATH}/notebook`,
  `${BASE_PATH}/progress`,
  `${BASE_PATH}/ask`,
  `${BASE_PATH}/instructor`,
  `${BASE_PATH}/parent`,
  `${BASE_PATH}/expert`,
  `${BASE_PATH}/session`,
  `${BASE_PATH}/resources`,
  "/mock",
  "/mocks",
  "/api",
  "/keys",
  "/cms",
];

export const GATED_PREFIXES = [
  "/plan",
  "/practice",
  "/investigations",
  "/mocks",
  "/notebook",
  "/progress",
  "/ask",
  "/cms",
  "/instructor",
  "/parent",
  "/expert",
  "/session",
  "/resources",
];

export function isGatedPath(pathname: string) {
  if (GATED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return true;
  }
  if (pathname.startsWith("/learn/") && !isPublicLessonPath(pathname)) {
    return true;
  }
  return false;
}

export const HOME_FAQS = [
  {
    question: "Can you sit Physics 1 and Physics C E&M on the same afternoon in 2027?",
    answer: CLASH_OFFICIAL,
  },
  {
    question: "Can my child start Physics C E&M without an account?",
    answer:
      "Yes — two lessons. Flux versus local field, then a finite line of charge. After those two sittings we send you to study.anannt.ae/start. Parent WhatsApp is required there. If Physics 1 is also on the form, the next human step is a sitting-choice call, not taking both on 5 May.",
  },
  {
    question: "Is this a complete E&M course?",
    answer:
      "No. Two public lessons are open. Units 9–13 stay on the map as unpublished. Mock A may sit behind the gate. Mock B reuses Mock A stems — it is not a second paper.",
  },
  {
    question: "Is this Bluebook?",
    answer: "No. This studio is a self-study supplement. It is not Bluebook and is not AP Classroom.",
  },
] as const;
