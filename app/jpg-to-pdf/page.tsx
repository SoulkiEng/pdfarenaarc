'use client';

import React, { useState } from 'react';
import { TOOLS } from '@/lib/toolsConfig';
import Dropzone from '@/components/Dropzone';
import ProgressBar from '@/components/ProgressBar';
import SeoContent from '@/components/SeoContent';
import { imagesToPDF, downloadFile } from '@/lib/pdfTools';
import { FileImage, Download, RefreshCw, AlertCircle, CheckCircle2, Smartphone, Monitor } from 'lucide-react';

const tool = TOOLS.find((t) => t.id === 'jpg-to-pdf')!;

export default function JpgToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleConvert = async () => {
    if (files.length === 0) {
      setErrorMessage('Please select at least 1 image.');
      return;
    }
    setErrorMessage('');
    setIsProcessing(true);
    setProgress(15);

    try {
      const pdfBlob = await imagesToPDF(files, orientation, (pct) => setProgress(pct));
      setResultBlob(pdfBlob);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'Error converting images to PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultBlob) {
      downloadFile(resultBlob, 'converted_images.pdf');
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
            <FileImage className="w-8 h-8" />
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
                multiple={true}
                accept={{
                  'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
                }}
                title="Select Image files"
                subtitle="Choose JPG, PNG, or WebP images to convert"
              />

              {files.length > 0 && !isProcessing && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Page Orientation</h4>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() => setOrientation('portrait')}
                      className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${
                        orientation === 'portrait'
                          ? 'border-brand-500 bg-brand-50/60 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Smartphone className={`w-5 h-5 ${orientation === 'portrait' ? 'text-brand-600' : 'text-gray-400'}`} />
                      <div>
                        <div className="text-sm font-bold text-gray-900">Portrait</div>
                        <div className="text-xs text-gray-500">Standard vertical page</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrientation('landscape')}
                      className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${
                        orientation === 'landscape'
                          ? 'border-brand-500 bg-brand-50/60 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Monitor className={`w-5 h-5 ${orientation === 'landscape' ? 'text-brand-600' : 'text-gray-400'}`} />
                      <div>
                        <div className="text-sm font-bold text-gray-900">Landscape</div>
                        <div className="text-xs text-gray-500">Wide horizontal page</div>
                      </div>
                    </button>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleConvert}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 hover:scale-105 active:scale-95 transition-all"
                    >
                      Convert to PDF
                    </button>
                  </div>
                </div>
              )}

              {isProcessing && (
                <ProgressBar progress={progress} statusText="Embedding images into PDF document..." />
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                Images Converted Successfully!
              </h3>
              <p className="text-sm text-gray-500 mb-8">
                Your new PDF document has been created. Click below to download.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-base shadow-xl shadow-brand-500/30 hover:scale-105 transition-all"
                >
                  <Download className="w-5 h-5" />
                  Download Converted PDF
                </button>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  Convert More Images
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
