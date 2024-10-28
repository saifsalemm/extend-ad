import { API_URL } from "./types";

export const userRegisterService = async ({
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      throw new Error(data.message || "Registration failed");
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    const err = error as Error;
    throw new Error(`Registration failed: ${err.message}`);
  }
};
