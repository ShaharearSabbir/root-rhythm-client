import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import AuthLayout from "../Layouts/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
    ],
  },{
    path: "/auth",
    Component: AuthLayout
  }
]);
