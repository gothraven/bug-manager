import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from 'passport';

import strategies from './passport';
import routes from '../api/rest/routes';
import error from '../api/rest/middlewares/error';
import { logs } from './vars';

/**
 * Express instance
 */
const legacy = express();

// request logging. dev: console | production: file
legacy.use(morgan(logs));

// parse body params and attache them to req.body
legacy.use(bodyParser.json());
legacy.use(bodyParser.urlencoded({ extended: true }));

// use cookieParser
legacy.use(cookieParser());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
legacy.use(methodOverride());

// enable CORS - Cross Origin Resource Sharing
legacy.use(cors());

// enable authentication
legacy.use(passport.initialize());
passport.use('jwt', strategies.jwt);

// mount api v1 routes
legacy.use('/', routes);

// if error is not an instanceOf APIError, convert it.
legacy.use(error.converter);

// catch 404 and forward to error handler
legacy.use(error.notFound);

// error handler, send stacktrace only during development
legacy.use(error.handler);

export default legacy;
