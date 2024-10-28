import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProductsService } from "../services/getProductsService";

const useCatalogue = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const { data, error, isPending } = useQuery({
    queryKey: ["products", pageNumber, searchTerm, category],
    queryFn: () =>
      getProductsService({ pageNumber, size: 6, searchTerm, category }),
  });

  const products = data?.products?.map((product) => {
    return {
      ...product,
      description:
        product.description.length < 50
          ? product.description
          : product.description.slice(0, 50) + "...",
    };
  });

  return {
    ...data,
    products,
    pageNumber,
    error,
    isPending,
    setSearchTerm,
    setCategory,
    setPageNumber,
  };
};

export default useCatalogue;
