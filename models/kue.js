import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

// Define the "Kue" model representing cakes in the database
const Kue = sequelize.define("Kue", {
    // "nama" field stores the name of the cake
    // STRING type, required (cannot be null)
    nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // "gambar" field stores the image URL or path of the cake
    // STRING type, required (cannot be null)
    gambar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // "harga" field stores the price of the cake
    // INTEGER type, required (cannot be null)
    harga: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    // Explicitly specify the table name in the database as "kue"
    tableName: "kue",

    // Automatically add and manage "createdAt" and "updatedAt" timestamp fields
    timestamps: true
});

export default Kue;
