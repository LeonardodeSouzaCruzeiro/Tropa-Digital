import { Navigate } from "react-router-dom";

const AuthRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default AuthRoute;
