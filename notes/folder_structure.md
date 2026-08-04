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
