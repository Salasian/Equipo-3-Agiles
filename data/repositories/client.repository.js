import { Client } from "../models/Client.model.js";

const register = async (value) => {
  if (!value) return new Error("Client is required");
  const { userName, name, lastName, address, email, password } = value;
  const client = await Client.create(
    {
      userName: userName,
      name: name,
      lastName: lastName,
      address: address,
      email: email,
      password: password,
    },
    {
      returning: true,
    }
  );
  return client;
  // return result = await client.save();
  // .then(() => "Client successfully created")
  // .catch(() => "Client failed to create");
};

const update = async (value) => {
  const { idClient, userName, name, lastName, address } = value;
  const updatedClient = await Client.update(
    {
      userName: userName,
      name: name,
      lastName: lastName,
      address: address,
    },
    {
      where: { idClient },
      returning: true,
    }
  );

  return updatedClient;
};

const deleteOne = async (value) => {
  if (!value) return new Error("Client is required");
  const { idClient } = value;
  return await Client.destroy({
    where: { idClient },
  });
  // .then("Client deleted successfully")
  // .catch(() => {
  //   throw new Error("Error deleting client");
  // });
};

const findOne = async (value) => {
  // if (!value) return new Error("Client is required");
  const { idClient } = value;
  const client = await Client.findOne({
    attributes: [
      "idClient",
      "username",
      "name",
      "lastName",
      "address",
      "email",
    ],
    where: {
      idClient,
    },
  });
  return client;
};

const findAll = async () => {
  const client = await Client.findAll({
    attributes: ["username", "name", "lastName", "address", "email"],
  });
  return client;
};

export { register, update, deleteOne, findOne, findAll };
