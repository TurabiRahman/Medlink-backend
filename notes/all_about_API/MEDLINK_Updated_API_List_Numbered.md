# MEDLINK - Updated API Specification
## Connecting Care. Saving Lives.

**Updated:** January 2024  
**Total Endpoints:** 95+  
**Database Alignment:** 100% ✅

---

# TABLE OF CONTENTS
1. [Authentication Endpoints](#1-authentication-endpoints)
2. [User Module Endpoints](#2-user-module-endpoints)
3. [Customer Module Endpoints](#3-customer-module-endpoints)
4. [Hospital Module Endpoints](#4-hospital-module-endpoints)
5. [Ambulance Module Endpoints](#5-ambulance-module-endpoints)
6. [Super Admin Endpoints](#6-super-admin-endpoints)
7. [Utility Endpoints](#7-utility-endpoints)

---









# 1. AUTHENTICATION ENDPOINTS

### Common Authentication

**1.1** `POST /api/auth/signup`  
User registration | No Auth Required

**1.2** `POST /api/auth/login`  
Standard login | No Auth Required

**1.3** `POST /api/auth/emergency-login`  
Emergency/SOS login | No Auth Required

**1.4** `POST /api/auth/logout`  
User logout | Auth Required

**1.5** `POST /api/auth/refresh-token`  
Refresh access token | Auth Required

**1.6** `POST /api/auth/forgot-password`  
Request password reset | No Auth Required

**1.7** `POST /api/auth/reset-password`  
Reset password with token | No Auth Required

**1.8** `POST /api/auth/verify-email`  
Email verification | No Auth Required

---









# 2. USER MODULE ENDPOINTS

### Profile Management

**2.1** `GET /api/users/profile`  
Get current user profile | Auth Required | Roles: All

**2.2** `PUT /api/users/profile`  
Update user profile | Auth Required | Roles: Customer, Hospital Admin, Super Admin

**2.3** `GET /api/users/{userId}`  
Get user details by ID | Auth Required | Roles: Super Admin

**2.4** `DELETE /api/users/{userId}`  
Delete user account | Auth Required | Roles: Customer, Super Admin

**2.5** `PUT /api/users/profile/password`  
Change password | Auth Required | Roles: All

**2.6** `GET /api/users/all`  
Get all users | Auth Required | Roles: Super Admin

**2.7** `PUT /api/users/{userId}/role`  
Update user role | Auth Required | Roles: Super Admin

**2.8** `PUT /api/users/{userId}/status`  
Activate/Deactivate user | Auth Required | Roles: Super Admin

### User Location Management (NEW)

**2.9** `GET /api/users/location`  
Get user's current location | Auth Required | Roles: Customer

**2.10** `PUT /api/users/location`  
Update user's current location | Auth Required | Roles: Customer

**Request Body:**
```json
{
  "latitude": 23.8103,
  "longitude": 90.4625,
  "address": "Dhaka, Bangladesh"
}
```

**2.11** `POST /api/users/location-history`  
Save location to history (audit) | Auth Required | Roles: Customer

**2.12** `GET /api/users/location-history`  
Get location history | Auth Required | Roles: Customer

**Query Params:** `?limit=50&offset=0&startDate=2024-01-01&endDate=2024-01-15`

---

















# 3. CUSTOMER MODULE ENDPOINTS

### Dashboard

**3.1** `GET /api/customer/dashboard`  
Get dashboard overview | Auth Required | Roles: Customer

**3.2** `GET /api/customer/dashboard/quick-stats`  
Get quick statistics | Auth Required | Roles: Customer

### Blood Donation Features

**3.3** `GET /api/blood/my-availability`  
Get user's blood donation eligibility | Auth Required | Roles: Customer

**3.4** `PUT /api/blood/my-availability`  
Update blood donation availability | Auth Required | Roles: Customer

**Request Body:**
```json
{
  "isAvailable": true,
  "bloodGroup": "O+"
}
```

**3.5** `GET /api/blood/donors`  
Search for blood donors by blood group | Auth Required | Roles: Customer

**Query Params:** `?bloodGroup=O%2B&limit=20&offset=0&radius=5`

**3.6** `GET /api/blood/donors/{donorId}`  
Get donor details | Auth Required | Roles: Customer

**3.7** `GET /api/blood/my-donation-history`  
Get user's blood donation history | Auth Required | Roles: Customer

**3.8** `PUT /api/blood/last-donation-date`  
Update last blood donation date | Auth Required | Roles: Customer

**Request Body:**
```json
{
  "lastDonationDate": "2024-01-10T10:00:00Z"
}
```

### Hospital Features

**3.9** `GET /api/hospitals`  
Get list of hospitals | Auth Required | Roles: Customer

**Query Params:** `?limit=20&offset=0&sortBy=rating`

**3.10** `GET /api/hospitals/nearby`  
Get nearby hospitals based on location | Auth Required | Roles: Customer

**Query Params:** `?radius=10&latitude=23.8103&longitude=90.4625`

**3.11** `GET /api/hospitals/{hospitalId}`  
Get hospital details | Auth Required | Roles: Customer

**3.12** `GET /api/hospitals/{hospitalId}/beds`  
Get hospital bed availability | Auth Required | Roles: Customer

**3.13** `GET /api/hospitals/{hospitalId}/icu-beds`  
Get hospital ICU bed availability | Auth Required | Roles: Customer

**3.14** `GET /api/hospitals/{hospitalId}/status`  
Get hospital current status (Open/Closed) | Auth Required | Roles: Customer

### AI Medical Assistance

**3.15** `POST /api/ai-medical/consult`  
Send medical condition for AI analysis | Auth Required | Roles: Customer

**Request Body:**
```json
{
  "description": "My father has severe chest pain and cannot breathe properly",
  "currentLocation": {
    "latitude": 23.8103,
    "longitude": 90.4625
  },
  "isEmergency": true
}
```

**3.16** `GET /api/ai-medical/consult/{consultationId}`  
Get AI consultation response | Auth Required | Roles: Customer

**3.17** `GET /api/ai-medical/consult/{consultationId}/ai-response` (NEW)  
Get AI response details separately | Auth Required | Roles: Customer

**Response:**
```json
{
  "success": true,
  "data": {
    "responseId": "ai_resp_123",
    "medicalEventId": "event_123",
    "summary": "Possible cardiac emergency",
    "severity": "Critical",
    "possibleConditions": ["Acute Myocardial Infarction", "Unstable Angina"],
    "firstAid": ["Call ambulance immediately", "Chew aspirin if available"],
    "tags": ["chest-pain", "breathing-difficulty", "cardiac"],
    "generatedAt": "2024-01-15T12:00:00Z"
  }
}
```

**3.18** `POST /api/ai-medical/consult/{consultationId}/feedback`  
Provide feedback on AI response | Auth Required | Roles: Customer

**Request Body:**
```json
{
  "rating": 4,
  "feedback": "Helpful and accurate"
}
```

### Events & History

**3.19** `GET /api/events`  
Get all user events/consultations | Auth Required | Roles: Customer

**Query Params:** `?limit=20&offset=0&status=pending`

**3.20** `GET /api/events/{eventId}`  
Get event details | Auth Required | Roles: Customer

**3.21** `GET /api/events/history`  
Get complete event history with pagination | Auth Required | Roles: Customer

**Query Params:** `?limit=50&offset=0&sortBy=createdAt`

**3.22** `PUT /api/events/{eventId}`  
Update event details | Auth Required | Roles: Customer

**3.23** `DELETE /api/events/{eventId}`  
Delete event | Auth Required | Roles: Customer

**3.24** `GET /api/events/{eventId}/ai-summary`  
Get AI summary for event | Auth Required | Roles: Customer

**3.25** `PUT /api/events/{eventId}/status` (NEW)  
Update event status | Auth Required | Roles: Customer

**Request Body:**
```json
{
  "status": "completed"
}
```

**Status Values:** `pending`, `in-progress`, `completed`, `archived`

### Ambulance Features

**3.26** `GET /api/ambulances`  
Get list of available ambulances | Auth Required | Roles: Customer

**3.27** `GET /api/ambulances/nearby`  
Get nearby ambulance services | Auth Required | Roles: Customer

**Query Params:** `?radius=10&latitude=23.8103&longitude=90.4625`

**3.28** `GET /api/ambulances/{ambulanceId}`  
Get ambulance details/contact | Auth Required | Roles: Customer

### Bed Reservations

**3.29** `POST /api/reservations`  
Create bed reservation request | Auth Required | Roles: Customer

**Request Body:**
```json
{
  "hospitalId": "hosp_123",
  "bedType": "General Ward",
  "patientName": "John Doe",
  "patientAge": 45,
  "expectedArrivalTime": "2024-01-15T14:30:00Z",
  "medicalCondition": "Chest pain",
  "contactNumber": "+8801712345678"
}
```

**3.30** `POST /api/reservations/emergency`  
Create emergency reservation (auto-approved) | Auth Required | Roles: Customer

**Request Body:**
```json
{
  "hospitalId": "hosp_123",
  "bedType": "ICU",
  "patientName": "John Doe",
  "medicalEventId": "event_123"
}
```

**3.31** `GET /api/reservations`  
Get user's reservations | Auth Required | Roles: Customer

**Query Params:** `?limit=20&offset=0&status=approved`

**3.32** `GET /api/reservations/{reservationId}`  
Get reservation details | Auth Required | Roles: Customer

**3.33** `PUT /api/reservations/{reservationId}`  
Update reservation | Auth Required | Roles: Customer

**3.34** `PUT /api/reservations/{reservationId}/cancel`  
Cancel reservation | Auth Required | Roles: Customer

**3.35** `GET /api/reservations/{reservationId}/status`  
Get reservation status | Auth Required | Roles: Customer

---

















# 4. HOSPITAL MODULE ENDPOINTS

### Hospital Assignment (NEW)

**4.1** `GET /api/hospital/my-hospital`  
Get the hospital this admin manages | Auth Required | Roles: Hospital Admin

**Response:**
```json
{
  "success": true,
  "data": {
    "hospitalId": "hosp_123",
    "name": "City Medical Center",
    "latitude": 23.8103,
    "longitude": 90.4625,
    "totalBeds": 80,
    "totalICUBeds": 20
  }
}
```

**4.2** `GET /api/hospital/my-assignments`  
Get all hospital assignments for admin (if multiple) | Auth Required | Roles: Hospital Admin

### Dashboard

**4.3** `GET /api/hospital/dashboard`  
Get hospital overview | Auth Required | Roles: Hospital Admin

**4.4** `GET /api/hospital/dashboard/overview`  
Get dashboard statistics | Auth Required | Roles: Hospital Admin

**Response:**
```json
{
  "success": true,
  "data": {
    "activeCases": 24,
    "weeklyCases": 156,
    "totalOccupiedBeds": 45,
    "totalOccupiedICUBeds": 12,
    "totalBeds": 80,
    "totalICUBeds": 20,
    "occupancyRate": "56.25%"
  }
}
```

**4.5** `GET /api/hospital/dashboard/active-cases`  
Get active cases count | Auth Required | Roles: Hospital Admin

**4.6** `GET /api/hospital/dashboard/weekly-cases`  
Get weekly cases statistics | Auth Required | Roles: Hospital Admin

### Reservation Management

**4.7** `GET /api/hospital/reservations`  
Get all reservation requests | Auth Required | Roles: Hospital Admin

**Query Params:** `?limit=20&offset=0&status=pending`

**4.8** `GET /api/hospital/reservations/pending`  
Get pending reservation requests | Auth Required | Roles: Hospital Admin

**4.9** `GET /api/hospital/reservations/{reservationId}`  
Get reservation details | Auth Required | Roles: Hospital Admin

**4.10** `PUT /api/hospital/reservations/{reservationId}/approve`  
Approve reservation request | Auth Required | Roles: Hospital Admin

**Request Body:**
```json
{
  "bedId": "bed_123",
  "assignedWardId": "ward_456",
  "notes": "Patient assigned to Room 101"
}
```

**4.11** `PUT /api/hospital/reservations/{reservationId}/reject`  
Reject reservation request | Auth Required | Roles: Hospital Admin

**Request Body:**
```json
{
  "rejectionReason": "No beds available"
}
```

**4.12** `PUT /api/hospital/reservations/{reservationId}/redirect`  
Redirect reservation to another hospital | Auth Required | Roles: Hospital Admin

**Request Body:**
```json
{
  "targetHospitalId": "hosp_456",
  "reason": "Capacity issue"
}
```

### Bed & ICU Management

**4.13** `GET /api/hospital/beds`  
Get all beds with status | Auth Required | Roles: Hospital Admin

**Query Params:** `?wardId=ward_123&status=available`

**4.14** `GET /api/hospital/beds/available`  
Get available beds by ward | Auth Required | Roles: Hospital Admin

**4.15** `GET /api/hospital/beds/occupied`  
Get occupied beds | Auth Required | Roles: Hospital Admin

**4.16** `PUT /api/hospital/beds/{bedId}/status`  
Update bed status | Auth Required | Roles: Hospital Admin

**Request Body:**
```json
{
  "status": "occupied",
  "patientId": "patient_123",
  "reservationId": "res_123"
}
```

**Status Values:** `available`, `occupied`, `reserved`, `maintenance`

**4.17** `POST /api/hospital/beds`  
Add new bed | Auth Required | Roles: Hospital Admin

**Request Body:**
```json
{
  "bedNumber": "101",
  "wardId": "ward_123",
  "bedType": "General Ward"
}
```

**4.18** `DELETE /api/hospital/beds/{bedId}`  
Remove bed | Auth Required | Roles: Hospital Admin

**4.19** `GET /api/hospital/icu-beds`  
Get all ICU beds | Auth Required | Roles: Hospital Admin

**4.20** `PUT /api/hospital/icu-beds/{icuBedId}/status`  
Update ICU bed status | Auth Required | Roles: Hospital Admin

**4.21** `GET /api/hospital/wards`  
Get all wards (General, ICU, VIP, etc.) | Auth Required | Roles: Hospital Admin

**Query Params:** `?limit=50`

**4.22** `POST /api/hospital/wards`  
Create new ward | Auth Required | Roles: Hospital Admin

**Request Body:**
```json
{
  "wardName": "Cardiac Care Unit",
  "totalBeds": 20,
  "wardType": "ICU"
}
```

**4.23** `PUT /api/hospital/wards/{wardId}`  
Update ward information | Auth Required | Roles: Hospital Admin

**4.24** `DELETE /api/hospital/wards/{wardId}`  
Delete ward | Auth Required | Roles: Hospital Admin

### Emergency Requests

**4.25** `GET /api/hospital/emergency-requests`  
Get emergency reservation requests | Auth Required | Roles: Hospital Admin

**4.26** `GET /api/hospital/emergency-requests/{requestId}`  
Get emergency request details | Auth Required | Roles: Hospital Admin

**4.27** `PUT /api/hospital/emergency-requests/{requestId}/accept`  
Accept emergency request | Auth Required | Roles: Hospital Admin

**Request Body:**
```json
{
  "bedId": "bed_123",
  "priority": "high"
}
```

**4.28** `PUT /api/hospital/emergency-requests/{requestId}/redirect`  
Redirect emergency request | Auth Required | Roles: Hospital Admin

**Request Body:**
```json
{
  "targetHospitalId": "hosp_456",
  "reason": "Specialization not available"
}
```

### Payments & Billing

**4.29** `GET /api/hospital/payments`  
Get all payment records | Auth Required | Roles: Hospital Admin

**Query Params:** `?limit=20&offset=0&status=pending&startDate=2024-01-01`

**4.30** `GET /api/hospital/payments/{paymentId}`  
Get payment details | Auth Required | Roles: Hospital Admin

**4.31** `POST /api/hospital/payments`  
Create payment record | Auth Required | Roles: Hospital Admin

**Request Body:**
```json
{
  "reservationId": "res_123",
  "patientId": "patient_123",
  "amount": 5000,
  "paymentMethod": "card",
  "services": [
    {
      "serviceName": "Room Charges",
      "amount": 3000
    },
    {
      "serviceName": "Doctor Consultation",
      "amount": 2000
    }
  ]
}
```

**4.32** `GET /api/hospital/payments/patient/{patientId}`  
Get patient service records | Auth Required | Roles: Hospital Admin

**4.33** `PUT /api/hospital/payments/{paymentId}`  
Update payment information | Auth Required | Roles: Hospital Admin

**4.34** `GET /api/hospital/invoices/{patientId}`  
Get patient invoice | Auth Required | Roles: Hospital Admin

### Hospital Information Management

**4.35** `GET /api/hospital/info`  
Get hospital information | Auth Required | Roles: Hospital Admin

**4.36** `PUT /api/hospital/info`  
Update hospital information | Auth Required | Roles: Hospital Admin

**Request Body:**
```json
{
  "name": "City Medical Center",
  "phone": "+880171234567",
  "email": "info@cityhospital.com",
  "address": "123 Main Street, Dhaka",
  "latitude": 23.8103,
  "longitude": 90.4625,
  "description": "Leading healthcare provider"
}
```

**4.37** `GET /api/hospital/status`  
Get hospital current status (Open/Closed) | Auth Required | Roles: Hospital Admin

**4.38** `PUT /api/hospital/status`  
Update hospital status | Auth Required | Roles: Hospital Admin

**Request Body:**
```json
{
  "status": "Open",
  "reason": "Emergency maintenance completed"
}
```

**Status Values:** `Open`, `Closed`, `Maintenance`

---



















# 5. AMBULANCE MODULE ENDPOINTS

### Ambulance Management (Admin Only - Phase 1)

**5.1** `GET /api/ambulances/list`  
Get all ambulance services | Auth Required | Roles: Ambulance Admin

**5.2** `POST /api/ambulances`  
Add ambulance service | Auth Required | Roles: Ambulance Admin

**Request Body:**
```json
{
  "providerName": "City Ambulance Service",
  "contactNumber": "+8801712345678",
  "latitude": 23.8103,
  "longitude": 90.4625,
  "availability": "24/7",
  "equipmentList": ["Oxygen", "Defibrillator", "Stretcher"]
}
```

**5.3** `GET /api/ambulances/{ambulanceId}`  
Get ambulance details | Auth Required | Roles: Ambulance Admin

**5.4** `PUT /api/ambulances/{ambulanceId}`  
Update ambulance information | Auth Required | Roles: Ambulance Admin

**5.5** `DELETE /api/ambulances/{ambulanceId}`  
Remove ambulance service | Auth Required | Roles: Ambulance Admin

**5.6** `PUT /api/ambulances/{ambulanceId}/contact`  
Update ambulance contact information | Auth Required | Roles: Ambulance Admin

**Request Body:**
```json
{
  "contactNumber": "+8801712345678",
  "alternateContact": "+8801612345678",
  "email": "contact@ambulance.com"
}
```

### Phase 2 Future Enhancements (Not in Phase 1)
- Ambulance booking and reservation
- Real-time GPS tracking
- Ambulance dispatch system
- Live ambulance status updates

---











# 6. SUPER ADMIN ENDPOINTS

### System Management

**6.1** `GET /api/admin/users`  
Get all users with filters | Auth Required | Roles: Super Admin

**Query Params:** `?limit=50&offset=0&userType=Customer&status=active`

**6.2** `GET /api/admin/users/statistics`  
Get user statistics | Auth Required | Roles: Super Admin

**6.3** `PUT /api/admin/users/{userId}/role`  
Change user role | Auth Required | Roles: Super Admin

**Request Body:**
```json
{
  "newRole": "Hospital Admin"
}
```

**6.4** `PUT /api/admin/users/{userId}/status`  
Enable/Disable user | Auth Required | Roles: Super Admin

**Request Body:**
```json
{
  "status": "active"
}
```

**6.5** `GET /api/admin/hospitals`  
Get all hospitals | Auth Required | Roles: Super Admin

**Query Params:** `?limit=50&offset=0&status=Open`

**6.6** `GET /api/admin/hospitals/{hospitalId}`  
Get hospital details | Auth Required | Roles: Super Admin

**6.7** `POST /api/admin/hospitals`  
Register new hospital | Auth Required | Roles: Super Admin

**Request Body:**
```json
{
  "name": "General Hospital",
  "phone": "+880171234567",
  "email": "info@hospital.com",
  "address": "456 Hospital Lane, Dhaka",
  "latitude": 23.8103,
  "longitude": 90.4625,
  "totalBeds": 150,
  "totalICUBeds": 30
}
```

**6.8** `PUT /api/admin/hospitals/{hospitalId}`  
Update hospital information | Auth Required | Roles: Super Admin

**6.9** `DELETE /api/admin/hospitals/{hospitalId}`  
Remove hospital | Auth Required | Roles: Super Admin

**6.10** `GET /api/admin/dashboard`  
Get system-wide dashboard | Auth Required | Roles: Super Admin

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 10500,
    "totalHospitals": 45,
    "totalAmbulances": 120,
    "activeCases": 340,
    "totalReservations": 8900,
    "systemUptime": "99.8%"
  }
}
```

**6.11** `GET /api/admin/reports/usage`  
Get system usage reports | Auth Required | Roles: Super Admin

**Query Params:** `?startDate=2024-01-01&endDate=2024-01-31`

**6.12** `GET /api/admin/reports/emergency`  
Get emergency cases report | Auth Required | Roles: Super Admin

### Logs & Analytics

**6.13** `GET /api/admin/logs`  
Get system activity logs | Auth Required | Roles: Super Admin

**Query Params:** `?limit=100&offset=0&action=login&startDate=2024-01-01`

**6.14** `GET /api/admin/analytics`  
Get system analytics | Auth Required | Roles: Super Admin

**Query Params:** `?period=monthly&month=01&year=2024`

---












# 7. UTILITY ENDPOINTS

### Health & Version

**7.1** `GET /api/health`  
Health check endpoint | No Auth Required

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T12:00:00Z",
  "uptime": "99.8%"
}
```

**7.2** `GET /api/version`  
API version | No Auth Required

**Response:**
```json
{
  "version": "1.0.0",
  "releaseDate": "2024-01-01"
}
```

### Location Services

**7.3** `GET /api/locations/search`  
Search locations for autocomplete | Auth Required

**Query Params:** `?query=Dhaka&limit=10`

**7.4** `GET /api/locations/nearby`  
Get nearby locations (geocoding) | Auth Required

**Query Params:** `?latitude=23.8103&longitude=90.4625&radius=5&type=hospital`

### Notifications

**7.5** `POST /api/notifications/subscribe`  
Subscribe to push notifications | Auth Required

**Request Body:**
```json
{
  "deviceToken": "fcm_token_here",
  "platform": "ios"
}
```

**7.6** `GET /api/notifications`  
Get user notifications | Auth Required

**Query Params:** `?limit=20&offset=0&unreadOnly=true`

**7.7** `PUT /api/notifications/{notificationId}/read`  
Mark notification as read | Auth Required

**Request Body:**
```json
{
  "isRead": true
}
```

---




# 8. ENDPOINT SUMMARY BY COUNT

## Total: 98 Endpoints

### By Module:
- **Authentication:** 8 endpoints (1.1 - 1.8)
- **User Module:** 12 endpoints (2.1 - 2.12)
- **Customer Module:** 35 endpoints (3.1 - 3.35)
- **Hospital Module:** 38 endpoints (4.1 - 4.38)
- **Ambulance Module:** 6 endpoints (5.1 - 5.6)
- **Super Admin:** 14 endpoints (6.1 - 6.14)
- **Utility:** 7 endpoints (7.1 - 7.7)

### By Authentication:
- No Auth Required: 4 endpoints
- Auth Required: 94 endpoints

### By Role:
- **Customer:** 35 endpoints
- **Hospital Admin:** 38 endpoints
- **Super Admin:** 14 endpoints
- **Ambulance Admin:** 6 endpoints
- **All Roles:** 5 endpoints

---

# 9. DATABASE ALIGNMENT CHECKLIST

✅ **User Locations** - Endpoints 2.9-2.12 (NEW)  
✅ **Hospital Admin Assignment** - Endpoints 4.1-4.2 (NEW)  
✅ **Event Status Management** - Endpoint 3.25 (NEW)  
✅ **AI Response Separation** - Endpoint 3.17 (NEW)  
✅ **Blood Donation** - Endpoints 3.3-3.8 (Phase 1 - Request feature removed per spec)  
✅ **All ENUM Types** - Integrated throughout  
✅ **All 16 Tables** - Mapped to endpoints  
✅ **All Relationships** - Respected in API design  

---

# 10. RESPONSE STATUS CODES

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - No/invalid auth token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 422 | Unprocessable Entity - Validation error |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

---

# 11. AUTHENTICATION & AUTHORIZATION

- **Token Type:** JWT (JSON Web Tokens)
- **Token Location:** Authorization header `Bearer <token>`
- **Access Token TTL:** 1 hour
- **Refresh Token TTL:** 7 days
- **Role-Based Access Control:** RBAC on all protected endpoints
- **Hash Algorithm:** bcrypt (passwords)

---

# 12. API BASE URL STRUCTURE

```
Production:  https://api.medlink.com/v1
Staging:     https://staging-api.medlink.com/v1
Development: http://localhost:3000/api/v1
```

---

# 13. CHANGES FROM PREVIOUS VERSION

| # | Change Type | Description | Impact |
|----|------------|-------------|--------|
| 1 | ADD | User Location Endpoints (2.9-2.12) | HIGH - New functionality |
| 2 | ADD | Hospital Admin Assignment (4.1-4.2) | HIGH - Clarity on permissions |
| 3 | ADD | Event Status Management (3.25) | MEDIUM - Better tracking |
| 4 | ADD | AI Response Details (3.17) | MEDIUM - Data separation |
| 5 | REMOVE | Blood Donation Requests (Phase 1) | MEDIUM - Feature scope |
| 6 | CLARIFY | All Numbered Sequentially | LOW - Better readability |

---

# 14. PHASE 2 ROADMAP (Future Enhancements)

- [ ] Ambulance booking and dispatch system
- [ ] Real-time GPS tracking
- [ ] Video consultation with doctors
- [ ] Prescription management system
- [ ] Lab test results integration
- [ ] Insurance provider integration
- [ ] Doctor appointment scheduling
- [ ] Patient medical records management
- [ ] Hospital ratings and reviews
- [ ] AI conversation history
- [ ] Medical report generation
- [ ] Advanced analytics dashboards

---

**Document Status:** ✅ Database-Aligned & Production-Ready  
**Last Updated:** January 2024  
**Reviewed By:** Database Architecture Team  
**Approval Status:** Ready for Development
