# Phase 6.1 APIs

GET /api/v1/admin/users
PUT /api/v1/admin/users/:userId/role
PUT /api/v1/admin/users/:userId/status

# Phase 6.2 — Hospital Management


GET    /api/v1/admin/hospitals
GET    /api/v1/admin/hospitals/:hospitalId
POST   /api/v1/admin/hospitals
PUT    /api/v1/admin/hospitals/:hospitalId
DELETE /api/v1/admin/hospitals/:hospitalId


BEGIN
  │
  ├── Create hospital
  │      ↓
  │   hospital_id
  │
  ├── Hash admin password
  │
  ├── Create HOSPITAL_ADMIN user
  │      ↓
  │   user_id
  │
  ├── Create hospital_admins assignment
  │      ↓
  │   hospital_id + user_id
  │
COMMIT

If anything fails → ROLLBACK




# Phase 6.3 — Ambulance Provider Management


GET    /api/v1/admin/ambulance-providers
GET    /api/v1/admin/ambulance-providers/:ambulanceProviderId
POST   /api/v1/admin/ambulance-providers
PUT    /api/v1/admin/ambulance-providers/:ambulanceProviderId
DELETE /api/v1/admin/ambulance-providers/:ambulanceProviderId

ambulance_providers
       │
       │ provider_id
       ▼
ambulance_admins
       │
       │ user_id
       ▼
users

# for post method 

Super Admin creates Ambulance Provider
        │
        ├── 1. Create ambulance_providers record
        │        ↓
        │     ambulance_provider_id
        │
        ├── 2. Hash admin password
        │
        ├── 3. Create users record
        │        role_type = AMBULANCE_ADMIN
        │        ↓
        │     user_id
        │
        └── 4. Create ambulance_admins relationship
                 ambulance_provider_id
                 user_id

# for delete method

ambulance_providers row
        ↓ CASCADE
ambulance_admins row

But the associated users row remains.

That behavior is intentional for now
recommend not automatically deleting the user account, because deleting a user is more destructive and that user may have related data or may later need to be reassigned.

# Phase 6.4 — Super Admin Dashboard

Finally:

GET /api/v1/admin/dashboard

It can aggregate:

users
hospitals
ambulance_providers
reservations

Expected structure:

{
  "success": true,
  "message": "Admin dashboard fetched successfully",
  "statusCode": 200,
  "data": {
    "totalUsers": 10500,
    "totalHospitals": 45,
    "totalAmbulanceProviders": 120,
    "totalReservations": 8900
  }
}

users
   ↓
total_users

hospitals
   ↓
total_hospitals

ambulance_providers
   ↓
total_ambulance_providers

reservations
   ↓
total_reservations

# Final flow
GET /api/v1/admin/dashboard
        │
        ▼
authenticate
        │
        ▼
authorize("SUPER_ADMIN")
        │
        ▼
getAdminDashboard controller
        │
        ▼
getAdminDashboard service
        │
        ▼
getDashboardStats model
        │
        ├── COUNT users
        ├── COUNT hospitals
        ├── COUNT ambulance_providers
        └── COUNT reservations
        │
        ▼
Return dashboard response