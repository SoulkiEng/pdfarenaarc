'use client';

import React, { useState } from 'react';
import { TOOLS } from '@/lib/toolsConfig';
import Dropzone from '@/components/Dropzone';
import ProgressBar from '@/components/ProgressBar';
import SeoContent from '@/components/SeoContent';
import { extractTextFromPDF, downloadFile } from '@/lib/pdfTools';
import { FileText, Download, RefreshCw, AlertCircle, CheckCircle2, Copy, Check } from 'lucide-react';

const tool = TOOLS.find((t) => t.id === 'pdf-to-text')!;

export default function PdfToTextPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleExtract = async () => {
    if (files.length === 0) {
      setErrorMessage('Please select a PDF file first.');
      return;
    }
    setErrorMessage('');
    setIsProcessing(true);
    setProgress(20);

    try {
      const text = await extractTextFromPDF(files[0], (pct) => setProgress(pct));
      setExtractedText(text);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'Error extracting text from PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (extractedText) {
      navigator.clipboard.writeText(extractedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadTxt = () => {
    if (extractedText && files[0]) {
      const baseName = files[0].name.replace(/\.pdf$/i, '');
      const blob = new Blob([extractedText], { type: 'text/plain;charset=utf-8' });
      downloadFile(blob, `${baseName}_extracted_text.txt`);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setExtractedText(null);
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

          {!extractedText ? (
            <div>
              <Dropzone
                files={files}
                onFilesChange={setFiles}
                multiple={false}
                title="Select PDF file"
                subtitle="Choose the PDF to extract raw text content from"
              />

              {files.length > 0 && !isProcessing && (
                <div className="mt-8 flex justify-end pt-6 border-t border-gray-100">
                  <button
                    onClick={handleExtract}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 hover:scale-105 active:scale-95 transition-all"
                  >
                    Extract Text
                  </button>
                </div>
              )}

              {isProcessing && (
                <ProgressBar progress={progress} statusText="Extracting text layers from PDF..." />
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Text Extracted Successfully</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
                  </button>
                  <button
                    onClick={handleDownloadTxt}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-sm transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .TXT</span>
                  </button>
                </div>
              </div>

              {/* Text Area Preview */}
              <div className="relative">
                <textarea
                  readOnly
                  value={extractedText}
                  rows={10}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-mono text-xs sm:text-sm text-gray-800 focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Extract Another Document
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
