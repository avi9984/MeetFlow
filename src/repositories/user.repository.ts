import { prisma } from "../config/db.config.js";


export async function getAll() {
    const users = await prisma.user.findMany();
    return users;
}

export async function findById(id: number) {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });
    return user;
}

export async function create(payload: any) {
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })
    if (user) {
        throw new Error('User already exist')
    }
    const createdUser = await prisma.user.create({ data: payload });
    return createdUser
}
