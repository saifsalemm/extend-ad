import { API_URL, ProductResI } from "./types";

export const getProductService = async ({
  id,
  comments,
}: {
  id: string | number;
  comments?: boolean;
}) => {
  try {
    const response = await fetch(
      `${API_URL}/products/${id}?comments=${comments ? "1" : "0"}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await response.json();
    return data as ProductResI;
  } catch (error) {
    const err = error as Error;
    throw new Error(`Failed to fetch product: ${err.message}`);
  }
};
