import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import AuthLayout from "../Layouts/AuthLayout";
import SignUp from "../Pages/SignUp";
import SignIn from "../Pages/SignIn";
import AddPlant from "../Pages/Dashboard/AddPlant";
import Loader from "../Components/Loader";
import PrivateRoutes from "./PrivateRoutes";
import AllPlants from "../Pages/Dashboard/AllPlants";
import PlantDetails from "../Pages/PlantDetails";
import Error from "../Pages/Error";
import MyPlants from "../Pages/MyPlants";
import UpdatePlant from "../Pages/UpdatePlant";
import PlantByCategory from "../Pages/PlantByCategory";
import Dashboard from "../Layouts/Dashboard";
import Profile from "../Pages/Dashboard/Profile";
import AboutUs from "../Pages/AboutUs";
import Contact from "../Pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    hydrateFallbackElement: <Loader></Loader>,
    children: [
      {
        index: true,
        path: "/",
        loader: () => fetch("https://root-rhythms-server.vercel.app/home"),
        Component: Home,
      },
      {
        path: "/allPlants",
        Component: AllPlants,
      },
      {
        path: "/aboutus",
        Component: AboutUs,
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
            `https://root-rhythms-server.vercel.app/category/${params.category}`
          ),
      },
      {
        path: "/plantDEtails/:id",
        loader: ({ params }) =>
          fetch(`https://root-rhythms-server.vercel.app/plant/${params.id}`),
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
      { index: true, path: "profile", Component: Profile },
      {
        path: "updatePlant/:id",
        loader: ({ params }) =>
          fetch(`https://root-rhythms-server.vercel.app/plant/${params.id}`),
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
        Component: AllPlants,
      },
      {
        path: "addPlant",
        loader: () => fetch("https://root-rhythms-server.vercel.app/home"),
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
