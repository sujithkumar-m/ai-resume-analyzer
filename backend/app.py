import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from parser import extract_resume_text, is_allowed_file, MAX_FILE_SIZE_BYTES
from analyzer import analyze_resume

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
# Enable CORS for all routes
CORS(app, resources={r"/api/*": {"origins": "*"}})

SAMPLE_RESUME_TEXT = """
ALEXANDER MORGAN
Email: alex.morgan.dev@gmail.com | Phone: (555) 349-2810 | Location: San Francisco, CA
LinkedIn: linkedin.com/in/alexandermorgan-dev | GitHub: github.com/alexmorgan-code

PROFESSIONAL SUMMARY
Dynamic Senior Full-Stack Software Engineer with 5+ years of experience designing, scaling, and deploying mission-critical cloud web applications. Proven track record of reducing latency by 42% and architecting microservices that support 3M+ active monthly users.

TECHNICAL SKILLS
- Languages: Python, JavaScript, TypeScript, Go, SQL, Bash
- Frameworks & Libraries: React, Node.js, Express, Flask, FastAPI, Next.js, Tailwind CSS
- Databases: PostgreSQL, MongoDB, Redis, Elasticsearch
- Cloud & DevOps: Docker, Kubernetes, AWS (EC2, S3, RDS, Lambda), CI/CD (GitHub Actions), Terraform
- Tools & Methodologies: Git, Jira, Microservices, REST APIs, GraphQL, Agile/Scrum

WORK EXPERIENCE
Senior Full-Stack Engineer | CloudScale Systems, San Francisco, CA | 2022 - Present
- Architected and delivered a distributed microservices platform processing over 12M daily requests, maintaining 99.98% system uptime.
- Spearheaded database query optimization across PostgreSQL and Redis caching layers, slashing median API latency by 42% (from 380ms to 220ms).
- Automated CI/CD deployment pipelines using GitHub Actions and Docker, reducing release deployment cycle time by 65%.
- Mentored a pod of 6 junior and mid-level software engineers through structured pair programming and code reviews.

Software Engineer | NexaTech Solutions, Austin, TX | 2020 - 2022
- Developed responsive web interfaces using React, Redux, and Tailwind CSS for enterprise data analytics dashboard.
- Built scalable RESTful backend services using Python Flask and PostgreSQL with comprehensive automated unit testing (92% code coverage).
- Integrated third-party payment gateways and OAuth2 authentication, directly onboarding 45,000+ new paying subscribers.

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley | 2016 - 2020
- Dean's Honor List (3 semesters), President of Berkeley Open-Source Developers Club

PROJECTS
DevPulse - Real-time Developer Analytics Platform
- Technologies: React, TypeScript, Node.js, Docker, AWS
- Description: Open-source developer productivity monitoring tool tracking git metrics and deployment frequency.
- Key Highlights: Gained 1,800+ GitHub stars and 200+ active enterprise teams.

CERTIFICATIONS
- AWS Certified Solutions Architect - Associate (2023)
- HashiCorp Certified: Terraform Associate (2024)
"""

@app.route("/api/health", methods=["GET"])
def health():
    gemini_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    return jsonify({
        "status": "healthy",
        "service": "AI Resume Analyzer Backend",
        "gemini_api_configured": bool(gemini_key and len(gemini_key) > 5)
    })

@app.route("/api/analyze", methods=["POST"])
def analyze():
    # Check if file is provided in request
    if "file" not in request.files:
        return jsonify({"success": False, "error": "No file uploaded. Please select a PDF or DOCX file."}), 400

    file = request.files["file"]
    if not file or file.filename == "":
        return jsonify({"success": False, "error": "Empty file uploaded."}), 400

    filename = file.filename
    if not is_allowed_file(filename):
        return jsonify({
            "success": False, 
            "error": "Unsupported file format. Please upload a PDF (.pdf) or Word document (.docx)."
        }), 400

    try:
        file_bytes = file.read()
        
        if len(file_bytes) > MAX_FILE_SIZE_BYTES:
            return jsonify({
                "success": False, 
                "error": "File size exceeds the 10MB limit. Please upload a smaller file."
            }), 400

        # Extract text from resume
        extracted_text = extract_resume_text(file_bytes, filename)
        
        # Check for optional API key in headers or form data
        custom_key = (
            request.form.get("gemini_api_key") or 
            request.headers.get("X-Gemini-Key") or 
            request.headers.get("Authorization", "").replace("Bearer ", "").strip()
        )
        if custom_key == "":
            custom_key = None

        # Analyze extracted resume text
        analysis_result = analyze_resume(extracted_text, api_key=custom_key)

        return jsonify({
            "success": True,
            "filename": filename,
            "file_size": len(file_bytes),
            "text_length": len(extracted_text),
            "data": analysis_result
        })

    except ValueError as ve:
        return jsonify({"success": False, "error": str(ve)}), 400
    except Exception as e:
        return jsonify({"success": False, "error": f"Analysis failed: {str(e)}"}), 500

@app.route("/api/sample", methods=["GET", "POST"])
def sample_analysis():
    """Provides instant sample analysis without uploading a file."""
    try:
        custom_key = (
            request.args.get("gemini_api_key") or 
            request.headers.get("X-Gemini-Key")
        )
        analysis_result = analyze_resume(SAMPLE_RESUME_TEXT, api_key=custom_key)
        return jsonify({
            "success": True,
            "filename": "Sample_Alex_Morgan_Resume.pdf",
            "file_size": 48200,
            "text_length": len(SAMPLE_RESUME_TEXT),
            "data": analysis_result
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    print(f"Starting AI Resume Analyzer Backend on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=False)
