import React, { Suspense } from 'react';
import {
  BrowserRouter, Routes, Route, /* Navigate, */
} from 'react-router-dom';
import Login from './pages/Login';
import Auth from './components/Auth';
import UserProvider from './context/UserProvider';
import Spinner from './components/Spinner';

const PatientList = React.lazy(() => import('./pages/PatientList'));
const NewPatient = React.lazy(() => import('./pages/NewPatient'));
const Tasks = React.lazy(() => import('./pages/Tasks'));
const PatientDetails = React.lazy(() => import('./pages/PatientDetails'));
const Layout = React.lazy(() => import('./components/Layout'));
const SignIn = React.lazy(() => import('./pages/SignIn'));
const EditAppointment = React.lazy(() => import('./pages/EditAppointment'));
const NewAppointment = React.lazy(() => import('./pages/NewAppointment'));
function App() {
  return (
    <Suspense fallback={<Spinner type="lazy" />}>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Auth><Layout /></Auth>}>
              <Route index element={<PatientList />} />
              <Route path="new-patient" element={<NewPatient />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="patient/:id" element={<PatientDetails />}>
                <Route path="edit-appointment/:appointmentId" element={<EditAppointment />} />
              </Route>
              <Route path="patient/:id/new-appointment" element={<NewAppointment />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignIn />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
