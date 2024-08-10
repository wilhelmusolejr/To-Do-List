import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faUser } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Navigator() {
    return (
        <>
            <nav className="navigator border shadow-sm">
                <div className="container py-4 d-flex justify-content-between align-items-center">
                    <div className="">
                        <Link to="/dashboard" className="text-dark logo fs-1 ">
                            Todo List
                        </Link>
                    </div>
                    <div className="d-flex gap-5">
                        <FontAwesomeIcon
                            icon={faMoon}
                            className="cursor-pointer"
                        />
                        <Link
                            to="/logout"
                            className="d-flex text-dark gap-2 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />{" "}
                            Signout
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navigator;
