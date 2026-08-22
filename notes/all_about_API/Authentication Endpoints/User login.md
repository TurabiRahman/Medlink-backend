Client
   │
   ▼
Validation
   │
   ▼
Controller
   │
   ▼
Service
   │
   ├── Find user by email
   ├── Check account status
   ├── Compare password
   ├── Update last_login
   ├── Generate JWTs
   ▼
Model
   │
   ▼
PostgreSQL

# request

{
    "email": "turabi@gmail.com",
    "password": "SecurePass123!"
}

# response

{
    "success": true,
    "message": "Login successful",
    "statusCode": 200,
    "data": {
        "userId": "80c21f03-8489-4f9a-acea-b90b90bcac44",
        "email": "turabi@gmail.com",
        "phone": "+8801712345678",
        "userType": "CUSTOMER",
        "profileComplete": false,
        "lastLogin": "2026-08-05T18:40:55.786Z"
    },
    "token": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4MGMyMWYwMy04NDg5LTRmOWEtYWNlYS1iOTBiOTBiY2FjNDQiLCJyb2xlIjoiQ1VTVE9NRVIiLCJpYXQiOjE3ODU5NTUyNTUsImV4cCI6MTc4NTk1ODg1NX0.ONPj6N3LZSrAp2lfHsaD0P7dOs0rxUcF-V1kP10GC8U",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4MGMyMWYwMy04NDg5LTRmOWEtYWNlYS1iOTBiOTBiY2FjNDQiLCJyb2xlIjoiQ1VTVE9NRVIiLCJpYXQiOjE3ODU5NTUyNTUsImV4cCI6MTc4NjU2MDA1NX0.eTPTt7bZz40LJrMAFeARMERWpFkmqiIGJSZS0AAedPw",
        "expiresIn": 3600,
        "tokenType": "Bearer"
    }
}