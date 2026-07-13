import { useState, useCallback, useRef, useEffect } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { FiDownload } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export default function CV() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState(700);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth - 48;
        setPageWidth(Math.min(w, 800));
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const onLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
          >
            <HiArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <a
            href="/cv.pdf"
            download
            className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:scale-105 active:scale-95 transition"
          >
            <FiDownload />
            Download CV
          </a>
        </div>

        <div ref={containerRef} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-8">
          <Document file="/cv.pdf" onLoadSuccess={onLoadSuccess}>
            {Array.from({ length: numPages || 0 }, (_, i) => (
              <div key={`page_${i + 1}`} className="flex justify-center mb-4 last:mb-0">
                <Page
                  pageNumber={i + 1}
                  width={pageWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            ))}
          </Document>
          {numPages === null && (
            <p className="text-center text-gray-500 py-12">Loading CV...</p>
          )}
        </div>
      </div>
    </div>
  );
}
