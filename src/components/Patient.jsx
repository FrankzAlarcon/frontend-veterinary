import React from 'react';
import { Link } from 'react-router-dom';

function Patient({ patient, handleDelete }) {
  return (
    <div className="w-full bg-white rounded-md my-3 shadow-md p-2 md:flex  md:gap-x-5 lg:px-10 lg:py-3">
      <div className="space-y-1 w-full">
        <p className="font-semibold">
          <span className="uppercase text-gray-400 font-bold">Propietario: </span>
          {patient.name}
        </p>
        <p className="font-semibold">
          <span className="uppercase text-gray-400 font-bold">Mascota: </span>
          {patient.pet_name}
        </p>
        <p className="font-semibold">
          <span className="uppercase text-gray-400 font-bold">Email: </span>
          {patient.email}
        </p>
        <p className="font-semibold">
          <span className="uppercase text-gray-400 font-bold">Citas Completadas: </span>
          {patient.citas_terminadas ? patient.citas_terminadas : '0'}
        </p>
        <p className="font-semibold">
          <span className="uppercase text-gray-400 font-bold">Citas Pendientes: </span>
          {patient.citas_pendientes ? patient.citas_pendientes : '0'}
        </p>
      </div>
      <div className="flex justify-evenly py-2 w-full md:flex-col md:w-1/3 md:space-y-2">
        <Link
          to={`patient/${patient.id}`}
          className="p-2 text-center bg-yellow-400 rounded-md uppercase font-bold text-white hover:bg-yellow-500 transition-colors"
          type="button"
          aria-controls="button"
        >
          Detalles
        </Link>
        <Link
          to={`/editar/${patient.id}`}
          className="p-2 text-center bg-indigo-500 rounded-md uppercase font-bold text-white hover:bg-indigo-700 transition-colors"
          type="button"
          aria-controls="button"
        >
          Editar
        </Link>
        <button
          className="p-2  bg-red-600 rounded-md uppercase font-bold text-white hover:bg-red-700 transition-colors"
          type="button"
          aria-controls="button"
          onClick={() => handleDelete(patient.id, patient.name)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default Patient;
