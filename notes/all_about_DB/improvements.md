# -- DB impv

CHECK (length(emergency_contact_phone) BETWEEN 11 AND 20)

# -- to blood_donation_history

ALTER TABLE blood_donation_history
ADD CONSTRAINT fk_blood_donation_history_hospital
FOREIGN KEY (hospital_id)
REFERENCES hospitals(id)
ON DELETE SET NULL;

we made this one in the previous section 

http://localhost:3000/api/v1/hospitals?limit=20&offset=0&sortBy=name 

but only customer can access that 

in this section we will upgrade it so that hospital_admin, super_admin or even ambulance_admin can see all the hospital list

