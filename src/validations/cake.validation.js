import z from "zod/v4";

const createCakeSchema = z.strictObject({
    name: z.string("Nama kue tidak boleh kosong!").min(1, "Nama kue tidak boleh kosong!"),
    price: z.number("Harga kue harus angka!").positive("Harga kue harus lebih besar dari 0 Rupiah!")
});

export { createCakeSchema };