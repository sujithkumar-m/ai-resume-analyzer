# AI Resume Analyzer 📄✨

A simple, modern, AI-powered Resume Analyzer web application. Upload any resume in **PDF** or **DOCX** format and receive instant ATS scoring, structured information extraction, strength/weakness analysis, formatting critique, and actionable Google Gemini AI recommendations.

---

## 🚀 Key Features

### 1. Resume Upload
- **Drag-and-Drop Zone**: Intuitive file drop area with visual hover states.
- **Dual Format Support**: Parses both Adobe PDF (`.pdf`) via **PyMuPDF** and Microsoft Word (`.docx`) via **python-docx**.
- **Real-time Validation**: Validates file types and enforces a 10MB size cap with clear alerts.
- **One-Click Sample Resume**: Instantly explore the dashboard without having to upload a personal file.

### 2. Resume Information Extraction
- **Candidate Name, Email, Phone, Location & Online Links** (LinkedIn, GitHub).
- **Education**: Degree, institution, graduation year, honors/details.
- **Technical Skills**: Categorized into Programming Languages, Frameworks, Databases, and Tools/Cloud.
- **Soft Skills**: Collaboration, problem solving, leadership, and interpersonal traits.
- **Work Experience**: Interactive timeline with job title, company, tenure, location, and key accomplishments.
- **Projects**: Project names, tech stacks, summaries, and quantifiable metrics.
- **Certifications**: Industry credentials, issuers, and dates.

### 3. Resume Analysis
- **Overall ATS Score (0–100)**: Circular radial meter with dynamic color-coding and ranking category (*Exceptional*, *Strong*, *Good*, *Needs Work*).
- **Sub-Score Breakdown**:
  - Impact & Metrics (% and $)
  - Keyword Relevance
  - Structure & Formatting
  - Profile Completeness
- **Resume Strengths**: Competitive advantages identified by ATS algorithms.
- **Resume Weaknesses**: Issues that lower recruiter ranking or cause automated filtering.
- **Missing Information**: Missing contact links, quantifiable achievements, or dates.
- **Formatting Analysis**: Assessment of layout, document length, and bullet-point quality.
- **Grammar & Phrasing Suggestions**: Side-by-side comparison of passive/unquantified sentences with executive action-oriented rewrites.
- **Technical Skills Analysis**: Modern market relevance score, high-demand competencies, and identified tech stack gaps.

### 4. AI Recommendations (Google Gemini)
- **High-Priority Improvements**: Strategic recommendations to optimize the resume.
- **Recommended Skills**: Fast-growing technologies aligned with the candidate's target career path.
- **Executive Summary Rewrite**: High-converting, ATS-friendly professional summary with a **1-click copy** button.
- **Actionable Roadmap**: Step-by-step revision checklist with estimated ATS score impact.

### 5. Export & Reporting
- **Downloadable Analysis Report (PDF)**: Clean, print-styled multi-page report for offline review or client presentation.
- **JSON Export**: Download structured data for integration with recruitment tools.

---

## 📸 Screenshots & UI Preview

### 1. Upload & Drag-and-Drop Screen
Intuitive drag-and-drop zone with instant file validation, 10MB size guard, format badges, and a one-click sample loader.
```text
+-----------------------------------------------------------------------------------+
|  [📄] AI Resume Analyzer               [✨ Gemini AI]   [🟢 Backend Online] [🔑 Key] |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|           Supercharge Your Resume with Gemini AI                                  |
|           Get instant ATS scoring, skill parsing, and executive feedback           |
|                                                                                   |
|      + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +      |
|      |               [ ☁️ ] Drag and drop your resume here                  |      |
|      |             Supported formats: PDF (.pdf) & Word (.docx)            |      |
|      + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +      |
|                                                                                   |
|      [ 📄 Try with Sample Resume ]                        [ Analyze Resume -> ]   |
+-----------------------------------------------------------------------------------+
```

### 2. Multi-Step Analysis Progress
Engaging real-time progress animation visualizing extraction, ATS scoring, and Gemini AI synthesis.
```text
+-----------------------------------------------------------------------------------+
|                           Analyzing Resume...                                     |
|                           alex_morgan_resume.pdf                                  |
|      [=========================================>            ] 78%                 |
|                                                                                   |
|      (✓) Reading document (PyMuPDF / python-docx)...                              |
|      (✓) Extracting contact, education, work & projects...                        |
|      (✓) Evaluating ATS scoring & keyword density...                              |
|      (⏳) Formulating Google Gemini AI recommendations & summary rewrite...        |
+-----------------------------------------------------------------------------------+
```

