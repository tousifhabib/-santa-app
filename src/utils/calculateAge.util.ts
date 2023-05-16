import logger from '../middlewares/logger.middleware';

export function calculateAge(birthdate: string): number {
  const birthDateCorrected = birthdate.split('/').reverse().join('-');
  const age = new Date().getFullYear() - new Date(birthDateCorrected).getFullYear();
  logger.info(`Calculated age as ${age}`);
  return age;
}
