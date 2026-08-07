📱 Mobile App
      │
      │ User opens app
      ▼
Phone GPS gets current location
      │
      ▼
POST/PUT Location API
      │
      ▼
Backend
      │
      ├── Does this user already have a location?
      │
      ├── YES
      │      │
      │      ▼
      │   UPDATE latitude & longitude
      │
      └── NO
             │
             ▼
          INSERT new location
      │
      ▼
Database
      │
      ▼
Later...

GET /users/location
      │
      ▼
Returns latest coordinates


# res 

{
    "success": true,
    "message": "Location fetched successfully",
    "statusCode": 200,
    "data": {
        "id": "439e2584-d6ac-41b5-ba0b-4aad91e49173",
        "user_id": "efe6103a-e989-4bd7-8967-e83d1e7001e2",
        "latitude": "23.810331",
        "longitude": "90.412521",
        "updated_at": "2026-08-07T17:54:45.440Z"
    }
}