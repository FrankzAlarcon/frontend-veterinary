import React from 'react';

function Add({ onClick }) {
  return (
    <button type="button" onClick={onClick} aria-controls="button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 md:h-20 md:w-20 hover:scale-110 transition-transform"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          className="fill-yellow-400 hover:fill-yellow-500 transition-colors"
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}

export default Add;
