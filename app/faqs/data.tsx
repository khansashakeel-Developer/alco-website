import React from "react";
import Link from "next/link";

/* ------------------------------------------------------------------
   FAQ data for /faqs.
   Source: long brochure, "Frequently Asked Questions" (p.34-35),
   "Start with a Free Webinar" (p.36), "How to Enrol", "Training Times"
   and "Why You Will Not Find a Number Here" (p.37), plus site FAQs that
   do not conflict with the brochure. NO PRICES anywhere in this file.
------------------------------------------------------------------- */

export type Faq = {
  question?: string;
  answer?: React.ReactNode;
  /** Plain-text answer used for the FAQPage JSON-LD. */
  schemaText?: string;
};

export type FaqGroup = {
  id: string;
  title: string;
  items: Faq[];
};

/** A FAQ whose answer is plain paragraphs: the same text feeds the page and the JSON-LD. */
const textFaq = (question: string, paragraphs: string[]): Faq => ({
  question,
  answer: (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} className="mb-3">{p}</p>
      ))}
    </>
  ),
  schemaText: paragraphs.join(" "),
});

const linkClass = "text-primary underline";

/* ============================== THE BASICS ============================== */
const basics: Faq[] = [
    textFaq(
      "Do I need any background to start?",
      [
      "None at all. Level 1 is built for the complete beginner. Think of it like learning to swim: we do not ask whether you already can, we get in the water with you and stay there until you are moving on your own."
      ]
    ),
    textFaq(
      "Is it really all online, and does that work?",
      [
      "Yes, fully live on Zoom, and it is nothing like watching a recording. You are in a real room with a real trainer and real classmates, practising on each other in every session. We were the first in the region to teach NLP this way, and our graduates now coach clients across the world because of it."
      ]
    ),
    textFaq(
      "What certifications will I actually hold?",
      [
      "At Practitioner and Master Practitioner, a true quad: NLP from the ABNLP, NLP Coach from its Coaching Division, Time Line Therapy® Techniques from the TLTA, and AL&CO’s own Behavioral Reengineering credential, plus a UK ANLP CPD accreditation. At Level 3 you add ABH and NGH hypnosis credentials, with the exact hypnosis title matched to your qualifications and country."
      ]
    ),
    textFaq(
      "Is hypnosis part of the Practitioner?",
      [
      "No, and that is deliberate. Hypnosis is a full journey of its own at Level 3, taught properly over 13 days: 12 days of live teaching, plus one mandatory day in between for assignments set by AL&CO. That is how we build hypnotists, not people reading from scripts."
      ]
    ),
  {
    question: "What is the scope of Neuro-Linguistic Programming?",
    answer: (
      <>
        <p>NLP training equips individuals with powerful tools to reshape behavior, improve communication, and unlock potential, fostering success and growth in all areas of life and work.</p>
        <ul className="list-none">
          <li><b className="text-secondary-medium mb-4">Homemakers:</b> <br/> NLP gives homemakers the emotional intelligence to hold family conversations and responsibilities with balance.</li>
          <li><b className="text-secondary-medium mb-4">Parents:</b> <br/> NLP helps parents understand children better and improve communication.</li>
          <li><b className="text-secondary-medium mb-4">Psychologists and Psychiatrists:</b> <br/> Many clinicians add NLP tools to deepen their existing practice.</li>
          <li><b className="text-secondary-medium mb-4">HR Professionals:</b> <br/> Improves hiring, conflict resolution, and team cohesion.</li>
          <li><b className="text-secondary-medium mb-4">Counselors and Trainers:</b> <br/> Adds depth to the space they hold for others, and to every session they deliver.</li>
          <li><b className="text-secondary-medium mb-4">Educationists and Doctors:</b> <br/> Improves teaching methods and patient communication.</li>
          <li><b className="text-secondary-medium mb-4">Lawyers and Entrepreneurs:</b> <br/> Enhances persuasion, decision-making, and leadership.</li>
          <li><b className="text-secondary-medium mb-4">Students and Managers:</b> <br/> Improves focus, confidence, and team dynamics.</li>
          <li><b className="text-secondary-medium mb-4">Public Speakers and Athletes:</b> <br/> Builds confidence, focus, and performance.</li>
        </ul>
        <p>No matter your role, NLP equips you to excel with confidence, clarity, and purpose.</p>
      </>
    ),
    schemaText:
      "NLP training equips individuals with powerful tools to reshape behavior, improve communication, and unlock potential, fostering success and growth in all areas of life and work. Homemakers, parents, psychologists and psychiatrists, HR professionals, counselors and trainers, educationists and doctors, lawyers and entrepreneurs, students and managers, public speakers and athletes all use it in their own way. No matter your role, NLP equips you to excel with confidence, clarity, and purpose.",
  },
  {
    question: "How would NLP training help me?",
    answer: (
      <>
        <p>NLP adapts to your specific needs and transforms both personal and professional life.</p>
        <ul className="list-none">
          <li><b className="text-secondary-medium mb-4">For Personal Growth:</b> <br/> You learn to manage your emotions, update limiting beliefs and deepen your relationships.</li>
          <li><b className="text-secondary-medium mb-4">For Professional Excellence:</b> <br/> Enhances communication, leadership, and decision-making.</li>
          <li><b className="text-secondary-medium mb-4">For a Coaching Career:</b> <br/> Provides tools and certifications to help others transform.</li>
          <li><b className="text-secondary-medium mb-4">For Financial Freedom:</b> <br/> Helps you build a coaching business and attract clients.</li>
        </ul>
      </>
    ),
    schemaText:
      "NLP adapts to your specific needs and transforms both personal and professional life. For personal growth, you learn to manage your emotions, update limiting beliefs and deepen your relationships. For professional excellence, it enhances communication, leadership and decision-making. For a coaching career, it provides tools and certifications to help others transform. For financial freedom, it helps you build a coaching business and attract clients.",
  },
  {
    question: "Will I become a coach in 10 days or 13 days?",
    answer: (
      <>
        <p className="mb-3">Almost nobody becomes a coach in ten days, and we have never pretended otherwise. You can begin your coaching journey after the 10-day NLP Practitioner or the 13-day NLP Master Practitioner, and everything after your cohort is built to carry you further:</p>
        <ul className="list-none mb-3">
          <li>Come back, free, for five years: re-attend our live Practitioner, Master Practitioner and Advanced Hypnotherapy trainings as many times as you like.</li>
          <li>Your manual, about 500 pages per level, issued digitally and yours to keep, and your audio library on AL&CO's online learning portal: 222 audio files at Level 1 and 225 at Level 2.</li>
          <li>A global community where you coach other members, and choose members to coach you in return.</li>
          <li>The chance to return as a coaching assistant in a live batch.</li>
        </ul>
        <p>Mastery comes with practice and continuous learning.</p>
      </>
    ),
    schemaText:
      "Almost nobody becomes a coach in ten days, and we have never pretended otherwise. You can begin your coaching journey after the 10-day NLP Practitioner or the 13-day NLP Master Practitioner. After your cohort you can come back, free, for five years to re-attend our live Practitioner, Master Practitioner and Advanced Hypnotherapy trainings; you keep your manual, about 500 pages per level, issued digitally and yours to keep, and you have your audio library on AL&CO's online learning portal (222 audio files at Level 1 and 225 at Level 2); you join a global community where you coach and are coached; and you can return as a coaching assistant in a live batch. Mastery comes with practice and continuous learning.",
  },
  // WP4: "How is NLP different from ICF?" removed. Ruling of 25 Sep 2026: ICF appears only with
  // Bismillah Pervez's credentials (see E 07 E.2). PLEASE CHECK with Arslan if it should come back.
];

