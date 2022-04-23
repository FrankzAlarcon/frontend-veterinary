import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.all';
import Alert from './Alert';
import Spinner from './Spinner';
import { formatDateInput, formatDateUS } from '../helpers';
import { newPatientSchema } from '../schemas';
import useUserValues from '../hooks/useUserValues';

function EditForm({ patient }) {
  const { setRefreshPatient, refreshPatient } = useUserValues();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { appointmentId } = useParams();
  const [editPatient, setEditPatient] = useState({});
  const [newPet, setNewPet] = useState(false);
  const [petNameInput, setPetNameInput] = useState('');
  const [animalTypeInput, setAnimalTypeInput] = useState('');

  useEffect(() => {
    if (Object.keys(patient).length > 0) {
      if (appointmentId) {
        const appointment = patient.appointments
          ?.find((appoint) => appoint.id === Number(appointmentId)) ?? {};
        setEditPatient({
          name: patient.name,
          email: patient.email,
          petName: appointment.pet?.petName,
          petSelected: appointment.pet?.id,
          animalType: appointment.pet?.animalType,
          date: formatDateInput(appointment.date),
          symptoms: appointment.symptoms,
        });
      } else {
        setEditPatient({
          name: patient.name,
          email: patient.email,
          petName: patient.pets[0]?.petName,
          petSelected: patient.pets[0]?.id,
          animalType: patient.pets[0]?.animalType,
          date: formatDateInput(new Date()),
          symptoms: '',
        });
        // Modificar el handle submit para
        // crear el nuevo appointment, considerar si se crea nueva mascota
      }
    }
  }, [patient]);

  const handleSelectPet = (e) => {
    const petId = Number(e.target.value);
    const { petName, animalType } = patient.pets.find((petItem) => petItem.id === petId);
    setEditPatient({
      ...editPatient, petSelected: petId, petName, animalType,
    });
  };

  const handleCancelNewPet = () => {
    setNewPet(false);
    setAnimalTypeInput('');
    setPetNameInput('');
    setError(false);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      if ((!petNameInput || !animalTypeInput) && newPet) {
        setTimeout(() => setError(false), 3000);
        return setError(true);
      }
      setLoading(true);
      const { petSelected } = editPatient;
      const changes = {
        symptoms: values.symptoms,
        date: formatDateUS(values.date),
      };
      const appointment = patient.appointments
        .find((appoint) => appoint.id === Number(appointmentId));
      if (petSelected !== appointment.pet.id) {
        changes.petId = petSelected;
      }
      if (newPet) {
        const responseNewPet = await window.fetch(`${import.meta.env.VITE_API_URL}/patients/${patient.id}/pets`, {
          method: 'POST',
          body: JSON.stringify({ petName: petNameInput, animalType: animalTypeInput }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const { body: bodyNewPet } = await responseNewPet.json();
        changes.petId = bodyNewPet.id;
      }
      await window.fetch(`${import.meta.env.VITE_API_URL}/appointments/${Number(appointmentId)}`, {
        method: 'PATCH',
        body: JSON.stringify(changes),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      return Swal.fire(
        'Se han guardado los cambios!',
        '',
        'success',
      ).then(() => {
        setRefreshPatient(!refreshPatient);
        navigate(`/patient/${patient.id}`);
        resetForm();
      });
    } catch (e) {
      return console.log(e);
    }
  };
  return (
    <div>
      <Formik
        initialValues={{
          name: editPatient.name ?? '',
          email: editPatient.email ?? '',
          petName: editPatient.petName ?? '',
          petSelected: editPatient.petName ?? '',
          animalType: editPatient.animalType ?? '',
          date: editPatient.date ?? '2024-05-15T15:30',
          symptoms: editPatient.symptoms ?? '',
        }}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={newPatientSchema}
      >
        {
            ({ values, touched, errors }) => (
              <Form>
                <p className="uppercase font-black my-2 text-center text-lg lg:text-xl">Datos del Propietario</p>
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-3">
                  <label htmlFor="name">
                    <p className="uppercase text-gray-700 font-bold my-2">Nombre del propietario</p>
                    <Field
                      className="w-full p-2 border-2 rounded-md"
                      id="name"
                      name="name"
                      placeholder="Nombre del propietario"
                      type="text"
                      value={values.name}
                      disabled
                    />
                    {errors.name && touched.name && <Alert type="error">{errors.name}</Alert>}
                  </label>
                  <label htmlFor="email">
                    <p className="uppercase text-gray-700 font-bold my-2">Email</p>
                    <Field
                      className="w-full p-2 border-2 rounded-md"
                      id="email"
                      name="email"
                      placeholder="Email del propietario"
                      type="email"
                      value={values.email}
                      disabled
                    />
                    {errors.email && touched.email && <Alert type="error">{errors.email}</Alert>}
                  </label>
                </div>
                <p className="uppercase font-black mt-4 text-center text-lg lg:text-xl">Datos de la Mascota</p>
                <Field as="select" className="w-full p-2 border-2" value={editPatient.petSelected} id="pet-selected" onChange={handleSelectPet}>
                  <option disabled>--Selecionar Mascota--</option>
                  {
                    patient.pets?.map((pet) => (
                      <option key={pet.id} value={pet.id}>{pet.petName}</option>
                    ))
                  }
                </Field>
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-3">
                  <label htmlFor="petName">
                    <p className="uppercase text-gray-700 font-bold my-2">Nombre Mascota</p>
                    <Field
                      className="w-full p-2 border-2 rounded-md"
                      id="petName"
                      name="petName"
                      placeholder="Nombre de la Mascota"
                      type="text"
                      onChange={(e) => setPetNameInput(e.target.value)}
                      value={newPet ? petNameInput : values.petName}
                      disabled={!newPet}
                    />
                    {error && <Alert type="error">El nombre de la mascota es obligatorio</Alert>}
                  </label>
                  <label htmlFor="animalType">
                    <p className="uppercase text-gray-700 font-bold my-2">Tipo de animal</p>
                    <Field
                      className="w-full p-2 border-2 rounded-md"
                      id="animalType"
                      name="animalType"
                      placeholder="Tipo de animal"
                      type="text"
                      onChange={(e) => setAnimalTypeInput(e.target.value)}
                      value={newPet ? animalTypeInput : values.animalType}
                      disabled={!newPet}
                    />
                    {error && <Alert type="error">El tipo de animal es obligatorio</Alert>}
                  </label>
                </div>
                <button
                  type="button"
                  className={`${newPet ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'} w-full p-2 uppercase text-white  my-3 font-bold cursor-pointer  transition-colors`}
                  onClick={newPet ? handleCancelNewPet : () => setNewPet(true)}
                >
                  {newPet ? 'Cancelar' : 'Nueva mascota'}
                </button>
                <p className="uppercase font-black mt-4 text-center text-lg lg:text-xl">Datos de la Cita</p>
                <div>
                  <label htmlFor="date">
                    <p className="uppercase text-gray-700 font-bold my-2">Fecha de la cita</p>
                    <Field
                      className="w-full p-2 border-2 rounded-md"
                      id="date"
                      type="datetime-local"
                      name="date"
                      value={values.date}
                    />
                    {errors.date && touched.date && <Alert type="error">{errors.date}</Alert>}
                  </label>
                  <label htmlFor="symptoms">
                    <p className="uppercase text-gray-700 font-bold my-2">Síntomas</p>
                    <Field
                      className="w-full p-2 border-2 rounded-md"
                      id="symptoms"
                      as="textarea"
                      placeholder="Síntomas"
                      name="symptoms"
                      value={values.symptoms}
                    />
                    {errors.symptoms && touched.symptoms && <Alert type="error">{errors.symptoms}</Alert>}
                  </label>
                </div>
                {
                  loading ? <Spinner /> : (
                    <input
                      className="w-full p-2 uppercase text-white bg-indigo-600 my-3 font-bold cursor-pointer hover:bg-indigo-700 transition-colors"
                      type="submit"
                      value="Guardar Cambios"
                    />
                  )
                }
              </Form>
            )
          }
      </Formik>
    </div>
  );
}

export default EditForm;
