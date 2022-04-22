import React from 'react';

function Alert({ type, children }) {
  return (
    <p
      className={`${
        type === 'error' ? 'bg-red-600' : 'bg-yellow-500 md:w-4/5 lg:w-1/2'
      } p-2 uppercase font-bold text-white text-center mx-auto my-2`}
    >
      {children}
    </p>
  );
}

export default Alert;
