'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ViharScheduleSection from '@/components/ViharScheduleSection';
import PravachanSection from '@/components/PravachanSection';
import JivanNeetiSection from '@/components/JivanNeetiSection';
import GranthSection from '@/components/GranthSection';
import UpdatesSection from '@/components/UpdatesSection';
import Footer from '@/components/Footer';
import { fetchSiteDataFromDb, getSiteData, SiteData } from '@/lib/store';

export default function Home() {
  const [data, setData] = useState<SiteData | null>(null);

  const loadData = async () => {
    // Initial quick load from local cache if present
    setData(getSiteData());
    // Hydrate directly from PostgreSQL Database backend API
    const dbData = await fetchSiteDataFromDb();
    if (dbData) {
      setData(dbData);
    }
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener('site_data_updated', handleUpdate);
    return () => window.removeEventListener('site_data_updated', handleUpdate);
  }, []);

  if (!data) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1">
        <HeroSection data={data} />
        <ViharScheduleSection 
          currentLocation={data.currentLocation} 
          currentStayDetails={data.currentStayDetails} 
          schedules={data.viharSchedules} 
        />
        <PravachanSection pravachans={data.pravachans} />
        <JivanNeetiSection quotes={data.jivanNeetiQuotes} />
        <GranthSection books={data.granthBooks} />
        <UpdatesSection blogs={data.blogs} podcasts={data.podcasts} />
      </main>

      <Footer />
    </div>
  );
}
