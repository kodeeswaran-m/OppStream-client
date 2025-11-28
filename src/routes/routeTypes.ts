// routes/types.ts
import type { ReactElement } from "react";

export interface AppRoute {
  path: string;
  label?:string;
  element: ReactElement;
}

export type UserRole =
  | "employee"
  | "reporting manager"
  | "associate manager"
  | "VP"
  | "admin";

