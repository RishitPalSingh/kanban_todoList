import React from 'react';

const Task = ({ task, updateTask, deleteTask, onDragStart, onDrop, onDragOver }) => {
  const handleChange = (e) => {
    const updatedTask = { ...task, status: e.target.value };
    updateTask(updatedTask);
  };

  const handleCheckbox = () => {
    const updatedTask = { ...task, completed: !task.completed };
    updateTask(updatedTask);
  };

  return (
    <div 
      className={`task ${task.completed ? 'completed' : ''}`} 
      draggable 
      onDragStart={(e) => onDragStart(e, task)}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <input type="checkbox" checked={task.completed} onChange={handleCheckbox} />
      <span>{task.name}</span>
      <span>{task.dueDate}</span>
      <select value={task.status} onChange={handleChange}>
        <option value="todo">To Do</option>
        <option value="inprogress">In Progress</option>
        <option value="finished">Finished</option>
      </select>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default Task;
