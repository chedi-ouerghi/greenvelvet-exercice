import React, { useEffect, useState } from 'react';
import { getChecklists, deleteChecklist, updateChecklistStatus } from '../api';
import { Link, useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getChecklists();
        console.log('Fetched tasks:', result);
        if (result && result.response) {
          setTasks(result.response);
        } else {
          setError('Failed to load checklists');
        }
      } catch (error) {
        setError('Error fetching checklists');
        console.error('Error fetching checklists:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this checklist?');

    if (confirmDelete) {
      setLoadingDelete(true);
      try {
        await deleteChecklist(id);
        setTasks(tasks.filter(task => task.id !== id));
      } catch (error) {
        console.error('Error deleting checklist:', error);
      } finally {
        setLoadingDelete(false);
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateChecklistStatus(id, status);
      
      const updatedTasks = tasks.map(task => {
        if (task.id === id) {
          return { ...task, statut: status }; 
        }
        return task;
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating checklist status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return "red";
      case 1:
        return "darkgrey";
      case 2:
        return "green";
      default:
        return "black";
    }
  };

  if (loading) return
      <div className="spinner">
      <span>L</span>
      <span>O</span>
      <span>A</span>
      <span>D</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
      </div>
        ;
  if (error) return <div>{error}</div>;


  return (
    <div className="dashboard">
      <Link to="/add-checklist" className="add-checklist-button">Add New Checklist</Link>
      {tasks.length === 0 ? (
        <div className="no-data">No Data</div>
      ) : (
        <table className="checklist-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th style={{width:'130px'}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(checklist => (
              <tr key={checklist.id}>
                <td>{checklist.title}</td>
                <td>
                  <select
                    value={checklist.statut}
                    onChange={(e) => handleStatusChange(checklist.id, parseInt(e.target.value))}
                    className="status-select"
                    style={{ color: getStatusColor(checklist.statut) }}
                  >
                    <option value={0}>Not Done</option>
                    <option value={1}>In Progress</option>
                    <option value={2}>Done</option>
                  </select>
                </td>
                <td style={{width:'130px'}}>
                  <button onClick={() => navigate(`/checklist/${checklist.id}`)} className="view-button">View</button>
                  <button onClick={() => handleDelete(checklist.id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashboardPage;
