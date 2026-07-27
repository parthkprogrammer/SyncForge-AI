# 🧩 Chrome Extension Design

## Overview

The Chrome Extension automatically detects accepted coding submissions from supported platforms, extracts the solution code and metadata, and securely sends the data to the SyncForge AI backend.

---

# Objectives

- Detect accepted submissions
- Extract problem details
- Extract source code
- Send data to backend
- Show sync status to the user

---

# Supported Platforms (Initial)

- LeetCode

---

# Future Platforms

- HackerRank
- Codeforces
- CodeChef
- AtCoder
- GeeksforGeeks

---

# Extension Components

## Manifest

Responsibilities

- Register permissions
- Register background service worker
- Register popup page
- Register content scripts

---

## Content Script

Responsibilities

- Detect accepted submission
- Read problem title
- Read difficulty
- Read programming language
- Read solution code
- Send extracted data

---

## Background Service Worker

Responsibilities

- Receive messages
- Authenticate user
- Call backend APIs
- Handle retries
- Display notifications

---

## Popup UI

Displays

- Login Status
- GitHub Connection
- Last Sync
- Total Synced Problems
- Sync Button
- Settings

---

# Data Extracted

- Platform
- Problem Title
- Problem URL
- Difficulty
- Topic
- Programming Language
- Solution Code
- Runtime
- Memory Usage
- Submission Time

---

# Data Flow

1. User solves a problem.
2. Platform marks submission as Accepted.
3. Content Script detects the event.
4. Solution data is extracted.
5. Background Service Worker sends the data to the backend.
6. Backend stores data in PostgreSQL.
7. Backend pushes the solution to GitHub.
8. Popup displays "Sync Successful".

---

# Permissions

- activeTab
- storage
- scripting
- notifications
- identity

---

# Folder Structure

extension/

├── manifest.json

├── background/

├── content/

├── popup/

├── assets/

└── utils/

---

# Future Enhancements

- Manual Sync
- Offline Queue
- Multi-browser Support
- Sync History
- Custom Repository Selection
- Automatic Folder Organization
