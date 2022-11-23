// import clientRepository from '../repositories/client.repository.js';
import { Client } from "../data/models/Client.model.js";
import { Admin } from "../data/models/Admin.model.js";
import jwt from "jsonwebtoken";

const login = async (req, res, next) => {
  console.log(req.body);
  try {
    if (!req.body) {
      return res.send({ message: "bad request" });
    }

    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.send({ message: "bad request" });
    }

    const client = await Client.findOne({ where: { userName } });
    if (client) {
      //verificar contraseña del usuario
      if (!client.verifyPassword(password)) {
        return res.send({ message: "incorrect password" });
      }

      //generar token
      const token = jwt.sign(
        { idClient: client.idClient, userName: client.userName },
        process.env.SECRET_KEY_CLIENT,
        {
          expiresIn: "1d",
        }
      );
      return res.send({
        message: "successful",
        idClient: client.idClient,
        userName: client.userName,
        token: token,
      });
    }

    const admin = await Admin.findOne({ where: { userName } });
    if (admin) {
      if (!admin.verifyPassword(password)) {
        return res.send({ message: "incorrect password" });
      }
      const token = jwt.sign(
        { idAdmin: admin.idAdmin, useraName: admin.userName },
        process.env.SECRET_KEY_ADMIN,
        {
          expiresIn: "1d",
        }
      );
      return res.send({
        message: "successful Admin",
        token: token,
      });
    }
  } catch (error) {
    next(error);
  }
};

const info = async (req, res) => {
  res.send("Hello World");
};

const infoAdmin = async (req, res) => {
  res.send("Hello Admin");
};

export default {
  login,
  info,
};
