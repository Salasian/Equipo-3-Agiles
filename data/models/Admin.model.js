import DataType from "sequelize";
import { sequelize } from "../connection.js";
import bcrypt from "bcrypt";

export const Admin = sequelize.define(
  "admins",
  {
    idAdmin: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    userName: {
      type: DataType.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataType.STRING(150),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: async (admin) => {
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
      },
    },
  }
);

Admin.prototype.verifyPassword = function (password) {
  return bcrypt.compareSync(
    password,
    "$2b$10$1CatTXYWNfnjiPJukFwIe.JsofwwkbfZRiKw/c36Gamu/B3evtJ5q"
  );
};
