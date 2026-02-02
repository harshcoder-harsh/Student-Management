import express from 'express';
import studentRoutes from './routes/student.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(express.json());

app.use('/students', studentRoutes);

app.use(errorHandler);

export default app;
