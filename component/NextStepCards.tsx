import React from "react";

type Card = { title: string; body: React.ReactNode };

// Intro paragraph, then equal white cards (same style as the certification cards). Left-aligned with the section
// heading. An odd last card spans the full row so the grid never ends lopsided.
export default function NextStepCards({ intro, cards }: { intro?: React.ReactNode; cards: Card[] }) {
  return (
    <div className="text-start">
      {intro && <div className="custom-text1 font-light text-gray-600 max-w-4xl my-4">{intro}</div>}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 ${intro ? "mt-6" : ""}`}>
        {cards.map((card, i) => {
          const isLastOdd = cards.length % 2 === 1 && i === cards.length - 1;
          return (
            <div
              key={i}
              className={`h-full bg-white rounded-lg shadow-lg border-l-4 border-secondary p-4 lg:p-6 ${isLastOdd ? "md:col-span-2" : ""}`}
            >
              <h3 className="text-lg xl:text-xl text-primary font-outfit font-semibold mb-2">{card.title}</h3>
              <div className="custom-text1 font-light text-black/70">{card.body}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}