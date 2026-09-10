# Anannt · AP Physics C: Electricity & Magnetism

Mastery-led preparation for the May 2027 AP Physics C: E&M exam. The product is a repeatable cycle — understand a physical situation, represent it, select a principle, derive a result, check it, and explain it — not a video library or an unrestricted chatbot.

Anannt is independent preparation. It does not register anyone for the AP exam and is not affiliated with the College Board.

## What is in this repo

- Onboarding and a 30–40 minute diagnostic that routes bridge repair (including the flux-versus-local-field misconception)
- A personal plan with 24 / 16 / 8-week templates and honest shortfall language
- Authored lessons for the calculus bridge and Units 8–13, each with prediction, Model→Represent→Derive→Check→Explain, a faded example, a representation task, and independent items
- Practice MCQs, structured FRQs, eight labelled simulations, and a May 2027 mock (42 MCQ / 85 min + 4 FRQ / 95 min) with server-side keys
- Mistake notebook, evidence-based progress (no fake 1–5 scores), Ask Anannt (rule-based hint ladder), expert queue, instructor view, academic CMS, guardian summary, and signature resources

Progress lives in `localStorage` on this device (`anannt-em-student-v1`). There is no account system and no payment processor; the Progress page can switch a demo entitlement without deleting history.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

The app binds to `0.0.0.0:43123`. Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

Useful scripts:

```bash
npm run test:physics   # deterministic E&M library checks (Gauss, RC/RL, Faraday, …)
npm run build          # production build
npm run start          # serve the production build on 43123
```

On the landing page, **Load a sample learner** seeds a device profile so My Plan, the notebook, and Progress are not empty.

## Exam profile

Attempts are pinned to the May 2027 College Board format: 42 multiple-choice questions in 85 minutes and four free-response questions in 95 minutes (hybrid digital). Older 40-question / 80-minute timing is labelled legacy and is not used for new sittings.

## Inventory honesty

This build covers every listed CED topic with authored lessons and items so the learning cycle is usable end to end. It does **not** yet contain the full proposed commercial counts (72 syllabus lessons, 600 unique practice MCQs, 96 FRQs, four independent 42-item mocks). Mock B currently reuses Mock A’s public stems in reverse order. Do not sell those counts as shipped.
