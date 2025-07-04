import z from "zod";

// This file defines the validation schemas for user authentication using Zod.
export const loginSchema = z.object({
    username: z.string().min(1, "Nama pengguna tidak boleh kosong"),
    password: z.string().min(1, "Kata sandi tidak boleh kosong"),
});