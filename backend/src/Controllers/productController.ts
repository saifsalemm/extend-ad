import { Request, Response } from "express";
import { Products } from "../Entities/productEntity.js"; // Adjust based on where your Product entity is located

export const getCategories = async (
  res: Response
): Promise<void> => {
  try {
    const categories = await Products.query(
      `SELECT DISTINCT category FROM products`
    );

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 9;

    const skip = (page - 1) * size;

    const [products, totalItems] = await Products.findAndCount({
      skip,
      take: size,
    });

    const totalPages = Math.ceil(totalItems / size);

    res.status(200).json({
      products,
      totalItems,
      totalPages,
      currentPage: page,
      pageSize: size,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Products.findOneBy({ id: +req.params.id });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, price, category, image } = req.body;

    const product = Products.create({
      name,
      description,
      price,
      category,
      image,
    });

    await Products.save(product);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Products.findOneBy({ id: +req.params.id });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const updatedProduct = await Products.save({
      ...product,
      ...req.body,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await Products.delete(req.params.id);

    if (result.affected === 0) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
