# -- DB impv

CHECK (length(emergency_contact_phone) BETWEEN 11 AND 20)

# -- to blood_donation_history

ALTER TABLE blood_donation_history
ADD CONSTRAINT fk_blood_donation_history_hospital
FOREIGN KEY (hospital_id)
REFERENCES hospitals(id)
ON DELETE SET NULL;