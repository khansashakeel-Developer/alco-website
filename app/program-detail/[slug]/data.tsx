import Link from "next/link";
import { BannerType } from "@/type/bannerType";
import { ContentSectionType } from "@/type/contentSection";
import { ProgramTypeInnerDetail } from "@/type/programType";

// Images
import programLevel1 from "@/assets/background/program-level-1.webp"
import { LevelBenefitsTableType } from "@/type/levelBenefitsTable";

// Level 1 Start

const bannerDataLevel1: BannerType = {
  level: "level 1",
  title: {
    line1: "Benefits of NLP Practitioner Training"
  },
  description: "Quad Certification plus UK ANLP CPD",
  image: programLevel1.src
};

const IntroDataLevel1: ContentSectionType = {
  title: "Benefits for You, and for the People You Coach",
  TagType: "h2",
  textAlign: "text-start",
  padding: "py-6 md:py-8 lg:py-12",
  description: (
    <div className="max-w-5xl">
      <p className="my-4">
        Every topic of the NLP Practitioner does two jobs: it changes how you think, speak and feel, and it gives you a tool you can use with a paying client. The table below takes the training topic by topic.
      </p>
      <p className="mb-4">
        For the full curriculum, the quad certification and how to join, see the <Link href="/program/nlp-practitioner" className="underline">NLP Practitioner programme page</Link>, or <Link href="/programs" className="underline">all programmes</Link>.
      </p>
    </div>
  ),
};

