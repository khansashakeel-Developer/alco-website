import type { Metadata } from "next";
import ContactInfo from "@/component/contactInfo";
import OurFaqs from "@/component/faqs";
import programLevel1 from "@/assets/background/program-level-1.webp";
import Banner from "@/component/banner";
import CtaButton from "@/component/CtaButton";
import Link from "next/link";
import { waLine } from "@/component/cta";
import TestimonialsCarousel from "@/component/testimonials-carousel/testimonialsCarousel";
import { TestimonialsPost } from "@/type/testimonialsTypes";
import Thumbnail1 from "@/assets/testimonial/thumbnail_1.webp"
import Thumbnail2 from "@/assets/testimonial/thumbnail_2.webp"
import Thumbnail3 from "@/assets/testimonial/thumbnail_3.webp"
import Thumbnail4 from "@/assets/testimonial/thumbnail_4.webp"
import Thumbnail5 from "@/assets/testimonial/thumbnail_5.webp"
import Thumbnail6 from "@/assets/testimonial/thumbnail_6.webp"
import StudentReviewCarousel from "@/component/student-review-carousel/studentReviewCarousel";

const TESTIMONIAL_WA = waLine("AL&CO's training (I have been reading the graduate stories)");

// B 06: server page with its own metadata (canonical was inherited from the homepage).
const TITLE = "NLP Training Testimonials from AL&CO Graduates | AL&CO";
const DESC = "Watch and read NLP training testimonials from AL&CO graduates in Pakistan, Australia, Kenya, the UK and beyond. Hear their stories, then join them.";
const URL = "https://arslanlarik.com/testimonial";
// public/og/testimonials.jpg: interim 1200x630 from assets/testimonial/thumbnail_3.webp (WP3); Khansa may replace.
const OG_IMAGE = "https://arslanlarik.com/og/testimonials.jpg";

export const metadata: Metadata = {
    title: TITLE,
    description: DESC,
    alternates: { canonical: URL },
    robots: { index: true, follow: true },
    openGraph: {
        title: TITLE, description: DESC, url: URL, siteName: "AL&CO", type: "website", locale: "en_PK",
        images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "AL&CO graduate testimonials" }],
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: [OG_IMAGE] },
};

const bannerData = {
    title: {
        line1: "NLP Training Testimonials from Our Graduates",
        align: "text-center mx-auto"
    },
    image: programLevel1.src
};

const testimonialsData: TestimonialsPost[] = [
    {
        _id: "1",
        thumbnail: Thumbnail1,
        videoUrl: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774597497/testimonial_1_bumlft.mp4",
        name: "Aneeka Messey",
        designation: "Client",
        rating: 5,
        description: "Aneeka, an entrepreneur, wife, mother, and NLP coach, attributes her ability to balance these diverse roles to AL&CO. The transformative journey profoundly shifted her perspective, empowering her to develop new strategies for nurturing relationships and advancing her professional ventures.",
    },
    {
        _id: "2",
        thumbnail: Thumbnail2,
        videoUrl: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774597479/testimonial_2_v6euks.mp4",
        name: "Hibba-Tur-Rehman",
        designation: "Client",
        rating: 5,
        description: "Hibba Tur Rehman came to AL&CO during one of the most difficult periods of her life, while continuing to work with her medical practitioner. After completing the Master Practitioner course, she credits the training, alongside her ongoing medical care, with a profound personal transformation. Watch her story in her own words.",
    },
    {
        _id: "3",
        thumbnail: Thumbnail3,
        videoUrl: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774597477/testimonial_3_lne9lq.mp4",
        name: "Christine Best",
        designation: "Client",
        rating: 5,
        description: "I'm Christine Best. I'm from Australia. The NLP training I undertook with AL&CO was presented by Arslan Larik. Each session informative interesting and interactive. His relaxed style and sense of humour made those sessions easy to learn and fun.",
    },
    {
        _id: "4",
        thumbnail: Thumbnail4,
        videoUrl: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774597477/testimonial_4_gv7myy.mp4",
        name: "Joan Seurei",
        designation: "Client",
        rating: 5,
        description: "My name is Joan. I’m from Kenya. I’m so proud and excited to announce that I recently got certified as an NLP Coach and Practitioner and Time Line Therapy® Techniques Practitioner through AL&CO. My training experience at the company was empowering and absolutely awesome.",
    },
    {
        _id: "5",
        thumbnail: Thumbnail5,
        videoUrl: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774597483/testimonial_5_dbbbqd.mp4",
        name: "Rabia Khan",
        rating: 5,
        designation: "Client",
        description: "Rabia experienced significant emotional challenges, particularly with fear and anxiety. Through Neuro-Linguistic Programming (NLP), she transformed her mindset, emotions, perspectives, and beliefs, becoming aware of her power to change. NLP provided effective tools that deeply shifted her mindset, leading to a profound life transformation.",

    },
    {
        _id: "6",
        thumbnail: Thumbnail6,
        videoUrl: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774597483/testimonial_6_zj8tb1.mp4",
        name: "Sadie Jones",
        rating: 5,
        designation: "Client",
        description: "Sadie Jones is a UK-based coach specializing in supporting women overcoming trauma through nutrition, mindset, and fitness. She found AL&CO's NLP training transformative, appreciating its personalized approach that catered to her specific learning needs. Describing NLP as an eye-opener that repositioned her mindset, Sadie encourages others to undertake this training as a valuable tool for both coaching and personal growth.",
    },
];

