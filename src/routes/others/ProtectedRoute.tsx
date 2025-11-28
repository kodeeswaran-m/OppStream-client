import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { accessToken } = useSelector((state: RootState) => state.auth);

  return accessToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
