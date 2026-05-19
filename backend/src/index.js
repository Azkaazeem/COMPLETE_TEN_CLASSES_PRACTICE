import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import dns from 'dns';

// 1. Import both routes here (uncomment authroute if needed)
// import authroute from "./routes/Blog.js";
import blogroute from "./routes/BlogRoute.js"; 

dns.setServers(['8.8.8.8', '1.1.1.1'])
dotenv.config();
const app = express();

connectDb();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://blog-app-with-backend-odxc.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Successfully running!" });
});

// 2. Register your API endpoints here
// app.use('/api/v1/auth', authroute);
app.use('/api/v1/blog', blogroute); // This is required for image uploads

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;