import React, { useEffect, useState } from 'react';
import Patient from '../components/Patient';
import useUserValues from '../hooks/useUserValues';

function PatientList() {
  const { user } = useUserValues();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const getPatientsOfVeterinary = async () => {
      const response = await window.fetch(`${import.meta.env.VITE_API_URL}/veterinarians/${user.id}/patients`);
      const { body } = await response.json();
      setPatients(body);
    };
    getPatientsOfVeterinary();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-black my-3 text-center md:text-5xl lg:text-6xl">
        Listado de
        {' '}
        <span className="text-indigo-600">Pacientes</span>
      </h1>
      <p className="text-lg text-center my-2">
        Administra tus
        {' '}
        <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
      </p>
      <div>
        {
          patients.map((patient) => <Patient key={patient.id} patient={patient} />)
        }
      </div>
    </div>
  );
}

export default PatientList;
