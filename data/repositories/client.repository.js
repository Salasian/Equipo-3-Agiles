import { Client } from "../models/Client.model.js";

const register = async (value) => {
  if (!value) return new Error("Client is required");
  const { userName, password } = value;
  const client = await Client.create(
    {
      userName: userName,
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
  const { idClient, userName, password } = value;
  const updatedClient = await Client.update(
    {
      userName: userName,
      password: password,
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
};

const findOne = async (value) => {
  // if (!value) return new Error("Client is required");
  const { idClient } = value;
  const client = await Client.findOne({
    attributes: ["idClient", "userName", "password"],
    where: {
      idClient,
    },
  });
  return client;
};

const findAll = async () => {
  const client = await Client.findAll({
    attributes: ["userName", "password"],
  });
  return client;
};

export { register, update, deleteOne, findOne, findAll };
