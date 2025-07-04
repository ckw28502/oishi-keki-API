import * as z from "zod/v4";

// This file defines the validation schemas for user authentication using Zod.
export const loginSchema = z.object({
    username: z.string().min(1, { error: "Nama pengguna tidak boleh kosong!" }),
    password: z.string().min(1, { error: "Kata sandi tidak boleh kosong!" })
});