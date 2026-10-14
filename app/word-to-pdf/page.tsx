'use client';

import React, { useState } from 'react';
import { TOOLS } from '@/lib/toolsConfig';
import ProgressBar from '@/components/ProgressBar';
import SeoContent from '@/components/SeoContent';
import { wordToPDF, downloadFile } from '@/lib/pdfTools';
import { FileText, Download, RefreshCw, AlertCircle, CheckCircle2, UploadCloud, File as FileIcon } from 'lucide-react';

const tool = TOOLS.find((t) => t.id === 'word-to-pdf')!;

export default function WordToPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (!selected.name.match(/\.(docx|doc)$/i)) {
        setErrorMessage('Please upload a valid Microsoft Word document (.docx or .doc).');
        return;
      }
      setErrorMessage('');
      setFile(selected);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selected = e.dataTransfer.files[0];
      if (!selected.name.match(/\.(docx|doc)$/i)) {
        setErrorMessage('Please upload a valid Microsoft Word document (.docx or .doc).');
        return;
      }
      setErrorMessage('');
      setFile(selected);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setErrorMessage('Please select a Word document first.');
      return;
    }
    setErrorMessage('');
    setIsProcessing(true);
    setProgress(20);

    try {
      const pdfBlob = await wordToPDF(file, (pct) => setProgress(pct));
      setResultBlob(pdfBlob);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'Error occurred while converting Word to PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultBlob && file) {
      const baseName = file.name.replace(/\.(docx|doc)$/i, '');
      downloadFile(resultBlob, `${baseName}.pdf`);
    }
  };

  const handleReset = () => {
    setFile(null);
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
            <FileText className="w-8 h-8" />
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
              {!file ? (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-gray-300 hover:border-brand-500 rounded-3xl p-10 text-center transition-colors bg-gray-50/40 hover:bg-brand-50/20 cursor-pointer"
                  onClick={() => document.getElementById('word-file-input')?.click()}
                >
                  <input
                    id="word-file-input"
                    type="file"
                    accept=".docx,.doc"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4 border border-brand-100">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Select Word Document
                  </h3>
                  <p className="text-sm text-gray-500 max-w-sm mx-auto">
                    Drag and drop your .docx or .doc file here, or click to browse
                  </p>
                </div>
              ) : (
                <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
                      <FileIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{file.name}</h4>
                      <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB • Word Document</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Change File
                  </button>
                </div>
              )}

              {file && !isProcessing && (
                <div className="mt-8 flex justify-end pt-6 border-t border-gray-100">
                  <button
                    onClick={handleConvert}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 hover:scale-105 active:scale-95 transition-all"
                  >
                    Convert to PDF
                  </button>
                </div>
              )}

              {isProcessing && (
                <ProgressBar progress={progress} statusText="Converting Word formatting into standard PDF..." />
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-black text-gray-900 mb-2">
                PDF Created Successfully!
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                Your Word document has been converted into a universal, high-quality PDF.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
                >
                  <Download className="w-5 h-5" />
                  <span>Download PDF Document</span>
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
