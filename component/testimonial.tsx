"use client";


import { useState } from "react";
// B 01 C step 11: normal import (was dynamic with ssr:false) so the video testimonials are in the server HTML.
import TestimonialsCarousel from "./testimonials-carousel/testimonialsCarousel";
import { TestimonialsPost } from "@/type/testimonialsTypes";
import StudentReviewCarousel from "./student-review-carousel/studentReviewCarousel";
import Thumbnail1 from "@/assets/testimonial/thumbnail_1.webp"
import Thumbnail2 from "@/assets/testimonial/thumbnail_2.webp"
import Thumbnail3 from "@/assets/testimonial/thumbnail_3.webp"
import Thumbnail4 from "@/assets/testimonial/thumbnail_4.webp"
import Thumbnail5 from "@/assets/testimonial/thumbnail_5.webp"
import Thumbnail6 from "@/assets/testimonial/thumbnail_6.webp"
// Example testimonial data
const testimonialsData: TestimonialsPost[] = [
    
    {
        _id: "1",
        thumbnail: Thumbnail3,
        videoUrl: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774597477/testimonial_3_lne9lq.mp4",
        name: "Christine Best",
        designation: "Client",
        rating: 5,
        description: "I'm Christine Best. I'm from Australia. The NLP training I undertook with AL&CO was presented by Arslan Larik. Each session informative interesting and interactive. His relaxed style and sense of humour made those sessions easy to learn and fun.",
    },
    {
        _id: "2",
        thumbnail: Thumbnail4,
        videoUrl: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774597477/testimonial_4_gv7myy.mp4",
        name: "Joan Seurei",
        designation: "Client",
        rating: 5,
        description: "My name is Joan. I’m from Kenya. I’m so proud and excited to announce that I recently got certified as an NLP Coach and Practitioner and Time Line Therapy® Techniques Practitioner through AL&CO. My training experience at the company was empowering and absolutely awesome.",
    },
    {
        _id: "3",
        thumbnail: Thumbnail6,
        videoUrl: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774597483/testimonial_6_zj8tb1.mp4",
        name: "Sadie Jones",
        rating: 5,
        designation: "Client",
        description: "Sadie Jones is a UK-based coach specializing in supporting women overcoming trauma through nutrition, mindset, and fitness. She found AL&CO's NLP training transformative, appreciating its personalized approach that catered to her specific learning needs. Describing NLP as an eye-opener that repositioned her mindset, Sadie encourages others to undertake this training as a valuable tool for both coaching and personal growth.",
    },
    {
        _id: "4",
        thumbnail: Thumbnail1,
        videoUrl: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774597497/testimonial_1_bumlft.mp4",
        name: "Aneeka Messey",
        designation: "Client",
        rating: 5,
        description: "Aneeka, an entrepreneur, wife, mother, and NLP coach, attributes her ability to balance these diverse roles to AL&CO. The transformative journey profoundly shifted her perspective, empowering her to develop new strategies for nurturing relationships and advancing her professional ventures.",
    },
    {
        _id: "5",
        thumbnail: Thumbnail2,
        videoUrl: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774597479/testimonial_2_v6euks.mp4",
        name: "Hibba-Tur-Rehman",
        designation: "Client",
        rating: 5,
        description: "Hibba Tur Rehman came to AL&CO during one of the most difficult periods of her life, while continuing to work with her medical practitioner. After completing the Master Practitioner course, she credits the training, alongside her ongoing medical care, with a profound personal transformation. Watch her story in her own words.",
    },
    {
        _id: "6",
        thumbnail: Thumbnail5,
        videoUrl: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774597483/testimonial_5_dbbbqd.mp4",
        name: "Rabia Khan",
        rating: 5,
        designation: "Client",
        description: "Rabia experienced significant emotional challenges, particularly with fear and anxiety. Through Neuro-Linguistic Programming (NLP), she transformed her mindset, emotions, perspectives, and beliefs, becoming aware of her power to change. NLP provided effective tools that deeply shifted her mindset, leading to a profound life transformation.",

    },
    
];

const studentReviews: TestimonialsPost[] = [
    {
        _id: "1",
        name: "Nasreen baloch",
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
        name: "Sadaf fahad",
        thumbnail:
            "https://lh3.googleusercontent.com/a/ACg8ocLqv59c30zInV4dlXPJ1UyrefJpyn9SHWCP1N6TSuU9Cka5sA=w40-h40-c-rp-mo-ba2-br100",
        rating: 5,
        designation: "Student",
        description:
            "The journey of NLP practitioner to Master practitioner in 2022 and a fabulous revision in 2024!! O man!! what a journey of learning, development and building empowering beliefs!!! Highly recommended. The significant support from not only Arslan Larik but the whole team whenever and wherever is just amazing. Thank you Al&Co.",
    },
    {
        _id: "5",
        name: "shazia zulfiqar",
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

export default function Testimonials() {
    const [activeTab, setActiveTab] = useState<"testimonials" | "students">("testimonials");
    return (
        <section id="testimonials" className="py-6 md:py-8 lg:py-12 xl:py-16  px-4 bg-light-neutral bg-cover bg-top-left w-full">
            <div className="container mx-auto ">

                {/* <section className="max-w-screen-xl mx-auto px-4 py-6 md:py-8 lg:py-12 xl:py-16 w-full"> */}
                <h2 className="h3 text-center text-black mb-6">What Our Graduates Say</h2>
                {/* Tabs navigation */}
                <div role="tablist" aria-label="Testimonials Tabs" className="flex mb-8 justify-center">
                    <button
                        onClick={() => setActiveTab("testimonials")}
                        role="tab"
                        id="tab-testimonials"
                        aria-selected={activeTab === "testimonials"}
                        aria-controls="panel-testimonials"
                        className={`px-4 py-2 font-outfit font-semibold text-lg border-b-2 -mb-px transition-colors ${activeTab === "testimonials"
                            ? "border-primary text-primary"
                            : "border-transparent text-gray-600 hover:text-primary"
                            }`}
                    >
                        Testimonials
                    </button>

                    <button
                        onClick={() => setActiveTab("students")}
                        role="tab"
                        id="tab-students"
                        aria-selected={activeTab === "students"}
                        aria-controls="panel-students"
                        className={`px-4 py-2 font-outfit font-semibold text-lg border-b-2 -mb-px transition-colors ${activeTab === "students"
                            ? "border-primary text-primary"
                            : "border-transparent text-gray-600 hover:text-primary"
                            }`}
                    >
                        What Our Students Say
                    </button>
                </div>
                <div className="max-w-6xl mx-auto">

                    <div
                        role="tabpanel"
                        id="panel-testimonials"
                        aria-labelledby="tab-testimonials"
                        hidden={activeTab !== "testimonials"}
                    >
                        <TestimonialsCarousel
                            slides={testimonialsData}
                            options={{ loop: true, align: "start", skipSnaps: false }}
                            onEditSlide={(slide) => alert(`Edit ${slide.name}`)}
                        />
                    </div>

                    <div
                        role="tabpanel"
                        id="panel-students"
                        aria-labelledby="tab-students"
                        hidden={activeTab !== "students"}
                    >
                        <StudentReviewCarousel
                            slides={studentReviews}
                            options={{ align: "start", skipSnaps: false }}
                        />
                    </div>

                </div>


            </div>
        </section>
    );
}