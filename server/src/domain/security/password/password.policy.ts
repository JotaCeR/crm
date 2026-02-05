

export function validatePassword(password: string): void {
    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long")
    }

    if (!/[A-Z]/.test(password)) {
        throw new Error("Password must contain at least 1 uppercase letter")
    }

    if (!/[0-9]/.test(password)) {
        throw new Error("Password must contain at least 1 number")
    }

    if (!/[!@#$%^&*]/.test(password)) {
        throw new Error("Password must contain a special character")
    }
}