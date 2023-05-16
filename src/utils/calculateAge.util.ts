import logger from '../middlewares/logger.middleware';

/**
 * Calculate the age of a user based on their birthdate
 * @param {string} birthdate - The birthdate of the user in the format YYYY/MM/DD
 * @returns {number} The calculated age of the user
 */
export function calculateAge(birthdate: string): number {
  const [year, month, day] = birthdate.split('/').map(Number);
  const now = new Date();
  const thisYear = now.getFullYear();
  let age = thisYear - year;
  if (now.getMonth() < month - 1 || (now.getMonth() === month - 1 && now.getDate() < day)) {
    age--;
  }
  logger.info(`Calculated age as ${age}`);
  return age;
}
