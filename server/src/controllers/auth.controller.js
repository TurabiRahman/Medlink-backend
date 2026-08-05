const authService = require("../services/auth.service");

const signup = async (req, res) => {
  try {
    const result = await authService.signup(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      statusCode: 201,
      data: {
        userId: result.user.id,
        email: result.user.email,
        phone: result.user.phone,
        userType: result.user.role_type,
        createdAt: result.user.created_at,
      },
      token: result.token,
    });
  } 
  catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
      statusCode: error.statusCode || 500,
      ...(error.errorCode && {
        errorCode: error.errorCode,
      }),
    });
  }
};


module.exports = {
  signup,
};