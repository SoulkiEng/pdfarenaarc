'use client';

import React, { useState } from 'react';
import { TOOLS } from '@/lib/toolsConfig';
import Dropzone from '@/components/Dropzone';
import ProgressBar from '@/components/ProgressBar';
import SeoContent from '@/components/SeoContent';
import { splitPDF, downloadFile } from '@/lib/pdfTools';
import { Scissors, Download, RefreshCw, AlertCircle, CheckCircle2, Files, Sliders } from 'lucide-react';

const tool = TOOLS.find((t) => t.id === 'split-pdf')!;

export default function SplitPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [mode, setMode] = useState<'all' | 'range'>('all');
  const [rangeInput, setRangeInput] = useState('1-2');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ blob: Blob; filename: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSplit = async () => {
    if (files.length === 0) {
      setErrorMessage('Please select a PDF file first.');
      return;
    }
    setErrorMessage('');
    setIsProcessing(true);
    setProgress(15);

    try {
      const splitResult = await splitPDF(files[0], mode, rangeInput, (pct) => setProgress(pct));
      setResult(splitResult);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'Error occurred while splitting PDF.');
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
            <Scissors className="w-8 h-8" />
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
                subtitle="Choose the PDF document you want to split"
              />

              {files.length > 0 && !isProcessing && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Choose Split Method</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() => setMode('all')}
                      className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${
                        mode === 'all'
                          ? 'border-brand-500 bg-brand-50/60 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`p-2 rounded-xl ${mode === 'all' ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                        <Files className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">Extract All Pages</div>
                        <div className="text-xs text-gray-500">Save every single page as separate PDF in ZIP</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMode('range')}
                      className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${
                        mode === 'range'
                          ? 'border-brand-500 bg-brand-50/60 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`p-2 rounded-xl ${mode === 'range' ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                        <Sliders className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">Custom Page Range</div>
                        <div className="text-xs text-gray-500">Extract specific pages (e.g. 1-3, 5)</div>
                      </div>
                    </button>
                  </div>

                  {mode === 'range' && (
                    <div className="mb-6 p-4 rounded-2xl bg-gray-50 border border-gray-200">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Pages to Extract:
                      </label>
                      <input
                        type="text"
                        value={rangeInput}
                        onChange={(e) => setRangeInput(e.target.value)}
                        placeholder="e.g. 1-3, 5, 8-10"
                        className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm font-semibold focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 outline-none"
                      />
                      <p className="text-[11px] text-gray-400 mt-1.5">
                        Separate individual pages with commas or ranges with hyphens.
                      </p>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={handleSplit}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 hover:scale-105 active:scale-95 transition-all"
                    >
                      Split PDF
                    </button>
                  </div>
                </div>
              )}

              {isProcessing && (
                <ProgressBar progress={progress} statusText="Splitting PDF pages..." />
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                PDF Split Successfully!
              </h3>
              <p className="text-sm text-gray-500 mb-8">
                Your split documents have been processed and are ready to download.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-base shadow-xl shadow-brand-500/30 hover:scale-105 transition-all"
                >
                  <Download className="w-5 h-5" />
                  Download Files
                </button>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  Split Another PDF
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
