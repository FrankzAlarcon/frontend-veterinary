import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();
  const isSelected = (path) => {
    const styles = 'bg-violet-400 uppercase font-black text-white shadow-md';
    if (location.pathname === path) {
      return styles;
    }
    return 'bg-white sm:font-semibold';
  };
  return (
    <div className="md:flex">
      <nav className="flex justify-evenly py-4 bg-indigo-600 md:h-screen md:pt-10 md:p-4 md:w-1/4 md:flex-col md:justify-start md:gap-y-10 md:items-center">
        <Link
          className={`${isSelected('/')} link `}
          to="/"
        >
          Mis Pacientes
        </Link>
        <Link
          className={`${isSelected('/new-patient')} link`}
          to="/new-patient"
        >
          Nuevo Paciente
        </Link>
        <Link
          className={`${isSelected('/tasks')} link`}
          to="/tasks"
        >
          Mis Tareas
        </Link>
      </nav>
      <div className="md:w-3/4 p-5">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
