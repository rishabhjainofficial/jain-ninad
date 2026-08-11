'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  getSiteData, 
  saveSiteData, 
  SiteData, 
  ViharSchedule, 
  PravachanItem, 
  JivanNeetiQuote, 
  GranthBook,
  BlogUpdate
} from '@/lib/store';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  MapPin, 
  Radio, 
  Sparkles, 
  BookOpen, 
  Newspaper, 
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [data, setData] = useState<SiteData | null>(null);
  const [activeTab, setActiveTab] = useState<'vihar' | 'pravachan' | 'neeti' | 'granth' | 'blog'>('vihar');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New Vihar item state
  const [newVihar, setNewVihar] = useState<Partial<ViharSchedule>>({
    date: '', title: '', location: '', details: '', isCurrent: false
  });

  // New Pravachan item state
  const [newPravachan, setNewPravachan] = useState<Partial<PravachanItem>>({
    title: '', category: 'Pravachan', description: '', youtubeId: 'dQw4w9WgXcQ', duration: '30:00', date: 'Feb 2025'
  });

  // New Jivan Neeti item state
  const [newNeeti, setNewNeeti] = useState<Partial<JivanNeetiQuote>>({
    quoteHindi: '', quoteEnglish: '', category: 'आत्मानुशासन', likes: 100
  });

  // New Granth item state
  const [newGranth, setNewGranth] = useState<Partial<GranthBook>>({
    titleHindi: '', titleEnglish: '', description: '', versesCount: '500 श्लोक', language: 'संस्कृत / हिंदी'
  });

  // New Blog item state
  const [newBlog, setNewBlog] = useState<Partial<BlogUpdate>>({
    title: '', category: 'Bihar Updates', snippet: '', content: '', author: 'प्रचार समिति', date: 'Feb 2025'
  });

  useEffect(() => {
    setData(getSiteData());
  }, []);

  if (!data) return null;

  const triggerNotify = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // General Header Update
  const handleUpdateGeneral = (currentLocation: string, currentStayDetails: string, mahamantraText: string) => {
    const updated = { ...data, currentLocation, currentStayDetails, mahamantraText };
    setData(updated);
    saveSiteData(updated);
    triggerNotify();
  };

  // Vihar Handlers
  const handleAddVihar = () => {
    if (!newVihar.title || !newVihar.date) return;
    const item: ViharSchedule = {
      id: `v_${Date.now()}`,
      date: newVihar.date || '',
      title: newVihar.title || '',
      location: newVihar.location || '',
      details: newVihar.details || '',
      isCurrent: !!newVihar.isCurrent
    };
    const updated = { ...data, viharSchedules: [item, ...data.viharSchedules] };
    setData(updated);
    saveSiteData(updated);
    setNewVihar({ date: '', title: '', location: '', details: '', isCurrent: false });
    triggerNotify();
  };

  const handleDeleteVihar = (id: string) => {
    const updated = { ...data, viharSchedules: data.viharSchedules.filter(v => v.id !== id) };
    setData(updated);
    saveSiteData(updated);
    triggerNotify();
  };

  // Pravachan Handlers
  const handleAddPravachan = () => {
    if (!newPravachan.title) return;
    const item: PravachanItem = {
      id: `p_${Date.now()}`,
      title: newPravachan.title || '',
      category: newPravachan.category as any || 'Pravachan',
      description: newPravachan.description || '',
      youtubeId: newPravachan.youtubeId || 'dQw4w9WgXcQ',
      duration: newPravachan.duration || '30:00',
      date: newPravachan.date || 'Feb 2025'
    };
    const updated = { ...data, pravachans: [item, ...data.pravachans] };
    setData(updated);
    saveSiteData(updated);
    setNewPravachan({ title: '', category: 'Pravachan', description: '', youtubeId: 'dQw4w9WgXcQ', duration: '30:00', date: 'Feb 2025' });
    triggerNotify();
  };

  const handleDeletePravachan = (id: string) => {
    const updated = { ...data, pravachans: data.pravachans.filter(p => p.id !== id) };
    setData(updated);
    saveSiteData(updated);
    triggerNotify();
  };

  // Jivan Neeti Handlers
  const handleAddNeeti = () => {
    if (!newNeeti.quoteHindi) return;
    const item: JivanNeetiQuote = {
      id: `q_${Date.now()}`,
      quoteHindi: newNeeti.quoteHindi || '',
      quoteEnglish: newNeeti.quoteEnglish || '',
      category: newNeeti.category || 'आत्मानुशासन',
      likes: Number(newNeeti.likes) || 100
    };
    const updated = { ...data, jivanNeetiQuotes: [item, ...data.jivanNeetiQuotes] };
    setData(updated);
    saveSiteData(updated);
    setNewNeeti({ quoteHindi: '', quoteEnglish: '', category: 'आत्मानुशासन', likes: 100 });
    triggerNotify();
  };

  const handleDeleteNeeti = (id: string) => {
    const updated = { ...data, jivanNeetiQuotes: data.jivanNeetiQuotes.filter(q => q.id !== id) };
    setData(updated);
    saveSiteData(updated);
    triggerNotify();
  };

  // Granth Handlers
  const handleAddGranth = () => {
    if (!newGranth.titleHindi) return;
    const item: GranthBook = {
      id: `b_${Date.now()}`,
      titleHindi: newGranth.titleHindi || '',
      titleEnglish: newGranth.titleEnglish || '',
      description: newGranth.description || '',
      versesCount: newGranth.versesCount || '500 श्लोक',
      language: newGranth.language || 'संस्कृत / हिंदी'
    };
    const updated = { ...data, granthBooks: [item, ...data.granthBooks] };
    setData(updated);
    saveSiteData(updated);
    setNewGranth({ titleHindi: '', titleEnglish: '', description: '', versesCount: '500 श्लोक', language: 'संस्कृत / हिंदी' });
    triggerNotify();
  };

  const handleDeleteGranth = (id: string) => {
    const updated = { ...data, granthBooks: data.granthBooks.filter(b => b.id !== id) };
    setData(updated);
    saveSiteData(updated);
    triggerNotify();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-amber-800 font-medium hover:underline mb-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>वेबसाइट देखें (Back to Frontend)</span>
            </Link>
            <h1 className="text-3xl font-serif font-bold text-[#1C1E26]">
              Admin Control Dashboard
            </h1>
            <p className="text-xs text-gray-600">
              वेबसाइट की सामग्री, विहार स्थान, प्रवचन, एवं जीवन नीति को यहाँ से अपडेट करें।
            </p>
          </div>

          {saveSuccess && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-300 text-green-800 rounded-xl text-xs font-semibold animate-in fade-in">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>सफलतापूर्वक अपडेट किया गया! (Changes Saved)</span>
            </div>
          )}
        </div>

        {/* Global Stay & Location Management Card */}
        <div className="glass-card rounded-2xl p-6 mb-10 border border-amber-300/60 shadow-xs space-y-4">
          <h2 className="text-lg font-serif font-bold text-[#1C1E26] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-600" />
            <span>वर्तमान विहार लोकेशन एवं महामंत्र सम्पादन</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                वर्तमान प्रवास (Current Location)
              </label>
              <input
                type="text"
                value={data.currentLocation}
                onChange={(e) => handleUpdateGeneral(e.target.value, data.currentStayDetails, data.mahamantraText)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                पावन महामंत्र (Mahamantra Banner Text)
              </label>
              <input
                type="text"
                value={data.mahamantraText}
                onChange={(e) => handleUpdateGeneral(data.currentLocation, data.currentStayDetails, e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-serif font-bold text-amber-900"
              />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-amber-200 pb-4">
          <button
            onClick={() => setActiveTab('vihar')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'vihar' ? 'bg-amber-600 text-white shadow-xs' : 'bg-amber-50 text-gray-700 hover:bg-amber-100'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Vihar Schedule</span>
          </button>

          <button
            onClick={() => setActiveTab('pravachan')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'pravachan' ? 'bg-amber-600 text-white shadow-xs' : 'bg-amber-50 text-gray-700 hover:bg-amber-100'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Pravachans & Audio</span>
          </button>

          <button
            onClick={() => setActiveTab('neeti')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'neeti' ? 'bg-amber-600 text-white shadow-xs' : 'bg-amber-50 text-gray-700 hover:bg-amber-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Jivan Neeti</span>
          </button>

          <button
            onClick={() => setActiveTab('granth')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'granth' ? 'bg-amber-600 text-white shadow-xs' : 'bg-amber-50 text-gray-700 hover:bg-amber-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Granth Treasury</span>
          </button>
        </div>

        {/* TAB 1: VIHAR SCHEDULE MANAGER */}
        {activeTab === 'vihar' && (
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-amber-200 space-y-4">
              <h3 className="text-base font-serif font-bold text-[#1C1E26] flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-600" />
                <span>नया विहार कार्यक्रम जोड़ें (Add Vihar Entry)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="तारीख (e.g. 05 मार्च 2025)"
                  value={newVihar.date}
                  onChange={(e) => setNewVihar({ ...newVihar, date: e.target.value })}
                  className="px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                />
                <input
                  type="text"
                  placeholder="कार्यक्रम शीर्षक (Title)"
                  value={newVihar.title}
                  onChange={(e) => setNewVihar({ ...newVihar, title: e.target.value })}
                  className="px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                />
                <input
                  type="text"
                  placeholder="स्थान (Location)"
                  value={newVihar.location}
                  onChange={(e) => setNewVihar({ ...newVihar, location: e.target.value })}
                  className="px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <input
                  type="text"
                  placeholder="विस्तृत जानकारी (Details)"
                  value={newVihar.details}
                  onChange={(e) => setNewVihar({ ...newVihar, details: e.target.value })}
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                />
                <button
                  onClick={handleAddVihar}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>जोड़ें</span>
                </button>
              </div>
            </div>

            {/* List of Vihar Schedules */}
            <div className="space-y-3">
              {data.viharSchedules.map((item) => (
                <div key={item.id} className="glass-card rounded-xl p-4 flex items-center justify-between gap-4 border border-amber-200">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      {item.date}
                    </span>
                    <h4 className="text-sm font-serif font-bold text-[#1C1E26]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600">
                      📍 {item.location} - {item.details}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteVihar(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PRAVACHAN MANAGER */}
        {activeTab === 'pravachan' && (
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-amber-200 space-y-4">
              <h3 className="text-base font-serif font-bold text-[#1C1E26] flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-600" />
                <span>नया प्रवचन/श्रुत समाधान जोड़ें</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="शीर्षक (Title)"
                  value={newPravachan.title}
                  onChange={(e) => setNewPravachan({ ...newPravachan, title: e.target.value })}
                  className="px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                />
                <select
                  value={newPravachan.category}
                  onChange={(e) => setNewPravachan({ ...newPravachan, category: e.target.value as any })}
                  className="px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                >
                  <option value="Pravachan">Pravachan</option>
                  <option value="Shrut Samadhan">Shrut Samadhan</option>
                  <option value="Audio Book">Audio Book</option>
                  <option value="Bhajan">Bhajan</option>
                </select>
                <input
                  type="text"
                  placeholder="YouTube Video ID (e.g. dQw4w9WgXcQ)"
                  value={newPravachan.youtubeId}
                  onChange={(e) => setNewPravachan({ ...newPravachan, youtubeId: e.target.value })}
                  className="px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                />
              </div>

              <textarea
                placeholder="विवरण (Description)"
                value={newPravachan.description}
                onChange={(e) => setNewPravachan({ ...newPravachan, description: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
              />

              <button
                onClick={handleAddPravachan}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>प्रवचन जोड़ें</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.pravachans.map((p) => (
                <div key={p.id} className="glass-card rounded-xl p-4 flex items-start justify-between gap-4 border border-amber-200">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                      {p.category}
                    </span>
                    <h4 className="text-sm font-serif font-bold text-[#1C1E26]">{p.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2">{p.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeletePravachan(p.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: JIVAN NEETI MANAGER */}
        {activeTab === 'neeti' && (
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-amber-200 space-y-4">
              <h3 className="text-base font-serif font-bold text-[#1C1E26] flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-600" />
                <span>नया जीवन नीति सूत्र जोड़ें</span>
              </h3>

              <textarea
                placeholder="जीवन सूत्र (हिंदी में)"
                value={newNeeti.quoteHindi}
                onChange={(e) => setNewNeeti({ ...newNeeti, quoteHindi: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
              />

              <input
                type="text"
                placeholder="English Translation (Optional)"
                value={newNeeti.quoteEnglish}
                onChange={(e) => setNewNeeti({ ...newNeeti, quoteEnglish: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
              />

              <button
                onClick={handleAddNeeti}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>सूत्र जोड़ें</span>
              </button>
            </div>

            <div className="space-y-3">
              {data.jivanNeetiQuotes.map((q) => (
                <div key={q.id} className="glass-card rounded-xl p-4 flex items-center justify-between gap-4 border border-amber-200">
                  <p className="text-sm font-serif font-bold text-[#1C1E26]">"{q.quoteHindi}"</p>
                  <button
                    onClick={() => handleDeleteNeeti(q.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GRANTH TREASURY MANAGER */}
        {activeTab === 'granth' && (
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-amber-200 space-y-4">
              <h3 className="text-base font-serif font-bold text-[#1C1E26] flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-600" />
                <span>नया ग्रंथ जोड़ें</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="ग्रंथ नाम (Hindi)"
                  value={newGranth.titleHindi}
                  onChange={(e) => setNewGranth({ ...newGranth, titleHindi: e.target.value })}
                  className="px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                />
                <input
                  type="text"
                  placeholder="English Title"
                  value={newGranth.titleEnglish}
                  onChange={(e) => setNewGranth({ ...newGranth, titleEnglish: e.target.value })}
                  className="px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                />
              </div>

              <textarea
                placeholder="विवरण (Description)"
                value={newGranth.description}
                onChange={(e) => setNewGranth({ ...newGranth, description: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
              />

              <button
                onClick={handleAddGranth}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>ग्रंथ जोड़ें</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.granthBooks.map((b) => (
                <div key={b.id} className="glass-card rounded-xl p-4 flex items-center justify-between gap-4 border border-amber-200">
                  <div>
                    <h4 className="text-sm font-serif font-bold text-[#1C1E26]">{b.titleHindi}</h4>
                    <p className="text-xs text-gray-500">{b.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteGranth(b.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
