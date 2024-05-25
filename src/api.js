import axios from 'axios';

const API_ROOT = 'https://greenvelvet.alwaysdata.net/pfc/';
const TOKEN = 'd85c63d22153b73bf5ab75947dd5993ae0265a6c';

const api = axios.create({
  baseURL: API_ROOT,
  headers: {
    'token': TOKEN
  }
});

export const getChecklists = async () => {
  const response = await api.get('checklists');
  return response.data;
};

export const getChecklist = async (id) => {
  try {
    const response = await api.get(`checklist?id=${id}`);
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching checklist:', error);
    throw error;
  }
};

export const addChecklist = async (title, description, todo) => {
  const response = await api.post('checklist/add', {
    title,
    description,
    todo
  });
  return response.data;
};

export const updateChecklist = async (id, title, description, todo) => {
  const payload = {
    id,
    title,
    description,
    todo 
  };

  try {
    const response = await api.post('checklist/update', payload);
    return response.data;
  } catch (error) {
    console.error('Error updating checklist:', error.response);
    throw error;
  }
};

export const deleteChecklist = async (id, additionalData) => {
  const payload = {
    id,
    ...additionalData
  };

  try {
    const response = await api.get('checklist/delete', { params: payload });
    return response.data;
  } catch (error) {
    console.error('Error deleting checklist:', error.response);
    throw error;
  }
};


export const updateChecklistStatus = async (id, status) => {
  const response = await api.get(`checklist/statut?id=${id}&statut=${status}`);
  return response.data;
};
