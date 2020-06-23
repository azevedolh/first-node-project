import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import './database/index';
import 'reflect-metadata';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

const server = express();
server.use(express.json());
server.use('/files', express.static(uploadConfig.directory));
server.use(routes);
server.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
);

server.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Servidor iniciado na porta 3333!');
});
