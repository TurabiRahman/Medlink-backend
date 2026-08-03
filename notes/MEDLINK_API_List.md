# MEDLINK - API Specification
## Connecting Care. Saving Lives.

---

## 1. AUTHENTICATION ENDPOINTS
### 1.1 Common Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/api/auth/signup` | User registration | No |
| POST | `/api/auth/login` | Standard login | No |
| POST | `/api/auth/emergency-login` | Emergency/SOS login | No |
| POST | `/api/auth/logout` | User logout | Yes |
| POST | `/api/auth/refresh-token` | Refresh access token | Yes |
| POST | `/api/auth/forgot-password` | Request password reset | No |
| POST | `/api/auth/reset-password` | Reset password with token | No |
| POST | `/api/auth/verify-email` | Email verification | No |

---

## 2. USER MODULE ENDPOINTS
### 2.1 User Profile Management

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---|---|
| GET | `/api/users/profile` | Get current user profile | Yes | All |
| PUT | `/api/users/profile` | Update user profile | Yes | Customer, Hospital Admin, Super Admin |
| GET | `/api/users/{userId}` | Get user details by ID | Yes | Super Admin |
| DELETE | `/api/users/{userId}` | Delete user account | Yes | Customer, Super Admin |
| PUT | `/api/users/profile/password` | Change password | Yes | All |
| GET | `/api/users/all` | Get all users | Yes | Super Admin |
| PUT | `/api/users/{userId}/role` | Update user role | Yes | Super Admin |
| PUT | `/api/users/{userId}/status` | Activate/Deactivate user | Yes | Super Admin |

---

## 3. CUSTOMER MODULE ENDPOINTS
### 3.1 Dashboard

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---|---|
| GET | `/api/customer/dashboard` | Get dashboard overview | Yes | Customer |
| GET | `/api/customer/dashboard/quick-stats` | Get quick statistics | Yes | Customer |

### 3.2 Blood Donation Features

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---|---|
| GET | `/api/blood/my-availability` | Get user's blood donation eligibility | Yes | Customer |
| PUT | `/api/blood/my-availability` | Update blood donation availability | Yes | Customer |
| GET | `/api/blood/donors` | Search for blood donors by blood group | Yes | Customer |
| GET | `/api/blood/donors/{donorId}` | Get donor details | Yes | Customer |
| POST | `/api/blood/donation-requests` | Create blood donation request | Yes | Customer |
| GET | `/api/blood/donation-requests/{requestId}` | Get donation request details | Yes | Customer |
| PUT | `/api/blood/donation-requests/{requestId}/accept` | Accept donation request | Yes | Customer |
| PUT | `/api/blood/donation-requests/{requestId}/reject` | Reject donation request | Yes | Customer |
| GET | `/api/blood/my-donation-history` | Get user's blood donation history | Yes | Customer |
| PUT | `/api/blood/last-donation-date` | Update last blood donation date | Yes | Customer |

### 3.3 Hospital Features

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---|---|
| GET | `/api/hospitals` | Get list of hospitals | Yes | Customer |
| GET | `/api/hospitals/nearby` | Get nearby hospitals based on location | Yes | Customer |
| GET | `/api/hospitals/{hospitalId}` | Get hospital details | Yes | Customer |
| GET | `/api/hospitals/{hospitalId}/beds` | Get hospital bed availability | Yes | Customer |
| GET | `/api/hospitals/{hospitalId}/icu-beds` | Get hospital ICU bed availability | Yes | Customer |
| GET | `/api/hospitals/{hospitalId}/status` | Get hospital current status | Yes | Customer |

### 3.4 AI Medical Assistance

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---|---|
| POST | `/api/ai-medical/consult` | Send medical condition for AI analysis | Yes | Customer |
| GET | `/api/ai-medical/consult/{consultationId}` | Get AI consultation response | Yes | Customer |
| POST | `/api/ai-medical/consult/{consultationId}/feedback` | Provide feedback on AI response | Yes | Customer |