/* ========================= THE HONEST QUESTIONS ========================= */
const honest: Faq[] = [
    textFaq(
      "Isn’t NLP just pseudoscience?",
      [
      "We agree with the criticism whenever NLP is sold as a medical science that cures illness, because for something to be pseudoscience it first has to claim to be a science. We do not make that claim. We treat this as an art: the study of how people who thrive structure their thinking, language and choices, mapped so it can be learned and repeated, the same way you might study how a great athlete or negotiator does what they do. Some of the underlying techniques are well supported and some are debated, and we would rather tell you that than pretend otherwise. What is not in question is the recognition behind your certificate and what you can do when you leave. Judge it the way you would judge any craft, by the skill in your hands."
      ]
    ),
    textFaq(
      "Why should I do NLP, and not simply train as a psychotherapist or see one?",
      [
      "They answer different questions, and one is not a substitute for the other. If you are in real clinical distress, therapy is the proper and non-negotiable path, and we will say so. A psychotherapist is trained to diagnose and treat mental illness, and mostly works backward through history to relieve what is wrong. Our work begins where functioning ends: it is an inquiry into excellence, forward-looking, the art of modelling how capable people do what they do. We do not treat pathology, and we do not see people as broken. Many of our graduates are already clinicians who add our tools to deepen their practice, and where a case genuinely needs clinical care, that is exactly what referral and our professional panel are for."
      ]
    ),
    textFaq(
      "Is this mind control? Does hypnosis go against my values or my faith?",
      [
      "No, and this matters, so let us be clear. All hypnosis is, in the end, self-hypnosis. Nobody can be made to act against their own values or beliefs, and we would never try. Far from surrendering your will, this work returns your awareness to you: it shows you the quiet suggestions you already meet every day, from media, from advertising, from the people around you, and hands you back the choice. It rests entirely on your conscious consent, and on the codes of ethics of the boards behind it. It sits comfortably with a life of principle, not against one."
      ]
    ),
    textFaq(
      "I am worried about the cost, especially as I am not earning right now.",
      [
      "We hear this often, and we take it seriously. First, the investment is the same for everyone, with nothing hidden. For details, please contact us: talk to your relationship manager openly; it is a normal conversation. Second, think of it the way you would think of a great university: it guarantees no one a career, and yet it changes the odds enormously. We give you everything you need; the result is yours to apply. And this is designed to change your earning, not only to draw from it, from Master Practitioner we teach you to build a paying practice. If you are in real hardship, tell us. We would rather find a way than lose you."
      ]
    ),
    textFaq(
      "Why will I not find a price on your website?",
      [
      "It is less a price than an investment in your future, and we treat it as one, so you will not see a figure in these pages. That is deliberate, and it is out of fairness to you. To print a single figure, we would have to quote you for every level at once, whether or not you need them all. We would rather understand what you actually want first, and then build a proposition around your own journey, only what serves you, and nothing that does not.",
      "There is a deeper reason, and we will be honest about it. A number on a page makes people decide with the wrong question. Some assume they cannot afford this, and never discover that what it would resolve for them is worth far more than the investment itself. Others could invest many times over, and yet it may not truly serve what they are after, and in that case we would gently tell them so. We would rather be honest with you than simply take a payment. All it takes to find out where you stand is a conversation. For details, please contact us, and your relationship manager will walk you through it."
      ]
    ),
    textFaq(
      "Will this really get me clients, or just give me a certificate?",
      [
      "A certificate does not generate a client; skill and clear positioning do, and both are built into the climb. You practise on many people before you ever meet a paying one, at Master Practitioner we teach the business itself, how to find, enrol and keep premium clients, and you join a global community that refers and mentors for years. We will be straight with you: it still takes your effort. But this is not a certificate for the wall. It is the thing you can earn from for the next twenty years."
      ]
    ),
    textFaq(
      "I have done courses, even therapy, before, and nothing really stuck. Why would this be different?",
      [
      "Because most learning ends when the room closes, and change that is only understood, and never practised, fades. Here you practise in every session, you are corrected in the room until the skill is yours, and then you may come back, free, for five years, to a different room each time. Change that is repeated is change that holds. That is the whole design."
      ]
    ),
    textFaq(
      "Who am I to coach anyone? I still have my own doubts, and I am not the confident type.",
      [
      "You do not need to arrive confident, or flawless; confidence is one of the things you leave with. A coach is not a guru dictating answers, but a facilitator who lets another person see the structure of their own thinking, and you learn that by testing every framework on yourself first. “I’m not that type of person” is a belief, not a fact, and beliefs can change in a day: you once believed you were seven, then on a birthday you believed you were eight. Some of our most remarkable graduates walked in carrying exactly the doubt you are carrying now. It is not a reason to stay away. It is the reason to come."
      ]
    ),
    textFaq(
      "I only want to develop myself. I don’t want to be a professional coach.",
      [
      "That is welcome, and you are far from alone. The deepest way to master this for your own life is to learn it to a professional standard. When you can read a room, calibrate what is not being said, and shift a pattern with precision, your command over your own decisions, relationships and leadership changes by an order of magnitude. Many who join us never intend to practise professionally at all; they come because it transforms how they parent, how they lead, and how they meet their own hard days."
      ]
    ),
    textFaq(
      "I work full time. Can I keep up?",
      [
      "The trainings run live in the evenings on Zoom. Your manual is yours to keep, and your audio library is on our online learning portal, so you can revisit both at your own pace. Because you can re-attend free for five years, you are never one missed evening away from falling behind. It is built to fit a working life."
      ]
    ),
    textFaq(
      "I am stuck deciding, or comparing a few options.",
      [
      "Being pulled two ways is not indecision, it is inner conflict, one part of you wanting to move and another wanting to stay. It is the very thing our work resolves, and it even has a name we teach: parts integration. So notice that the hesitation itself is a small preview of what you came for. And there is an old question worth sitting with: the best time to plant a walnut tree was ten years ago; the second best time is now."
      ]
    ),
    textFaq(
      "What makes AL&CO different from a cheaper certificate online?",
      [
      "A recorded lecture can pass on information, but it cannot see your blind spots, calibrate you in real time, or correct you the moment it matters. Learning this work from a video is like learning surgery, or a martial art, from a documentary. What you cannot buy anywhere is counted hours with Arslan Larik, Master Trainer, and Bismillah Pervez, CEO, ICF Master Certified Coach (MCC), ACTC, and ANLP Accredited Master Trainer (UK), a true quad certification, a room of people practising live, a community for life, and a door that stays open for five years. You are not paying for a PDF. You are paying for a transformation that holds."
      ]
    ),
];

