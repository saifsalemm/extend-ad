import { getToken } from "../utils/getToken";
import { API_URL } from "./types";

export const addReviewService = async ({
  product_id,
  review,
}: {
  product_id: number;
  review: number;
}) => {
  try {
    const response = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify({ product_id, review }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Adding review failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const err = error as Error;
    throw new Error(`Adding review failed: ${err.message}`);
  }
};
