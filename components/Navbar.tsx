'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  FileText, 
  Menu, 
  X, 
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
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Printer,
  PenTool,
  EyeOff,
  Image as ImageIcon,
  FileType,
  ArrowRight
} from 'lucide-react';
import { TOOLS } from '@/lib/toolsConfig';

interface MegaCategory {
  title: string;
  items: {
    title: string;
    slug: string;
    icon: React.ComponentType<{ className?: string }>;
    iconColor: string;
    badge?: string;
  }[];
}

const MEGA_CATEGORIES: MegaCategory[] = [
  {
    title: 'ORGANIZE PDF',
    items: [
      { title: 'Merge PDF', slug: 'merge-pdf', icon: Layers, iconColor: 'text-red-500 bg-red-50', badge: 'Popular' },
      { title: 'Split PDF', slug: 'split-pdf', icon: Scissors, iconColor: 'text-red-500 bg-red-50' },
      { title: 'Organize PDF', slug: 'organize-pdf', icon: Grid, iconColor: 'text-red-500 bg-red-50' },
    ],
  },
  {
    title: 'OPTIMIZE PDF',
    items: [
      { title: 'Compress PDF', slug: 'compress-pdf', icon: Minimize2, iconColor: 'text-emerald-600 bg-emerald-50', badge: 'Top Tool' },
      { title: 'Grayscale PDF', slug: 'grayscale-pdf', icon: Printer, iconColor: 'text-slate-600 bg-slate-100', badge: 'Eco' },
    ],
  },
  {
    title: 'CONVERT TO PDF',
    items: [
      { title: 'JPG to PDF', slug: 'jpg-to-pdf', icon: FileImage, iconColor: 'text-amber-500 bg-amber-50', badge: 'Popular' },
      { title: 'Word to PDF', slug: 'word-to-pdf', icon: FileText, iconColor: 'text-blue-600 bg-blue-50' },
    ],
  },
  {
    title: 'CONVERT FROM PDF',
    items: [
      { title: 'PDF to Word', slug: 'pdf-to-word', icon: FileText, iconColor: 'text-blue-600 bg-blue-50', badge: 'Editable' },
      { title: 'PDF to JPG', slug: 'pdf-to-jpg', icon: ImageIcon, iconColor: 'text-amber-500 bg-amber-50' },
      { title: 'PDF to Text', slug: 'pdf-to-text', icon: FileType, iconColor: 'text-teal-600 bg-teal-50' },
    ],
  },
  {
    title: 'EDIT & SIGN',
    items: [
      { title: 'Rotate PDF', slug: 'rotate-pdf', icon: RotateCw, iconColor: 'text-purple-600 bg-purple-50' },
      { title: 'Page Numbers', slug: 'page-numbers', icon: Hash, iconColor: 'text-purple-600 bg-purple-50' },
      { title: 'Watermark PDF', slug: 'watermark-pdf', icon: Stamp, iconColor: 'text-purple-600 bg-purple-50' },
      { title: 'Sign PDF', slug: 'sign-pdf', icon: PenTool, iconColor: 'text-purple-600 bg-purple-50', badge: 'Top' },
    ],
  },
  {
    title: 'PDF SECURITY',
    items: [
      { title: 'Unlock PDF', slug: 'unlock-pdf', icon: Unlock, iconColor: 'text-indigo-600 bg-indigo-50' },
      { title: 'Protect PDF', slug: 'protect-pdf', icon: Lock, iconColor: 'text-indigo-600 bg-indigo-50' },
      { title: 'Redact PDF', slug: 'redact-pdf', icon: EyeOff, iconColor: 'text-rose-600 bg-rose-50', badge: 'Secure' },
    ],
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Handle smooth scrolling or navigation for Explore Tools
  const handleExploreTools = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setToolsDropdownOpen(false);
    setMobileMenuOpen(false);

    if (pathname === '/') {
      const el = document.getElementById('tools-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push('/#tools-section');
    }
  };

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setToolsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setToolsDropdownOpen(false);
    }, 150);
  };

  useEffect(() => {
    setToolsDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-gray-150 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/30 group-hover:scale-105 transition-transform duration-300">
              <FileText className="w-6 h-6 animate-pulse-subtle" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 group-hover:text-brand-600 transition-colors">
                PDF<span className="text-brand-500">Arena</span>Arc<span className="text-xs ml-1 font-semibold px-1.5 py-0.5 rounded bg-brand-50 text-brand-600 border border-brand-200">PRO</span>
              </span>
              <span className="text-[10px] text-gray-400 font-medium tracking-wider -mt-1 hidden sm:block">
                100% PRIVATE & FAST PDF TOOLS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link 
              href="/merge-pdf" 
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                pathname === '/merge-pdf' 
                  ? 'text-brand-600 bg-brand-50 font-bold' 
                  : 'text-gray-700 hover:text-brand-600 hover:bg-gray-50'
              }`}
            >
              Merge PDF
            </Link>
            <Link 
              href="/split-pdf" 
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                pathname === '/split-pdf' 
                  ? 'text-brand-600 bg-brand-50 font-bold' 
                  : 'text-gray-700 hover:text-brand-600 hover:bg-gray-50'
              }`}
            >
              Split PDF
            </Link>
            <Link 
              href="/compress-pdf" 
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                pathname === '/compress-pdf' 
                  ? 'text-brand-600 bg-brand-50 font-bold' 
                  : 'text-gray-700 hover:text-brand-600 hover:bg-gray-50'
              }`}
            >
              Compress PDF
            </Link>
            <Link 
              href="/jpg-to-pdf" 
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                pathname === '/jpg-to-pdf' 
                  ? 'text-brand-600 bg-brand-50 font-bold' 
                  : 'text-gray-700 hover:text-brand-600 hover:bg-gray-50'
              }`}
            >
              Convert to PDF
            </Link>

            {/* All PDF Tools Mega Menu Trigger */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                type="button"
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold rounded-lg transition-all cursor-pointer ${
                  toolsDropdownOpen 
                    ? 'text-brand-600 bg-brand-50' 
                    : 'text-gray-800 hover:text-brand-600 hover:bg-gray-50'
                }`}
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                aria-expanded={toolsDropdownOpen}
              >
                <span>All PDF Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180 text-brand-600' : ''}`} />
              </button>
            </div>
          </nav>

          {/* Right Call-To-Action & Trust Badge */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero Server Uploads</span>
            </div>
            <a
              href="/#tools-section"
              onClick={handleExploreTools}
              className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-md shadow-brand-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Explore Tools
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-brand-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* iLovePDF-Style Horizontal Mega Dropdown Menu */}
      {toolsDropdownOpen && (
        <div 
          className="hidden lg:block absolute left-0 right-0 top-full w-full bg-white border-b border-gray-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-200"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
            {/* 6 Category Columns */}
            <div className="grid grid-cols-6 gap-6 xl:gap-8">
              {MEGA_CATEGORIES.map((category) => (
                <div key={category.title} className="flex flex-col">
                  {/* Category Header */}
                  <h4 className="text-[11px] font-black tracking-wider text-gray-400 uppercase mb-3 pb-1 border-b border-gray-100 flex items-center justify-between">
                    <span>{category.title}</span>
                  </h4>

                  {/* Category Items */}
                  <div className="space-y-1">
                    {category.items.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <Link
                          key={item.slug}
                          href={`/${item.slug}`}
                          onClick={() => setToolsDropdownOpen(false)}
                          className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg text-gray-700 hover:text-brand-600 hover:bg-brand-50/60 transition-all group"
                        >
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${item.iconColor}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-semibold tracking-tight text-gray-800 group-hover:text-brand-600 transition-colors">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="ml-auto text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-red-100 text-brand-600 leading-tight">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Solutions Ribbon */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-gray-500 font-medium">
                <span className="font-bold text-gray-800 uppercase tracking-wider text-[10px] bg-gray-100 px-2 py-0.5 rounded">
                  Popular Solutions
                </span>
                <Link href="/compress-pdf-to-200kb" onClick={() => setToolsDropdownOpen(false)} className="hover:text-brand-600 transition-colors">
                  Compress to 200KB
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/compress-pdf-to-100kb" onClick={() => setToolsDropdownOpen(false)} className="hover:text-brand-600 transition-colors">
                  Compress to 100KB
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/compress-pdf-for-us-visa" onClick={() => setToolsDropdownOpen(false)} className="hover:text-brand-600 transition-colors">
                  US Visa Support
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/merge-pdf-for-tax-filing" onClick={() => setToolsDropdownOpen(false)} className="hover:text-brand-600 transition-colors">
                  Tax Filing Merger
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/compress-pdf-for-email" onClick={() => setToolsDropdownOpen(false)} className="hover:text-brand-600 transition-colors">
                  Email 25MB Limit
                </Link>
              </div>

              <a
                href="/#tools-section"
                onClick={handleExploreTools}
                className="inline-flex items-center gap-1 font-bold text-brand-600 hover:text-brand-700 transition-colors"
              >
                <span>View all 17 tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-8 max-h-[85vh] overflow-y-auto space-y-4 animate-in slide-in-from-top duration-200">
          <div className="space-y-4">
            {MEGA_CATEGORIES.map((category) => (
              <div key={category.title}>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-2 pb-1.5 border-b border-gray-100 mb-2">
                  {category.title}
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {category.items.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.slug}
                        href={`/${item.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-brand-50 text-gray-800 hover:text-brand-600 text-sm font-semibold transition-colors"
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.iconColor}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto text-[10px] bg-red-100 text-brand-700 px-2 py-0.5 rounded-full font-bold">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100">
            <a
              href="/#tools-section"
              onClick={handleExploreTools}
              className="w-full flex items-center justify-center gap-2 py-3 bg-brand-500 text-white rounded-xl font-bold text-sm shadow-md shadow-brand-500/20"
            >
              <span>Explore All PDF Tools</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
