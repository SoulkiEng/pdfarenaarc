'use client';

import React, { useState, useRef, useEffect } from 'react';
import { TOOLS } from '@/lib/toolsConfig';
import Dropzone from '@/components/Dropzone';
import ProgressBar from '@/components/ProgressBar';
import SeoContent from '@/components/SeoContent';
import { signPDF, downloadFile } from '@/lib/pdfTools';
import { PenTool, Download, RefreshCw, AlertCircle, CheckCircle2, Eraser, Type, Upload } from 'lucide-react';

const tool = TOOLS.find((t) => t.id === 'sign-pdf')!;

export default function SignPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [tab, setTab] = useState<'draw' | 'type' | 'upload'>('draw');
  const [typedName, setTypedName] = useState('');
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left' | 'bottom-center'>('bottom-right');
  const [pageTarget, setPageTarget] = useState<'last' | 'first'>('last');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Canvas drawing state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [uploadedSigUrl, setUploadedSigUrl] = useState<string | null>(null);

  // Initialize canvas
  useEffect(() => {
    if (tab === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [tab, files]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  // Generate signature Data URL depending on tab
  const getSignatureDataUrl = (): string | null => {
    if (tab === 'draw') {
      if (!hasDrawn || !canvasRef.current) return null;
      return canvasRef.current.toDataURL('image/png');
    } else if (tab === 'type') {
      if (!typedName.trim()) return null;
      // Render text into temporary canvas
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 400;
      tempCanvas.height = 120;
      const ctx = tempCanvas.getContext('2d')!;
      ctx.font = 'italic bold 36px "Brush Script MT", "Caveat", "Segoe Script", cursive';
      ctx.fillStyle = '#0f172a';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(typedName, 200, 60);
      return tempCanvas.toDataURL('image/png');
    } else if (tab === 'upload') {
      return uploadedSigUrl;
    }
    return null;
  };

  const handleUploadSignature = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUploadedSigUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSign = async () => {
    if (files.length === 0) {
      setErrorMessage('Please select a PDF document first.');
      return;
    }

    const sigDataUrl = getSignatureDataUrl();
    if (!sigDataUrl) {
      setErrorMessage('Please draw, type, or upload your signature before proceeding.');
      return;
    }

    setErrorMessage('');
    setIsProcessing(true);
    setProgress(25);

    try {
      const pageNum = pageTarget === 'first' ? 1 : 999999;
      const signedBlob = await signPDF(
        files[0],
        sigDataUrl,
        {
          presetPosition: position,
          pageNumber: pageNum,
        },
        (pct) => setProgress(pct)
      );
      setResultBlob(signedBlob);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'Error occurred while signing PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultBlob && files[0]) {
      const baseName = files[0].name.replace(/\.pdf$/i, '');
      downloadFile(resultBlob, `${baseName}_signed.pdf`);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setResultBlob(null);
    setProgress(0);
    setErrorMessage('');
    clearCanvas();
    setTypedName('');
    setUploadedSigUrl(null);
  };

  return (
    <div className="py-10 sm:py-16 bg-gray-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-brand-50 text-brand-600 mb-4 border border-brand-200">
            <PenTool className="w-8 h-8" />
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
                title="Select PDF file to sign"
                subtitle="Upload the agreement, contract, or form you wish to sign"
              />

              {files.length > 0 && !isProcessing && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  
                  {/* Signature Mode Switcher */}
                  <div className="flex border-b border-gray-200 mb-6">
                    <button
                      type="button"
                      onClick={() => setTab('draw')}
                      className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${
                        tab === 'draw'
                          ? 'border-brand-500 text-brand-600'
                          : 'border-transparent text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <PenTool className="w-4 h-4" />
                      <span>Draw Signature</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTab('type')}
                      className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${
                        tab === 'type'
                          ? 'border-brand-500 text-brand-600'
                          : 'border-transparent text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <Type className="w-4 h-4" />
                      <span>Type Name</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTab('upload')}
                      className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${
                        tab === 'upload'
                          ? 'border-brand-500 text-brand-600'
                          : 'border-transparent text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload Image</span>
                    </button>
                  </div>

                  {/* Draw Tab */}
                  {tab === 'draw' && (
                    <div className="mb-6">
                      <div className="relative border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50/50 p-2 overflow-hidden touch-none">
                        <canvas
                          ref={canvasRef}
                          width={600}
                          height={160}
                          className="w-full h-40 bg-white rounded-xl cursor-crosshair shadow-inner"
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                          onTouchStart={startDrawing}
                          onTouchMove={draw}
                          onTouchEnd={stopDrawing}
                        />
                        <button
                          type="button"
                          onClick={clearCanvas}
                          className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold flex items-center gap-1 shadow-sm transition-colors"
                        >
                          <Eraser className="w-3.5 h-3.5" />
                          <span>Clear</span>
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-2 text-center">
                        Use mouse, touchpad, or finger on touchscreen to sign above.
                      </p>
                    </div>
                  )}

                  {/* Type Tab */}
                  {tab === 'type' && (
                    <div className="mb-6">
                      <input
                        type="text"
                        value={typedName}
                        onChange={(e) => setTypedName(e.target.value)}
                        placeholder="Type your full legal name..."
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-base font-medium focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none"
                      />
                      {typedName && (
                        <div className="mt-4 p-6 bg-gray-50 rounded-2xl border border-gray-200 text-center">
                          <span className="font-serif italic text-3xl text-gray-800">
                            {typedName}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Upload Tab */}
                  {tab === 'upload' && (
                    <div className="mb-6">
                      <label className="block border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <span className="text-sm font-bold text-gray-700 block">
                          Upload Transparent PNG or JPG Signature
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleUploadSignature}
                          className="hidden"
                        />
                      </label>
                      {uploadedSigUrl && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-200 flex justify-center">
                          <img src={uploadedSigUrl} alt="Signature Preview" className="max-h-20 object-contain" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Positioning & Placement */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Placement Position
                      </label>
                      <select
                        value={position}
                        onChange={(e: any) => setPosition(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:border-brand-500 outline-none"
                      >
                        <option value="bottom-right">Bottom Right (Standard)</option>
                        <option value="bottom-left">Bottom Left</option>
                        <option value="bottom-center">Bottom Center</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Apply to Page
                      </label>
                      <select
                        value={pageTarget}
                        onChange={(e: any) => setPageTarget(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:border-brand-500 outline-none"
                      >
                        <option value="last">Last Page (Contract Signature Page)</option>
                        <option value="first">First Page (Cover / First Sheet)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSign}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 hover:scale-105 active:scale-95 transition-all"
                    >
                      Sign & Apply Stamp
                    </button>
                  </div>

                </div>
              )}

              {isProcessing && (
                <ProgressBar progress={progress} statusText="Embedding legal signature stamp into PDF..." />
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-black text-gray-900 mb-2">
                Document Signed Successfully!
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                Your signature has been permanently embedded into the PDF with 100% privacy.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Signed PDF</span>
                </button>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Sign Another Document</span>
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
