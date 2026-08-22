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