import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Wave from '../components/Wave';
import { loginSchema } from '../schemas';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import useUserValues from '../hooks/useUserValues';

function Login() {
  const [error, setError] = useState('');
  const { setUser, user, setTasks } = useUserValues();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      navigate('/');
    }
  });
  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const response = await window.fetch(`${import.meta.env.VITE_API_URL}/veterinarians/login`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { error: errorFetch, body, message } = await response.json();
      if (errorFetch) {
        return setError(message);
      }
      const { isLogged, key } = body;
      if (!isLogged) {
        return setError('El usuario o contraseña no son correctos');
      }
      const responseUser = await window.fetch(`${import.meta.env.VITE_API_URL}/veterinarians/${key}`);
      const { body: userBody } = await responseUser.json();
      setUser(userBody);
      navigate('/');
      setError('');
      const responseTasks = await window.fetch(`${import.meta.env.VITE_API_URL}/veterinarians/${key}/tasks`);
      const { body: tasksBody } = await responseTasks.json();
      setTasks(tasksBody);
      return resetForm();
    } catch (e) {
      setError('Hemos tenido problemas. Por favor, Intentalo más tarde');
      return console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="container  p-4 w-full h-screen mx-auto">
        <h1 className="text-4xl font-black text-indigo-600 mt-10 text-center md:text-6xl">
          Veterinary
          {' '}
          <span className="text-black">App</span>
        </h1>
        <p className="text-center mt-4  mb-10">
          Ingresa tu usuario y
          {' '}
          <span className="text-indigo-600 font-bold">contraseña</span>
        </p>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({
            values, touched, errors,
          }) => (
            <>
              {loading && <Spinner />}
              {error && !loading && <Alert type="error">{error}</Alert>}
              <Form className="shadow-md w-full mx-auto p-2 bg-white rounded-sm md:w-4/5 lg:w-1/2">
                <label htmlFor="email" aria-controls="email">
                  <Field
                    className="p-3 my-3 w-full rounded-md border border-gray-500"
                    id="email"
                    type="email"
                    name="email"
                    value={values.email}
                    placeholder="Email"
                  />
                  {(touched.email && errors.email) && <Alert type="error">{errors.email}</Alert> }
                </label>
                <label htmlFor="password" aria-controls="password">
                  <Field
                    className="p-3 my-3 w-full rounded-md border border-gray-500"
                    id="password"
                    type="password"
                    name="password"
                    value={values.password}
                    placeholder="Contraseña"
                  />
                  {(touched.password && errors.password) && <Alert type="error">{errors.password}</Alert> }
                </label>
                <input
                  type="submit"
                  value="Iniciar Sesión"
                  className="w-full bg-indigo-600 p-2 mt-2 cursor-pointer transition-colors hover:bg-indigo-700 uppercase font-bold text-white"
                />
                <p className="text-center mt-5">
                  ¿Aún no tienes una cuenta?
                  {' '}
                  <Link to="/register"><span className="text-indigo-600 font-bold inline-block max-w-max hover:underline">Registrate Aquí</span></Link>
                </p>
              </Form>
            </>
          )}
        </Formik>
      </div>
      <Wave />
    </>
  );
}

export default Login;
