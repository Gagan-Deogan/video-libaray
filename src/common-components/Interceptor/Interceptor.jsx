import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthProvider";
import { useSnakbar } from "context/SnakbarProvider";

export const Interceptor = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const { snakbarDispatch } = useSnakbar();
  const [errorInterceptor, setErrorInterceptor] = useState();

  const addErrorInterceptor = useCallback(() => {
    console.log("hello from add");
    const errorInterceptor = axios.interceptors.response.use(
      (res) => {
        if (res.status === 201) {
          snakbarDispatch({
            type: "SHOW_SNAKBAR",
            payload: {
              type: "SUCCESS",
              message: res.data.data,
            },
          });
        }
        return res;
      },
      (error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 403) {
            logoutUser();
            navigate("/login");
            return Promise.reject(error);
          }
          if (status === 422) {
            return Promise.reject(error);
          }
          snakbarDispatch({
            type: "SHOW_SNAKBAR",
            payload: {
              type: "ERROR",
              message: "Something went wrong",
            },
          });
        }
        return Promise.reject(error);
      }
    );
    setErrorInterceptor(errorInterceptor);
  }, [logoutUser, navigate, snakbarDispatch]);

  const removeErrorInterceptor = useCallback(() => {
    console.log("hello from remove");
    if (errorInterceptor) {
      axios.interceptors.request.eject(errorInterceptor);
      setErrorInterceptor(undefined);
    }
  }, [errorInterceptor]);

  useEffect(() => {
    addErrorInterceptor();
    return () => {
      removeErrorInterceptor();
    };
  }, []);

  return <></>;
};
