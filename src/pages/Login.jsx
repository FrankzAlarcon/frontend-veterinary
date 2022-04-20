import React from 'react';
import { Link } from 'react-router-dom';
import Wave from '../components/Wave';

function Login() {
  return (
    <>
      <div className="container  p-4 w-full h-screen mx-auto">
        <h1 className="text-4xl font-black text-indigo-600 mt-10 text-center md:text-6xl">
          Veterinary
          {' '}
          <span className="text-black">App</span>
        </h1>
        <p className="text-center mt-4">
          Ingresa tu usuario y
          {' '}
          <span className="text-indigo-600 font-bold">contraseña</span>
        </p>
        <form className="shadow-md w-full mt-10 mx-auto p-2 bg-white rounded-sm md:w-4/5 lg:w-1/2">
          <label htmlFor="email" aria-controls="email">
            <input
              className="p-3 my-3 w-full rounded-md border border-gray-500"
              id="email"
              type="email"
              placeholder="Email"
            />
          </label>
          <label htmlFor="password" aria-controls="password">
            <input
              className="p-3 my-3 w-full rounded-md border border-gray-500"
              id="password"
              type="password"
              placeholder="Contraseña"
            />
          </label>
          <input
            type="submit"
            value="Iniciar Sesión"
            className="w-full bg-indigo-600 p-2 mt-2 cursor-pointer transition-colors hover:bg-indigo-700 uppercase font-bold text-white"
          />
        </form>
        <p className="text-center mt-5">
          ¿Aún no tienes una cuenta?
          {' '}
          <Link to="/register"><span className="text-indigo-600 font-bold inline-block max-w-max">Registrate Aquí</span></Link>
        </p>
      </div>
      <Wave />
    </>
  );
}

export default Login;
