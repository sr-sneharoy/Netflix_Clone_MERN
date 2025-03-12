import dotenv from 'dotenv';
import express from 'express';
import databaseConnection from './utils/database.js';
import cookieParser from 'cookie-parser';
import userRoute from "./routes/userRoute.js";
import cors from "cors";

databaseConnection();


dotenv.config({
  path: './.env',
});
const port = process.env.PORT;


const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  
}
app.use(cors(corsOptions));


//creating API
app.use("/api/v1/user", userRoute);
//http://localhost:4000/api/v1/user/register
//http://localhost:4000/api/v1/user/login


app.listen(port, () => {
  console.log(`Application has started at ${port}`);
});


// to start => nodemon index.js