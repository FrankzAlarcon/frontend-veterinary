import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import EditForm from '../components/EditForm';
import { getPatientDetails } from '../services';

function EditAppointment() {
  const [patient, setPatient, pets] = useOutletContext();

  useEffect(() => {
    if (patient.pets?.length !== pets.length) {
      getPatientDetails(patient.id)
        .then(({ body }) => {
          setPatient(body);
        });
    }
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-black my-3 text-center md:text-4xl lg:text-5xl">
        Edita la cita de un
        {' '}
        <span className="text-indigo-600">Paciente</span>
      </h1>
      <p className="text-lg text-center my-2">
        Edita los datos de la cita
        {' '}
        <span className="text-indigo-600 font-bold">y Administrala</span>
      </p>
      <EditForm patient={patient} setPatient={setPatient} />
    </div>
  );
}

export default EditAppointment;
