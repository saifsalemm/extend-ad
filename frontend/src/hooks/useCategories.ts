import { useQuery } from "@tanstack/react-query";
import { getCategoriesService } from "../services/getCategoriesService";

const useCategories = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesService(),
  });

  return {
    categories: data,
    error,
    isPending,
  };
};

export default useCategories;
