// import clientRepository from '../repositories/client.repository.js';
import { Client } from "../data/models/Client.model.js";
import { Admin } from "../data/models/Admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const validateToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    const userClient = jwt.verify(token, process.env.SECRET_KEY_CLIENT);
    if (userClient) return res.status(200).json({ access: true });
    res.status(403).json({ access: false });
  } catch (error) {
    res.status(500).json({ access: false });
  }
};

const validateTokenAdmin = async (req, res, next) => {
  try {
    const { token } = req.body;
    const userAdmin = jwt.verify(token, process.env.SECRET_KEY_ADMIN);
    if (userAdmin) return res.status(200).json({ access: true });
    res.status(403).json({ access: false });
  } catch (error) {
    res.status(500).json({ access: false });
  }
};

const login = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.send({ message: "bad request" });
    }

    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.send({ message: "bad request" });
    }

    const admin = await Admin.findOne({ where: { userName: userName } });
    if (admin) {
      const isValidPassword = await bcrypt.compareSync(
        password,
        admin.password
      );
      if (!isValidPassword) {
        return res.send({ message: "incorrect password" });
      }
      const token = jwt.sign(
        { idAdmin: admin.idAdmin, userName: admin.userName },
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
    console.log("no es un admin");
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
  validateToken,
  validateTokenAdmin,
};
