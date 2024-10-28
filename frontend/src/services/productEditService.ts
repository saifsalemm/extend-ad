import { getToken } from "../utils/getToken";
import { API_URL } from "./types";

export const productEditService = async ({
  id,
  name,
  price,
  description,
  category,
  image,
}: {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify({
        id,
        name,
        price,
        description,
        category,
        image,
      }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to edit user");
    }
    return await response.json();
  } catch (error) {
    const err = error as Error;
    throw new Error(`Failed to edit user: ${err.message}`);
  }
};