### 3.5 Events & History

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---|---|
| GET | `/api/events` | Get all user events/consultations | Yes | Customer |
| GET | `/api/events/{eventId}` | Get event details | Yes | Customer |
| GET | `/api/events/history` | Get complete event history with pagination | Yes | Customer |
| PUT | `/api/events/{eventId}` | Update event details | Yes | Customer |
| DELETE | `/api/events/{eventId}` | Delete event | Yes | Customer |
| GET | `/api/events/{eventId}/ai-summary` | Get AI summary for event | Yes | Customer |

### 3.6 Ambulance Features

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---|---|
| GET | `/api/ambulances` | Get list of available ambulances | Yes | Customer |
| GET | `/api/ambulances/nearby` | Get nearby ambulance services | Yes | Customer |
| GET | `/api/ambulances/{ambulanceId}` | Get ambulance details/contact | Yes | Customer |

### 3.7 Bed Reservations

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---|---|
| POST | `/api/reservations` | Create bed reservation request | Yes | Customer |
| POST | `/api/reservations/emergency` | Create emergency reservation (auto-approved) | Yes | Customer |
| GET | `/api/reservations` | Get user's reservations | Yes | Customer |
| GET | `/api/reservations/{reservationId}` | Get reservation details | Yes | Customer |
| PUT | `/api/reservations/{reservationId}` | Update reservation | Yes | Customer |
| PUT | `/api/reservations/{reservationId}/cancel` | Cancel reservation | Yes | Customer |
| GET | `/api/reservations/{reservationId}/status` | Get reservation status | Yes | Customer |

---

## 4. HOSPITAL MODULE ENDPOINTS
### 4.1 Hospital Dashboard

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---|---|
| GET | `/api/hospital/dashboard` | Get hospital overview | Yes | Hospital Admin |
| GET | `/api/hospital/dashboard/overview` | Get dashboard statistics | Yes | Hospital Admin |
| GET | `/api/hospital/dashboard/active-cases` | Get active cases count | Yes | Hospital Admin |
| GET | `/api/hospital/dashboard/weekly-cases` | Get weekly cases statistics | Yes | Hospital Admin |

### 4.2 Reservation Management

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---|---|
| GET | `/api/hospital/reservations` | Get all reservation requests | Yes | Hospital Admin |
| GET | `/api/hospital/reservations/pending` | Get pending reservation requests | Yes | Hospital Admin |
| GET | `/api/hospital/reservations/{reservationId}` | Get reservation details | Yes | Hospital Admin |
| PUT | `/api/hospital/reservations/{reservationId}/approve` | Approve reservation request | Yes | Hospital Admin |
| PUT | `/api/hospital/reservations/{reservationId}/reject` | Reject reservation request with reason | Yes | Hospital Admin |
| PUT | `/api/hospital/reservations/{reservationId}/redirect` | Redirect reservation to another hospital | Yes | Hospital Admin |

### 4.3 Bed & ICU Management

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---|---|
| GET | `/api/hospital/beds` | Get all beds with status | Yes | Hospital Admin |
| GET | `/api/hospital/beds/available` | Get available beds by ward | Yes | Hospital Admin |
| GET | `/api/hospital/beds/occupied` | Get occupied beds | Yes | Hospital Admin |
| PUT | `/api/hospital/beds/{bedId}/status` | Update bed status | Yes | Hospital Admin |
| POST | `/api/hospital/beds` | Add new bed | Yes | Hospital Admin |
| DELETE | `/api/hospital/beds/{bedId}` | Remove bed | Yes | Hospital Admin |
| GET | `/api/hospital/icu-beds` | Get all ICU beds | Yes | Hospital Admin |
| PUT | `/api/hospital/icu-beds/{icuBedId}/status` | Update ICU bed status | Yes | Hospital Admin |
| GET | `/api/hospital/wards` | Get all wards (General, ICU, VIP, etc.) | Yes | Hospital Admin |
| POST | `/api/hospital/wards` | Create new ward | Yes | Hospital Admin |

