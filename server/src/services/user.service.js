const {
    createUserProfile,
    getProfileByUserId,
    updateUserProfile,
} = require("../models/user.model");

const completeProfile = async (userId, data) => {

    try {

        return await createUserProfile({
            userId,
            ...data,
        });

    } catch (error) {

        if (error.code === "23505") {

            if (error.constraint === "user_profiles_national_id_key") {

                const err = new Error("National ID already exists");
                err.statusCode = 409;
                throw err;

            }

            if (error.constraint === "blood_information_user_id_key") {

                const err = new Error("Profile already completed");
                err.statusCode = 409;
                throw err;

            }

        }

        throw error;

    }

};

const getProfile = async (userId) => {

    const profile = await getProfileByUserId(userId);

    if (!profile) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return profile;
};

const updateProfile = async (userId, body) => {

    return await updateUserProfile(userId, body);

};

module.exports = {
    completeProfile,
    getProfile,
    updateProfile, 
};