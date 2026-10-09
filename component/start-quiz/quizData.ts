// "Find your path" quiz: questions, answer types and the recommendation rules.
// Source: ALCO_Website_Quiz_Find_Your_Path.docx (9 Oct 2026, Bismillah Pervez).
// All copy lives here, so a label or a rule changes in one place only.
// Rules kept from the site: no prices, no em dashes, "AL&CO", everyone starts at Level 1,
// graduates are sent to "Revisit a training", never to the free webinar.

export type FocusId =
  | "negative"
  | "overwhelm"
  | "selfesteem"
  | "procrastination"
  | "judgement"
  | "past"
  | "relationships"
  | "stress";

export type GoalId =
  | "mindset"
  | "emotional"
  | "relationships"
  | "financial"
  | "coaching"
  | "performance"
  | "certifications";

export type JourneyId = "new" | "some" | "elsewhere" | "graduate";
export type WhenId = "now" | "months" | "exploring" | "talk";

export type QuizAnswers = {
  focus: FocusId[];
  goals: GoalId[];
  journey: JourneyId | null;
  /** Only set when journey is "graduate": the highest level they completed with AL&CO (1 to 5). */
  graduateLevel: number | null;
  when: WhenId | null;
};

export const EMPTY_ANSWERS: QuizAnswers = { focus: [], goals: [], journey: null, graduateLevel: null, when: null };

export const STORAGE_KEY = "alco_path_quiz";

/** "Pick up to 4" on pages 2 and 3. */
export const MAX_PICKS = 4;

/** Where "Get the brochure" goes. Change this to the brochure PDF (for example "/brochure.pdf") once it is in /public. */
export const BROCHURE_HREF = "/contact#form";

export type Option<T extends string> = { id: T; label: string; hint?: string };

// Page 2
export const FOCUS_OPTIONS: Option<FocusId>[] = [
  { id: "negative", label: "Negative thinking" },
  { id: "overwhelm", label: "Emotional overwhelm" },
  { id: "selfesteem", label: "Low self-esteem and confidence" },
  { id: "procrastination", label: "Procrastination" },
  { id: "judgement", label: "Fear of judgement" },
  { id: "past", label: "Holding on to the past" },
  { id: "relationships", label: "Difficult relationships" },
  { id: "stress", label: "Stress and burnout" },
];

// Page 3
export const GOAL_OPTIONS: Option<GoalId>[] = [
  { id: "mindset", label: "Positive mindset" },
  { id: "emotional", label: "Emotional stability" },
  { id: "relationships", label: "Managing healthy relationships" },
  { id: "financial", label: "Financial independence" },
  { id: "coaching", label: "Coaching skills mastery" },
  { id: "performance", label: "Peak performance in work and life" },
  { id: "certifications", label: "International certifications" },
];

// Page 4
export const JOURNEY_OPTIONS: Option<JourneyId>[] = [
  { id: "new", label: "Just starting out", hint: "Perfect timing. Every great journey starts right here." },
  { id: "some", label: "I know a little", hint: "You've had a taste. Now let's make it real." },
  { id: "elsewhere", label: "I've studied elsewhere", hint: "Welcome. Let's build on what you already know." },
  { id: "graduate", label: "I'm an AL&CO graduate", hint: "Welcome back. Your next step is waiting." },
];

// Page 5
export const WHEN_OPTIONS: Option<WhenId>[] = [
  { id: "now", label: "I'm ready now", hint: "Show me the next batch dates." },
  { id: "months", label: "In the next few months", hint: "I'm planning ahead." },
  { id: "exploring", label: "I'm still exploring", hint: "I'd like to learn more first." },
  { id: "talk", label: "I'd like to talk to someone from Team AL&CO", hint: "Help me decide what's right for me." },
];

// ---------------------------------------------------------------------------
// Levels (names exactly as in the site menu: "Train the Trainer")
// ---------------------------------------------------------------------------
export type LevelInfo = { level: number; slug: string; name: string; line: string };

export const LEVELS: LevelInfo[] = [
  { level: 1, slug: "nlp-practitioner", name: "NLP Practitioner", line: "Your foundation. 10 days, 130 hours, with quad certification." },
  { level: 2, slug: "nlp-master-practitioner", name: "NLP Master Practitioner", line: "Go deeper, with a dedicated coach for your breakthrough." },
  { level: 3, slug: "advanced-hypnotherapy-interventionist", name: "Advanced Hypnotherapy and Interventionist", line: "Hypnosis and deep change work, at professional level." },
  { level: 4, slug: "nlp-trainers-training-program", name: "NLP Train the Trainer", line: "Learn to teach NLP." },
  { level: 5, slug: "hypnosis-trainers-training-program", name: "Hypnosis Train the Trainer", line: "Learn to teach hypnosis." },
  { level: 6, slug: "nlp-master-trainer-program", name: "NLP Master Trainer", line: "The highest level AL&CO teaches." },
];

/** Levels a graduate can say they have finished (Level 6 is the last step, so it is never a follow-up option). */
export const GRADUATE_LEVEL_OPTIONS = LEVELS.filter((l) => l.level <= 5);

/** The one level the results page leads with. Everyone starts at Level 1; graduates get the level after theirs. */
export function nextLevelFor(a: QuizAnswers): number {
  if (a.journey === "graduate" && a.graduateLevel) return Math.min(a.graduateLevel + 1, 6);
  return 1;
}

