import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function Login() {
    useEffect(() => {
        document.title = "Login";
    }, []);

    const { setUser, setToken } = useStateContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axiosClient
            .post("/login", {
                email,
                password,
            })
            .then((data) => {
                if (data.status === 200) {
                    setUser(data.data.user);
                    setToken(data.data.token);
                }
            })
            .catch((err) => {
                setError(err.response.data.message);
            });
    };

    return (
        <>
            <div className="vh-100 d-flex align-items-center justify-content-center">
                <div className="bg-white login-container p-5 rounded">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputPassword1"
                                className="form-label"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>

                        {error && <p className="text-danger mb-3">{error}</p>}

                        <button type="submit" className="btn btn-primary w-100">
                            Login
                        </button>
                    </form>

                    <p className="text-center mt-4">
                        Not a member?
                        <Link to="/register" className="ms-1">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;
