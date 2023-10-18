import * as z from "zod";

// Regular expression for a valid phone number format
const phoneNumberRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

export const BookingValidation = z.object({
    firstName: z.string().nonempty("First name cannot be empty"),
    lastName: z.string().nonempty("Last name cannot be empty"),
    phoneNumber: z.string()
        .nonempty("Phone number cannot be empty")
        .refine(value => phoneNumberRegex.test(value), {
            message: "Invalid phone number format",
        }),
    Email: z.string()
        .nonempty("Email cannot be empty")
        .email("Invalid email address"),
    Occasion: z.string().optional(),
    Requests: z.string().optional(),
});