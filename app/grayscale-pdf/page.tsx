'use client';

import React, { useState } from 'react';
import { TOOLS } from '@/lib/toolsConfig';
import Dropzone from '@/components/Dropzone';
import ProgressBar from '@/components/ProgressBar';
import SeoContent from '@/components/SeoContent';
import { grayscalePDF, downloadFile } from '@/lib/pdfTools';
import { Palette, Download, RefreshCw, AlertCircle, CheckCircle2, Printer } from 'lucide-react';

const tool = TOOLS.find((t) => t.id === 'grayscale-pdf')!;

export default function GrayscalePdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleConvert = async () => {
    if (files.length === 0) {
      setErrorMessage('Please select a PDF file first.');
      return;
    }
    setErrorMessage('');
    setIsProcessing(true);
    setProgress(20);

    try {
      const bAndWBlob = await grayscalePDF(files[0], (pct) => setProgress(pct));
      setResultBlob(bAndWBlob);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'Error occurred while converting to grayscale.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultBlob && files[0]) {
      const baseName = files[0].name.replace(/\.pdf$/i, '');
      downloadFile(resultBlob, `${baseName}_grayscale.pdf`);
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
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-brand-50 text-brand-600 mb-4 border border-brand-200">
            <Palette className="w-8 h-8" />
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
                onFilesChange={setFiles}
                multiple={false}
                title="Select color PDF file"
                subtitle="Upload the document to transform all pages to black and white / grayscale"
              />

              {files.length > 0 && !isProcessing && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-start gap-3 mb-6">
                    <Printer className="w-5 h-5 text-gray-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 mb-1">Optimized for Printing & Submissions</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Converts color gradients, graphics, and images into high-contrast monochrome tones. Drastically cuts printing ink consumption and satisfies official black-and-white filing guidelines.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleConvert}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 hover:scale-105 active:scale-95 transition-all"
                    >
                      Convert to Grayscale (B&W)
                    </button>
                  </div>
                </div>
              )}

              {isProcessing && (
                <ProgressBar progress={progress} statusText="Applying grayscale luminance algorithm to pages..." />
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-black text-gray-900 mb-2">
                Grayscale PDF Ready!
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                All color channels have been converted to print-optimized monochrome black and white.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Grayscale PDF</span>
                </button>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Convert Another File</span>
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
