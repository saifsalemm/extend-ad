import { getToken } from "../utils/getToken";
import { API_URL } from "./types";

export const productDeleteService = async (id: string) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
  });
  return response;
};
