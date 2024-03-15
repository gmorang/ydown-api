import * as logger from 'firebase-functions/logger';
import { onRequest } from '../../config';

const helloWorld = onRequest(async (request, response) => {
  logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

export default helloWorld;
