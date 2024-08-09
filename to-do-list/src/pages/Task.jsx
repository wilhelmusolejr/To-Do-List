import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import Navigator from "../components/Navigator";
import { useParams, Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import Loader from "../components/Loader";

function Task() {
    const { user } = useStateContext();
    const { id } = useParams();
    const [individualTask, setindividualTask] = useState([]);
    const [task, setTask] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading

            try {
                // Fetch task title
                const taskResponse = await axiosClient.post("/userTaskTitle", {
                    task_id: id,
                });
                setTask(taskResponse.data.task_title);

                // Fetch individual tasks
                const individualTasksResponse = await axiosClient.post(
                    "/userTasks",
                    {
                        task_id: id,
                    }
                );
                setindividualTask(individualTasksResponse.data.tasks);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false); // End loading
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    // Show loading indicator if data is not yet loaded
    if (loading) {
        return (
            <>
                <Navigator />
                <Loader />
            </>
        );
    }

    return (
        <>
            <Navigator />

            <section className="container my-5">
                <div className="d-flex flex-wrap justify-content-sm-between justify-content-center align-items-center gap-3">
                    <Link to="/dashboard" className="d-flex text-dark-green">
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="me-2 fs-5"
                        />
                        Back to Tasks
                    </Link>
                    <div className="task-buttons d-flex gap-2">
                        <div className="btn btn-primary-outline">Edit list</div>
                        <div className="btn btn-primary">Add List</div>
                    </div>
                </div>

                <h2 className="my-4">{task.task_title}</h2>

                <div className="list-actual-task d-flex flex-column gap-3">
                    {individualTask.map((individualTask) => (
                        <div
                            key={individualTask.id}
                            className="rounded border border-dark p-3 d-flex align-items-center shadow-sm"
                        >
                            <FontAwesomeIcon
                                icon={
                                    individualTask.isDone
                                        ? faSquareCheck
                                        : faSquare
                                }
                                className="me-3 text-dark-green fs-5"
                            />
                            <p>{individualTask.description}.</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Task;
