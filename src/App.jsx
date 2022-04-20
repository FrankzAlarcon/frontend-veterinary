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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Cambiar el Navigate con un componente que verifique auth */}
        {/* <Route path="/" element={<Navigate to="/login" />}> */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Patients />} />
          <Route path="new-patient" element={<Tasks />} />
          <Route path="tasks" element={<NewPatient />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
