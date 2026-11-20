import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  FolderGit2, 
  Award, 
  Calendar, 
  MapPin, 
  ChevronRight,
  ExternalLink,
  Tag
} from 'lucide-react';

export default function ExperienceEducationSection({ candidateInfo }) {
  const [activeTab, setActiveTab] = useState('experience');

  const experience = candidateInfo?.work_experience || [];
  const education = candidateInfo?.education || [];
  const projects = candidateInfo?.projects || [];
  const certifications = candidateInfo?.certifications || [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-7">
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-1 sm:space-x-2 bg-slate-100/80 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('experience')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'experience'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Experience ({experience.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'education'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Education ({education.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'projects'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certifications')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'certifications'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Certifications ({certifications.length})</span>
          </button>
        </div>

        <span className="text-xs text-slate-400 hidden sm:block">
          Parsed Section Timeline
        </span>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        
        {/* WORK EXPERIENCE */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            {experience.length > 0 ? (
              experience.map((exp, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-indigo-200 group">
                  {/* Timeline indicator dot */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-indigo-600 group-hover:scale-125 transition-transform" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4 className="text-base font-bold text-slate-900">
                      {exp.job_title}
                    </h4>
                    <span className="inline-flex items-center text-xs font-medium text-slate-500">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      {exp.duration || 'Tenure'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-indigo-600 font-semibold mb-3">
                    <span>{exp.company}</span>
                    {exp.location && (
                      <span className="text-slate-400 font-normal flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {exp.location}
                      </span>
                    )}
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-outside pl-4">
                    {(exp.achievements || []).map((bullet, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400 text-sm">
                No formal work experience sections detected in document.
              </div>
            )}
          </div>
        )}

        {/* EDUCATION */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            {education.length > 0 ? (
              education.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start space-x-3.5">
                    <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700 shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {edu.degree}
                      </h4>
                      <p className="text-xs font-medium text-indigo-600 mt-0.5">
                        {edu.institution}
                      </p>
                      {edu.details && (
                        <p className="text-xs text-slate-500 mt-1">
                          {edu.details}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 text-right sm:self-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-semibold text-slate-700">
                      {edu.graduation_year || 'Completed'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400 text-sm">
                No formal degree or university identified.
              </div>
            )}
          </div>
        )}

        {/* PROJECTS */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.length > 0 ? (
              projects.map((proj, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-sm font-bold text-slate-900">
                        {proj.title}
                      </h4>
                      <FolderGit2 className="w-4 h-4 text-slate-400 shrink-0" />
                    </div>

                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Highlights */}
                    {proj.highlights && proj.highlights.length > 0 && (
                      <ul className="text-[11px] text-slate-500 space-y-1 mb-3 pl-3 border-l-2 border-indigo-200">
                        {proj.highlights.map((h, hIdx) => (
                          <li key={hIdx}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/60">
                    {(proj.tech_stack || []).map((t, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white text-slate-700 border border-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-slate-400 text-sm">
                No explicit technical projects listed.
              </div>
            )}
          </div>
        )}

        {/* CERTIFICATIONS */}
        {activeTab === 'certifications' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.length > 0 ? (
              certifications.map((cert, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {cert.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {cert.issuer} {cert.year ? `• ${cert.year}` : ''}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-slate-400 text-sm">
                No industry certifications detected. Adding AWS, GCP, or Agile certs is recommended.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