/* ============== TRAINING TIMES, THE FREE WEBINAR AND ENROLLING ============== */
const trainingTimes: [string, string][] = [
  ["United States, East Coast (New York)", "10:00am to 4:00pm, a full working morning into the afternoon"],
  ["United States, West Coast (Los Angeles)", "7:00am to 1:00pm, an early start into midday"],
  ["United Kingdom (London)", "3:00pm to 9:00pm, afternoon into the evening"],
  ["East Africa (Nairobi)", "6:00pm to midnight, the evening"],
  ["Middle East, the Gulf (Dubai)", "7:00pm to 1:00am, the evening"],
  ["Subcontinent (India, Bangladesh)", "8:30pm to 2:30am, the evening"],
  ["China (Beijing)", "11:00pm to 5:00am, late night"],
  ["Australia, East (Sydney)", "1:00am to 7:00am the next day, the early hours"],
];

const timesIntro =
  "Our live sessions run from 8:00pm to 2:00am Pakistan Standard Time (PKT), on Karachi time. That is our time, and it is the same for every cohort. Here is when the session lands where you are, so you can plan around it.";
const timesNote =
  "A note: a few regions move their clocks for daylight saving, which can shift these by an hour for part of the year. Pakistan does not, so our start time never changes. Your relationship manager will confirm your exact local time for your dates.";

