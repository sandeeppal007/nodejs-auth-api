dotenv.config();
import express from "express";
import dotenv from "dotenv";
import { connecDB } from "./db/connectdb.js";
import router from "./routes/auth.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use("/api/auth", authRoutes);
 //allows us to parse incoming requests :req.body





app.listen(PORT, () => {
  connecDB(); // connecte to database
  console.log(`srver is listening on port ${PORT}`);
});