const LevelBenefitsTableData1Level1: LevelBenefitsTableType = {
  title: {
    line1: "Topic by Topic:",
    line2: "What Each Part of the Training Gives You",
  },

  bgColor: "bg-neutral-100",
  showAll: true,

  headers: [
    "Content",
    "Benefits for Personal Development",
    "Benefits for Coaches",
  ],

  points: [
    {
      content: "Definition of NLP",
      values: [
        "Understand how your mind works, allowing you to break free from limiting beliefs.",
        "Equip yourself with foundational NLP knowledge to guide clients confidently.",
      ],
    },
    {
      content: "Themes of NLP",
      values: [
        "Develop clarity and alignment in thoughts and emotions.",
        "Use NLP principles to create structured, impactful coaching sessions that help clients achieve sustainable change.",
      ],
    },
    {
      content: "Ecology",
      values: [
        "Make decisions that align with your values and positively impact your life and relationships.",
        "Guide clients to assess the impact of their goals on their lives, relationships, and overall well-being, ensuring ethical and sustainable growth.",
      ],
    },
    {
      content: "NLP Communication Model",
      values: [
        "Improve your communication to connect with others deeply, reduce misunderstandings, and build stronger relationships.",
        "Teach clients how to communicate effectively and interpret verbal and non-verbal cues to build rapport and influence outcomes.",
      ],
    },
    {
      content: "Presuppositions of NLP",
      values: [
        "Reframe your mindset to embrace positive, empowering beliefs that transform your approach to challenges.",
        "Help clients adopt empowering perspectives that enable growth and dissolve self-limiting beliefs.",
      ],
    },
    {
      content: "Observing Other People (Sensory Acuity)",
      values: [
        "Sharpen your observation skills to understand unspoken emotions and intentions, enhancing relationships and connections.",
        "Master sensory acuity to pick up subtle client cues, improving your ability to respond and adapt in coaching sessions.",
      ],
    },
    {
      content: "Rapport",
      values: [
        "Build trust effortlessly and strengthen connections in personal and professional relationships.",
        "Learn to establish instant rapport with clients, creating a safe space for open communication and trust.",
      ],
    },
    {
      content: "Representational Systems (Preference Test)",
      values: [
        "Gain insight into your preferred communication style and adapt to connect effectively with others.",
        "Identify and utilize clients' preferred communication styles to enhance understanding and collaboration.",
      ],
    },
    {
      content: "Predicates",
      values: [
        "Master language patterns to influence and inspire positive responses in everyday interactions.",
        "Use predicates effectively to tailor your coaching communication to resonate with clients, ensuring better engagement.",
      ],
    },
    {
      content: "Eye Patterns",
      values: [
        "Decode unspoken thoughts and emotions by observing eye movements, enhancing your interpersonal understanding.",
        "Apply eye pattern analysis to uncover client thought processes and guide them toward clarity and insight.",
      ],
    },
    {
      content: "Sub Modalities",
      values: [
        "Reprogram your mind to replace negative habits and emotions with empowering ones.",
        "Use sub-modalities to help clients shift limiting beliefs and create lasting behavioral changes.",
      ],
    },
    {
      content: "Sub-Modality Shift from Like to Dislike",
      values: [
        "Break free from unhealthy attachments or habits by changing how you perceive them.",
        "Assist clients in letting go of cravings and unhelpful attachments through this technique.",
      ],
    },
    {
      content: "Swish Pattern",
      values: [
        "Replace unresourceful negative behaviors with empowering ones to improve your daily routines and outcomes.",
        "Work with clients on the behaviors they choose to change, and guide them towards the empowering behaviors they want, through this intervention.",
      ],
    },
    {
      content: "Anchoring",
      values: [
        "Learn to trigger positive emotional states at will, boosting confidence and emotional stability.",
        "Teach clients how to anchor resourceful states to overcome stress, fear, and anxiety.",
      ],
    },
    {
      content: "Understanding the Conscious Use of Language",
      values: [
        "Master impactful communication techniques to influence outcomes in personal and professional settings.",
        "Equip yourself with language tools (Meta Model, Milton Model, metaphors) to guide clients toward clarity and breakthrough.",
      ],
    },
    {
      content: "Reframing (for Negative Thinking Patterns)",
      values: [
        "Shift negative perspectives into positive ones, enabling you to see opportunities in every challenge.",
        "Guide clients to reframe their challenges into actionable solutions, moving from where they are to where they want to go next.",
      ],
    },
    {
      content: "Cause & Effect",
      values: [
        "Take control of your life by recognizing where you’re at and gaining the power to create positive change.",
        "Empower clients to break free from victim mindsets and take ownership of their decisions.",
      ],
    },
    {
      content: "Metaphors",
      values: [
        "Learn how to use stories and metaphors to reprogram your mind and inspire change.",
        "Use metaphors to help clients understand complex ideas and facilitate deep transformation.",
      ],
    },
    {
      content: "Time Line Therapy® Techniques",
      values: [
        "Release negative emotions and limiting decisions at the root, so you can live with clarity and purpose.",
        "Guide clients through Time Line Therapy® Techniques to release what holds them back, faster and at the unconscious level.",
      ],
    },
    {
      content: "SMART Goals and the Wheel of Life",
      values: [
        "Gain clarity on your goals and create actionable plans to achieve them with confidence.",
        "Help clients set and achieve measurable goals aligned with their values.",
      ],
    },
    {
      content: "Ultimate Success Formula",
      values: [
        "Build confidence in achieving personal goals using structured techniques.",
        "Teach clients how to replicate success patterns for consistent results.",
      ],
    },
    {
      content: "Five Principles for Success",
      values: [
        "Develop a success-oriented mindset with resilience and focus.",
        "Help clients embrace principles to accelerate progress and stay motivated.",
      ],
    },
    {
      content: "Perceptual Positions",
      values: [
        "Gain fresh perspectives to resolve misunderstandings and improve relationships.",
        "Teach clients to shift perspectives for better empathy and communication.",
      ],
    },
    {
      content: "Prime Directive of the Unconscious Mind",
      values: [
        "Understand and harness the power of your unconscious mind.",
        "Guide clients to leverage their unconscious mind for breakthroughs.",
      ],
    },
    {
      content: "TLT for Limiting Decisions",
      values: [
        "Break free from beliefs like 'I'm not good enough'.",
        "Work with clients to release the limiting decisions that stand between them and the progress they want.",
      ],
    },
    {
      content: "TLT for Anxiety",
      values: [
        "Eliminate anxiety by addressing its root cause at a subconscious level.",
        "Equip clients with tools to dissolve anxiety and build confidence.",
      ],
    },
  ],
};

