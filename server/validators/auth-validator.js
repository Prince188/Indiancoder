const { z } = require('zod')

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Please enter a valid email address" })
        .min(3, { message: "Email must be 3 characters" })
        .max(200, { message: "Email must be less than 200 characters" }),

    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(7, { message: "Password must be 7 characters" })
        .max(1000, { message: "Password must be less than 1000 characters" }),
})

const signupSchema = z.object({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "name must be 3 characters" })
        .max(200, { message: "name must be less than 200 characters" }),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Please enter a valid email address" })
        .min(3, { message: "Email must be 3 characters" })
        .max(200, { message: "Email must be less than 200 characters" }),

    phone: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(10, { message: "Phone number must be 10 characters" })
        .max(20, { message: "Phone must be less than 20 characters" }),

    password: z
        .string({ required_error: "Name is required" })
        .min(7, { message: "Password must be 7 characters" })
        .max(1000, { message: "Password must be less than 1000 characters" }),
})

module.exports = {signupSchema , loginSchema}