import React from 'react';
import { Sparkles, FileText, Key, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Navbar({ 
  backendStatus, 
  onOpenApiKeyModal, 
  customApiKey, 
  hasResult, 
  onReset 
}) {
  const isOnline = backendStatus && backendStatus.status === 'healthy';
  const hasGemini = backendStatus?.gemini_api_configured || Boolean(customApiKey);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={hasResult ? onReset : undefined} 
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform duration-200">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 bg-clip-text text-transparent">
                AI Resume Analyzer
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                <Sparkles className="w-3 h-3 mr-1 text-indigo-500" />
                Gemini AI
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              ATS Scoring • Skill Parsing • Executive Critique
            </p>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center space-x-3">
          {/* Backend Status indicator */}
          <div className="hidden md:flex items-center space-x-2 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            <span className="text-slate-600">
              {isOnline ? (hasGemini ? 'Gemini AI Active' : 'ATS Engine Ready') : 'Backend Connecting...'}
            </span>
          </div>

          {/* API Key Modal Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`inline-flex items-center space-x-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors border ${
              customApiKey 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
            }`}
            title="Configure Gemini API Key"
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {customApiKey ? 'Custom API Key Active' : 'Gemini Key'}
            </span>
          </button>

          {/* Reset button when viewing results */}
          {hasResult && (
            <button
              onClick={onReset}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Upload New</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
