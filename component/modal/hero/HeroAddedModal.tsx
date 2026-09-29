"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeroPost } from "@/type/heroTypes";

export default function HeroAddedModal() {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [description, setDescription] = useState("");

  const [button1Text, setButton1Text] = useState("");
  const [button1Link, setButton1Link] = useState("");
  const [button2Text, setButton2Text] = useState("");
  const [button2Link, setButton2Link] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!line1 || !line2 || !description) {
      alert("Title lines and description are required.");
      return;
    }

    // Construct the new HeroPost
    const newSlide: Partial<HeroPost> = {
      title: { line1, line2 },
      description,
      button1: { text: button1Text, link: button1Link },
      button2: { text: button2Text, link: button2Link },
      image: "", // You can extend to allow uploading later
    };

    try {
      const res = await fetch("/api/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSlide),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Failed to create hero slide");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding hero slide");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-lg">
      <h2 className="text-xl font-bold mb-2">Add New Hero Slide</h2>

      <input
        value={line1}
        onChange={(e) => setLine1(e.target.value)}
        className="border border-slate-500 px-4 py-2"
        placeholder="Title Line 1"
      />
      <input
        value={line2}
        onChange={(e) => setLine2(e.target.value)}
        className="border border-slate-500 px-4 py-2"
        placeholder="Title Line 2"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-slate-500 px-4 py-2"
        placeholder="Hero Description"
      />

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Button 1</h3>
        <input
          value={button1Text}
          onChange={(e) => setButton1Text(e.target.value)}
          className="border px-3 py-1"
          placeholder="Text"
        />
        <input
          value={button1Link}
          onChange={(e) => setButton1Link(e.target.value)}
          className="border px-3 py-1"
          placeholder="Link"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Button 2</h3>
        <input
          value={button2Text}
          onChange={(e) => setButton2Text(e.target.value)}
          className="border px-3 py-1"
          placeholder="Text"
        />
        <input
          value={button2Link}
          onChange={(e) => setButton2Link(e.target.value)}
          className="border px-3 py-1"
          placeholder="Link"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit mt-2 rounded"
      >
        Add Hero Slide
      </button>
    </form>
  );
}