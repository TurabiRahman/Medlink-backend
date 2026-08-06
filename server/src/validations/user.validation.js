const { z } = require("zod");

const profileSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2)
        .max(100),

    lastName: z
        .string()
        .trim()
        .min(2)
        .max(100),

    gender: z.enum([
        "MALE",
        "FEMALE",
        "OTHER",
    ]),

    dateOfBirth: z.string().date(),

    nationalId: z
        .string()
        .trim()
        .min(5)
        .max(30),

    address: z
        .string()
        .trim()
        .min(5),

    emergencyContactName: z
        .string()
        .trim()
        .min(2)
        .max(200),

    emergencyContactPhone: z
        .string()
        .regex(/^\+8801[3-9]\d{8}$/),

    bloodGroup: z.enum([
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
    ]),
});

module.exports = {
    profileSchema,
    updateProfileSchema: profileSchema,
};