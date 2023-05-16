/**
 * Structure of the UserProfile
 * @typedef {Object} UserProfile
 * @property {string} userUid - The user's unique ID
 * @property {string} address - The user's address
 * @property {string} birthdate - The user's birthdate
 */
export interface UserProfile {
    userUid: string;
    address: string;
    birthdate: string;
}
