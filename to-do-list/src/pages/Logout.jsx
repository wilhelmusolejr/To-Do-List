import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function Logout() {
    const { setUser, setToken } = useStateContext();

    setUser(null);
    setToken(null);

    window.location = "/login";

    return <></>;
}

export default Logout;
