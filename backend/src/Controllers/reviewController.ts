import { Response } from "express";
import { Reviews } from "../Entities/reviewEntity.js";
import { RequestWithUser } from "../Utils/types.js";

export const createReview = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    const { product_id, review } = req.body;

    if (!product_id || !review) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    let newReview;

    const reviewExists = await Reviews.findOneBy({
      uid: req.user?.id!,
      product_id,
    });

    if (reviewExists) {
      newReview = reviewExists;
      Reviews.save({
        ...reviewExists,
        review,
      });
    } else {
      newReview = new Reviews();
      newReview.product_id = product_id;
      newReview.uid = req.user?.id!;
      newReview.review = review;
      await newReview.save();
    }

    res.status(201).json({
      message: "Review added successfully",
      review: newReview,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  } finally {
    return;
  }
};
