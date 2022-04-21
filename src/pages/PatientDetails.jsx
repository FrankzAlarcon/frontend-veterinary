import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Appointment from '../components/Appointment';

function PatientDetails() {
  const { id } = useParams();
  const [patient, setPatient] = useState({});
  const [filter, setFilter] = useState('pendientes');
  useEffect(() => {
    const getPatientDetails = async () => {
      const response = await window.fetch(`${import.meta.env.VITE_API_URL}/patients/${id}`);
      const { body } = await response.json();
      setPatient(body);
    };
    getPatientDetails();
  }, []);
  const filteredAppointments = patient.appointments?.filter((appointment) => {
    if (filter === 'pendientes') {
      return appointment.isCompleted === false;
    }
    return appointment.isCompleted;
  });
  return (
    <div>
      <h1 className="text-3xl font-black my-3 text-center md:text-5xl lg:text-6xl">
        Seguimiento de
        {' '}
        <span className="text-indigo-600">Pacientes</span>
      </h1>
      <p className="text-lg text-center my-2 md:mb-4 lg:mb-8">
        Observa y administra las
        {' '}
        <span className="text-indigo-600 font-bold"> citas de tus Pacientes</span>
      </p>
      <div className="space-y-2 bg-white shadow-md rounded-md p-2 lg:p-4">
        <p className="font-semibold">
          <span className="uppercase text-gray-400 font-bold">Propietario: </span>
          {patient.name}
        </p>
        <p className="font-semibold">
          <span className="uppercase text-gray-400 font-bold">Mascota: </span>
          {patient.petName}
        </p>
        <p className="font-semibold">
          <span className="uppercase text-gray-400 font-bold">Email: </span>
          {patient.email}
        </p>
        <div>
          <h2 className="uppercase font-black text-center text-xl text-violet-400">Citas</h2>
          <div className="flex justify-evenly my-3">
            <button
              className={`${filter === 'pendientes' ? 'bg-indigo-500 text-white font-bold' : 'hover:bg-indigo-500 transition-colors font-semibold'}
              border p-2 rounded-md lg:px-6`}
              type="button"
              aria-controls="button"
              onClick={() => setFilter('pendientes')}
            >
              Pendientes
            </button>
            <button
              className={`${filter === 'completadas' ? 'bg-indigo-500 text-white font-bold' : 'hover:bg-indigo-500 transition-colors font-semibold'}
              border p-2 rounded-md lg:px-6`}
              type="button"
              aria-controls="button"
              onClick={() => setFilter('completadas')}
            >
              Completadas
            </button>
          </div>
          {
            filteredAppointments
              ?.map((appointment) => (
                <Appointment key={appointment.id} appointment={appointment} />
              ))
          }
        </div>
      </div>
    </div>
  );
}

export default PatientDetails;
