/**
 * Index router module
 * @module index/routes
 */

import { Router } from 'express';

import { getIndex } from '../controllers/index.controller';

const router = Router();

/**
 * Route serving index page
 * @name get/
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', getIndex);

export default router;
