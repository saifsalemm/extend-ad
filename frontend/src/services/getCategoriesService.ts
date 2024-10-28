import { API_URL } from "./types";

export const getCategoriesService = async () => {
  try {
    const response = await fetch(`${API_URL}/products/categories`);
    const data = await response.json();
    return data as string[];
  } catch (error) {
    const err = error as Error;
    throw new Error(`Failed to fetch categories: ${err.message}`);
  }
};
