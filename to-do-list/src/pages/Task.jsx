import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import Navigator from "../components/Navigator";
import { useParams, Link } from "react-router-dom";

function Task() {
    const { id } = useParams();

    let tasks = [
        {
            id: 1,
            category: "Personal",
            date: "2024-08-06",
        },
        {
            id: 2,
            category: "Work",
            date: "2024-08-06",
        },
        {
            id: 3,
            category: "Health",
            date: "2024-08-06",
        },
        {
            id: 4,
            category: "Home",
            date: "2024-08-03",
        },
        {
            id: 5,
            category: "Work",
            date: "2024-08-03",
        },
        {
            id: 6,
            category: "Personal",
            date: "2024-08-03",
        },
    ];

    let individualTask = [
        {
            id: 1,
            task: [
                { id: 1, description: "Read a book", isDone: true },
                { id: 2, description: "Attend the meeting", isDone: false },
                { id: 3, description: "Clean the house", isDone: true },
                { id: 4, description: "Plan the trip", isDone: false },
                { id: 5, description: "Write a blog post", isDone: true },
            ],
        },
        {
            id: 2,
            task: [
                { id: 1, description: "Buy groceries", isDone: false },
                { id: 2, description: "Exercise for 30 minutes", isDone: true },
                { id: 3, description: "Complete the report", isDone: false },
            ],
        },
        {
            id: 3,
            task: [
                { id: 1, description: "Call the doctor", isDone: true },
                { id: 2, description: "Pay bills", isDone: false },
                { id: 3, description: "Attend the meeting", isDone: true },
                { id: 4, description: "Plan the trip", isDone: false },
                { id: 5, description: "Read a book", isDone: true },
                { id: 6, description: "Clean the house", isDone: false },
                { id: 7, description: "Write a blog post", isDone: true },
            ],
        },
        {
            id: 4,
            task: [
                {
                    id: 1,
                    description: "Exercise for 30 minutes",
                    isDone: false,
                },
                { id: 2, description: "Call the doctor", isDone: true },
                { id: 3, description: "Pay bills", isDone: false },
            ],
        },
        {
            id: 5,
            task: [
                { id: 1, description: "Plan the trip", isDone: true },
                { id: 2, description: "Complete the report", isDone: false },
                { id: 3, description: "Exercise for 30 minutes", isDone: true },
                { id: 4, description: "Call the doctor", isDone: false },
                { id: 5, description: "Attend the meeting", isDone: true },
                { id: 6, description: "Buy groceries", isDone: false },
            ],
        },
        {
            id: 6,
            task: [
                { id: 1, description: "Pay bills", isDone: true },
                { id: 2, description: "Attend the meeting", isDone: false },
                { id: 3, description: "Plan the trip", isDone: true },
                { id: 4, description: "Clean the house", isDone: false },
            ],
        },
        {
            id: 7,
            task: [
                { id: 1, description: "Read a book", isDone: true },
                { id: 2, description: "Buy groceries", isDone: false },
                { id: 3, description: "Complete the report", isDone: true },
                { id: 4, description: "Plan the trip", isDone: false },
            ],
        },
        {
            id: 8,
            task: [
                {
                    id: 1,
                    description: "Exercise for 30 minutes",
                    isDone: false,
                },
                { id: 2, description: "Attend the meeting", isDone: true },
                { id: 3, description: "Write a blog post", isDone: false },
                { id: 4, description: "Buy groceries", isDone: true },
                { id: 5, description: "Plan the trip", isDone: false },
            ],
        },
        {
            id: 9,
            task: [
                { id: 1, description: "Clean the house", isDone: true },
                { id: 2, description: "Complete the report", isDone: false },
                { id: 3, description: "Read a book", isDone: true },
                { id: 4, description: "Attend the meeting", isDone: false },
                { id: 5, description: "Plan the trip", isDone: true },
                { id: 6, description: "Call the doctor", isDone: false },
            ],
        },
        {
            id: 10,
            task: [
                { id: 1, description: "Buy groceries", isDone: true },
                { id: 2, description: "Write a blog post", isDone: false },
                { id: 3, description: "Complete the report", isDone: true },
            ],
        },
    ];

    let completeTask = {};
    completeTask.taskInfo = tasks.find((task) => task.id === parseInt(id));
    completeTask.task = individualTask.find((task) => task.id === parseInt(id));

    return (
        <>
            <Navigator></Navigator>

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

                <h2 className="my-4">{completeTask.taskInfo.category}</h2>

                <div className="list-actual-task d-flex flex-column gap-3">
                    {completeTask.task.task.map((individualTask) => (
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
