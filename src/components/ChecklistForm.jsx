import React, { useState } from 'react';
import { addChecklist } from '../api';
import { useNavigate } from 'react-router-dom';

const FormPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newChecklist = await addChecklist(title, description, tasks);
      console.log('New checklist added:', newChecklist);

      setTitle('');
      setDescription('');
      setTasks([]);
      navigate('/');
    } catch (error) {
      console.error('Error adding checklist:', error);
    }
  };

  const handleTaskChange = (index, key, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][key] = value;
    setTasks(updatedTasks);
  };

  const addTask = () => {
    setTasks([...tasks, { title: '', description: '', status: 0 }]);
  };

  return (
    <div className="form-container">
      <h2>Add New Checklist</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <button type="button" onClick={addTask} className="add-task-btn">
            Add Task
          </button>
          {tasks.map((task, index) => (
            <div key={index}>
                        <label>title:</label>

              <input
                type="text"
                value={task.title}
                onChange={(e) => handleTaskChange(index, 'title', e.target.value)}
                className="input-field"
              />
                        <label>Description:</label>

              <textarea
                value={task.description}
                onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
                className="input-field"
              />
                                      <label>status:</label>
              <select
                value={task.status}
                onChange={(e) => handleTaskChange(index, 'status', parseInt(e.target.value))}
                className="input-field"
              >
                <option value={0}>Not Done</option>
                <option value={1}>In Progress</option>
                <option value={2}>Done</option>
              </select>
            </div>
          ))}
        </div>
        <button type="submit" className="submit-btn">Add Checklist</button>
      </form>
    </div>
  );
};

export default FormPage;
