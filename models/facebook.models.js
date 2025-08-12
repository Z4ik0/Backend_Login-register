import { DataTypes } from "sequelize";
import { sequelize } from "../database/connectToDatabase.js";

export const facebookUser = sequelize.define(
  "facebookUser",
  {
    facebookId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "facebook_users",
  }
);
