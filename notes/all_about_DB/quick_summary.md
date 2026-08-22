# MEDLINK Database Context (Backend AI Summary)

> **Purpose:** This document is a concise context file for AI assistants working on the MEDLINK backend. It summarizes the PostgreSQL database design, relationships, and conventions without listing every column. Developers can provide individual table schemas later when implementing specific APIs.

---

# Project Overview

**Project Name:** MEDLINK — *Connecting Care. Saving Lives.*

MEDLINK is an AI-assisted emergency healthcare platform that helps users:

- Receive AI medical guidance
- Find nearby hospitals
- Reserve hospital beds
- View ambulance contacts
- Manage blood donation information
- Track medical events
- Handle hospital administration
- Process reservation payments

The backend is being built using:

- PostgreSQL
- Express.js
- Node.js

Primary keys use **UUIDs** generated with PostgreSQL's `pgcrypto` extension.

---

# Database Statistics

| Item | Count |
|------|------:|
| Database | 1 |
| Tables | 16 |
| ENUM Types | 11 |
| Trigger Function | 1 |
| Triggers | 9 |

---

# Database Design Principles

- Fully normalized (mostly 3NF)
- UUID primary keys
- Strong foreign-key relationships
- Enum-based status management
- Automatic timestamp updates using triggers
- Authentication separated from profile information
- Medical events separated from AI responses
- Reservation workflow isolated from payment workflow
- Designed for scalability and future Phase 2 features

---

# ENUM Types

The project uses the following ENUMs:

| ENUM |
|------|
| role_type |
| gender_type |
| blood_group_type |
| hospital_status_type |
| bed_status_type |
| severity_type |
| event_status_type |
| reservation_mode_type |
| reservation_status_type |
| payment_method_type |
| payment_status_type |

These ENUMs replace string values throughout the database to ensure data consistency.

---

# Database Modules

## 1. User Module

Responsible for authentication and user information.

Tables:

- users
- user_profiles
- user_locations
- blood_information
- blood_donation_history

Purpose:

- Login
- Authentication
- Personal information
- Blood donation availability
- Donation history
- User location

---

## 2. Hospital Module

Responsible for hospital management.

Tables:

- hospitals
- hospital_admins
- hospital_wards
- hospital_beds

Purpose:

- Hospital information
- Hospital administrators
- Wards
- Bed management

---

## 3. Ambulance Module

Tables:

- ambulance_providers

Purpose:

Stores ambulance provider contact information.

Phase 1 does **not** include ambulance booking.

---

## 4. AI & Event Module

Tables:

- medical_events
- ai_responses
- event_hospitals
- event_ambulances

Purpose:

- Save AI consultations
- Store GPT-generated responses
- Recommend nearby hospitals
- Recommend ambulance providers

Every AI consultation becomes a **Medical Event**.

---

## 5. Reservation Module

Tables:

- reservations

Purpose:

Stores hospital reservation requests.

Reservation supports:

- Normal
- Emergency

---

## 6. Payment Module

Tables:

- payments

Purpose:

Stores payment information for reservations.

---

# High-Level Table Relationships

```text
users
│
├── user_profiles
├── user_locations
├── blood_information
│      │
│      └── blood_donation_history
│
├── medical_events
│      │
│      ├── ai_responses
│      ├── event_hospitals
│      └── event_ambulances
│
└── reservations
       │
       └── payments


hospitals
│
├── hospital_admins
├── hospital_wards
│       │
│       └── hospital_beds
│
├── blood_donation_history
├── event_hospitals
└── reservations


ambulance_providers
│
└── event_ambulances
```

---

# Core Workflow

## User Registration

```
users
    ↓
user_profiles
    ↓
user_locations
    ↓
blood_information
```

---

## AI Consultation

```
User submits symptoms
        ↓
medical_events
        ↓
AI Processing
        ↓
ai_responses
        ↓
Nearby Hospitals
        ↓
event_hospitals
        ↓
Nearby Ambulances
        ↓
event_ambulances
```

---

## Reservation Flow

```
medical_events
        ↓
reservations
        ↓
Hospital Approval
        ↓
payments
```

---

# Main Relationships

One-to-One

- users ↔ user_profiles
- users ↔ user_locations
- users ↔ blood_information
- medical_events ↔ ai_responses
- reservations ↔ payments
- hospital_admins ↔ users

---

One-to-Many

Examples:

- user → medical_events
- hospital → wards
- ward → beds
- hospital → reservations
- user → reservations
- hospital → blood donations

---

Many-to-Many

Implemented using bridge tables:

medical_events ↔ hospitals

through:

- event_hospitals

medical_events ↔ ambulance_providers

through:

- event_ambulances

---

# Automatic Triggers

One reusable PostgreSQL function:

```
update_updated_at_column()
```

Automatically updates `updated_at`.

Used by:

- users
- user_profiles
- user_locations
- blood_information
- hospitals
- hospital_wards
- hospital_beds
- medical_events
- reservations

---

# Authentication Design

The authentication table is intentionally lightweight.

Authentication data:

- email
- phone
- password_hash
- role
- verification status

Personal information is stored separately in:

```
user_profiles
```

This improves security and normalization.

---

# AI System Design

The GPT response is **never stored directly in medical_events**.

Instead:

```
medical_events
        │
        ▼
ai_responses
```

This separation allows:

- Better normalization
- Easier future AI model upgrades
- Multiple AI providers in future
- Cleaner API responses

---

# Hospital Recommendation Design

Nearby hospitals are **not** permanently linked.

Instead:

```
medical_events
        │
        ▼
event_hospitals
```

Every medical event stores its own recommendations.

This preserves historical recommendations even if hospital availability changes later.

---

# Reservation Philosophy

Reservations are independent from hospitals.

A reservation connects:

- user
- medical event
- hospital
- ward
- optional bed

This makes future features easier, including:

- Waiting lists
- Transfers
- ICU upgrades
- Reservation history

---

# Backend Conventions

The backend should follow these conventions:

- UUIDs for all IDs
- Never store plaintext passwords (store only `password_hash`)
- Use bcrypt for password hashing
- Use JWT authentication
- Soft business logic in Express services
- Database responsible only for data integrity
- Validate all incoming requests
- Never expose password hashes in API responses

---

# Current Phase Scope

Implemented:

- User management
- Hospital management
- AI event management
- Ambulance provider listing
- Bed management
- Reservation system
- Payment records
- Blood donation records

Not implemented yet:

- Live ambulance booking
- Live GPS tracking
- Push notifications
- Hospital analytics
- Payment gateway integration
- AI conversation history
- Medical reports
- File uploads

---

# Notes for Future AI Assistants

When implementing backend APIs:

- Assume the PostgreSQL schema already exists.
- Use the existing foreign-key relationships instead of creating new tables.
- Reuse the existing ENUM types.
- Respect all constraints and triggers.
- If a specific endpoint requires exact column names or data types, request only the relevant table schema rather than redesigning the database.

This document provides architectural context only. The detailed schema documentation remains the source of truth for individual columns, constraints, and SQL definitions.