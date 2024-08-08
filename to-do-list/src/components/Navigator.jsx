import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faUser } from "@fortawesome/free-regular-svg-icons";
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
                    <div className="d-flex gap-4">
                        <FontAwesomeIcon icon={faMoon} />
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navigator;
<nav className="navigator border shadow-sm">
    <div className="container py-4 d-flex justify-content-between align-items-center">
        <div className="">
            <a href="#" className="text-dark logo fs-1 ">
                Todo List
            </a>
        </div>
        <div className="d-flex gap-4">
            <FontAwesomeIcon icon={faMoon} className="font-awesome" />
            <FontAwesomeIcon icon={faUser} className="font-awesome" />
        </div>
    </div>
</nav>;
