import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatMoney } from '../helpers';

function Appointment({ appointment }) {
  return (
    <div className="w-full bg-slate-100 rounded-md my-3 shadow-md p-2 md:flex md:gap-x-5 lg:px-4 lg:py-3">
      <div className="space-y-1 w-full">
        <p className="font-semibold">
          <span className="uppercase text-gray-400 font-bold">Fecha: </span>
          {formatDate(appointment.date)}
        </p>
        <p className="font-semibold">
          <span className="uppercase text-gray-400 font-bold">Mascota: </span>
          {appointment.pet.petName}
        </p>
        <p className="font-semibold">
          <span className="uppercase text-gray-400 font-bold">Tipo de animal: </span>
          {appointment.pet.animalType}
        </p>
        <p className="font-semibold">
          <span className="uppercase text-gray-400 font-bold">Síntomas: </span>
          {appointment.symptoms}
        </p>
        <p className="font-semibold">
          <span className="uppercase text-gray-400 font-bold">Estado: </span>
          {appointment.isCompleted ? 'Completado' : 'Pendiente'}
        </p>
        <p className="font-semibold">
          <span className="uppercase text-gray-400 font-bold">Receta médica: </span>
          {appointment.prescription}
        </p>
        <p className="font-semibold">
          <span className="uppercase text-gray-400 font-bold">Precio: </span>
          {formatMoney(appointment.price)}
        </p>
      </div>
      <div className="flex justify-evenly py-2 w-full md:flex-col md:w-1/3 md:space-y-2">
        <Link
          to="/tasks"
          className="p-2 text-center bg-indigo-500 rounded-md uppercase font-bold text-white hover:bg-indigo-700 transition-colors"
          type="button"
          aria-controls="button"
        >
          Editar
        </Link>
      </div>
    </div>
  );
}

export default Appointment;
