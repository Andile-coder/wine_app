
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login.tsx";
import AddWine from "./pages/addWine/AddWine.tsx";
import EditWine from "./pages/editWine/EditWine.tsx";
import Register from "./pages/register/Register.tsx";
import WineList from "./pages/wineList/WineList.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    loader: () => import("./pages/login/Login.tsx"),
  },
  {
    path: "/create",
    element: <AddWine />,
    loader: () => import("./pages/addWine/AddWine.tsx"),
  },
  {
    path: "/edit/:wineId",
    element: <EditWine />,
    loader: () => import("./pages/editWine/EditWine.tsx"),
  },
  {
    path: "/register",
    element: <Register />,
    loader: () => import("./pages/register/Register.tsx"),
  },
  {
    path: "/dashboard",
    element: <WineList />,
    loader: () => import("./pages/wineList/WineList.tsx"),
  },

]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
