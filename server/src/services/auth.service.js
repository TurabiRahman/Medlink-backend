const bcrypt = require("bcrypt");

const {
  findUserByEmail,
  findUserByPhone,
  createUser,
  updateLastLogin,
  hasUserProfile,
} = require("../models/auth.model");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwt");

const login = async ({ email, password }) => {

    // Find user
    const user = await findUserByEmail(email);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        error.errorCode = "USER_NOT_FOUND";
        throw error;
    }

    // Check account status
    if (!user.is_active) {
        const error = new Error("Account has been deactivated");
        error.statusCode = 403;
        error.errorCode = "ACCOUNT_DISABLED";
        throw error;
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!isPasswordCorrect) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        error.errorCode = "INVALID_CREDENTIALS";
        throw error;
    }

    // Update login time
    const updatedLogin = await updateLastLogin(user.id);

    // Profile exists?
    const profileComplete = await hasUserProfile(user.id);

    // JWT payload
    const payload = {
        userId: user.id,
        role: user.role_type,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return {
        user: {
            ...user,
            last_login: updatedLogin.last_login,
        },

        profileComplete,

        token: {
            accessToken,
            refreshToken,
            expiresIn: 3600,
            tokenType: "Bearer",
        },
    };
};

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


// I will use it for my emergency login feature

const startEmergencySession = async ({
    name,
    phone,
    latitude,
    longitude,
}) => {

    const payload = {
        sessionType: "EMERGENCY",

        name,
        phone,

        latitude,
        longitude,
    };

    const accessToken = generateAccessToken(payload);

    return {
        name,
        phone,
        latitude,
        longitude,

        isEmergency: true,

        token: {
            accessToken,
            expiresIn: Number(process.env.JWT_ACCESS_EXPIRES_IN_SECONDS) || 3600,
            tokenType: "Bearer",
        },
    };
};

const logout = async () => {
    return true;
};

module.exports = {
  signup,
  login,
  startEmergencySession,
  logout,
};