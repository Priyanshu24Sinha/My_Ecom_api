import { Cart } from "../Models/Cart.js";


// Add to cart

export const addToCart = async (req,res)=>{

const {productId,title,price,qty,imgSrc}= req.body

const userId = req.user;

let cart = await Cart.findOne({userId});

if(!cart){
    cart = new Cart({userId,items:[]});
}

const itemIndex = cart.items.findIndex((item)=>item.productId.toString() === productId);

if(itemIndex>-1){
  cart.items[itemIndex].qty+=qty;
  cart.items[itemIndex].price+=price*qty;
}
else{
cart.items.push({productId,title,price,qty,imgSrc});
}
await cart.save();

res.json({message:'Items added to cart',cart})


};


// Get user cart

export const userCart = async (req,res)=>{

  const userId = req.user

  let cart = await Cart.findOne({userId});

  if(!cart) return res.json({message:'can not found'})

    res.json({message:"user cart",cart})


}

// remove product from cart

export const removeProductFromCart = async (req,res)=>{

  const productId = req.params.productId;

  const userId = req.user;

  let cart = await Cart.findOne({userId});

  if(!cart) return res.json({message:'can not found'})

    cart.items = cart.items.filter((item)=>item.productId.toString() !== productId)

    await cart.save();

    res.json({message:"product removed from cart"})

}


// Delete cart

export const clearCart = async (req,res)=>{

  const userId = req.user;

  let cart = await Cart.findOne({userId});

  if(!cart) {
    cart =  new Cart({items:[]})
  }
  else{
  cart.items=[];
  }

    await cart.save();

    res.json({message:"cart cleared"})

}

// Decrease product qty in cart

export const decreaseProductqty = async (req,res)=>{

  const {productId,qty}= req.body
  
  const userId = req.user;
  
  let cart = await Cart.findOne({userId});
  
  if(!cart){
      cart = new Cart({userId,items:[]})
  }
  
  const itemIndex = cart.items.findIndex((item)=>item.productId.toString() === productId)
  
  if(itemIndex>-1){

    const item = cart.items[itemIndex]

    if(item.qty>qty){
      const pricePerUnit = item.price/item.qty

      item.qty-=qty;
      item.price-=pricePerUnit*qty
    }
    else{
      cart.items.splice(itemIndex,1)
    }
  }
  else{
    return res.json({message:'Invalid product id'})
  }
  await cart.save();
  
  res.json({message:'Item quantity decreased',cart})
  
  
  };
