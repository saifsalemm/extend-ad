import { API_URL } from "./types";

export const addCommentService = async ({
  product_id,
  name,
  email,
  text,
}: {
  product_id: number;
  name: string;
  email: string;
  text: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id, name, email, text }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Adding comment failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const err = error as Error;
    throw new Error(`Adding comment failed: ${err.message}`);
  }
};
