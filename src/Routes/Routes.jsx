import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Main/Home";
import AuthLayout from "../Layouts/AuthLayout";
import SignUp from "../Pages/Auth/SignUp";
import SignIn from "../Pages/Auth/SignIn";
import AddPlant from "../Pages/Dashboard/AddPlant";
import Loader from "../Components/Shared/Loader";
import PrivateRoutes from "./PrivateRoutes";
import AllPlants from "../Pages/Dashboard/AllPlants";
import PlantDetails from "../Pages/Shared/PlantDetails";
import Error from "../Pages/Shared/Error";
import MyPlants from "../Pages/Shared/MyPlants";
import UpdatePlant from "../Pages/Shared/UpdatePlant";
import Dashboard from "../Layouts/Dashboard";
import Contact from "../Pages/Main/Contact";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import WhyUs from "../Pages/Main/WhyUs";
import PlantByCategory from "../Pages/Main/PlantByCategory";
import AboutUs from "../Pages/Main/AboutUs";
import AllPlantsMain from "../Pages/Main/AllPlantsMain";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    hydrateFallbackElement: <Loader></Loader>,
    children: [
      {
        index: true,
        path: "/",
        loader: () => fetch(`${import.meta.env.VITE_BASE_SITE}/home`),
        Component: Home,
      },
      {
        path: "/allPlants",
        loader: () => fetch(`${import.meta.env.VITE_BASE_SITE}/plantCount`),
        Component: AllPlantsMain,
      },
      {
        path: "/aboutus",
        Component: AboutUs,
      },
      {
        path: "/whyus",
        Component: WhyUs,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/category/:category",
        Component: PlantByCategory,
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_BASE_SITE}/category/${params.category}`
          ),
      },
      {
        path: "/plantDEtails/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_BASE_SITE}/plant/${params.id}`),
        element: <PlantDetails />,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      { path: "signup", Component: SignUp },
      { path: "signin", Component: SignIn },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      { index: true, path: "overview", Component: DashboardHome },
      {
        path: "updatePlant/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_BASE_SITE}/plant/${params.id}`),
        element: (
          <PrivateRoutes>
            <UpdatePlant></UpdatePlant>
          </PrivateRoutes>
        ),
      },
      {
        path: "myPlants",
        element: (
          <PrivateRoutes>
            <MyPlants></MyPlants>
          </PrivateRoutes>
        ),
      },
      {
        path: "allPlants",
        loader: () => fetch(`${import.meta.env.VITE_BASE_SITE}/plantCount`),
        Component: AllPlants,
      },
      {
        path: "addPlant",
        loader: () => fetch(`${import.meta.env.VITE_BASE_SITE}/categories`),
        element: (
          <PrivateRoutes>
            <AddPlant></AddPlant>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: Error,
  },
]);
