import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

const PORT = process.env.PORT || 6969;

app.listen(PORT,() => {
    connection();
    console.log(`Server URL :: http://localhost:${PORT}`);
})
