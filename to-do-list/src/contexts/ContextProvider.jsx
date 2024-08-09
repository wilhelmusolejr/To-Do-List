import { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    function setToken(token) {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    }

    function setUserAndStore(user) {
        setUser(user);
        if (user) {
            localStorage.setItem("USER_DATA", JSON.stringify(user));
        } else {
            localStorage.removeItem("USER_DATA");
        }
    }

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("USER_DATA"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                setUser: setUserAndStore,
                setToken,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
