'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FileText, BookOpen } from 'lucide-react';

interface PdfThumbnailProps {
  pdfUrl: string;
  titleHindi?: string;
  titleEnglish?: string;
  versesCount?: string;
  language?: string;
  className?: string;
}

export default function PdfThumbnail({
  pdfUrl,
  titleHindi,
  titleEnglish,
  versesCount,
  language,
  className = '',
}: PdfThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [renderSuccess, setRenderSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadPdfFirstPage() {
      if (!pdfUrl || !canvasRef.current) return;
      try {
        setLoading(true);
        // Dynamically import pdfjs-dist on client side
        const pdfjs = await import('pdfjs-dist');
        // Set workerSrc to unpkg CDN for pdf.worker
        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

        const loadingTask = pdfjs.getDocument({ url: pdfUrl });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        if (!isMounted || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!context) return;

        const viewport = page.getViewport({ scale: 0.8 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          canvas: canvas,
        };

        // @ts-ignore - render parameter typing compatibility across pdfjs versions
        await page.render(renderContext).promise;
        if (isMounted) {
          setRenderSuccess(true);
          setLoading(false);
        }
      } catch (err) {
        console.warn('PDF thumbnail render note:', err);
        if (isMounted) {
          setRenderSuccess(false);
          setLoading(false);
        }
      }
    }

    loadPdfFirstPage();

    return () => {
      isMounted = false;
    };
  }, [pdfUrl]);

  return (
    <div className={`relative h-48 bg-gradient-to-tr from-amber-900 via-amber-800 to-amber-950 p-4 flex flex-col justify-end text-white overflow-hidden ${className}`}>
      {/* Top right badges */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
        <span className="bg-red-600/90 text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-xs border border-red-400/40">
          <FileText className="w-3 h-3" />
          PDF
        </span>
        {language && (
          <span className="bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] font-medium border border-white/20">
            {language}
          </span>
        )}
      </div>

      {/* Render Canvas for Page 1 of PDF */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-90 hover:opacity-100 transition-opacity">
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-cover ${renderSuccess ? 'block' : 'hidden'}`}
        />
      </div>

      {/* Overlay Gradient for Text Readability if Canvas Rendered */}
      {renderSuccess && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-1" />
      )}

      {/* Fallback / Decorative Cover content when PDF canvas rendering is loading or fallback */}
      {(!renderSuccess || loading) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-tr from-amber-950 via-amber-900 to-amber-800">
          <BookOpen className="w-8 h-8 text-amber-300/80 mb-1 animate-pulse" />
          <span className="text-[11px] text-amber-200/90 font-mono tracking-wider uppercase">
            {loading ? 'PDF लोड हो रहा है...' : 'PDF ग्रंथ'}
          </span>
        </div>
      )}

      {/* Text Info */}
      <div className="relative z-2 space-y-1">
        {versesCount && (
          <span className="text-[10px] uppercase tracking-wider text-amber-300 font-semibold bg-black/40 px-2 py-0.5 rounded-md inline-block">
            {versesCount}
          </span>
        )}
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-100 drop-shadow-md line-clamp-1">
          {titleHindi}
        </h3>
        {titleEnglish && (
          <p className="text-xs text-amber-200/90 italic font-sans drop-shadow-sm line-clamp-1">
            {titleEnglish}
          </p>
        )}
      </div>
    </div>
  );
}
