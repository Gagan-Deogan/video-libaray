import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "common-components/Loader";
import { setupAxiosDefaultHeaders } from "utils";
import { getUserDetails } from "./auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage?.getItem("token") || null);
  const [loading, setLoading] = useState(token ? true : false);

  setupAxiosDefaultHeaders(token);

  const logoutUser = useCallback(() => {
    localStorage?.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/login");
  }, [navigate]);

  const loginUser = ({ user, token }) => {
    if (user && token) {
      setUser(user);
      setToken(token);
      localStorage.setItem("token", token);
      navigate("/");
    }
  };

  useEffect(() => {
    (async () => {
      if (token) {
        const res = await getUserDetails();
        setLoading(false);
        if ("data" in res) {
          setUser(res.data);
        } else {
          logoutUser();
        }
      }
    })();
  }, [logoutUser, token]);

  if (loading) {
    return <Loader />;
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        logoutUser,
        loginUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
