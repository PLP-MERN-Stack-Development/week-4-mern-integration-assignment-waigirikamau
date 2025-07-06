// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import PostCreate from './pages/PostCreate';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login'; // refresh navigation
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-700 text-white py-4 shadow-md">
          <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              <Link to="/">MERN Blog App</Link>
            </h1>
            <nav className="space-x-4">
              <Link to="/" className="hover:underline">Home</Link>
              {token ? (
                <>
                  <Link to="/create" className="hover:underline">Create Post</Link>
                  <button onClick={handleLogout} className="hover:underline">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:underline">Login</Link>
                  <Link to="/register" className="hover:underline">Register</Link>
                </>
              )}
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <PostCreate />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
