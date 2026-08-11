'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Video, Share2, MessageCircle, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1C1E26] text-amber-100/80 pt-16 pb-8 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-serif font-bold text-amber-100">
                गुरु सुवन्द्य सागर
              </span>
            </div>
            <p className="text-xs text-amber-200/60 leading-relaxed">
              यह आधिकारिक पोर्टल पूज्य मुनि श्री 108 सुवन्द्य सागर जी महाराज के भक्तों द्वारा संचालित है। निष्परिग्रही व्रती जीवन के सिद्धांतों का पूर्ण पालन किया जाता है।
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-bold text-amber-300 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/biography" className="hover:text-amber-300 transition-colors">
                  Biography (जीवन परिचय)
                </Link>
              </li>
              <li>
                <Link href="/#vihar" className="hover:text-amber-300 transition-colors">
                  Vihar Schedule (विहार कार्यक्रम)
                </Link>
              </li>
              <li>
                <Link href="/#pravachan" className="hover:text-amber-300 transition-colors">
                  Pravachan & Swadhyay
                </Link>
              </li>
              <li>
                <Link href="/#jivan-neeti" className="hover:text-amber-300 transition-colors">
                  Jivan Neeti (जीवन सूत्र)
                </Link>
              </li>
              <li>
                <Link href="/#granth" className="hover:text-amber-300 transition-colors">
                  Granth Treasury
                </Link>
              </li>
            </ul>
          </div>

          {/* Initiatives & Deshna */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-bold text-amber-300 uppercase tracking-wider">
              Initiatives
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://guruadityasagar.com/jia-awards/" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors">
                  JIA Awards (जैन इम्पैक्ट अवार्ड्स)
                </a>
              </li>
              <li>
                <Link href="/#podcasts" className="hover:text-amber-300 transition-colors">
                  Spiritual Podcasts
                </Link>
              </li>
              <li>
                <Link href="/#updates" className="hover:text-amber-300 transition-colors">
                  Bihar & Program Updates
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-300 transition-colors text-amber-400 font-medium">
                  Admin Control Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Channels */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-bold text-amber-300 uppercase tracking-wider">
              Connect With Us
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              <a href="https://www.youtube.com/@muniaadityasagar" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-amber-300">
                <Video className="w-4 h-4 text-red-500" />
                <span>YouTube @muniaadityasagar</span>
              </a>
              <a href="https://www.instagram.com/muniaadityasagar" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-amber-300">
                <Share2 className="w-4 h-4 text-pink-500" />
                <span>Instagram @muniaadityasagar</span>
              </a>
              <a href="https://www.facebook.com/muniaadityasagar" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-amber-300">
                <Share2 className="w-4 h-4 text-blue-500" />
                <span>Facebook @muniaadityasagar</span>
              </a>
              <a href="https://api.whatsapp.com/send/?phone=919669885159" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-amber-300">
                <MessageCircle className="w-4 h-4 text-green-500" />
                <span>WhatsApp Helpline</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-amber-900/40 text-center text-xs text-amber-200/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Muni Shri 108 Suvandya Sagar Ji Maharaj. Peaceful Spiritual Portal.</p>
          <div className="flex items-center gap-1">
            <span>Built with devotion & peace</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-current" />
          </div>
        </div>

      </div>
    </footer>
  );
}