/** Levels highlighted on the "road" section of the results page. */
export function routeFor(a: QuizAnswers): number[] {
  if (a.journey === "graduate" && a.graduateLevel) return [Math.min(a.graduateLevel + 1, 6)];
  const wantsCertifiedCoaching = a.goals.includes("coaching") || a.goals.includes("certifications");
  return wantsCertifiedCoaching ? [1, 2] : [1];
}

// ---------------------------------------------------------------------------
// Free e-book: the first pick on page 2 decides; page 3 is the fallback.
// ---------------------------------------------------------------------------
export type BookKey = "future" | "emotions" | "enough" | "relationships" | "financial" | "questions" | "client";

const BOOK_FOR_FOCUS: Record<FocusId, BookKey> = {
  negative: "future",
  procrastination: "future",
  past: "future",
  overwhelm: "emotions",
  stress: "emotions",
  selfesteem: "enough",
  judgement: "enough",
  relationships: "relationships",
};

const BOOK_FOR_GOAL: Record<GoalId, BookKey> = {
  mindset: "future",
  performance: "future",
  emotional: "emotions",
  relationships: "relationships",
  financial: "financial",
  coaching: "questions",
  certifications: "client",
};

export function bookKeyFor(a: QuizAnswers): BookKey {
  if (a.focus[0]) return BOOK_FOR_FOCUS[a.focus[0]];
  if (a.goals[0]) return BOOK_FOR_GOAL[a.goals[0]];
  return "future";
}

// ---------------------------------------------------------------------------
// Personalised copy
// ---------------------------------------------------------------------------
export const RESULT_LINE = "This is where you learn how your mind works, and how to change the patterns holding you back.";

export type Exercise = { title: string; minutes: string; steps: string[]; note?: string };

// Short, gentle, self-help exercises. None of them is trauma work.
const CALM: Exercise = {
  title: "Step back from the thought",
  minutes: "2 minutes",
  steps: [
    "Name the worry as a sentence, then say it as: \"I am having the thought that...\"",
    "Breathe in for four, out for six, six times. Make the out-breath longer.",
    "Ask: what is one small thing I can do about this today? Write it down.",
  ],
};

const CONFIDENCE: Exercise = {
  title: "Build a confidence anchor",
  minutes: "3 minutes",
  steps: [
    "Remember a moment when you felt truly confident. See it through your own eyes.",
    "Let the feeling grow. When it peaks, press your thumb and first finger together for five seconds.",
    "Let go, shake it off, and repeat three times.",
    "Now press the same fingers and notice the feeling return. Use it before a hard moment.",
  ],
};

const HABITS: Exercise = {
  title: "Make the first step tiny",
  minutes: "2 minutes",
  steps: [
    "Pick one habit you want. Shrink it until it takes under two minutes.",
    "Picture yourself one week from now, having done it daily. Notice how it feels.",
    "Decide the exact moment you will do it tomorrow, and attach it to something you already do.",
  ],
};

const RELATIONSHIPS: Exercise = {
  title: "Three positions",
  minutes: "4 minutes",
  steps: [
    "Think of a conversation you want to go well. First, see it from your own side.",
    "Now step into the other person's shoes. What do they want, and what are they afraid of?",
    "Finally, watch the two of you as a calm observer. What would you suggest?",
  ],
};

const PAST: Exercise = {
  title: "Question an old belief",
  minutes: "3 minutes",
  steps: [
    "Write one belief you carry, as a sentence, for example: \"I am not good enough.\"",
    "Ask: where did I learn this, and is it still true today?",
    "Write the belief you would rather hold, and one small action that fits it.",
  ],
  note: "Use this for everyday beliefs. For painful memories, work with a qualified professional.",
};

export const EXERCISES: Record<FocusId, Exercise> = {
  negative: CALM,
  overwhelm: CALM,
  stress: CALM,
  selfesteem: CONFIDENCE,
  judgement: CONFIDENCE,
  procrastination: HABITS,
  relationships: RELATIONSHIPS,
  past: PAST,
};

export function summaryLine(a: QuizAnswers): string {
  const f = a.focus.map((id) => FOCUS_OPTIONS.find((o) => o.id === id)?.label).filter(Boolean).join(", ");
  const g = a.goals.map((id) => GOAL_OPTIONS.find((o) => o.id === id)?.label).filter(Boolean).join(", ");
  const j = JOURNEY_OPTIONS.find((o) => o.id === a.journey)?.label ?? "";
  const done = a.journey === "graduate" && a.graduateLevel ? ` (completed Level ${a.graduateLevel})` : "";
  const w = WHEN_OPTIONS.find((o) => o.id === a.when)?.label ?? "";
  return `Find your path quiz. Wants to change: ${f}. Wants to achieve: ${g}. Journey: ${j}${done}. Wants to begin: ${w}.`;
}

/** Search words (regex alternation) used to pick blog posts that match each focus. */
export const FOCUS_KEYWORDS: Record<FocusId, string> = {
  negative: "negative|thought|mindset",
  overwhelm: "overwhelm|emotion|anxi",
  selfesteem: "confiden|self-esteem|self esteem|self-belief",
  procrastination: "habit|procrastinat|motivat",
  judgement: "judg|confiden|fear",
  past: "belief|let go|past",
  relationships: "relationship|communicat|rapport",
  stress: "stress|burnout|calm|overthink",
};