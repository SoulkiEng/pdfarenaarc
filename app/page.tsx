'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Globe2, 
  Cpu, 
  ArrowRight,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { TOOLS, SPECIALIZED_SOLUTIONS, CATEGORIES, ToolMeta } from '@/lib/toolsConfig';
import ToolCard from '@/components/ToolCard';
import AdBanner from '@/components/AdBanner';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allTools: ToolMeta[] = useMemo(() => {
    const mappedSpecialized: ToolMeta[] = SPECIALIZED_SOLUTIONS.map((sol) => ({
      id: sol.id,
      slug: sol.slug,
      title: sol.title,
      shortDesc: sol.shortDesc,
      category: sol.slug.startsWith('merge-') ? 'organize' : 'optimize',
      icon: sol.slug.startsWith('merge-') ? 'Layers' : 'Minimize2',
      badge: sol.badge,
      seoTitle: sol.seoTitle,
      seoDescription: sol.seoDescription,
      keywords: sol.keywords,
      steps: [],
      faqs: sol.faqs,
      features: sol.tips,
    }));
    return [...TOOLS, ...mappedSpecialized];
  }, []);

  const filteredTools = useMemo(() => {
    return allTools.filter((tool) => {
      const matchesCategory =
        selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesSearch =
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [allTools, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-20 bg-gradient-to-b from-brand-50/40 via-white to-gray-50/60 border-b border-gray-150">
        
        {/* Ambient background blur circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-red-200/40 via-brand-200/30 to-amber-100/30 blur-3xl rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-brand-200/70 text-xs font-bold text-brand-600 mb-6 hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-brand-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>The #1 WebAssembly Powered PDF Suite</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Every tool you need to work with PDFs,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-red-500">
              100% Free & Private.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Merge, split, compress, convert, rotate, watermark, and protect your PDF documents in seconds. Processed entirely in your browser—zero server uploads, zero data risks.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search tools (e.g. merge, compress, split, convert)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-gray-200 shadow-sm focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all text-sm font-medium text-gray-800 placeholder-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-bold text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    active
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30 scale-105'
                      : 'bg-white text-gray-600 hover:text-brand-600 hover:bg-brand-50/50 border border-gray-200/70 shadow-sm'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* Main Tools Grid Section */}
      <section id="tools-section" className="scroll-mt-24 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-gray-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              Popular PDF Tools
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Showing {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} ready to use
            </p>
          </div>

          {/* Center Luxury Chrome Extension 4.8★ Review & Safe Privacy Badge */}
          <a
            href="https://chromewebstore.google.com/detail/pdfarenaarc-free-private/ihmkmfeppmeccbmkjkfgjphjaggbdmhn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3.5 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white border border-amber-400/30 shadow-lg shadow-slate-900/10 hover:shadow-amber-500/15 hover:border-amber-400/60 transition-all duration-300 hover:scale-[1.02] group self-start lg:self-center"
          >
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 2C8.6 2 5.6 3.7 3.8 6.4L7.9 13.5C8.3 10.5 10.8 8.2 13.8 8.2H21.5C20.1 4.5 16.4 2 12 2Z"/>
                <path fill="#4285F4" d="M21.5 8.2H13.8C14.7 9.8 14.8 11.7 14.1 13.3L10 20.4C10.7 20.5 11.3 20.6 12 20.6C16.9 20.6 21 17.1 21.9 12.4C22.1 11 22 9.6 21.5 8.2Z"/>
                <path fill="#FBBC05" d="M12 20.6C9.6 20.6 7.4 19.4 6 17.5L2.4 11.2C2.1 11.8 2 12.4 2 13.1C2 18.2 5.9 22.4 11 22.6L14.1 17.3C13.5 19.3 12.8 20.6 12 20.6Z"/>
                <circle cx="12" cy="12" r="4.2" fill="#FFFFFF"/>
                <circle cx="12" cy="12" r="3.2" fill="#1A73E8"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-amber-400 text-xs tracking-tight">★★★★★</span>
                <span className="text-xs font-black text-white">4.8 / 5.0</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  100% Privacy Safe
                </span>
              </div>
              <span className="text-[11px] text-gray-300 font-medium group-hover:text-white transition-colors">
                Official Chrome Extension • Zero Cloud Uploads
              </span>
            </div>
          </a>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 self-start lg:self-center">
            <ShieldCheck className="w-4 h-4" />
            <span>Files never leave your computer</span>
          </div>
        </div>

        {/* Tools Cards Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8">
            <p className="text-base font-bold text-gray-700">No PDF tools found matching &quot;{searchQuery}&quot;</p>
            <p className="text-sm text-gray-400 mt-1">Try searching for &quot;merge&quot;, &quot;split&quot;, or &quot;compress&quot;.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-brand-50 text-brand-600 font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* AdSense Responsive Placement */}
        <AdBanner slotId="homepage-middle-slot" />

      </section>

      {/* Feature & Security Section */}
      <section className="py-16 bg-white border-y border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3.5 py-1 rounded-full uppercase tracking-wider">
              Privacy First Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mt-3">
              Why We Are The Safest Online PDF Solution
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Unlike traditional PDF websites that upload your files to foreign servers, our tools operate directly inside your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-8 rounded-3xl bg-gray-50/70 border border-gray-200/80 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Zero Server Storage</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Your private agreements, tax documents, and personal IDs never leave your device. Processing is executed via client-side WebAssembly.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gray-50/70 border border-gray-200/80 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Conversions</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                No waiting in queue or uploading huge 100MB files over slow connections. Operations complete in milliseconds locally.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gray-50/70 border border-gray-200/80 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No Registration or Limits</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Enjoy unlimited document operations without credit cards, email signups, or hourly throttling. 100% free forever.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Chrome Extension Modern Showcase Section */}
      <section id="extension-section" className="scroll-mt-24 py-16 bg-gray-50 border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 text-white p-8 sm:p-12 lg:p-16 border border-gray-800 shadow-2xl">
            
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Copy & Actions */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-white backdrop-blur-md">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 2C8.6 2 5.6 3.7 3.8 6.4L7.9 13.5C8.3 10.5 10.8 8.2 13.8 8.2H21.5C20.1 4.5 16.4 2 12 2Z"/>
                    <path fill="#4285F4" d="M21.5 8.2H13.8C14.7 9.8 14.8 11.7 14.1 13.3L10 20.4C10.7 20.5 11.3 20.6 12 20.6C16.9 20.6 21 17.1 21.9 12.4C22.1 11 22 9.6 21.5 8.2Z"/>
                    <path fill="#FBBC05" d="M12 20.6C9.6 20.6 7.4 19.4 6 17.5L2.4 11.2C2.1 11.8 2 12.4 2 13.1C2 18.2 5.9 22.4 11 22.6L14.1 17.3C13.5 19.3 12.8 20.6 12 20.6Z"/>
                    <circle cx="12" cy="12" r="4.2" fill="#FFFFFF"/>
                    <circle cx="12" cy="12" r="3.2" fill="#1A73E8"/>
                  </svg>
                  <span>OFFICIAL CHROME EXTENSION</span>
                  <span className="text-[10px] bg-brand-500 text-white px-2 py-0.5 rounded-full font-black">100% FREE</span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Work 10x Faster with the{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-rose-300 to-red-400">
                    PDFArenaArc Extension
                  </span>
                </h2>

                {/* Subtitle */}
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
                  Never leave your active tab or search Google again. Access Merge, Compress under 200KB, E-Sign, and Redaction with a single click right from your browser toolbar.
                </p>

                {/* Feature checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>1-Click toolbar quick launch</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>100% In-browser offline privacy</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Instant drag & drop workspace</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Free forever, zero registration</span>
                  </div>
                </div>

                {/* Action Buttons & Chrome Store Direct Link */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  <a
                    href="https://chromewebstore.google.com/detail/pdfarenaarc-free-private/ihmkmfeppmeccbmkjkfgjphjaggbdmhn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer group"
                  >
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12 2C8.6 2 5.6 3.7 3.8 6.4L7.9 13.5C8.3 10.5 10.8 8.2 13.8 8.2H21.5C20.1 4.5 16.4 2 12 2Z"/>
                      <path fill="#4285F4" d="M21.5 8.2H13.8C14.7 9.8 14.8 11.7 14.1 13.3L10 20.4C10.7 20.5 11.3 20.6 12 20.6C16.9 20.6 21 17.1 21.9 12.4C22.1 11 22 9.6 21.5 8.2Z"/>
                      <path fill="#FBBC05" d="M12 20.6C9.6 20.6 7.4 19.4 6 17.5L2.4 11.2C2.1 11.8 2 12.4 2 13.1C2 18.2 5.9 22.4 11 22.6L14.1 17.3C13.5 19.3 12.8 20.6 12 20.6Z"/>
                      <circle cx="12" cy="12" r="4.2" fill="#FFFFFF"/>
                      <circle cx="12" cy="12" r="3.2" fill="#1A73E8"/>
                    </svg>
                    <span>Add to Chrome - Free</span>
                  </a>
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Official Google Chrome Web Store Verified</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Visual Mockup of Extension Popup */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm rounded-2xl bg-white text-gray-900 p-5 shadow-2xl border border-gray-100 transform lg:rotate-1 hover:rotate-0 transition-transform duration-300">
                  
                  {/* Extension Mockup Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-brand-500 text-white flex items-center justify-center text-xs font-black shadow-sm">
                        PDF
                      </div>
                      <span className="text-sm font-black text-gray-900">
                        PDF<span className="text-brand-600">Arena</span>Arc
                      </span>
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                      ● Offline
                    </span>
                  </div>

                  {/* Mockup Search */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs text-gray-400 flex items-center gap-2 mb-3">
                    <Search className="w-3.5 h-3.5 text-gray-400" />
                    <span>Search tool (compress, sign, merge)...</span>
                  </div>

                  {/* Mockup Tools Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="p-2 rounded-lg border border-gray-100 bg-gray-50/50 flex items-center gap-2">
                      <span className="text-base">⚡</span>
                      <div>
                        <div className="text-[11px] font-bold text-gray-900">Compress PDF</div>
                        <div className="text-[9px] text-gray-500">Under 200KB</div>
                      </div>
                    </div>
                    <div className="p-2 rounded-lg border border-gray-100 bg-gray-50/50 flex items-center gap-2">
                      <span className="text-base">📑</span>
                      <div>
                        <div className="text-[11px] font-bold text-gray-900">Merge PDF</div>
                        <div className="text-[9px] text-gray-500">Combine files</div>
                      </div>
                    </div>
                    <div className="p-2 rounded-lg border border-gray-100 bg-gray-50/50 flex items-center gap-2">
                      <span className="text-base">✍️</span>
                      <div>
                        <div className="text-[11px] font-bold text-gray-900">Sign PDF</div>
                        <div className="text-[9px] text-gray-500">Draw & e-sign</div>
                      </div>
                    </div>
                    <div className="p-2 rounded-lg border border-gray-100 bg-gray-50/50 flex items-center gap-2">
                      <span className="text-base">🛡️</span>
                      <div>
                        <div className="text-[11px] font-bold text-gray-900">Redact PDF</div>
                        <div className="text-[9px] text-gray-500">Black out text</div>
                      </div>
                    </div>
                  </div>

                  {/* Mockup Dropzone */}
                  <div className="border border-dashed border-gray-200 rounded-xl p-3 text-center bg-brand-50/30">
                    <div className="text-[11px] font-bold text-brand-700">Drop PDF here to open tool</div>
                    <div className="text-[9px] text-gray-400">Zero cloud uploads guaranteed</div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Global Audience & Compliance Banner */}
      <section className="py-14 bg-gradient-to-b from-gray-900 to-gray-950 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            Trusted by Professionals Worldwide
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto mb-8">
            Engineered to comply with strict international privacy regulations including GDPR, CCPA, and ISO standards.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-sm font-semibold text-gray-300">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              GDPR Compliant
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              End-to-End Local Processing
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Zero Logs Kept
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ISO 27001 Architecture
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
