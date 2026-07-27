import { prisma } from "../config/db.config.js";
import { CreateUserDto } from "../dtos/user.dto.js";


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

export async function findByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email.toLowerCase().trim()
        }
    });
    return user;
}

export async function create(data: CreateUserDto) {
    const user = await prisma.user.create({ data });
    return user;
}
