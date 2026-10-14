'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SpecializedSolution, TOOLS } from '@/lib/toolsConfig';
import Dropzone from '@/components/Dropzone';
import ProgressBar from '@/components/ProgressBar';
import AdBanner from '@/components/AdBanner';
import { compressPDF, mergePDFs, downloadFile } from '@/lib/pdfTools';
import { 
  CheckCircle2, 
  ChevronDown, 
  ShieldCheck, 
  Download, 
  RefreshCw, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  HelpCircle,
  FileText,
  Lock,
  Layers,
  Minimize2
} from 'lucide-react';

interface SpecializedSolutionViewProps {
  solution: SpecializedSolution;
  type: 'compress' | 'merge';
}

export default function SpecializedSolutionView({ solution, type }: SpecializedSolutionViewProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ blob: Blob; originalSize?: number; newSize?: number } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleAction = async () => {
    if (files.length === 0) {
      setErrorMessage('Please select a PDF document first.');
      return;
    }
    if (type === 'merge' && files.length < 2) {
      setErrorMessage('Please select at least 2 PDF documents to combine.');
      return;
    }

    setErrorMessage('');
    setIsProcessing(true);
    setProgress(20);

    try {
      if (type === 'compress') {
        const res = await compressPDF(files[0], 'high', (pct) => setProgress(pct));
        setResult(res);
      } else {
        const mergedBlob = await mergePDFs(files, (pct) => setProgress(pct));
        setResult({ blob: mergedBlob });
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'Error occurred during processing.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result && files[0]) {
      const baseName = files[0].name.replace(/\.pdf$/i, '');
      const suffix = type === 'compress' ? '_optimized.pdf' : '_merged_tax_bundle.pdf';
      downloadFile(result.blob, `${baseName}${suffix}`);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setResult(null);
    setProgress(0);
    setErrorMessage('');
  };

  // Structured Data Schema for this specific solution page
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: solution.title,
        url: `https://pdfarenaarc.com/${solution.slug}/`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires modern WebAssembly compatible web browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: solution.seoDescription,
      },
      {
        '@type': 'FAQPage',
        mainEntity: solution.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="py-10 sm:py-16 bg-gray-50/50 min-h-screen">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Solution Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold mb-4 border border-brand-200">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>{solution.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight leading-tight">
            {solution.h1}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {solution.subtitle}
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
                multiple={type === 'merge'}
                title={type === 'merge' ? 'Select Tax & Financial PDFs' : 'Select PDF to Optimize'}
                subtitle={type === 'merge' ? 'Upload W-2, 1099, and receipt documents' : 'Choose document to reduce size for upload portals'}
              />

              {files.length > 0 && !isProcessing && (
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-gray-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Processed 100% locally in browser memory</span>
                  </div>

                  <button
                    onClick={handleAction}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 hover:scale-105 active:scale-95 transition-all"
                  >
                    {type === 'compress' ? 'Optimize Document' : 'Combine Documents'}
                  </button>
                </div>
              )}

              {isProcessing && (
                <ProgressBar
                  progress={progress}
                  statusText={type === 'compress' ? 'Compressing document streams locally...' : 'Merging files into a unified bundle...'}
                />
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-black text-gray-900 mb-2">
                Document Ready for Submission!
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                Your file has been processed locally and is optimized for portal upload limits.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Optimized PDF</span>
                </button>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Process Another File</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* AdSense Placement */}
        <AdBanner slotId="solution-middle-slot" />

        {/* Why Needed & Technical Explanation */}
        <div className="my-16 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {solution.whyNeededTitle}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
            {solution.whyNeededDesc}
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Key Quality & Privacy Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {solution.tips.map((tip, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-gray-50 border border-gray-150">
                <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-xs mb-3">
                  {idx + 1}
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{tip.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="my-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 max-w-2xl mx-auto">
            {solution.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-gray-900 hover:text-brand-600 transition-colors"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-brand-600' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100 animate-in fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Explore All Tools Banner */}
        <div className="my-12 p-8 rounded-3xl bg-gradient-to-r from-gray-900 to-gray-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Looking for another document tool?</h3>
            <p className="text-xs text-gray-400">Discover all 17 free client-side PDF utilities on PDFArenaArc</p>
          </div>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 font-bold text-xs flex items-center gap-1.5 transition-all hover:scale-105 shrink-0"
          >
            <span>Explore All 17 Tools</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
