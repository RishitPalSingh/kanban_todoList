import React, { useState } from 'react';
import Task from './Task';

const KanbanBoard = ({ tasks, updateTask, deleteTask, clearCompleted }) => {
  const [draggedTask, setDraggedTask] = useState(null);
  const [isSorted, setIsSorted] = useState({
    todo: false,
    inprogress: false,
    finished: false,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const onDragStart = (e, task) => {
    setDraggedTask(task);
  };

  const onDrop = (e, newStatus) => {
    e.preventDefault();
    if (draggedTask) {
      const updatedTask = { ...draggedTask, status: newStatus };
      updateTask(updatedTask);
      setDraggedTask(null);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const sortTasksByDueDate = (tasks) => {
    return tasks.slice().sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  };

  const filterTasks = (tasks, query) => {
    if (!query) {
      return tasks;
    }
    return tasks.filter(task =>
      task.name.toLowerCase().includes(query.toLowerCase()) ||
      task.dueDate.includes(query)
    );
  };

  const renderTasks = (status) => {
    let filteredTasks = tasks.filter(task => task.status === status);
    if (isSorted[status]) {
      filteredTasks = sortTasksByDueDate(filteredTasks);
    }
    filteredTasks = filterTasks(filteredTasks, searchQuery);

    return filteredTasks.map(task => (
      <Task 
        key={task.id} 
        task={task} 
        updateTask={updateTask} 
        deleteTask={deleteTask}
        onDragStart={onDragStart}
        onDrop={(e) => onDrop(e, status)}
        onDragOver={onDragOver}
      />
    ));
  };

  const toggleSort = (status) => {
    setIsSorted(prevState => ({ ...prevState, [status]: !prevState[status] }));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="kanban-board">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search tasks..." 
          value={searchQuery} 
          onChange={handleSearch}
        />
      </div>
      <div className="column-container">
        {['todo', 'inprogress', 'finished'].map(status => (
          <div 
            key={status}
            className="column" 
            onDragOver={onDragOver} 
            onDrop={(e) => onDrop(e, status)}
          >
            <div className="column-header">
            <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
            <button onClick={() => toggleSort(status)}>
              {isSorted[status] ? 'Unsort by Due Date' : 'Sort by Due Date'}
            </button>
          </div>
          {renderTasks(status)}
        </div>
      ))}
      </div>
      <button className="clear-button" onClick={clearCompleted}>Clear Completed Tasks</button>
    </div>
  );
};

export default KanbanBoard;

