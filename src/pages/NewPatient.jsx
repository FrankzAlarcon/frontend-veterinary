import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2/dist/sweetalert2.all';
import { useNavigate } from 'react-router-dom';
import { newPatientSchema } from '../schemas';
import Alert from '../components/Alert';
import useUserValues from '../hooks/useUserValues';
import { formatDateUS } from '../helpers';
import Spinner from '../components/Spinner';

function NewPatient() {
  const navigate = useNavigate();
  const { user } = useUserValues();
  const [loading, setLoading] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    email: '',
    petName: '',
    animalType: '',
    date: '',
    symptoms: '',
    isCompleted: false,
    prescription: '',
    price: 0,
  });
  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    const options = (value) => ({
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { date } = values;
    const responsePatient = await window.fetch(`${import.meta.env.VITE_API_URL}/patients`, options({ name: values.name, email: values.email }));
    const { body: bodyPatient } = await responsePatient.json();
    const responsePet = await window.fetch(`${import.meta.env.VITE_API_URL}/patients/${bodyPatient.id}/pets`, options({ petName: values.petName, animalType: values.animalType }));
    const { body: bodyPet } = await responsePet.json();
    await window.fetch(`${import.meta.env.VITE_API_URL}/appointments`, options({
      veterinarianId: user.id,
      patientId: bodyPatient.id,
      petId: bodyPet.id,
      date: formatDateUS(date),
      symptoms: values.symptoms,
      isCompleted: values.isCompleted,
    }));
    Swal.fire(
      `Se ha agregado la cita con el paciente: ${values.name}`,
      '',
      'success',
    ).then(() => {
      // navigate a details
      navigate(`/patient/${bodyPatient.id}`);
    });
    setLoading(false);
    resetForm();
  };
  return (
    <div>
      <h1 className="text-3xl font-black my-3 text-center md:text-4xl lg:text-5xl">
        Registra un nuevo
        {' '}
        <span className="text-indigo-600">Paciente</span>
      </h1>
      <p className="text-lg text-center my-2">
        Añade tus pacientes
        {' '}
        <span className="text-indigo-600 font-bold">y Administralos</span>
      </p>
      <div className="w-full bg-white rounded-md p-2 lg:px-5">
        <Formik
          initialValues={{
            name: newPatient.name,
            email: newPatient.email,
            petName: newPatient.petName,
            animalType: newPatient.animalType,
            date: newPatient.date,
            symptoms: newPatient.symptoms,
            isCompleted: newPatient.isCompleted,
            prescription: newPatient.prescription,
            price: newPatient.price,
          }}
          onSubmit={handleSubmit}
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
                    />
                    {errors.email && touched.email && <Alert type="error">{errors.email}</Alert>}
                  </label>
                </div>
                <p className="uppercase font-black mt-4 text-center text-lg lg:text-xl">Datos de la Mascota</p>
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-3">
                  <label htmlFor="petName">
                    <p className="uppercase text-gray-700 font-bold my-2">Nombre Mascota</p>
                    <Field
                      className="w-full p-2 border-2 rounded-md"
                      id="petName"
                      name="petName"
                      placeholder="Nombre de la Mascota"
                      type="text"
                      value={values.petName}
                    />
                    {errors.petName && touched.petName && <Alert type="error">{errors.petName}</Alert>}
                  </label>
                  <label htmlFor="animalType">
                    <p className="uppercase text-gray-700 font-bold my-2">Tipo de animal</p>
                    <Field
                      className="w-full p-2 border-2 rounded-md"
                      id="animalType"
                      name="animalType"
                      placeholder="Tipo de animal"
                      type="text"
                      value={values.animalType}
                    />
                    {errors.animalType && touched.animalType && <Alert type="error">{errors.animalType}</Alert>}
                  </label>
                </div>
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
                      value="Agregar paciente"
                    />
                  )
                }
              </Form>
            )
          }
        </Formik>
      </div>
    </div>
  );
}

export default NewPatient;
