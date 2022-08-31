import { PrismaConnector } from "../prisma.js";
import { categoryRequestDTO } from "../dtos/categories.dtos.js";

export const getCategories = async (req, res)=> {
  try {
    const categories = await PrismaConnector.category.findMany({
      include: {
        products: true,
      }
    });
    return res.json(categories)
  } catch (error) {
    return res.status(400).json({
      message: 'Something went wrong while getting categories',
      result: error.message
    })
  }
}

export const postCategory = async (req, res) => {
  try {
    const data = categoryRequestDTO(req.body)
    const result = await PrismaConnector.category.create({ data })
    return res.status(201).json({
      message: "Category created successfully",
      result
    })
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong while creating category",
      result: error.message
    })
  }
}

export const updateCategory = async (req, res) => {
  try {
    const {id} = req.params;
    const data = categoryRequestDTO(req.body);
    const result = await PrismaConnector.category.update({
      data,
      where: {cat_id: +id},
    })
    return res.json({
      message: "Category updated successfully",
      result
    })
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong while updating category",
      result: error.message
    })
  }
}

export const deleteCategory = async (req, res) => {
  try {
    const {id} = req.params;
    const result = await PrismaConnector.category.delete({
      where: {cat_id: +id}
    })
    return res.json({
      message: "Category deleted successfully",
      result:null,
    })
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong while deleting category",
      result: error.message
    })
  }
}

export const getCategoryById = async (req, res) => {
  try {
    const {id} = req.params;
    const result = await PrismaConnector.category.findFirstOrThrow({
      where: {cat_id: +id},
      include: {
        products: true
      }
    })
    return res.json(result)
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong while getting category",
      result: error.message,
    })
  }
}