// Level 1 End

// Level 2 Start

const bannerDataLevel2: BannerType = {
  level: "level 2",
  title: {
    line1: "How NLP Master Practitioner Training Helps You in Your Life"
  },
  description: "Quad Certification plus a Second UK ANLP CPD",
  image: programLevel1.src
};

const IntroDataLevel2: ContentSectionType = {
  title: "From Changing Yourself to a Livelihood",
  TagType: "h2",
  textAlign: "text-start",
  padding: "py-6 md:py-8 lg:py-12",
  description: (
    <div className="max-w-5xl">
      <p className="my-4">
        At Practitioner you change yourself; at Master Practitioner you gain a capability and a livelihood. The three tables below take the NLP, Time Line Therapy® and coaching parts of Level 2 technique by technique: how each one helps you personally, and how it helps you as a coach.
      </p>
      <p className="mb-4">
        For the full curriculum, the quad certification and how to join, see the <Link href="/program/nlp-master-practitioner" className="underline">NLP Master Practitioner programme page</Link>, or <Link href="/programs" className="underline">all programmes</Link>.
      </p>
    </div>
  ),
};

const LevelBenefitsTableData1Level2: LevelBenefitsTableType = {
  title: {
    line1: "Neuro-Linguistic Programming (NLP)",
    line2: "",
  },

  bgColor: "bg-neutral-100",

  showAll: true,

  headers: [
    "Technique",
    "How It Helps You Personally",
    "How It Helps You as a Coach",
  ],

  points: [
    {
      content: "Definition of NLP (Advanced Version)",
      values: [
        "Understand how your mind works so you can make better decisions and overcome negative patterns.",
        "Build a strong foundation to help clients reprogram their thoughts and behaviors effectively.",
      ],
    },
    {
      content: "Themes of NLP (Advanced Detailing)",
      values: [
        "Learn key principles to create a balanced and fulfilling life by aligning thoughts, emotions, and actions.",
        "Use these principles to guide clients in achieving clarity and focus.",
      ],
    },
    {
      content: "Interventions for Challenges",
      values: [
        "Use practical tools to handle everyday problems with confidence.",
        "Help clients solve their challenges with targeted interventions.",
      ],
    },
    {
      content: "Prime Directives of the Unconscious Mind",
      values: [
        "Discover how your unconscious drives habits and emotions, helping you achieve personal breakthroughs.",
        "Leverage this understanding to create coaching strategies that lead to lasting results for clients.",
      ],
    },
    {
      content: "Ecology",
      values: [
        "Ensure your goals align with your values and relationships, creating harmony in your life.",
        "Teach clients to assess the broader impact of their goals and choices for sustainable success.",
      ],
    },
    {
      content: "RAS Reticular Activating System",
      values: [
        "Focus your mind on opportunities and filter out distractions.",
        "Help clients enhance their focus and productivity by training their minds effectively.",
      ],
    },
    {
      content: "Quantum Linguistics",
      values: [
        "Change the way you think and speak to unlock new possibilities and overcome problems.",
        "Guide clients to use empowering language patterns to create positive change.",
      ],
    },
    {
      content: "Advanced Presuppositions",
      values: [
        "Adopt beliefs that drive success and eliminate limiting assumptions.",
        "Guide clients to build the empowering perspectives they choose, so confidence grows from within.",
      ],
    },
    {
      content: "Cartesian Coordinates",
      values: [
        "Analyze decisions from multiple angles to make better choices.",
        "Coach clients to explore all options and perspectives for informed decision-making.",
      ],
    },
    {
      content: "Modal Operators Deeper Understanding",
      values: [
        "Understand what motivates you and align decisions with your values.",
        "Identify what drives clients and guide them to refine their choices for success.",
      ],
    },
    {
      content: "Time Scramble",
      values: [
        "Break free from repetitive negative thinking patterns and replace them with empowering thoughts.",
        "Work with clients to reshape repetitive thought loops into the frameworks they want to think in.",
      ],
    },
    {
      content: "Reality Intervention",
      values: [
        "Break free from mental blocks by shifting how you see the world and your capabilities.",
        "Enable clients to redefine their perspectives and expand their possibilities.",
      ],
    },
    {
      content: "Values Tools and Techniques",
      values: [
        "Align your actions with what truly matters to you, fostering a sense of purpose.",
        "Help clients explore and align their values to achieve clarity and fulfillment.",
      ],
    },
    {
      content: "Logical Levels of Therapy and the Phobia Cure",
      values: [
        "Overcome fears and phobias by systematically addressing their root causes.",
        "Provide clients with structured tools to eliminate fears and phobias effectively.",
      ],
    },
    {
      content: "Advanced Sub Modality Work",
      values: [
        "Gain control over how you experience emotions and memories to improve your mindset.",
        "Teach clients to reshape their emotional responses for a healthier outlook.",
      ],
    },
    {
      content: "Advanced Strategy Work",
      values: [
        "Develop strategies for motivation, better decision-making, and stronger relationships.",
        "Equip clients with practical approaches to enhance key areas of their lives.",
      ],
    },
    {
      content: "Reframing (16 Sleight of Mouth Patterns)",
      values: [
        "Change how you see challenges, turning obstacles into opportunities for growth.",
        "Guide clients to adopt new perspectives and empower them to take meaningful action.",
      ],
    },
    {
      content: "Chaining Anchors",
      values: [
        "Overcome procrastination, confusion, and stress by building positive emotional states.",
        "Help clients anchor empowering emotions for consistent confidence and resilience.",
      ],
    },
    {
      content: "PHQ: Personal History Questionnaire",
      values: [
        "Gain clarity on your life patterns and uncover the root causes of challenges.",
        "Use this tool to perform detailed history-taking and identify client challenges.",
      ],
    },
    {
      content: "Compulsion Blowout",
      values: [
        "Break free from compulsive behaviors and patterns that limit your potential.",
        "Work with clients who choose to change a compulsive pattern, alongside their medical practitioner where one is involved, and guide them towards the patterns they want.",
      ],
    },
    {
      content: "Basic Meta Programs",
      values: [
        "Understand how your mind filters information and shapes your decisions.",
        "Identify clients’ thought patterns for better personality analysis and coaching.",
      ],
    },
    {
      content: "Complex Meta Programs",
      values: [
        "Explore deeper mental patterns to understand personality traits and behaviors.",
        "Analyze and shift clients’ behavioral patterns for lasting change.",
      ],
    },
  ],
};