/* G7: the ONE public webinar sign-up page (A Global and hub/10). Same route as the footer,
   the hub, /contact, the sitemap and the redirects. */
const WEBINAR_SIGNUP_PATH = "/free-webinar";

const webinarParas = [
  "Not sure yet? That is exactly what our weekly webinar is for. Once a week we open a free, live introductory session for people new to AL&CO, a relaxed hour to understand what NLP really is, to feel the way we teach, and to ask anything you like before you decide a single thing.",
  "It is hosted by our relationship managers, the same people who walk beside our students from the first hello. So you meet a real person, in a real room, not a sales page. There is no pressure and no obligation. Come to listen, come with your questions, come simply to see whether this is for you.",
  "These sessions are for those still deciding. The moment you enrol, a far richer world opens to you: the full programme, the global community, the live trainings and years of support. So think of the webinar as the doorway, a first, easy step towards the version of yourself you have been curious about.",
  "Already an AL&CO graduate? The webinar is for people new to AL&CO, so you will not need it: you can come back to the trainings you have completed, free, as a revisit. Your relationship manager will arrange it with you.",
];
const webinarSignup =
  "To join the next one, register on our free webinar sign-up page, or ask your relationship manager to send it to you. We email you the Zoom link once you have registered; it is never posted publicly.";

