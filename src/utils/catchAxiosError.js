import axios from "axios";

export const catchAxiosErr = (err) => {
  if (axios.isAxiosError(err)) {
    const serverError = err;
    if (serverError && serverError.response) {
      return { error: serverError.response.data.error };
    }
  }
  return { error: "something went wrong!" };
};
