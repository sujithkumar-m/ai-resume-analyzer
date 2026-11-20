import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  FileText, 
  ArrowLeft, 
  Printer, 
  Download, 
  Sparkles, 
  AlertCircle, 
  RefreshCw,
  LayoutDashboard,
  Award,
  CheckCircle2,
  Share2
} from 'lucide-react';

import Navbar from './components/Navbar';
import UploadZone from './components/UploadZone';
import LoadingAnalysis from './components/LoadingAnalysis';
import CandidateInfoCard from './components/CandidateInfoCard';
import ScoreGauge from './components/ScoreGauge';
import SkillsSection from './components/SkillsSection';
import ExperienceEducationSection from './components/ExperienceEducationSection';
import AnalysisCards from './components/AnalysisCards';
import RecommendationsSection from './components/RecommendationsSection';
import ApiKeyModal from './components/ApiKeyModal';

import { checkBackendHealth, analyzeResumeFile, loadSampleAnalysis } from './api';

export default function App() {
  const [backendStatus, setBackendStatus] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [currentFilename, setCurrentFilename] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [customApiKey, setCustomApiKey] = useState(() => {
    return localStorage.getItem('gemini_api_key') || '';
  });
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  // Check backend health on mount
  useEffect(() => {
    async function loadHealth() {
      const res = await checkBackendHealth();
      setBackendStatus(res);
    }
    loadHealth();
  }, []);

  const handleSaveApiKey = (key) => {
    setCustomApiKey(key);
    if (key) {
      localStorage.setItem('gemini_api_key', key);
    } else {
      localStorage.removeItem('gemini_api_key');
    }
  };

  const triggerConfetti = (score) => {
    if (score >= 78) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fail
      }
    }
  };

  // Upload & Analyze Handler
  const handleAnalyze = async (file) => {
    setIsAnalyzing(true);
    setErrorMessage('');
    setCurrentFilename(file.name);

    try {
      const response = await analyzeResumeFile(file, customApiKey);
      setAnalysisResult(response.data);
      const atsScore = response.data?.ats_analysis?.overall_ats_score || 75;
      triggerConfetti(atsScore);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Analysis error:', err);
      setErrorMessage(err.message || 'An error occurred during resume analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Sample Resume Handler
  const handleSampleLoad = async () => {
    setIsAnalyzing(true);
    setErrorMessage('');
    setCurrentFilename('Sample_Alex_Morgan_Resume.pdf');

    try {
      const response = await loadSampleAnalysis(customApiKey);
      setAnalysisResult(response.data);
      const atsScore = response.data?.ats_analysis?.overall_ats_score || 85;
      triggerConfetti(atsScore);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Sample load error:', err);
      setErrorMessage(err.message || 'Failed to load sample resume.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setCurrentFilename('');
    setErrorMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    if (!analysisResult) return;
    const blob = new Blob([JSON.stringify(analysisResult, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume_analysis_${currentFilename.replace(/\.[^/.]+$/, '')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Navigation */}
      <Navbar
        backendStatus={backendStatus}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        customApiKey={customApiKey}
        hasResult={Boolean(analysisResult)}
        onReset={handleReset}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        
        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="max-w-4xl mx-auto px-4 mt-6">
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start space-x-3 text-rose-800 shadow-xs">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-sm">Resume Processing Notice</p>
                <p className="text-xs text-rose-700 mt-0.5">{errorMessage}</p>
              </div>
              <button
                onClick={() => setErrorMessage('')}
                className="text-xs font-semibold px-2 py-1 rounded bg-rose-100 hover:bg-rose-200 text-rose-800 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* 1. Loading State */}
        {isAnalyzing && (
          <LoadingAnalysis filename={currentFilename} />
        )}

        {/* 2. Upload Screen (when not analyzing and no results) */}
        {!isAnalyzing && !analysisResult && (
          <UploadZone
            onAnalyze={handleAnalyze}
            onSampleLoad={handleSampleLoad}
            isAnalyzing={isAnalyzing}
          />
        )}

        {/* 3. Results Dashboard */}
        {!isAnalyzing && analysisResult && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            
            {/* Action Bar (Top of Results) */}
            <div className="no-print bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Upload Another Resume</span>
                </button>

                <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-500 pl-2 border-l border-slate-200">
                  <span className="font-semibold text-slate-800">{currentFilename}</span>
                  {analysisResult.analysis_source && (
                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-medium">
                      {analysisResult.analysis_source}
                    </span>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleExportJSON}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                  title="Export raw JSON"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Export JSON</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
                  title="Download / Print PDF Report"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Download Analysis Report (PDF)</span>
                </button>
              </div>
            </div>

            {/* Print Header (Only visible when printing / downloading PDF report) */}
            <div className="hidden print:block mb-6 p-4 border-b border-slate-300">
              <h1 className="text-2xl font-bold text-slate-900">
                AI Resume Analysis & ATS Report
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Generated by AI Resume Analyzer (Google Gemini Engine) • File: {currentFilename} • Date: {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Dashboard Sections Grid */}
            <div className="space-y-6">
              
              {/* 1. Candidate Info Banner */}
              <CandidateInfoCard
                candidateInfo={analysisResult.candidate_information}
                filename={currentFilename}
              />

              {/* 2. ATS Score & Gauge */}
              <ScoreGauge
                atsAnalysis={analysisResult.ats_analysis}
              />

              {/* 3. Skills Extraction & Technical Market Analysis */}
              <SkillsSection
                candidateInfo={analysisResult.candidate_information}
                atsAnalysis={analysisResult.ats_analysis}
              />

              {/* 4. Experience & Education Timeline */}
              <ExperienceEducationSection
                candidateInfo={analysisResult.candidate_information}
              />

              {/* 5. ATS Strengths, Weaknesses, Missing Info & Grammar Suggestions */}
              <AnalysisCards
                atsAnalysis={analysisResult.ats_analysis}
              />

              {/* 6. AI Recommendations & Executive Summary Rewrite */}
              <RecommendationsSection
                recommendations={analysisResult.ai_recommendations}
                candidateInfo={analysisResult.candidate_information}
              />

            </div>

            {/* Bottom Actions */}
            <div className="no-print mt-10 text-center pb-8 border-t border-slate-200/80 pt-8">
              <p className="text-xs text-slate-500 mb-4">
                Want to analyze an updated version of your resume?
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Upload Another Resume</span>
              </button>
            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="no-print border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} AI Resume Analyzer. Built with React, Tailwind CSS, Python Flask, and Google Gemini.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Client-Side Document Parsing & Privacy Focused</span>
            </span>
          </div>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        currentKey={customApiKey}
        onSaveKey={handleSaveApiKey}
      />
    </div>
  );
}
