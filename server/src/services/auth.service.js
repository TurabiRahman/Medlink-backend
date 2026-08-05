const bcrypt = require("bcrypt");

const {
  findUserByEmail,
  findUserByPhone,
  createUser,
} = require("../models/auth.model");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwt");

const signup = async ({ email, phone, password, userType }) => {
  // Check if email already exists
  const existingEmail = await findUserByEmail(email);

  if (existingEmail) {
    const error = new Error("User already registered with this email");
    error.statusCode = 409;
    error.errorCode = "EMAIL_EXISTS";
    throw error;
  }

  // Check if phone already exists
  const existingPhone = await findUserByPhone(phone);

  if (existingPhone) {
    const error = new Error("User already registered with this phone number");
    error.statusCode = 409;
    error.errorCode = "PHONE_EXISTS";
    throw error;
  }

  // Hash password
    // I could use one improvement here 
    // const BCRYPT_SALT_ROUNDS = 12;
    // const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 12;
    // const passwordHash = await bcrypt.hash(password, saltRounds);

  const passwordHash = await bcrypt.hash(password, 12);




  // Create user
  const user = await createUser({
    roleType: userType,
    email,
    phone,
    passwordHash,
  });

  // JWT payload
  const payload = {
    userId: user.id,
    role: user.role_type,
  };

  // Generate tokens
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return {
    user,
    token: {
      accessToken,
      refreshToken,
      expiresIn: 3600,
      tokenType: "Bearer",
    },
  };
};

module.exports = {
  signup,
};