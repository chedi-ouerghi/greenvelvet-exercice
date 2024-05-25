import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './components/Dashboard';
import ChecklistPage from './components/Checklist';
import FormPage from './components/ChecklistForm';
import './App.css'

const App = () => {
  return (
    <Router>
      <div>
        <h1>Checklist App</h1>
        <Routes>
          <Route exact path="/" element={<DashboardPage/>} />
          <Route path="/checklist/:id" element={<ChecklistPage/>} />
          <Route path="/add-checklist" element={<FormPage/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
