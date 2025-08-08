import { DataTypes } from "sequelize";
import { sequelize } from "../database/connectToDatabase.js";

export const googleUser = sequelize.define("GoogleUsers", {
  googleId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
