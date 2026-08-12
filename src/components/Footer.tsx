'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart } from 'lucide-react';
import { YouTubeIcon, InstagramIcon, FacebookIcon, WhatsAppIcon, TelegramIcon } from './SocialIcons';

export default function Footer() {
  return (
    <footer className="bg-[#1C1E26] text-amber-100/80 pt-16 pb-8 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* 1. Brand & Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-serif font-bold text-amber-100">
                मुनि श्री सुवन्द्य सागर (Muni Suvandyasagar)
              </span>
            </div>
            <p className="text-xs text-amber-200/60 leading-relaxed">
              यह आधिकारिक पावन पोर्टल पूज्य मुनि श्री 108 सुवन्द्य सागर जी महाराज के भक्तों द्वारा संचालित है। निष्परिग्रही व्रती जीवन के सिद्धांतों का पूर्ण पालन किया जाता है।
            </p>
          </div>

          {/* 2. Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-bold text-amber-300 uppercase tracking-wider">
              मुख्य लिंक (Quick Links)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/biography" className="hover:text-amber-300 transition-colors">
                  जीवन परिचय (Biography)
                </Link>
              </li>
              {/* <li>
                <Link href="/#vihar" className="hover:text-amber-300 transition-colors">
                  विहार कार्यक्रम (Vihar Schedule)
                </Link>
              </li> */}
              <li>
                <Link href="/#pravachan" className="hover:text-amber-300 transition-colors">
                  प्रवचन एवं स्वाध्याय (Pravachan & Swadhyay)
                </Link>
              </li>
              {/* <li>
                <Link href="/#jivan-neeti" className="hover:text-amber-300 transition-colors">
                  जीवन नीति सूत्र (Jivan Neeti)
                </Link>
              </li> */}
              <li>
                <Link href="/#granth" className="hover:text-amber-300 transition-colors">
                  ग्रंथ भंडार (E शास्त्र)
                </Link>
              </li>
              <li>
                <Link href="/#podcasts" className="hover:text-amber-300 transition-colors">
                  आध्यात्मिक पोडकास्ट (Podcasts)
                </Link>
              </li>
              <li>
                <Link href="/#updates" className="hover:text-amber-300 transition-colors">
                  बिहार व कार्यक्रम समाचार (Updates)
                </Link>
              </li>
              {/* <li>
                <Link href="/admin" className="hover:text-amber-300 transition-colors text-amber-400 font-medium">
                  प्रशासनिक पैनल (Admin Panel)
                </Link>
              </li> */}
            </ul>
          </div>

          {/* 3. Social Channels */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-bold text-amber-300 uppercase tracking-wider">
              पावन सोशल मीडिया (Social Media)
            </h4>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="https://www.youtube.com/@jainninad1008"
                target="_blank"
                rel="noreferrer"
                title="YouTube"
                className="p-2.5 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white transition-colors border border-red-500/20"
              >
                <YouTubeIcon className="w-5 h-5" />
              </a>

              <a
                href="https://www.instagram.com/munisuvandyasagar"
                target="_blank"
                rel="noreferrer"
                title="Instagram"
                className="p-2.5 rounded-xl bg-pink-600/20 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 text-pink-400 hover:text-white transition-colors border border-pink-500/20"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>

              <a
                href="https://www.facebook.com/munisuvandyasagar"
                target="_blank"
                rel="noreferrer"
                title="Facebook"
                className="p-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white transition-colors border border-blue-500/20"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>

              <a
                href="https://api.whatsapp.com/send/?phone=919669885159"
                target="_blank"
                rel="noreferrer"
                title="WhatsApp"
                className="p-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white transition-colors border border-emerald-500/20"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>

              <a
                href="https://t.me/munisuvandyasagar"
                target="_blank"
                rel="noreferrer"
                title="Telegram"
                className="p-2.5 rounded-xl bg-sky-600/20 hover:bg-sky-500 text-sky-400 hover:text-white transition-colors border border-sky-500/20"
              >
                <TelegramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Developer Credits */}
        <div className="pt-8 border-t border-amber-900/40 text-center text-xs text-amber-200/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} मुनि श्री 108 सुवन्द्य सागर जी महाराज (Muni Shri 108 Suvandyasagar Ji Maharaj). सर्वाधिकार सुरक्षित।</p>
          <div className="flex items-center gap-1.5">
            <span>Built with devotion by</span>
            <a
              href="https://dev-rishabh.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 font-semibold hover:text-amber-300 underline underline-offset-2 transition-colors"
            >
              Rishabh Jain
            </a>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-current ml-0.5" />
          </div>
        </div>

      </div>
    </footer>
  );
}
