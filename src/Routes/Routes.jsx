import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import AuthLayout from "../Layouts/AuthLayout";
import SignUp from "../Pages/SignUp";
import SignIn from "../Pages/SignIn";
import AddPlant from "../Pages/AddPlant";
import Loader from "../Components/Loader";
import PrivateRoutes from "./PrivateRoutes";
import AllPlants from "../Pages/AllPlants";
import PlantDetails from "../Pages/PlantDetails";
import Error from "../Pages/Error";
import MyPlants from "../Pages/MyPlants";
import UpdatePlant from "../Pages/UpdatePlant";
import PlantByCategory from "../Pages/PlantByCategory";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    hydrateFallbackElement: <Loader></Loader>,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/allPlants",
        loader: () => fetch("http://localhost:5000/plants"),
        Component: AllPlants,
      },
      {
        path: "/category/:category",
        Component: PlantByCategory,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/category/${params.category}`),
      },
      {
        path: "/addPlant",
        loader: () => fetch("http://localhost:5000/categories"),
        element: (
          <PrivateRoutes>
            <AddPlant></AddPlant>
          </PrivateRoutes>
        ),
      },
      {
        path: "/plantDEtails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/plant/${params.id}`),
        element: (
          <PrivateRoutes>
            <PlantDetails></PlantDetails>
          </PrivateRoutes>
        ),
      },
      {
        path: "/updatePlant/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/plant/${params.id}`),
        element: (
          <PrivateRoutes>
            <UpdatePlant></UpdatePlant>
          </PrivateRoutes>
        ),
      },
      {
        path: "/myPlants",
        element: (
          <PrivateRoutes>
            <MyPlants></MyPlants>
          </PrivateRoutes>
        ),
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
    path: "*",
    Component: Error,
  },
]);
