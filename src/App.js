import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import KanbanBoard from './components/KanbanBoard';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);

  const addTask = (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const updateTask = (updatedTask) => {
    const newTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const clearCompleted = () => {
    const newTasks = tasks.filter(task => !task.completed);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  return (
    <div className="App">
      <h1>Kanban To-Do List</h1>
      <TaskForm addTask={addTask} />
      <KanbanBoard tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} clearCompleted={clearCompleted} />
    </div>
  );
};

export default App;
