import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  AlertCircle, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  FileCode,
  ShieldCheck,
  FileCheck
} from 'lucide-react';

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_EXTENSIONS = ['pdf', 'docx'];

export default function UploadZone({ onAnalyze, onSampleLoad, isAnalyzing }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [validationError, setValidationError] = useState('');
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    if (!file) return false;

    const ext = file.name.split('.').pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setValidationError(`Unsupported file format (.${ext}). Only PDF (.pdf) and Word documents (.docx) are supported.`);
      return false;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setValidationError(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).`);
      return false;
    }

    setValidationError('');
    return true;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    setValidationError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyzeClick = () => {
    if (selectedFile) {
      onAnalyze(selectedFile);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Hero Intro */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-4">
          <Zap className="w-3.5 h-3.5" />
          <span>Next-Gen ATS Parser & Career Advisor</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Supercharge Your Resume with <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800 bg-clip-text text-transparent">Gemini AI</span>
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Get an instant ATS compatibility score, extract candidate data, detect missing keywords, and receive actionable career recommendations in seconds.
        </p>
      </div>

      {/* Main Upload Box */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/80 p-6 sm:p-8">
        <form
          onDragEnter={handleDrag}
          onSubmit={(e) => e.preventDefault()}
          className="relative"
        >
          <input
            ref={fileInputRef}
            type="file"
            id="resume-file-input"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleChange}
            className="hidden"
          />

          {!selectedFile ? (
            /* Empty State Dropzone */
            <label
              htmlFor="resume-file-input"
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
                dragActive
                  ? 'border-indigo-600 bg-indigo-50/70 scale-[1.01]'
                  : 'border-slate-300 hover:border-indigo-400 bg-slate-50/60 hover:bg-slate-50'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-100/80 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8" />
              </div>
              <p className="text-base sm:text-lg font-semibold text-slate-800 text-center">
                Drag and drop your resume here, or <span className="text-indigo-600 underline">browse</span>
              </p>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 text-center">
                Supported formats: <strong>PDF</strong> (.pdf) and <strong>Word</strong> (.docx) up to 10MB
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
                <span className="inline-flex items-center space-x-1 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Confidential & Private</span>
                </span>
                <span className="inline-flex items-center space-x-1 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                  <FileCode className="w-3.5 h-3.5 text-blue-500" />
                  <span>PyMuPDF & python-docx Parsing</span>
                </span>
                <span className="inline-flex items-center space-x-1 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                  <Zap className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Instant ATS Score</span>
                </span>
              </div>
            </label>
          ) : (
            /* Selected File State Card */
            <div className="p-6 rounded-xl border border-indigo-200 bg-indigo-50/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-indigo-200">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm sm:text-base font-bold text-slate-900 truncate">
                        {selectedFile.name}
                      </p>
                      <span className="px-2 py-0.5 text-xs font-semibold rounded bg-indigo-100 text-indigo-800 uppercase">
                        {selectedFile.name.split('.').pop()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {formatFileSize(selectedFile.size)} • Ready for AI analysis
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove file"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Validation Error Message */}
          {validationError && (
            <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start space-x-3 text-rose-800 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
              <div>
                <p className="font-semibold">Upload Validation Notice</p>
                <p className="text-xs text-rose-700 mt-0.5">{validationError}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
            {/* Quick Sample Button */}
            <button
              type="button"
              onClick={onSampleLoad}
              disabled={isAnalyzing}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200/80 transition-colors cursor-pointer"
            >
              <FileCheck className="w-4 h-4 text-slate-500" />
              <span>Try with Sample Resume</span>
            </button>

            {/* Analyze Button */}
            <button
              type="button"
              onClick={handleAnalyzeClick}
              disabled={!selectedFile || isAnalyzing}
              className={`w-full sm:w-auto inline-flex items-center justify-center space-x-2 text-sm font-bold px-7 py-3 rounded-xl shadow-lg transition-all duration-200 ${
                selectedFile && !isAnalyzing
                  ? 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 text-white shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.99] cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <span>Analyze Resume</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Feature Highlights Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm mb-2">
            1
          </div>
          <h4 className="text-sm font-bold text-slate-900">Precision Text Extraction</h4>
          <p className="text-xs text-slate-600 mt-1">
            Extracts candidate info, contact links, education, projects, and work history cleanly with PyMuPDF & python-docx.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm mb-2">
            2
          </div>
          <h4 className="text-sm font-bold text-slate-900">ATS Score & Gap Diagnostics</h4>
          <p className="text-xs text-slate-600 mt-1">
            Calculates 0–100 ATS readiness score, evaluating keyword relevance, formatting, and quantifiable bullet impact.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center font-bold text-sm mb-2">
            3
          </div>
          <h4 className="text-sm font-bold text-slate-900">Gemini AI Recommendations</h4>
          <p className="text-xs text-slate-600 mt-1">
            Generates high-converting executive summary rewrites, technical skill gap advice, and grammar improvements.
          </p>
        </div>
      </div>
    </div>
  );
}