const LevelBenefitsTableData2Level2: LevelBenefitsTableType = {
  title: {
    line1: "Time Line Therapy® Techniques",
    line2: "",
  },

  showAll: true,

  headers: [
    "Technique",
    "How It Helps You Personally",
    "How It Helps You as a Coach",
  ],

  points: [
    {
      content: "Releasing Negative Emotions (TLT #1 & #2)",
      values: [
        "Let go of emotions like anger, sadness, and guilt that hold you back.",
        "Guide clients to release emotional burdens for lasting change.",
      ],
    },
    {
      content: "Elicitation of TimeLine",
      values: [
        "Understand how you see time to create clear and achievable goals.",
        "Teach clients to visualize their timelines for structured growth and success.",
      ],
    },
    {
      content: "Emotional Chains",
      values: [
        "Break patterns of emotional reactions and create a calmer, more balanced mindset.",
        "Help clients identify triggers and replace them with empowering responses.",
      ],
    },
    {
      content: "Setting a Goal with TLT",
      values: [
        "Embed your goals into your future timeline, making them more tangible and achievable.",
        "Assist clients in creating a roadmap to success and anchoring it in their timeline.",
      ],
    },
    {
      content: "Forensic and Regression Work with Time Line Therapy®",
      values: [
        "Revisit significant past events through a structured process, to gain insight and resolution.",
        "Use structured regression work to help clients gain insight into significant past events and release their emotional charge.",
      ],
    },
    {
      content: "Regression Work for Grief",
      values: [
        "Process loss in a structured way and find a sense of closure.",
        "Support clients through loss with compassion and structured techniques, and refer to clinical care where a case needs it.",
      ],
    },
    {
      content: "Phobia Model",
      values: [
        "Overcome fears and phobias to regain control and confidence.",
        "Give clients structured tools to resolve fears and phobias.",
      ],
    },
    {
      content: "General Reframes",
      values: [
        "Shift how you see challenges to create empowering solutions.",
        "Teach clients to transform limiting beliefs into opportunities for growth.",
      ],
    },
    {
      content: "Secondary Gains and the Pain Paradigm",
      values: [
        "Understand the Pain Paradigm, a structured approach to pain management, always alongside medical care and never instead of it.",
        "Support a client's pain management with the Pain Paradigm once a doctor has assessed them, and refer wherever a case needs clinical care.",
      ],
    },
    {
      content: "TLT for Anxiety",
      values: [
        "Release anxiety by understanding and resolving its underlying triggers.",
        "Support clients in overcoming anxiety and creating a calm, focused mindset.",
      ],
    },
    {
      content: "Drop-Down Through Technique",
      values: [
        "Break through layers of negative emotions to find clarity and inner peace.",
        "Guide clients through deeply held emotional patterns, taking them from where they are to where they want to be next.",
      ],
    },
  ],
};

