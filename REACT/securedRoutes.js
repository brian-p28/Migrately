import { lazy } from "react";
const PageNotFound = lazy(() => import("../components/error/Error404"));
const UsersTable = lazy(() => import("../components/admin/UsersTable"));

const AdminRoute = [
  {
    path: "/admin/users",
    name: "List of Users",
    exact: true,
    element: UsersTable,
    roles: ["Admin"],
    isAnonymous: false,
  },
];

const errorRoutes = [
  {
    path: "*",
    name: "Error - 404",
    element: PageNotFound,
    roles: [],
    exact: true,
    isAnonymous: false,
  },
];

const allRoutes = [...errorRoutes, ...AdminRoute];

export default allRoutes;
