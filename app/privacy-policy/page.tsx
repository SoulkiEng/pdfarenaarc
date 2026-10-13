import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck, Lock, EyeOff, ServerOff } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy commitment: zero server storage, 100% client-side PDF processing, and Google AdSense cookie transparency.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 sm:py-20 bg-gray-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-brand-50 text-brand-600 mb-4 border border-brand-200">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-950">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 shadow-sm space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
          
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <ServerOff className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-sm font-semibold text-emerald-800">
              Fundamental Guarantee: Your PDF documents and image files NEVER leave your browser. All conversions, merging, and cryptographic operations are executed locally using client-side WebAssembly.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Do Not Collect</h2>
            <p>
              We do not inspect, intercept, process, copy, or retain any files you manipulate on PDFArenaArc. When you select a document or image, your web browser downloads the processing library and completes the operation entirely within your computer’s local sandbox memory.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Web Analytics and Log Data</h2>
            <p>
              Like almost all websites, we automatically gather standard web log parameters through privacy-respecting analytics tools. This includes browser type, device resolution, language settings, and general country location to help us optimize system compatibility.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Google AdSense & Third-Party Advertising</h2>
            <p>
              We partner with Google AdSense to display advertisements when you visit our website. Google, as a third-party vendor, uses cookies to serve ads based on your prior visits to our site or other websites on the internet.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-sm text-gray-600">
              <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visits to this site and/or other sites on the Internet.</li>
              <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline font-semibold">Google Ads Settings</a>.</li>
              <li>Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline font-semibold">www.aboutads.info</a>.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Cookies and Local Storage</h2>
            <p>
              We use local browser storage strictly to remember your preferences (such as cookie acknowledgment and tool interface preferences). No personal data or file contents are stored in browser cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. GDPR and CCPA Compliance</h2>
            <p>
              Because our architecture is 100% decentralized and local, we do not store personal identification data (PII) or user documents. You retain full ownership, sovereignty, and copyright over all files processed through our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Contacting Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy or our security infrastructure, please contact us through our official <a href="/contact-us" className="text-brand-600 underline font-semibold">Contact Us</a> page.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
