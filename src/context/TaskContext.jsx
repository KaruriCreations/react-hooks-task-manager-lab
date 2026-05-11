import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:6001/tasks')
            .then(r => r.json())
            .then(data => setTasks(data));
    }, []);

    function handleOnClick(id, completed) {
        fetch(`http://localhost:6001/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ completed: !completed })
        })
            .then(r => r.json())
            .then(updatedTask => {
                setTasks(prev =>
                    prev.map(task => task.id === id ? updatedTask : task)
                );
            });
    }

    return (
        <TaskContext.Provider value={{ tasks, setTasks, handleOnClick }}>
            {children}
        </TaskContext.Provider>
    );
}
