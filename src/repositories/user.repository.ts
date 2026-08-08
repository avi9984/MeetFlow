import { slugify } from "zod";
import { prisma } from "../config/db.config.js";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto.js";


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
    // console.log("user", user);

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

export async function create(data: CreateUserDto & { slug: string }) {
    const user = await prisma.user.create({ data });
    return user;
}

export async function update(id: number, data: UpdateUserDto) {
    const user = await prisma.user.update({
        where: {
            id
        },
        data
    });
    return user;
}

export async function remove(id: number) {
    const user = await prisma.user.delete({
        where: {
            id
        }
    });
    return user;
}
