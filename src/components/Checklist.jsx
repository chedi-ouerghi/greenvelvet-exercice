import React, { useEffect, useState } from 'react';
import { getChecklist, updateChecklist, deleteChecklist } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

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

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          {editedTasks.map((task, index) => (
            <div key={index}>
              <input
                type="text"
                value={task.title}
                onChange={(e) => handleTaskChange(index, 'title', e.target.value)}
              />
              <textarea
                value={task.description}
                onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
              />
              <select
                value={task.status}
                onChange={(e) => handleTaskChange(index, 'status', parseInt(e.target.value))}
              >
                <option value={0}>Not Done</option>
                <option value={1}>In Progress</option>
                <option value={2}>Done</option>
              </select>
            </div>
          ))}
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="card">
      <h2>{checklist.title}</h2>
      <p>{checklist.description}</p>
      <p>ID: {checklist.id}</p>
      <p>Status: {checklist.statut}</p>
      <p>Created At: {checklist.created_at}</p>
      <ul>
        {checklist.todo.map((item, index) => (
          <li key={index}>
            <p>Title: {item.title}</p>
            <p>Description: {item.description}</p>
            <p>Status: {item.status}</p>
          </li>
        ))}
            </ul>
            <div className='footer-button'>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
            </div>
            </div>
      )}
    </div>
  );
};

export default ChecklistPage;
