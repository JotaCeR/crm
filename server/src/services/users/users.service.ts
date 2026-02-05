import { CreateUserInput, User } from "../../types/users.types"
import { UsersRepository } from "../../repositories/users/users.repository"
import { validatePassword } from "../../domain/security/password/password.policy"

export class UsersService {
    constructor(private readonly usersRepo: UsersRepository) {}
    
    async createUser(input: CreateUserInput): Promise<User> {
        validatePassword(input.password);

        if (!isValidEmail(input.email)) {
            throw new Error("Invalid email.");
        };

        const existing = await this.usersRepo.findByEmail(input.email);

        if (existing) {
            throw new Error("Email already exists.");
        };
        
        return {
            id: 1,
            ...input
        };
    };
};

function isValidEmail(email: string): boolean {
    return email.includes("@")
};