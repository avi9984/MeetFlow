import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto.js";
import { create, findByEmail, findById, getAll, update, remove } from "../repositories/user.repository.js"
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

export async function updateUser(id: number, data: UpdateUserDto) {
    const user = await findById(id);
    if (!user) {
        throw notFound("User Not Found");
    }
    if (data.email) {
        const emailLower = data.email.toLowerCase().trim();
        if (emailLower !== user.email) {
            const existingUser = await findByEmail(emailLower);
            if (existingUser) {
                throw conflict("Email already exists");
            }
        }
    }
    return update(id, data);
}

export async function deleteUser(id: number) {
    const user = await findById(id);
    if (!user) {
        throw notFound("User Not Found");
    }
    return remove(id);
}