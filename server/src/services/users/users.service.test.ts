import { describe, it, expect, vi } from 'vitest';
import { UsersService } from './users.service';
import { UsersRepository } from '../../repositories/users/users.repository';
import { User } from '../../types/users.types';

describe("Users Service", () => {
    describe("createUser", () => {
        it("should create a user with id, name, email and password", async () => {
            const usersRepo: UsersRepository = {
                findByEmail: vi.fn().mockResolvedValue(null)
            };
            
            const service = new UsersService(usersRepo);
            
            const user = await service.createUser({
                name: "Juan",
                email: "juan@test.com",
                password: "somepasS1!"
            });

            expect(user).toHaveProperty("id");
            expect(user.name).toBe("Juan");
            expect(user.email).toBe("juan@test.com");
            expect(user.password).toBe("somepasS1!");
            
        })

        it("should throw error if email already exists", async () => {
            const usersRepo: UsersRepository = {
                findByEmail: vi.fn().mockResolvedValue({
                    id: 1,
                    name: "Existing",
                    email: "juan@test.com",
                    password: "somepasS1!"
                })
            }

            const service = new UsersService(usersRepo)

            await expect(
                service.createUser({
                    name: "Juan",
                    email: "juan@test.com",
                    password: "somepasS1!"
                })
            ).rejects.toThrow("Email already exists")
        })

        it("should fail if password does not satisfy password policy", async () => {
            const usersRepo: UsersRepository = {
                findByEmail: vi.fn().mockResolvedValue(null)
            }

            const service = new UsersService(usersRepo)

            await expect(
                service.createUser({
                    name: "Juan",
                    email: "juan@test.com",
                    password: "123"
                })
            ).rejects.toThrow()
        })
    })
})