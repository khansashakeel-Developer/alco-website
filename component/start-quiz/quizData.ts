// "Find your path" quiz: questions, answer types and the recommendation rules.
// All copy lives here, so a label or a rule changes in one place only.
// Rules kept from the site: no prices, no em dashes, "AL&CO", everyone starts at Level 1,
// graduates are sent to "Revisit a training", never to the free webinar.

export type FocusId = "confidence" | "calm" | "habits" | "relationships" | "career" | "past" | "hypnosis";
export type GoalId = "self" | "work" | "certified" | "trainer";
export type JourneyId = "new" | "some" | "elsewhere" | "graduate";
export type StyleId = "live" | "flexible" | "unsure";

export type QuizAnswers = {
  focus: FocusId[];
  goal: GoalId | null;
  journey: JourneyId | null;
  style: StyleId | null;
};

export const EMPTY_ANSWERS: QuizAnswers = { focus: [], goal: null, journey: null, style: null };

export const STORAGE_KEY = "alco_path_quiz";

export type Option<T extends string> = { id: T; label: string; hint?: string };

export const FOCUS_OPTIONS: Option<FocusId>[] = [
  { id: "confidence", label: "Confidence and self-belief" },
  { id: "calm", label: "Calm and overthinking" },
  { id: "habits", label: "Habits and motivation" },
  { id: "relationships", label: "Relationships and communication" },
  { id: "career", label: "Career and leadership" },
  { id: "past", label: "Letting go of the past" },
  { id: "hypnosis", label: "Hypnosis and deep change" },
];

export const GOAL_OPTIONS: Option<GoalId>[] = [
  { id: "self", label: "Change something in my own life", hint: "I want results for myself first." },
  { id: "work", label: "Add NLP or hypnosis to my work", hint: "Coach, counsellor, HR, teacher, leader." },
  { id: "certified", label: "Become a certified practitioner or coach", hint: "A real qualification I can practise with." },
  { id: "trainer", label: "Become a trainer", hint: "Teach NLP or hypnosis to others." },
];

export const JOURNEY_OPTIONS: Option<JourneyId>[] = [
  { id: "new", label: "Just starting out", hint: "I do not know much about NLP or hypnosis yet." },
  { id: "some", label: "I know a little", hint: "I have read, watched or attended a talk, but never trained." },
  { id: "elsewhere", label: "I have studied elsewhere", hint: "I trained with another school or provider." },
  { id: "graduate", label: "I am an AL&CO graduate", hint: "I have already trained with Arslan Larik and Company." },
];

export const STYLE_OPTIONS: Option<StyleId>[] = [
  { id: "live", label: "Live, with a trainer in the room", hint: "Taught live on Zoom, with Arslan teaching personally." },
  { id: "flexible", label: "I need it to fit around my life", hint: "I want to know how the schedule works." },
  { id: "unsure", label: "I am not sure yet", hint: "Show me what is possible first." },
];

// ---------------------------------------------------------------------------
// Levels (names exactly as on /programs)
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

/** Levels that make up this person's route. Level 1 is always first: everyone starts there. */
export function routeFor(a: QuizAnswers): number[] {
  const hypnosis = a.focus.includes("hypnosis");
  switch (a.goal) {
    case "work":
      return hypnosis ? [1, 2, 3] : [1, 2];
    case "certified":
      return hypnosis ? [1, 2, 3] : [1, 2];
    case "trainer":
      return hypnosis ? [1, 2, 3, 4, 5, 6] : [1, 2, 4, 6];
    case "self":
    default:
      return hypnosis ? [1, 3] : [1];
  }
}

// ---------------------------------------------------------------------------
// Personalised copy
// ---------------------------------------------------------------------------
export const FOCUS_HEADLINE: Record<FocusId, string> = {
  confidence: "Confidence is a skill you can train. Here is where yours begins.",
  calm: "A quieter mind is something you can practise. Here is where to start.",
  habits: "Habits change when your thinking changes. Here is your way in.",
  relationships: "How you communicate can be learned. Here is your first step.",
  career: "Leaders are built, not born. Here is your way in.",
  past: "The past does not have to run today. Here is a gentle place to begin.",
  hypnosis: "Hypnosis is a skill with a method behind it. Here is where to start.",
};

