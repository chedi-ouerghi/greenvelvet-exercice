import React, { useEffect, useState } from 'react';
import { getChecklist, updateChecklist, deleteChecklist } from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';


const ChecklistPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedTasks, setEditedTasks] = useState([]);
    const [openTasks, setOpenTasks] = useState({});
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const data = await getChecklist(id);
        console.log('Fetched checklist:', data);
        if (data) {
          setChecklist(data);
          setEditedTitle(data.title);
          setEditedDescription(data.description);
          setEditedTasks(data.todo);
        } else {
          setError('Failed to load checklist data');
        }
      } catch (error) {
        setError('Error fetching checklist');
        console.error('Error fetching checklist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChecklist();
  }, [id]);

const handleDelete = async () => {
  const confirmDelete = window.confirm('Are you sure you want to delete this checklist?');

  if (confirmDelete) {
    try {
      await deleteChecklist(id);
      navigate('/');
    } catch (error) {
      setError('Error deleting checklist');
      console.error('Error deleting checklist:', error);
    }
  }
};

  

const handleEdit = async () => {
  try {
    await updateChecklist(id, editedTitle, editedDescription, editedTasks);
    setChecklist({
      ...checklist,
      title: editedTitle,
      description: editedDescription,
      todo: editedTasks
    });
    setIsEditing(false);
  } catch (error) {
    setError('Error updating checklist');
    console.error('Error updating checklist:', error);
  }
};


  const handleTaskChange = (index, key, value) => {
    const updatedTasks = [...editedTasks];
    updatedTasks[index][key] = value;
    setEditedTasks(updatedTasks);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;



  const toggleTask = (index) => {
    setOpenTasks({
      ...openTasks,
      [index]: !openTasks[index]
    });
  };

const deleteEditedTask = (index) => {
  const updatedTasks = [...editedTasks];
  updatedTasks.splice(index, 1);
  setEditedTasks(updatedTasks);
};

  return (
    <div className="checklist-container">
      {isEditing ? (
<div className="edit-form">
  <input
    type="text"
    className="edit-input"
    value={editedTitle}
    onChange={(e) => setEditedTitle(e.target.value)}
    placeholder="Title"
  />
  <textarea
    className="edit-textarea"
    value={editedDescription}
    onChange={(e) => setEditedDescription(e.target.value)}
    placeholder="Description"
  />
  {editedTasks.map((task, index) => (
    <div key={index} className="task-edit-item">
      <input
        type="text"
        className="edit-input"
        value={task.title}
        onChange={(e) => handleTaskChange(index, 'title', e.target.value)}
        placeholder="Task Title"
      />
      <textarea
        className="edit-textarea"
        value={task.description}
        onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
        placeholder="Task Description"
      />
      <select
        className="edit-select"
        value={task.status}
        onChange={(e) => handleTaskChange(index, 'status', parseInt(e.target.value))}
      >
        <option value={0}>Not Done</option>
        <option value={1}>In Progress</option>
        <option value={2}>Done</option>
      </select>
      <button onClick={() => deleteEditedTask(index)} className="edit-delete-task-button">
        Delete Task
      </button>
    </div>
  ))}
  <div className="edit-buttons">
    <button onClick={handleEdit} className="edit-save-button">Save</button>
    <button onClick={() => setIsEditing(false)} className="edit-cancel-button">Cancel</button>
  </div>
</div>

      ) : (
        <div className="card">
      <h2 className="card-title">{checklist.title}</h2>
      <p className="card-description">{checklist.description}</p>
      {/* <p className="card-id">ID: {checklist.id}</p> */}
      <p className="card-status">Status: {checklist.statut}</p>
      <p className="card-created-at">Created At: {checklist.created_at}</p>
      <ul className="card-todo-list">
        {checklist.todo.map((item, index) => (
          <li key={index} className="card-todo-item">
            <p className="todo-title" onClick={() => toggleTask(index)}>
              <FontAwesomeIcon icon={openTasks[index] ? faChevronDown : faChevronRight} /> {item.title}
            </p>
            {openTasks[index] && (
              <div>
                <p className="todo-description">Description: {item.description}</p>
                <p className="todo-status">Status: {item.status}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className='card-buttons'>
        <button onClick={() => setIsEditing(true)} className="card-edit-button">Edit</button>
        <button onClick={handleDelete} className="card-delete-button">Delete</button>
      </div>
    </div>
      )}
    </div>
  );
};

export default ChecklistPage;
