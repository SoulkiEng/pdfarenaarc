'use client';

import React, { useState } from 'react';
import { TOOLS } from '@/lib/toolsConfig';
import Dropzone from '@/components/Dropzone';
import ProgressBar from '@/components/ProgressBar';
import SeoContent from '@/components/SeoContent';
import { organizePDF, fileToArrayBuffer, downloadFile } from '@/lib/pdfTools';
import { PDFDocument } from 'pdf-lib';
import { Grid, Download, RefreshCw, AlertCircle, CheckCircle2, Trash2, RotateCw, File } from 'lucide-react';

const tool = TOOLS.find((t) => t.id === 'organize-pdf')!;

interface PageItem {
  id: number;
  originalIndex: number;
  rotation: number;
}

export default function OrganizePdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [pages, setPages] = useState<PageItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileLoaded = async (newFiles: File[]) => {
    setFiles(newFiles);
    if (newFiles.length > 0) {
      try {
        const buffer = await fileToArrayBuffer(newFiles[0]);
        const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
        const count = pdf.getPageCount();
        const initialPages: PageItem[] = [];
        for (let i = 0; i < count; i++) {
          initialPages.push({ id: i + 1, originalIndex: i, rotation: 0 });
        }
        setPages(initialPages);
      } catch (err: any) {
        setErrorMessage('Failed to read PDF structure: ' + err.message);
      }
    } else {
      setPages([]);
    }
  };

  const rotatePage = (index: number) => {
    setPages((prev) =>
      prev.map((p, idx) => (idx === index ? { ...p, rotation: (p.rotation + 90) % 360 } : p))
    );
  };

  const removePage = (index: number) => {
    setPages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSave = async () => {
    if (files.length === 0 || pages.length === 0) {
      setErrorMessage('Please make sure at least one page is selected.');
      return;
    }
    setErrorMessage('');
    setIsProcessing(true);
    setProgress(20);

    try {
      const order = pages.map((p) => ({ pageIndex: p.originalIndex, rotation: p.rotation }));
      const blob = await organizePDF(files[0], order, (pct) => setProgress(pct));
      setResultBlob(blob);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'Error organizing PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultBlob && files[0]) {
      const baseName = files[0].name.replace(/\.pdf$/i, '');
      downloadFile(resultBlob, `${baseName}_organized.pdf`);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setPages([]);
    setResultBlob(null);
    setProgress(0);
    setErrorMessage('');
  };

  return (
    <div className="py-10 sm:py-16 bg-gray-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-brand-50 text-brand-600 mb-4 border border-brand-200">
            <Grid className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-950">
            {tool.title}
          </h1>
          <p className="mt-2 text-base text-gray-600 max-w-xl mx-auto">
            {tool.shortDesc}
          </p>
        </div>

        {/* Workspace Card */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-6 sm:p-10 transition-all">
          
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm font-semibold">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {!resultBlob ? (
            <div>
              <Dropzone
                files={files}
                onFilesChange={handleFileLoaded}
                multiple={false}
                title="Select PDF file"
                subtitle="Choose the document to delete, rotate, or reorder pages"
              />

              {pages.length > 0 && !isProcessing && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-gray-900">
                      Document Pages ({pages.length} remaining)
                    </h4>
                    <span className="text-xs text-gray-500">
                      Rotate or delete individual pages below
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                    {pages.map((p, idx) => (
                      <div
                        key={p.id}
                        className="relative bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-between group hover:border-brand-300 transition-all shadow-sm"
                      >
                        <div
                          className="w-16 h-20 bg-white border border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 my-2 transition-transform duration-300 shadow-sm"
                          style={{ transform: `rotate(${p.rotation}deg)` }}
                        >
                          <File className="w-6 h-6 text-brand-400" />
                          <span className="text-[10px] font-bold text-gray-700 mt-1">
                            {p.originalIndex + 1}
                          </span>
                        </div>

                        <span className="text-xs font-bold text-gray-700 mb-2">
                          Page {p.originalIndex + 1}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => rotatePage(idx)}
                            className="p-1.5 rounded-lg bg-gray-200 hover:bg-brand-50 hover:text-brand-600 text-gray-700 text-xs transition-colors"
                            title="Rotate 90 degrees"
                          >
                            <RotateCw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removePage(idx)}
                            className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 text-xs transition-colors"
                            title="Delete this page"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSave}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 hover:scale-105 active:scale-95 transition-all"
                    >
                      Save Organized PDF
                    </button>
                  </div>
                </div>
              )}

              {isProcessing && (
                <ProgressBar progress={progress} statusText="Building organized PDF document..." />
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                PDF Reorganized Successfully!
              </h3>
              <p className="text-sm text-gray-500 mb-8">
                Your new clean document has been generated and is ready to download.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-base shadow-xl shadow-brand-500/30 hover:scale-105 transition-all"
                >
                  <Download className="w-5 h-5" />
                  Download Organized PDF
                </button>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  Organize Another PDF
                </button>
              </div>
            </div>
          )}

        </div>

        {/* SEO & FAQ */}
        <SeoContent tool={tool} />

      </div>
    </div>
  );
}