### 4.4 Emergency Requests

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---|---|
| GET | `/api/hospital/emergency-requests` | Get emergency reservation requests | Yes | Hospital Admin |
| GET | `/api/hospital/emergency-requests/{requestId}` | Get emergency request details | Yes | Hospital Admin |
| PUT | `/api/hospital/emergency-requests/{requestId}/accept` | Accept emergency request | Yes | Hospital Admin |
| PUT | `/api/hospital/emergency-requests/{requestId}/redirect` | Redirect emergency request | Yes | Hospital Admin |

### 4.5 Payments & Billing

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---|---|
| GET | `/api/hospital/payments` | Get all payment records | Yes | Hospital Admin |
| GET | `/api/hospital/payments/{paymentId}` | Get payment details | Yes | Hospital Admin |
| POST | `/api/hospital/payments` | Create payment record | Yes | Hospital Admin |
| GET | `/api/hospital/payments/patient/{patientId}` | Get patient service records | Yes | Hospital Admin |
| PUT | `/api/hospital/payments/{paymentId}` | Update payment information | Yes | Hospital Admin |
| GET | `/api/hospital/invoices/{patientId}` | Get patient invoice | Yes | Hospital Admin |

### 4.6 Hospital Information Management

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---|---|
| GET | `/api/hospital/info` | Get hospital information | Yes | Hospital Admin |
| PUT | `/api/hospital/info` | Update hospital information | Yes | Hospital Admin |
| GET | `/api/hospital/status` | Get hospital current status | Yes | Hospital Admin |
| PUT | `/api/hospital/status` | Update hospital status (Open/Closed) | Yes | Hospital Admin |

---

## 5. AMBULANCE MODULE ENDPOINTS (Phase 1)
### 5.1 Ambulance Management (Admin Only)

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---|---|
| GET | `/api/ambulances/list` | Get all ambulance services | Yes | Ambulance Admin |
| POST | `/api/ambulances` | Add ambulance service | Yes | Ambulance Admin |
| GET | `/api/ambulances/{ambulanceId}` | Get ambulance details | Yes | Ambulance Admin |
| PUT | `/api/ambulances/{ambulanceId}` | Update ambulance information | Yes | Ambulance Admin |
| DELETE | `/api/ambulances/{ambulanceId}` | Remove ambulance service | Yes | Ambulance Admin |
| PUT | `/api/ambulances/{ambulanceId}/contact` | Update ambulance contact information | Yes | Ambulance Admin |

---

## 6. SUPER ADMIN ENDPOINTS
### 6.1 System Management

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---|---|
| GET | `/api/admin/users` | Get all users with filters | Yes | Super Admin |
| GET | `/api/admin/users/statistics` | Get user statistics | Yes | Super Admin |
| PUT | `/api/admin/users/{userId}/role` | Change user role | Yes | Super Admin |
| PUT | `/api/admin/users/{userId}/status` | Enable/Disable user | Yes | Super Admin |
| GET | `/api/admin/hospitals` | Get all hospitals | Yes | Super Admin |
| GET | `/api/admin/hospitals/{hospitalId}` | Get hospital details | Yes | Super Admin |
| POST | `/api/admin/hospitals` | Register new hospital | Yes | Super Admin |
| PUT | `/api/admin/hospitals/{hospitalId}` | Update hospital information | Yes | Super Admin |
| DELETE | `/api/admin/hospitals/{hospitalId}` | Remove hospital | Yes | Super Admin |
| GET | `/api/admin/dashboard` | Get system-wide dashboard | Yes | Super Admin |
| GET | `/api/admin/reports/usage` | Get system usage reports | Yes | Super Admin |
| GET | `/api/admin/reports/emergency` | Get emergency cases report | Yes | Super Admin |

### 6.2 Logs & Analytics

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---|---|
| GET | `/api/admin/logs` | Get system activity logs | Yes | Super Admin |
| GET | `/api/admin/analytics` | Get system analytics | Yes | Super Admin |

---

