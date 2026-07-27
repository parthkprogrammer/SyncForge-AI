# SyncForge-AI
Where every accepted solution becomes part of your engineering journey.
# 🚀 SyncForge-AI

> Your Intelligent Coding Journey, Automatically Organized.

SyncForge-AI is an AI-powered developer productivity platform that automatically syncs accepted coding solutions from platforms like LeetCode to GitHub, generates AI-powered explanations, tracks coding progress, and provides analytics through a modern dashboard.

---

## 📌 Overview

SyncForge-AI helps developers maintain a structured coding portfolio by automatically organizing accepted coding solutions while providing intelligent insights, progress tracking, revision planning, and AI-assisted learning.

Instead of manually uploading every solution to GitHub, CodeCompass AI automates the entire workflow and transforms your coding journey into a searchable knowledge base.

---

## ✨ Features

### 🔄 Automatic GitHub Sync
- Detect accepted coding submissions
- Upload solutions automatically
- Organize solutions by platform and topic
- Auto-generate commits

### 📊 Coding Analytics
- Daily coding streak
- Problems solved
- Difficulty distribution
- Topic-wise progress
- Language usage
- GitHub activity

### 🤖 AI Assistant
- Explain algorithms
- Time Complexity
- Space Complexity
- Better approaches
- Interview tips
- Personalized learning recommendations

### 📚 Smart Knowledge Base
- Search previous solutions
- Personal notes
- AI summaries
- Revision reminders

### 🔐 Secure Authentication
- GitHub OAuth
- JWT Authentication
- Secure API access

### 🌐 Browser Extension
- Detect accepted submissions
- Extract solution code
- Sync automatically
- Background processing

---

# 🏗️ Architecture

```
Browser Extension
        │
        ▼
Spring Boot REST API
        │
 ┌──────┴────────┐
 │               │
 ▼               ▼
GitHub API    PostgreSQL
        │
        ▼
 React Dashboard
        │
        ▼
 AI Assistant (LangChain + RAG)
```

---

# 🛠️ Tech Stack

## Frontend

- React
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios

## Browser Extension

- Chrome Extension (Manifest V3)
- TypeScript
- Chrome APIs
- Content Scripts

## Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT Authentication
- REST APIs

## Database

- PostgreSQL

## AI

- OpenAI API
- LangChain4j
- RAG
- Prompt Engineering

## DevOps

- Docker
- GitHub Actions
- AWS

---

# 📂 Project Structure

```
CodeCompass-AI

backend/
frontend/
extension/
database/
docker/
docs/
.github/
README.md
```

---

# 🚀 Core Modules

- Authentication
- Browser Extension
- GitHub Integration
- Solution Management
- AI Assistant
- Analytics Dashboard
- Repository Management
- Revision Planner
- Notification System

---

# 📈 Future Features

- Multi-platform support
    - LeetCode
    - HackerRank
    - Codeforces
    - CodeChef
    - GeeksforGeeks

- VS Code Extension

- Firefox Extension

- AI Interview Preparation

- Company-wise Question Tracking

- Contest Analytics

- Mobile Application

---

# 📸 Screenshots

Coming Soon...

---

# ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/SyncForge-AI.git
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
mvn spring-boot:run
```

### Database

```bash
docker-compose up postgres
```

---

# 🔑 Environment Variables

Backend

```
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=

JWT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

OPENAI_API_KEY=
```

---

# 📊 Development Roadmap

## Phase 1
- Project Setup
- React Dashboard
- Spring Boot API
- PostgreSQL

## Phase 2
- Browser Extension
- GitHub Sync
- OAuth Authentication

## Phase 3
- AI Explanations
- RAG
- Search
- Analytics

## Phase 4
- Docker
- CI/CD
- AWS Deployment

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```
git checkout -b feature/new-feature
```

3. Commit changes

```
git commit -m "Add new feature"
```

4. Push branch

```
git push origin feature/new-feature
```

5. Create Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Parth Kedar**

- GitHub: https://github.com/parthkprogrammer
- LinkedIn: https://linkedin.com/in/parthkeadr

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.
