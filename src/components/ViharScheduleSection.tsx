'use client';

import React from 'react';
import { MapPin, Calendar, Clock, Sparkles, Navigation } from 'lucide-react';
import { ViharSchedule } from '@/lib/store';

interface ViharScheduleSectionProps {
  currentLocation: string;
  currentStayDetails: string;
  schedules: ViharSchedule[];
}

export default function ViharScheduleSection({
  currentLocation,
  currentStayDetails,
  schedules
}: ViharScheduleSectionProps) {
  return (
    <section id="vihar" className="py-16 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300/40 text-amber-800 text-xs font-semibold">
            <Navigation className="w-3.5 h-3.5 text-amber-600" />
            <span>पावन विहार एवं सान्निध्य</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1E26]">
            आगामी सम्भावित सान्निध्य व विहार कार्यक्रम
          </h2>
          <p className="text-sm text-gray-600">
            "श्रुतसंवेगी महाश्रमण ससंघ अब कहाँ ? गुरुभक्तों का पुण्य जागेगा जहाँ।"
          </p>
        </div>

        {/* Current Location Highlight Banner */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 mb-12 border-2 border-amber-300/60 shadow-md bg-gradient-to-r from-amber-50/80 via-white to-amber-50/80">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">
                  वर्तमान प्रवास (Current Location)
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#1C1E26] mt-0.5">
                  {currentLocation}
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  {currentStayDetails}
                </p>
              </div>
            </div>
            
            <a 
              href="https://api.whatsapp.com/send/?phone=919669885159" 
              target="_blank" 
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition-colors flex items-center gap-2 shadow-xs whitespace-nowrap"
            >
              <span>विहार जानकारी हेतु संपर्क करें</span>
            </a>
          </div>
        </div>

        {/* Timeline List of Schedules */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {schedules.map((item, idx) => (
            <div 
              key={item.id || idx}
              className={`glass-card rounded-2xl p-5 sm:p-6 transition-all duration-200 border ${
                item.isCurrent 
                  ? 'border-amber-500 ring-2 ring-amber-400/20 bg-amber-50/40' 
                  : 'border-amber-200/60 hover:border-amber-400/80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      {item.date}
                    </span>
                    {item.isCurrent && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-800 border border-green-300">
                        ● चल रहा कार्यक्रम
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-serif font-bold text-[#1C1E26]">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs text-gray-700 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>{item.location}</span>
                  </p>

                  <p className="text-xs text-gray-500 pt-1">
                    {item.details}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
