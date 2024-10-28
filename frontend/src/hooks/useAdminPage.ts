import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProductsService } from "../services/getProductsService";

const useAdminPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, error, isPending } = useQuery({
    queryKey: ["products", pageNumber],
    queryFn: () =>
      getProductsService({ pageNumber, size: 6, searchTerm: "", category: "" }),
    initialData: null,
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
    error,
    isPending,
    pageNumber,
    setPageNumber,
  };
};

export default useAdminPage;
