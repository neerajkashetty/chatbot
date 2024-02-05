import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router  >
      <Routes>
        {/* <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} /> */}
         <Route path = "/home" element= {<ProtectedRoute><Home/></ProtectedRoute>}> 
        </Route> 
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();