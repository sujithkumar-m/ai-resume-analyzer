import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  FileSearch, 
  Sparkles, 
  SpellCheck,
  LayoutTemplate,
  Info
} from 'lucide-react';

export default function AnalysisCards({ atsAnalysis }) {
  if (!atsAnalysis) return null;

  const strengths = atsAnalysis.strengths || [];
  const weaknesses = atsAnalysis.weaknesses || [];
  const missingInfo = atsAnalysis.missing_information || [];
  const formatting = atsAnalysis.formatting_analysis || {};
  const grammarSuggestions = atsAnalysis.grammar_and_spelling || [];

  return (
    <div className="space-y-6">
      
      {/* 1. Strengths & Weaknesses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Strengths Card */}
        <div className="bg-white rounded-2xl border border-emerald-200/80 shadow-md p-6 sm:p-7 relative overflow-hidden">
          <div className="flex items-center space-x-2.5 pb-4 border-b border-emerald-100">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Resume Strengths ({strengths.length})
              </h3>
              <p className="text-xs text-slate-500">
                Key competitive advantages identified by ATS algorithms
              </p>
            </div>
          </div>

          <div className="space-y-3 mt-5">
            {strengths.length > 0 ? (
              strengths.map((str, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100/70 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{str}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">No specific strengths listed.</p>
            )}
          </div>
        </div>

        {/* Weaknesses Card */}
        <div className="bg-white rounded-2xl border border-amber-200/80 shadow-md p-6 sm:p-7 relative overflow-hidden">
          <div className="flex items-center space-x-2.5 pb-4 border-b border-amber-100">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Areas for Improvement ({weaknesses.length})
              </h3>
              <p className="text-xs text-slate-500">
                Factors lowering your ATS ranking or recruiter conversion rate
              </p>
            </div>
          </div>

          <div className="space-y-3 mt-5">
            {weaknesses.length > 0 ? (
              weaknesses.map((weak, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3.5 rounded-xl bg-amber-50/50 border border-amber-100/70 text-xs text-slate-700">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{weak}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">No critical weaknesses identified.</p>
            )}
          </div>
        </div>
      </div>

      {/* 2. Missing Information & Formatting Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Missing Information */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-7">
          <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Missing Information Check
              </h3>
              <p className="text-xs text-slate-500">
                Important details recruiters expect to verify immediately
              </p>
            </div>
          </div>

          <div className="space-y-2.5 mt-5">
            {missingInfo.length > 0 ? (
              missingInfo.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-800">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-medium flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>All key contact and professional headers were successfully detected!</span>
              </div>
            )}
          </div>
        </div>

        {/* Formatting Analysis */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-7">
          <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Formatting & Layout Analysis
              </h3>
              <p className="text-xs text-slate-500">
                Parser friendliness, visual hierarchy & length
              </p>
            </div>
          </div>

          <div className="space-y-4 mt-5 text-xs text-slate-700">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <p className="font-semibold text-slate-900 mb-1">Structure Assessment:</p>
              <p className="text-slate-600 leading-relaxed">
                {formatting.assessment || 'Standard formatting detected with readable hierarchy.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Length</span>
                <span className="font-bold text-slate-800 mt-0.5 block truncate">
                  {formatting.length_evaluation || 'Optimal length'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Bullet Quality</span>
                <span className="font-bold text-slate-800 mt-0.5 block truncate">
                  {formatting.bullet_points_quality || 'High'}
                </span>
              </div>
            </div>

            {/* Tips */}
            {formatting.tips && formatting.tips.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="font-semibold text-slate-800 block text-[11px] uppercase tracking-wider">Formatting Best Practices:</span>
                {formatting.tips.map((tip, i) => (
                  <div key={i} className="flex items-start space-x-2 text-[11px] text-slate-600">
                    <span className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Grammar and Spelling Suggestions */}
      {grammarSuggestions && grammarSuggestions.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-7">
          <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-violet-50 text-violet-600">
              <SpellCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Grammar, Phrasing & Spelling Optimizations
              </h3>
              <p className="text-xs text-slate-500">
                Convert weak descriptions into punchy executive impact bullets
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {grammarSuggestions.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                      {item.issue || 'Phrasing Optimization'}
                    </span>
                  </div>

                  {/* Context sentence */}
                  <div className="mb-3 p-2.5 rounded-lg bg-rose-50/70 border border-rose-100 text-xs text-rose-900">
                    <span className="font-semibold block text-[10px] text-rose-500 uppercase">Original:</span>
                    <p className="italic mt-0.5">"{item.context || item.issue}"</p>
                  </div>

                  {/* Suggestion */}
                  <div className="mb-3 p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900">
                    <span className="font-semibold block text-[10px] text-emerald-600 uppercase">Recommended Rewrite:</span>
                    <p className="font-medium mt-0.5">"{item.suggestion}"</p>
                  </div>
                </div>

                {/* Explanation */}
                {item.explanation && (
                  <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-200/60 leading-relaxed">
                    <strong>Why:</strong> {item.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