const LevelBenefitsTableData3Level2: LevelBenefitsTableType = {
  title: {
    line1: "NLP Coaching",
    line2: "",
  },

  bgColor: "bg-neutral-100",

  showAll: true,

  headers: [
    "Technique",
    "How It Helps You Personally",
    "How It Helps You as a Coach",
  ],

  points: [
    {
      content: "Complete the Coaching Cycle with NLP & TLT",
      values: [
        "Achieve clarity on your goals and create actionable steps to reach them.",
        "Guide clients through a proven coaching process to help them achieve their goals.",
      ],
    },
    {
      content: "Client Agreements",
      values: [
        "Build trust and ensure clear communication in your relationships.",
        "Establish clear expectations and goals with clients to create productive sessions.",
      ],
    },
    {
      content: "Assigning Coaching Tasks",
      values: [
        "Stay accountable and track your progress effectively.",
        "Help clients stay focused and achieve their objectives with personalized tasks.",
      ],
    },
    {
      content: "Integration of Conscious and Unconscious",
      values: [
        "Align your conscious goals with your deeper desires for holistic success.",
        "Teach clients how to harmonize their conscious and unconscious minds for meaningful change.",
      ],
    },
    {
      content: "Sequential Levels of Coaching",
      values: [
        "Progress through a structured journey of growth, step by step.",
        "Guide clients through sequential levels to achieve lasting transformation.",
      ],
    },
    {
      content: "How to Get Paid Coaching Clients and Build a Coaching Business",
      values: [
        "Learn practical strategies to attract clients and grow your coaching business.",
        "Equip yourself with tools to market your services and secure premium clients.",
      ],
    },
    {
      content: "Logical Levels of Coaching",
      values: [
        "Understand how different aspects of your life (beliefs, identity, etc.) interact for holistic growth.",
        "Help clients align their goals with their core values for deeper change.",
      ],
    },
    {
      content: "Sales Techniques for Coaching",
      values: [
        "Present your coaching value confidently and close deals effectively.",
        "Teach clients to market themselves and grow their businesses with proven sales techniques.",
      ],
    },
  ],
};

