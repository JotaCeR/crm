import bcrypt from "bcrypt";
import { PasswordHasher as PasswordHasherInterface } from "../../domain/security/password/password-hasher";

export class PasswordHasher implements PasswordHasherInterface {
    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}