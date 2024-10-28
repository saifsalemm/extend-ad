import { API_URL } from "./types";

export const getCurrentUserDataService = async () => {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to get user data");
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    const err = error as Error;
    throw new Error(`Failed to get user data: ${err.message}`);
  }
};
