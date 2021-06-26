import axios from "axios";
import { catchAxiosErr } from "utils";
export const handleLogin = async ({ email, password }) => {
  try {
    const res = await axios.post("/users/login", {
      email,
      password,
    });
    return res.data;
  } catch (err) {
    return catchAxiosErr(err);
  }
};