// Level 2 End

// Level 3 Start

const bannerDataLevel3: BannerType = {
  level: "level 3",
  title: {
    line1: "Benefits of Advanced Hypnotherapy and Interventionist Training"
  },
  description: "ABH and NGH Hypnosis Certification",
  image: programLevel1.src
};

const IntroDataLevel3: ContentSectionType = {
  title: "Hypnotic Language: What It Gives You",
  TagType: "h2",
  textAlign: "text-start",
  padding: "py-6 md:py-8 lg:py-12",
  description: (
    <div className="max-w-5xl">
      <p className="my-4">
        Level 3 builds hypnotists, not scriptists. This table covers the language of hypnosis, the first part of the programme: how each pattern helps you personally, and how it serves your practice. This is work for change, performance and habits, never the treatment of illness.
      </p>
      <p className="mb-4">
        For the full curriculum, the ABH and NGH certificates, the professional library and how to request an interview, see the <Link href="/program/advanced-hypnotherapy-interventionist" className="underline">Advanced Hypnotherapy and Interventionist programme page</Link>, or <Link href="/programs" className="underline">all programmes</Link>.
      </p>
    </div>
  ),
};

const LevelBenefitsTableData1Level3: LevelBenefitsTableType = {
  title: {
    line1: "Hypnotic Language, Topic by Topic",
    line2: "",
  },

  bgColor: "bg-neutral-100",
  showAll: true,

  headers: [
    "Content",
    "Benefits for Personal Development",
    "Benefits for Your Practice",
  ],

  points: [
    {
      content: "History of Hypnosis",
      values: [
        "Discover how hypnosis evolved from ancient practice to the modern discipline you will practise, deepening self-awareness and unconscious mastery.",
        "Learn foundational principles that enhance your credibility and ability to explain hypnosis effectively to clients.",
      ],
    },
    {
      content: "Working with Abreaction and Secondary Gains",
      values: [
        "Release suppressed emotions and overcome self-sabotaging behaviors, at the root.",
        "Guide clients through emotional catharsis safely, addressing unconscious blocks for lasting change.",
      ],
    },
    {
      content: "Mastering Conversational Hypnosis",
      values: [
        "Enhance your ability to influence and communicate persuasively in everyday interactions, fostering deeper connections.",
        "Guide clients into trance through conversation, within the agreement you have made together, easing conscious resistance so change can happen at the unconscious level.",
      ],
    },
    {
      content: "Fundamentals of Ericksonian Hypnosis",
      values: [
        "Develop mental flexibility, enhance problem-solving skills, and use metaphors for self-reprogramming.",
        "Master indirect suggestions and storytelling to create effortless, resistance-free hypnosis sessions.",
      ],
    },
    {
      content: "Hypnotic Patterns",
      values: [
        "Rewire thought processes for greater confidence, motivation, and personal growth.",
        "Apply structured language patterns to deepen trance, enhance suggestibility, and accelerate client breakthroughs.",
      ],
    },
    {
      content: "Direct & Indirect Suggestions",
      values: [
        "Strengthen self-discipline by reinforcing positive habits and behaviors through unconscious programming.",
        "Learn to craft powerful, precisely timed suggestions that work at both conscious and unconscious levels.",
      ],
    },
    {
      content: "Embedded Commands",
      values: [
        "Develop unconscious self-mastery by embedding empowering affirmations into your daily thinking patterns.",
        "Use embedded commands within the hypnotic contract and with your client's consent, to support the change they have asked for.",
      ],
    },
    {
      content: "Truism About Sensations",
      values: [
        "Increase mind-body awareness to regulate emotions, manage stress, and enhance sensory perception.",
        "Guide clients into trance more effectively by leveraging universally accepted truths about bodily sensations.",
      ],
    },
    {
      content: "Truism Utilizing Time",
      values: [
        "Shift perspectives on past experiences and future expectations, gaining greater control over emotions and decision-making.",
        "Use time-based truisms to reshape client narratives about their past and future, fostering profound internal shifts.",
      ],
    },
    {
      content: "Not Knowing, Not Doing",
      values: [
        "Cultivate a mindset that embraces uncertainty, allowing for personal growth and expanded possibilities.",
        "Utilize this technique to bypass analytical resistance in clients, enabling them to access deeper unconscious insights.",
      ],
    },
    {
      content: "Open-Ended Suggestions",
      values: [
        "Encourage unconscious problem-solving by fostering an open, flexible thought process.",
        "Help clients explore solutions organically by delivering suggestions that invite deep unconscious exploration.",
      ],
    },
    {
      content: "Covering All Possibilities of Response",
      values: [
        "Develop adaptability and confidence in handling any situation effectively.",
        "Equip yourself with the ability to respond fluidly to client reactions, ensuring seamless hypnosis sessions.",
      ],
    },
    {
      content: "To Focus Attention",
      values: [
        "Enhance concentration, mindfulness, and present-moment awareness for greater productivity.",
        "Guide clients into deeper trance states by directing and sustaining their focus with precision.",
      ],
    },
    {
      content: "Facilitating Internal Change",
      values: [
        "Shift deep-seated patterns and enhance self-awareness for long-term transformation.",
        "Master hypnotherapy techniques that rewire negative thought loops, leading to sustainable client breakthroughs.",
      ],
    },
    {
      content: "Compound Suggestions",
      values: [
        "Strengthen unconscious reinforcement of positive changes for long-term personal success.",
        "Learn to layer multiple suggestions strategically, amplifying their impact for deeper and more lasting transformation.",
      ],
    },
  ],
};

