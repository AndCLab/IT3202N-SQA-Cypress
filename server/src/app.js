import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import helmet from "helmet";

const app = express();
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);
app.use(errorHandler);

export default app;
