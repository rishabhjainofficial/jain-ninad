'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  SiteData, 
  ViharSchedule, 
  PravachanItem, 
  JivanNeetiQuote, 
  GranthBook,
  BlogUpdate,
  fetchSiteDataFromDb
} from '@/lib/store';
import { extractYouTubeId } from '@/lib/youtube';
import { 
  Plus, 
  Trash2, 
  Save, 
  MapPin, 
  Radio, 
  Sparkles, 
  BookOpen, 
  Newspaper, 
  CheckCircle,
  ArrowLeft,
  Lock,
  Mail,
  Key,
  LogOut,
  Upload,
  FileText,
  Loader2,
  Edit,
  Pencil,
  Calendar,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('admin@gmail.com');
  const [password, setPassword] = useState<string>('12345678');
  const [loginError, setLoginError] = useState<string>('');
  const [loginSubmitting, setLoginSubmitting] = useState<boolean>(false);

  // App data state
  const [data, setData] = useState<SiteData | null>(null);
  const [activeTab, setActiveTab] = useState<'vihar' | 'pravachan' | 'neeti' | 'granth' | 'blog'>('vihar');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
    titleHindi: '', titleEnglish: '', description: '', versesCount: '500 श्लोक', language: 'संस्कृत / हिंदी', pdfFilePath: ''
  });

  // New Blog item state
  const [newBlog, setNewBlog] = useState<Partial<BlogUpdate>>({
    title: '', category: 'Bihar Updates', snippet: '', content: '', author: 'प्रचार समिति', date: 'Feb 2025'
  });

  // Editing state for each tab
  const [editingVihar, setEditingVihar] = useState<ViharSchedule | null>(null);
  const [editingPravachan, setEditingPravachan] = useState<PravachanItem | null>(null);
  const [editingNeeti, setEditingNeeti] = useState<JivanNeetiQuote | null>(null);
  const [editingGranth, setEditingGranth] = useState<GranthBook | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogUpdate | null>(null);

  // Check existing token on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setAuthLoading(true);
    const token = localStorage.getItem('admin_jwt_token');
    try {
      const res = await fetch('/api/auth/me', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        setIsAuthenticated(true);
        loadSiteData();
      } else {
        setIsAuthenticated(false);
      }
    } catch (e) {
      setIsAuthenticated(false);
    } finally {
      setAuthLoading(false);
    }
  };

  const loadSiteData = async () => {
    const siteData = await fetchSiteDataFromDb();
    setData(siteData);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (!res.ok) {
        setLoginError(json.error || 'Login failed');
        setLoginSubmitting(false);
        return;
      }

      if (json.token) {
        localStorage.setItem('admin_jwt_token', json.token);
        setIsAuthenticated(true);
        loadSiteData();
      }
    } catch (err) {
      setLoginError('Server connection error');
    } finally {
      setLoginSubmitting(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('admin_jwt_token');
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error:', e);
    }
    setIsAuthenticated(false);
  };

  const triggerNotify = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
    // Notify front-end components
    window.dispatchEvent(new Event('site_data_updated'));
  };

  // General Header Update
  const handleUpdateGeneral = async (currentLocation: string, currentStayDetails: string, mahamantraText: string) => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentLocation, currentStayDetails, mahamantraText }),
      });
      if (res.ok) {
        if (data) {
          setData({ ...data, currentLocation, currentStayDetails, mahamantraText });
        }
        triggerNotify();
      }
    } catch (e) {
      console.error('Update general error:', e);
    } finally {
      setIsSaving(false);
    }
  };

  // Vihar Handlers
  const handleAddVihar = async () => {
    if (!newVihar.title || !newVihar.date) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/vihar-schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVihar),
      });
      if (res.ok) {
        await loadSiteData();
        setNewVihar({ date: '', title: '', location: '', details: '', isCurrent: false });
        triggerNotify();
      }
    } catch (e) {
      console.error('Add vihar error:', e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateVihar = async () => {
    if (!editingVihar || !editingVihar.id) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/vihar-schedules', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingVihar),
      });
      if (res.ok) {
        await loadSiteData();
        setEditingVihar(null);
        triggerNotify();
      }
    } catch (e) {
      console.error('Update vihar error:', e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteVihar = async (id: string) => {
    try {
      const res = await fetch(`/api/vihar-schedules?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        await loadSiteData();
        triggerNotify();
      }
    } catch (e) {
      console.error('Delete vihar error:', e);
    }
  };

  // Pravachan Handlers
  const handleAddPravachan = async () => {
    if (!newPravachan.title) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/pravachans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPravachan),
      });
      if (res.ok) {
        await loadSiteData();
        setNewPravachan({ title: '', category: 'Pravachan', description: '', youtubeId: 'dQw4w9WgXcQ', duration: '30:00', date: 'Feb 2025' });
        triggerNotify();
      }
    } catch (e) {
      console.error('Add pravachan error:', e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePravachan = async () => {
    if (!editingPravachan || !editingPravachan.id) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/pravachans', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPravachan),
      });
      if (res.ok) {
        await loadSiteData();
        setEditingPravachan(null);
        triggerNotify();
      }
    } catch (e) {
      console.error('Update pravachan error:', e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePravachan = async (id: string) => {
    try {
      const res = await fetch(`/api/pravachans?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        await loadSiteData();
        triggerNotify();
      }
    } catch (e) {
      console.error('Delete pravachan error:', e);
    }
  };

  // Jivan Neeti Handlers
  const handleAddNeeti = async () => {
    if (!newNeeti.quoteHindi) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNeeti),
      });
      if (res.ok) {
        await loadSiteData();
        setNewNeeti({ quoteHindi: '', quoteEnglish: '', category: 'आत्मानुशासन', likes: 100 });
        triggerNotify();
      }
    } catch (e) {
      console.error('Add neeti error:', e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateNeeti = async () => {
    if (!editingNeeti || !editingNeeti.id) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/quotes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingNeeti),
      });
      if (res.ok) {
        await loadSiteData();
        setEditingNeeti(null);
        triggerNotify();
      }
    } catch (e) {
      console.error('Update neeti error:', e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteNeeti = async (id: string) => {
    try {
      const res = await fetch(`/api/quotes?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        await loadSiteData();
        triggerNotify();
      }
    } catch (e) {
      console.error('Delete neeti error:', e);
    }
  };

  // PDF File Upload Handler for Granth
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEditMode = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPdf(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (res.ok && json.filePath) {
        if (isEditMode && editingGranth) {
          setEditingGranth(prev => prev ? { ...prev, pdfFilePath: json.filePath } : null);
        } else {
          setNewGranth(prev => ({ ...prev, pdfFilePath: json.filePath }));
        }
      } else {
        alert(json.error || 'PDF Upload failed');
      }
    } catch (err) {
      console.error('PDF Upload Error:', err);
      alert('Error uploading PDF file');
    } finally {
      setUploadingPdf(false);
    }
  };

  // Granth Handlers
  const handleAddGranth = async () => {
    if (!newGranth.titleHindi) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/granths', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGranth),
      });
      if (res.ok) {
        await loadSiteData();
        setNewGranth({ titleHindi: '', titleEnglish: '', description: '', versesCount: '500 श्लोक', language: 'संस्कृत / हिंदी', pdfFilePath: '' });
        triggerNotify();
      }
    } catch (e) {
      console.error('Add granth error:', e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateGranth = async () => {
    if (!editingGranth || !editingGranth.id) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/granths', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingGranth),
      });
      if (res.ok) {
        await loadSiteData();
        setEditingGranth(null);
        triggerNotify();
      }
    } catch (e) {
      console.error('Update granth error:', e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteGranth = async (id: string) => {
    try {
      const res = await fetch(`/api/granths?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        await loadSiteData();
        triggerNotify();
      }
    } catch (e) {
      console.error('Delete granth error:', e);
    }
  };

  // Blog Handlers
  const handleAddBlog = async () => {
    if (!newBlog.title) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      });
      if (res.ok) {
        await loadSiteData();
        setNewBlog({ title: '', category: 'Bihar Updates', snippet: '', content: '', author: 'प्रचार समिति', date: 'Feb 2025' });
        triggerNotify();
      }
    } catch (e) {
      console.error('Add blog error:', e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateBlog = async () => {
    if (!editingBlog || !editingBlog.id) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/blogs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBlog),
      });
      if (res.ok) {
        await loadSiteData();
        setEditingBlog(null);
        triggerNotify();
      }
    } catch (e) {
      console.error('Update blog error:', e);
    } finally {
      setIsSaving(false);
    }
  };
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      });
      if (res.ok) {
        await loadSiteData();
        setNewBlog({ title: '', category: 'Bihar Updates', snippet: '', content: '', author: 'प्रचार समिति', date: 'Feb 2025' });
        triggerNotify();
      }
    } catch (e) {
      console.error('Add blog error:', e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        await loadSiteData();
        triggerNotify();
      }
    } catch (e) {
      console.error('Delete blog error:', e);
    }
  };

  // 1. Auth Loading State
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-amber-700 animate-spin" />
          <span className="text-sm font-medium text-amber-900">प्रमाणीकरण की जाँच की जा रही है...</span>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl border border-amber-200/80 shadow-xl p-8 space-y-6">
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-amber-100 border border-amber-300/60 flex items-center justify-center mx-auto text-amber-800">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#1C1E26]">
                प्रशासन लॉगिन (Admin Login)
              </h2>
              <p className="text-xs text-gray-500">
                जैन निनाद पोर्टल के प्रबंधन हेतु सुरक्षित प्रवेश
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 text-center font-medium">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">ईमेल (Email Address)</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@gmail.com"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-amber-200 focus:outline-hidden focus:border-amber-500 bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 block">पासवर्ड (Password)</label>
                <div className="relative">
                  <Key className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-amber-200 focus:outline-hidden focus:border-amber-500 bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loginSubmitting}
                className="w-full py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-medium text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loginSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>लॉगिन हो रहा है...</span>
                  </>
                ) : (
                  <span>सुरक्षित लॉगिन करें</span>
                )}
              </button>
            </form>

            <div className="text-center pt-2 border-t border-gray-100">
              <Link href="/" className="text-xs text-amber-800 hover:underline inline-flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>मुख्य वेबसाइट पर लौटें</span>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // 3. Authenticated Admin Dashboard
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <Loader2 className="w-8 h-8 text-amber-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Top Header Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-amber-200/80 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <Link href="/" className="p-1 rounded-lg hover:bg-amber-50 text-amber-800">
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <h1 className="text-2xl font-serif font-bold text-[#1C1E26]">
                प्रशासनिक डैशबोर्ड (Admin Panel)
              </h1>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              वेबसाइट की सामग्री, विहार शेड्यूल एवं ग्रंथ भंडार का प्रबंधन करें
            </p>
          </div>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full animate-bounce">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>सफलतापूर्वक सहेजा गया!</span>
              </div>
            )}
            
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>लॉगआउट (Logout)</span>
            </button>
          </div>
        </div>

        {/* Global Banner Settings */}
        <div className="glass-card rounded-2xl p-6 border border-amber-200/80 space-y-4">
          <h2 className="text-base font-serif font-bold text-[#1C1E26] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-600" />
            <span>वर्तमान स्थान एवं संदेश (Live Announcement Header)</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">वर्तमान प्रवास स्थान (Location)</label>
              <input
                type="text"
                defaultValue={data.currentLocation}
                onBlur={(e) => handleUpdateGeneral(e.target.value, data.currentStayDetails, data.mahamantraText)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">मंत्र / घोषणा (Mahamantra Banner)</label>
              <input
                type="text"
                defaultValue={data.mahamantraText}
                onBlur={(e) => handleUpdateGeneral(data.currentLocation, data.currentStayDetails, e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">चातुर्मास / चर्या विवरण (Stay Details)</label>
            <textarea
              defaultValue={data.currentStayDetails}
              onBlur={(e) => handleUpdateGeneral(data.currentLocation, e.target.value, data.mahamantraText)}
              rows={2}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-amber-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('vihar')}
            className={`px-4 py-2 text-xs font-medium rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'vihar' ? 'bg-amber-800 text-white shadow-xs' : 'bg-white hover:bg-amber-50 text-gray-700 border border-amber-200/60'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>विहार शेड्यूल</span>
          </button>

          <button
            onClick={() => setActiveTab('granth')}
            className={`px-4 py-2 text-xs font-medium rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'granth' ? 'bg-amber-800 text-white shadow-xs' : 'bg-white hover:bg-amber-50 text-gray-700 border border-amber-200/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>ग्रंथ साहित्य (PDF Upload)</span>
          </button>

          <button
            onClick={() => setActiveTab('pravachan')}
            className={`px-4 py-2 text-xs font-medium rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'pravachan' ? 'bg-amber-800 text-white shadow-xs' : 'bg-white hover:bg-amber-50 text-gray-700 border border-amber-200/60'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>प्रवचन एवं ऑडियो ग्रंथ</span>
          </button>

          <button
            onClick={() => setActiveTab('neeti')}
            className={`px-4 py-2 text-xs font-medium rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'neeti' ? 'bg-amber-800 text-white shadow-xs' : 'bg-white hover:bg-amber-50 text-gray-700 border border-amber-200/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>जीवन नीति सूत्र</span>
          </button>

          <button
            onClick={() => setActiveTab('blog')}
            className={`px-4 py-2 text-xs font-medium rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'blog' ? 'bg-amber-800 text-white shadow-xs' : 'bg-white hover:bg-amber-50 text-gray-700 border border-amber-200/60'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>समाचार एवं ब्लॉग</span>
          </button>
        </div>

        {/* TAB 1: VIHAR SCHEDULE MANAGER */}
        {activeTab === 'vihar' && (
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-amber-200 space-y-4">
              <h3 className="text-base font-serif font-bold text-[#1C1E26] flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-600" />
                <span>नया विहार कार्यक्रम जोड़ें</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-semibold text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-600" />
                    <span>तिथि (Date)</span>
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      type="date"
                      className="px-2 py-1.5 text-xs rounded-xl bg-white border border-amber-200"
                      onChange={(e) => {
                        if (e.target.value) {
                          const parts = e.target.value.split('-');
                          if (parts.length === 3) {
                            const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
                            const formatted = d.toLocaleDateString('hi-IN', { day: '2-digit', month: 'long', year: 'numeric' });
                            setNewVihar({ ...newVihar, date: formatted });
                          }
                        }
                      }}
                    />
                    <input
                      type="text"
                      placeholder="e.g. 05 मार्च 2025"
                      value={newVihar.date}
                      onChange={(e) => setNewVihar({ ...newVihar, date: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-end">
                  <input
                    type="text"
                    placeholder="कार्यक्रम का नाम (Title)"
                    value={newVihar.title}
                    onChange={(e) => setNewVihar({ ...newVihar, title: e.target.value })}
                    className="px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <input
                    type="text"
                    placeholder="स्थान (Location)"
                    value={newVihar.location}
                    onChange={(e) => setNewVihar({ ...newVihar, location: e.target.value })}
                    className="px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                  />
                </div>
              </div>

              <textarea
                placeholder="कार्यक्रम का विवरण (Details)"
                value={newVihar.details}
                onChange={(e) => setNewVihar({ ...newVihar, details: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
              />

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs text-gray-700">
                  <input
                    type="checkbox"
                    checked={!!newVihar.isCurrent}
                    onChange={(e) => setNewVihar({ ...newVihar, isCurrent: e.target.checked })}
                    className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span>वर्तमान मुख्य कार्यक्रम (Highlight Flag)</span>
                </label>

                <button
                  onClick={handleAddVihar}
                  disabled={isSaving}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white font-medium text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  <span>{isSaving ? 'सहेजा जा रहा है...' : 'कार्यक्रम जोड़ें'}</span>
                </button>
              </div>
            </div>

            {/* Edit Vihar Modal */}
            {editingVihar && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="glass-card bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 border border-amber-300 shadow-2xl relative">
                  <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                    <h3 className="font-serif font-bold text-base text-[#1C1E26] flex items-center gap-2">
                      <Pencil className="w-4 h-4 text-amber-600" />
                      <span>विहार कार्यक्रम अपडेट करें</span>
                    </h3>
                    <button onClick={() => setEditingVihar(null)} className="p-1 rounded-full text-gray-500 hover:bg-amber-100">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">तिथि (Date)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="date"
                          className="px-2 py-1.5 text-xs rounded-xl bg-white border border-amber-200"
                          onChange={(e) => {
                            if (e.target.value) {
                              const parts = e.target.value.split('-');
                              if (parts.length === 3) {
                                const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
                                const formatted = d.toLocaleDateString('hi-IN', { day: '2-digit', month: 'long', year: 'numeric' });
                                setEditingVihar({ ...editingVihar, date: formatted });
                              }
                            }
                          }}
                        />
                        <input
                          type="text"
                          value={editingVihar.date}
                          onChange={(e) => setEditingVihar({ ...editingVihar, date: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">शीर्षक (Title)</label>
                      <input
                        type="text"
                        value={editingVihar.title}
                        onChange={(e) => setEditingVihar({ ...editingVihar, title: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">स्थान (Location)</label>
                      <input
                        type="text"
                        value={editingVihar.location}
                        onChange={(e) => setEditingVihar({ ...editingVihar, location: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">विवरण (Details)</label>
                      <textarea
                        value={editingVihar.details}
                        onChange={(e) => setEditingVihar({ ...editingVihar, details: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                      />
                    </div>

                    <label className="flex items-center gap-2 text-xs text-gray-700 pt-1">
                      <input
                        type="checkbox"
                        checked={!!editingVihar.isCurrent}
                        onChange={(e) => setEditingVihar({ ...editingVihar, isCurrent: e.target.checked })}
                        className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span>वर्तमान मुख्य कार्यक्रम (Highlight Flag)</span>
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-amber-100">
                    <button
                      onClick={() => setEditingVihar(null)}
                      className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-medium"
                    >
                      रद्द करें
                    </button>
                    <button
                      onClick={handleUpdateVihar}
                      disabled={isSaving}
                      className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5"
                    >
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>अपडेट करें</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* List */}
            <div className="space-y-3">
              {data.viharSchedules.map((item) => (
                <div key={item.id} className="glass-card rounded-xl p-4 flex items-center justify-between gap-4 border border-amber-200">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-800">{item.date}</span>
                      {item.isCurrent && (
                        <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-semibold">
                          वर्तमान
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-serif font-bold text-[#1C1E26]">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.location} - {item.details}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingVihar(item)}
                      className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
                      title="संपादित करें (Edit)"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteVihar(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="हटाएं (Delete)"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: GRANTH TREASURY MANAGER (WITH PDF UPLOAD) */}
        {activeTab === 'granth' && (
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-amber-200 space-y-4">
              <h3 className="text-base font-serif font-bold text-[#1C1E26] flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-600" />
                <span>नया ग्रंथ जोड़ें एवं PDF फाइल अपलोड करें</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="ग्रंथ नाम (Hindi Title)"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="श्लोक संख्या (e.g. 500 श्लोक)"
                  value={newGranth.versesCount}
                  onChange={(e) => setNewGranth({ ...newGranth, versesCount: e.target.value })}
                  className="px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                />
                <input
                  type="text"
                  placeholder="भाषा (Language, e.g. संस्कृत / हिंदी)"
                  value={newGranth.language}
                  onChange={(e) => setNewGranth({ ...newGranth, language: e.target.value })}
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

              {/* PDF File Upload Input */}
              <div className="p-4 rounded-xl border border-dashed border-amber-300 bg-amber-50/50 space-y-2">
                <label className="text-xs font-semibold text-amber-900 flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-amber-700" />
                  <span>PDF फाइल अपलोड करें (PDF File Upload)</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    className="text-xs text-gray-600 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-700 file:text-white hover:file:bg-amber-800 cursor-pointer"
                  />
                  {uploadingPdf && (
                    <span className="text-xs text-amber-800 flex items-center gap-1">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>अपलोड जारी है...</span>
                    </span>
                  )}
                </div>
                {newGranth.pdfFilePath && (
                  <div className="text-xs text-emerald-700 font-medium flex items-center gap-1 pt-1">
                    <FileText className="w-4 h-4" />
                    <span>अपलोड फाइल: {newGranth.pdfFilePath}</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleAddGranth}
                disabled={uploadingPdf || isSaving}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white font-medium text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                <span>{isSaving ? 'सहेजा जा रहा है...' : 'ग्रंथ जोड़ें'}</span>
              </button>
            </div>

            {/* Edit Granth Modal */}
            {editingGranth && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="glass-card bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 border border-amber-300 shadow-2xl relative">
                  <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                    <h3 className="font-serif font-bold text-base text-[#1C1E26] flex items-center gap-2">
                      <Pencil className="w-4 h-4 text-amber-600" />
                      <span>ग्रंथ साहित्य अपडेट करें</span>
                    </h3>
                    <button onClick={() => setEditingGranth(null)} className="p-1 rounded-full text-gray-500 hover:bg-amber-100">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">ग्रंथ नाम (Hindi Title)</label>
                      <input
                        type="text"
                        value={editingGranth.titleHindi}
                        onChange={(e) => setEditingGranth({ ...editingGranth, titleHindi: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">English Title</label>
                      <input
                        type="text"
                        value={editingGranth.titleEnglish}
                        onChange={(e) => setEditingGranth({ ...editingGranth, titleEnglish: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-semibold text-gray-700 block mb-1">श्लोक संख्या (Verses Count)</label>
                        <input
                          type="text"
                          value={editingGranth.versesCount}
                          onChange={(e) => setEditingGranth({ ...editingGranth, versesCount: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-gray-700 block mb-1">भाषा (Language)</label>
                        <input
                          type="text"
                          value={editingGranth.language}
                          onChange={(e) => setEditingGranth({ ...editingGranth, language: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">विवरण (Description)</label>
                      <textarea
                        value={editingGranth.description}
                        onChange={(e) => setEditingGranth({ ...editingGranth, description: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                      />
                    </div>

                    <div className="p-3 rounded-xl border border-dashed border-amber-300 bg-amber-50/50 space-y-2">
                      <label className="text-xs font-semibold text-amber-900 flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-amber-700" />
                        <span>नई PDF फाइल बदलें</span>
                      </label>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handleFileUpload(e, true)}
                        className="text-xs text-gray-600 file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-700 file:text-white"
                      />
                      {editingGranth.pdfFilePath && (
                        <p className="text-[11px] font-mono text-emerald-700 truncate">वर्तमान: {editingGranth.pdfFilePath}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-amber-100">
                    <button
                      onClick={() => setEditingGranth(null)}
                      className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-medium"
                    >
                      रद्द करें
                    </button>
                    <button
                      onClick={handleUpdateGranth}
                      disabled={isSaving || uploadingPdf}
                      className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5"
                    >
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>अपडेट करें</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.granthBooks.map((b) => (
                <div key={b.id} className="glass-card rounded-xl p-4 flex items-center justify-between gap-4 border border-amber-200">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-serif font-bold text-[#1C1E26]">{b.titleHindi}</h4>
                      {b.pdfFilePath && (
                        <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold flex items-center gap-0.5">
                          <FileText className="w-3 h-3" /> PDF
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{b.description}</p>
                    {b.pdfFilePath && (
                      <p className="text-[11px] font-mono text-gray-400 truncate">{b.pdfFilePath}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingGranth(b)}
                      className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
                      title="संपादित करें (Edit)"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteGranth(b.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="हटाएं (Delete)"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRAVACHAN MANAGER */}
        {activeTab === 'pravachan' && (
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-amber-200 space-y-4">
              <h3 className="text-base font-serif font-bold text-[#1C1E26] flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-600" />
                <span>नया प्रवचन जोड़ें</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="flex flex-col gap-1 md:col-span-1">
                  <label className="text-[10px] font-semibold text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-600" />
                    <span>तिथि (Date)</span>
                  </label>
                  <input
                    type="date"
                    className="px-2 py-1.5 text-xs rounded-xl bg-white border border-amber-200"
                    onChange={(e) => {
                      if (e.target.value) {
                        const parts = e.target.value.split('-');
                        if (parts.length === 3) {
                          const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
                          const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                          setNewPravachan({ ...newPravachan, date: formatted });
                        }
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col justify-end md:col-span-1">
                  <input
                    type="text"
                    placeholder="शीर्षक (Title)"
                    value={newPravachan.title}
                    onChange={(e) => setNewPravachan({ ...newPravachan, title: e.target.value })}
                    className="px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                  />
                </div>
                <div className="flex flex-col justify-end md:col-span-1">
                  <select
                    value={newPravachan.category}
                    onChange={(e) => setNewPravachan({ ...newPravachan, category: e.target.value as any })}
                    className="px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                  >
                    <option value="Pravachan">Pravachan</option>
                    <option value="Audio Book">Audio Book</option>
                    <option value="Bhajan">Bhajan</option>
                  </select>
                </div>
                <div className="flex flex-col justify-end md:col-span-1">
                  <input
                    type="text"
                    placeholder="YouTube Video ID or Full URL"
                    value={newPravachan.youtubeId}
                    onChange={(e) => {
                      const val = e.target.value;
                      const extracted = extractYouTubeId(val);
                      setNewPravachan({ ...newPravachan, youtubeId: extracted || val });
                    }}
                    className="px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                  />
                </div>
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
                disabled={isSaving}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white font-medium text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                <span>{isSaving ? 'सहेजा जा रहा है...' : 'प्रवचन जोड़ें'}</span>
              </button>
            </div>

            {/* Edit Pravachan Modal */}
            {editingPravachan && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="glass-card bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 border border-amber-300 shadow-2xl relative">
                  <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                    <h3 className="font-serif font-bold text-base text-[#1C1E26] flex items-center gap-2">
                      <Pencil className="w-4 h-4 text-amber-600" />
                      <span>प्रवचन अपडेट करें</span>
                    </h3>
                    <button onClick={() => setEditingPravachan(null)} className="p-1 rounded-full text-gray-500 hover:bg-amber-100">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">तिथि (Date)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="date"
                          className="px-2 py-1.5 text-xs rounded-xl bg-white border border-amber-200"
                          onChange={(e) => {
                            if (e.target.value) {
                              const parts = e.target.value.split('-');
                              if (parts.length === 3) {
                                const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
                                const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                                setEditingPravachan({ ...editingPravachan, date: formatted });
                              }
                            }
                          }}
                        />
                        <input
                          type="text"
                          value={editingPravachan.date}
                          onChange={(e) => setEditingPravachan({ ...editingPravachan, date: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">शीर्षक (Title)</label>
                      <input
                        type="text"
                        value={editingPravachan.title}
                        onChange={(e) => setEditingPravachan({ ...editingPravachan, title: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">श्रेणी (Category)</label>
                      <select
                        value={editingPravachan.category}
                        onChange={(e) => setEditingPravachan({ ...editingPravachan, category: e.target.value as any })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                      >
                        <option value="Pravachan">Pravachan</option>
                        <option value="Audio Book">Audio Book</option>
                        <option value="Bhajan">Bhajan</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">YouTube Video ID / URL</label>
                      <input
                        type="text"
                        value={editingPravachan.youtubeId || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          const extracted = extractYouTubeId(val);
                          setEditingPravachan({ ...editingPravachan, youtubeId: extracted || val });
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">विवरण (Description)</label>
                      <textarea
                        value={editingPravachan.description}
                        onChange={(e) => setEditingPravachan({ ...editingPravachan, description: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-amber-100">
                    <button
                      onClick={() => setEditingPravachan(null)}
                      className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-medium"
                    >
                      रद्द करें
                    </button>
                    <button
                      onClick={handleUpdatePravachan}
                      disabled={isSaving}
                      className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5"
                    >
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>अपडेट करें</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.pravachans.map((p) => (
                <div key={p.id} className="glass-card rounded-xl p-4 flex items-start justify-between gap-4 border border-amber-200">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                        {p.category}
                      </span>
                      {p.date && <span className="text-xs text-gray-400 font-sans">{p.date}</span>}
                    </div>
                    <h4 className="text-sm font-serif font-bold text-[#1C1E26]">{p.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2">{p.description}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingPravachan(p)}
                      className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
                      title="संपादित करें (Edit)"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePravachan(p.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="हटाएं (Delete)"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: JIVAN NEETI MANAGER */}
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
                disabled={isSaving}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white font-medium text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                <span>{isSaving ? 'सहेजा जा रहा है...' : 'सूत्र जोड़ें'}</span>
              </button>
            </div>

            {/* Edit Neeti Modal */}
            {editingNeeti && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="glass-card bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 border border-amber-300 shadow-2xl relative">
                  <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                    <h3 className="font-serif font-bold text-base text-[#1C1E26] flex items-center gap-2">
                      <Pencil className="w-4 h-4 text-amber-600" />
                      <span>जीवन नीति सूत्र अपडेट करें</span>
                    </h3>
                    <button onClick={() => setEditingNeeti(null)} className="p-1 rounded-full text-gray-500 hover:bg-amber-100">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">सूत्र (Hindi Quote)</label>
                      <textarea
                        value={editingNeeti.quoteHindi}
                        onChange={(e) => setEditingNeeti({ ...editingNeeti, quoteHindi: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">English Translation</label>
                      <input
                        type="text"
                        value={editingNeeti.quoteEnglish || ''}
                        onChange={(e) => setEditingNeeti({ ...editingNeeti, quoteEnglish: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-amber-100">
                    <button
                      onClick={() => setEditingNeeti(null)}
                      className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-medium"
                    >
                      रद्द करें
                    </button>
                    <button
                      onClick={handleUpdateNeeti}
                      disabled={isSaving}
                      className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5"
                    >
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>अपडेट करें</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {data.jivanNeetiQuotes.map((q) => (
                <div key={q.id} className="glass-card rounded-xl p-4 flex items-center justify-between gap-4 border border-amber-200">
                  <p className="text-sm font-serif font-bold text-[#1C1E26]">"{q.quoteHindi}"</p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingNeeti(q)}
                      className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
                      title="संपादित करें (Edit)"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteNeeti(q.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="हटाएं (Delete)"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: BLOG MANAGER */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-amber-200 space-y-4">
              <h3 className="text-base font-serif font-bold text-[#1C1E26] flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-600" />
                <span>नया ब्लॉग/समाचार पोस्ट जोड़ें</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-semibold text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-600" />
                    <span>तिथि (Date)</span>
                  </label>
                  <input
                    type="date"
                    className="px-2 py-1.5 text-xs rounded-xl bg-white border border-amber-200"
                    onChange={(e) => {
                      if (e.target.value) {
                        const parts = e.target.value.split('-');
                        if (parts.length === 3) {
                          const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
                          const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                          setNewBlog({ ...newBlog, date: formatted });
                        }
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <input
                    type="text"
                    placeholder="शीर्षक (Title)"
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                    className="px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <select
                    value={newBlog.category}
                    onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value as any })}
                    className="px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                  >
                    <option value="Bihar Updates">Bihar Updates</option>
                    <option value="Program Updates">Program Updates</option>
                    <option value="Blog">Blog</option>
                  </select>
                </div>
              </div>

              <textarea
                placeholder="संक्षिप्त विवरण (Snippet)"
                value={newBlog.snippet}
                onChange={(e) => setNewBlog({ ...newBlog, snippet: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
              />

              <textarea
                placeholder="पूरा समाचार (Content)"
                value={newBlog.content}
                onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
              />

              <button
                onClick={handleAddBlog}
                disabled={isSaving}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white font-medium text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                <span>{isSaving ? 'सहेजा जा रहा है...' : 'ब्लॉग प्रकाशित करें'}</span>
              </button>
            </div>

            {/* Edit Blog Modal */}
            {editingBlog && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="glass-card bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 border border-amber-300 shadow-2xl relative">
                  <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                    <h3 className="font-serif font-bold text-base text-[#1C1E26] flex items-center gap-2">
                      <Pencil className="w-4 h-4 text-amber-600" />
                      <span>समाचार / ब्लॉग अपडेट करें</span>
                    </h3>
                    <button onClick={() => setEditingBlog(null)} className="p-1 rounded-full text-gray-500 hover:bg-amber-100">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">तिथि (Date)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="date"
                          className="px-2 py-1.5 text-xs rounded-xl bg-white border border-amber-200"
                          onChange={(e) => {
                            if (e.target.value) {
                              const parts = e.target.value.split('-');
                              if (parts.length === 3) {
                                const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
                                const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                                setEditingBlog({ ...editingBlog, date: formatted });
                              }
                            }
                          }}
                        />
                        <input
                          type="text"
                          value={editingBlog.date}
                          onChange={(e) => setEditingBlog({ ...editingBlog, date: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">शीर्षक (Title)</label>
                      <input
                        type="text"
                        value={editingBlog.title}
                        onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">श्रेणी (Category)</label>
                      <select
                        value={editingBlog.category}
                        onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value as any })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                      >
                        <option value="Bihar Updates">Bihar Updates</option>
                        <option value="Program Updates">Program Updates</option>
                        <option value="Blog">Blog</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">संक्षिप्त विवरण (Snippet)</label>
                      <textarea
                        value={editingBlog.snippet}
                        onChange={(e) => setEditingBlog({ ...editingBlog, snippet: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">पूरा समाचार (Content)</label>
                      <textarea
                        value={editingBlog.content}
                        onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                        rows={4}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-amber-200"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-amber-100">
                    <button
                      onClick={() => setEditingBlog(null)}
                      className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-medium"
                    >
                      रद्द करें
                    </button>
                    <button
                      onClick={handleUpdateBlog}
                      disabled={isSaving}
                      className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5"
                    >
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>अपडेट करें</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.blogs.map((b) => (
                <div key={b.id} className="glass-card rounded-xl p-4 flex items-start justify-between gap-4 border border-amber-200">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                        {b.category}
                      </span>
                      {b.date && <span className="text-xs text-gray-400 font-sans">{b.date}</span>}
                    </div>
                    <h4 className="text-sm font-serif font-bold text-[#1C1E26]">{b.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2">{b.snippet}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingBlog(b)}
                      className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
                      title="संपादित करें (Edit)"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(b.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="हटाएं (Delete)"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
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
