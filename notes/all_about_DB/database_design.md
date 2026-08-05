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


# Update 0.1

                 USER MODULE
                     users
              /      |       \
             /       |        \
   user_profiles  user_locations  blood_information
                                  |
                                  |
                     blood_donation_history

                     |
                     |
               medical_events
              /       |         \
             /        |          \
    ai_responses  event_hospitals  event_ambulances
                      |                 |
                 hospitals      ambulance_providers
                     |
          ------------------------
          |          |           |
 hospital_admins  hospital_wards  reservations
                       |
                 hospital_beds
                       |
                  payments

                  


| No | Table                  | Purpose                |
| -- | ---------------------- | ---------------------- |
| 1  | users                  | Authentication         |
| 2  | roles                  | User Roles             | --> removed after update 01
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


# previous

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

# updated 01


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



Part 1
ENUM Types
Roles table  --> removed
Users table
User Profiles
User Location
Blood Information
Blood Donation History
Part 2

Hospital tables

Part 3

Medical Event tables

Part 4

Reservation tables

Part 5

Indexes

Part 6

Views

Part 7

Triggers

Part 8

Functions

Part 9

sample data

# ---------------------------------------
now the work begins

1. UUID - Universally Unique Identifiers
2. we will need extension pgcrypto to use this UUID
3. \dx to see all the extensions
4. \l      -- List databases
5. \dt     -- List tables
6. \d      -- Describe a table
7. \dx     -- List extensions
8. \dn     -- List schemas
9. \q      -- Quit psql
10. \dT    -- To see all of the custom types listed


# ENUMs we will need

| ENUM                      | Used In           |
| ------------------------- | ----------------- |
| `role_type`               | Users             |
| `blood_group_type`        | Blood Information |
| `severity_type`           | AI Events         |
| `reservation_status_type` | Reservations      |
| `reservation_mode_type`   | Reservations      |
| `bed_status_type`         | Beds              |
| `payment_status_type`     | Payments          |
| `payment_method_type`     | Payments          |
| `hospital_status_type`    | Hospitals         |
| `event_status_type`       | Medical Events    |
| `gender_type`             | User Profile      |

I made 11 ENUMs

# All the codes I have written for the enum creation

medlink=# CREATE TYPE role_type AS ENUM (
medlink(#     'CUSTOMER',
medlink(#     'SUPER_ADMIN',
medlink(#     'HOSPITAL_ADMIN',
medlink(#     'AMBULANCE_ADMIN'
medlink(# );
CREATE TYPE
medlink=# CREATE TYPE gender_type AS ENUM (
medlink(#     'MALE',
medlink(#     'FEMALE',
medlink(#     'OTHER'
medlink(# );
CREATE TYPE
medlink=# CREATE TYPE blood_group_type AS ENUM (
medlink(#     'A+',
medlink(#     'A-',
medlink(#     'B+',
medlink(#     'B-',
medlink(#     'AB+',
medlink(#     'AB-',
medlink(#     'O+',
medlink(#     'O-'
medlink(# );
CREATE TYPE
medlink=# CREATE TYPE severity_type AS ENUM (
medlink(#     'LOW',
medlink(#     'MEDIUM',
medlink(#     'HIGH',
medlink(#     'CRITICAL'
medlink(# );
CREATE TYPE
medlink=# CREATE TYPE event_status_type AS ENUM (
medlink(#     'PENDING',
medlink(#     'COMPLETED',
medlink(#     'CANCELLED'
medlink(# );
CREATE TYPE
medlink=# CREATE TYPE hospital_status_type AS ENUM (
medlink(#     'OPEN',
medlink(#     'CLOSED',
medlink(#     'UNDER_MAINTENANCE'
medlink(# );
CREATE TYPE
medlink=# CREATE TYPE bed_status_type AS ENUM (
medlink(#     'AVAILABLE',
medlink(#     'OCCUPIED',
medlink(#     'RESERVED',
medlink(#     'MAINTENANCE'
medlink(# );
CREATE TYPE
medlink=# CREATE TYPE reservation_status_type AS ENUM (
medlink(#     'PENDING',
medlink(#     'APPROVED',
medlink(#     'REJECTED',
medlink(#     'CANCELLED',
medlink(#     'COMPLETED'
medlink(# );
CREATE TYPE
medlink=# CREATE TYPE reservation_mode_type AS ENUM (
medlink(#     'NORMAL',
medlink(#     'EMERGENCY'
medlink(# );
CREATE TYPE
medlink=# CREATE TYPE payment_status_type AS ENUM (
medlink(#     'UNPAID',
medlink(#     'PARTIALLY_PAID',
medlink(#     'PAID',
medlink(#     'REFUNDED'
medlink(# );
CREATE TYPE
medlink=# CREATE TYPE payment_method_type AS ENUM (
medlink(#     'CASH',
medlink(#     'CARD',
medlink(#     'MOBILE_BANKING',
medlink(#     'BANK_TRANSFER'
medlink(# );
CREATE TYPE
medlink=# \dT
               List of data types
 Schema |          Name           | Description
--------+-------------------------+-------------
 public | bed_status_type         |
 public | blood_group_type        |
 public | event_status_type       |
 public | gender_type             |
 public | hospital_status_type    |
 public | payment_method_type     |
 public | payment_status_type     |
 public | reservation_mode_type   |
 public | reservation_status_type |
 public | role_type               |
 public | severity_type           |
(11 rows)


medlink=#

# Triggers ------------

1. 

OLD Row
   ↓
Trigger Runs
   ↓
NEW.updated_at = CURRENT_TIMESTAMP
   ↓
Row Saved


CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

2. 


# Let's move into the heart

User
 │
 │
 │ "My father has severe chest pain."
 │
 ▼
AI Analysis
 │
 ▼
Medical Event Created
 │
 ├──────── AI Response Saved
 │
 ├──────── Nearby Hospitals Saved
 │
 ├──────── Ambulance Providers Saved
 │
 └──────── User Opens Event
                │
                ▼
         Reserve ICU Bed
                │
                ▼
          Reservation Created
                │
                ▼
            Payment Generated


# Until now I have build these things

👤 User Module

✅ users
✅ user_profiles
✅ user_locations
✅ blood_information
✅ blood_donation_history


🏥 Hospital Module

✅ hospitals
✅ hospital_admins
✅ hospital_wards
✅ hospital_beds


🚑 Ambulance Module

✅ ambulance_providers


🤖 AI Module

✅ medical_events
✅ ai_responses
✅ event_hospitals
✅ event_ambulances


🛏️ Reservation Module

✅ reservations
✅ payments

That's 16 tables.