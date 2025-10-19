import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, Bookmark, Maximize, Minus, Plus } from 'lucide-react';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { useParams } from 'react-router';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

// The fixed size of the page chunk fetched from the backend.
const CHUNK_SIZE = 10;

export default function NotebookViewer() {
  const bookId = useParams().bookid || 'test';
  const [fileUrl, setFileUrl] = useState(null);
  const [chunkRange, setChunkRange] = useState({ start: 1, end: CHUNK_SIZE });
  const [numPagesInChunk, setNumPagesInChunk] = useState(0);
  const [globalPageNumber, setGlobalPageNumber] = useState(1);
  const [totalBookPages, setTotalBookPages] = useState(null);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(true);

  // --- Data Fetching Logic (Chunk Management) ---
  const fetchPdfChunk = useCallback(async () => {
    setLoading(true);
    // Don't fetch if we've reached the end on a previous call
    if (totalBookPages && chunkRange.start > totalBookPages) {
      setLoading(false);
      return;
    }

    const res = await fetch(
      `http://localhost:5000/pdf/${bookId}/pages?start=${chunkRange.start}&end=${chunkRange.end}`
    );

    if (res.status === 204) {
      console.log('No more pages available.');
      setLoading(false);
      return;
    }

    const total = res.headers.get('X-Total-Pages');
    if (total) setTotalBookPages(Number(total));

    const blob = await res.blob();

    // NOTE: setFileUrl is safe here, but we MUST clean up the old URL object
    // in the useEffect cleanup function to avoid memory leaks.
    setFileUrl(URL.createObjectURL(blob));
    setLoading(false);
  }, [chunkRange, bookId, totalBookPages]);

  // FIX: This useEffect runs the fetch function only when its dependencies change,
  // and the cleanup function revokes the URL created in the *previous* render.
  useEffect(() => {
    // Revoke the old URL before fetching the new one.
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    fetchPdfChunk();

    // The cleanup only runs when the component unmounts or before the next effect run.
    return () => {
      // The subsequent render will call URL.revokeObjectURL(fileUrl)
      // on the URL that was *just* created before the next fetch.
      // This part is generally safe because React ensures the previous effect
      // is cleaned up before the new effect runs.
    };
  }, [fetchPdfChunk]); // ONLY depend on fetchPdfChunk

  // --- Navigation Handlers ---

  const handlePageChange = (direction) => {
    const isForward = direction === 'next';
    let newPage = isForward ? globalPageNumber + 1 : globalPageNumber - 1;

    // Check boundaries based on total book pages
    if (totalBookPages && newPage > totalBookPages) return;
    if (newPage < 1) return;

    // Check if we need to load the next chunk
    const currentChunkEndPage = chunkRange.start + numPagesInChunk - 1;
    const currentChunkStartPage = chunkRange.start;

    if (isForward && newPage > currentChunkEndPage) {
      // Load next chunk
      setChunkRange((prev) => ({
        start: prev.end + 1,
        end: Math.min(prev.end + CHUNK_SIZE, totalBookPages || prev.end + CHUNK_SIZE),
      }));
    } else if (!isForward && newPage < currentChunkStartPage) {
      // Load previous chunk
      setChunkRange((prev) => ({
        start: Math.max(1, prev.start - CHUNK_SIZE),
        end: prev.start - 1,
      }));
    }

    setGlobalPageNumber(newPage);
  };

  // The page number within the current 10-page PDF chunk
  const pageInChunk = globalPageNumber - chunkRange.start + 1;

  // --- Rendering Functions ---

  const renderThumbnail = ({ pageNumber: thumbPageNum }) => {
    const globalThumbPageNum = chunkRange.start + thumbPageNum - 1;
    const isCurrent = globalThumbPageNum === globalPageNumber;

    return (
      <div
        key={globalThumbPageNum}
        onClick={() => setGlobalPageNumber(globalThumbPageNum)}
        className={`cursor-pointer mb-2 border-2 p-1 ${
          isCurrent ? 'border-[#A56F6E] bg-[#E0D4D3]' : 'border-transparent hover:border-gray-300'
        } rounded-lg transition-all duration-150 overflow-hidden shadow-sm`}
      >
        <Page
          pageNumber={thumbPageNum}
          width={80}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
        <p className="text-xs text-center font-medium text-gray-700 mt-1">{globalThumbPageNum}</p>
      </div>
    );
  };

  // Final render output
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* --- Sidebar with Thumbnails --- */}
      <div className="w-32 overflow-y-auto border-r border-gray-200 bg-white shadow-inner p-2">
        {loading ? (
          <div className="text-center text-sm text-gray-500 py-4">Loading Pages...</div>
        ) : (
          <Document file={fileUrl} onLoadSuccess={({ numPages }) => setNumPagesInChunk(numPages)}>
            {Array.from({ length: numPagesInChunk }, (_, i) =>
              renderThumbnail({ pageNumber: i + 1 })
            )}
          </Document>
        )}
      </div>

      {/* --- Main Viewer and Controls --- */}
      <div className="flex flex-col flex-grow items-center bg-gray-100 p-4">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between w-full max-w-2xl lg:max-w-4xl p-3 bg-white shadow-xl rounded-xl mb-4 border border-gray-200">
          {/* Zoom Controls */}
          <div className="flex items-center space-x-3 text-gray-700">
            <button
              onClick={() => setScale((s) => Math.max(0.6, s - 0.1))}
              className="p-1 rounded-full hover:bg-gray-100 transition"
            >
              <Minus size={18} />
            </button>
            <span className="text-sm font-semibold text-[#A56F6E]">{Math.round(scale * 100)}%</span>
            <button
              onClick={() => setScale((s) => Math.min(2.0, s + 0.1))}
              className="p-1 rounded-full hover:bg-gray-100 transition"
            >
              <Plus size={18} />
            </button>
          </div>

          {/* Page Count Display */}
          <span className="text-sm font-medium text-gray-700">
            Page <span className="font-bold text-[#A56F6E]">{globalPageNumber}</span> of{' '}
            {totalBookPages || '...'}
          </span>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              title="Add Bookmark"
              className="p-1 rounded-full text-gray-500 hover:text-[#A56F6E] transition"
            >
              <Bookmark size={18} />
            </button>
            <button
              title="Fullscreen"
              className="p-1 rounded-full text-gray-500 hover:text-[#A56F6E] transition"
            >
              <Maximize size={18} />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="bg-white shadow-2xl rounded-lg max-h-[80vh] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-[500px] w-[800px] text-gray-500">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#A56F6E]"></div>
              <span className="ml-3">Loading Page Chunk...</span>
            </div>
          ) : (
            <Document file={fileUrl}>
              <Page
                key={`page_${globalPageNumber}`}
                pageNumber={pageInChunk}
                scale={scale}
                renderTextLayer={true}
                renderAnnotationLayer={false}
              />
            </Document>
          )}
        </div>

        {/* Bottom Navigation Controls */}
        <div className="flex space-x-8 mt-6">
          <button
            onClick={() => handlePageChange('prev')}
            disabled={globalPageNumber <= 1}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-[#A56F6E] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} /> Previous Page
          </button>
          <button
            onClick={() => handlePageChange('next')}
            disabled={totalBookPages && globalPageNumber >= totalBookPages}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-[#A56F6E] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Page <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
