import React from 'react';
import { Code2, Layers, Database, Wrench, HeartHandshake, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SkillsSection({ candidateInfo, atsAnalysis }) {
  const techSkills = candidateInfo?.technical_skills || {};
  const softSkills = candidateInfo?.soft_skills || [];
  const techAnalysis = atsAnalysis?.technical_skills_analysis || {};

  const languages = techSkills.languages || [];
  const frameworks = techSkills.frameworks || [];
  const databases = techSkills.databases || [];
  const tools = techSkills.tools_cloud || [];
  const allTech = techSkills.all || [];

  const marketScore = techAnalysis.market_relevance_score ?? 85;
  const highDemand = techAnalysis.high_demand_strengths || [];
  const skillGaps = techAnalysis.skill_gaps || [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Technical & Soft Skills Extraction
            </h3>
            <p className="text-xs text-slate-500">
              Categorized competencies matched with modern tech stacks
            </p>
          </div>
        </div>

        {/* Market Relevance Pill */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs">
          <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
          <span className="text-slate-600">Tech Market Relevance:</span>
          <span className="font-bold text-indigo-600">{marketScore}%</span>
        </div>
      </div>

      {/* Categorized Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        
        {/* Programming Languages */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
            <Code2 className="w-4 h-4 text-indigo-600" />
            <span>Languages ({languages.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5 flex-1">
            {languages.length > 0 ? (
              languages.map((skill, i) => (
                <span key={i} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-indigo-100/70 text-indigo-800 border border-indigo-200/50">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic">None specifically grouped</span>
            )}
          </div>
        </div>

        {/* Frameworks & Libraries */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
            <Layers className="w-4 h-4 text-violet-600" />
            <span>Frameworks ({frameworks.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5 flex-1">
            {frameworks.length > 0 ? (
              frameworks.map((skill, i) => (
                <span key={i} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-violet-100/70 text-violet-800 border border-violet-200/50">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic">None specifically grouped</span>
            )}
          </div>
        </div>

        {/* Databases */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
            <Database className="w-4 h-4 text-emerald-600" />
            <span>Databases ({databases.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5 flex-1">
            {databases.length > 0 ? (
              databases.map((skill, i) => (
                <span key={i} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-emerald-100/70 text-emerald-800 border border-emerald-200/50">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic">None detected</span>
            )}
          </div>
        </div>

        {/* Cloud & DevOps */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
            <Wrench className="w-4 h-4 text-blue-600" />
            <span>Tools & Cloud ({tools.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5 flex-1">
            {tools.length > 0 ? (
              tools.map((skill, i) => (
                <span key={i} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-blue-100/70 text-blue-800 border border-blue-200/50">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic">None detected</span>
            )}
          </div>
        </div>
      </div>

      {/* Soft Skills & Market Analysis */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Soft Skills */}
        <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
            <HeartHandshake className="w-4 h-4 text-pink-600" />
            <span>Soft Skills & Interpersonal Competencies</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {softSkills.length > 0 ? (
              softSkills.map((skill, i) => (
                <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-white text-slate-700 border border-slate-200 shadow-xs">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500">No explicit soft skills mentioned in resume</span>
            )}
          </div>
        </div>

        {/* Skill Gap & Strengths Insights */}
        <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Skill Market Analysis</span>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              {techAnalysis.summary || 'Solid modern technical base matching technology industry standards.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {/* Top Strengths */}
            <div className="bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100">
              <span className="font-semibold text-emerald-800 block mb-1">Key Strengths:</span>
              <ul className="space-y-0.5 text-emerald-700">
                {(highDemand.length > 0 ? highDemand : allTech.slice(0, 3)).map((s, idx) => (
                  <li key={idx} className="flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 shrink-0 text-emerald-500" />
                    <span className="truncate">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Additions */}
            <div className="bg-amber-50/60 p-2.5 rounded-lg border border-amber-100">
              <span className="font-semibold text-amber-800 block mb-1">High-Yield Gaps:</span>
              <ul className="space-y-0.5 text-amber-700">
                {(skillGaps.length > 0 ? skillGaps : ['Cloud Architecture', 'Automated Testing']).map((g, idx) => (
                  <li key={idx} className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span className="truncate">{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
