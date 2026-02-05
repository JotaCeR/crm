import { User } from "../../types/users.types";

export interface UsersRepository {
    findByEmail(email: string): Promise<User | null> 
}