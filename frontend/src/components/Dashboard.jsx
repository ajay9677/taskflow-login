import { useEffect, useState } from "react";

function Dashboard({ user, onLogout }) {

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("taskflow_tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [taskName, setTaskName] = useState("");
    const [dueDate, setDueDate] = useState("");

    // Save tasks in localStorage
    useEffect(() => {
        localStorage.setItem(
            "taskflow_tasks",
            JSON.stringify(tasks)
        );
    }, [tasks]);

    // Add Task
    const addTask = (e) => {
        e.preventDefault();

        if (!taskName.trim()) {
            alert("Please enter a task name");
            return;
        }

        const newTask = {
            id: Date.now(),
            name: taskName,
            date: dueDate,
            status: "Pending"
        };

        setTasks((prevTasks) => [
            ...prevTasks,
            newTask
        ]);

        setTaskName("");
        setDueDate("");
    };

    // Complete Task
    const completeTask = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id
                    ? { ...task, status: "Completed" }
                    : task
            )
        );
    };

    // Delete Task
    const deleteTask = (id) => {
        setTasks((prevTasks) =>
            prevTasks.filter(
                (task) => task.id !== id
            )
        );
    };

    return (
        <div className="dashboard">

            <div className="dashboard-card">

                <div className="dashboard-logo">
                    N
                </div>

                <h1>
                    Welcome, {user.name}! 🎉
                </h1>

                <p>
                    You have successfully logged in.
                </p>

                <div className="user-info">

                    <p>
                        <strong>Name:</strong>{" "}
                        {user.name}
                    </p>

                    <p>
                        <strong>Email:</strong>{" "}
                        {user.email}
                    </p>

                </div>

                {/* Add Task */}

                <div className="add-task">

                    <h2>➕ Add New Task</h2>

                    <form onSubmit={addTask}>

                        <input
                            type="text"
                            placeholder="Enter task name"
                            value={taskName}
                            onChange={(e) =>
                                setTaskName(e.target.value)
                            }
                        />

                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) =>
                                setDueDate(e.target.value)
                            }
                        />

                        <button
                            type="submit"
                            className="add-task-btn"
                        >
                            Add Task
                        </button>

                    </form>

                </div>

                {/* Task Bar */}

                <div className="taskbar">

                    <div className="taskbar-title">
                        <h2>📋 My Tasks</h2>

                        <span>
                            {tasks.length} Tasks
                        </span>
                    </div>

                    {tasks.length === 0 ? (

                        <p className="no-task">
                            No tasks added yet.
                        </p>

                    ) : (

                        tasks.map((task) => (

                            <div
                                className="task-item"
                                key={task.id}
                            >

                                <div className="task-info">

                                    <h3>
                                        {task.name}
                                    </h3>

                                    {task.date && (
                                        <p>
                                            📅 {task.date}
                                        </p>
                                    )}

                                    <span
                                        className={
                                            task.status === "Completed"
                                                ? "completed"
                                                : "pending"
                                        }
                                    >
                                        {task.status}
                                    </span>

                                </div>

                                <div className="task-actions">

                                    {task.status !== "Completed" && (
                                        <button
                                            onClick={() =>
                                                completeTask(task.id)
                                            }
                                        >
                                            ✓ Complete
                                        </button>
                                    )}

                                    <button
                                        onClick={() =>
                                            deleteTask(task.id)
                                        }
                                    >
                                        🗑 Delete
                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>

                <button
                    className="logout-btn"
                    onClick={onLogout}
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Dashboard;



