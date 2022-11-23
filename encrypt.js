import { genSalt } from "./node_modules/bcrypt/bcrypt.js";

const encriptar = async (password) => {
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  return cripto;
};

export default encriptar;
