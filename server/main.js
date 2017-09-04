import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import basicAuth from 'express-basic-auth';
import applicationHandler from './handlers/application';
import surveyHandler from './handlers/survey';

const server = express();
server.use(bodyParser.json({ limit: '5000mb', uploadDir: './uploads' }));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use('/assets', express.static(path.join(__dirname, '/../assets')));
server.use('/public', express.static(path.join(__dirname, '../public')));
server.use('/survey-api', surveyHandler);
server.use('/', applicationHandler);
server.use(basicAuth({
  users: { admin: 'admin' },
  challenge: true,
  realm: 'Imb4T3st4pp',
}));

export default server;
