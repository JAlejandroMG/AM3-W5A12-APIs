import express from "express";
import authRouter from "./routes/auth";
import usersRouter from './routes/users'

const app = express();

app.use(express.json());
app.use(authRouter);
app.use(usersRouter);

export default app;
