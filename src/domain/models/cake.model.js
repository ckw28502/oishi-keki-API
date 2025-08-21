import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

// Define the Cake model using Sequelize ORM
const Cake = sequelize.define("Cake", {
    // "id" field is the primary key for the Cake model
    // UUID type, automatically generated with a default value of UUIDV4
    // Cannot be null and serves as the primary key for the table
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    // "name" field stores the name of the cake
    // CITEXT type for case-insensitive uniqueness, required (cannot be null)
    // Unique constraint ensures no two cakes can have the same name (case-insensitive)
    name: {
        type: DataTypes.CITEXT,
        allowNull: false,
        unique: {
            msg: "Nama kue sudah terpakai!"
        }
    },
    // "price" field stores the price of the cake
    // INTEGER type, required (cannot be null)
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "cakes",

    // Automatically add and manage "createdAt" and "updatedAt" timestamp fields
    timestamps: true
});

export default Cake;
