import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { ROLE_HOME } from "../utils/roleHome";

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RoleRoute = ({ children, allowedRoles }: Props) => {
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

  // Not logged in → go to login
  if (!accessToken) return <Navigate to="/login" replace />;

  const role = user?.role;

  // No role found → treat as unauthorized
  if (!role) return <Navigate to="/login" replace />;

  // If user role is allowed → allow
  if (allowedRoles.includes(role)) return <>{children}</>;

  // Logged in but unauthorized → redirect to user's home page
  return <Navigate to={ROLE_HOME[role]} replace />;
};

export default RoleRoute;




// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import type { RootState } from "../store";

// interface Props {
//   children: React.ReactNode;
//   allowedRoles: string[]; // e.g. ['manager','VP']
// }

// const RoleRoute = ({ children, allowedRoles }: Props) => {
//   const { accessToken, user } = useSelector((state: RootState) => state.auth);

//   // not logged in -> send to login
//   if (!accessToken) return <Navigate to="/login" replace />;

//   // user data missing, treat as unauthorized
//   const role = user?.role;
//   if (!role) return <Navigate to="/login" replace />;

//   // allowed?
//   if (allowedRoles.includes(role)) return <>{children}</>;

//   // logged in but not allowed -> send to 403 page or dashboard
//   return <Navigate to="/unauthorized" replace />;
// };

// export default RoleRoute;

