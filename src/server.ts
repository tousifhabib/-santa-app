import app from './app';
import logger from './middlewares/logger.middleware';

/**
 * Starts the app on a specific port
 */
const listener = app.listen(Number(process.env.APP_PORT) || 3000, () => {
  const address = listener.address();
  if (typeof address === 'object' && address !== null) {
    logger.info('Your app is listening on port ' + address.port);
  }
});
