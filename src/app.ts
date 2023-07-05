import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { userRouter } from './routers/user.router.js';

import createDebug from 'debug';
import { danceCourseRouter } from './routers/danceCourse.router.js';
const debug = createDebug('PF: App');

export const app = express();

debug('Loaded express App...');

const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());

app.use(express.static('public'));

app.use('/user', userRouter);
app.use('/danceCourse', danceCourseRouter);

app.get('/', (_req, resp) => {
  resp.send(`<h1>Alex & Melanie</h1>`)
});
