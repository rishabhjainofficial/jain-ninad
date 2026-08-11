'use client';

import React, { useState } from 'react';
import { BookOpen, FileText, ArrowUpRight, X, ExternalLink } from 'lucide-react';
import { GranthBook } from '@/lib/store';
import PdfThumbnail from './PdfThumbnail';

interface GranthSectionProps {
  books: GranthBook[];
}

export default function GranthSection({ books }: GranthSectionProps) {
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string } | null>(null);

  return (
    <section id="granth" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300/40 text-amber-800 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>मौलिक साहित्य एवं ग्रंथ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1E26]">
            मुनि श्री द्वारा रचित महान ग्रंथ सम्पाद
          </h2>
          <p className="text-sm text-gray-600">
            170 से अधिक ग्रंथों एवं 37,000 संस्कृत-प्राकृत श्लोकों का पावन सृजन।
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {books.map((book) => {
            const hasPdf = Boolean(book.pdfFilePath || book.pdfLink);
            const pdfUrl = book.pdfFilePath || book.pdfLink || '';

            return (
              <div 
                key={book.id}
                className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-amber-200/60 flex flex-col justify-between group"
              >
                {/* Cover Image / PDF Thumbnail */}
                {hasPdf ? (
                  <PdfThumbnail
                    pdfUrl={pdfUrl}
                    titleHindi={book.titleHindi}
                    titleEnglish={book.titleEnglish}
                    versesCount={book.versesCount}
                    language={book.language}
                  />
                ) : (
                  <div className="relative h-48 bg-gradient-to-tr from-amber-900 via-amber-800 to-amber-950 p-6 flex flex-col justify-end text-white">
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-medium border border-white/20">
                      {book.language}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold">
                        {book.versesCount}
                      </span>
                      <h3 className="text-2xl font-serif font-bold text-amber-100">
                        {book.titleHindi}
                      </h3>
                      <p className="text-xs text-amber-200/70 italic font-sans">
                        {book.titleEnglish}
                      </p>
                    </div>
                  </div>
                )}

                {/* Description & Action */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {book.description}
                  </p>

                  <div className="pt-4 border-t border-amber-100 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-amber-800 flex items-center gap-1">
                      {hasPdf && <FileText className="w-3.5 h-3.5 text-red-600" />}
                      <span>{hasPdf ? 'PDF उपलब्ध' : 'ग्रंथ स्वाध्याय'}</span>
                    </span>

                    {hasPdf ? (
                      <button
                        onClick={() => setSelectedPdf({ url: pdfUrl, title: book.titleHindi })}
                        className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>PDF पढ़ें</span>
                      </button>
                    ) : (
                      <a 
                        href="https://api.whatsapp.com/send/?phone=919669885159"
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-medium flex items-center gap-1 border border-amber-200 transition-colors"
                      >
                        <span>मँगवाएं / पढ़ें</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* PDF Modal Viewer */}
      {selectedPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-amber-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-300" />
                <h3 className="font-serif font-bold text-lg">{selectedPdf.title}</h3>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={selectedPdf.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs bg-amber-800 hover:bg-amber-700 px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>नए टैब में खोलें</span>
                </a>
                <button
                  onClick={() => setSelectedPdf(null)}
                  className="p-1 rounded-full hover:bg-amber-800 text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body iframe */}
            <div className="flex-1 bg-gray-100 p-2">
              <iframe
                src={selectedPdf.url}
                className="w-full h-full rounded-lg border-0"
                title={selectedPdf.title}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
