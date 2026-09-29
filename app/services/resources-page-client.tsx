// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import BookRequestPopup from "@/component/book-request-popup/bookRequestPopup";
// import Image from "next/image";

// export default function ResourcesPageClient() {
//   const [books, setBooks]           = useState<any[]>([]);
//   const [loading, setLoading]       = useState(true);
//   const [selectedBook, setSelectedBook] = useState<any>(null);
//   const [popupOpen, setPopupOpen]   = useState(false);

//   useEffect(() => {
//     axios
//       .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/lms/resources/public`)
//       .then((r) => setBooks(r.data.data))
//       .catch(() => {})
//       .finally(() => setLoading(false));
//   }, []);

//   const handleBookClick = (book: any) => {
//     // is_available false ho toh popup mat kholo
//     if (!book.is_available) return;
//     setSelectedBook(book);
//     setPopupOpen(true);
//   };

//   if (loading) return (
//     <div className="flex justify-center py-16">
//       <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
//     </div>
//   );

//   return (
//     <section className="py-12 px-4" style={{ backgroundColor: "#2B4C7E" }}>
//       {/* Heading */}
//       <h2 className="text-3xl font-bold text-white text-center mb-2">
//         Explore. Learn. Evolve.
//       </h2>
//       <p className="text-center text-white/60 mb-10 text-sm">
//         Your next breakthrough is just a few pages away.
//       </p>

//       {/* Books Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
//         {books.map((book) => (
//           <div
//             key={book._id}
//             onClick={() => handleBookClick(book)}
//             className={`rounded-xl overflow-hidden transition ${
//               book.is_available
//                 ? "cursor-pointer hover:scale-105 hover:shadow-xl"
//                 : "opacity-50 cursor-not-allowed"
//             }`}
//             style={{ backgroundColor: "#3a5a8f" }}
//           >
//             {/* Cover */}
//             <div className="relative w-full h-52">
//               <Image
//                 src={book.cover_image_url}
//                 alt={book.title}
//                 fill
//                 className="object-contain p-2"
//               />
//               {/* Unavailable badge */}
//               {!book.is_available && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
//                   <span className="text-white text-xs font-semibold bg-black/60 px-3 py-1 rounded-full">
//                     Coming Soon
//                   </span>
//                 </div>
//               )}
//             </div>
//             {/* Title */}
//             <p className="text-white text-xs font-semibold text-center px-3 py-3 leading-snug">
//               {book.title}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Bottom text */}
//       <p className="text-center text-yellow-400 font-semibold mt-10 text-sm">
//         Download now and start creating the life, business, and impact you deserve.
//       </p>

//       {/* Popup */}
//       <BookRequestPopup
//         isOpen={popupOpen}
//         onClose={() => setPopupOpen(false)}
//         book={selectedBook}
//       />
//     </section>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import BookRequestPopup from "@/component/book-request-popup/bookRequestPopup";
import ContentSection from "@/component/contentSection";
import { ContentSectionImgContentListDataRE } from "./[slug]/data"; // tumhara static data

export default function ResourcesPageClient() {
  const [books, setBooks]               = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [popupOpen, setPopupOpen]       = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/lms/resources/public`)
      .then((r) => setBooks(r.data.data))
      .catch(() => {});
  }, []);

  // Static contentlist mein backend _id + is_available inject karo
  const enrichedData = {
    ...ContentSectionImgContentListDataRE,
    contentlist: ContentSectionImgContentListDataRE.contentlist?.map((item) => {
      const match = books.find((b) => b.title === item.title);
      return {
        ...item,
        _id: match?._id || null,
        is_available: match?.is_available ?? false,
      };
    }),
  };

  const handleBookClick = (item: any) => {
    if (!item.is_available || !item._id) return; // unavailable ho toh popup mat kholo
    setSelectedBook({
      _id: item._id,
      title: item.title,
      cover_image_url: item.src,
    });
    setPopupOpen(true);
  };

  return (
    <>
      <ContentSection
        data={enrichedData}
        onItemClick={handleBookClick}
      />

      <BookRequestPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        book={selectedBook}
      />
    </>
  );
}