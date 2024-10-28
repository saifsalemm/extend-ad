import { Request, Response } from "express";
import { Comments } from "../Entities/commentsEntity.js";

export const createComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { product_id, name, email, text } = req.body;

    if (!product_id || !name || !email || !text) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const comment = new Comments();
    comment.product_id = product_id;
    comment.name = name;
    comment.email = email;
    comment.text = text;

    await comment.save();

    res.status(201).json({
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  } finally {
    return;
  }
};
