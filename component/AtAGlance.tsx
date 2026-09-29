// B 01 row A9 / C step 7. Server component. Bullets 9 and 10 are the canon stats strip, verbatim (F3).
const facts: string[] = [
  "Pakistan’s pioneering NLP, hypnosis and coaching training institution, the Center for Human Brilliance and Behavioral Reengineering.",
  "Led by Arslan Larik, who has trained and coached since 2010. Arslan Larik & Company was established as an institution in 2018.",
  "The first in Pakistan: the first to hold Master Trainer of NLP (ABNLP) and Master Trainer of Hypnosis (ABH), an ANLP Accredited Master Trainer (UK), and a Master Trainer of NLP University (NLPU) under Robert Dilts. He holds the ANLP International Ambassadorship for Pakistan.",
  "Led alongside Bismillah Pervez, CEO, ICF Master Certified Coach (MCC), ACTC, and ANLP Accredited Master Trainer (UK), who teaches beside Arslan as co-trainer. She is the first woman in Pakistan to hold the MCC, the ACTC and her ANLP credential together, a documented first. Learning from a male and a female Master Coach means the work lands for everyone in the room.",
  "We produce not only practitioners and trainers, but master trainers.",
  "Delivery: live on Zoom, taught personally, most evenings of the year. Sessions run 8:00pm to 2:00am Pakistan time (PKT).",
  "The ladder: six levels, NLP Practitioner to NLP Master Trainer.",
  "Certifications you earn: through international boards, ABNLP, its NLP Coaching Division, ABH, TLTA and NGH (USA), plus a UK ANLP CPD accreditation, and AL&CO’s own credential.",
  "2,000+ graduates across 20+ countries. Nearing 100 batches delivered, and counting.",
  "Our work has inspired over a million lives, across the nation and around the world.",
  "The door never closes: revisit our trainings, step back in as a coaching assistant, and keep learning from an approved curriculum and its companion audio, watching Arslan and Bismillah teach live, year in and year out.",
];

export default function AtAGlance() {
  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 px-4 bg-light-neutral w-full">
      <div className="container mx-auto">
        <h2 className="h3 text-black text-start mb-6">AL&amp;CO at a Glance</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {facts.map((f, i) => (
            <li key={i} className="custom-text1 font-light text-black border-l-4 border-secondary pl-4">{f}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
