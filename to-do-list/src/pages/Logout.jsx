import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function Logout() {
    const { setUser, setToken } = useStateContext();

    setUser(null);
    setToken(null);

    return <></>;
}

export default Logout;
