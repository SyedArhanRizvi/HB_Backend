import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./Routes/user.Routes.js";
import servicesRoutes from "./Routes/services.Routes.js";
import costumerRoutes from "./Routes/costumer.Routes.js";
import cookieParser from "cookie-parser"
import mongoose from "mongoose";
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("MongoDB has been sccessfully connected");
    app.listen(process.env.PORT, ()=>{
        console.log("server hosted ", process.env.PORT);
    })
})
.catch((err)=>{
    console.log("There are some errors in your mongodb connection plz fix the bug first ", err);
})

app.use("/sophisticate-decors/server/user-routes", userRoutes);
app.use("/sophisticate-decors/server/services-routes", servicesRoutes);
app.use("/sophisticate-decors/server/user-enquiry", costumerRoutes);