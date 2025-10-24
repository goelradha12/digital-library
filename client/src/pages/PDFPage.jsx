// NotebookViewer.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Maximize,
  Minus,
  Plus,
  Home,
  Info,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { useBookStore } from '../stores/book.Stores';
import BookDetailCard from '../components/bookDetailCard';
import { useAuthStore } from '../stores/auth.Stores';
import { useDownloadsStore } from '../stores/download.Stores';

import { debounce } from 'lodash';
// ✅ Worker setup (must be at top level, before any React code runs)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

// ✅ Optional fallback for certain Vite configs:
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const CHUNK_SIZE = 10;

// 🛡️ Simple error boundary wrapper (prevents crashing if PDF fails)
function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);
  return error ? (
    <div className="p-6 text-center text-red-600">
      Something went wrong loading this PDF. Please refresh.
    </div>
  ) : (
    <React.Suspense fallback={<div>Loading PDF...</div>}>
      <div
        onError={(e) => {
          console.error(e);
          setError(true);
        }}
      >
        {children}
      </div>
    </React.Suspense>
  );
}

export default function NotebookViewer() {
  const bookId = useParams().bookid;
  const [bookTitle, setBookTitle] = useState('Book Title');
  const [fileUrl, setFileUrl] = useState(null);
  const [chunkRange, setChunkRange] = useState({ start: 1, end: CHUNK_SIZE });
  const [numPagesInChunk, setNumPagesInChunk] = useState(0);
  const [globalPageNumber, setGlobalPageNumber] = useState(1);
  const [totalBookPages, setTotalBookPages] = useState(null);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [isBookDetailDisplayed, setIsBookDetailDisplayed] = useState(false);
  const { book, fetchABook, isLoadingBook } = useBookStore();
  const navigate = useNavigate();
  const { User } = useAuthStore();
  const { updateReadingProgress } = useDownloadsStore();

  const debouncedUpdateProgress = useCallback(
    debounce((data) => updateReadingProgress(data), 1000),
    []
  );

  if (!User) {
    alert('Login before accessing the page');
    navigate('/login');
  }
  // fetch book details using bookId
  useEffect(() => {
    fetchABook(bookId);
    if (book) {
      setBookTitle(book.Title);
    }
  }, [bookId]);

  // 🔹 Fetch PDF chunk securely
  const fetchPdfChunk = useCallback(async () => {
    setLoading(true);

    const res = await fetch(
      `http://localhost:5000/pdf/${bookId}/pages?start=${chunkRange.start}&end=${chunkRange.end}`
    );

    if (res.status === 204) {
      setLoading(false);
      return;
    }

    const total = res.headers.get('X-Total-Pages');
    if (total) setTotalBookPages(Number(total));

    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);

    setFileUrl((old) => {
      if (old) URL.revokeObjectURL(old);
      return blobUrl;
    });

    setLoading(false);
  }, [chunkRange, bookId]);

  // 🔸 Fetch new chunk whenever range changes
  useEffect(() => {
    fetchPdfChunk();
  }, [fetchPdfChunk]);

  // 📄 Prevent rendering before fileUrl ready
  const canRender = Boolean(fileUrl && !loading);

  // 📚 Navigation logic
  const handlePageChange = (dir) => {
    if (!totalBookPages) return;

    const forward = dir === 'next';
    let nextPage = globalPageNumber + (forward ? 1 : -1);

    if (nextPage < 1 || nextPage > totalBookPages) return;

    const chunkEnd = chunkRange.start + numPagesInChunk - 1;
    const chunkStart = chunkRange.start;

    // load next chunk
    if (forward && nextPage > chunkEnd) {
      setChunkRange({
        start: chunkRange.end + 1,
        end: Math.min(chunkRange.end + CHUNK_SIZE, totalBookPages),
      });
    }
    // load previous chunk
    else if (!forward && nextPage < chunkStart) {
      setChunkRange({
        start: Math.max(1, chunkRange.start - CHUNK_SIZE),
        end: chunkRange.start - 1,
      });
    }

    setGlobalPageNumber(nextPage);

    // Update backend progress
    if (User?.User_ID && bookId && totalBookPages) {
      debouncedUpdateProgress({
        userId: User.User_ID,
        bookId,
        pageNumber: nextPage,
        totalPages: totalBookPages,
      });
    }
  };

  const pageInChunk = globalPageNumber - chunkRange.start + 1;
  const progress = totalBookPages ? (globalPageNumber / totalBookPages) * 100 : 0;

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      {/* 🧭 Navigation Bar */}
      <div className="flex items-center justify-between px-6 py-3 absolute right-0 shadow-md">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:text-[#F0E8E8]"
          >
            <Home size={16} /> <span>Home</span>
          </button>
          <button
            onClick={() => setIsBookDetailDisplayed(true)}
            className="flex cursor-pointer items-center gap-2 hover:text-[#F0E8E8]"
          >
            <Info size={16} /> <span>Book Details</span>
          </button>
        </div>
      </div>
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <div className="w-32 overflow-y-auto border-r border-gray-200 bg-white p-2">
          {canRender && (
            <Document file={fileUrl} onLoadSuccess={({ numPages }) => setNumPagesInChunk(numPages)}>
              {Array.from({ length: numPagesInChunk }, (_, i) => {
                const pageNum = chunkRange.start + i;
                const active = pageNum === globalPageNumber;
                return (
                  <div
                    key={pageNum}
                    onClick={() => setGlobalPageNumber(pageNum)}
                    className={`cursor-pointer mb-2 border-2 p-1 rounded-lg ${
                      active
                        ? 'border-[#A56F6E] bg-[#E0D4D3]'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <Page
                      pageNumber={i + 1}
                      width={80}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                    <p className="text-xs text-center mt-1">{pageNum}</p>
                  </div>
                );
              })}
            </Document>
          )}
        </div>

        {/* Main viewer */}
        <div className="flex flex-col flex-grow items-center bg-gray-100 p-4">
          {/* Zoom + Info */}
          <div className="flex items-center justify-between w-full max-w-3xl p-3 bg-white">
            <div className="flex items-center gap-3 text-gray-700">
              <button onClick={() => setScale((s) => Math.max(0.6, s - 0.1))}>
                <Minus size={18} />
              </button>
              <span className="font-semibold text-[#A56F6E]">{Math.round(scale * 100)}%</span>
              <button onClick={() => setScale((s) => Math.min(2.0, s + 0.1))}>
                <Plus size={18} />
              </button>
            </div>
            <span className="text-sm">
              Page <b>{globalPageNumber}</b> of {totalBookPages || '...'}
            </span>
            <div className="flex gap-3">
              <Bookmark size={18} />
              <Maximize size={18} />
            </div>
          </div>

          {/* 📊 Progress bar */}
          <div className="w-full max-w-3xl h-3 bg-gray-200 overflow-hidden mb-3">
            <div
              className="h-full bg-[#A56F6E] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Main PDF Page */}
          <div className="bg-white shadow-2xl rounded-lg max-h-[80vh] overflow-y-auto flex justify-center items-center">
            {loading || !fileUrl ? (
              <div className="flex items-center justify-center h-[500px] w-[800px] text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#A56F6E]" />
                <span className="ml-3">Loading...</span>
              </div>
            ) : (
              <ErrorBoundary>
                <Document file={fileUrl}>
                  <Page
                    key={`page_${globalPageNumber}`}
                    pageNumber={pageInChunk}
                    scale={scale}
                    renderTextLayer={true}
                    renderAnnotationLayer={false}
                  />
                </Document>
              </ErrorBoundary>
            )}
          </div>

          {/* Page nav buttons */}
          <div className="flex space-x-8 mt-6">
            <button
              onClick={() => handlePageChange('prev')}
              disabled={globalPageNumber <= 1}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-[#A56F6E] hover:text-white disabled:opacity-50"
            >
              <ChevronLeft size={20} /> Previous
            </button>
            <button
              onClick={() => handlePageChange('next')}
              disabled={totalBookPages && globalPageNumber >= totalBookPages}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-[#A56F6E] hover:text-white disabled:opacity-50"
            >
              Next <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
      {isBookDetailDisplayed && (
        <BookDetailCard
          book={book}
          onClose={() => {
            setIsBookDetailDisplayed(false);
          }}
        />
      )}
    </div>
  );
}
