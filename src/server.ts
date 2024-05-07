import express from 'express';
import { router } from './routes';
import cors from 'cors';
import appConfig from './config/appConfig';
import ErrorHandler from './middlewares/ErrorHandler';
import 'express-async-errors';
import MountVersionString from './utils/MountVersionString';

const corsOptions = {
  origin: ['https://ligouai-front.vercel.app', 'https://ligouai.com.br'],
  credentials: true,
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.use(router);

app.use(ErrorHandler.handle);

app.listen(appConfig.app.PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${appConfig.app.PORT}${MountVersionString.mount('')}`);
});
