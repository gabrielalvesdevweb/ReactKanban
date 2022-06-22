import React, { useState } from "react";
import "./styles.css";
import NavBar from "./components/NavBar/NavBar";
import TaskList from "./components/TaskList/TaskList";

let idAcc = 0;
const generateId = () => ++idAcc;

export default function App() {
  const [tasks, SetTasks] = useState([]);

  const deleteTask = (id) => {
    SetTasks((exitingTasks) => {
      return exitingTasks.filter((task) => task.id !== id);
    });
  };

  const updateTask = (id, title, state) => {
    SetTasks((existingTasks) => {
      return existingTasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, state };
        } else {
          return task;
        }
      });
    });
  };
  const addTask = (title, state) => {
    const newTask = {
      id: generateId(),
      title,
      state
    };
    SetTasks((existingTasks) => {
      return [...existingTasks, newTask];
    });
  };
  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <TaskList
          title="Pendente"
          onAddTask={addTask}
          taskState="Pendente"
          tasks={tasks.filter((t) => t.state === "Pendente")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <TaskList
          title="Fazendo"
          onAddTask={addTask}
          taskState="Fazendo"
          tasks={tasks.filter((t) => t.state === "Fazendo")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <TaskList
          title="Completa"
          onAddTask={addTask}
          taskState="Completa"
          tasks={tasks.filter((t) => t.state === "Completa")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
