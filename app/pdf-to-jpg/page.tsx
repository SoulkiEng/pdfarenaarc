'use client';

import React, { useState } from 'react';
import { TOOLS } from '@/lib/toolsConfig';
import Dropzone from '@/components/Dropzone';
import ProgressBar from '@/components/ProgressBar';
import SeoContent from '@/components/SeoContent';
import { pdfToImages, downloadFile } from '@/lib/pdfTools';
import { Image as ImageIcon, Download, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

const tool = TOOLS.find((t) => t.id === 'pdf-to-jpg')!;

export default function PdfToJpgPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState<'jpeg' | 'png'>('jpeg');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ blob: Blob; filename: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleConvert = async () => {
    if (files.length === 0) {
      setErrorMessage('Please select a PDF file first.');
      return;
    }
    setErrorMessage('');
    setIsProcessing(true);
    setProgress(15);

    try {
      const res = await pdfToImages(files[0], format, (pct) => setProgress(pct));
      setResult(res);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'Error converting PDF to images.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      downloadFile(result.blob, result.filename);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setResult(null);
    setProgress(0);
    setErrorMessage('');
  };

  return (
    <div className="py-10 sm:py-16 bg-gray-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-brand-50 text-brand-600 mb-4 border border-brand-200">
            <ImageIcon className="w-8 h-8" />
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

          {!result ? (
            <div>
              <Dropzone
                files={files}
                onFilesChange={setFiles}
                multiple={false}
                title="Select PDF file"
                subtitle="Upload the PDF to convert pages into high-resolution JPG images"
              />

              {files.length > 0 && !isProcessing && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Output Image Format</h4>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() => setFormat('jpeg')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        format === 'jpeg'
                          ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-bold text-sm text-gray-900">JPG (Recommended)</div>
                      <div className="text-xs text-gray-500 mt-1">Smaller file size, perfect for web and sharing</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormat('png')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        format === 'png'
                          ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-bold text-sm text-gray-900">PNG (Lossless)</div>
                      <div className="text-xs text-gray-500 mt-1">Maximum clarity for text, logos, and charts</div>
                    </button>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleConvert}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 hover:scale-105 active:scale-95 transition-all"
                    >
                      Convert to {format.toUpperCase()}
                    </button>
                  </div>
                </div>
              )}

              {isProcessing && (
                <ProgressBar progress={progress} statusText="Rendering PDF pages at high DPI..." />
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-black text-gray-900 mb-2">
                Images Ready to Download!
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                All pages have been converted to high-quality {format.toUpperCase()} images locally.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
                >
                  <Download className="w-5 h-5" />
                  <span>Download {result.filename.endsWith('.zip') ? 'ZIP Archive' : 'Image'}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Convert Another PDF</span>
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
