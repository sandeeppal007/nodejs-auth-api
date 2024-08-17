dotenv.config();
import cors from "cors"

import express from "express";
import dotenv from "dotenv";
import { connecDB } from "./db/connectdb.js";
import router from "./routes/auth.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";



const app = express();
const PORT =5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));


// middleware
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
 //allows us to parse incoming requests :req.body





app.listen(PORT, () => {
  connecDB(); // connecte to database
  console.log(`srver is listening on port ${PORT}`);
});
