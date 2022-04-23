export const getPatientDetails = async (id) => {
  const response = await window.fetch(`${import.meta.env.VITE_API_URL}/patients/${id}`);
  const { error, body } = await response.json();
  return { error, body };
};
