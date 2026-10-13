'use client';

import React from 'react';

interface AdBannerProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'in-feed';
  className?: string;
}

export default function AdBanner({
  slotId = 'default-ad-slot',
  format = 'horizontal',
  className = '',
}: AdBannerProps) {
  // Production Google AdSense container
  // Replace data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" with your actual publisher ID once approved
  return (
    <div className={`my-8 w-full flex flex-col items-center justify-center ${className}`}>
      <span className="text-[10px] tracking-widest text-gray-400 uppercase font-semibold mb-1">
        ADVERTISEMENT
      </span>

      <div
        className={`w-full max-w-4xl bg-gradient-to-r from-gray-50 via-gray-100/70 to-gray-50 border border-dashed border-gray-200 rounded-2xl flex items-center justify-center text-center p-4 transition-all ${
          format === 'horizontal' ? 'min-h-[90px] sm:min-h-[100px]' : 'min-h-[250px]'
        }`}
      >
        {/* Placeholder for Google AdSense Script */}
        <ins
          className="adsbygoogle w-full block"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        >
          {/* Fallback preview while awaiting AdSense approval */}
          <div className="flex flex-col items-center justify-center py-2 text-gray-400">
            <span className="text-xs font-semibold text-gray-500">
              Sponsored Space / Google AdSense Responsive Unit
            </span>
            <span className="text-[11px] text-gray-400 mt-0.5">
              Optimized for high CTR & 100% Core Web Vitals friendly
            </span>
          </div>
        </ins>
      </div>
    </div>
  );
}
