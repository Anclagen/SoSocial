//------------------- dates -----------------------
/**
 * Gets date x amount of days ago
 * @param {Number} days number of days in the past from current.
 * @returns returns new data() for x days ago
 */
export function getPastDate(days) {
  const date = new Date()
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - days);

  return previous;
}

/**
 * checks if date was created after x amount of days in past.
 * @param {Date} date created date
 * @param {Number} daysAgo number of days ago to check against
 * @returns true/false for filter
 */
export function isDateAfter({created}, daysAgo){
  const dateToCheck = new Date(created);
  const datePast = getPastDate(daysAgo)
  return dateToCheck >= datePast
}