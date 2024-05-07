import express from 'express';
import { router } from './routes';
import cors from 'cors';
import appConfig from './config/appConfig';
import ErrorHandler from './middlewares/ErrorHandler';
import 'express-async-errors';
import MountVersionString from './utils/MountVersionString';
import Cors from './middlewares/Cors';

const allowedOrigins = [
  'https://ligouai-front.vercel.app',
  'https://ligouai.com.br',
  'https://www.ligouai.com.br',
  appConfig.app.ADDITIONAL_ORIGIN!,
].filter(Boolean);

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

const app = express();

app.use((req, res, next) => {
  Cors.set(req, res, next, allowedOrigins);
});

app.use(express.json());
app.use(cors(corsOptions));

app.use(router);

app.use(ErrorHandler.handle);

app.listen(appConfig.app.PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${appConfig.app.PORT}${MountVersionString.mount('')}`);
});
