import { API_URL } from "./types";

export const userLoginService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Login failed");
    }

    const userData = await response.json();

    return userData;
  } catch (error) {
    const err = error as Error;
    throw new Error(`Login failed: ${err.message}`);
  }
};
