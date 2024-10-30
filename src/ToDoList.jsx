import React, { useState } from "react";

function ToDoList() {
    const [tasks, setTasks] = useState(['Clean the room', 'Read a book', 'Go for a walk']);
    const [newTask, setNewTask] = useState("");
    const [isEditing, setIsEditing] = useState(null);
    const [editedTask, setEditedTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleEditChange(event) {
        setEditedTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "" && !tasks.includes(newTask)) {
            setTasks(t => [...t, newTask]);
            setNewTask("");
        } else if (tasks.includes(newTask)) {
            alert('Task already exists');
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
            [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function enableEditing(index) {
        setIsEditing(index);
        setEditedTask(tasks[index]);
    }

    function saveTask(index) {
        if (editedTask.trim() !== "") {
            const updatedTasks = [...tasks];
            updatedTasks[index] = editedTask;
            setTasks(updatedTasks);
            setIsEditing(null);
            setEditedTask('');
        }
    }

    return (
        <div className="to-do-list">
            <div>
                <h2>To-Do List</h2>
                <input
                    type="text"
                    placeholder="Enter a task"
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className="add-button" onClick={addTask}>
                    Add
                </button>
            </div>

            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {isEditing === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editedTask}
                                    onChange={handleEditChange}
                                />
                                <button onClick={() => saveTask(index)}>
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <span className="text">{task}</span>
                                <button className="edit-button" onClick={() => enableEditing(index)}>
                                    Edit
                                </button>
                                <button className="delete-button" onClick={() => deleteTask(index)}>
                                    Delete
                                </button>
                                <button className="move-button" onClick={() => moveTaskUp(index)}>
                                    ⬆
                                </button>
                                <button className="move-button" onClick={() => moveTaskDown(index)}>
                                    ⬇
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;
