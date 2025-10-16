import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export default function NotebookViewer({ bookId = 'test' }) {
  const [fileUrl, setFileUrl] = useState(null);
  const [range, setRange] = useState({ start: 1, end: 10 });
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBookPages, setTotalBookPages] = useState(null);
  const [scale, setScale] = useState(1.2);

  useEffect(() => {
    const fetchPdfChunk = async () => {
      if (totalBookPages && range.end >= totalBookPages) return;
      const res = await fetch(
        `http://localhost:5000/pdf/test/pages?start=${range.start}&end=${range.end}`
      );
      console.log('range = ', range.start, 'to', range.end, 'totalPages: ', totalBookPages, res);
      if (res.status === 204) {
        console.log('No more pages available.');
        return;
      }

      const total = res.headers.get('X-Total-Pages');
      if (total) setTotalBookPages(Number(total));
      const blob = await res.blob();
      setFileUrl(URL.createObjectURL(blob));
      setCurrentPage(1);
    };
    fetchPdfChunk();
  }, [range, bookId]);

  const handleNext = () => {
    if (totalBookPages && range.end >= totalBookPages) {
      console.log('Reached end of book. No further calls.');
      return; // stop here
    }

    setRange((prev) => {
      const newStart = prev.end + 1;
      const newEnd = Math.min(prev.end + 10, totalBookPages || prev.end + 10);
      return { start: newStart, end: newEnd };
    });
  };

  const handlePrev = () => {
    if (range.start <= 1) return;
    setRange((prev) => ({
      start: Math.max(1, prev.start - 10),
      end: prev.start - 1,
    }));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar with thumbnails */}
      <div className="w-32 overflow-y-auto border-r border-gray-300 bg-white p-2">
        <Document file={fileUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
          {Array.from({ length: numPages }, (_, i) => (
            <div
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`cursor-pointer mb-2 border ${
                currentPage === i + 1 ? 'border-blue-500' : 'border-transparent'
              } rounded-sm overflow-hidden`}
            >
              <Page
                pageNumber={i + 1}
                width={80}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </div>
          ))}
        </Document>
      </div>

      {/* Main viewer */}
      <div className="flex flex-col flex-grow items-center justify-center bg-gray-200">
        <div className="flex items-center space-x-4 p-3 bg-white shadow-md rounded-lg mb-2">
          <button onClick={() => setScale((s) => Math.max(0.6, s - 0.2))}>−</button>
          <span>{Math.round(scale * 100)}%</span>
          <button onClick={() => setScale((s) => Math.min(2.0, s + 0.2))}>＋</button>
          <span>
            Page {range.start + currentPage - 1} of{' '}
            {range.end > totalBookPages ? totalBookPages : Range.end}
          </span>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-2 max-h-[90vh] overflow-y-auto">
          <Document file={fileUrl}>
            <Page
              key={`page_${currentPage}`}
              pageNumber={currentPage}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>

        <div className="flex space-x-3 mt-4">
          <button onClick={handlePrev} disabled={range.start <= 1}>
            ◀ Prev 10
          </button>
          <button onClick={handleNext} disabled={totalBookPages && range.end >= totalBookPages}>
            Next 10 ▶
          </button>
        </div>
      </div>
    </div>
  );
}