const studentReviews: TestimonialsPost[] = [
    {
        _id: "1",
        name: "Nasreen Baloch",
        thumbnail:
            "https://lh3.googleusercontent.com/a-/ALV-UjXth13SFlFxn5tqXKqhDw0UuLSiPlzAxJdlOL01xu_5VbmTFHhePg=w40-h40-c-rp-mo-br100",
        rating: 5,
        designation: "Student",
        description:
            "Hello I have done my Master's practitioner from Arslan Larik and co. Its one of the best company to do this course. The course helped me shift my mindset and approach challenges with confidence.",
    },
    {
        _id: "2",
        name: "Amna Arshad",
        thumbnail:
            "https://lh3.googleusercontent.com/a/ACg8ocKfX7-ervEafToOWB42qIrML3XELw_GSF4jMdKwXnW9NLuafw=w40-h40-c-rp-mo-br100",
        rating: 5,
        designation: "Student",
        description:
            "Finalllyy done with my Master Practitioner Alhumdolillah!!! I am incredibly grateful for the transformative experience I had with Arslan Larik. His expertise in NLP have truly been a game changer for me. Arslan provided me with practical tools and techniques that have empowered me to shift my mindset and break through barriers I never thought I could overcome. I highly recommend Arslan larik & company to anyone looking to create meaningful change in their life. Their dedication and skills are truly phenomenal!",
    },
    {
        _id: "3",
        name: "Amnah Basharat",
        thumbnail:
            "https://lh3.googleusercontent.com/a-/ALV-UjXh4krAGKk1EtVCjfKi5-mlxYjdFTcVTVFJ0x7LYOycMZCvc9yu=w40-h40-c-rp-mo-br100",
        rating: 5,
        designation: "Student",
        description:
            "The courses of Practitioner and Master Practitioner provide a well-rounded introduction to NLP and its advanced techniques. You not only get to go through it theoretically but also get hands on experience and real time coach and client experience. Arslan is very thorough and and clear in his instructions, and his sessions are full of knowledge, engaging and interesting. The company is using state of the art tools to make the virtual experience as good as physical classes. Each time i revisit and connect with the team, I leave with new sets of learnings and feel empowered. Definitely worth it. Best of luck to the entire team.",
    },
    {
        _id: "4",
        name: "Sadaf Fahad",
        thumbnail:
            "https://lh3.googleusercontent.com/a/ACg8ocLqv59c30zInV4dlXPJ1UyrefJpyn9SHWCP1N6TSuU9Cka5sA=w40-h40-c-rp-mo-ba2-br100",
        rating: 5,
        designation: "Student",
        description:
            "The journey of NLP practitioner to Master practitioner in 2022 and a fabulous revision in 2024!! O man!! what a journey of learning, development and building empowering beliefs!!! Highly recommended. The significant support from not only Arslan Larik but the whole team whenever and wherever is just amazing. Thank you Al&Co.",
    },
    {
        _id: "5",
        name: "Shazia Zulfiqar",
        thumbnail:
            "https://lh3.googleusercontent.com/a-/ALV-UjWk9BZYZNMYnwBaLEPKg44FHfe1uCoWm-lWyxgsaNx6j97AcBOJ=w40-h40-c-rp-mo-br100",
        rating: 5,
        designation: "Student",
        description:
            "Embarking on this learning experience was nothing less of transformative. The outline of the course was meticulously designed to engage learners and catering diverse learning styles. The instructor was not just experts in his fields but also passionate educator, fostering an environment of curiosity and exploration. 13th December 2024 Then came a time when I stepped towards the next level and graduated as a Master Practitioner of NLP from Arslan Larik and Co. The feeling of fulfilment and immense learning is the greatest reward ever. The trainer and support team has been supportive throughout and ensured successful learning.",
    },
    {
        _id: "6",
        name: "Sobia Ali",
        thumbnail:
            "https://lh3.googleusercontent.com/a/ACg8ocIJ9VwZa1jEDa3CbogI32uMm0h8C5E7cZeXCkui9KZ_9N8fjA=w40-h40-c-rp-mo-br100",
        rating: 5,
        designation: "Student",
        description:
            "All thanks and a big round of applause to Arslan Larik for the phenomenal training of NLP, coaching & all the insights he shared during the 13days training of Master Practitioner, Bismillah Pervez for always supporting me throughout this empowering journey and bringing the best out of me. It brought a lot of change in my own life, relationships and grooming, I developed empowering skills, competency and abundance of insightful knowledge about Neuro Linguistic Programming and Coaching. Now helping my clients in creating their future through empowerment and self belief. Thank you Arslan Larik, Bismillah Pervez and Team Al&co. I'm proud to be a part of this community.",
    },
    {
        _id: "7",
        name: "Uroosa UmYahya",
        thumbnail:
            "https://lh3.googleusercontent.com/a-/ALV-UjWvkjgdX6Efx0fTbJEXddBkD14ekIsdXz1qS0DkX4H1JZFznAaj=w40-h40-c-rp-mo-br100",
        rating: 5,
        designation: "Student",
        description:
            "Amazing journey with the best mentor br. Arslan Larik. Each year growing as a person of understanding and creating empowerment as a teacher and coach is such a great feeling. NLP truly changed the perception towards life and its challenges. Always indebt Master Practitioner:)",
    },
    {
        _id: "8",
        name: "Huma Fatimah",
        thumbnail:
            "https://lh3.googleusercontent.com/a/ACg8ocJdG_yEw3wE1-06I4BteLnf1jiXeStKATXEfQc1BeGfSQM5IQ=w40-h40-c-rp-mo-br100",
        rating: 5,
        designation: "Student",
        description:
            "I recently had the opportunity to attend the Master Practitioner Training through the Al & Co, and it was an incredibly insightful and transformative experience. This training went beyond my expectations, equipping me with advanced tools and techniques for mastering NLP (Neuro-Linguistic Programming). The training helped me overcome personal and professional barriers, boosting my confidence and refining my skills as an NLP practitioner. The emphasis on self-awareness, goal-setting, and communication has brought about noticeable changes in how I approach challenges and interact with others. I would highly recommend this Master Practitioner training to anyone looking to elevate their NLP expertise or achieve personal breakthroughs. The investment is well worth the value you receive in terms of skills, growth, and long-term benefits.",
    },
]

