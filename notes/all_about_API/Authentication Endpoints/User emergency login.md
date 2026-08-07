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

