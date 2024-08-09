import { Link } from "react-router-dom";

function Login() {
    return (
        <>
            <div className="vh-100 d-flex align-items-center justify-content-center">
                <div className="bg-white login-container p-5 rounded">
                    <form>
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
                                aria-describedby="emailHelp"
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
                            />
                        </div>

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
