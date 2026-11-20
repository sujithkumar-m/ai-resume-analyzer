import React from 'react';
import { Award, CheckCircle, TrendingUp, BarChart3, AlertTriangle } from 'lucide-react';

export default function ScoreGauge({ atsAnalysis }) {
  const score = atsAnalysis?.overall_ats_score ?? 75;
  const rating = atsAnalysis?.score_rating ?? 'Strong';
  const breakdown = atsAnalysis?.score_breakdown || {
    impact_and_metrics: 75,
    keyword_relevance: 80,
    structure_and_format: 85,
    profile_completeness: 80,
  };

  // Color config based on score
  const getTheme = (s) => {
    if (s >= 85) {
      return {
        stroke: '#10b981', // emerald-500
        bgRing: 'stroke-emerald-100',
        badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        text: 'text-emerald-700',
        desc: 'Top-tier applicant profile. Strong ATS compatibility with minimal rejection risk.',
      };
    } else if (s >= 75) {
      return {
        stroke: '#6366f1', // indigo-500
        bgRing: 'stroke-indigo-100',
        badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        text: 'text-indigo-700',
        desc: 'Competitive profile. Minor keyword and metric enhancements can boost callbacks.',
      };
    } else if (s >= 60) {
      return {
        stroke: '#f59e0b', // amber-500
        bgRing: 'stroke-amber-100',
        badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
        text: 'text-amber-700',
        desc: 'Moderate ATS match. Missing several high-yield keywords and quantifiable metrics.',
      };
    } else {
      return {
        stroke: '#f43f5e', // rose-500
        bgRing: 'stroke-rose-100',
        badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
        text: 'text-rose-700',
        desc: 'Requires immediate revision. Formatting and section gaps may cause automated ATS rejection.',
      };
    }
  };

  const theme = getTheme(score);

  // SVG Gauge calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-7">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        
        {/* Left: Radial Progress Meter */}
        <div className="flex flex-col items-center shrink-0">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="88"
                cy="88"
                r={radius}
                className="stroke-slate-100"
                strokeWidth="12"
                fill="transparent"
              />
              {/* Animated Progress circle */}
              <circle
                cx="88"
                cy="88"
                r={radius}
                stroke={theme.stroke}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
              />
            </svg>

            {/* Score inside ring */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {score}
              </span>
              <span className="text-xs uppercase font-bold text-slate-400 tracking-widest mt-0.5">
                out of 100
              </span>
            </div>
          </div>

          {/* Rating Badge */}
          <div className={`mt-3 px-3 py-1 rounded-full text-xs font-bold border ${theme.badgeBg}`}>
            {rating} Match
          </div>
        </div>

        {/* Right: Breakdown & Insights */}
        <div className="w-full flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                ATS Compatibility Assessment
              </h3>
              <p className="text-xs text-slate-500">
                {theme.desc}
              </p>
            </div>
          </div>

          {/* Sub-scores grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            {/* Impact & Metrics */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-700">Impact & Metrics</span>
                <span className="font-bold text-slate-900">{breakdown.impact_and_metrics}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ width: `${breakdown.impact_and_metrics}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Quantifiable achievements (% and $)
              </p>
            </div>

            {/* Keyword Relevance */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-700">Keyword Relevance</span>
                <span className="font-bold text-slate-900">{breakdown.keyword_relevance}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-violet-600 h-2 rounded-full" 
                  style={{ width: `${breakdown.keyword_relevance}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Core technical domain keywords
              </p>
            </div>

            {/* Structure & Formatting */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-700">Structure & Formatting</span>
                <span className="font-bold text-slate-900">{breakdown.structure_and_format}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-emerald-600 h-2 rounded-full" 
                  style={{ width: `${breakdown.structure_and_format}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Section hierarchy & readability
              </p>
            </div>

            {/* Profile Completeness */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-700">Profile Completeness</span>
                <span className="font-bold text-slate-900">{breakdown.profile_completeness}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${breakdown.profile_completeness}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Contact, links, education, projects
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
