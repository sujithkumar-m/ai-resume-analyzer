import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Share2, 
  ExternalLink,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function CandidateInfoCard({ candidateInfo, filename }) {
  if (!candidateInfo) return null;

  const {
    name = 'Candidate',
    email = 'Not Found',
    phone = 'Not Found',
    location = 'Not Specified',
    linkedin = 'Not Found',
    github_or_portfolio = 'Not Found',
  } = candidateInfo;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-7">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-2xl font-bold shadow-md shadow-indigo-100 shrink-0">
            {name && name !== 'Candidate' && name !== 'Not Found' 
              ? name.charAt(0).toUpperCase() 
              : <User className="w-7 h-7" />}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {name || 'Candidate Name'}
              </h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Extracted Profile
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Source file: <span className="font-medium text-slate-700">{filename}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Contact & Links Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-5">
        {/* Email */}
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Email</p>
            <p className="text-xs font-semibold text-slate-800 truncate" title={email}>
              {email !== 'Not Found' ? email : <span className="text-rose-500">Not Detected</span>}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
            <Phone className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Phone</p>
            <p className="text-xs font-semibold text-slate-800 truncate" title={phone}>
              {phone !== 'Not Found' ? phone : <span className="text-rose-500">Not Detected</span>}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Location</p>
            <p className="text-xs font-semibold text-slate-800 truncate" title={location}>
              {location || 'Not Specified'}
            </p>
          </div>
        </div>

        {/* Online Presence */}
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="p-2 rounded-lg bg-violet-50 text-violet-600 shrink-0">
            <Globe className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">LinkedIn / Web</p>
            {linkedin !== 'Not Found' ? (
              <a
                href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 truncate"
              >
                <span className="truncate">{linkedin.replace('https://', '')}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            ) : github_or_portfolio !== 'Not Found' ? (
              <a
                href={github_or_portfolio.startsWith('http') ? github_or_portfolio : `https://${github_or_portfolio}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 truncate"
              >
                <span className="truncate">{github_or_portfolio.replace('https://', '')}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            ) : (
              <span className="text-xs text-amber-600 font-medium">Link Not Found</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
