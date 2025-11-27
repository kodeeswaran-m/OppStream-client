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



// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import type { RootState } from "../store";

// interface Props {
//   children: React.ReactNode;
// }

// const PublicRoute = ({ children }: Props) => {
//   const { accessToken } = useSelector((state: RootState) => state.auth);

//   // If user is already logged in → redirect to dashboard
//   return accessToken ? <Navigate to="/dashboard" replace /> : children;
// };

// export default PublicRoute;
