                    USERS
                      │
          ┌───────────┴────────────┐
          │                        │
      USER_PROFILE           USER_LOCATION
          │
          │
      BLOOD_INFO
          │
          │
      BLOOD_DONATION_HISTORY




                      │
                      │
               MEDICAL_EVENTS
                      │
      ┌───────────────┼──────────────────┐
      │               │                  │
 AI_RESPONSE     EVENT_HOSPITALS    EVENT_AMBULANCES
                      │
                RESERVATIONS
                      │
                  HOSPITALS
                      │
      ┌───────────────┴───────────────┐
      │                               │
   WARDS                         HOSPITAL_BEDS

                      │
                 PAYMENTS

                      │
               AMBULANCE_PROVIDERS




| No | Table                  | Purpose                |
| -- | ---------------------- | ---------------------- |
| 1  | users                  | Authentication         |
| 2  | roles                  | User Roles             |
| 3  | user_profiles          | Personal Information   |
| 4  | user_locations         | GPS Coordinates        |
| 5  | blood_information      | Blood Information      |
| 6  | blood_donation_history | Donation History       |
| 7  | hospitals              | Hospital Information   |
| 8  | hospital_admins        | Hospital Ownership     |
| 9  | hospital_wards         | Ward Types             |
| 10 | hospital_beds          | Every Bed              |
| 11 | medical_events         | Every AI Consultation  |
| 12 | ai_responses           | AI Output              |
| 13 | event_hospitals        | Recommended Hospitals  |
| 14 | event_ambulances       | Recommended Ambulances |
| 15 | reservations           | Bed Reservation        |
| 16 | payments               | Hospital Billing       |
| 17 | ambulance_providers    | Ambulance Contacts     |
| 18 | login_history          | Security               |
| 19 | refresh_tokens         | JWT Authentication     |


roles
   │
   │
users
   │
   ├───────────────┐
   │               │
profiles      locations
   │
blood_information
   │
blood_history

users
   │
medical_events
   │
ai_responses

medical_events
      │
      ├────────── event_hospitals ───────── hospitals
      │
      └────────── event_ambulances ─────── ambulance_providers

medical_events
      │
reservations
      │
      ├──────── hospitals
      ├──────── wards
      └──────── beds

reservations
      │
payments