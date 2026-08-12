'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface BannerSectionProps {
  bannerImage?: string;
  altText?: string;
}

export default function BannerSection({
  bannerImage = '/banner1.png',
  altText = 'विशेष सूचना बैनर'
}: BannerSectionProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF8F5]">
      <div className="relative w-full">
        {/* Full Banner Image (Uncropped) */}
        <img
          src={bannerImage}
          alt={altText}
          className="w-full h-auto shadow-sm"
        />
      </div>
    </section>
  );
}
