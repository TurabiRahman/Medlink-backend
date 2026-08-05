User Signup

Endpoint Number: 1.1
Method: POST
Path: /api/auth/signup
Full URL: http://localhost:3000/api/v1/api/auth/signup
Authentication Required: ❌ No

Headers
Content-Type: application/json
Accept: application/json


Payload Structure
json
{
  "name": "string (required) - Full name of user",
  "email": "string (required) - Valid email address",
  "password": "string (required) - Minimum 8 characters, must contain uppercase, lowercase, number, special character",
  "phone": "string (required) - Phone number with country code (+880...)",
  "userType": "string (required) - Enum: Customer | Hospital Admin | Super Admin | Ambulance Admin"
}



Request Example
json
POST /api/auth/signup HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "phone": "+8801712345678",
  "userType": "Customer"
}


Response Format - Success (201 Created)
json
{
  "success": true,
  "message": "User registered successfully",
  "statusCode": 201,
  "data": {
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+8801712345678",
    "userType": "Customer",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "token": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "tokenType": "Bearer"
  }
}


Response Format - Error (400 Bad Request)
json
{
  "success": false,
  "message": "Validation error",
  "statusCode": 400,
  "errors": [
    {
      "field": "email",
      "message": "Email already exists"
    },
    {
      "field": "password",
      "message": "Password must contain at least one uppercase letter"
    }
  ]
}


Response Format - Error (409 Conflict)
json
{
  "success": false,
  "message": "User already registered with this email",
  "statusCode": 409,
  "errorCode": "EMAIL_EXISTS"
}


Validation Rules
Field	Rules
name	Required, 2-100 characters, no special characters except space
email	Required, valid email format, unique in system
password	Required, min 8 chars, uppercase, lowercase, number, special char (!@#$%^&*)
phone	Required, format: +880XXXXXXXXXX (11 digits after country code)
userType	Required, must be one of: Customer, Hospital Admin, Super Admin, Ambulance Admin

# here the work begins

Client
   │
   ▼
POST /api/v1/auth/signup
   │
   ▼
Route
   │
   ▼
Validation Middleware (Zod)
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Model
   │
   ▼
PostgreSQL
   │
   ▼
Service
   │
   ▼
Controller
   │
   ▼
JSON Response