const enrolSteps: [string, string][] = [
  ["Book a conversation.", "A short call to understand what you want and which level fits."],
  ["Choose your pathway.", "We guide you to the right rung to step on, and show you where it can lead."],
  ["Confirm your place.", "Cohorts are capped, so your place is held once you confirm."],
  ["Receive your joining pack and begin.", "Your digital manual, your audio library on our online learning portal and your schedule, and your transformation starts."],
];

const gettingStarted: Faq[] = [
  {
    question: "What time are the live sessions where I live?",
    answer: (
      <>
        <p className="mb-3">{timesIntro}</p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border border-gray-200">
            <thead>
              <tr className="bg-neutral-50">
                <th scope="col" className="text-left px-3 py-2">Your region</th>
                <th scope="col" className="text-left px-3 py-2">When our session runs for you</th>
              </tr>
            </thead>
            <tbody>
              {trainingTimes.map(([region, time]) => (
                <tr key={region} className="border-t border-gray-200">
                  <td className="px-3 py-2">{region}</td>
                  <td className="px-3 py-2">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>{timesNote}</p>
      </>
    ),
    schemaText: [
      timesIntro,
      ...trainingTimes.map(([region, time]) => `${region}: ${time}.`),
      timesNote,
    ].join(" "),
  },
  {
    question: "Can I attend a free session before I decide?",
    answer: (
      <>
        {webinarParas.map((p, i) => (
          <p key={i} className="mb-3">{p}</p>
        ))}
        <p className="mb-3">
          To join the next one,{" "}
          <Link href={WEBINAR_SIGNUP_PATH} className={linkClass}>register on our free webinar sign-up page</Link>
          , or ask your relationship manager to send it to you. We email you the Zoom link once you have registered; it is never posted publicly.
        </p>
        <p>
          Questions? Write to us at{" "}
          <Link href="mailto:connect@arslanlarik.com" className={linkClass}>connect@arslanlarik.com</Link>
          {" "}or message us on WhatsApp at{" "}
          <Link href="https://wa.me/923360082222" className={linkClass}>+92 336 008 2222</Link>.
        </p>
      </>
    ),
    schemaText:
      [...webinarParas, webinarSignup].join(" ") +
      " Questions? Write to us at connect@arslanlarik.com or message us on WhatsApp at +92 336 008 2222.",
  },
  {
    question: "How do I enrol?",
    answer: (
      <>
        <ol className="list-decimal pl-5 mb-3 space-y-1">
          {enrolSteps.map(([step, detail]) => (
            <li key={step}><b>{step}</b> {detail}</li>
          ))}
        </ol>
        <p>
          
          <Link href="/contact#form" className={linkClass} data-cta-id="C5" data-gtm-event="cta_click">Book your conversation</Link>.
        </p>
      </>
    ),
    schemaText:
      enrolSteps.map(([step, detail], i) => `${i + 1}. ${step} ${detail}`).join(" ") +
      " Book your conversation at /contact#form.",
];

/* ============================== EXPORTS ============================== */
export const faqGroups: FaqGroup[] = [
  { id: "the-basics", title: "The basics", items: basics },
  { id: "the-honest-questions", title: "The honest questions", items: honest },
  { id: "times-webinar-and-enrolling", title: "Training times, the free webinar and enrolling", items: gettingStarted },
];

/** Kept for backward compatibility: a flat list of every FAQ. */
export const homeFaqs: Faq[] = faqGroups.flatMap((g) => g.items);
