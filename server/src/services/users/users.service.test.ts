import { describe, it, expect, vi } from 'vitest';
import { UsersService } from './users.service';
import { UsersRepository } from '../../repositories/users/users.repository';
import { User } from '../../types/users.types';
import { IdGenerator } from '../../domain/id-generator/id.types';
import { UuidGenerator } from '../../infrastructure/uuid/uuid-generator';
import { PasswordHasher } from '../../domain/security/password/password-hasher';

describe("Users Service", () => {
    describe("createUser", () => {
        const fakeUsersRepo: UsersRepository = {
                findByEmail: vi.fn().mockResolvedValue(null)
            };

        const fakeExistingUsersRepo: UsersRepository = {
                findByEmail: vi.fn().mockResolvedValue({
                    id: 1,
                    name: "Existing",
                    email: "juan@test.com",
                    password: "somepasS1!"
                })
            };

        class FakeIdGenerator implements IdGenerator {
                generate () {
                    return "fake-id-uuid";
                }
            }

        class FakePasswordHasher implements PasswordHasher {
            async hash(password: string): Promise<string> {
                return "hashed-password";
            }
        }

        const idGenerator = new UuidGenerator()

        it("should create a user with id, name, email and password", async () => {            
            const service = new UsersService(fakeUsersRepo, idGenerator, new FakePasswordHasher());
            
            const user = await service.createUser({
                name: "Juan",
                email: "juan@test.com",
                password: "somepasS1!"
            });

            expect(user).toHaveProperty("id");
            expect(user.name).toBe("Juan");
            expect(user.email).toBe("juan@test.com");
            expect(user.password).toBe("hashed-password");
        });

        it("should throw error if email already exists", async () => {
            const service = new UsersService(fakeExistingUsersRepo, idGenerator, new FakePasswordHasher());

            await expect(
                service.createUser({
                    name: "Juan",
                    email: "juan@test.com",
                    password: "somepasS1!"
                })
            ).rejects.toThrow("Email already exists");
        });

        it("should fail if password does not satisfy password policy", async () => {
            const service = new UsersService(fakeUsersRepo, idGenerator, new FakePasswordHasher());

            await expect(
                service.createUser({
                    name: "Juan",
                    email: "juan@test.com",
                    password: "123"
                })
            ).rejects.toThrow();
        });

        it("should generate UUID for the user", async () => {
            const service: UsersService = new UsersService(fakeUsersRepo, idGenerator, new FakePasswordHasher());

            const user: User = await service.createUser({
                name: "Juan",
                email: "test@test.com",
                password: "Password1!"
            });

            expect(user.id).toBeDefined();
            expect(typeof user.id).toBe("string");
        });

        it("should generate different ids for different users", async () => {
            const service: UsersService = new UsersService(fakeUsersRepo, idGenerator, new FakePasswordHasher());

            const user: User = await service.createUser({
                name: "Juan",
                email: "test@test.com",
                password: "Password1!"
            });

            const userBeta: User = await service.createUser({
                name: "Cruz",
                email: "test2@test.com",
                password: "Password1!"
            });

            expect(user.id).not.toBe(userBeta.id);
        });

        it("should generate 'fake-id-uuid'", async () => {
            const service: UsersService = new UsersService(fakeUsersRepo, new FakeIdGenerator(), new FakePasswordHasher());

            const user: User = await service.createUser({
                name: "Juan",
                email: "test@test.com",
                password: "Password1!"
            });

            expect(user.id).toBe("fake-id-uuid")
        });

        it("should hash password before saving user", async () => {
            const service: UsersService = new UsersService(fakeUsersRepo, new FakeIdGenerator(), new FakePasswordHasher());

            const user: User = await service.createUser({
                name: "Juan",
                email: "test@test.com",
                password: "Password1!"
            })

            expect(user.password).toBe("hashed-password");
        })
    });
});