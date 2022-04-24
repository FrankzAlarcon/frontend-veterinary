import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate, formatMoney } from '../helpers';
import Alert from './Alert';

function Appointment({
  appointment, handleCompleteAppointment, isCompleting, appointmentCompletingId,
  handleCancel, setPriceInput, handleSaveAppointment,
  setPrescriptionInput, priceInput, prescriptionInput, error,
}) {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-slate-100 rounded-md my-3 shadow-md p-2 ">
      <div className="md:flex md:gap-x-5 lg:px-4 lg:py-3">
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
          {appointment.isCompleted && (
          <>
            <p className="font-semibold">
              <span className="uppercase text-gray-400 font-bold">Receta médica: </span>
              {appointment.prescription}
            </p>
            <p className="font-semibold">
              <span className="uppercase text-gray-400 font-bold">Precio: </span>
              {formatMoney(appointment.price)}
            </p>
          </>
          )}
        </div>
        {
        (isCompleting && appointmentCompletingId === appointment.id) && (
          <div className="md:hidden">
            <label htmlFor="presciption">
              <p className="uppercase text-gray-400 font-bold text-center">Receta: </p>
              <textarea
                id="presciption"
                className="border-2 w-full rounded-md p-2"
                onChange={(e) => setPrescriptionInput(e.target.value)}
                value={prescriptionInput}
              />
            </label>
            <label htmlFor="price">
              <span className="uppercase text-gray-400 font-bold text-center">Precio: </span>
              <input
                id="price"
                type="number"
                step="0.01"
                className="border-2  rounded-md p-2"
                onChange={(e) => setPriceInput(e.target.value)}
                value={priceInput}
              />
            </label>
            {error && <Alert type="error">Los campos son obligatorios</Alert>}
          </div>
        )
        }
        {
        !appointment.isCompleted && (
          <div className="flex justify-evenly py-2 w-full md:flex-col md:w-1/3 md:space-y-2">
            <button
              type="button"
              className="p-2 text-center bg-lime-500 rounded-md uppercase font-bold text-white hover:bg-lime-400 transition-colors"
              aria-controls="button"
              onClick={(isCompleting && appointmentCompletingId === appointment.id)
                ? () => handleSaveAppointment(appointment.id)
                : () => handleCompleteAppointment(appointment.id)}
            >
              {(isCompleting && appointmentCompletingId === appointment.id) ? 'Guardar' : 'Completar'}
            </button>
            <button
              className={`p-2 text-center  rounded-md uppercase font-bold text-white  transition-colors ${(isCompleting && appointmentCompletingId === appointment.id) ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-500 hover:bg-indigo-700'}`}
              type="button"
              aria-controls="button"
              onClick={(isCompleting && appointmentCompletingId === appointment.id)
                ? handleCancel : () => navigate(`edit-appointment/${appointment.id}`)}
            >
              {(isCompleting && appointmentCompletingId === appointment.id) ? 'Cancelar' : 'Editar'}
            </button>
          </div>
        )
      }
      </div>
      {
        (isCompleting && appointmentCompletingId === appointment.id) && (
        <div className="md:flex md:flex-col md:items-center hidden">
          <label htmlFor="presciption" className="my-2 block md:w-3/4 lg:w-1/2">
            <p className="uppercase text-gray-400 font-bold text-center">Receta: </p>
            <textarea
              id="presciption"
              className="border-2 w-full rounded-md p-2 block md:mx-auto"
              onChange={(e) => setPrescriptionInput(e.target.value)}
              value={prescriptionInput}
            />
          </label>
          <label htmlFor="price">
            <span className="uppercase text-gray-400 font-bold text-center">Precio: </span>
            <input
              id="price"
              type="number"
              step="0.01"
              className="border-2  rounded-md p-2"
              onChange={(e) => setPriceInput(e.target.value)}
              value={priceInput}
            />
          </label>
          {error && <Alert type="error">Los campos son obligatorios</Alert>}
        </div>
        )
        }
    </div>
  );
}

export default Appointment;
