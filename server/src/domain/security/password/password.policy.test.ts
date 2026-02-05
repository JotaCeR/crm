import { describe, it, expect, vi } from "vitest";
import { validatePassword } from "./password.policy";

describe("Password Policy", () => {
    it("should reject passwords shorter than 8 characters", () => {
        expect(() => validatePassword("Ab1!")).toThrow()
    })

    it("should reject password without uppercase letter", () => {
        expect(() => validatePassword("abcdef!1")).toThrow()
    })

    it("should reject password without number", () => {
        expect(() => validatePassword("Abcdefg!")).toThrow()
    })

    it("should reject password without special character", () => {
        expect(() => validatePassword("Abcdefg1")).toThrow()
    })

    it("should accept a valid password", () => {
        expect(() => validatePassword("Abcdef!1")).not.toThrow()
    })
})