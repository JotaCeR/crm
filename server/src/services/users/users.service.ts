import { CreateUserInput, User } from "../../types/users.types"
import { UsersRepository } from "../../repositories/users/users.repository"
import { validatePassword } from "../../domain/security/password/password.policy"
import { validateEmail } from "../../domain/email/email.validator";
import { UuidGenerator } from "../../infrastructure/uuid/uuid-generator";
import { PasswordHasher } from "../../infrastructure/password-hasher/password-hasher";

export class UsersService {
    constructor(
        private readonly usersRepo: UsersRepository,
        private readonly idGenerator: UuidGenerator,
        private readonly passwordHasher: PasswordHasher,
    ) {}
    
    async createUser(input: CreateUserInput): Promise<User> {
        validatePassword(input.password);
        validateEmail(input.email);

        const existing = await this.usersRepo.findByEmail(input.email);

        if (existing) {
            throw new Error("Email already exists.");
        };

        const hashedPassword: string = await this.passwordHasher.hash(input.password)
        
        return {
            id: this.idGenerator.generate(),
            ...input,
            password: hashedPassword
        };
    };
};