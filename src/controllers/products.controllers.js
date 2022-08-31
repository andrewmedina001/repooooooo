import { PrismaConnector } from "../prisma.js";
import { productRequestDTO } from "../dtos/products.dtos.js";

export const getProducts = async (req, res) => {
  try {
    const {id} = req.params;
    const result = await PrismaConnector.product.findMany({
      where: {categoryId: +id}
    });
    return res.json(result)
  } catch (error) {
    return res.status(400).json({
      message: 'Something went wrong while getting products',
      result: error.message
    })
  }
}

export const postProduct = async (req, res) => {
  try {
    const {id} = req.params; // A
    const data = productRequestDTO(req.body)
    console.log(id)
    data.categoryId=+id;//A
    console.log(data)
    
    const result = await PrismaConnector.product.create({data})
    return res.status(201).json({
      message:"Product created successfully",
      result,
    })
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong while creating product",
      result: error.message
    })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const {prodId,catId} = req.params;
    const data = productRequestDTO(req.body);
    data.categoryId=+catId;
    const result = await PrismaConnector.product.update({
      data,
      where: {
        prod_id: +prodId,
        }
    })
    return res.json({
      message: "Product updated successfully",
      result,
    })
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong while updating product",
      result: error.message
    })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const {prodId} = req.params
    const result = await PrismaConnector.product.delete({
      where: {
        prod_id: +prodId
      }
    })  
    return res.json({
      message: "Product deleted succesfully",
      result
    })
  } catch (error) {
    return res.status(401).json({
      message: "Something went wrong while deleting product",
      result: error.message
    })
  }
}

export const getProductById = async (req, res) => {
  try {
    const {prodId} = req.params
    const result = await PrismaConnector.product.findFirstOrThrow({
      where: {
        prod_id: +prodId
      }
    })
    return res.json(result)
  } catch (error) {
    return res.status(400).json({
      messag: "Something went wrong while getting product",
      result: error.message
    })
    
  }
}