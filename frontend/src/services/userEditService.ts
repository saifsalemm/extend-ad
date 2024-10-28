import { getToken } from "../utils/getToken";
import { API_URL } from "./types";

export const userEditService = async ({
  first_name,
  last_name,
  email,
  password,
  role,
}: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        role,
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
