import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import applicationHandler from './handlers/application';
import surveyHandler from './handlers/survey';

const server = express();
server.use(compression());
server.use(bodyParser.json({ limit: '5000mb', uploadDir: './uploads' }));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use('/assets', express.static(path.join(__dirname, '/../assets')));
server.use('/public', express.static(path.join(__dirname, '../public')));
server.use('/survey-api', surveyHandler);
server.use('/', applicationHandler);

export default server;
