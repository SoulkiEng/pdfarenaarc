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
import { TOOLS, CATEGORIES, ToolMeta } from '@/lib/toolsConfig';
import ToolCard from '@/components/ToolCard';
import AdBanner from '@/components/AdBanner';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesCategory =
        selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesSearch =
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-gray-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              Popular PDF Tools
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Showing {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} ready to use
            </p>
          </div>
          <div className="mt-3 sm:mt-0 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 self-start">
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
