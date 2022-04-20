import React from 'react';
import {
  BrowserRouter, Routes, Route, /* Navigate, */
} from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import NewPatient from './pages/NewPatient';
import SignIn from './pages/SignIn';
import Tasks from './pages/Tasks';
import Patients from './pages/Patients';
import Auth from './components/Auth';
import UserProvider from './context/UserProvider';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          {/* Cambiar el Navigate con un componente que verifique auth */}
          <Route path="/" element={<Auth><Layout /></Auth>}>
            <Route index element={<Patients />} />
            <Route path="new-patient" element={<Tasks />} />
            <Route path="tasks" element={<NewPatient />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignIn />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
