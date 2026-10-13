'use client';

import React, { useState } from 'react';
import { TOOLS } from '@/lib/toolsConfig';
import Dropzone from '@/components/Dropzone';
import ProgressBar from '@/components/ProgressBar';
import SeoContent from '@/components/SeoContent';
import { watermarkPDF, downloadFile } from '@/lib/pdfTools';
import { Stamp, Download, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

const tool = TOOLS.find((t) => t.id === 'watermark-pdf')!;

export default function WatermarkPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [watermarkColor, setWatermarkColor] = useState<'gray' | 'red' | 'blue' | 'black'>('gray');
  const [opacity, setOpacity] = useState<number>(0.3);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleApply = async () => {
    if (files.length === 0) {
      setErrorMessage('Please select a PDF file first.');
      return;
    }
    if (!watermarkText.trim()) {
      setErrorMessage('Please enter watermark text.');
      return;
    }
    setErrorMessage('');
    setIsProcessing(true);
    setProgress(15);

    try {
      const blob = await watermarkPDF(
        files[0],
        watermarkText,
        {
          color: watermarkColor,
          opacity: opacity,
          size: 50,
          rotation: 45,
        },
        (pct) => setProgress(pct)
      );
      setResultBlob(blob);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'Error applying watermark.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultBlob && files[0]) {
      const baseName = files[0].name.replace(/\.pdf$/i, '');
      downloadFile(resultBlob, `${baseName}_watermarked.pdf`);
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
            <Stamp className="w-8 h-8" />
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
                title="Select PDF file"
                subtitle="Choose the document to stamp with a watermark"
              />

              {files.length > 0 && !isProcessing && (
                <div className="mt-8 pt-6 border-t border-gray-100 space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Watermark Text
                    </label>
                    <input
                      type="text"
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                      placeholder="e.g. CONFIDENTIAL, DRAFT, DO NOT COPY"
                      className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm font-semibold focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Watermark Color
                      </label>
                      <div className="flex gap-2">
                        {(['gray', 'red', 'blue', 'black'] as const).map((col) => (
                          <button
                            key={col}
                            type="button"
                            onClick={() => setWatermarkColor(col)}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize border transition-all ${
                              watermarkColor === col
                                ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm'
                                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {col}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Transparency / Opacity
                        </label>
                        <span className="text-xs font-extrabold text-brand-600">{Math.round(opacity * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="0.8"
                        step="0.05"
                        value={opacity}
                        onChange={(e) => setOpacity(parseFloat(e.target.value))}
                        className="w-full accent-brand-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleApply}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 hover:scale-105 active:scale-95 transition-all"
                    >
                      Apply Watermark
                    </button>
                  </div>
                </div>
              )}

              {isProcessing && (
                <ProgressBar progress={progress} statusText="Stamping watermark on document..." />
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                Watermark Applied Successfully!
              </h3>
              <p className="text-sm text-gray-500 mb-8">
                Your stamped document is ready to download.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-base shadow-xl shadow-brand-500/30 hover:scale-105 transition-all"
                >
                  <Download className="w-5 h-5" />
                  Download Watermarked PDF
                </button>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  Watermark Another PDF
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
