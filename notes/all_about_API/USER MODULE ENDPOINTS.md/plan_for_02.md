# 2. USER MODULE ENDPOINTS

### Profile Setup

2.1 POST /api/v1/users/profile
Create user profile | Auth Required | Roles: All

2.2 POST /api/v1/users/blood-information
Create blood information | Auth Required | Roles: All


Update -->    POST /api/v1/users/profile

### Profile Management

2.3 GET /api/v1/users/profile
Get current user profile | Auth Required | Roles: All

2.4 PUT /api/v1/users/profile
Update user profile | Auth Required

2.5 GET /api/v1/users/{userId}
Get user details by ID | Super Admin

2.6 DELETE /api/v1/users/{userId}
Delete user account

2.7 PUT /api/v1/users/profile/password  ---> phase 2
Phase 2

2.8 GET /api/v1/users/all
Super Admin

2.9 PUT /api/v1/users/{userId}/role
Super Admin

2.10 PUT /api/v1/users/{userId}/status
Phase 2

### User Location

2.11 GET /api/v1/users/location


src/
│
├── routes/
│     └── user.routes.js
│
├── controllers/
│     └── user.controller.js
│
├── services/
│     └── user.service.js
│
├── models/
│     └── user.model.js
│
└── validations/
      └── user.validation.js



now its the time to build last part of the User Module
Time: 2026-08-07T10:14:20.268Z

| Order | Endpoint                          | Difficulty | 
| ----- | --------------------------------- | ---------- | 
|   1   | `GET /api/v1/users/{userId}`      | Easy       | 
|   2   | `GET /api/v1/users/all`           | Easy       | 
|   3   | `PUT /api/v1/users/{userId}/role` | Easy       | 
|   4   | `DELETE /api/v1/users/{userId}`   | Medium     | 
|   5   | `GET /api/v1/users/location`      | Very Easy  | 
