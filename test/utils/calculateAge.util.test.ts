import { calculateAge } from '../../src/utils/calculateAge.util';

describe('calculateAge', () => {
  it('should calculate the age based on a birthdate', () => {
    const birthdate = '2001/01/01';
    const age = calculateAge(birthdate);
    const currentYear = new Date().getFullYear();
    const hasHadBirthday = new Date().getMonth() > 0 || (new Date().getMonth() === 0 && new Date().getDate() >= 1);
    const expectedAge = hasHadBirthday ? currentYear - 2001 : currentYear - 2001 - 1;
    expect(age).toEqual(expectedAge);
  });
});

