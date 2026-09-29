
import { notFound } from "next/navigation";
import { services } from "./data";
import Banner from "@/component/banner";
import ContentSection from "@/component/contentSection";
import ContactInfo from "@/component/contactInfo";
import LevelProgramIncludes from "@/component/levelProgramIncludes";
import ResourcesPageClient from "../resources-page-client";
import ContentSectionWithModal from "@/component/contentSectionWithModal";
import { GRADUATE_REVISIT_LABEL, GRADUATE_WA_MESSAGE } from "@/component/cta";

export default async function Services({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const Services = services.find((p) => p.slug === slug);

  if (!Services) return notFound();

  const { BannerData, ContentSectionData1, ContentSectionImgContentListData, ContentSectionData2, ContentSectionContentListData, LevelProgramIncludesData } = Services;


  return (
    <div>
      <Banner data={BannerData} />
      <ContentSection data={ContentSectionData1} />
      {slug === "resources"
        ? <ResourcesPageClient />
        : <ContentSection data={ContentSectionImgContentListData} />
      }
      <ContentSection data={ContentSectionData2} />
      {/* <ContentSection data={ContentSectionContentListData} /> */}
      <ContentSectionWithModal data={ContentSectionContentListData} />
      <LevelProgramIncludes data={LevelProgramIncludesData} />
      {/* CTA plan: Four Clouds is ToFu (C2 + C3). Resources: C2 for visitors, plus Rule 4
          "Revisit a training" (C1, graduate line) for graduates, who are never sent to the webinar. */}
      {slug === "resources" ? (
        <ContactInfo
          primary={{ id: "C2" }}
          secondary={{ id: "C1", message: GRADUATE_WA_MESSAGE, label: GRADUATE_REVISIT_LABEL }}
          description="New to AL&CO? Start with our free weekly webinar. Already a graduate? Revisit a training free: your relationship manager will arrange it."
        />
      ) : (
        <ContactInfo primary={{ id: "C2" }} secondary={{ id: "C3" }} />
      )}
    </div>
  );
}
// "use client";

// import { useState } from "react";
// import { notFound } from "next/navigation";
// import { services } from "./data";
// import Banner from "@/component/banner";
// import ContentSection from "@/component/contentSection";
// import ContactInfo from "@/component/contactInfo";
// import LevelProgramIncludes from "@/component/levelProgramIncludes";
// import BookRequestPopup from "@/component/book-request-popup/bookRequestPopup";

// function ResourcesPageClient({ services, slug }: any) {
//     const [selectedBook, setSelectedBook] = useState<any>(null);
//     const [popupOpen, setPopupOpen] = useState(false);

//     // Book list - API se ya static data se
//     // Agar static data use kar rahe ho toh ID map karo
//     const bookIdMap: Record<string, string> = {
//         "Create Your Own Future With NLP": "BOOK_ID_1",
//         "Relationship Mastery Through NLP": "BOOK_ID_2",
//         "Emotional Mastery With NLP": "BOOK_ID_3",
//         "I Am Not Good Enough": "BOOK_ID_4",
//         "101 Powerful Coaching Questions": "BOOK_ID_5",
//         "How To Get Your First Coaching Client": "BOOK_ID_6",
//         "Financial Freedom Through NLP": "BOOK_ID_7",
//     };

//     const handleBookClick = (item: any) => {
//         if (slug !== "resources") return;
//         setSelectedBook({
//             _id: bookIdMap[item.title] || "",
//             title: item.title,
//             cover_image_url: item.src,
//         });
//         setPopupOpen(true);
//     };

//     return (
//         <div>
//             <Banner data={services.BannerData} />
//             <ContentSection data={services.ContentSectionData1} />
//             <ContentSection
//                 data={services.ContentSectionImgContentListData}
//                 onItemClick={slug === "resources" ? handleBookClick : undefined}
//             />
//             <ContentSection data={services.ContentSectionData2} />
//             <ContentSection data={services.ContentSectionContentListData} />
//             <LevelProgramIncludes data={services.LevelProgramIncludesData} />
//             <ContactInfo />

//             {/* Book Request Popup */}
//             <BookRequestPopup
//                 isOpen={popupOpen}
//                 onClose={() => setPopupOpen(false)}
//                 book={selectedBook}
//             />
//         </div>
//     );
// }

// export default async function Services({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {

//   const { slug } = await params;

//   const Services = services.find((p) => p.slug === slug);

//   if (!Services) return notFound();

//   const { BannerData, ContentSectionData1, ContentSectionImgContentListData, ContentSectionData2, ContentSectionContentListData, LevelProgramIncludesData } = Services;


//   return (
//     <ResourcesPageClient services={Services} slug={slug} />
//   );
// }


// import { services } from "./data";
// import { notFound } from "next/navigation";
// import Banner from "@/component/banner";
// import ContactInfo from "@/component/contactInfo";
// import LevelProgramIncludes from "@/component/levelProgramIncludes";
// import ContentSection from "@/component/contentSection";
// import ResourcesPageClient from "../resources-page-client";

// export default async function Services({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
//   const service = services.find((p) => p.slug === slug);
//   if (!service) return notFound();

//   return (
//     <div>
//       <Banner data={service.BannerData} />
//       <ContentSection data={service.ContentSectionData1} />
//       {slug === "resources"
//         ? <ResourcesPageClient />
//         : <ContentSection data={service.ContentSectionImgContentListData} />
//       }

//       <ContentSection data={service.ContentSectionData2} />
//       <ContentSection data={service.ContentSectionContentListData} />
//       <LevelProgramIncludes data={service.LevelProgramIncludesData} />
//       <ContactInfo />
//     </div>
//   );
// }