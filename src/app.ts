import express, { json, Request, Response } from "express";
import dotenv from "dotenv";
import "express-async-errors";
import fruitsRouter from "./routers/fruits-router";
import { handleApplicationErrors } from "./middlewares/error-validate";

dotenv.config();

const app = express();
app.use(json());
app.get("/health", (req: Request, res: Response) => res.send("ok!"));
app.use(fruitsRouter);
app.use(handleApplicationErrors);

export default app;