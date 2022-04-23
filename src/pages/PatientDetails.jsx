/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.all';
import Appointment from '../components/Appointment';
import { formatMoney } from '../helpers';

function PatientDetails() {
  const { id } = useParams();
  const [patient, setPatient] = useState({});
  const [filter, setFilter] = useState('pendientes');
  const [isCompleting, setIsCompleting] = useState(false);
  const [prescriptionInput, setPrescriptionInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [appointmentCompletingId, setAppointmentCompletingId] = useState(0);
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
  const handleCompleteAppointment = (appointmentId) => {
    setAppointmentCompletingId(appointmentId);
    setIsCompleting(true);
    if (priceInput && prescriptionInput) {
      Swal.fire({
        title: 'Confirmación',
        html: `<p><span style="font-weight: bold">Receta:</span> ${prescriptionInput}</p>
        <p><span style="font-weight: bold">Precio:</span>: ${formatMoney(Number(priceInput))}</p>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, guardar!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const responseComplete = await window.fetch(`${import.meta.env.VITE_API_URL}/appointments/${appointmentId}`, {
            method: 'PATCH',
            body: JSON.stringify({
              prescription: prescriptionInput,
              isCompleted: true,
              price: Number(priceInput),
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const { body: bodyComplete } = await responseComplete.json();
          const responseAppointment = await window.fetch(`${import.meta.env.VITE_API_URL}/appointments/${bodyComplete.id}`);
          Swal.fire(
            'Guardado!',
            'Se ha completado la cita',
            'success',
          );
          const { body: bodyAppointment } = await responseAppointment.json();
          const { appointments } = patient;
          const newAppointments = appointments.map((appointment) => (appointment.id === bodyAppointment.id ? bodyAppointment : appointment));
          const newPat = { ...patient, appointments: newAppointments };
          setPatient(newPat);

          setAppointmentCompletingId(0);
          setIsCompleting(false);
          setPrescriptionInput('');
          setPriceInput('');
        }
      });
    } else {
      console.log('no has escrito nada');
    }
  };
  const handleCancel = () => {
    setAppointmentCompletingId(0);
    setIsCompleting(false);
    setPrescriptionInput('');
    setPriceInput('');
  };
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
          <span className="uppercase text-gray-400 font-bold">Email: </span>
          {patient.email}
        </p>
        <div className="font-semibold">
          <span className="uppercase text-gray-400 font-bold text-center block my-2">Mascota(s): </span>
          <table className="mx-auto border-collapse border-2 w-full md:w-4/5 lg:w-1/2">
            <thead className="border-b-2">
              <tr className="uppercase bg-blue-800 text-white">
                <th className="py-2 px-4 font-black">Nombre</th>
                <th className="p-2 border-l-2 font-black">Tipo Animal</th>
              </tr>
            </thead>
            <tbody>
              {
                  patient.pets?.map((pet) => (
                    <tr key={pet.id} className="border-b-2">
                      <td className="p-2">{pet.petName}</td>
                      <td className="border-l-2 p-2">{pet.animalType}</td>
                    </tr>
                  ))
                }
            </tbody>
          </table>
        </div>
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
                <Appointment
                  key={appointment.id}
                  appointment={appointment}
                  handleCompleteAppointment={handleCompleteAppointment}
                  isCompleting={isCompleting}
                  appointmentCompletingId={appointmentCompletingId}
                  handleCancel={handleCancel}
                  setPrescriptionInput={setPrescriptionInput}
                  setPriceInput={setPriceInput}
                  prescriptionInput={prescriptionInput}
                  priceInput={priceInput}
                />
              ))
          }
        </div>
      </div>
    </div>
  );
}

export default PatientDetails;
