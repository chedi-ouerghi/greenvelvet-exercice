import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { addChecklist } from '../api';
import { useNavigate } from 'react-router-dom';

const FormPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const newChecklist = await addChecklist(title, description, tasks);
      console.log('New checklist added:', newChecklist);

      setTitle('');
      setDescription('');
      setTasks([]);
      setTimeout(() => {
        setLoading(false);
        navigate('/');
      }, 4000);
    } catch (error) {
      console.error('Error adding checklist:', error);
      setLoading(false);
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

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="form-container">
      {loading ? (
        <div className="spinner">
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </div>
      ) : (
        <>
          <h2>Add New Checklist</h2>
          <form onSubmit={handleSubmit} className='form'>
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
                <div key={index} className="task-container">
                  <label>Title:</label>
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
                  <label>Status:</label>
                  <select
                    value={task.status}
                    onChange={(e) => handleTaskChange(index, 'status', parseInt(e.target.value))}
                    className="input-field"
                  >
                    <option value={0}>Not Done</option>
                    <option value={1}>In Progress</option>
                    <option value={2}>Done</option>
                  </select>
                  <button type="button" onClick={() => deleteTask(index)} className="delete-task-btn">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </div>
            <button type="submit" className="submit-btn">Add Checklist</button>
          </form>
        </>
      )}
    </div>
  );
};

export default FormPage;
