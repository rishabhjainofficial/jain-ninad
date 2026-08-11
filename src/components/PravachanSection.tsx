'use client';

import React, { useState } from 'react';
import { Radio, Play, Sparkles, BookOpen, Headphones, X } from 'lucide-react';
import { PravachanItem } from '@/lib/store';

interface PravachanSectionProps {
  pravachans: PravachanItem[];
}

export default function PravachanSection({ pravachans }: PravachanSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const categories = ['All', 'Pravachan', 'Shrut Samadhan', 'Audio Book', 'Bhajan'];

  const filteredItems = selectedCategory === 'All'
    ? pravachans
    : pravachans.filter(item => item.category === selectedCategory);

  return (
    <section id="pravachan" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300/40 text-amber-800 text-xs font-semibold">
            <Radio className="w-3.5 h-3.5 text-amber-600" />
            <span>पावन देशना एवं ऑडियो ग्रंथ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1E26]">
            प्रवचन, श्रुत समाधान एवं स्वाध्याय
          </h2>
          <p className="text-sm text-gray-600">
            प्रेरणा के वे अमृत वचन, जो अज्ञान को मिटाकर जीवन में सम्यक् ज्ञान का प्रकाश जगाते हैं।
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-amber-50/80 text-gray-700 hover:bg-amber-100 border border-amber-200/60'
              }`}
            >
              {cat === 'All' ? 'सभी देखें (All)' : cat}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between border border-amber-200/60"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300/40">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400 font-sans">
                    {item.date}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#1C1E26] hover:text-amber-700 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="p-4 bg-amber-50/50 border-t border-amber-100 flex items-center justify-between">
                <span className="text-xs text-amber-800 font-medium">
                  {item.duration || 'प्रवचन'}
                </span>
                
                <button
                  onClick={() => setActiveVideoId(item.youtubeId || 'dQw4w9WgXcQ')}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>सुनें / देखें</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Modal */}
        {activeVideoId && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl glass-card rounded-2xl overflow-hidden bg-black shadow-2xl border border-amber-500/30">
              <button 
                onClick={() => setActiveVideoId(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-amber-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1`}
                  title="Pravachan Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
