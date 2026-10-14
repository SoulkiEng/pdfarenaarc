'use client';

import React, { useState } from 'react';
import { TOOLS } from '@/lib/toolsConfig';
import Dropzone from '@/components/Dropzone';
import ProgressBar from '@/components/ProgressBar';
import SeoContent from '@/components/SeoContent';
import { pdfToWord, downloadFile } from '@/lib/pdfTools';
import { FileEdit, Download, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

const tool = TOOLS.find((t) => t.id === 'pdf-to-word')!;

export default function PdfToWordPage() {
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
      const docxBlob = await pdfToWord(files[0], (pct) => setProgress(pct));
      setResultBlob(docxBlob);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'Error occurred while converting PDF to Word.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultBlob && files[0]) {
      const baseName = files[0].name.replace(/\.pdf$/i, '');
      downloadFile(resultBlob, `${baseName}.docx`);
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
            <FileEdit className="w-8 h-8" />
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
                title="Select PDF file to convert"
                subtitle="Upload the PDF to transform it into an editable Microsoft Word document"
              />

              {files.length > 0 && !isProcessing && (
                <div className="mt-8 flex justify-end pt-6 border-t border-gray-100">
                  <button
                    onClick={handleConvert}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 hover:scale-105 active:scale-95 transition-all"
                  >
                    Convert to Word (.DOCX)
                  </button>
                </div>
              )}

              {isProcessing && (
                <ProgressBar progress={progress} statusText="Extracting text layers and compiling .docx document..." />
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-black text-gray-900 mb-2">
                Word Document (.DOCX) Ready!
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                Your PDF has been converted into an editable Microsoft Word document with 100% confidentiality.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
                >
                  <Download className="w-5 h-5" />
                  <span>Download .DOCX File</span>
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
