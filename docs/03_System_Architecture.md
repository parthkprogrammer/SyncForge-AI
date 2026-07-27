# 🏗️ System Architecture

# High-Level Architecture

```
                        +------------------------+
                        |      User Browser      |
                        +-----------+------------+
                                    |
                  +-----------------+-----------------+
                  |                                   |
                  ▼                                   ▼
         Chrome Extension                    React Web Dashboard
                  |                                   |
                  +---------------+-------------------+
                                  |
                                  ▼
                     Spring Boot REST API
                                  |
        +-----------+-------------+-------------+-------------+
        |           |                           |             |
        ▼           ▼                           ▼             ▼
 PostgreSQL    GitHub API                 AI Service      Notification
 Database                                (LangChain)      Service
                                  |
                                  ▼
                             OpenAI API
```

---

# Components

## 1. React Frontend

Responsibilities

- Login
- Dashboard
- Analytics
- Settings
- Search
- Notes

Technology

- React
- TypeScript
- Tailwind CSS
- Redux Toolkit

---

## 2. Chrome Extension

Responsibilities

- Detect accepted submissions
- Extract solution
- Collect metadata
- Send solution to backend

Technology

- Manifest V3
- TypeScript
- Chrome APIs

---

## 3. Spring Boot Backend

Responsibilities

- Authentication
- GitHub Integration
- REST APIs
- Business Logic
- AI Communication
- Database Operations

Technology

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA

---

## 4. PostgreSQL

Stores

- Users
- Problems
- Solutions
- Statistics
- Notes
- Repositories

---

## 5. GitHub API

Responsibilities

- Repository creation
- File upload
- Commit creation
- Branch management

---

## 6. AI Module

Responsibilities

- Explain code
- Time complexity
- Space complexity
- Suggest improvements
- Generate notes

Technology

- LangChain4j
- OpenAI API
- RAG

---

# Data Flow

1. User solves a coding problem.
2. Chrome Extension detects accepted submission.
3. Extension extracts source code and metadata.
4. Data is sent to Spring Boot Backend.
5. Backend stores information in PostgreSQL.
6. Backend pushes solution to GitHub.
7. Dashboard updates analytics.
8. AI generates explanation and recommendations.

---

# Security

- GitHub OAuth
- JWT Authentication
- HTTPS
- Encrypted Tokens
- Secure API Communication

---

# Deployment

Frontend → Vercel

Backend → AWS EC2

Database → PostgreSQL

Docker → Containerized Services

CI/CD → GitHub Actions
