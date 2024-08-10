import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faSquareCheck,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { faSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";

import Navigator from "../components/Navigator";
import { useParams, Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import Loader from "../components/Loader";
import MiddleContainer from "../components/MiddleContainer";

function Task() {
    const { user } = useStateContext();
    const { id } = useParams();
    const [individualTask, setindividualTask] = useState([]);
    const [task, setTask] = useState([]);
    const [loading, setLoading] = useState(true);

    const [deleteMessage, setDeleteMessage] = useState("");
    const [deleteElement, setDeleteElement] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [taskTitle, setTaskTitle] = useState("");
    const [newTasks, setNewTasks] = useState([""]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading

            try {
                // Fetch task title
                const taskResponse = await axiosClient.post("/userTaskTitle", {
                    task_id: id,
                });
                const fetchedTask = taskResponse.data.task_title;

                setTask(fetchedTask);
                setTaskTitle(fetchedTask.task_title);

                // Fetch individual tasks
                const individualTasksResponse = await axiosClient.post(
                    "/userTasks",
                    {
                        task_id: id,
                    }
                );

                const fetchedIndividualTask =
                    individualTasksResponse.data.tasks;

                setNewTasks(fetchedIndividualTask);
                setindividualTask(fetchedIndividualTask);

                console.log(fetchedIndividualTask);
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

    // Page title
    useEffect(() => {
        document.title = `Task | ${taskTitle}`;
    }, [task]);

    // Show loading indicator if data is not yet loaded
    if (loading) {
        return (
            <>
                <Navigator />
                <Loader />
            </>
        );
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            // Fetch task title
            const taskResponse = await axiosClient.post("/deleteEntiretask", {
                task_id: id,
                user_id: user.id,
            });

            setDeleteMessage(taskResponse.data.message);
            setDeleteElement(true);

            setTimeout(() => {
                window.location = "/dashboard";
            }, 2000);
        } catch (err) {
            console.error(err);
        }
    };

    const handleTask = (id, e) => {
        let temp = [];
        let dummy_task = {};

        newTasks.forEach((task, index) => {
            if (task.id === id || task.id === null) {
                dummy_task = task;
                dummy_task.id = undefined;
                dummy_task.description = e.target.value;
                temp.push(dummy_task);
            } else {
                temp.push(task);
            }
        });

        setNewTasks(temp);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axiosClient
            .post("/updateTask", {
                category: selectedCategory,
                tasks: newTasks,
                task_title: taskTitle,
                user_id: user.id,
                task_id: id,
            })
            .then(({ data }) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const addTask = () => {
        setNewTasks([
            ...newTasks,
            {
                id: null,
                task_title_id: null,
                description: "",
            },
        ]);
    };

    const taskClick = async (e, task_id) => {
        try {
            // Fetch task title
            const taskResponse = await axiosClient.post("/updateTaskStatus", {
                task_id,
            });

            let temp = [];

            individualTask.forEach((task) => {
                if (task.id == taskResponse.data.id) {
                    temp.push(taskResponse.data);
                } else {
                    temp.push(task);
                }
            });

            setindividualTask(temp);
        } catch (err) {
            console.error(err);
        } finally {
            // setLoading(false); // End loading
        }
    };

    return (
        <>
            <Navigator />

            {deleteElement && (
                <MiddleContainer>
                    <p>{deleteMessage}</p>
                    <p>Redirecting to Dashboard.</p>
                </MiddleContainer>
            )}

            <div
                className="modal fade"
                id="AddTaskModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Edit task
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit} id="add_task_form">
                                <div className="">
                                    {/* Task title */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="task-title"
                                            placeholder="Health"
                                            value={taskTitle || ""}
                                            onChange={(e) => {
                                                setTaskTitle(e.target.value);
                                            }}
                                        />
                                        <label htmlFor="task-title">
                                            Task Title
                                        </label>
                                    </div>

                                    <hr />

                                    {newTasks.map((task, index) => (
                                        <div
                                            key={index}
                                            className="d-flex align-items-center justify-content-between mb-3"
                                        >
                                            {/* input */}
                                            <div className="form-floating w-100">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id={`task_description_${index}`}
                                                    placeholder={`Task #${index}`}
                                                    value={
                                                        task.description || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleTask(task.id, e)
                                                    }
                                                />
                                                <label
                                                    htmlFor={`task_description_${index}`}
                                                >
                                                    Task ({index})
                                                </label>
                                            </div>

                                            {/* trash */}
                                            <div
                                                className="p-2"
                                                onClick={() =>
                                                    removeTask(index)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrashCan}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <div
                                        className="text-center py-2 mb-3 border rounded btn-primary-outline"
                                        onClick={addTask}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Update Task
                                </button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">
                                Add Task
                            </button>
                        </div>
                    </div>
                </div>
            </div>

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
                        <button
                            className="btn btn-primary edit-task d-none"
                            data-bs-target="#AddTaskModal"
                            type="button"
                            data-bs-toggle="modal"
                        >
                            Edit list
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={handleDelete}
                        >
                            Delete List
                        </button>
                    </div>
                </div>

                <h2 className="my-4 text-capitalize">{task.task_title}</h2>

                <div className="list-actual-task d-flex flex-column gap-3 ">
                    {individualTask.map((individualTask) => (
                        <div
                            key={individualTask.id}
                            className={`rounded border border-dark p-3 d-flex align-items-center shadow-sm ${
                                individualTask.is_done ? "bg-light-primary" : ""
                            } `}
                        >
                            <FontAwesomeIcon
                                icon={
                                    individualTask.is_done
                                        ? faSquareCheck
                                        : faSquare
                                }
                                onClick={(e) => {
                                    taskClick(e, individualTask.id);
                                }}
                                className="me-3 text-dark-green fs-5 cursor-pointer"
                            />
                            <p className="text-paragraph">
                                {individualTask.description}.
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Task;
