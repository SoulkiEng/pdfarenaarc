'use client';

import React, { useCallback, useRef } from 'react';
import { UploadCloud, File, X, Plus, AlertCircle } from 'lucide-react';

interface DropzoneProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  accept?: Record<string, string[]>;
  multiple?: boolean;
  title?: string;
  subtitle?: string;
  maxSizeMB?: number;
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export default function Dropzone({
  files,
  onFilesChange,
  accept = { 'application/pdf': ['.pdf'] },
  multiple = false,
  title = 'Select PDF files',
  subtitle = 'or drop PDF files here',
  maxSizeMB = 100,
}: DropzoneProps) {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const validateAndAddFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const validFiles: File[] = [];
      const array = Array.from(newFiles);

      for (const file of array) {
        if (file.size > maxSizeMB * 1024 * 1024) {
          alert(`File "${file.name}" exceeds the ${maxSizeMB}MB limit.`);
          continue;
        }
        validFiles.push(file);
      }

      if (validFiles.length > 0) {
        if (multiple) {
          onFilesChange([...files, ...validFiles]);
        } else {
          onFilesChange([validFiles[0]]);
        }
      }
    },
    [files, multiple, maxSizeMB, onFilesChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        validateAndAddFiles(e.dataTransfer.files);
      }
    },
    [validateAndAddFiles]
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndAddFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    onFilesChange(updated);
  };

  const acceptString = Object.values(accept).flat().join(',');

  return (
    <div className="w-full">
      {/* Hidden native input */}
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={acceptString}
        onChange={handleFileInputChange}
        className="hidden"
      />

      {files.length === 0 ? (
        /* Empty State Dropzone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative cursor-pointer rounded-3xl border-2 border-dashed p-10 sm:p-14 text-center transition-all duration-300 ${
            isDragOver
              ? 'border-brand-500 bg-brand-50/70 scale-[1.01] shadow-xl shadow-brand-500/10'
              : 'border-gray-300 hover:border-brand-400 bg-white hover:bg-gray-50/60 shadow-sm'
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 mb-5 rounded-2xl bg-gradient-to-tr from-brand-500 to-brand-400 flex items-center justify-center text-white shadow-xl shadow-brand-500/25 group-hover:scale-105 transition-transform">
              <UploadCloud className="w-10 h-10 animate-pulse-subtle" />
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-base shadow-lg shadow-brand-500/30 hover:scale-105 active:scale-95 transition-all mb-3"
            >
              {title}
            </button>

            <p className="text-sm font-medium text-gray-500">
              {subtitle}
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
              <AlertCircle className="w-4 h-4 text-emerald-500" />
              <span>Files stay safely in your browser (Never uploaded)</span>
            </div>
          </div>
        </div>
      ) : (
        /* Files Selected List State */
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-md">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
            <div>
              <h4 className="text-base font-bold text-gray-900">
                Selected Files ({files.length})
              </h4>
              <p className="text-xs text-gray-500">
                Review or reorder your documents before processing
              </p>
            </div>
            {multiple && (
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-brand-50 text-brand-600 hover:bg-brand-100 border border-brand-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add More
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[350px] overflow-y-auto pr-1">
            {files.map((file, idx) => (
              <div
                key={`${file.name}-${idx}`}
                className="group relative flex items-center gap-3 p-3 bg-gray-50 hover:bg-white rounded-xl border border-gray-200 hover:border-brand-300 transition-all shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-red-100 text-brand-600 flex items-center justify-center shrink-0 font-bold text-xs">
                  <File className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-gray-800 truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {formatBytes(file.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="w-7 h-7 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
