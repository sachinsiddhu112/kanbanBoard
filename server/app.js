import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'


import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cors({
    origin:"*",
    allowedHeaders:['Content-Type','auth-token']
}))

app.use('/tasks',taskRoutes);
app.use('/auth',userRoutes);
//mongodb connection.
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("database connected");
}).catch(err => {
    console.log(err);
});




app.listen(process.env.PORT,() =>{
    console.log(`server is running on port:${process.env.PORT}`)
})