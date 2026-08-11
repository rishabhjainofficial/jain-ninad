'use client';

import React from 'react';
import { Newspaper, Calendar, User, ArrowRight } from 'lucide-react';
import { BlogUpdate, PodcastEpisode } from '@/lib/store';

interface UpdatesSectionProps {
  blogs: BlogUpdate[];
  podcasts: PodcastEpisode[];
}

export default function UpdatesSection({ blogs, podcasts }: UpdatesSectionProps) {
  return (
    <section id="updates" className="py-16 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300/40 text-amber-800 text-xs font-semibold">
            <Newspaper className="w-3.5 h-3.5 text-amber-600" />
            <span>समाचार एवं संवादात्मक श्रृंखला</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1E26]">
            नवीनतम अपडेट, विहार समाचार एवं संवाद
          </h2>
          <p className="text-sm text-gray-600">
            पूज्य मुनि श्री ससंघ के पावन विहार, आध्यात्मिक संवाद एवं सामाजिक संदेशों का मुख्य केंद्र।
          </p>
        </div>

        {/* Grid layout for Podcast & Blog Updates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Podcast Feature Card (Left Column) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-serif font-bold text-[#1C1E26] flex items-center gap-2">
              <span>🎙️ विशेष आध्यात्मिक संवाद (Podcast)</span>
            </h3>

            {podcasts.map((pod) => (
              <div 
                key={pod.id}
                className="glass-card rounded-2xl p-6 border-2 border-amber-300/60 shadow-md space-y-4 bg-gradient-to-b from-amber-50/50 to-white"
              >
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-amber-200/80 text-amber-900">
                  Host: {pod.guestHost}
                </span>

                <h4 className="text-xl font-serif font-bold text-[#1C1E26] leading-snug">
                  {pod.title}
                </h4>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {pod.description}
                </p>

                <div className="pt-4 border-t border-amber-200/50 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">
                    अवधि: {pod.duration}
                  </span>

                  <a 
                    href={`https://www.youtube.com/watch?v=${pod.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <span>पॉडकास्ट देखें</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Blog Updates List (Right Column) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl font-serif font-bold text-[#1C1E26] flex items-center gap-2">
              <span>📰 नवीनतम समाचार (Blogs & Updates)</span>
            </h3>

            <div className="space-y-4">
              {blogs.map((b) => (
                <div 
                  key={b.id}
                  className="glass-card glass-card-hover rounded-2xl p-6 border border-amber-200/60 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                      {b.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      {b.date}
                    </span>
                  </div>

                  <h4 className="text-lg font-serif font-bold text-[#1C1E26] hover:text-amber-700 transition-colors">
                    {b.title}
                  </h4>

                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {b.snippet}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-gray-400 flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {b.author}
                    </span>

                    <button 
                      onClick={() => alert(b.content)}
                      className="text-amber-800 font-semibold hover:text-amber-900 flex items-center gap-1"
                    >
                      <span>और पढ़ें</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
