import { getServerURL, setLoginData } from "../storage/login.ts";

export const login = async (username: string, password: string) => {
  fetch((await getServerURL()) + "auth/user/login/", {
    method: "POST",
    headers: {
      // Authorization: `Bearer ${get}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("login failed");
    })
    .then(respJson => {
      const data = respJson;
      console.log(data);
      const token = data.token;
      setLoginData({ email: undefined, name: username, token }).then(() => {
        console.log("login success");
      });
      return data;
    })
    .catch(e => {
      throw new Error("login failed");
    });
};
