import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'express'
import userRouter from './Routes/user.js'
import productRouter from './Routes/product.js'
import cartRouter from './Routes/cart.js'
import addressRouter from './Routes/address.js'
import cors from 'cors'
import paymentRouter from './Routes/payment.js'

import fileUpload from "express-fileupload"
import cloudinary from "cloudinary"
import dotenv from "dotenv"

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

dotenv.config()

const app = express();
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}));

app.use(bodyParser.json())

app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

// for testing

app.get('/', (req,res)=>res.json({
    message:'This is home route'
}))

//user route

app.use('/api/user',userRouter)

// product router

app.use('/api/product',productRouter)


// Cart Router

app.use('/api/cart',cartRouter)


// ADDRESS route

app.use('/api/address',addressRouter)


// Payment route

app.use('/api/payment',paymentRouter)


// process.env.MONGO_URI



mongoose.connect(process.env.MONGO_URI,{

dbName:"MERN_E_Commerce"

}).then(()=>console.log("Mongo db connected succesfully...!")).catch((err)=>console.log(err));



const port = 1000;

app.listen(port, ()=>console.log(`server is running on port ${port}`))