// B 06 rows A8 to A12. Each visible answer is identical to its JSON-LD text.
const FAQ_ITEMS: { question: string; answer: string }[] = [
    {
        question: "What do past students say about this NLP training?",
        answer: "Our graduates most often describe the training as practical and life-changing: clearer thinking, calmer emotions, stronger relationships and more confidence in their work. You can watch and read their own words above.",
    },
    {
        question: "Are the results in these testimonials typical?",
        answer: "Every story here is one person’s own experience, in their own words, and results depend on the person and the practice they put in. What we can promise is the method: you practise in every session, you are corrected in the room until the skill is yours, and you may come back, free, for five years. Our work is coaching for change, performance and habits, not medical treatment. Where someone is under medical care, for example for depression or anxiety, they keep working with their medical practitioner, and we work alongside, with proper referral, coaching them and the family members who support them.",
    },
    {
        question: "Who benefits most from this training?",
        answer: "We have taught clinicians, doctors, psychologists, psychotherapists and counsellors, alongside entrepreneurs, senior leaders, educators and homemakers. Many come to build a coaching practice; many come simply to change how they parent, how they lead and how they meet their own hard days.",
    },
    {
        question: "Is the training practical or only theoretical?",
        answer: "Practical from the first day. Level 1 is a genuine 130 hours, live on Zoom, most of it spent practising on real people under a trainer’s eye. You leave with skill in your hands, not theory in a folder.",
    },
    {
        question: "What is the biggest change students mention?",
        answer: "A shift in mindset: from limitation to clarity, confidence and emotional control, with stronger self-awareness and better decisions.",
    },
];

