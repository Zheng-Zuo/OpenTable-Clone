import prismaClient from "@/prisma/prismaClient";

const prisma = prismaClient

interface Props {
    first_name: string;
    last_name: string;
    city: string;
    password: string;
    email: string;
    phone: string;
}

export async function createUser(data: Props) {
    const user = await prisma.user.create({ data })
    return user
}

export async function fetchUserByEmail(email: string) {
    const userWithEmail = prisma.user.findUnique({
        where: {
            "email": email
        },
    })
    return userWithEmail
}

export async function fetchUserInfo(email: string) {
    const userWithEmail = prisma.user.findUnique({
        where: {
            "email": email
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            city: true,
            phone: true,
        } 
    })
    return userWithEmail
}