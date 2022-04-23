import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditForm from '../components/EditForm';
import { getPatientDetails } from '../services';

function NewAppointment() {
  const { id } = useParams();
  const [patient, setPatient] = useState({});
  useEffect(() => {
    getPatientDetails(id)
      .then(({ body }) => {
        setPatient(body);
      });
  }, []);
  return (
    <div>
      <div>
        <h1 className="text-3xl font-black my-3 text-center md:text-4xl lg:text-5xl">
          Crea una nueva cita para un
          {' '}
          <span className="text-indigo-600">Paciente</span>
        </h1>
        <p className="text-lg text-center my-2">
          Agrega los datos de la
          {' '}
          <span className="text-indigo-600 font-bold">Nueva Cita</span>
        </p>
        <EditForm patient={patient} setPatient={setPatient} />
      </div>
    </div>
  );
}

export default NewAppointment;
