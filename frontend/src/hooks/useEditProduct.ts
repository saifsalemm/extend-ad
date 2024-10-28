import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesEnum } from "../App";
import { getProductService } from "../services/getProductService";
import { productDeleteService } from "../services/productDeleteService";
import { productEditService } from "../services/productEditService";
import { ProductData } from "../services/types";

const useEditProduct = () => {
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
  const [isPending, setIsPending] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const getProduct = async () => {
    try {
      const fetchData = await getProductService({ id: id!, comments: false });
      setData({
        ...fetchData.product,
        creation_date: new Date(
          fetchData.product.creation_date
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const editProduct = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsPending(true);
      setError("");

      await productEditService({
        id: data.id,
        name: data.name,
        price: data.price,
        description: data.description,
        category: data.category,
        image: data.image ?? "",
      });

      navigate(RoutesEnum.CATALOGUE);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  const deleteProduct = async () => {
    try {
      await productDeleteService(id!);
      navigate(RoutesEnum.CATALOGUE);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    editProduct,
    deleteProduct,
    error,
    isPending,
    data,
    setData,
  };
};

export default useEditProduct;
