import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFoutnd';
import router from './app/routes';
const app: Application = express();

//parser
app.use(express.json());

//cors
app.use(cors());

//application routes
app.use('/api/v1', router);

app.use('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'app is running successfully',
  });
});

//global error handler
app.use(globalErrorHandler);

//not found
app.use(notFound);

export default app;
