import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';
import PrivateRoute from '../src/routesprivate';

export default function RoutesApp() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Logon />} />
                <Route path="/register" element={<Register />} />
                <Route path='/profile' element={<PrivateRoute>
                    <Profile />
                </PrivateRoute>} />
                <Route path='/incidents/new' element={<PrivateRoute>
                    <NewIncident />
                </PrivateRoute>} />
                <Route path='/incidents/update/:idIncidents' element={<PrivateRoute>
                    <NewIncident />
                </PrivateRoute>} />
            </Routes>
        </BrowserRouter >
    );
}