import { PrismaConnector } from "../prisma.js";
import { cartRequestDTO } from "../dtos/carts.dtos.js";

export const postItem = async (req, res) => {
  try {
    const data = cartRequestDTO(req.body);
    const { user }  = req;
    const cart = await PrismaConnector.cart.findFirst({
      where: {userId: +user.id},
      include: {
        cartItems: true
      }
    })
    if (cart) {
      const cartItem = await PrismaConnector.cartItem.create({data: {...data, cartId: cart.id}})
      return res.status(201).json({
        message: "Item added successfully",
        content: cartItem,
      });
    } else {
      const newCart = await PrismaConnector.cart.create({ 
        data: { userId: user.id }
      })
      console.log(newCart)
      const cartItem = await PrismaConnector.cartItem.create({data: {...data, cartId: newCart.id}})
      return res.status(201).json({
        message: "Item added successfully",
        content: cartItem,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      result: null,
    });
  }
};

export const getItems = async (req, res) => {
  try {
    const { user } = req;
    const cartItems = await PrismaConnector.cartItem.findMany({
      where: {cartId: user.cartId},
    })
    return res.json(cartItems);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      result: null,
    });
  }
};

export const updateItem = async (req, res) => {
  try {
    const data = cartRequestDTO(req.body);

    const { user }  = req;
    const {itemId} = req.params

    const cart = await PrismaConnector.cart.findFirstOrThrow({
      where: {userId: +user.id},
      include: {
        cartItems: true
      }
    })

    const cartItem = await PrismaConnector.cartItem.update({
      data: {...data, cartId: cart.id},
      where: {
        id: +itemId,
        }
    })
    return res.json({
        message: "Item updated successfully",
        content: cartItem,
      });

  } catch (error) {
    return res.status(400).json({
      message: error.message,
      result: null,
    });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const {itemId} = req.params
    
    const result = await PrismaConnector.cartItem.delete({
      where: {
        id: +itemId
      }
    })  
    return res.json({
      message: "Item deleted succesfully",
      result
    })
    
  } catch (error) {
    return res.status(401).json({
      message: "Something went wrong while deleting item",
      result: error.message
    })
  }
}