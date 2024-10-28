import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productCreationService } from "../services/productCreationService";
import { ProductData } from "../services/types";

const useCreateProduct = () => {
  const [data, setData] = useState<ProductData>({
    id: 0,
    name: "",
    price: 0,
    description: "",
    category: "",
    creation_date: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const createProduct = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsPending(true);
      setError("");

      const createdProduct = await productCreationService({
        name: data.name,
        price: data.price,
        description: data.description,
        category: data.category,
        image: data.image ?? "",
      });

      navigate(`/admin/products/${createdProduct.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return {
    createProduct,
    error,
    isPending,
    data,
    setData,
  };
};

export default useCreateProduct;
