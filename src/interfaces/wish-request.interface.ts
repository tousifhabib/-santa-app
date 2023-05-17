/**
 * Structure of the wish request
 * @typedef {Object} WishRequest
 * @property {string} username - The user's name
 * @property {string} address - The user's address
 * @property {string} wish - The user's wish
 */
export interface WishRequest {
  username: string;
  address: string;
  wish: string;
}