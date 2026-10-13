import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Shield, Heart, Cpu, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our mission to provide completely free, private, and client-side online PDF processing tools for everyone.',
};

export default function AboutUsPage() {
  return (
    <div className="py-12 sm:py-20 bg-gray-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-brand-50 text-brand-600 mb-4 border border-brand-200">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-950">
            About PDFArenaArc
          </h1>
          <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">
            Democratizing document productivity with uncompromising privacy and zero subscription barriers.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 shadow-sm space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
          
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-4">Our Mission</h2>
            <p>
              Every day, millions of students, lawyers, healthcare workers, accountants, and freelancers need to merge agreements, sign documents, split pages, or reduce file sizes. Unfortunately, most conventional PDF software either demands exorbitant monthly fees or uploads private documents to unknown cloud servers.
            </p>
            <p className="mt-4">
              We founded <strong>PDFArenaArc</strong> with a clear, uncompromising vision: <em>Make professional-grade document tools 100% free, lightning fast, and natively private for everyone around the world.</em>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="p-6 rounded-2xl bg-brand-50/50 border border-brand-100">
              <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">Decentralized Privacy</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We believe your documents belong to you. By harnessing modern WebAssembly and HTML5 APIs, your files are processed right inside your browser window without uploading anywhere.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">Instant Performance</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                No artificial queue waiting times, no upload bandwidth delays, and no file limit paywalls. Experience instantaneous local execution.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-4">How We Keep the Platform Free</h2>
            <p>
              We maintain and update this suite through unintrusive, policy-compliant Google AdSense sponsorships and user recommendations. This allows us to offer 100% free tools to millions of users worldwide without requiring credit cards, recurring fees, or account registrations.
            </p>
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">Ready to boost your document productivity?</span>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700"
            >
              Explore All Tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
