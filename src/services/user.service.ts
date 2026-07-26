import { create, findById, getAll } from "../repositories/user.repository.js"
import { notFound } from "../utils/api-error.js";


export async function findAllUsers() {
    const users = await getAll();
    return users;
}

export async function findByUserId(id: number) {
    const user = await findById(id);
    if (!user) {
        throw notFound("User Not Found");
    }
    return user;
}

export async function createUsers(payload: any) {
    const user = await create(payload);
    return user
}