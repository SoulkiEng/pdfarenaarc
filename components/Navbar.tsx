'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  ShieldCheck
} from 'lucide-react';
import { TOOLS } from '@/lib/toolsConfig';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
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
                  ? 'text-brand-600 bg-brand-50' 
                  : 'text-gray-700 hover:text-brand-600 hover:bg-gray-50'
              }`}
            >
              Merge PDF
            </Link>
            <Link 
              href="/split-pdf" 
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                pathname === '/split-pdf' 
                  ? 'text-brand-600 bg-brand-50' 
                  : 'text-gray-700 hover:text-brand-600 hover:bg-gray-50'
              }`}
            >
              Split PDF
            </Link>
            <Link 
              href="/compress-pdf" 
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                pathname === '/compress-pdf' 
                  ? 'text-brand-600 bg-brand-50' 
                  : 'text-gray-700 hover:text-brand-600 hover:bg-gray-50'
              }`}
            >
              Compress PDF
            </Link>
            <Link 
              href="/jpg-to-pdf" 
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                pathname === '/jpg-to-pdf' 
                  ? 'text-brand-600 bg-brand-50' 
                  : 'text-gray-700 hover:text-brand-600 hover:bg-gray-50'
              }`}
            >
              Convert to PDF
            </Link>

            {/* All Tools Mega Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button 
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg text-gray-700 hover:text-brand-600 hover:bg-gray-50 transition-all"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              >
                <span>All PDF Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180 text-brand-600' : ''}`} />
              </button>

              {/* Mega Dropdown Panel */}
              {toolsDropdownOpen && (
                <div className="absolute right-0 mt-1 w-[680px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  {TOOLS.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/${tool.slug}`}
                      onClick={() => setToolsDropdownOpen(false)}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-50/70 transition-all group"
                    >
                      <div className="p-2 rounded-lg bg-gray-50 text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 group-hover:text-brand-600 transition-colors flex items-center gap-2">
                          {tool.title}
                          {tool.badge && (
                            <span className="text-[10px] bg-red-100 text-brand-700 px-1.5 py-0.5 rounded-full font-bold">
                              {tool.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                          {tool.shortDesc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Call-To-Action & Trust Badge */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Client-Side Privacy</span>
            </div>
            <Link
              href="/"
              className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-md shadow-brand-500/25 transition-all hover:scale-105"
            >
              Explore Tools
            </Link>
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto space-y-2 animate-in slide-in-from-top duration-200">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 py-1">
            Core Tools
          </div>
          {TOOLS.map((tool) => (
            <Link
              key={tool.id}
              href={`/${tool.slug}`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-50 text-gray-800 hover:text-brand-600 text-sm font-semibold transition-colors"
            >
              <span>{tool.title}</span>
              {tool.badge && (
                <span className="text-[10px] bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full font-bold">
                  {tool.badge}
                </span>
              )}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 p-2 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg">
              <ShieldCheck className="w-4 h-4" />
              <span>Files never leave your device</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
