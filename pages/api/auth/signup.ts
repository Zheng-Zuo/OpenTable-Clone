import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt"
import * as jose from "jose"
import { createUser, fetchUserByEmail } from "@/lib/actions/auth.action";
import { setCookie } from "cookies-next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { firstName, lastName, email, phone, city, password } = req.body
        const errors: string[] = []

        const validationSchema = [
            {
                valid: validator.isLength(firstName, { min: 1, max: 300 }),
                errorMessage: "First name is invalid"
            },
            {
                valid: validator.isLength(lastName, { min: 1, max: 300 }),
                errorMessage: "Last name is invalid"
            },
            {
                valid: validator.isEmail(email),
                errorMessage: "Email is invalid"
            },
            {
                valid: validator.isMobilePhone(phone),
                errorMessage: "Phone number is invalid"
            },
            {
                valid: validator.isLength(city, { min: 1, max: 300 }),
                errorMessage: "City is invalid"
            },
            {
                valid: validator.isStrongPassword(password),
                errorMessage: "Password Requirements: Minimum length of 8 characters. At least one lowercase letter. At least one uppercase letter. At least one digit (0-9). At least one special character (e.g., !, @, #, $, %)."
            }
        ]

        validationSchema.forEach((check) => {
            if (!check.valid) {
                errors.push(check.errorMessage)
            }
        })

        if (errors.length) {
            return res.status(400).json({ errorMessage: errors[0] })
        }

        const userWithEmail = await fetchUserByEmail(email)
        if (userWithEmail) {
            return res
                .status(400)
                .json({ errorMessage: "This Email is already associated with another account" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await createUser(
            {
                first_name: firstName,
                last_name: lastName,
                city: city,
                password: hashedPassword,
                email: email,
                phone: phone,
            })

        const alg = "HS256"
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const token = await new jose.SignJWT({ email: user.email })
            .setProtectedHeader({ alg })
            .setExpirationTime("24h")
            .sign(secret)

        setCookie("jwt", token, { req, res, maxAge: 60 * 1 * 24 })

        return res.status(200).json({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            phone: user.phone,
            city: user.city,
        })
    }

    return res.status(404).json("Invalid URL")

}