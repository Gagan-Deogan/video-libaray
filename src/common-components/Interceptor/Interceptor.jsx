import axios from "axios";
import { useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthProvider";
import { useSnakbar } from "context/SnakbarProvider";

export const Interceptor = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const { snakbarDispatch } = useSnakbar();
  const errorInterceptor = useRef();

  const addErrorInterceptor = useCallback(() => {
    errorInterceptor.current = axios.interceptors.response.use(
      (res) => {
        if (res.status === 201) {
          snakbarDispatch({
            type: "SUCCESS",
            payload: res.data.message,
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
  }, [logoutUser, navigate, snakbarDispatch]);

  const removeErrorInterceptor = useCallback(() => {
    if (errorInterceptor.current) {
      axios.interceptors.request.eject(errorInterceptor);
      errorInterceptor.current = undefined;
    }
  }, [errorInterceptor]);

  useEffect(() => {
    addErrorInterceptor();
    return () => {
      removeErrorInterceptor();
    };
  }, [addErrorInterceptor, removeErrorInterceptor]);

  return <></>;
};
