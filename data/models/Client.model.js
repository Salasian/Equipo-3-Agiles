import DataType from "sequelize";
import { sequelize } from "../connection.js";
import bcrypt from "bcrypt";

export const Client = sequelize.define(
  "clients",
  {
    idClient: {
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
    tableName: "clients",
    timestamps: true,
    hooks: {
      beforeCreate: async (client) => {
        const salt = await bcrypt.genSalt(10);
        client.password = await bcrypt.hash(client.password, salt);
      },
    },
  }
);

Client.prototype.verifyPassword = function (password) {
  console.log(password, this.password);
  return bcrypt.compareSync(password, this.password);
};

Client.sync();
