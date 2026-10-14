'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ToolMeta, TOOLS } from '@/lib/toolsConfig';
import { 
  CheckCircle2, 
  ChevronDown, 
  ShieldCheck, 
  Zap, 
  Lock, 
  XCircle, 
  Briefcase, 
  GraduationCap, 
  Receipt, 
  Building2,
  ArrowRight
} from 'lucide-react';
import AdBanner from './AdBanner';

interface SeoContentProps {
  tool: ToolMeta;
}

export default function SeoContent({ tool }: SeoContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Pick 4 related tools for internal linking matrix
  const relatedTools = TOOLS.filter((t) => t.id !== tool.id).slice(0, 4);

  // Generate Google Schema JSON-LD for SoftwareApplication, HowTo, and FAQPage
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: `${tool.title} - PDFArenaArc`,
        url: `https://pdfarenaarc.com/${tool.slug}`,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires modern WebAssembly compatible web browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: tool.seoDescription,
        featureList: tool.features.map((f) => f.title).join(', '),
      },
      {
        '@type': 'HowTo',
        name: `How to use ${tool.title} online`,
        description: `Follow this easy 3-step walkthrough to use ${tool.title} safely directly in your browser.`,
        step: tool.steps.map((s) => ({
          '@type': 'HowToStep',
          position: s.step,
          name: s.title,
          text: s.desc,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: tool.faqs.map((f) => ({
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
    <section className="mt-16 pt-12 border-t border-gray-150">
      {/* Inject Structured Data for SEO Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Step-by-Step Practical Guide */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Simple Walkthrough
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              How to Use {tool.title} in 3 Quick Steps
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              No technical setup, account creation, or software installation required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tool.steps.map((item) => (
              <div
                key={item.step}
                className="relative bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500 text-white font-extrabold text-lg flex items-center justify-center mb-4 shadow-md shadow-brand-500/20 group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Mid-Content AdSense Slot */}
        <AdBanner slotId="mid-content-slot" />

        {/* USP Architecture Comparison: Local WebAssembly vs Cloud Uploads */}
        <div className="my-16 bg-gradient-to-b from-gray-50/80 to-white p-6 sm:p-10 rounded-3xl border border-gray-200 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3 border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Our Core Promise</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Why In-Browser Processing Protects Your Sensitive Data
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Most online PDF converters transfer your private documents across the internet onto unknown cloud servers. Here is how PDFArenaArc is fundamentally engineered differently.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Feature / Standard</th>
                  <th className="py-3 px-4 text-emerald-700 bg-emerald-50/60 rounded-t-xl">
                    PDFArenaArc (Client-Side Wasm)
                  </th>
                  <th className="py-3 px-4 text-gray-500">
                    Typical Online PDF Sites (Cloud Uploads)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-gray-800">File Storage & Transmission</td>
                  <td className="py-3.5 px-4 text-emerald-700 bg-emerald-50/40 font-medium">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      0 bytes uploaded — stays in device RAM
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      Uploaded to remote third-party servers
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-gray-800">Processing Speed</td>
                  <td className="py-3.5 px-4 text-emerald-700 bg-emerald-50/40 font-medium">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      Instant (Hardware-accelerated locally)
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      Limited by slow upload & download queues
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-gray-800">Compliance & Confidentiality</td>
                  <td className="py-3.5 px-4 text-emerald-700 bg-emerald-50/40 font-medium">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      Safe for NDA, HIPAA, and tax records
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      Potential data leak risks during retention
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-gray-800">Usage Cost & Restrictions</td>
                  <td className="py-3.5 px-4 text-emerald-700 bg-emerald-50/40 font-medium rounded-b-xl">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      100% Free with zero paywalls or quotas
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      2 to 3 tasks per hour limit, paid tiers
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-World Industry Scenarios */}
        <div className="my-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Practical Applications
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Who Relies on This Tool Every Day?
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Designed for workflows where time matters and document confidentiality is non-negotiable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm hover:border-brand-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <Receipt className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Tax & Accounting</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Organize and compress receipts, W-2 forms, and financial statements without exposing banking details online.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm hover:border-brand-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Legal & Contracts</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Review, sign, and merge confidential agreements and NDAs while keeping files strictly on your local computer.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm hover:border-brand-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Students & Academics</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Meet strict submission size limits on Canvas, Blackboard, or portal deadlines without messy watermarks.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm hover:border-brand-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Official Filings</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Format passport, visa, and government compliance documents to exact specifications without software fees.
              </p>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions (Accordion) */}
        <div className="my-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Clear, honest answers about privacy, file safety, and performance.
            </p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {tool.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-gray-900 hover:text-brand-600 transition-colors"
                  >
                    <span className="text-base">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-gray-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-brand-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Companion Tools / Internal Linking Matrix */}
        <div className="my-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Recommended Companion Tools</h3>
              <p className="text-xs text-gray-500 mt-0.5">Complementary utilities to streamline your document workflow</p>
            </div>
            <Link
              href="/"
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group"
            >
              <span>View All 17 Tools</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((related) => (
              <Link
                key={related.id}
                href={`/${related.slug}`}
                className="p-5 rounded-2xl border border-gray-200 bg-white hover:border-brand-300 hover:shadow-md transition-all group"
              >
                <div className="font-bold text-sm text-gray-900 group-hover:text-brand-600 transition-colors mb-1">
                  {related.title}
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {related.shortDesc}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <AdBanner slotId="bottom-content-slot" />

      </div>
    </section>
  );
}
