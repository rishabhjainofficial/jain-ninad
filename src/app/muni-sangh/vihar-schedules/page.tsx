'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Navigation, 
  MapPin, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { ViharSchedule } from '@/lib/store';

export default function AllViharSchedulesPage() {
  const [schedules, setSchedules] = useState<ViharSchedule[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchVihars = async (currentPage: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/vihar-schedules?page=${currentPage}&limit=10`, {
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          // Fallback if returned unpaginated array
          setSchedules(data.slice((currentPage - 1) * 10, currentPage * 10));
          setTotalPages(Math.ceil(data.length / 10) || 1);
          setTotal(data.length);
        } else {
          setSchedules(data.schedules || []);
          setTotalPages(data.totalPages || 1);
          setTotal(data.total || 0);
        }
      }
    } catch (e) {
      console.error('Error fetching paginated vihars:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVihars(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="space-y-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-900 bg-amber-100/70 hover:bg-amber-100 px-3 py-1.5 rounded-full transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>मुख्य पृष्ठ (Home)</span>
          </Link>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300/40 text-amber-800 text-xs font-semibold">
              <Navigation className="w-3.5 h-3.5 text-amber-600" />
              <span>मुनि संघ • विहार सूची</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C1E26]">
              समस्त विहार व सान्निध्य कार्यक्रम (All Vihar Schedules)
            </h1>
            <p className="text-sm text-gray-600 max-w-3xl">
              पूज्य मुनि श्री 108 सुवन्द्य सागर जी महाराज ससंघ के समस्त पावन विहार, वेदी प्रतिष्ठा एवं चातुर्मास प्रवास की तिथियों का संपूर्ण संग्रह (नवीनतम से पुरातन)।
            </p>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-amber-700 animate-spin" />
            <span className="text-xs font-medium text-amber-900">विहार तिथियाँ लोड हो रही हैं...</span>
          </div>
        ) : schedules.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-amber-200 p-8 space-y-2">
            <Sparkles className="w-8 h-8 text-amber-600 mx-auto" />
            <h3 className="text-base font-serif font-bold text-[#1C1E26]">कोई विहार सूची नहीं मिली</h3>
            <p className="text-xs text-gray-500">अभी कोई विहार कार्यक्रम दर्ज नहीं हैं।</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 2 Column Grid of 10 Schedules per page */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {schedules.map((item, idx) => (
                <div 
                  key={item.id || idx}
                  className={`glass-card rounded-2xl p-6 transition-all duration-200 border flex flex-col justify-between ${
                    item.isCurrent 
                      ? 'border-amber-500 ring-2 ring-amber-400/20 bg-amber-50/40' 
                      : 'border-amber-200/60 hover:border-amber-400/80 bg-white'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-100 px-3 py-1 rounded-md">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        {item.date}
                      </span>
                      {item.isCurrent && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-800 border border-green-300">
                          ● चल रहा कार्यक्रम
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-serif font-bold text-[#1C1E26]">
                      {item.title}
                    </h3>
                    
                    <p className="text-xs text-gray-700 flex items-start gap-1.5 font-medium">
                      <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{item.location}</span>
                    </p>

                    <p className="text-xs text-gray-500 pt-1 leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-amber-200">
              <div className="text-xs text-gray-600 font-medium">
                कुल <b>{total}</b> में से <b>{(page - 1) * 10 + 1}</b> - <b>{Math.min(page * 10, total)}</b> विहार प्रदर्शित (पृष्ठ {page} / {totalPages})
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page <= 1}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-semibold disabled:opacity-40 disabled:hover:bg-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>पिछला (Prev)</span>
                </button>

                <div className="px-3 py-1.5 bg-amber-100 text-amber-900 rounded-lg text-xs font-bold font-mono">
                  {page} / {totalPages}
                </div>

                <button
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page >= totalPages}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-semibold disabled:opacity-40 disabled:hover:bg-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>अगला (Next)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