const FaqsData = FAQ_ITEMS.map((f) => ({ question: f.question, answer: <p>{f.answer}</p> }));

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
};

export default function TestimonialPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
            />
            <Banner data={bannerData} />

            <div className="max-w-6xl mx-auto px-4">

                {/* Video testimonials */}
                <section className="py-16">
                    <div className="text-center ">
                        <h2 className="h4 font-semibold text-primary">
                            Video Testimonials
                        </h2>
                        <p className="custom-text1 text-gray-800 mt-3 max-w-2xl mx-auto border-b pb-6">
                            Graduates from Australia, Kenya, the United Kingdom and Pakistan share their experience of training with AL&amp;CO, in their own words.
                        </p>
                    </div>

                    <TestimonialsCarousel
                        slides={testimonialsData}
                        options={{
                            align: "start",
                            skipSnaps: false,
                        }}
                    />
                </section>

                {/* Google reviews */}
                <section className="py-8 ">
                    <div className="text-center ">
                        <h2 className="h4 font-semibold text-primary">
                            Google Reviews from Our Students
                        </h2>
                        <p className="custom-text1 text-gray-800 mt-3 max-w-2xl mx-auto border-b pb-6">
                            Hear directly from students who completed our NLP Practitioner and Master Practitioner programmes.
                        </p>
                    </div>

                    <StudentReviewCarousel
                        slides={studentReviews}
                        options={{
                            align: "start",
                            skipSnaps: false,
                        }}
                    />
                </section>

                {/* B 06 row A13: call to action after the reviews */}
                <section className="py-8 text-center">
                    <p className="custom-text1 text-gray-800 max-w-2xl mx-auto mb-6">
                        Ready to write your own story? Most graduates started with{" "}
                        <Link href="/program/nlp-practitioner" className="underline">Level 1, NLP Practitioner</Link>.
                        Speak to a relationship manager, or see all six levels.
                    </p>
                    {/* CTA plan: Testimonials is MoFu. Primary C1, secondary C3. */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <CtaButton id="C1" message={TESTIMONIAL_WA} variant="primary" />
                        <CtaButton id="C3" variant="secondary" />
                    </div>
                </section>

            </div>

            {/* FAQ */}
            <section className="bg-dark-primary bg-cover bg-top-left py-8">
                <div className="max-w-5xl mx-auto px-4">
                    <OurFaqs data={FaqsData} />
                </div>
            </section>

            {/* Contact band */}
            <section className="">
                <ContactInfo primary={{ id: "C1", message: TESTIMONIAL_WA }} secondary={{ id: "C3" }} />
            </section>
        </>
    );
}
