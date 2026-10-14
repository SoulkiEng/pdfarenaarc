'use client';

import React, { useEffect } from 'react';

interface AdBannerProps {
  slotId?: string;
  clientId?: string;
  format?: 'horizontal' | 'rectangle' | 'in-feed';
  className?: string;
}

export default function AdBanner({
  slotId,
  clientId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID,
  format = 'horizontal',
  className = '',
}: AdBannerProps) {
  // Only render when a real AdSense client ID is provided
  // This ensures 100% clean review during Google AdSense approval without placeholder warnings
  useEffect(() => {
    if (clientId && slotId && typeof window !== 'undefined') {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // Ignore duplicate ad requests
      }
    }
  }, [clientId, slotId]);

  if (!clientId || !slotId) {
    return null;
  }

  return (
    <div className={`my-8 w-full flex flex-col items-center justify-center ${className}`}>
      <span className="text-[10px] tracking-widest text-gray-400 uppercase font-semibold mb-1">
        ADVERTISEMENT
      </span>

      <div
        className={`w-full max-w-4xl bg-gray-50/50 border border-gray-100 rounded-2xl flex items-center justify-center text-center p-2 overflow-hidden ${
          format === 'horizontal' ? 'min-h-[90px] sm:min-h-[100px]' : 'min-h-[250px]'
        }`}
      >
        <ins
          className="adsbygoogle w-full block"
          style={{ display: 'block' }}
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