### 3. Executive Results Dashboard
Comprehensive dashboard with circular ATS radial score, candidate overview, categorized skills, strengths/weaknesses cards, and downloadable PDF report.
```text
+-----------------------------------------------------------------------------------+
|  [<- Upload Another]  alex_morgan_resume.pdf   [Export JSON] [🖨️ Download Report (PDF)]|
+-----------------------------------------------------------------------------------+
|  Candidate Profile: Alexander Morgan                                               |
|  ✉️ alex.dev@gmail.com  |  📞 (555) 349-2810  |  📍 San Francisco  |  🔗 LinkedIn  |
+-----------------------------------------------------------------------------------+
|                               |  ATS Breakdown:                                   |
|           /-----\             |  • Impact & Metrics:      [========  ] 80%        |
|          |   88  |            |  • Keyword Relevance:     [========= ] 92%        |
|           \-----/             |  • Structure & Formatting:[========  ] 85%        |
|       Exceptional Match       |  • Profile Completeness:  [=======   ] 75%        |
+-----------------------------------------------------------------------------------+
|  [Technical Skills (23)]     | Languages: Python, Go, TypeScript, SQL, Bash       |
|  Market Relevance: 94%       | Frameworks: React, FastAPI, Node.js, Tailwind CSS  |
|                              | Cloud & DevOps: Docker, Kubernetes, AWS, Terraform |
+-----------------------------------------------------------------------------------+
|  Strengths (3)               |  Areas for Improvement (2)                         |
|  ✓ High density of metrics   |  ! Missing direct live demo URLs for top projects  |
|  ✓ Clear executive hierarchy |  ! Add automated testing keywords (Jest, PyTest)   |
+-----------------------------------------------------------------------------------+
|  ✨ AI Professional Summary Rewrite                  [📋 Copy Summary]            |
|  "Results-driven Senior Software Engineer with 6+ years of expertise architecting  |
|   cloud microservices, reducing query latency by 42%, and scaling systems..."      |
+-----------------------------------------------------------------------------------+
```

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Tailwind CSS v4, Lucide Icons, Canvas Confetti, Vite |
| **Backend** | Python Flask, Flask-CORS, python-dotenv |
| **Parsing** | PyMuPDF (`fitz`), `python-docx` |
| **AI Engine** | Google Gemini API (`gemini-2.0-flash`, `gemini-1.5-flash`) with resilient built-in ATS heuristic fallback |

---

## 📂 Project Structure

```text
ai-resume-analyzer/
├── backend/
│   ├── app.py                 # Flask server with /api/analyze, /api/health, /api/sample
│   ├── parser.py              # PyMuPDF and python-docx text extraction
│   ├── analyzer.py            # Gemini AI analysis & ATS heuristic fallback engine
│   ├── test_pipeline.py       # Automated test suite for PDF & DOCX parsing
│   ├── .env                   # Environment file (GEMINI_API_KEY)
│   ├── .env.example
│   └── requirements.txt       # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx                   # Header & API key settings
│   │   │   ├── UploadZone.jsx               # Drag-and-drop file upload & sample button
│   │   │   ├── LoadingAnalysis.jsx          # Multi-step progress animation
│   │   │   ├── CandidateInfoCard.jsx        # Extracted candidate profile & links
│   │   │   ├── ScoreGauge.jsx               # Circular radial ATS score meter
│   │   │   ├── SkillsSection.jsx            # Categorized skills & market relevance
│   │   │   ├── ExperienceEducationSection.jsx# Timeline of work, education, projects, certs
│   │   │   ├── AnalysisCards.jsx            # Strengths, weaknesses, missing info, grammar
│   │   │   ├── RecommendationsSection.jsx   # AI executive summary rewrite & action plan
│   │   │   └── ApiKeyModal.jsx              # Optional client-side Gemini key modal
│   │   ├── api.js                           # API client
│   │   ├── App.jsx                          # Main application controller
│   │   └── index.css                        # Tailwind v4 styles & print stylesheet
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── run_backend.bat            # Quick start backend
├── run_frontend.bat           # Quick start frontend
└── README.md
```

---

## ⚡ Quick Start Guide

### 1. Backend Setup
From the project directory:

```bash
cd backend

# Create and activate virtual environment (if not already created)
python -m venv ../venv
..\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# (Optional) Set your Google Gemini API Key in .env:
# GEMINI_API_KEY=your_key_here
# Note: If no key is set, the application automatically uses its built-in smart ATS heuristic parser!

# Start Flask backend (port 5000)
python app.py
```

### 2. Frontend Setup
In a new terminal window:

```bash
cd frontend

# Install node dependencies
npm install

# Start Vite development server
npm run dev
```

Open your browser and navigate to:
👉 **`http://localhost:5173`**

---

## 🔒 Privacy & Architecture
- **No Login / No Registration**: Focused 100% on immediate value.
- **No Database Required**: File bytes are parsed in-memory; no resume files or personal data are stored permanently on server disk.
- **Client Flexibility**: Custom Gemini API keys can be saved in local browser storage without modifying server files.
