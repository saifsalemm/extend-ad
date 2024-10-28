import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { addCommentService } from "../services/addCommentService";
import { getProductService } from "../services/getProductService";
import { CommentI } from "../services/types";

const useProduct = () => {
  const { id } = useParams();

  const [comment, setComment] = useState<CommentI>({
    id: 0,
    name: "",
    email: "",
    text: "",
  });
  const [commentPending, setCommentPending] = useState(false);
  const [commentError, setCommentError] = useState("");

  const queryClient = useQueryClient();

  const { data, error, isPending } = useQuery({
    queryKey: ["product", id],
    queryFn: () =>
      getProductService({
        id: id!,
        comments: true,
      }),
    initialData: null,
  });

  const addComment = async () => {
    try {
      setCommentPending(true);
      await addCommentService({
        product_id: +id!,
        name: comment.name,
        email: comment.email,
        text: comment.text,
      });
      setComment({ id: 0, name: "", email: "", text: "" });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    } catch (error) {
      const err = error as Error;
      setCommentError(err.message);
    } finally {
      setCommentPending(false);
    }
  };

  return {
    data,
    error,
    isPending,
    comment,
    commentPending,
    commentError,
    setComment,
    addComment,
  };
};

export default useProduct;
