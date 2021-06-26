import { Route, Navigate } from "react-router-dom";
import { useAuth } from "context/AuthProvider";
export const NonAuthRoute = ({ path, ...props }) => {
  const { user } = useAuth();
  return user ? <Navigate replace to="/" /> : <Route path={path} {...props} />;
};
