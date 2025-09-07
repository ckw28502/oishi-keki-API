import * as z from "zod/v4";

const loginSchema = z.object({
    username: z.string("Nama pengguna tidak boleh kosong!").nonempty("Nama pengguna tidak boleh kosong!"),
    password: z.string("Kata sandi tidak boleh kosong!").nonempty("Kata sandi tidak boleh kosong!" )
}).readonly();

export { loginSchema };