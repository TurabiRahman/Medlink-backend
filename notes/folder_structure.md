MEDLINK-BACKEND
│
├── client/
├── database/
├── notes/
├── server/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── uploads/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md

# Folder Structure updated 1.0

MEDLINK-BACKEND
│
├── client/                         # Frontend 
│
├── database/                       # SQLite database files
│   ├── events/                     # Event-related databases
│   │   ├── ai_responses.db
│   │   ├── event_ambulances.db
│   │   ├── event_hospitals.db
│   │   ├── medical_events.db
│   │   ├── payments.db
│   │   └── reservations.db
│   │
│   ├── hospitals/                  # Hospital-related databases
│   │   ├── hospital_admins.db
│   │   ├── hospital_beds.db
│   │   ├── hospital_wards.db
│   │   └── hospitals.db
│   │
│   ├── users/                      # User-related databases
│   │   ├── blood_donation_history.db
│   │   ├── blood_information.db
│   │   ├── user_locations.db
│   │   ├── user_profiles.db
│   │   └── users.db
│   │
│   ├── ambulance_providers.db      # Ambulance provider data
│   └── history.db                  # System history / logs
│
├── docs/                           # Official project documentation
│   └── DATABASE_DOCUMENTATION.md
│
├── notes/                          # Development notes
│   ├── database_design.md
│   ├── folder_structure.md
│   ├── improvements.md
│   └── MEDLINK_API_List.md
│
├── server/                         # Backend 
│   ├── node_modules/
│   │
│   ├── src/
│   │   ├── config/                 # Database and app configuration
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/            # Handle HTTP requests
│   │   ├── middlewares/            # Authentication, validation, etc.
│   │   ├── models/                 # Database models / queries
│   │   ├── routes/                 # API route definitions
│   │   ├── services/               # Business logic layer
│   │   ├── utils/                  # Helper utilities
│   │   ├── app.js                  # Express app setup
│   │   └── server.js               # Server entry point
│   │
│   ├── uploads/                    # Uploaded files
│   ├── .env                        # Environment variables
│   ├── .env.example                # Example environment file
│   ├── package.json                # Dependencies and scripts
│   └── package-lock.json
│
├── .gitignore
└── README.md


# Folder Structure updated 2.0

MEDLINK-BACKEND
│
├── client/                         # Frontend 
│
├── database/                       # SQLite database files
│   ├── events/                     # Event-related databases
│   │   ├── ai_responses.db
│   │   ├── event_ambulances.db
│   │   ├── event_hospitals.db
│   │   ├── medical_events.db
│   │   ├── payments.db
│   │   └── reservations.db
│   │
│   ├── hospitals/                  # Hospital-related databases
│   │   ├── hospital_admins.db
│   │   ├── hospital_beds.db
│   │   ├── hospital_wards.db
│   │   └── hospitals.db
│   │
│   ├── users/                      # User-related databases
│   │   ├── blood_donation_history.db
│   │   ├── blood_information.db
│   │   ├── user_locations.db
│   │   ├── user_profiles.db
│   │   └── users.db
│   │
│   ├── ambulance_providers.db      # Ambulance provider data
│   └── history.db                  # System history / logs
│
├── docs/                           # Official project documentation
│   └── DATABASE_DOCUMENTATION.md
│
├── notes/                          # Development notes
│   ├── database_design.md
│   ├── folder_structure.md
│   ├── improvements.md
│   └── MEDLINK_API_List.md
│
├── server/                         # Backend 
│   ├── node_modules/
│   │
│   ├── src/
│   │   ├── config/                 # Database and app configuration
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/            # Handle HTTP requests
│   │   │   └── auth.controller.js
│   │   │
│   │   ├── middlewares/            # Authentication & validation middlewares
│   │   │   ├── auth.middleware.js
│   │   │   └── validate.middleware.js
│   │   │
│   │   ├── models/                 # Database models / queries
│   │   │   └── auth.model.js
│   │   │
│   │   ├── routes/                 # API route definitions
│   │   │   └── auth.routes.js
│   │   │
│   │   ├── services/               # Business logic layer
│   │   │   └── auth.service.js
│   │   │
│   │   ├── utils/                  # Helper utilities
│   │   │   └── jwt.js
│   │   │
│   │   ├── validations/            # Input validation schemas
│   │   │   └── auth.validation.js
│   │   │
│   │   ├── app.js                  # Express app setup
│   │   └── server.js               # Server entry point
│   │
│   ├── uploads/                    # Uploaded files
│   ├── .env                        # Environment variables
│   ├── .env.example                # Example environment file
│   ├── package.json                # Dependencies and scripts
│   └── package-lock.json
│
├── .gitignore
└── README.md

# folder structure of Nafees

MedLink
│
├── apps/
│   ├── api/
│   │   └── package.json
│   │
│   └── mobile/
│
├── docs/
│
├── packages/
│
├── .env.example
├── .gitignore
├── docker-compose.yml
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── turbo.json

# folder structure updated 3.0

MEDLINK-BACKEND
│
├── client/
├── database/
│
├── docker/
│   ├── .env
│   ├── .env.example
│   ├── docker-compose.yaml
│   └── Dockerfile
│
├── docs/
│
├── notes/
│   ├── all_about_API/
│   │   ├── Authentication Endpoints/
│   │   │   ├── plan_for_01.md
│   │   │   ├── User emergency login.md
│   │   │   ├── User login.md
│   │   │   ├── User logout.md
│   │   │   └── User Signup.md
│   │   ├── USER MODULE ENDPOINTS.md
│   │   └── api_list.md
│   │
│   ├── all_about_DB/
│   │   ├── database_design.md
│   │   ├── improvements.md
│   │   └── quick_summary.md
│   │
│   └── folder_structure.md
│
├── server/
│   ├── node_modules/
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── user.controller.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   ├── authorize.middleware.js
│   │   │   └── validate.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── auth.model.js
│   │   │   └── user.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── user.routes.js
│   │   │
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   └── user.service.js
│   │   │
│   │   ├── utils/
│   │   │   └── jwt.js
│   │   │
│   │   ├── validations/
│   │   │   ├── auth.validation.js
│   │   │   └── user.validation.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── uploads/
│   ├── .env
│   ├── package-lock.json
│   └── package.json
│
├── .gitignore
└── README.md