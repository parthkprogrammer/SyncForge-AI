# 🔌 REST API Design

## Overview

The SyncForge AI backend exposes REST APIs for authentication, GitHub synchronization, problem management, analytics, AI features, and user profile management.

---

# Base URL

http://localhost:8080/api/v1

---

# Authentication APIs

## Login with GitHub

POST /auth/github

Description:
Authenticate the user using GitHub OAuth.

Response

{
  "accessToken": "...",
  "refreshToken": "...",
  "user": {}
}

---

## Logout

POST /auth/logout

---

## Get Current User

GET /users/me

---

# Repository APIs

## Get Connected Repositories

GET /repositories

---

## Connect Repository

POST /repositories

---

## Delete Repository

DELETE /repositories/{id}

---

# Problem APIs

## Get All Problems

GET /problems

Query Parameters

?page=0
&size=20
&difficulty=Easy
&topic=Array
&platform=LeetCode

---

## Get Problem Details

GET /problems/{id}

---

# Submission APIs

## Save Submission

POST /submissions

Request

{
  "problemId": "...",
  "language": "Java",
  "code": "...",
  "runtime": "0 ms",
  "memory": "42 MB"
}

---

## Get User Submissions

GET /submissions

---

## Get Submission

GET /submissions/{id}

---

## Delete Submission

DELETE /submissions/{id}

---

# GitHub Sync APIs

## Synchronize Solution

POST /sync

---

## Get Sync Status

GET /sync/status

---

# Analytics APIs

## Dashboard Statistics

GET /analytics/dashboard

Response

{
  "totalSolved": 250,
  "easy": 120,
  "medium": 100,
  "hard": 30,
  "currentStreak": 15
}

---

## Topic Statistics

GET /analytics/topics

---

## Language Statistics

GET /analytics/languages

---

# AI APIs

## Explain Code

POST /ai/explain

---

## Optimize Solution

POST /ai/optimize

---

## Generate Notes

POST /ai/notes

---

## Suggest Next Problems

GET /ai/recommendations

---

# Notes APIs

## Create Note

POST /notes

---

## Update Note

PUT /notes/{id}

---

## Delete Note

DELETE /notes/{id}

---

## Get Notes

GET /notes

---

# Health Check

GET /health

Response

{
  "status": "UP"
}

---

# HTTP Status Codes

200 OK

201 Created

204 No Content

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

500 Internal Server Error
