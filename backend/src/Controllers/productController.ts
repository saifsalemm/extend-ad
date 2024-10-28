import { Request, Response } from "express";
import { Like } from "typeorm";
import { Products } from "../Entities/productEntity.js";
import { RequestWithUser } from "../Utils/types.js";

export const getCategories = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await Products.query(
      "SELECT DISTINCT category FROM products"
    );

    let catsArr: string[] = [];

    categories.forEach((cat: { category: string }) => {
      catsArr.push(cat.category);
    });

    res.status(200).json(catsArr);
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
    const size = parseInt(req.query.size as string) || 6;
    const category = (req.query.category as string) || "";
    const searchTerm = (req.query.searchTerm as string) || "";
    const skip = (page - 1) * size;

    const filters: any = {};

    if (category && category !== "") {
      filters.category = category;
    }

    if (searchTerm && searchTerm !== "") {
      filters.name = Like(`%${searchTerm}%`);
    }

    const [products, totalItems] = await Products.findAndCount({
      where: filters,
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
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    const product = await Products.findOneBy({ id: +req.params.id });

    let productComments = [];

    const comments = (req.query.comments as string) || "0";

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    if (comments === "1") {
      productComments = await Products.query(
        `SELECT * FROM comments WHERE product_id = ${product.id}`
      );
    }

    let userReview = 0;

    if (req.user) {
      userReview = await Products.query(
        `SELECT review FROM reviews WHERE product_id = ${product.id} AND uid = ${req.user?.id}`
      );
    }

    const rating = await Products.query(
      `SELECT AVG(review) FROM reviews WHERE product_id = ${product.id}`
    )

    res.status(200).json({ product, productComments, userReview, rating });
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

    if (!name || !description || !price || !category) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const product = Products.create({
      name,
      description,
      price: +price,
      category,
      image:
        image === ""
          ? "https://eliteacademymedia.s3.us-east-1.amazonaws.com/eliteacademymedia/placeholder_img.jpg"
          : image,
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
