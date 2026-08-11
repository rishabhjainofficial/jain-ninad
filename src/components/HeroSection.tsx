'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  MapPin, 
  BookOpen, 
  Radio, 
  ChevronRight, 
  Feather,
  HeartHandshake
} from 'lucide-react';
import { SiteData } from '@/lib/store';

interface HeroSectionProps {
  data: SiteData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#FFFDF9] to-[#FAF8F5]">
      {/* Background Decorative Mandala Rings */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full border border-amber-200/30 pointer-events-none -z-10 animate-spin-slow"></div>
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full border border-amber-300/20 pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Spiritual Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/70 border border-amber-300/50 text-amber-900 text-xs font-medium tracking-wide shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>दिगम्बर जैन परम्परा • श्रुतसंवेगी महाश्रमण</span>
            </div>

            {/* Title & Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1E26] leading-tight">
              मुनि श्री 108 <br />
              <span className="gold-gradient-text">सुवन्द्य सागर जी महाराज</span>
            </h1>

            {/* Mahamantra Highlight Box */}
            <div className="glass-card rounded-2xl p-4 sm:p-6 border-l-4 border-l-amber-500 shadow-sm max-w-xl mx-auto lg:mx-0">
              <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
                पावन महामंत्र
              </div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-amber-950 tracking-wide">
                {data.mahamantraText}
              </div>
              <p className="text-xs text-gray-600 mt-2 font-sans">
                व्यर्थ की बातों व अशुभ विचारों को अनदेखा कर आत्मशुद्धि के मार्ग पर चलें।
              </p>
            </div>

            {/* Concise Bio Teaser */}
            <p className="text-base sm:text-lg text-gray-700 font-sans leading-relaxed max-w-2xl mx-auto lg:mx-0">
              पूर्वाश्रम में बाल ब्रह्मचारी प्राणेश जी (B.Sc.), जिन्होंने 05 फ़रवरी 2004 को सिद्धक्षेत्र गजपंथ (नासिक) में आचार्य श्री 108 सुविधि सागर जी महाराज से मुनि दीक्षा प्राप्त की। समस्त परिग्रहों का पूर्ण त्याग कर आप आगमानुसारी चर्या का पालन कर रहे हैं।
            </p>

            {/* Primary Action CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link 
                href="/biography" 
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium text-sm shadow-md hover:shadow-lg hover:from-amber-700 hover:to-amber-600 transition-all flex items-center gap-2"
              >
                <Feather className="w-4 h-4" />
                <span>जीवन परिचय (Biography)</span>
                <ChevronRight className="w-4 h-4 opacity-80" />
              </Link>

              <Link 
                href="#vihar" 
                className="px-6 py-3.5 rounded-xl glass-card text-[#1C1E26] font-medium text-sm hover:bg-amber-100/50 transition-all flex items-center gap-2 border border-amber-300/50"
              >
                <MapPin className="w-4 h-4 text-amber-700" />
                <span>वर्तमान विहार (Live Location)</span>
              </Link>
            </div>

          </div>

          {/* Hero Visual Accent / Spiritual Feature Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer Golden Aura */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-200 rounded-3xl blur-md opacity-40"></div>
              
              <div className="relative glass-card rounded-3xl p-6 sm:p-8 space-y-6 text-center border border-amber-200">
                {/* Muni Shri Portrait */}
                <div className="w-36 h-36 mx-auto rounded-full overflow-hidden bg-gradient-to-tr from-amber-100 to-amber-50 border-4 border-amber-300/80 shadow-md">
                  <img 
                    src="/suvandya-sagar-ji.png" 
                    alt="मुनि श्री 108 सुवन्द्य सागर जी महाराज" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-bold text-[#1C1E26]">
                    वर्तमान प्रवास स्थल
                  </h3>
                  <p className="text-sm font-medium text-amber-800 flex items-center justify-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>{data.currentLocation}</span>
                  </p>
                  <p className="text-xs text-gray-600 italic px-2">
                    "{data.currentStayDetails}"
                  </p>
                </div>

                {/* Quick Stats Banner */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-amber-200/50 text-center">
                  <div className="p-2">
                    <div className="text-lg font-bold text-amber-900 font-serif">24+</div>
                    <div className="text-[10px] text-gray-600 font-medium">रचित ग्रंथ</div>
                  </div>
                  <div className="p-2 border-x border-amber-200/50">
                    <div className="text-lg font-bold text-amber-900 font-serif">B.Sc.</div>
                    <div className="text-[10px] text-gray-600 font-medium">उच्च शिक्षा</div>
                  </div>
                  <div className="p-2">
                    <div className="text-lg font-bold text-amber-900 font-serif">2004</div>
                    <div className="text-[10px] text-gray-600 font-medium">मुनि दीक्षा वर्ष</div>
                  </div>
                </div>

                <a 
                  href="#pravachan" 
                  className="block w-full py-2.5 rounded-lg bg-amber-50 text-amber-900 font-medium text-xs hover:bg-amber-100 transition-colors border border-amber-200"
                >
                  प्रवचन एवं श्रुत समाधान देखें →
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
