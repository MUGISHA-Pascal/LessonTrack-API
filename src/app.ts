import cors from "cors";
import express, { Express } from "express";
import dotenv from "dotenv";
import { postgresConnectionSequelize } from "./config/postgres";
import AuthRoutes from "./routes/AuthRoutes";
import bodyParser from "body-parser";
dotenv.config();
const app: Express = express();
app.use(cors());
app.use(bodyParser.json());

postgresConnectionSequelize
  .authenticate()
  .then(() => {
    console.log("connected to the db");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/auth", AuthRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`the server is running on port ${port}`);
});
