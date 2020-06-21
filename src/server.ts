import express from 'express';
import routes from './routes';
import './database/index';
import 'reflect-metadata';

const server = express();
server.use(express.json());

server.use(routes);

server.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Servidor iniciado na porta 3333!');
});
