import express from 'express';
import { router } from './routes';
import cors from 'cors';
import appConfig from './config/appConfig';
import ErrorHandler from './middlewares/ErrorHandler';
import 'express-async-errors';
import MountVersionString from './utils/MountVersionString';

const corsOptions = {
  origin: ['https://ligouai-front.vercel.app', 'https://ligouai.com.br', 'https://www.ligouai.com.br'],
  credentials: true,
};

const app = express();

const allowedOrigins = ['https://ligouai-front.vercel.app', 'https://ligouai.com.br', 'https://www.ligouai.com.br/'];

app.use((req, res, next) => {
  const origin = req?.headers?.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', '*');

  next();
});

app.use(express.json());
app.use(cors(corsOptions));

app.use(router);

app.use(ErrorHandler.handle);

app.listen(appConfig.app.PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${appConfig.app.PORT}${MountVersionString.mount('')}`);
});
