import { describe, it, expect } from "vitest";
import { validateEmail } from "./email.validator";

describe("Email Validator", () => {
    it("should reject mail without @", () => {
        expect(() => validateEmail("juantest.com")).toThrow()
    })

    it("should reject mail without .com/etc", () => {
        expect(() => validateEmail("juan@testcom")).toThrow()
    })

    it("should reject corner cases emails", () => {
        expect(() => validateEmail("a@b.c")).toThrow()
    })

    it("should accept valid email", () => {
        expect(() => validateEmail("juan@test.com")).not.toThrow()
    })
})