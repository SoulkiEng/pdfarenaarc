'use client';

import React, { useState } from 'react';
import { TOOLS } from '@/lib/toolsConfig';
import Dropzone from '@/components/Dropzone';
import ProgressBar from '@/components/ProgressBar';
import SeoContent from '@/components/SeoContent';
import { mergePDFs, downloadFile } from '@/lib/pdfTools';
import { Layers, Download, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

const tool = TOOLS.find((t) => t.id === 'merge-pdf')!;

export default function MergePdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleMerge = async () => {
    if (files.length < 2) {
      setErrorMessage('Please select at least 2 PDF files to merge.');
      return;
    }
    setErrorMessage('');
    setIsProcessing(true);
    setProgress(10);

    try {
      const mergedBlob = await mergePDFs(files, (pct) => setProgress(pct));
      setResultBlob(mergedBlob);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'An error occurred while merging PDFs.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultBlob) {
      downloadFile(resultBlob, 'merged_document.pdf');
    }
  };

  const handleReset = () => {
    setFiles([]);
    setResultBlob(null);
    setProgress(0);
    setErrorMessage('');
  };

  return (
    <div className="py-10 sm:py-16 bg-gray-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Tool Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-brand-50 text-brand-600 mb-4 border border-brand-200">
            <Layers className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-950">
            {tool.title}
          </h1>
          <p className="mt-2 text-base text-gray-600 max-w-xl mx-auto">
            {tool.shortDesc}
          </p>
        </div>

        {/* Tool Workspace Card */}
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
                onFilesChange={setFiles}
                multiple={true}
                title="Select PDF files"
                subtitle="Select 2 or more PDF files to combine"
              />

              {files.length > 0 && !isProcessing && (
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
                  <span className="text-xs text-gray-500 font-medium">
                    {files.length} file{files.length > 1 ? 's' : ''} ready to combine
                  </span>
                  <button
                    onClick={handleMerge}
                    disabled={files.length < 2}
                    className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base transition-all shadow-lg ${
                      files.length >= 2
                        ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-brand-500/25 hover:scale-105 active:scale-95'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                    }`}
                  >
                    Merge PDF Files
                  </button>
                </div>
              )}

              {isProcessing && (
                <ProgressBar progress={progress} statusText="Combining PDF pages..." />
              )}
            </div>
          ) : (
            /* Success & Download State */
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                PDFs Merged Successfully!
              </h3>
              <p className="text-sm text-gray-500 mb-8">
                Your combined document is ready. Click below to download.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-base shadow-xl shadow-brand-500/30 hover:scale-105 transition-all"
                >
                  <Download className="w-5 h-5" />
                  Download Merged PDF
                </button>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  Merge Another PDF
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Comprehensive SEO, HowTo, Features, and FAQs */}
        <SeoContent tool={tool} />

      </div>
    </div>
  );
}
