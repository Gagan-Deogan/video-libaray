import axios from "axios";

export const signUp = async ({ email, fullname, password }) => {
  try {
    const res = await axios.post("/users/signup", {
      email,
      fullname,
      password,
    });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverError = err;
      if (serverError && serverError.response) {
        return { error: serverError.response.data.error };
      }
    }
    return { error: "something went wrong!" };
  }
};