## 7. COMMON UTILITY ENDPOINTS

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| GET | `/api/health` | Health check endpoint | No |
| GET | `/api/version` | API version | No |
| GET | `/api/locations/search` | Search locations for autocomplete | Yes |
| GET | `/api/locations/nearby` | Get nearby locations (geocoding) | Yes |
| POST | `/api/notifications/subscribe` | Subscribe to push notifications | Yes |
| GET | `/api/notifications` | Get user notifications | Yes |
| PUT | `/api/notifications/{notificationId}/read` | Mark notification as read | Yes |

---

## 8. DATA MODELS / REQUEST/RESPONSE EXAMPLES

### 8.1 Authentication Request/Response

**POST /api/auth/signup**
```json
Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "+8801712345678",
  "userType": "Customer" // Customer, Hospital Admin, Super Admin, Ambulance Admin
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": "user_123",
    "email": "john@example.com",
    "userType": "Customer"
  },
  "token": "jwt_token_here"
}
```

### 8.2 AI Medical Consultation Request

**POST /api/ai-medical/consult**
```json
Request:
{
  "description": "My father has severe chest pain and cannot breathe properly",
  "currentLocation": {
    "latitude": 23.8103,
    "longitude": 90.4625
  },
  "isEmergency": true
}

Response:
{
  "success": true,
  "data": {
    "consultationId": "consult_123",
    "aiResponse": {
      "summary": "Possible cardiac emergency",
      "severity": "Critical",
      "possibleConditions": ["Acute Myocardial Infarction", "Unstable Angina"],
      "firstAid": ["Call ambulance immediately", "Chew aspirin if available"],
      "tags": ["chest-pain", "breathing-difficulty", "cardiac"]
    },
    "recommendedHospitals": [
      {
        "hospitalId": "hosp_123",
        "name": "City Medical Center",
        "distance": 2.5,
        "availableBeds": 5,
        "availableICUBeds": 2,
        "rating": 4.8,
        "status": "Open"
      }
    ],
    "ambulanceServices": [
      {
        "ambulanceId": "amb_123",
        "contact": "+8801712345678",
        "provider": "City Ambulance Service"
      }
    ]
  }
}
```

### 8.3 Bed Reservation Request

**POST /api/reservations**
```json
Request:
{
  "hospitalId": "hosp_123",
  "bedType": "General Ward", // General Ward, ICU, VIP, Others
  "patientName": "John Doe",
  "patientAge": 45,
  "expectedArrivalTime": "2024-01-15T14:30:00Z",
  "medicalCondition": "Chest pain",
  "contactNumber": "+8801712345678"
}

Response:
{
  "success": true,
  "data": {
    "reservationId": "res_123",
    "status": "Pending", // Pending, Approved, Rejected, Cancelled
    "hospitalId": "hosp_123",
    "createdAt": "2024-01-15T12:00:00Z",
    "expectedArrivalTime": "2024-01-15T14:30:00Z"
  }
}
```

### 8.4 Hospital Dashboard Response

**GET /api/hospital/dashboard/overview**
```json
Response:
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

---

## 9. ERROR RESPONSE FORMAT

```json
{
  "success": false,
  "message": "Error description",
  "errorCode": "ERROR_CODE",
  "details": {
    // Additional error details
  }
}
```

---

## 10. AUTHENTICATION & AUTHORIZATION
- **Token Type**: JWT (JSON Web Tokens)
- **Token Location**: Authorization header (Bearer token)
- **Token Refresh**: Access token valid for 1 hour, refresh token for 7 days
- **Role-based Access Control (RBAC)**: Implemented on all protected endpoints

---

## 11. PHASE 2 ENHANCEMENTS (Future)
- Ambulance booking and real-time tracking
- Video consultation with doctors
- Prescription management
- Lab test results integration
- Insurance provider integration
- Rating and review system
- Appointment scheduling

---

## API Base URL Structure
```
Production: https://api.medlink.com/v1
Staging: https://staging-api.medlink.com/v1
Development: http://localhost:3000/api/v1
```

---

## Response Status Codes
- **200**: OK
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **409**: Conflict
- **500**: Internal Server Error
- **503**: Service Unavailable
