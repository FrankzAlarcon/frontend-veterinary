import React from 'react';
import {
  BrowserRouter, Routes, Route, /* Navigate, */
} from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import NewPatient from './pages/NewPatient';
import SignIn from './pages/SignIn';
import Tasks from './pages/Tasks';
import PatientList from './pages/PatientList';
import Auth from './components/Auth';
import UserProvider from './context/UserProvider';
import PatientDetails from './pages/PatientDetails';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Auth><Layout /></Auth>}>
            <Route index element={<PatientList />} />
            <Route path="new-patient" element={<NewPatient />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="patient/:id" element={<PatientDetails />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignIn />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
