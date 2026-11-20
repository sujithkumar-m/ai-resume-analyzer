"""
Test script to generate a sample PDF and DOCX resume, and verify parser & analyzer.
"""
import os
import io
import fitz # PyMuPDF
import docx

from parser import extract_resume_text
from analyzer import analyze_resume

def create_sample_files():
    os.makedirs("test_samples", exist_ok=True)
    pdf_path = os.path.join("test_samples", "sample_resume.pdf")
    docx_path = os.path.join("test_samples", "sample_resume.docx")

    resume_text = """EMILY ZHANG
Email: emily.zhang.tech@example.com | Phone: (415) 890-1234
Location: Seattle, WA | LinkedIn: linkedin.com/in/emilyzhang-swe | GitHub: github.com/emilyzhang

PROFESSIONAL SUMMARY
Senior Software Engineer with 6 years of expertise building scalable backend systems, cloud architectures, and machine learning pipelines. Reduced database latency by 35% and scaled microservices to 5M+ DAU.

TECHNICAL SKILLS
Languages: Python, Go, TypeScript, Java, SQL
Frameworks: React, FastAPI, Flask, Django, Node.js, PyTorch
Databases: PostgreSQL, Redis, MongoDB, DynamoDB
Tools & Cloud: AWS, Docker, Kubernetes, Git, CI/CD, Terraform

WORK EXPERIENCE
Senior Software Engineer | Apex Cloud Technologies, Seattle, WA | 2021 - Present
- Architected and deployed a multi-tenant cloud service handling 45,000 requests per minute with 99.99% availability.
- Spearheaded database partitioning and Redis caching layer, decreasing response latency by 35%.
- Led cross-functional team of 8 engineers in migrating legacy monolithic architecture to Kubernetes microservices.

Software Engineer | NextGen Innovations, San Francisco, CA | 2018 - 2021
- Developed real-time streaming ETL pipelines using Python and Kafka processing 5TB of data daily.
- Built internal analytics dashboard in React and Tailwind CSS utilized by 400+ internal stakeholders.

EDUCATION
Bachelor of Science in Computer Science
University of Washington | 2014 - 2018
- Magna Cum Laude, GPA: 3.9/4.0

PROJECTS
NeuroStream - Real-time AI Event Streamer
- Technologies: Python, FastAPI, Docker, PyTorch, React
- Description: Distributed event processing framework for real-time deep learning inference.
- Highlights: Over 2,400 GitHub stars and adopted by 15 production startups.

CERTIFICATIONS
- AWS Certified Solutions Architect - Professional (2023)
- Certified Kubernetes Administrator (CKA) (2024)
"""

    # 1. Create PDF
    doc = fitz.open()
    page = doc.new_page()
    rect = fitz.Rect(50, 50, 550, 750)
    page.insert_textbox(rect, resume_text, fontsize=10, fontname="helv")
    doc.save(pdf_path)
    doc.close()
    print(f"Created sample PDF: {pdf_path}")

    # 2. Create DOCX
    d = docx.Document()
    for line in resume_text.split("\n"):
        if line.strip():
            d.add_paragraph(line.strip())
    d.save(docx_path)
    print(f"Created sample DOCX: {docx_path}")

    # 3. Test PDF Extraction
    with open(pdf_path, "rb") as f:
        pdf_bytes = f.read()
    extracted_pdf_text = extract_resume_text(pdf_bytes, "sample_resume.pdf")
    print(f"Extracted PDF text length: {len(extracted_pdf_text)} chars")
    assert len(extracted_pdf_text) > 100, "PDF extraction failed"

    # 4. Test DOCX Extraction
    with open(docx_path, "rb") as f:
        docx_bytes = f.read()
    extracted_docx_text = extract_resume_text(docx_bytes, "sample_resume.docx")
    print(f"Extracted DOCX text length: {len(extracted_docx_text)} chars")
    assert len(extracted_docx_text) > 100, "DOCX extraction failed"

    # 5. Test Analyzer
    analysis = analyze_resume(extracted_pdf_text)
    print("Analyzer returned keys:", list(analysis.keys()))
    print("Candidate Name:", analysis["candidate_information"]["name"])
    print("ATS Score:", analysis["ats_analysis"]["overall_ats_score"])
    print("Technical Skills detected:", len(analysis["candidate_information"]["technical_skills"]["all"]))
    print("All unit tests passed successfully!")

if __name__ == "__main__":
    create_sample_files()
