export type RouteRole = "employee"|"manager" | "associate" | "vp"|"admin";

export const getRouteRole = (role?: string): RouteRole => {
  
    if (role==="employee") return "employee";
  if (role === "reporting manager") return "manager";
  if (role === "associate manager") return "associate";
  if (role === "VP") return "vp";
  return "admin";
};