export type Exercise = { title: string; minutes: string; steps: string[]; note?: string };

// Short, gentle, self-help exercises. None of them is trauma work.
export const EXERCISES: Record<FocusId, Exercise> = {
  confidence: {
    title: "Build a confidence anchor",
    minutes: "3 minutes",
    steps: [
      "Remember a moment when you felt truly confident. See it through your own eyes.",
      "Let the feeling grow. When it peaks, press your thumb and first finger together for five seconds.",
      "Let go, shake it off, and repeat three times.",
      "Now press the same fingers and notice the feeling return. Use it before a hard moment.",
    ],
  },
  calm: {
    title: "Step back from the thought",
    minutes: "2 minutes",
    steps: [
      "Name the worry as a sentence, then say it as: \"I am having the thought that...\"",
      "Breathe in for four, out for six, six times. Make the out-breath longer.",
      "Ask: what is one small thing I can do about this today? Write it down.",
    ],
  },
  habits: {
    title: "Make the first step tiny",
    minutes: "2 minutes",
    steps: [
      "Pick one habit you want. Shrink it until it takes under two minutes.",
      "Picture yourself one week from now, having done it daily. Notice how it feels.",
      "Decide the exact moment you will do it tomorrow, and attach it to something you already do.",
    ],
  },
  relationships: {
    title: "Three positions",
    minutes: "4 minutes",
    steps: [
      "Think of a conversation you want to go well. First, see it from your own side.",
      "Now step into the other person's shoes. What do they want, and what are they afraid of?",
      "Finally, watch the two of you as a calm observer. What would you suggest?",
    ],
  },
  career: {
    title: "A clear outcome",
    minutes: "3 minutes",
    steps: [
      "Write one goal in positive words: what you want, not what you want to avoid.",
      "How will you know you have it? Write what you will see, hear and feel.",
      "Write the one step you can take in the next 24 hours.",
    ],
  },
  past: {
    title: "Question an old belief",
    minutes: "3 minutes",
    steps: [
      "Write one belief you carry, as a sentence, for example: \"I am not good enough.\"",
      "Ask: where did I learn this, and is it still true today?",
      "Write the belief you would rather hold, and one small action that fits it.",
    ],
    note: "Use this for everyday beliefs. For painful memories, work with a qualified professional.",
  },
  hypnosis: {
    title: "A first taste of self-hypnosis",
    minutes: "4 minutes",
    steps: [
      "Sit comfortably and fix your eyes on one spot. Breathe slowly.",
      "Let your eyelids grow heavy. When they close, relax your body from forehead to feet.",
      "Count down from five to one, letting yourself go a little deeper with each number.",
      "Stay as long as you like, then count up from one to five and open your eyes, alert and clear.",
    ],
    note: "Never do this while driving or operating machinery.",
  },
};

export function summaryLine(a: QuizAnswers): string {
  const f = a.focus.map((id) => FOCUS_OPTIONS.find((o) => o.id === id)?.label).filter(Boolean).join(" and ");
  const g = GOAL_OPTIONS.find((o) => o.id === a.goal)?.label ?? "";
  const j = JOURNEY_OPTIONS.find((o) => o.id === a.journey)?.label ?? "";
  const s = STYLE_OPTIONS.find((o) => o.id === a.style)?.label ?? "";
  return `Find your path quiz. Focus: ${f}. Goal: ${g}. Journey: ${j}. Learning style: ${s}.`;
}

/** Search words (regex alternation) used to pick blog posts that match each focus. */
export const FOCUS_KEYWORDS: Record<FocusId, string> = {
  confidence: "confiden|self-belief|self belief",
  calm: "anxi|stress|overthink|calm|worry",
  habits: "habit|procrastinat|motivat",
  relationships: "relationship|communicat|rapport",
  career: "leader|career|performance",
  past: "belief|let go|emotion",
  hypnosis: "hypno",
};