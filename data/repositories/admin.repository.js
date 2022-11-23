import { Admin } from "../models/Admin.model.js";

const register = async (admin) => {
  return await Admin.create(admin, { returning: true });
};

const findAll = async () => {
  const admins = await Admin.findAll({
    attributes: ["idAdmin", "userName", "password"],
  });
  return admins;
};

const findOne = async (idAdmin) => {
  if (!idAdmin) {
    console.log("error");
  }
  const admin = await Admin.findOne({
    attributes: ["idAdmin", "userName", "password"],
    where: { idAdmin: idAdmin },
  });
  return admin;
};

const deleteOne = async (idAdmin) => {
  // const { idAdmin } = idAdmin;
  return await Admin.destroy({ where: { idAdmin: idAdmin } });
};

const update = async (newData) => {
  const { idAdmin, userName, password } = newData;
  return await Admin.update(
    {
      userName,
      password,
    },
    {
      where: { idAdmin },
    }
  );
};

export { register, findAll, findOne, update, deleteOne };
