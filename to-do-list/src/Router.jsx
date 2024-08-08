import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import Task from "./pages/Task";
import Dashboard from "./pages/Dashboard";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import Home from "./pages/Home";

const Router = createBrowserRouter([
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
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/home",
                element: <Home />,
            },
        ],
    },
]);

export default Router;
