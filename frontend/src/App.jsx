import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [userRole, setUserRole] = useState('');

    const handleLoginSuccess = (userData) => {
        setUsername(userData.username);
        setUserRole(userData.role);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        window.location.reload();
        setIsAuthenticated(false);
        setUsername('');
        setUserRole('');
    };

    return (
        <BrowserRouter>
            <Routes>
                {/* Login Route */}
                <Route
                    path="/login"
                    element={
                        !isAuthenticated ? (
                            <AdminLogin onLoginSuccess={handleLoginSuccess} />
                        ) : (
                            <Navigate to="/dashboard" />
                        )
                    }
                />

                {/* Dashboard Route - Direct Access Allowed */}
                <Route
                    path="/dashboard"
                    element={
                        <Dashboard
                            onLogout={handleLogout}
                            username={username}
                            isAuthenticated={isAuthenticated}
                            userRole={userRole}
                        />
                    }
                />

                {/* Application Form Route */}
                <Route
                    path="/application-form"
                    element={
                        <Dashboard
                            onLogout={handleLogout}
                            username={username}
                            isAuthenticated={isAuthenticated}
                            userRole={userRole}
                        />
                    }
                />

                {/* Default Route */}
                <Route
                    path="/"
                    element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
                />

                {/* 404 - Redirect */}
                <Route
                    path="*"
                    element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;