import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function Register() {
    const { setUser, setToken } = useStateContext();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        axiosClient
            .post("/register", {
                name,
                email,
                password,
                password_confirmation: passwordConfirm,
            })
            .then(({ data }) => {
                console.log(data);

                setUser(data.user);
                setToken(data.token);

                // <Navigate to="/dashboard" />
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    return (
        <>
            <div className="vh-100 d-flex align-items-center justify-content-center">
                <div className="bg-white login-container p-5 rounded">
                    <form onSubmit={handleSubmit}>
                        {/* name */}
                        <div className="mb-3">
                            <label htmlFor="form_name" className="form-label">
                                Full name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="form_name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* email */}
                        <div className="mb-3">
                            <label htmlFor="form_email" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="form_email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                            <label
                                htmlFor="form_password"
                                className="form-label"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="form_password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-3">
                            <label
                                htmlFor="form_password_confirm"
                                className="form-label"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="form_password_confirm"
                                value={passwordConfirm}
                                onChange={(e) =>
                                    setPasswordConfirm(e.target.value)
                                }
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            Sign up
                        </button>
                    </form>

                    <p className="text-center mt-4">
                        Already a member?
                        <Link to="/login" className="ms-1">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Register;
