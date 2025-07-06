import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

// Define the Cake model using Sequelize ORM
const Cake = sequelize.define("Cake", {
    // "name" field stores the name of the cake
    // STRING type, required (cannot be null)
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // "imaeUrl" field stores the image URL or path of the cake
    // STRING type, required (cannot be null)
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // "price" field stores the price of the cake
    // INTEGER type, required (cannot be null)
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    // Model name in singular form
    tableName: "cake",

    // Automatically add and manage "createdAt" and "updatedAt" timestamp fields
    timestamps: true
});

export default Kue;
