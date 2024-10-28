import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { addReviewService } from "../services/addReviewService";

const useStarRating = () => {
  const [rating, setRating] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const { id } = useParams();

  const queryClient = useQueryClient();

  const addReview = async (index: number) => {
    try {
      setIsPending(true);
      setError("");
      await addReviewService({ product_id: +id!, review: index });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return {
    rating,
    setRating,
    isPending,
    error,
    addReview,
  };
};

export default useStarRating;
