import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { ROLE_HOME } from "../utils/roleHome";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

  if (!accessToken) return children;

  const role = user?.role;
  if (!role) return children;

  // Send logged-in user to their own page
  return <Navigate to={ROLE_HOME[role]} replace />;
};

export default PublicRoute;

