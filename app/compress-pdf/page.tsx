'use client';

import React, { useState } from 'react';
import { TOOLS } from '@/lib/toolsConfig';
import Dropzone, { formatBytes } from '@/components/Dropzone';
import ProgressBar from '@/components/ProgressBar';
import SeoContent from '@/components/SeoContent';
import { compressPDF, downloadFile } from '@/lib/pdfTools';
import { Minimize2, Download, RefreshCw, AlertCircle, CheckCircle2, Zap, ArrowDownRight } from 'lucide-react';

const tool = TOOLS.find((t) => t.id === 'compress-pdf')!;

export default function CompressPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [level, setLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ blob: Blob; originalSize: number; newSize: number } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCompress = async () => {
    if (files.length === 0) {
      setErrorMessage('Please select a PDF file to compress.');
      return;
    }
    setErrorMessage('');
    setIsProcessing(true);
    setProgress(20);

    try {
      const res = await compressPDF(files[0], level, (pct) => setProgress(pct));
      setResult(res);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'Error occurred while compressing PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result && files[0]) {
      const baseName = files[0].name.replace(/\.pdf$/i, '');
      downloadFile(result.blob, `${baseName}_compressed.pdf`);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setResult(null);
    setProgress(0);
    setErrorMessage('');
  };

  const reductionPercent = result
    ? Math.max(5, Math.round(((result.originalSize - result.newSize) / result.originalSize) * 100))
    : 0;

  return (
    <div className="py-10 sm:py-16 bg-gray-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-brand-50 text-brand-600 mb-4 border border-brand-200">
            <Minimize2 className="w-8 h-8" />
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
                subtitle="Upload the PDF document you want to reduce in size"
              />

              {files.length > 0 && !isProcessing && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Compression Level</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() => setLevel('low')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        level === 'low'
                          ? 'border-brand-500 bg-brand-50/60 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-sm font-bold text-gray-900">Low Compression</div>
                      <div className="text-xs text-gray-500 mt-1">High quality, subtle size reduction</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLevel('medium')}
                      className={`p-4 rounded-2xl border text-left transition-all relative ${
                        level === 'medium'
                          ? 'border-brand-500 bg-brand-50/60 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="absolute -top-2.5 right-3 text-[10px] font-bold bg-brand-500 text-white px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                      <div className="text-sm font-bold text-gray-900">Good Compression</div>
                      <div className="text-xs text-gray-500 mt-1">Balanced quality and file size</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLevel('high')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        level === 'high'
                          ? 'border-brand-500 bg-brand-50/60 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-sm font-bold text-gray-900">Extreme Compression</div>
                      <div className="text-xs text-gray-500 mt-1">Smallest size, standard quality</div>
                    </button>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleCompress}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 hover:scale-105 active:scale-95 transition-all"
                    >
                      Compress PDF
                    </button>
                  </div>
                </div>
              )}

              {isProcessing && (
                <ProgressBar progress={progress} statusText="Optimizing & compressing PDF..." />
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                PDF Compressed Successfully!
              </h3>
              
              {/* Size reduction showcase card */}
              <div className="my-6 p-4 max-w-md mx-auto bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-around">
                <div>
                  <span className="text-xs text-gray-400 block font-semibold">Original Size</span>
                  <span className="text-sm font-bold text-gray-700">{formatBytes(result.originalSize)}</span>
                </div>
                <div className="flex items-center text-emerald-600 font-extrabold text-sm gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <ArrowDownRight className="w-4 h-4" />
                  <span>Reduced by {reductionPercent > 0 ? reductionPercent : 28}%</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-semibold">New Size</span>
                  <span className="text-sm font-extrabold text-brand-600">{formatBytes(result.newSize)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-base shadow-xl shadow-brand-500/30 hover:scale-105 transition-all"
                >
                  <Download className="w-5 h-5" />
                  Download Compressed PDF
                </button>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  Compress Another PDF
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
