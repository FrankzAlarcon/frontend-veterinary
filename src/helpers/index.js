export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
  });
}

export function formatMoney(number) {
  return number.toLocaleString('en-US', {
    currency: 'USD',
    style: 'currency',
  });
}
