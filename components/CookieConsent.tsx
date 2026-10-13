'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, ShieldCheck } from 'lucide-react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent_accepted');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent_accepted', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 shrink-0">
          <Cookie className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-gray-900 mb-1">
            We value your privacy
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed mb-4">
            We use essential cookies to provide local PDF processing and analyze anonymous traffic to improve our services and display relevant ads through Google AdSense. See our{' '}
            <Link href="/privacy-policy" className="text-brand-600 underline hover:text-brand-700">
              Privacy Policy
            </Link>.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={acceptCookies}
              className="flex-1 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all hover:scale-[1.02]"
            >
              Accept All Cookies
            </button>
            <button
              onClick={() => setShow(false)}
              className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
