import { API_URL, ProductData } from "./types";

export interface ProductsResponse {
  products: ProductData[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export const getProductsService = async ({
  pageNumber,
  size = 6,
  searchTerm,
  category,
}: {
  pageNumber: number;
  size?: number;
  searchTerm: string;
  category: string;
}) => {
  try {
    const response = await fetch(
      `${API_URL}/products?page=${pageNumber}&size=${size}${
        searchTerm ? `&searchTerm=${searchTerm}` : ""
      }${category ? `&category=${category}` : ""}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data as ProductsResponse;
  } catch (error) {
    const err = error as Error;
    throw new Error(`Failed to fetch products: ${err.message}`);
  }
};
