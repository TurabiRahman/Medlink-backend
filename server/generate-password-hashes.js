const bcrypt = require('bcrypt');

const passwords = {
  // medlife: 'MedLifeAdmin123!',
  // dhaka: 'DhakaAdmin123!',
  // emergency: 'EmergencyAdmin123!'

  // new ambulance admin passwords
  // dhakaAmbulance: 'DhakaAmbulance123!',
  // medlifeAmbulance: 'MedLifeAmbulance123!',
  // uttaraAmbulance: 'UttaraAmbulance123!',
  // mirpurAmbulance: 'MirpurAmbulance123!'

  newPass: 'SecurePass123!'  // this will be the password for all the customers, ambulance_admins, hospital_admins, and super_admins. It will be changed later by the users themselves.

};

async function generateHashes() {
  for (const [hospital, password] of Object.entries(passwords)) {
    const hash = await bcrypt.hash(password, 12);
    console.log(`${hospital.toUpperCase()}:`);
    console.log(`  Password: ${password}`);
    console.log(`  Hash: ${hash}`);
    console.log('');
  }
}

generateHashes();




