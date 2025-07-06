import * as z from "zod/v4";

// This file defines the validation schemas for user authentication using Zod.
export const loginSchema = z.object({
    username: z.string("Nama pengguna tidak boleh kosong!").min(1, "Nama pengguna tidak boleh kosong!"),
    password: z.string("Kata sandi tidak boleh kosong!").min(1, "Kata sandi tidak boleh kosong!" )
}).readonly();