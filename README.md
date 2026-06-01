# Resume Screening & Candidate Ranking System 

## Table of contents

- [Overview](#overview)
  - [Live Demo](#live-demo)
  - [Features Section](#features-section)
  - [Screenshot](#screenshot)
  - [Tech Stack](#tech-stack)
  - [Architecture Overview](#architecture-overview)
  - [Candidate Scoring Approach](#candidate-scoring-approach)
  - [Database Design](#database-design)
  - [Installation & Setup](#installation-Setup)
-[Assumptions](#assumptions)


## Overview

A Full Stack web apllication that automates the resumes screening process by comparing candidate resumes against a Job Description (JD) and ranking candidate based on their suitability for the role.

The application allows recruiters to upload multiple resumes and a job description, automatically extracts candidate information, analyzes skill and experience matches, calculates suitability scores, and generates a ranked candidate list.

### Live Demo

- Live Site URL: [resumre-screening-app](https://resume-screening-app-chi.vercel.app/)
- Solution URL: [Solution URL](https://github.com/shrikanth-dev/resume-screening-app)

### Features Section

**Resume Upload**

- Upload multiple resumes simultaneously
- Supports PDF and DOCX formats
- Drag and Drop file upload interface

**Job Description Analysis**

- Upload or paste a Job Description
- Extracts skills, experience requirements, and keywords

**Resume Parsing**

- Extracts:

- Candidate Name
- Email Address
- Skills
- Education
- Experience

**Candidate Scoring**

- Skill matching analysis
- Experience matching analysis
- Education matching analysis
- Keyword relevance analysis

**Resuts Dashboard**

- Ranked candidate list
- Match score visualization
- Matching skill display
- Missing skills display
- Candidate search functionality
- Candidate sorting functionality

**Additional Features**

- Resume preview
- CSV export
- PostgreSQL result storage
- Responsive UI design

### Screenshot

![Home Page](frontend/assets/uploadPage)
![Processing Page](frontend/assets/processingPage)
![Results Page](frontend/assets/resultsPage)


### Tech Stack

**Frontend**

- React.js
- Vite
- React Router Dom
- Axios
- React Icons
- React Circular Progressbar
- CSS3

**Backend**

- Node.js
- Express.js
- Multer
- pdf-parse
- Mammoth
- json2csv

**Database**

- PostgreSQL
- Neon PostgreSQL

**Deployment**

- Vercel(Frontend)
- Render(Backend)

**Vesion Control**

- Git
-gitHub
        

### Architecture Overview

The application follows a three tier architecture consisting of a frontend, backend, and database layer.

```text
User
 │
 ▼
React Frontend (Vercel)
 │
 ▼
Express Backend (Render)
 │
 ├── Resume Parser
 │   ├── PDF Parsing (pdf-parse)
 │   └── DOCX Parsing (Mammoth)
 │
 ├── JD Analyzer
 ├── Scoring Engine
 ├── CSV Export Service
 │
 ▼
PostgreSQL Database (Neon)
```

**Workflow**

- Recruiter uploads resumes and provides a Job Description.
- Backend extracts text from resumes.
- Candidate details such as skills, education, experience, and email are parsed.
- Job Description is analyzed to identify required skills, experience, and keywords.
- The scoring engine compares each resume against the Job Description.
- Candidates are ranked based on their final score.
- Results are displayed in the dashboard and stored in PostgreSQL.
- Recruiters can export results as a CSV file or preview uploaded resumes.
    
     
### Candidate Scoring Approach

The application evaluates each candidate by comparing resume data against the provided Job Description.

**Scoring Criteria**

| Criteria          | Weight |
|-------------------|--------|
| Skills Match      |  40%   |
| Experience Match  |  30%   |
| Education Match   |  20%   |
| Keyword Match     |  10%   |

**Skills Match (40%)**

The system compares the candidate's extracted skills with the skills identified in the Job Description.

**Formula:**

(Matched Skills / Required Skills) × 100

**Experience Match (30%)**

The system extracts years of experience from both the resume and the Job Description.

If candidate experience meets or exceeds the required experience, full marks are awarded.
If the candidate has less experience, a proportional score is calculated.

**Education Match (20%)**

The candidate's education is compared with the education requirements mentioned in the Job Description.

Important keywords are extracted from the Job Description and compared against the resume content.

**Formula:**

(Matched Keywords / Total Keywords) × 100
Final Score Calculation
Final Score =
(Skills Score × 0.40) +
(Experience Score × 0.30) +
(Education Score × 0.20) +
(Keyword Score × 0.10)
Candidate Ranking


## Database Design

The application uses PostgreSQL to store analyzed candidate information and ranking results.

### Candidates Table

| Column         | Data Type    | Description                |
| -------------- | ------------ | -------------------------- |
| id             | SERIAL       | Primary Key                |
| name           | VARCHAR(255) | Candidate Name             |
| email          | VARCHAR(255) | Candidate Email            |
| score          | INTEGER      | Final Candidate Score      |
| level          | VARCHAR(50)  | Candidate Rating Level     |
| rank           | INTEGER      | Candidate Rank             |
| matched_skills | TEXT         | Skills matched with JD     |
| missing_skills | TEXT         | Skills missing from resume |
| resume_file    | VARCHAR(255) | Uploaded Resume Filename   |
| created_at     | TIMESTAMP    | Record Creation Time       |

### Database Purpose

The database stores:

- Candidate details
- Analysis results
- Candidate rankings
- Skill matching information
- Resume metadata

### Benefits

- Persistent storage of analysis results
- Easy retrieval of ranked candidates
- Future reporting and analytics support
- Export-ready candidate data


## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/shrikanth-dev/resume-screening-app.git

cd resume-screening-app
```

---

### Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the backend directory:

```env
DATABASE_URL=your_postgresql_connection_string
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

### Frontend Setup

```bash
cd frontend

npm install
```

Create a `.env` file inside the frontend directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

### Database Setup

Create the following PostgreSQL table:

```sql
CREATE TABLE candidates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    score INTEGER,
    level VARCHAR(50),
    rank INTEGER,
    matched_skills TEXT,
    missing_skills TEXT,
    resume_file VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### Supported File Formats

    - PDF (.pdf)
    - DOCX (.docx)


## Assumptions

The following assumptions were made while building the application:

1. Resumes contain machine readable text and are not image only documents.

2. Candidate names are assumed to appear near the beginning of the resume.

3. Experience is extracted using text pattern matching and may vary depending on resume formatting.

4. Education qualifications are identified using common degree keywords such as:

   - Bachelor
   - Master
   - B.Tech
   - M.Tech
   - B.Sc
   - M.Sc
   - MBA

5. Skills are identified through keyword extraction and Job Description matching.

6. A higher score indicates a stronger match between the candidate profile and the Job Description.

7. The system currently supports:

   - PDF resumes
   - DOCX resumes

8. The ranking algorithm is designed to provide an initial screening mechanism and should be used as a support tool rather than a final hiring decision system.

9. Job Descriptions are assumed to contain sufficient information regarding required skills, education, and experience.