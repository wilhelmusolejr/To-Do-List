import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import Task from "./pages/Task";
import Dashboard from "./pages/Dashboard";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/task/:id",
                element: <Task />,
            },
            {
                path: "/logout",
                element: <Logout />,
            },
        ],
    },
]);

export default Router;
