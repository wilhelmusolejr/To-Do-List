import Navigator from "../components/Navigator";
import ListTask from "../components/ListTask";

function Dashboard() {
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

    return (
        <>
            <Navigator></Navigator>

            <section className="container my-5">
                <ListTask tasks={tasks}></ListTask>
            </section>
        </>
    );
}

export default Dashboard;
