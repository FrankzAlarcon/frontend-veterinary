import React from 'react';
import { Link } from 'react-router-dom';
import Wave from '../components/Wave';

function NotFound() {
  return (
    <div>
      <div className="grid w-full md:w-3/4 md:mx-auto lg:w-1/2 h-screen place-items-center p-2">
        <div className="w-full bg-white uppercase text-center font-bold shadow-md rounded-md space-y-5 p-2">
          <p className="text-6xl">Opps!</p>
          <p className="text-3xl">Pagina no encontrada</p>
          <Link to=".." className="bg-indigo-900 hover:bg-indigo-700 w-full p-2 block text-white rounded-md">Regresar</Link>
        </div>
      </div>
      <Wave />
    </div>
  );
}

export default NotFound;
