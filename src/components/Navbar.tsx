'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  MapPin, 
  BookOpen, 
  Radio, 
  Feather, 
  Calendar, 
  Image as ImageIcon, 
  Award, 
  Newspaper, 
  ChevronDown, 
  ShieldCheck, 
  Menu, 
  X,
  Share2,
  MessageCircle,
  Video
} from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Banner - Live Broadcast & Socials */}
      <div className="bg-[#1C1E26] text-amber-100 text-xs py-2 px-4 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-red-900/60 text-red-300 border border-red-500/30 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
              Live Deshna
            </span>
            <span className="hidden sm:inline text-amber-200/80 font-serif">
              मुनि श्री 108 सुवन्द्य सागर जी महाराज • पावन स्वाध्याय एवं प्रवचन
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <a href="https://www.youtube.com/@muniaadityasagar" target="_blank" rel="noreferrer" className="text-amber-200/70 hover:text-amber-300 transition-colors flex items-center gap-1">
              <Video className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden md:inline">YouTube</span>
            </a>
            <a href="https://www.instagram.com/muniaadityasagar" target="_blank" rel="noreferrer" className="text-amber-200/70 hover:text-amber-300 transition-colors flex items-center gap-1">
              <Share2 className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden md:inline">Instagram</span>
            </a>
            <a href="https://www.facebook.com/muniaadityasagar" target="_blank" rel="noreferrer" className="text-amber-200/70 hover:text-amber-300 transition-colors flex items-center gap-1">
              <Share2 className="w-3.5 h-3.5 text-blue-300" />
              <span className="hidden md:inline">Facebook</span>
            </a>
            <a href="https://api.whatsapp.com/send/?phone=919669885159" target="_blank" rel="noreferrer" className="text-amber-200/70 hover:text-amber-300 transition-colors flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>
            <span className="text-amber-500/40">|</span>
            <Link href="/admin" className="text-amber-400 hover:text-amber-300 font-medium text-xs flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="glass-card shadow-sm border-b border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center shadow-md border-2 border-amber-300/80 group-hover:scale-105 transition-transform flex-shrink-0">
                <img 
                  src="/suvandya-sagar-ji.webp" 
                  alt="गुरु सुवन्द्य सागर" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-serif font-bold text-[#1C1E26] tracking-wide leading-tight group-hover:text-amber-700 transition-colors">
                  गुरु सुवन्द्य सागर
                </span>
                <span className="text-[11px] text-amber-800/70 tracking-widest uppercase font-medium">
                  Spiritual Guidance & Peace
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link href="/" className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#1C1E26] hover:text-amber-700 hover:bg-amber-50/60 transition-colors">
                Home
              </Link>

              {/* Muni Shri Dropdown */}
              <div className="relative group" onMouseEnter={() => setActiveDropdown('muni')} onMouseLeave={() => setActiveDropdown(null)}>
                <button className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#1C1E26] hover:text-amber-700 hover:bg-amber-50/60 transition-colors inline-flex items-center gap-1">
                  <span>Muni Shri</span>
                  <ChevronDown className="w-4 h-4 opacity-60 group-hover:rotate-180 transition-transform" />
                </button>
                {activeDropdown === 'muni' && (
                  <div className="absolute top-full left-0 w-56 glass-card rounded-xl shadow-xl py-2 border border-amber-200/60 animate-in fade-in slide-in-from-top-2 duration-150">
                    <Link href="/biography" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1C1E26] hover:bg-amber-50/80 hover:text-amber-700 transition-colors">
                      <Feather className="w-4 h-4 text-amber-600" />
                      <span>Biography (जीवन परिचय)</span>
                    </Link>
                    <Link href="/muni-sangh" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1C1E26] hover:bg-amber-50/80 hover:text-amber-700 transition-colors">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Muni Sangh (मुनि संघ)</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Pravachan Dropdown */}
              <div className="relative group" onMouseEnter={() => setActiveDropdown('pravachan')} onMouseLeave={() => setActiveDropdown(null)}>
                <button className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#1C1E26] hover:text-amber-700 hover:bg-amber-50/60 transition-colors inline-flex items-center gap-1">
                  <span>Pravachan</span>
                  <ChevronDown className="w-4 h-4 opacity-60 group-hover:rotate-180 transition-transform" />
                </button>
                {activeDropdown === 'pravachan' && (
                  <div className="absolute top-full left-0 w-64 glass-card rounded-xl shadow-xl py-2 border border-amber-200/60 animate-in fade-in slide-in-from-top-2 duration-150">
                    <Link href="/#pravachan" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1C1E26] hover:bg-amber-50/80 hover:text-amber-700 transition-colors">
                      <Radio className="w-4 h-4 text-amber-600" />
                      <span>Deshna Pravachan</span>
                    </Link>
                    <Link href="/#shrut-samadhan" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1C1E26] hover:bg-amber-50/80 hover:text-amber-700 transition-colors">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Shrut Samadhan (श्रुत समाधान)</span>
                    </Link>
                    <Link href="/#jivan-neeti" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1C1E26] hover:bg-amber-50/80 hover:text-amber-700 transition-colors">
                      <BookOpen className="w-4 h-4 text-amber-600" />
                      <span>Jivan Neeti (जीवन नीति)</span>
                    </Link>
                    <Link href="/#podcasts" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1C1E26] hover:bg-amber-50/80 hover:text-amber-700 transition-colors">
                      <Radio className="w-4 h-4 text-amber-600" />
                      <span>Spiritual Podcast</span>
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/#vihar" className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#1C1E26] hover:text-amber-700 hover:bg-amber-50/60 transition-colors flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>Vihar Schedule</span>
              </Link>

              <Link href="/#granth" className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#1C1E26] hover:text-amber-700 hover:bg-amber-50/60 transition-colors flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Granth Treasury</span>
              </Link>

              <Link href="/#updates" className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#1C1E26] hover:text-amber-700 hover:bg-amber-50/60 transition-colors flex items-center gap-1.5">
                <Newspaper className="w-4 h-4 text-amber-600" />
                <span>Updates & Blog</span>
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-amber-900 hover:bg-amber-100/50 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden glass-card border-t border-amber-200/50 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#1C1E26] hover:bg-amber-50"
            >
              Home
            </Link>

            <div className="border-t border-amber-100 pt-2">
              <span className="px-3 text-xs font-semibold uppercase text-amber-800 tracking-wider">Muni Shri</span>
              <Link 
                href="/biography" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-amber-50"
              >
                Biography (जीवन परिचय)
              </Link>
            </div>

            <div className="border-t border-amber-100 pt-2">
              <span className="px-3 text-xs font-semibold uppercase text-amber-800 tracking-wider">Deshna & Pravachan</span>
              <Link 
                href="/#pravachan" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-amber-50"
              >
                Pravachans
              </Link>
              <Link 
                href="/#jivan-neeti" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-amber-50"
              >
                Jivan Neeti
              </Link>
            </div>

            <div className="border-t border-amber-100 pt-2 space-y-1">
              <Link 
                href="/#vihar" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-[#1C1E26] hover:bg-amber-50"
              >
                Vihar Schedule
              </Link>
              <Link 
                href="/#granth" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-[#1C1E26] hover:bg-amber-50"
              >
                Granth Treasury
              </Link>
              <Link 
                href="/#updates" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-[#1C1E26] hover:bg-amber-50"
              >
                Updates & Blog
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
