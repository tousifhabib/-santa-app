/**
 * Submit router module
 * @module submit/routes
 */

import { Router } from 'express';

import { submitRequest } from '../controllers/submit.controller';

const router = Router();

/**
 * Route serving submit request
 * @name post/
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/', submitRequest);

export default router;
