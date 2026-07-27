# 🗄️ Database Design

## Database

PostgreSQL

---

# Overview

SyncForge AI stores user information, coding solutions, GitHub repositories, analytics, and AI-generated content in a PostgreSQL database.

---

# Entities

## 1. User

Stores registered user information.

| Field | Type |
|-------|------|
| id | UUID |
| github_id | String |
| username | String |
| email | String |
| avatar_url | String |
| created_at | Timestamp |
| updated_at | Timestamp |

---

## 2. Repository

Stores connected GitHub repositories.

| Field | Type |
|-------|------|
| id | UUID |
| user_id | UUID |
| repository_name | String |
| repository_url | String |
| default_branch | String |
| created_at | Timestamp |

---

## 3. Problem

Stores coding problem metadata.

| Field | Type |
|-------|------|
| id | UUID |
| platform | String |
| title | String |
| slug | String |
| difficulty | String |
| topic | String |
| problem_url | String |

---

## 4. Submission

Stores accepted solutions.

| Field | Type |
|-------|------|
| id | UUID |
| user_id | UUID |
| problem_id | UUID |
| repository_id | UUID |
| language | String |
| code | TEXT |
| runtime | String |
| memory | String |
| commit_sha | String |
| synced | Boolean |
| submitted_at | Timestamp |

---

## 5. Analytics

Stores coding statistics.

| Field | Type |
|-------|------|
| id | UUID |
| user_id | UUID |
| total_solved | Integer |
| easy_count | Integer |
| medium_count | Integer |
| hard_count | Integer |
| current_streak | Integer |
| longest_streak | Integer |
| updated_at | Timestamp |

---

## 6. AI Explanation

Stores AI-generated explanations.

| Field | Type |
|-------|------|
| id | UUID |
| submission_id | UUID |
| explanation | TEXT |
| time_complexity | String |
| space_complexity | String |
| optimization | TEXT |
| generated_at | Timestamp |

---

## 7. Notes

Stores personal notes.

| Field | Type |
|-------|------|
| id | UUID |
| submission_id | UUID |
| user_id | UUID |
| title | String |
| content | TEXT |
| created_at | Timestamp |

---

# Relationships

User
│
├── Repository
│
├── Submission
│
├── Analytics
│
└── Notes

Problem
│
└── Submission
      │
      └── AI Explanation

---

# Primary Keys

- User → id
- Repository → id
- Problem → id
- Submission → id
- Analytics → id
- AI Explanation → id
- Notes → id

---

# Foreign Keys

Repository.user_id → User.id

Submission.user_id → User.id

Submission.problem_id → Problem.id

Submission.repository_id → Repository.id

Analytics.user_id → User.id

Notes.user_id → User.id

Notes.submission_id → Submission.id

AI Explanation.submission_id → Submission.id

---

# Future Tables

- Coding Streak History
- Revision Schedule
- Notification
- Company Tags
- Contest History
- Achievement
- Badges
- AI Chat History
