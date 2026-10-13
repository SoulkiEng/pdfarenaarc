import React from 'react';
import Link from 'next/link';
import { FileText, Shield, Zap, Lock, Heart } from 'lucide-react';
import { TOOLS } from '@/lib/toolsConfig';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-gray-800">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-850/60 border border-gray-800">
            <div className="p-3 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-1">100% Client-Side Privacy</h4>
              <p className="text-sm text-gray-400">
                Your PDF documents are processed directly in your browser. No files are uploaded to our servers or stored anywhere.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-850/60 border border-gray-800">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-1">Blazing Fast Performance</h4>
              <p className="text-sm text-gray-400">
                Instant conversions and document manipulations powered by advanced WebAssembly and modern browser engines.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-850/60 border border-gray-850">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-1">Free Forever & Unlimited</h4>
              <p className="text-sm text-gray-400">
                No subscription paywalls, no signup walls, and no hidden file size throttles. Free forever for everyone.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-12 border-b border-gray-800">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white font-black shadow-md">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white">
                PDF<span className="text-brand-500">Arena</span>Arc<span className="text-xs ml-1 text-brand-400">PRO</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm mb-6 leading-relaxed">
              Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock, and watermark PDFs in seconds.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-brand-500 fill-brand-500 inline" />
              <span>for document productivity worldwide.</span>
            </div>
          </div>

          {/* Tools Column 1 */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Organize & Optimize
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/merge-pdf" className="hover:text-brand-400 transition-colors">
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link href="/split-pdf" className="hover:text-brand-400 transition-colors">
                  Split PDF
                </Link>
              </li>
              <li>
                <Link href="/compress-pdf" className="hover:text-brand-400 transition-colors">
                  Compress PDF
                </Link>
              </li>
              <li>
                <Link href="/organize-pdf" className="hover:text-brand-400 transition-colors">
                  Organize PDF
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools Column 2 */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Edit & Convert
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/jpg-to-pdf" className="hover:text-brand-400 transition-colors">
                  JPG to PDF
                </Link>
              </li>
              <li>
                <Link href="/rotate-pdf" className="hover:text-brand-400 transition-colors">
                  Rotate PDF
                </Link>
              </li>
              <li>
                <Link href="/watermark-pdf" className="hover:text-brand-400 transition-colors">
                  Watermark PDF
                </Link>
              </li>
              <li>
                <Link href="/page-numbers" className="hover:text-brand-400 transition-colors">
                  Page Numbers
                </Link>
              </li>
              <li>
                <Link href="/pdf-to-text" className="hover:text-brand-400 transition-colors">
                  PDF to Text
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance (Crucial for AdSense) */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Company & Legal
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about-us" className="hover:text-brand-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-brand-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-brand-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-brand-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} PDFArenaArc Suite. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-gray-300 transition-colors">Terms</Link>
            <Link href="/contact-us" className="hover:text-gray-300 transition-colors">Support</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
