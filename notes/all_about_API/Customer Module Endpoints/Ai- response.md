# req 

{
    "userDescription": "I have had a high fever since yesterday and I feel very weak. I also have a headache and body aches.",
    "latitude": 23.810333,
    "longitude": 90.412523,
    "isEmergency": false
}


# res

{
    "success": true,
    "message": "AI medical consultation completed successfully",
    "statusCode": 201,
    "data": {
        "event": {
            "id": "73442d38-6d71-4c76-b353-76ac3c6b41dd",
            "user_id": "80da2d49-fb18-47f8-8584-689574e8e274",
            "user_description": "I have had a high fever since yesterday and I feel very weak. I also have a headache and body aches.",
            "event_location_latitude": "23.810333",
            "event_location_longitude": "90.412523",
            "severity": "MEDIUM",
            "event_status": "PENDING",
            "is_emergency": false,
            "created_at": "2026-08-10T20:16:18.536Z",
            "updated_at": "2026-08-10T20:16:18.536Z"
        },
        "aiResponse": {
            "id": "6a83ed0a-af71-4e93-ba88-281a0b77299f",
            "medical_event_id": "73442d38-6d71-4c76-b353-76ac3c6b41dd",
            "summary": "The user is experiencing a high fever, weakness, headache, and body aches that started yesterday.",
            "possible_conditions": "Possible conditions that could be associated with these symptoms include influenza, viral infections, or other acute illnesses, but these are speculative and not confirmed diagnoses.",
            "tags": "fever, headache, body aches, weakness, viral infection, influenza",
            "first_aid": "Stay hydrated by drinking plenty of fluids, rest, and monitor temperature. If symptoms worsen or if difficulty breathing, chest pain, or severe headache occurs, seek emergency medical care immediately.",
            "created_at": "2026-08-10T20:16:18.544Z"
        }
    }
}