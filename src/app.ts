import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { userRouter } from './routers/user.router.js';
import { danceCourseRouter } from './routers/danceCourse.router.js';
import createDebug from 'debug';
import { errorHandler } from './middleware/error.js';
const debug = createDebug('PF: App');

export const app = express();

debug('Loaded Express App');

const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.set('trust proxy', true);

app.use((req, res, next) => {
  res.header('Content-Security-Policy', 'upgrade-insecure-request;');
  next();
});

app.use(express.static('public'));

app.use('/user', userRouter);
app.use('/danceCourse', danceCourseRouter);

app.use(errorHandler);
