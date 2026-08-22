Install App
      │
      ▼
Tap SOS
      │
      ▼
Enter Phone Number
      │
      ▼
Emergency Session Started
      │
      ▼
AI Assistance
      │
      ▼
"My father has severe chest pain..."
      │
      ▼
AI Response
      │
      ▼
Nearby Hospitals
      │
      ▼
Reserve Emergency Bed

# Architecture

POST /api/v1/auth/emergency-login
           │
           ▼
Validation
           │
           ▼
Controller
           │
           ▼
Service (startEmergencySession)
           │
           ▼
Return Emergency Session

# request

{
    "phone": "+8801712345679"
}

# response

{
    "success": true,
    "message": "Emergency session started",
    "statusCode": 200,
    "data": {
        "phone": "+8801712345679",
        "isEmergency": true
    }
}


# Update 2.0

Install App
      │
      ▼
Tap SOS
      │
      ▼
Enter Name
Enter Phone
Allow GPS
      │
      ▼
POST /auth/emergency-login
      │
      ▼
Generate Emergency JWT
      │
      ▼
Frontend stores JWT
      │
      ▼
Every future request
Authorization: Bearer <Emergency Token>




# Update 3.0

Name
Phone
Location
   │
   ▼
Emergency Login
   │
   ├── Create temporary user in users
   │      ├── id → generated UUID
   │      ├── phone → provided phone
   │      ├── password_hash → temporary password
   │      ├── email → NULL
   │      ├── role_type → emergency role/value
   │      └── other fields → NULL/default
   │
   ├── Create location in user_locations
   │      ├── user_id → emergency user's ID
   │      ├── latitude
   │      └── longitude
   │
   └── Generate JWT
          │
          ▼
      AI Assistance



START TRANSACTION
       │
       ▼
Find user by phone
       │
       ├── EXISTS ──────────────┐
       │                        │
       │                        ▼
       │                  Check profile
       │                        │
       │                        ▼
       │                  Check/update location
       │
       └── DOES NOT EXIST
                │
                ▼
          Create users row
                │
                ▼
        Create user_profiles
                │
                ▼
        Create user_locations
                │
                ▼
          COMMIT
                │
                ▼
          Generate JWT

# req

{
    "name": "Aneekah",
    "phone": "+8801712345603",
    "latitude": 23.810332,
    "longitude": 90.412522
}

# res

{
    "success": true,
    "message": "Emergency session started",
    "statusCode": 200,
    "data": {
        "userId": "c9334ca7-9fe8-4874-b629-eed8a0ea9482",
        "name": "Aneekah",
        "phone": "+8801712345603",
        "roleType": "CUSTOMER",
        "latitude": "23.810332",
        "longitude": "90.412522",
        "isEmergency": true,
        "isNewEmergencyUser": true,
        "temporaryPassword": "SOS-a92954b41972"
    },
    "token": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjOTMzNGNhNy05ZmU4LTQ4NzQtYjYyOS1lZWQ4YTBlYTk0ODIiLCJyb2xlIjoiQ1VTVE9NRVIiLCJzZXNzaW9uVHlwZSI6IkVNRVJHRU5DWSIsImlzRW1lcmdlbmN5Ijp0cnVlLCJpYXQiOjE3ODYxOTU4NjcsImV4cCI6MTc4NjE5OTQ2N30.G3S3cMZHIB7SZ9Mv5ydiJL58p6Xal4b-E7Xrx23-lJw",
        "expiresIn": 3600,
        "tokenType": "Bearer"
    }


                 EMERGENCY SOS
                       │
                       ▼
        POST /api/v1/auth/emergency-login
                       │
                       ▼
                 Validate input
                       │
                       ▼
              Find user by phone
                 /          \
              Found        Not Found
                │              │
                │              ▼
                │        Create CUSTOMER
                │        ┌───────────────┐
                │        │ users         │
                │        │ phone         │
                │        │ password_hash │
                │        │ role_type     │
                │        └───────────────┘
                │              │
                │              ▼
                │        Create profile
                │              │
                └──────────────┤
                               ▼
                       Store location
                               │
                               ▼
                         Generate JWT
                               │
                               ▼
                    Emergency session
                               │
                               ▼
                        AI Assistance