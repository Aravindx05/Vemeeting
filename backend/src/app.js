import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import { connectToSocket } from './controllers/socketManger.js';

import userRoutes from './routes/userRoutes.js';

const app=express();
const server=createServer(app);
const io=connectToSocket(server);

app.set("port",(process.env.Port||8000));
app.use(cors());


app.use(express.json({limit:'40kb'}));
app.use(express.urlencoded({ limit: "40kb", extended:true}));

app.use("/api/v1/users", userRoutes);

const start=async()=>{
    const connectionDb=await mongoose.connect("mongodb+srv://aravindreddy8900_db_user:LAySLMejceDXAqz4@cluster0.vz4x5ni.mongodb.net/");
    console.log(`Database connected to ${connectionDb.connection.host}`);
    server.listen(app.get("port"),()=>{
        console.log("server started at port 8000");
    });


}

start();