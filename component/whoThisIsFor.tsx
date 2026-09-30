import React from "react";
import Button from "./button";
import { Stethoscope, House, Briefcase, GraduationCap, Users, Target, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// B 02 row A9 / C step 3. Server component. Clinicians card first and largest.
type AudienceCard = { title: string; text: string; wide?: boolean; icon: LucideIcon };

const intro =
  "Most of the people in our rooms already work with the human mind for a living. What brings them to us is depth: more range, more modalities, and a way to go further with the people they serve. But they are not the only ones who belong here.";

const cards: AudienceCard[] = [
  {
    title: "First, the clinicians.",
    icon: Stethoscope,
    wide: true,
    text: "Psychiatrists, medical doctors, psychologists, psychotherapists and counsellors make up the largest share of our graduates. They already carry years of training and a real duty of care. They come to widen the toolkit, to add Neuro-Linguistic Programming, Time Line Therapy® techniques, Hypnosis and Coaching to what they already practise, so they can work at a deeper level, reach lasting change sooner, and offer each client more than one road home. Nothing here replaces their discipline. It extends it.",
  },
  {
    title: "The homemaker.",
    icon: House,
    text: "Our second largest group, and one of the reasons we teach the way we teach. Homemakers come to master emotional intelligence and put it to work in the life they are building: calmer and warmer relationships at home, children raised with patience and presence, a household that runs with less friction. Many go further still and turn what they learn into a livelihood of their own, an online coaching practice, or a passion grown into a business, entirely on their own terms.",
  },
  {
    title: "The professional.",
    icon: Briefcase,
    text: "A wide field, so we will name its parts. Entrepreneurs and business owners, who want the self-mastery and the read on people that every venture is built on. Leaders with a title, the CEOs, CXOs and directors who want to lead as a coach and not only as a boss, and to build a coaching culture their people can actually feel. Functional experts in sales, supply chain, marketing, delivery and project management, whose craft deepens the moment coaching sits underneath it. A sales expert becomes a sales coach. A strong trainer gains the one skill that was missing. Whatever the role, coaching turns experience into influence, and a group of people into a team that carries itself.",
  },
  {
    title: "The educator.",
    icon: GraduationCap,
    text: "Teachers, professors and trainers who want to hold a room with presence: to be fully there with a student, to read what a class is really telling them, and to carry that same steadiness among colleagues. The work gives an educator a quieter kind of authority, the sort students remember for life.",
  },
  {
    title: "The family member.",
    icon: Users,
    text: "Some come simply as themselves. A husband, a wife, a brother, a sister, one member of a family who wants to grow. No title, no practice to build, just the wish to understand people better and live with more ease. That is reason enough, and it always has been.",
  },
  {
    title: "The specialist.",
    icon: Target,
    text: "And some arrive knowing exactly what they want: one modality, learned properly. NLP. Coaching. Time Line Therapy®. For them we go straight to mastery of the craft they came for.",
  },
  {
    title: "The credential-builder.",
    icon: Award,
    text: "And let us be honest about one more, because they are refreshingly honest about themselves. Some come for the certificate, and they will tell you so on day one, and we rather admire that. A serious portfolio opens doors: it strengthens a resume, it earns the second look in an interview, it lets you walk into a room already carrying a little weight. For them the value is significance, the value is authority, and the value is the autonomy that comes from credentials the world actually recognises. No shame in it at all. We hold the standard high for exactly this reason, so that the certificate means something on the day you hold it up.",
  },
];

export default function WhoThisIsFor() {
  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-light-neutral w-full">
      <div className="container mx-auto px-4">
        <h2 className="h3 text-primary text-start mb-4">Who This Is For</h2>
        <p className="custom-text1 font-light text-black text-start max-w-4xl mb-8">{intro}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((c, i) => {
            const Icon = c.icon;
            // Hover (desktop): card lifts, yellow bar grows down the left edge, icon box turns yellow, number brightens.
            // The first (clinicians) card is the dark hero card, since it is the largest group.
            return (
              <div
                key={c.title}
                className={`group relative overflow-hidden rounded-xl p-6 lg:p-8 text-start shadow-md transition-all duration-300 ease-out motion-reduce:transition-none hover:-translate-y-1.5 hover:shadow-2xl ${
                  c.wide ? "md:col-span-2 bg-primary-darkest" : "bg-white"
                }`}
              >
                {/* Accent bar */}
                <span className="absolute left-0 top-0 h-full w-1.5 bg-secondary origin-top scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100 motion-reduce:transition-none" />

                {/* Large faint number */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute right-5 top-2 font-outfit text-7xl lg:text-8xl font-bold leading-none transition-colors duration-300 ${
                    c.wide ? "text-white/5 group-hover:text-secondary/20" : "text-primary/5 group-hover:text-secondary/25"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative flex items-center gap-4 mb-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 motion-reduce:transition-none ${
                      c.wide ? "bg-secondary text-primary-darkest" : "bg-primary text-white group-hover:bg-secondary group-hover:text-primary-darkest"
                    }`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <h3 className={`h5 font-semibold ${c.wide ? "text-secondary" : "text-primary"}`}>{c.title}</h3>
                </div>

                <p className={`relative custom-text1 font-light ${c.wide ? "text-white/90" : "text-black/80"}`}>{c.text}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <Button iconRight={true} variant="primary" size="medium" text="See the Six Levels" href="/programs" />
        </div>
      </div>
    </section>
  );
}