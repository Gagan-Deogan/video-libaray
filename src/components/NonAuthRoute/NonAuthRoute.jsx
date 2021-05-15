import { Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
export const NonAuthRoute = ({ path, ...props }) => {
  const { user } = useAuthContext();
  return user ? <Navigate replace to="/" /> : <Route path={path} {...props} />;
};
