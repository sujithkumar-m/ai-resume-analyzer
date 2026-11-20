import React, { useState } from 'react';
import { 
  Sparkles, 
  Lightbulb, 
  Copy, 
  Check, 
  ListOrdered, 
  PlusCircle, 
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';

export default function RecommendationsSection({ recommendations, candidateInfo }) {
  const [copiedSummary, setCopiedSummary] = useState(false);

  if (!recommendations) return null;

  const suggestions = recommendations.resume_improvement_suggestions || [];
  const recommendedSkills = recommendations.recommended_additional_skills || [];
  const summaryRewrite = recommendations.professional_summary_improvement || {};
  const actionableSteps = recommendations.actionable_steps || [];

  const handleCopySummary = () => {
    if (summaryRewrite.improved_version) {
      navigator.clipboard.writeText(summaryRewrite.improved_version);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Professional Summary Rewrite Card (High Value AI Feature) */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 rounded-2xl shadow-xl text-white p-6 sm:p-8 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Sparkles className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                AI Professional Summary Rewrite
              </h3>
              <p className="text-xs text-indigo-200/70">
                Tailored executive summary optimized for recruiter retention & ATS search algorithms
              </p>
            </div>
          </div>

          <button
            onClick={handleCopySummary}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-semibold transition-colors cursor-pointer border border-indigo-400/30 shadow-xs self-start sm:self-auto"
          >
            {copiedSummary ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block mb-1">
              Optimized Executive Summary:
            </span>
            <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans font-normal">
              "{summaryRewrite.improved_version || 'Results-driven software professional with demonstrated experience delivering scalable digital solutions, optimizing backend systems, and collaborating in agile teams.'}"
            </p>
          </div>

          {summaryRewrite.rationale && (
            <p className="text-xs text-indigo-200/80 pl-2 border-l-2 border-indigo-400/50">
              <strong>Strategy Insight:</strong> {summaryRewrite.rationale}
            </p>
          )}
        </div>
      </div>

      {/* 2. Improvement Suggestions & Recommended Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Core Improvement Suggestions */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-7">
          <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Key Strategic Suggestions
              </h3>
              <p className="text-xs text-slate-500">
                Targeted optimizations to elevate your candidate profile
              </p>
            </div>
          </div>

          <div className="space-y-3 mt-5">
            {suggestions.length > 0 ? (
              suggestions.map((sug, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{sug}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">No suggestions listed.</p>
            )}
          </div>
        </div>

        {/* Recommended Additional Skills */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-7">
          <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Recommended In-Demand Skills
              </h3>
              <p className="text-xs text-slate-500">
                Skills highly correlated with this candidate's target career path
              </p>
            </div>
          </div>

          <div className="space-y-2.5 mt-5">
            {recommendedSkills.length > 0 ? (
              recommendedSkills.map((skill, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                  <div className="flex items-center space-x-2.5">
                    <TrendingUp className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>{skill}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 uppercase">
                    High Demand
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">No additional skills identified.</p>
            )}
          </div>
        </div>
      </div>

      {/* 3. Actionable Recommendations Steps */}
      {actionableSteps && actionableSteps.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-7">
          <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <ListOrdered className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Step-by-Step Action Roadmap
              </h3>
              <p className="text-xs text-slate-500">
                Sequential revisions to immediately increase your ATS ranking
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {actionableSteps.map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                      {step.step || idx + 1}
                    </span>
                    {step.expected_impact && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {step.expected_impact}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
