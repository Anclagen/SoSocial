//------------------- dates -----------------------
export function getPastDate(days) {
  const date = new Date()
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - days);

  return previous;
}

