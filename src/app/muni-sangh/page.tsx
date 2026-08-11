import { Metadata } from 'next';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Sparkles, HeartHandshake, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "मुनि संघ व गुरु परम्परा | मुनि श्री 108 सुवन्द्य सागर जी महाराज",
  description: "आचार्य श्री 108 सुविधि सागर जी महाराज एवं दिगम्बर जैन मुनि परम्परा (आचार्य आदिसगर अंकलीकर परम्परा)।",
};

export default function MuniSanghPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/60 text-amber-900 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>आचार्य परम्परा एवं संघ जानकारी</span>
            </div>

            <h1 className="text-4xl font-serif font-bold text-[#1C1E26]">
              पावन मुनि संघ व गुरु परम्परा
            </h1>
            <p className="text-sm text-gray-600">
              परम पूज्य निर्ग्रन्थ मुनि श्री 108 सुवन्द्य सागर जी महाराज एवं सुविधि सागर जी आचार्य परम्परा।
            </p>
          </div>

          {/* Deeksha Guru & Lineage Details */}
          <div className="glass-card rounded-2xl p-8 space-y-6 border border-amber-200">
            <h2 className="text-2xl font-serif font-bold text-amber-900">
              दीक्षा गुरु एवं आचार्य परम्परा (Acharya Lineage)
            </h2>

            <div className="space-y-3 text-sm font-sans">
              <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200">
                <span className="text-xs uppercase font-bold text-amber-800">दीक्षा गुरु (Diksha Guru)</span>
                <h3 className="text-lg font-serif font-bold text-[#1C1E26]">
                  आचार्य श्री 108 सुविधि सागर जी महाराज
                </h3>
                <p className="text-xs text-gray-600">
                  दीक्षा स्थान: गजपंथ, नासिक (महाराष्ट्र) • दीक्षा तिथि: 05 फ़रवरी 2004
                </p>
              </div>

              <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200">
                <span className="text-xs uppercase font-bold text-amber-800">ब्रह्मचर्य व्रत गुरु</span>
                <h3 className="text-lg font-serif font-bold text-[#1C1E26]">
                  मुनि श्री 108 समाधि सागर जी महाराज
                </h3>
                <p className="text-xs text-gray-600">
                  व्रत ग्रहण स्थान: नवागढ़, बेमेतरा (छत्तीसगढ़)
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-sm font-bold text-[#1C1E26]">पावन मूल परम्परा:</h4>
              <ul className="space-y-1 text-xs text-gray-700 font-sans">
                <li>• आचार्य श्री 108 आदि सागर जी महाराज (अंकलीकर)</li>
                <li>• आचार्य श्री 108 महावीर कीर्ति जी महाराज</li>
                <li>• आचार्य श्री 108 विमल सागर जी महाराज</li>
                <li>• आचार्य श्री 108 सन्मति सागर जी महाराज</li>
                <li>• आचार्य श्री 108 सुविधि सागर जी महाराज</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-amber-100 flex justify-center">
              <Link 
                href="/" 
                className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium transition-colors"
              >
                मुख्य पृष्ठ देखें
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
