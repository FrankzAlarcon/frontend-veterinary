import React from 'react';

function Patient({ appointment }) {
  return (
    <div>{appointment.symptoms}</div>
  );
}

export default Patient;
