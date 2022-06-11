import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './database';
import cors from 'cors';
// import helmet from 'helmet';
// import delay from 'express-delay';
import express from 'express';

import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import exampleRoutes from './routes/exampleRoutes';
import fileRoutes from './routes/fileRoutes';

const whiteList = [process.env.APP_URL, 'http://localhost']; // front url

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not Allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    // this.app.use(helmet());
    // this.app.use(delay(2000));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      '/images/',
      express.static(resolve(__dirname, '..', 'uploads', 'images')),
    );
  }

  routes() {
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/examples/', exampleRoutes);
    this.app.use('/files/', fileRoutes);
  }
}

export default new App().app;
