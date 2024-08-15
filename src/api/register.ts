import { getServerURL } from "../storage/login.ts";

export const register = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    const response = await fetch(
      (await getServerURL()) + "auth/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      },
    );
    console.log("register status: " + response.status);
    if (!response.ok) {
      console.log("register failed");
      throw new Error("register failed");
    }
    return response;
  } catch (e) {
    console.log(e);
    throw new Error("register failed");
  }
};
