import { CreateUserDto } from "../dtos/user.dto.js";
import { create, findByEmail, findById, getAll } from "../repositories/user.repository.js"
import { conflict, notFound } from "../utils/api-error.js";


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

export async function createUsers(data: CreateUserDto) {
    //Check if the user already exists
    const existingUser = await findByEmail(data.email);
    if (existingUser) {
        throw conflict('User already exists');
    }
    return create(data);
}