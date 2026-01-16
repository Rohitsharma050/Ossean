import express from "express";
import 'dotenv/config';
import cors from 'cors';
import connectDb from './config/mongodb.js';
import userRouter from "./routes/userRoute.js";
import githubRouter from "./routes/githubRouter.js"

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

connectDb();

const port = process.env.PORT || 3000;

app.use('/api/user', userRouter);
app.use('/api/github',githubRouter)

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
