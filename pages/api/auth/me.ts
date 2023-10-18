import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken"
import { fetchUserInfo } from "@/lib/actions/auth.action";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const bearerToken = req.headers["authorization"] as string
    const token = bearerToken.split(" ")[1]

    const payload = jwt.decode(token) as { email: string }

    if (!payload.email) {
        return res.status(401).json({
            errorMessage: "Unauthorized request"
        })
    }

    const user = await fetchUserInfo(payload.email)
    if (!user) {
        return res.status(401).json({
            errorMessage: "User not found"
        })
    }

    return res.json({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        city: user.city
    })
}