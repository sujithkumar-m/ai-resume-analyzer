import React, { useState, useEffect } from 'react';
import { Loader2, Sparkles, FileSearch, CheckCircle2 } from 'lucide-react';

const ANALYSIS_STEPS = [
  { label: 'Reading and validating resume document (PyMuPDF / python-docx)...', duration: 1200 },
  { label: 'Extracting candidate contact, education, work, and projects...', duration: 1600 },
  { label: 'Evaluating ATS scoring algorithms & keyword density...', duration: 2000 },
  { label: 'Analyzing technical skills and modern market demand...', duration: 1800 },
  { label: 'Formulating Google Gemini AI recommendations & summary rewrite...', duration: 2200 },
];

export default function LoadingAnalysis({ filename }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < ANALYSIS_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 92) {
          const increment = Math.floor(Math.random() * 8) + 3;
          return Math.min(prev + increment, 94);
        }
        return prev;
      });
    }, 400);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto py-16 px-4">
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-indigo-100 text-center relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-violet-200/40 rounded-full blur-3xl pointer-events-none" />

        {/* Central Spinner */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-indigo-600 animate-pulse" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-1">
          Analyzing Resume...
        </h3>
        <p className="text-sm font-medium text-slate-500 mb-6 truncate max-w-md mx-auto">
          {filename || 'Document'}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2.5 mb-6 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-indigo-600 to-violet-600 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Steps checklist */}
        <div className="space-y-3 text-left bg-slate-50 rounded-2xl p-4 border border-slate-100">
          {ANALYSIS_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div 
                key={idx}
                className={`flex items-center space-x-3 text-xs sm:text-sm transition-opacity duration-300 ${
                  isCurrent ? 'font-semibold text-indigo-700' : isCompleted ? 'text-slate-700' : 'text-slate-400 opacity-60'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-indigo-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                )}
                <span className="truncate">{step.label}</span>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-slate-400 mt-6">
          Powered by PyMuPDF parser & Google Gemini AI Engine
        </p>
      </div>
    </div>
  );
}
