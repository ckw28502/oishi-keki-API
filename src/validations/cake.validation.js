import z from "zod/v4";

const getCakesSchema = z.object({
    page: z.coerce.number("Page should be a number!").positive("Page should be a positive number"),
    limit: z.coerce.number("Page size should be a number!").positive("Page size should be a positive number"),
    nameFilter: z.string("Cake name filter should be a string!").optional().default(""),
    sort: z.enum(["name_asc", "name_desc", "price_asc", "price_desc"], "Invalid sorting parameter"),
}).readonly();

const createCakeSchema = z.object({
    name: z.string("Nama kue tidak boleh kosong!").min(1, "Nama kue tidak boleh kosong!"),
    price: z.number("Harga kue harus angka!").positive("Harga kue harus lebih besar dari 0 Rupiah!")
}).readonly();

export { getCakesSchema, createCakeSchema };