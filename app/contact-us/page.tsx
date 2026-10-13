'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-20 bg-gray-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-brand-50 text-brand-600 mb-4 border border-brand-200">
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-950">
            Contact Support & Feedback
          </h1>
          <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">
            Have questions, feedback, or a feature request? Our engineering team is here to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Contact Details Card */}
          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Get In Touch</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                We review every inquiry and continuously release updates based on your valuable feedback.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-semibold block">Official Support</span>
                  <span className="text-xs font-bold text-gray-900">support@myilovepdf.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-semibold block">Response Time</span>
                  <span className="text-xs font-bold text-gray-900">Within 24 business hours</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-semibold block">Confidentiality</span>
                  <span className="text-xs font-bold text-gray-900">100% confidential correspondence</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="md:col-span-2 bg-white rounded-3xl border border-gray-200 p-8 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8 animate-bounce" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
                  Thank you for reaching out. A support engineer will review your message and reply via email shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-brand-50 text-brand-600 text-xs font-bold hover:bg-brand-100 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm font-semibold focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm font-semibold focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Subject
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Feature request or tool feedback"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm font-semibold focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm font-semibold focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 outline-none resize-none"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-lg shadow-brand-500/25 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    Submit Message
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
