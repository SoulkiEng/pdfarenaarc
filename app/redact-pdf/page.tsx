'use client';

import React, { useState } from 'react';
import { TOOLS } from '@/lib/toolsConfig';
import Dropzone from '@/components/Dropzone';
import ProgressBar from '@/components/ProgressBar';
import SeoContent from '@/components/SeoContent';
import { redactPDF, downloadFile } from '@/lib/pdfTools';
import { EyeOff, Download, RefreshCw, AlertCircle, CheckCircle2, Shield, Plus, Trash2 } from 'lucide-react';

const tool = TOOLS.find((t) => t.id === 'redact-pdf')!;

interface RedactionArea {
  id: string;
  pageIndex: number;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function RedactPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [redactions, setRedactions] = useState<RedactionArea[]>([
    { id: '1', pageIndex: 0, label: 'Confidential Info (Header area)', x: 40, y: 750, width: 250, height: 25 },
    { id: '2', pageIndex: 0, label: 'Account / ID Number (Body area)', x: 40, y: 550, width: 220, height: 20 },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const addCustomRedaction = () => {
    const newId = String(Date.now());
    setRedactions((prev) => [
      ...prev,
      {
        id: newId,
        pageIndex: 0,
        label: `Redaction Area #${prev.length + 1}`,
        x: 40,
        y: 400 - prev.length * 30,
        width: 250,
        height: 22,
      },
    ]);
  };

  const removeRedaction = (id: string) => {
    setRedactions((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRedaction = (id: string, field: keyof RedactionArea, value: any) => {
    setRedactions((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handleRedact = async () => {
    if (files.length === 0) {
      setErrorMessage('Please select a PDF file first.');
      return;
    }
    if (redactions.length === 0) {
      setErrorMessage('Please configure at least one redaction area.');
      return;
    }

    setErrorMessage('');
    setIsProcessing(true);
    setProgress(25);

    try {
      const redactedBlob = await redactPDF(files[0], redactions, (pct) => setProgress(pct));
      setResultBlob(redactedBlob);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'Error occurred while redacting PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultBlob && files[0]) {
      const baseName = files[0].name.replace(/\.pdf$/i, '');
      downloadFile(resultBlob, `${baseName}_redacted.pdf`);
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
            <EyeOff className="w-8 h-8" />
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
                title="Select confidential PDF"
                subtitle="Upload the document containing private information you need to permanently black out"
              />

              {files.length > 0 && !isProcessing && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Black Out (Redaction) Areas</h4>
                      <p className="text-xs text-gray-500">Solid opaque black rectangles will be permanently burned into the PDF</p>
                    </div>
                    <button
                      type="button"
                      onClick={addCustomRedaction}
                      className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-brand-600" />
                      <span>Add Redaction Box</span>
                    </button>
                  </div>

                  {/* Redaction Area List */}
                  <div className="space-y-3 mb-6">
                    {redactions.map((area, idx) => (
                      <div
                        key={area.id}
                        className="p-4 rounded-2xl border border-gray-200 bg-gray-50/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs">
                            {idx + 1}
                          </div>
                          <div>
                            <input
                              type="text"
                              value={area.label}
                              onChange={(e) => updateRedaction(area.id, 'label', e.target.value)}
                              className="font-bold text-sm text-gray-900 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-brand-500 outline-none"
                            />
                            <div className="text-[11px] text-gray-400 mt-0.5">
                              Page {area.pageIndex + 1} • Width: {area.width}px • Height: {area.height}px
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-black text-white">
                            Blackout
                          </span>
                          <button
                            type="button"
                            onClick={() => removeRedaction(area.id)}
                            className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                            title="Remove redaction"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 mb-6">
                    <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 leading-relaxed">
                      <strong>Irreversible Security:</strong> Redaction is permanent. Once downloaded, the covered content is destroyed from the visual stream and cannot be selected, copied, or uncovered by any software.
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleRedact}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 hover:scale-105 active:scale-95 transition-all"
                    >
                      Apply Redaction & Save PDF
                    </button>
                  </div>
                </div>
              )}

              {isProcessing && (
                <ProgressBar progress={progress} statusText="Burning solid redactions into PDF document structure..." />
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-black text-gray-900 mb-2">
                PDF Redacted Securely!
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                All selected fields have been permanently blacked out and scrubbed from the file.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Redacted PDF</span>
                </button>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Redact Another Document</span>
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
