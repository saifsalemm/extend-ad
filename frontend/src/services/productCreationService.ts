import { getToken } from "../utils/getToken";
import { API_URL } from "./types";

export const productCreationService = async ({
  name,
  price,
  description,
  category,
  image,
}: {
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify({
        name,
        price,
        description,
        category,
        image,
      }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to create product");
    }
    return await response.json();
  } catch (error) {
    const err = error as Error;
    throw new Error(`Failed to create product: ${err.message}`);
  }
};
