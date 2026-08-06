# req 

{
    "firstName": "Turabi Hasan",
    "lastName": "Rahman",
    "gender": "MALE",
    "dateOfBirth": "2002-11-10",
    "nationalId": "2002123456789",
    "address": "Dhaka Cantonment",
    "emergencyContactName": "Robin Rahman",
    "emergencyContactPhone": "+8801812345678",
    "bloodGroup": "AB+"
}

# res

{
    "success": true,
    "message": "Profile updated successfully",
    "statusCode": 200,
    "data": {
        "profile": {
            "id": "daa1a82f-256f-4967-8c34-7225cf725c0d",
            "user_id": "80c21f03-8489-4f9a-acea-b90b90bcac44",
            "first_name": "Turabi Hasan",
            "last_name": "Rahman",
            "gender": "MALE",
            "date_of_birth": "2002-11-09T18:00:00.000Z",
            "national_id": "2002123456789",
            "address": "Dhaka Cantonment",
            "emergency_contact_name": "Robin Rahman",
            "emergency_contact_phone": "+8801812345678",
            "created_at": "2026-08-06T20:12:30.842Z",
            "updated_at": "2026-08-06T21:17:19.999Z"
        },
        "blood": {
            "id": "38216396-d186-4b63-b06e-af9812c7c53a",
            "user_id": "80c21f03-8489-4f9a-acea-b90b90bcac44",
            "blood_group": "AB+",
            "last_donation_date": null,
            "can_donate": true,
            "next_available_date": null,
            "is_available_for_donation": true,
            "updated_at": "2026-08-06T21:17:19.999Z"
        }
    }
}