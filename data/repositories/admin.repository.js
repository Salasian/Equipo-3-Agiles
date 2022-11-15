import { Admin } from "../models/Admin.model.js";

const register = async (admin) => {
  return await Admin.create(admin, { returning: true });
};

const findAll = async () => {
  const admins = await Admin.findAll({
    attributes: ["idAdmin", "username", "name", "lastName", "email"],
  });
  return admins;
};

const findOne = async (idAdmin) => {
  if (!idAdmin) {
    console.log("error");
  }
  const admin = await Admin.findOne({
    attributes: ["idAdmin", "username", "name", "lastName", "email"],
    where: { idAdmin: idAdmin },
  });
  return admin;
};

const deleteOne = async (idAdmin) => {
  // const { idAdmin } = idAdmin;
  return await Admin.destroy({ where: { idAdmin: idAdmin } });
};

const update = async (newData) => {
  const { idAdmin, userName, name, lastName, email } = newData;
  return await Admin.update(
    {
      userName,
      name,
      lastName,
      email,
    },
    {
      where: { idAdmin },
    }
  );
};

export { register, findAll, findOne, update, deleteOne };
