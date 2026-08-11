'use client';

import React, { useState } from 'react';
import { Quote, Heart, Share2, Copy, Check, Sparkles } from 'lucide-react';
import { JivanNeetiQuote } from '@/lib/store';

interface JivanNeetiSectionProps {
  quotes: JivanNeetiQuote[];
}

export default function JivanNeetiSection({ quotes }: JivanNeetiSectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<Record<string, number>>({});

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLike = (id: string, currentLikes: number) => {
    const prev = likedIds[id] !== undefined ? likedIds[id] : currentLikes;
    setLikedIds({ ...likedIds, [id]: prev + 1 });
  };

  return (
    <section id="jivan-neeti" className="py-16 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300/40 text-amber-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>अमूल्य जीवन सूत्र</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1E26]">
            जीवन नीति (Jivan Neeti)
          </h2>
          <p className="text-sm text-gray-600">
            मुनि श्री 108 सुवन्द्य सागर जी महाराज के अमूल्य सूत्र, जो जीवन को संयम, विवेक और साधना की ओर ले जाते हैं।
          </p>
        </div>

        {/* Quotes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((q) => {
            const likesCount = likedIds[q.id] !== undefined ? likedIds[q.id] : q.likes;
            
            return (
              <div 
                key={q.id}
                className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between border border-amber-200/60 shadow-xs relative"
              >
                <Quote className="w-8 h-8 text-amber-400/40 absolute top-4 right-4" />

                <div className="space-y-4 pt-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100/80 text-amber-900 border border-amber-300/50">
                    {q.category}
                  </span>

                  <p className="text-lg font-serif font-bold text-[#1C1E26] leading-relaxed">
                    "{q.quoteHindi}"
                  </p>

                  {q.quoteEnglish && (
                    <p className="text-xs text-gray-500 italic border-l-2 border-amber-300/50 pl-3">
                      {q.quoteEnglish}
                    </p>
                  )}
                </div>

                {/* Actions Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-amber-100 mt-6">
                  <button
                    onClick={() => handleLike(q.id, q.likes)}
                    className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium transition-colors"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    <span>{likesCount}</span>
                  </button>

                  <button
                    onClick={() => handleCopy(q.quoteHindi, q.id)}
                    className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-amber-800 font-medium transition-colors"
                  >
                    {copiedId === q.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-green-600">कॉपी हुआ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>कॉपी करें</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
