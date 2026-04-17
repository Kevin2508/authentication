import express from 'express';
import type { Application, Request, Response } from 'express';
import authRoutes from './routes/authRoute';
import userRoutes from './routes/userRoute';
// import dotenv from 'dotenv/config.js';
// import path from 'path';

const app : Application = express();
const port : number | string = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/auth", authRoutes)
app.use("/api/test", userRoutes);

app.get('/',(req : Request,res : Response)=>{
    res.send('Hello')
})

// Routes

app.listen(port, ()=>{
    console.log(`Server running on port http://localhost:${port}`);
});
