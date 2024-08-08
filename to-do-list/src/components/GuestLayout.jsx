import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function GuestLayout() {
    const { token } = useStateContext();

    if (token) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <>
            {/* <h1>Guest</h1> */}
            <Outlet />
        </>
    );
}

export default GuestLayout;
