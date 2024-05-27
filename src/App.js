// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import DashboardPage from './components/Dashboard';
// import ChecklistPage from './components/Checklist';
// import FormPage from './components/ChecklistForm';
// import './App.css';
// import Navbar from './components/layout/Navbar';
// import FooterSection from './components/layout/FooterSection';
// import Login from './components/auth/Login';

// const App = () => {
//   return (
//     <Router>
//       <div className='App'>
//         <Navbar />
//         <main>
//           <Routes>
//             <Route exact path="/" element={<DashboardPage />} />
//             <Route exact path="/login" element={<Login />} />
//             <Route path="/checklist/:id" element={<ChecklistPage />} />
//             <Route path="/add-checklist" element={<FormPage />} />
//           </Routes>
//         </main>
//         <FooterSection />
//       </div>
//     </Router>
//   );
// };

// export default App;

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import DashboardPage from './components/Dashboard';
import ChecklistPage from './components/Checklist';
import FormPage from './components/ChecklistForm';
import './App.css';
import Navbar from './components/layout/Navbar';
import FooterSection from './components/layout/FooterSection';
import Login from './components/auth/Login';
import './responsiveApp.css'

const ProtectedRoute = ({ element }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const email = localStorage.getItem('email');
        if (!email) {
            navigate('/login');
        }
    }, [navigate]);

    return element;
};

const App = () => {
    return (
        <Router>
            <div className='App'>
                <Navbar />
                <main>
                    <Routes>
                        <Route exact path="/" element={<ProtectedRoute element={<DashboardPage />} />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route path="/checklist/:id" element={<ProtectedRoute element={<ChecklistPage />} />} />
                        <Route path="/add-checklist" element={<ProtectedRoute element={<FormPage />} />} />
                    </Routes>
                </main>
                <FooterSection />
            </div>
        </Router>
    );
};

export default App;
