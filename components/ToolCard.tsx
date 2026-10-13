'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Layers, 
  Scissors, 
  Minimize2, 
  FileImage, 
  RotateCw, 
  Stamp, 
  Hash, 
  Lock, 
  Unlock, 
  Grid, 
  FileText,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ToolMeta } from '@/lib/toolsConfig';

const iconMap: Record<string, React.ElementType> = {
  Layers,
  Scissors,
  Minimize2,
  FileImage,
  RotateCw,
  Stamp,
  Hash,
  Lock,
  Unlock,
  Grid,
  FileText,
};

interface ToolCardProps {
  tool: ToolMeta;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const IconComponent = iconMap[tool.icon] || FileText;

  return (
    <Link
      href={`/${tool.slug}`}
      className="group relative flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-150 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-6px_rgba(229,50,45,0.15)] hover:border-brand-200 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
    >
      {/* Top Background Ambient Glow */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br from-brand-100/60 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-brand-500/30 group-hover:scale-110">
            <IconComponent className="w-6 h-6" />
          </div>
          {tool.badge && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
              <Sparkles className="w-3 h-3 text-brand-500" />
              {tool.badge}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-2">
          {tool.title}
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
          {tool.shortDesc}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-400 group-hover:text-brand-600 transition-colors">
        <span className="uppercase tracking-wider text-[10px]">{tool.category}</span>
        <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Try Tool <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
