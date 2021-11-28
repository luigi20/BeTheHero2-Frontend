import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './midllewares/auth';

const PrivateRoute = ({ children }) => {
    const logged = isAuthenticated(localStorage.getItem('token'));
    if (logged) {
        return children;
    }

    return <Navigate to="/" />
}

export default PrivateRoute;