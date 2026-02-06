import isEmail from "validator/lib/isEmail";

export function validateEmail(email: string): void {
    if (!isEmail(email)) {
        throw new Error("Invalid email")
    }
}