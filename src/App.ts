import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routes from "./Routes/Routes";
const port = process.env.PORT || 5000;

dotenv.config();
mongoose.Promise = global.Promise;
//@ts-ignore
mongoose.connect(process.env.MONGO_URL || process.env.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all("/*", (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
app.use(routes);
app.use("/", (req, res) => res.send("404 not found"));
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
