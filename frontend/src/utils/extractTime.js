export function extractTime(dateString) {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
//   console.log({hours})
  const minutes = padZero(date.getMinutes());
//   console.log({minutes})

  return `${hours}:${minutes}`;
}

function padZero(number) {
  return number.toString().padStart(2, "0");
}
