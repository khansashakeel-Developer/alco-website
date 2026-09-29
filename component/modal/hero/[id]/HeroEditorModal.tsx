"use client";

import { HeroPost } from "@/type/heroTypes";
import { useState } from "react";

type PropType = {
  slide: HeroPost;
  onClose: () => void;
  onUpdate: (updatedSlide: HeroPost) => void;
};

export default function HeroEditorModal({ slide, onClose, onUpdate }: PropType) {
  // State for title lines
  const [line1, setLine1] = useState(slide.title.line1);
  const [line2, setLine2] = useState(slide.title.line2);

  const [description, setDescription] = useState(slide.description);

  const [button1Text, setButton1Text] = useState(slide.button1.text);
  const [button1Link, setButton1Link] = useState(slide.button1.link);
  const [button2Text, setButton2Text] = useState(slide.button2.text);
  const [button2Link, setButton2Link] = useState(slide.button2.link);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!line1 || !line2 || !description) {
      alert("Title lines and description are required.");
      return;
    }

    const updatedSlide: HeroPost = {
      ...slide,
      title: { line1, line2 },
      description,
      button1: { ...slide.button1, text: button1Text, link: button1Link },
      button2: { ...slide.button2, text: button2Text, link: button2Link },
    };

    onUpdate(updatedSlide);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md w-96 max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-bold mb-4">Edit Hero Slide</h2>

        {/* Title Lines */}
        <input
          value={line1}
          onChange={(e) => setLine1(e.target.value)}
          className="w-full border border-slate-500 px-4 py-2 mb-2"
          placeholder="Title Line 1"
        />
        <input
          value={line2}
          onChange={(e) => setLine2(e.target.value)}
          className="w-full border border-slate-500 px-4 py-2 mb-3"
          placeholder="Title Line 2"
        />

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-slate-500 px-4 py-2 mb-3"
          placeholder="Hero Description"
        />

        {/* Buttons */}
        <div className="mb-3">
          <h3 className="font-semibold mb-1">Button 1</h3>
          <input
            value={button1Text}
            onChange={(e) => setButton1Text(e.target.value)}
            className="w-full border border-slate-400 px-3 py-1 mb-1"
            placeholder="Text"
          />
          <input
            value={button1Link}
            onChange={(e) => setButton1Link(e.target.value)}
            className="w-full border border-slate-400 px-3 py-1"
            placeholder="Link"
          />
        </div>

        <div className="mb-3">
          <h3 className="font-semibold mb-1">Button 2</h3>
          <input
            value={button2Text}
            onChange={(e) => setButton2Text(e.target.value)}
            className="w-full border border-slate-400 px-3 py-1 mb-1"
            placeholder="Text"
          />
          <input
            value={button2Link}
            onChange={(e) => setButton2Link(e.target.value)}
            className="w-full border border-slate-400 px-3 py-1"
            placeholder="Link"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}