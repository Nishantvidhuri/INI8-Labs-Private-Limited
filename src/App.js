import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AccountManagement from './pages/AccountManagement';
import AdminPage from './pages/AdminPage';

const demoUsers = [
  { name: "Alice Johnson", email: "alice@example.com", password: "alice123", position: "Software Engineer", bio: "Loves coding.", profilePicture: "https://randomuser.me/api/portraits/women/1.jpg", coverPhoto: "https://picsum.photos/800/200?random=1" },
  { name: "Bob Smith", email: "bob@example.com", password: "bob123", position: "Product Manager", bio: "Building products.", profilePicture: "https://randomuser.me/api/portraits/men/2.jpg", coverPhoto: "https://picsum.photos/800/200?random=2" },
  { name: "Cathy Brown", email: "cathy@example.com", password: "cathy123", position: "UX Designer", bio: "User-friendly designs.", profilePicture: "https://randomuser.me/api/portraits/women/3.jpg", coverPhoto: "https://picsum.photos/800/200?random=3" },
  { name: "David Lee", email: "david@example.com", password: "david123", position: "Data Scientist", bio: "Loves data.", profilePicture: "https://randomuser.me/api/portraits/men/4.jpg", coverPhoto: "https://picsum.photos/800/200?random=4" },
  { name: "Eva Green", email: "eva@example.com", password: "eva123", position: "Backend Developer", bio: "Server-side apps.", profilePicture: "https://randomuser.me/api/portraits/women/5.jpg", coverPhoto: "https://picsum.photos/800/200?random=5" },
  { name: "Frank Wright", email: "frank@example.com", password: "frank123", position: "DevOps Engineer", bio: "CI/CD expert.", profilePicture: "https://randomuser.me/api/portraits/men/6.jpg", coverPhoto: "https://picsum.photos/800/200?random=6" },
  { name: "Grace Hill", email: "grace@example.com", password: "grace123", position: "Frontend Developer", bio: "Responsive UIs.", profilePicture: "https://randomuser.me/api/portraits/women/7.jpg", coverPhoto: "https://picsum.photos/800/200?random=7" },
  { name: "Henry Adams", email: "henry@example.com", password: "henry123", position: "QA Engineer", bio: "Software quality.", profilePicture: "https://randomuser.me/api/portraits/men/8.jpg", coverPhoto: "https://picsum.photos/800/200?random=8" },
  { name: "Ivy Martinez", email: "ivy@example.com", password: "ivy123", position: "Content Writer", bio: "Engaging content.", profilePicture: "https://randomuser.me/api/portraits/women/9.jpg", coverPhoto: "https://picsum.photos/800/200?random=9" },
  { name: "Jack Wilson", email: "jack@example.com", password: "jack123", position: "Mobile Developer", bio: "iOS/Android apps.", profilePicture: "https://randomuser.me/api/portraits/men/10.jpg", coverPhoto: "https://picsum.photos/800/200?random=10" }
];

const initializeDemoUsers = () => {
  if (!sessionStorage.getItem('users')) {
    sessionStorage.setItem('users', JSON.stringify(demoUsers));
  }
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    initializeDemoUsers();
    const loggedInUser = sessionStorage.getItem("isAuthenticated");
    const adminStatus = sessionStorage.getItem("isAdmin");

    if (loggedInUser) setIsAuthenticated(true);
    if (adminStatus === 'true') setIsAdmin(true);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isAuthenticated ? <Navigate to="/login" /> : <Navigate to="/account" />} />
        <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} />} />
        <Route path="/account" element={isAuthenticated ? <AccountManagement setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
        <Route path="/admin" element={isAdmin ? <AdminPage setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
