import React from 'react';
import { Link } from 'react-router-dom';
import Wave from '../components/Wave';

function SignIn() {
  return (
    <div>
      <div className="container  p-4 w-full h-screen mx-auto">
        <h1 className="text-4xl font-black text-indigo-600 mt-10 text-center md:text-6xl">
          Veterinary
          {' '}
          <span className="text-black">App</span>
        </h1>
        <p className="text-center mt-4">
          Ingresa los datos para crear tu
          {' '}
          <span className="text-indigo-600 font-bold">usuario</span>
        </p>
        <form className="shadow-md w-full mt-10 mx-auto p-2 bg-white rounded-md md:w-4/5 lg:w-1/2">
          <label htmlFor="username" aria-controls="username">
            <p className="uppercase font-bold text-gray-400">
              Nombre de usuario
            </p>
            <input
              className="p-3 my-3 w-full rounded-md border border-gray-500"
              id="username"
              type="text"
              placeholder="Usuario"
            />
          </label>
          <label htmlFor="email" aria-controls="email">
            <p className="uppercase font-bold text-gray-400">
              Correo Electrónico
            </p>
            <input
              className="p-3 my-3 w-full rounded-md border border-gray-500"
              id="email"
              type="email"
              placeholder="Email"
            />
          </label>
          <label htmlFor="password" aria-controls="password">
            <p className="uppercase font-bold text-gray-400">Contraseña</p>
            <input
              className="p-3 my-3 w-full rounded-md border border-gray-500"
              id="password"
              type="password"
              placeholder="Contraseña"
            />
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
        </form>
      </div>
      <Wave />
    </div>
  );
}

export default SignIn;
