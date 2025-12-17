import { matchPath } from "react-router-dom";
import type { AppRoute } from "../routes/routeTypes";

export interface BreadcrumbItem {
  label: string;
  path: string;
}

/* 🔁 Recursive parent resolver */
const resolveParents = (
  route: AppRoute,
  routes: AppRoute[],
  acc: BreadcrumbItem[]
) => {
  if (!route.parentPath) return;

  const parent = routes.find((r) => r.path === route.parentPath);
  if (!parent || !parent.breadcrumb) return;

  // Resolve parent's parent first (TOP → BOTTOM order)
  resolveParents(parent, routes, acc);

  acc.push({
    label: parent.breadcrumb,
    path: parent.path,
  });
};

export const getBreadcrumbs = (
  pathname: string,
  routes: AppRoute[]
): BreadcrumbItem[] => {
  const crumbs: BreadcrumbItem[] = [];

  const currentRoute = routes.find((route) =>
    matchPath({ path: route.path, end: false }, pathname)
  );

  if (!currentRoute || !currentRoute.breadcrumb) return [];

  // 🔗 Resolve ALL parents recursively
  resolveParents(currentRoute, routes, crumbs);

  // ➕ Add current route
  crumbs.push({
    label: currentRoute.breadcrumb,
    path: pathname,
  });

  return crumbs;
};




// import { matchPath } from "react-router-dom";
// import type { AppRoute } from "../routes/routeTypes";

// /* ✅ ADD THIS */
// export interface BreadcrumbItem {
//   label: string;
//   path: string;
// }

// export const getBreadcrumbs = (
//   pathname: string,
//   routes: AppRoute[]
// ): BreadcrumbItem[] => {
//   const crumbs: BreadcrumbItem[] = [];

//   const currentRoute = routes.find((route) =>
//     matchPath({ path: route.path, end: false }, pathname)
//   );

//   if (!currentRoute || !currentRoute.breadcrumb) return [];

//   // parent breadcrumb
//   if (currentRoute.parentPath) {
//     const parentRoute = routes.find(
//       (r) => r.path === currentRoute.parentPath
//     );

//     if (parentRoute?.breadcrumb) {
//       crumbs.push({
//         label: parentRoute.breadcrumb,
//         path: parentRoute.path,
//       });
//     }
//   }

//   // current breadcrumb
//   crumbs.push({
//     label: currentRoute.breadcrumb,
//     path: pathname,
//   });

//   return crumbs;
// };
