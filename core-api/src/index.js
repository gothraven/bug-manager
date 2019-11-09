import { port, env } from './config/vars';
import logger from './config/logger';
import legacy from './config/legacy';
import server from './config/server';
import mongoose from './config/mongoose';

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// open mongoose connection
mongoose.connect();

server.express.use('/legacy', legacy);

server.start(port, () => logger.info(`server started on port ${port} (${env})`));
