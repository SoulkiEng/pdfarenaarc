'use client';

import React, { useState } from 'react';
import { ToolMeta } from '@/lib/toolsConfig';
import { CheckCircle2, ChevronDown, HelpCircle, Shield, Sparkles, Zap } from 'lucide-react';
import AdBanner from './AdBanner';

interface SeoContentProps {
  tool: ToolMeta;
}

export default function SeoContent({ tool }: SeoContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Generate Google Schema JSON-LD for SoftwareApplication, HowTo, and FAQPage
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: tool.title,
        operatingSystem: 'All',
        applicationCategory: 'UtilitiesApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: tool.seoDescription,
      },
      {
        '@type': 'HowTo',
        name: `How to ${tool.title}`,
        description: `Step by step guide to using the free ${tool.title} tool online.`,
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
        
        {/* Step-by-Step Guide */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Quick Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              How to {tool.title} Online in 3 Simple Steps
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              No technical expertise needed. Get perfectly formatted documents in seconds.
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

        {/* Key Features & Benefits */}
        <div className="my-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Top Advantages
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Why Use Our {tool.title} Tool?
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Engineered for uncompromising privacy, top speeds, and enterprise reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tool.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-200 shadow-sm"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions (Accordion) */}
        <div className="my-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Everything you need to know about using our {tool.title} tool.
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

        {/* Bottom Banner */}
        <AdBanner slotId="bottom-content-slot" />

      </div>
    </section>
  );
}
