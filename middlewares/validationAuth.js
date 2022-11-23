import { check, validationResult } from "express-validator";

const validationAuth = async (req, res, next) => {
  console.log(" Pasó Validation Auth");
  await check("userName", "invalid userName").notEmpty().run(req);
  //   await check(
  //     "password",
  //     "password must have min Length 8, 1 lowercase, 1 uppercase and 1 number"
  //   )
  //     .isLength({ max: 150, min: 8 })
  //     .run(req);

  let result = validationResult(req);
  console.log(result);
  if (!result.isEmpty()) {
    return res.send(result);
  }
  next();
};

export default {
  validationAuth,
};
