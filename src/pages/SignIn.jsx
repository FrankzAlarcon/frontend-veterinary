import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2/dist/sweetalert2.all';
import Wave from '../components/Wave';
import { registerSchema } from '../schemas';
import Alert from '../components/Alert';

function SignIn() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const {
        name, email, password, repeatPassword,
      } = values;
      if (password !== repeatPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }
      const response = await window.fetch(`${import.meta.env.VITE_API_URL}/veterinarians/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const { error: errorResponse, message } = await response.json();
      if (errorResponse) {
        setError(message);
        return;
      }
      Swal.fire({
        title: 'Usuario registrado!',
        text: 'Ahora inicia sesion con tu usuario',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/login');
      });
      resetForm();
      setError('');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div className="container  p-4 w-full h-screen mx-auto">
        <h1 className="text-4xl font-black text-indigo-600 mt-10 text-center md:text-6xl">
          Veterinary
          {' '}
          <span className="text-black">App</span>
        </h1>
        <p className="text-center mt-4 mb-5">
          Ingresa los datos para crear tu
          {' '}
          <span className="text-indigo-600 font-bold">usuario</span>
        </p>
        <Formik
          initialValues={{
            name: '', email: '', password: '', repeatPassword: '',
          }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched }) => (
            <>
              {error && <Alert>{error}</Alert>}
              <Form className="shadow-md w-full mx-auto p-2 bg-white rounded-md md:w-4/5 lg:w-1/2">
                <label htmlFor="username" aria-controls="username">
                  <p className="uppercase font-bold text-gray-400">
                    Nombre de usuario
                  </p>
                  <Field
                    className="p-3 my-3 w-full rounded-md border border-gray-500"
                    id="username"
                    name="name"
                    value={values.name}
                    type="text"
                    placeholder="Usuario"
                  />
                  {errors.name && touched.name && <Alert>{errors.name}</Alert>}
                </label>
                <label htmlFor="email" aria-controls="email">
                  <p className="uppercase font-bold text-gray-400">
                    Correo Electrónico
                  </p>
                  <Field
                    className="p-3 my-3 w-full rounded-md border border-gray-500"
                    id="email"
                    name="email"
                    value={values.email}
                    type="email"
                    placeholder="Email"
                  />
                  {errors.email && touched.email && <Alert>{errors.email}</Alert>}

                </label>
                <label htmlFor="password" aria-controls="password">
                  <p className="uppercase font-bold text-gray-400">Contraseña</p>
                  <Field
                    className="p-3 my-3 w-full rounded-md border border-gray-500"
                    id="password"
                    name="password"
                    value={values.password}
                    type="password"
                    placeholder="Contraseña"
                  />
                  {errors.password && touched.password && <Alert>{errors.password}</Alert>}
                </label>
                <label htmlFor="repeat-password" aria-controls="repeat-password">
                  <p className="uppercase font-bold text-gray-400">Repetir Contraseña</p>
                  <Field
                    className="p-3 my-3 w-full rounded-md border border-gray-500"
                    id="repeat-password"
                    name="repeatPassword"
                    value={values.repeatPassword}
                    type="password"
                    placeholder="Repetir Contraseña"
                  />
                  {errors.repeatPassword && touched.repeatPassword
                && <Alert>{errors.repeatPassword}</Alert>}
                </label>
                <input
                  type="submit"
                  value="Registrarse"
                  className="w-full bg-indigo-600 p-2 mt-2 cursor-pointer transition-colors hover:bg-indigo-700 uppercase font-bold text-white"
                />
                <p className="text-center mt-5">
                  ¿Ya tienes una cuenta?
                  {' '}
                  <Link to="/login"><span className="text-indigo-600 font-bold inline-block max-w-max">Ingresa Aquí</span></Link>
                </p>
              </Form>
            </>
          )}
        </Formik>
      </div>
      <Wave />
    </div>
  );
}

export default SignIn;
