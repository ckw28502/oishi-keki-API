import z from "zod";

const createCakeSchema = z.object({
    name: z.string("Nama kue tidak boleh kosong!").min(1, "Nama kue tidak boleh kosong!"),
    price: z.number("Harga kue tidak boleh kosong!").min(1, "Harga kue harus lebih besar dari 0 Rupiah!")
})

export { createCakeSchema };