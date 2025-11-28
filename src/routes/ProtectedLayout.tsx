import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

interface Props {
  allowedRoles: string[];
}

const ProtectedLayout = ({ allowedRoles }: Props) => {
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

  if (!accessToken) return <Navigate to="/login" replace />;

  const role = user?.role;
  if (!role || !allowedRoles.includes(role))
    return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
};

export default ProtectedLayout;

