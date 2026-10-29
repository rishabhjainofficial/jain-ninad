'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PdfThumbnail from '@/components/PdfThumbnail';
import { GranthBook, fetchSiteDataFromDb, getSiteData } from '@/lib/store';
import { ALL_UPLOADED_GRANTHS } from '@/lib/granthData';
import { 
  BookOpen, 
  Search, 
  FileText, 
  ArrowLeft, 
  ExternalLink, 
  X, 
  Download, 
  ArrowUpRight,
  Filter
} from 'lucide-react';
import Link from 'next/link';

export default function AllGranthsPage() {
  const [books, setBooks] = useState<GranthBook[]>(ALL_UPLOADED_GRANTHS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'all' | 'hindi' | 'marathi' | 'sanskrit'>('all');
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string; filename: string } | null>(null);

  useEffect(() => {
    async function loadGranths() {
      // Fast load from cached data first
      const local = getSiteData();
      if (local && local.granthBooks && local.granthBooks.length > 0) {
        setBooks(local.granthBooks);
      }
      
      // Hydrate with latest database records
      try {
        const dbData = await fetchSiteDataFromDb();
        if (dbData && dbData.granthBooks && dbData.granthBooks.length > 0) {
          setBooks(dbData.granthBooks);
        }
      } catch (e) {
        console.error('Failed to load granths from DB:', e);
      }
    }
    loadGranths();
  }, []);

  // Filter books based on search query and language
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Language filter
      if (selectedLanguage === 'hindi') {
        const isHindi = book.language.includes('हिंदी') && !book.language.includes('संस्कृत');
        if (!isHindi) return false;
      } else if (selectedLanguage === 'marathi') {
        if (!book.language.includes('मराठी')) return false;
      } else if (selectedLanguage === 'sanskrit') {
        if (!book.language.includes('संस्कृत')) return false;
      }

      // Search filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const matchHindi = book.titleHindi.toLowerCase().includes(q);
      const matchEnglish = book.titleEnglish.toLowerCase().includes(q);
      const matchDesc = book.description.toLowerCase().includes(q);
      return matchHindi || matchEnglish || matchDesc;
    });
  }, [books, searchQuery, selectedLanguage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between">
            <Link
              href="/#granth"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-100/80 hover:bg-amber-200/80 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>मुख्य पृष्ठ पर वापस जाएं</span>
            </Link>

            <span className="text-xs text-amber-800 font-medium">
              कुल उपलब्ध ग्रंथ: <strong className="text-amber-950 font-bold">{books.length}</strong>
            </span>
          </div>

          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300/40 text-amber-800 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>ई-शास्त्र समग्र ग्रंथालय</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C1E26]">
              पूज्य मुनि श्री द्वारा रचित समग्र पावन ग्रंथ
            </h1>
            
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
              परम पूज्य निर्ग्रन्थ मुनि श्री 108 सुवन्द्य सागर जी महाराज द्वारा रचित एवं संपादित मौलिक ग्रंथ, आगम टीका, आचार संहिता एवं पद्यानुवाद। किसी भी ग्रंथ का स्वाध्याय एवं PDF सीधे ऑनलाइन पढ़ें या डाउनलोड करें।
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="glass-card rounded-2xl p-4 sm:p-5 border border-amber-200/80 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
              
              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="ग्रंथ का नाम या विषय खोजें (Search Granth)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-amber-200/70 text-xs sm:text-sm text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Language Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                <div className="hidden sm:flex items-center gap-1 text-xs text-gray-500 mr-1">
                  <Filter className="w-3 h-3 text-amber-600" />
                  <span>भाषा:</span>
                </div>
                
                <button
                  onClick={() => setSelectedLanguage('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedLanguage === 'all'
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'bg-white hover:bg-amber-50 text-gray-700 border border-amber-200/60'
                  }`}
                >
                  सभी ({books.length})
                </button>

                <button
                  onClick={() => setSelectedLanguage('hindi')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedLanguage === 'hindi'
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'bg-white hover:bg-amber-50 text-gray-700 border border-amber-200/60'
                  }`}
                >
                  हिंदी (29)
                </button>

                <button
                  onClick={() => setSelectedLanguage('marathi')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedLanguage === 'marathi'
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'bg-white hover:bg-amber-50 text-gray-700 border border-amber-200/60'
                  }`}
                >
                  मराठी (6)
                </button>

                <button
                  onClick={() => setSelectedLanguage('sanskrit')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedLanguage === 'sanskrit'
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'bg-white hover:bg-amber-50 text-gray-700 border border-amber-200/60'
                  }`}
                >
                  संस्कृत / हिंदी (4)
                </button>
              </div>

            </div>
          </div>

          {/* Granths Grid */}
          {filteredBooks.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-amber-200/60 space-y-3">
              <BookOpen className="w-10 h-10 text-amber-400 mx-auto opacity-60" />
              <h3 className="text-base font-serif font-bold text-gray-800">कोई ग्रंथ नहीं मिला</h3>
              <p className="text-xs text-gray-500">
                कृपया अन्य खोज शब्द या फ़िल्टर का उपयोग करें।
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedLanguage('all'); }}
                className="mt-2 px-4 py-2 rounded-xl bg-amber-100 text-amber-900 text-xs font-semibold hover:bg-amber-200"
              >
                सभी ग्रंथ देखें
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredBooks.map((book) => {
                const hasPdf = Boolean(book.pdfFilePath || book.pdfLink);
                const pdfUrl = book.pdfFilePath || book.pdfLink || '';

                return (
                  <div
                    key={book.id}
                    className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-amber-200/70 flex flex-col justify-between group transition-all duration-200"
                  >
                    {/* PDF Thumbnail / Cover */}
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

                    {/* Book Information & Actions */}
                    <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md">
                            {book.versesCount}
                          </span>
                          <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                            {book.language}
                          </span>
                        </div>

                        <h3 className="font-serif font-bold text-lg text-gray-900 group-hover:text-amber-800 transition-colors">
                          {book.titleHindi}
                        </h3>
                        <p className="text-xs text-gray-500 font-sans italic">
                          {book.titleEnglish}
                        </p>

                        <p className="text-xs text-gray-600 leading-relaxed font-sans pt-1">
                          {book.description}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-4 border-t border-amber-100 flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-amber-800 flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5 text-red-600" />
                          <span>PDF उपलब्ध</span>
                        </span>

                        <div className="flex items-center gap-2">
                          {hasPdf && (
                            <button
                              onClick={() => setSelectedPdf({ 
                                url: pdfUrl, 
                                title: book.titleHindi,
                                filename: `${book.titleEnglish || book.titleHindi}.pdf`
                              })}
                              className="px-3.5 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs font-medium flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>PDF पढ़ें</span>
                            </button>
                          )}

                          <a
                            href="https://api.whatsapp.com/send/?phone=919669885159"
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-medium flex items-center gap-1 border border-amber-200 transition-colors"
                            title="पुस्तक प्रति मंगवाने हेतु संपर्क करें"
                          >
                            <span>मँगवाएं</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </main>

      {/* PDF Modal Viewer */}
      {selectedPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-amber-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0 pr-4">
                <FileText className="w-5 h-5 text-amber-300 shrink-0" />
                <h3 className="font-serif font-bold text-base sm:text-lg truncate">
                  {selectedPdf.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={selectedPdf.url}
                  download={selectedPdf.filename}
                  className="text-xs bg-amber-800 hover:bg-amber-700 px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors"
                  title="PDF डाउनलोड करें"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">डाउनलोड</span>
                </a>
                <a
                  href={selectedPdf.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs bg-amber-800 hover:bg-amber-700 px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors"
                  title="नए टैब में खोलें"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">नए टैब में खोलें</span>
                </a>
                <button
                  onClick={() => setSelectedPdf(null)}
                  className="p-1 rounded-full hover:bg-amber-800 text-white/80 hover:text-white transition-colors cursor-pointer"
                  title="बंद करें"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body iframe */}
            <div className="flex-1 bg-gray-100 p-1 sm:p-2">
              <iframe
                src={selectedPdf.url}
                className="w-full h-full rounded-lg border-0"
                title={selectedPdf.title}
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

