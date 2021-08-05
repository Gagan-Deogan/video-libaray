import axios from "axios";
import { useQuery } from "react-query";

export const useRequest = (endpoint) => {
  return useQuery(endpoint, () =>
    axios
      .get(`https://utopian-splicer-314615.el.r.appspot.com/${endpoint}`)
      .then((res) => res.data.data)
  );
};
