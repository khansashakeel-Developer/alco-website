"use client";
import React, { useState } from "react";
import ContentSection from "@/component/contentSection";
import AudioResourceRequestModal from "@/component/modal/audioResourceRequestModal";
import { ContentSectionType } from "@/type/contentSection";

type Props = {
  data?: ContentSectionType;
};

export default function ContentSectionWithModal({ data }: Props) {
  const [selectedProgram, setSelectedProgram] = useState<{ id: string; name: string } | null>(null);

  const handleItemClick = (item: any) => {
    setSelectedProgram({ id: item.programId, name: item.title });
  };

  return (
    <>
      <ContentSection data={data} onItemClick={handleItemClick} />
      {selectedProgram && (
        <AudioResourceRequestModal
          isOpen={!!selectedProgram}
          programId={selectedProgram.id}
          programName={selectedProgram.name}
          onClose={() => setSelectedProgram(null)}
        />
      )}
    </>
  );
}