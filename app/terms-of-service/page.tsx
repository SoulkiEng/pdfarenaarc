import React from 'react';
import type { Metadata } from 'next';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service and legal usage conditions for iLovePDF Pro Suite.',
};

export default function TermsOfServicePage() {
  return (
    <div className="py-12 sm:py-20 bg-gray-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-brand-50 text-brand-600 mb-4 border border-brand-200">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-950">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 shadow-sm space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using PDFArenaArc, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you disagree with any part of these terms, you may not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Service Description & Ownership of Files</h2>
            <p>
              Our suite provides free online document utilities. Because all document transformation happens directly within your client browser environment, you retain full and complete ownership, rights, and responsibility for any files you process using our utilities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Permitted and Lawful Use</h2>
            <p>
              You agree to use our tools exclusively for lawful purposes. You shall not use our services to create, manipulate, or distribute materials that infringe on intellectual property rights, contain malware, or violate international privacy laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Disclaimer of Warranty</h2>
            <p>
              The materials and services on PDFArenaArc are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, whether express or implied. While we strive for absolute mathematical precision in document operations, we do not warrant that our service will be uninterrupted or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Limitation of Liability</h2>
            <p>
              Under no circumstances shall PDFArenaArc, its developers, or affiliates be liable for any direct, indirect, incidental, consequential, or punitive damages resulting from your use of or inability to use this service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Modifications to Terms</h2>
            <p>
              We reserve the right to revise these Terms of Service at any time without notice. By continuing to use the service, you agree to be bound by the latest version of these terms.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
