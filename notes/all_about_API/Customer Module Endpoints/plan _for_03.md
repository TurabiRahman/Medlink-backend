# A. Hospital Discovery


GET /api/hospitals
GET /api/hospitals/nearby
GET /api/hospitals/:hospitalId

Purpose:

Browse hospitals
Find hospitals near the customer's current location
View complete hospital information
View available beds / ICU information


# B. AI Medical Assistance

POST /api/ai-medical/consult

Purpose:

Customer
   ↓
Describe medical condition
   ↓
MedLink Backend
   ↓
Gemini API
   ↓
AI analyzes the situation
   ↓
Backend structures response
   ↓
Customer

And eventually this response can be connected to:

Nearby hospitals
Available beds
Ambulances
Blood donors

This is the most interesting part, but we should not build it first.

# C. Events & Medical History

GET /api/events
GET /api/events/:eventId

Purpose:

Customer
   ↓
Previous AI consultations / emergency events
   ↓
View history

This means we'll need a database representation of a medical event.

# D. Ambulance Discovery
GET /api/ambulances
GET /api/ambulances/nearby
GET /api/ambulances/:ambulanceId

Purpose:

Browse available ambulances
Find nearby ambulances
View ambulance/contact information

# E. Bed Reservations
POST /api/reservations

GET /api/reservations
GET /api/reservations/:reservationId

PUT /api/reservations/:reservationId

PUT /api/reservations/:reservationId/cancel

Purpose:

Customer
   ↓
Choose hospital
   ↓
Choose bed
   ↓
Create reservation
   ↓
Hospital handles request
   ↓
Approved / rejected / pending


src/
│
├── config/
│
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── hospital.controller.js
│   ├── ambulance.controller.js
│   ├── event.controller.js
│   ├── reservation.controller.js
│   └── ai-medical.controller.js
│
├── middlewares/
│
├── models/
│   ├── auth.model.js
│   ├── user.model.js
│   ├── hospital.model.js
│   ├── ambulance.model.js
│   ├── event.model.js
│   ├── reservation.model.js
│   └── ai-medical.model.js
│
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── hospital.routes.js
│   ├── ambulance.routes.js
│   ├── event.routes.js
│   ├── reservation.routes.js
│   └── ai-medical.routes.js
│
├── services/
│   ├── auth.service.js
│   ├── user.service.js
│   ├── hospital.service.js
│   ├── ambulance.service.js
│   ├── event.service.js
│   ├── reservation.service.js
│   └── ai-medical.service.js
│
├── validations/
│   ├── auth.validation.js
│   ├── user.validation.js
│   ├── hospital.validation.js
│   ├── ambulance.validation.js
│   ├── event.validation.js
│   ├── reservation.validation.js
│   └── ai-medical.validation.js
│
├── utils/
│   └── jwt.js
│
├── app.js
└── server.js

# I am working in this way

PHASE 3.1
Database design
       ↓
PHASE 3.2
Hospital module
       ↓
PHASE 3.3
Ambulance module
       ↓
PHASE 3.4
Medical Events
       ↓
PHASE 3.5
Reservations
       ↓
PHASE 3.6
Gemini integration
       ↓
PHASE 3.7
AI + Hospital/Ambulance/Blood integration
       ↓
PHASE 3.8
Testing + cleanup


# 3.2 

Database
   ↓
Model
   ↓
Service
   ↓
Controller
   ↓
Validation
   ↓
Route
   ↓
Postman

| Endpoint                            | Status        |
| ----------------------------------- | ------------- |
| `GET /api/v1/hospitals`             | ✅ Working     |
| `GET /api/v1/hospitals/nearby`      | ✅ Working     |
| `GET /api/v1/hospitals/:hospitalId` | ✅ Working     |
| Query validation                    | ✅ Working     |
| UUID validation                     | ✅ Working     |
| Pagination                          | ✅ Working     |
| Sorting                             | ✅ Working     |
| Radius filtering                    | ✅ Working     |
| Distance calculation                | ✅ Working     |
| Hospital → Ward relationship        | ✅ Working     |
| Hospital → Bed relationship         | ✅ Working     |
| Bed availability statistics         | ✅ Working     |
| ICU statistics                      | ✅ Working     |
| 404 hospital handling               | ✅ Implemented |
| Response structure                  | ✅ Consistent  |


# PHASE 3.3

Ambulance module

/api/v1/ambulances
/api/v1/ambulances/nearby
/api/v1/ambulances/:ambulanceId


# Phase 3.4 

Event Module 

GET /api/events
GET /api/events/:eventId

# PHASE 3.5

Bed Reservations


Method	Endpoint	                                 Purpose
POST	/api/v1/reservations	                        Create a bed reservation
GET	/api/v1/reservations	                        Get reservations
GET	/api/v1/reservations/:reservationId  	      Get one reservation
PUT	/api/v1/reservations/:reservationId	         Update reservation
PUT	/api/v1/reservations/:reservationId/cancel	Cancel reservation



Event exists?
        ↓
Event belongs to logged-in user?
        ↓
Event still active?
        ↓
Hospital exists and is OPEN?
        ↓
Ward belongs to hospital?
        ↓
Bed belongs to hospital + ward?
        ↓
Bed AVAILABLE?
        ↓
No existing active reservation?
        ↓
INSERT reservation
        ↓
AVAILABLE → RESERVED




# Phase 3.6  

POST /api/ai-medical/consult

Purpose:

Customer
   ↓
Describe medical condition
   ↓
MedLink Backend
   ↓
Gemini API
   ↓
AI analyzes the situation
   ↓
Backend structures response
   ↓
Customer

And eventually this response can be connected to:

Nearby hospitals
Available beds
Ambulances
Blood donors

This is the most interesting part, but we should not build it first.

First I ran npm install @google/genai this command inside my server
