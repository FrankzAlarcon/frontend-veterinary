import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.all';
import Alert from '../components/Alert';
import Patient from '../components/Patient';
import Searcher from '../components/Searcher';
import useUserValues from '../hooks/useUserValues';

function PatientList() {
  const { user } = useUserValues();
  const [patients, setPatients] = useState([]);
  const [input, setInput] = useState('');
  useEffect(() => {
    if (Object.keys(patients).length === 0) {
      const getPatientsOfVeterinary = async () => {
        const response = await window.fetch(`${import.meta.env.VITE_API_URL}/veterinarians/${user.id}/patients`);
        const { body } = await response.json();
        setPatients(body);
      };
      getPatientsOfVeterinary();
    }
  }, []);

  const handleDelete = (id, name) => {
    Swal.fire({
      title: `¿Seguro quieres eliminar a ${name}?`,
      text: 'No podrás recuperar este registro!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newPatients = patients.filter((patient) => patient.id !== id);
        setPatients(newPatients);
        Swal.fire(
          'Eliminado!',
          `${name} ha sido eliminado con exito`,
          'success',
        );
        await window.fetch(`${import.meta.env.VITE_API_URL}/patients/${id}`, {
          method: 'DELETE',
        });
      }
    });
  };

  const filteredPatients = patients
    .filter((patient) => patient.name.toLowerCase().includes(input.toLowerCase()));

  return (
    <div>
      <h1 className="text-3xl font-black my-3 text-center md:text-4xl lg:text-5xl">
        Listado de
        {' '}
        <span className="text-indigo-600">Pacientes</span>
      </h1>
      <p className="text-lg text-center my-2">
        Administra tus
        {' '}
        <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
      </p>
      <Searcher input={input} setInput={setInput} placeholder="Escribe el nombre del propietario" />
      <div>
        {patients.length === 0 && (
        <div
          className="w-full text-center"
        >
          <h2 className="font-black text-xl my-5">No existen registros de pacientes</h2>
          <Link
            to="/new-patient"
            className="bg-indigo-600 hover:bg-indigo-700 transition-colors p-2 uppercase text-white font-bold text-center"
          >
            Añadir paciente
          </Link>
        </div>
        )}
        {
          filteredPatients.length === 0 && patients.length > 0 ? (
            <Alert>
              No existen resultados para:
              {' '}
              {input}
            </Alert>
          )
            : filteredPatients.map((patient) => (
              <Patient key={patient.id} patient={patient} handleDelete={handleDelete} />
            ))
        }
      </div>
    </div>
  );
}

export default PatientList;
