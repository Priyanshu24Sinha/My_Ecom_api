import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'express'
import userRouter from './Routes/user.js'
import productRouter from './Routes/product.js'
import cartRouter from './Routes/cart.js'
import addressRouter from './Routes/address.js'
import cors from 'cors'
import paymentRouter from './Routes/payment.js'



const app = express();

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






mongoose.connect("mongodb+srv://priyanshusinha1983:iamVYoyD5N3rWPsD@cluster0.04jncfr.mongodb.net/",{

dbName:"MERN_E_Commerce"

}).then(()=>console.log("Mongo db connected succesfully...!")).catch((err)=>console.log(err));



const port = 1000;

app.listen(port, ()=>console.log(`server is running on port ${port}`))