import express from "express";
import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Secure route to send PDF pages in chunks
router.get("/:bookId/pages", async (req, res) => {
  try {
    const { bookId } = req.params;
    const start = parseInt(req.query.start || 1);
    const end = parseInt(req.query.end || start + 9); // default 10 pages

    // PDF file location (private folder)
    const pdfPath = path.join(__dirname, `../uploads/books/${bookId}.pdf`);

    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ message: "Book not found" });
    }

    const existingPdfBytes = fs.readFileSync(pdfPath);
    const originalPdf = await PDFDocument.load(existingPdfBytes);
    const newPdf = await PDFDocument.create();

    const totalPages = originalPdf.getPageCount();
    const safeStart = Math.max(0, start - 1);
    const safeEnd = Math.min(totalPages, end);

    if (safeStart >= totalPages) {
      // No more pages to serve
      return res.status(204).end();
    }

    for (let i = safeStart; i < safeEnd; i++) {
      const [copiedPage] = await newPdf.copyPages(originalPdf, [i]);
      newPdf.addPage(copiedPage);
    }

    // Optional watermark to discourage sharing
    const pages = newPdf.getPages();
    pages.forEach((page, idx) => {
      page.drawText(`Book ID: ${bookId} | Pages ${start}-${end}`, {
        x: 50,
        y: 25,
        size: 8,
        opacity: 1,
      });
    });

    const newPdfBytes = await newPdf.save();

    // Disable caching for security
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, private"
    );
    console.log(totalPages);
    res.setHeader("X-Total-Pages", totalPages);
    res.setHeader("Content-Type", "application/pdf");
    res.send(Buffer.from(newPdfBytes));
  } catch (err) {
    console.error("Error while generating partial PDF:", err);
    res.status(500).json({ message: "Error processing PDF" });
  }
});

export default router;
