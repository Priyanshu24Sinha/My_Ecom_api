import { Products } from "../Models/Product.js";
import cloudinary from "cloudinary"



// const cloudinaryResponse = await cloudinary.uploader.upload(imgSrc.tempFilePath);
// if(!cloudinaryResponse || cloudinaryResponse.error){
//     console.log("clloud error on upload");
// }

// add product

export const addProduct = async (req,res,next) =>{
    if(!req.files){
        return next(console.log("product img not found"));
    }
    const {imgSrc} = req.files;
    const allowedFormats = ["image/png","image/jpeg","image/webp"];
    const {title,description,price,category,qty} = req.body

    const cloudinaryResponse = await cloudinary.uploader.upload(imgSrc.tempFilePath);
    if(!cloudinaryResponse || cloudinaryResponse.error){
    console.log("clloud error on upload");
}

    try {
        let product = await Products.create({
          title,
          description,
          price,
          category,
          qty,
          imgSrc:cloudinaryResponse.secure_url,
        });
        res.json({message:'Product added successfully...!',product})
        
    } catch (error) {
        res.json(error.message)
    }
}

// get product

export const getProducts= async (req,res)=>{

let products=await Products.find().sort({createdAt:-1})

res.json({message:'All products',products})


}

// find product by id

export const getProductById= async (req,res)=>{

    const id=req.params.id;

    let product = await Products.findById(id)

    if(!product) return res.json({message:'Invalid id: No product available'})
    
    res.json({message:'Your requested product',product});
    
    
    }


// update product by id

export const updateProductById= async (req,res)=>{

    const id=req.params.id;

    let product = await Products.findByIdAndUpdate(id,req.body,{new:true})

    if(!product) return res.json({message:'Invalid id: No product available'})
    
    res.json({message:'Your product has been updated',product});
    
    
    }

// delete product by id 

export const deleteProductById= async (req,res)=>{

    const id=req.params.id;

    let product = await Products.findByIdAndDelete(id)

    if(!product) return res.json({message:'Invalid id: No product available'})
    
    res.json({message:'Your product has been deleted',product});
    
    
    }