// Level 3 End

export const programInnerDetail: ProgramTypeInnerDetail[] = [
  {
    slug: "benefits-of-choosing-nlp-training-course",
    seo: {
      title: "Benefits of NLP Practitioner Training by Topic | AL&CO",
      description: "What each NLP Practitioner topic gives you, for your own life and for coaching others: rapport, anchoring, reframing and more. Book a conversation today.",
      index: true,
      ogImage: "https://arslanlarik.com/og/nlp-practitioner.jpg",
    },
    BannerData: bannerDataLevel1,
    IntroData: IntroDataLevel1,
    LevelBenefitsTableData1: LevelBenefitsTableData1Level1,
  },
  {
    slug: "how-nlp-master-practitioner-training-helps-you-in-your-life",
    seo: {
      title: "How NLP Master Practitioner Training Helps You | AL&CO",
      description: "How each NLP Master Practitioner technique helps you personally and as a coach: values, Sleight of Mouth, emotional chains. Book a conversation today.",
      index: true,
      ogImage: "https://arslanlarik.com/og/nlp-master-practitioner.jpg",
    },
    BannerData: bannerDataLevel2,
    IntroData: IntroDataLevel2,
    LevelBenefitsTableData1: LevelBenefitsTableData1Level2,
    LevelBenefitsTableData2: LevelBenefitsTableData2Level2,
    LevelBenefitsTableData3: LevelBenefitsTableData3Level2,
  },
  {
    slug: "benefits-of-advanced-hypnotherapy-interventionist-training",
    seo: {
      title: "Benefits of Advanced Hypnotherapy Training, Level 3 | AL&CO",
      description: "How Level 3 hypnotic language patterns help you personally and in your practice: suggestion, truisms, binds and more. Request an interview today.",
      index: false,
      ogImage: "https://arslanlarik.com/og/advanced-hypnotherapy-interventionist.jpg",
    },
    BannerData: bannerDataLevel3,
    IntroData: IntroDataLevel3,
    LevelBenefitsTableData1: LevelBenefitsTableData1Level3,
  },
];
