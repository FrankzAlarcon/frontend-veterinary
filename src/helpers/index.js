export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
  });
}

export function formatDateUS(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export function formatMoney(number) {
  return number.toLocaleString('en-US', {
    currency: 'USD',
    style: 'currency',
  });
}
