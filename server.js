import express from "express";
import routerLogin from "./routes/auth.route.js";
import routerAdmin from "./routes/admin.route.js";
import routerClient from "./routes/client.route.js";
import { handleError } from "./middlewares/handleError.js";

const app = express();

app.use(express.json());

app.use("/auth", routerLogin);
app.use(routerClient);
app.use(routerAdmin);

app.use(handleError);

app.listen(3000, () => {
  console.log("Server Listening");
});
