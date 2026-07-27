# 🗺️ SyncForge AI - Development Roadmap

This document outlines the detailed development phases for building and launching SyncForge AI.

---

## Phase 1: Project Setup
- [ ] Initialize Git repository and project structure.
- [ ] Create workspace configuration and establish coding guidelines.
- [ ] Set up the initial `docs` directory with system architecture and specifications.
- [ ] Draft initial task lists and set up progress tracking.

---

## Phase 2: React Frontend
- [ ] Initialize the React application with TypeScript and Tailwind CSS.
- [ ] Design and implement the global styling system and theme.
- [ ] Build key layouts: Sidebar, Navbar, and Footer.
- [ ] Implement the Landing Page, Login UI, and main Dashboard view.
- [ ] Implement state management with Redux Toolkit and routing with React Router.
- [ ] Set up basic UI tables and analytics charts using Recharts.

---

## Phase 3: Spring Boot Backend
- [ ] Initialize Spring Boot starter project with Java 21.
- [ ] Configure Spring Security with basic REST structures.
- [ ] Define the REST API controller endpoints for authentication, repositories, solutions, and analytics.
- [ ] Implement global exception handling and API response envelopes.
- [ ] Write integration and unit tests for API controllers.

---

## Phase 4: PostgreSQL Integration
- [ ] Configure PostgreSQL database connection in Spring Boot application.
- [ ] Write JPA Entity mappings for User, Repository, Problem, Submission, Analytics, AI Explanation, and Notes.
- [ ] Configure database migrations (e.g. Flyway or Liquibase).
- [ ] Set up Spring Data JPA Repositories.
- [ ] Perform transaction management verification and integration testing.

---

## Phase 5: Chrome Extension
- [ ] Setup Manifest V3 structure for the Chrome Extension.
- [ ] Build content scripts to detect LeetCode submissions and scrape metadata (title, runtime, code, language).
- [ ] Write background service workers to handle API communication with the Spring Boot backend.
- [ ] Develop the Extension Popup UI to show login status and toggle auto-sync.
- [ ] Set up storage sync for session tokens and status updates.

---

## Phase 6: GitHub OAuth
- [ ] Configure GitHub OAuth application credentials.
- [ ] Implement Spring Security OAuth2 Client integration on the backend.
- [ ] Enable secure JWT issuance upon successful GitHub OAuth callback.
- [ ] Integrate GitHub API client to handle automated repository creation, branch checking, and code commits.
- [ ] Connect the frontend to trigger GitHub authentication flow.

---

## Phase 7: AI Integration
- [ ] Set up LangChain4j integration within the Spring Boot backend.
- [ ] Configure connection to OpenAI API (or other LLMs).
- [ ] Implement prompting strategies for code explanation, complexity analysis, and optimization tips.
- [ ] Design RAG capability for retrieving problem references or similar questions.
- [ ] Implement problem recommendation engine based on user analytics.

---

## Phase 8: Docker & CI/CD
- [ ] Containerize the Spring Boot backend, React frontend, and PostgreSQL database using Docker.
- [ ] Write a `docker-compose.yml` for simplified local setup.
- [ ] Configure GitHub Actions workflows for automated linting, building, and running tests.
- [ ] Set up Docker image publishing to GitHub Packages or Docker Hub.

---

## Phase 9: Deployment
- [ ] Deploy the React frontend to Vercel.
- [ ] Deploy the Spring Boot backend to AWS EC2 (or similar cloud hosting provider).
- [ ] Spin up a managed PostgreSQL database instance.
- [ ] Set up secure DNS records, SSL certificates via Let's Encrypt, and API proxy routing.
- [ ] Conduct end-to-end system testing, performance benchmarks, and security audits.
