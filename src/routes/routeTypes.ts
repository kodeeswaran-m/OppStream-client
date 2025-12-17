// routes/types.ts
import type { ReactElement, ReactNode } from "react";

export interface AppRoute {
  path: string;
  label?:string;
  element: ReactElement;
   icon?: ReactNode;
   breadcrumb?:string;
     parentPath?: string;

}

export type UserRole =
  | "employee"
  | "reporting manager"
  | "associate manager"
  | "VP"
  | "admin";

