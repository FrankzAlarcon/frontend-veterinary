import React from 'react';
import Patient from '../components/Patient';
import useUserValues from '../hooks/useUserValues';

function PatientList() {
  const { user } = useUserValues();
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
          user.appointments
            ?.map((appointment) => <Patient key={appointment.id} appointment={appointment} />)
        }
      </div>
    </div>
  );
}

export default PatientList;
